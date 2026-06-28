"""Gateway de auth del sitio interno de eXcalando.

Sirve el build estático de Astro Starlight (SITE_DIST) solo a usuarios con sesión
válida. Login passwordless por código al correo (OTP), roles admin/usuario, registro
con aprobación de administrador. Replica el modelo de auth del PMO.
"""
import logging

from fastapi import FastAPI, Form, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware

from .config import settings
from .db import SessionLocal, Usuario, init_db
from . import pages
from . import webauth

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("interno.main")

app = FastAPI(title=settings.APP_NAME, docs_url=None, redoc_url=None, openapi_url=None)

# Rutas que NO requieren sesión (el propio flujo de login y el healthcheck).
PUBLIC_PREFIXES = ("/auth/login", "/auth/register", "/auth/logout", "/healthz")


@app.on_event("startup")
def _startup():
    if not settings.WEB_SECRET_KEY:
        raise RuntimeError("WEB_SECRET_KEY es obligatoria (firma cookies y hashea OTP).")
    init_db()
    _seed_admins()


def _seed_admins():
    """Crea/asciende a admin (aprobado) los correos de ADMIN_EMAILS."""
    db = SessionLocal()
    try:
        for email in settings.admin_emails:
            u = db.query(Usuario).filter(Usuario.email == email).first()
            if u is None:
                db.add(Usuario(nombre=email.split("@")[0], email=email,
                               rol="admin", aprobado=True, activo=True))
                log.info("Admin semilla creado: %s", email)
            elif u.rol != "admin" or not u.aprobado:
                u.rol, u.aprobado, u.activo = "admin", True, True
                log.info("Admin semilla actualizado: %s", email)
        db.commit()
    finally:
        db.close()


# ---------- Middleware: exige sesión para todo lo que no sea /auth/* ----------
class AuthGate(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        if path.startswith(PUBLIC_PREFIXES) or path.startswith("/auth/admin"):
            return await call_next(request)
        if webauth.current_user(request) is None:
            return RedirectResponse("/auth/login", status_code=303)
        return await call_next(request)


app.add_middleware(AuthGate)


# ---------- Login (correo → código) ----------
@app.get("/auth/login", response_class=HTMLResponse)
def login_get(request: Request):
    if webauth.current_user(request):
        return RedirectResponse("/", status_code=303)
    return HTMLResponse(pages.login_page())


@app.post("/auth/login")
def login_post(email: str = Form(...)):
    db = SessionLocal()
    try:
        u = db.query(Usuario).filter(Usuario.email.ilike(email.strip())).first()
        if not u or not u.aprobado or not u.activo:
            return HTMLResponse(pages.login_page(
                error="No hay una cuenta activa con ese correo. Regístrate o pide aprobación."),
                status_code=403)
        codigo = webauth.emitir_codigo(db, u)
        webauth.enviar_codigo_email(u.email, codigo)
        resp = RedirectResponse("/auth/login/codigo", status_code=303)
        webauth.set_session(resp, u.usuario_id, "preotp")
        return resp
    finally:
        db.close()


@app.get("/auth/login/codigo", response_class=HTMLResponse)
def codigo_get(request: Request):
    u = webauth.session_user(request, "preotp")
    if not u:
        return RedirectResponse("/auth/login", status_code=303)
    return HTMLResponse(pages.code_page(u.email))


@app.post("/auth/login/codigo")
def codigo_post(request: Request, codigo: str = Form(...)):
    u = webauth.session_user(request, "preotp")
    if not u:
        return RedirectResponse("/auth/login", status_code=303)
    db = SessionLocal()
    try:
        dbu = db.query(Usuario).filter(Usuario.usuario_id == u.usuario_id).first()
        ok, motivo = webauth.verificar_codigo(db, dbu, codigo)
        if ok:
            resp = RedirectResponse("/", status_code=303)
            webauth.set_session(resp, dbu.usuario_id, "full")
            return resp
        return HTMLResponse(pages.code_page(dbu.email, error=motivo), status_code=400)
    finally:
        db.close()


@app.get("/auth/login/reenviar", response_class=HTMLResponse)
def codigo_reenviar(request: Request):
    u = webauth.session_user(request, "preotp")
    if not u:
        return RedirectResponse("/auth/login", status_code=303)
    db = SessionLocal()
    try:
        dbu = db.query(Usuario).filter(Usuario.usuario_id == u.usuario_id).first()
        codigo = webauth.emitir_codigo(db, dbu)
        webauth.enviar_codigo_email(dbu.email, codigo)
        return HTMLResponse(pages.code_page(dbu.email, info="Te enviamos un código nuevo."))
    finally:
        db.close()


# ---------- Registro (con aprobación de admin) ----------
@app.get("/auth/register", response_class=HTMLResponse)
def register_get():
    return HTMLResponse(pages.register_page())


@app.post("/auth/register")
def register_post(nombre: str = Form(...), email: str = Form(...)):
    email = email.strip().lower()
    db = SessionLocal()
    try:
        if db.query(Usuario).filter(Usuario.email.ilike(email)).first():
            return HTMLResponse(pages.register_page(error="Ya existe una cuenta con ese correo"),
                                status_code=400)
        u = Usuario(nombre=nombre.strip(), email=email, rol="usuario", aprobado=False, activo=True)
        db.add(u)
        db.commit()
        _avisar_admins_registro(db, u)
        return HTMLResponse(pages.register_page(ok=True))
    finally:
        db.close()


def _avisar_admins_registro(db, nuevo: Usuario):
    if not settings.GMAIL_WEBHOOK_URL:
        return
    import requests
    admins = db.query(Usuario).filter(Usuario.rol == "admin", Usuario.activo == True).all()  # noqa: E712
    for adm in admins:
        if not adm.email:
            continue
        try:
            requests.post(settings.GMAIL_WEBHOOK_URL, timeout=15, json={
                "to": adm.email,
                "subject": "Nuevo registro en el sitio interno",
                "message": (f"{nuevo.nombre} ({nuevo.email}) se registró en el sitio interno "
                            f"de eXcalando y espera aprobación. Apruébalo en /auth/admin/usuarios."),
            })
        except Exception:  # noqa: BLE001
            pass


@app.get("/auth/logout")
def logout():
    resp = RedirectResponse("/auth/login", status_code=303)
    webauth.clear_session(resp)
    return resp


# ---------- Admin de usuarios (solo rol admin) ----------
def _require_admin(request: Request):
    u = webauth.current_user(request)
    if not u:
        return None, RedirectResponse("/auth/login", status_code=303)
    if u.rol != "admin":
        raise HTTPException(status_code=403, detail="Solo administradores")
    return u, None


@app.get("/auth/admin/usuarios", response_class=HTMLResponse)
def admin_usuarios(request: Request):
    me, redirect = _require_admin(request)
    if redirect:
        return redirect
    db = SessionLocal()
    try:
        usuarios = db.query(Usuario).order_by(Usuario.aprobado.asc(), Usuario.fecha_registro.desc()).all()
        return HTMLResponse(pages.admin_page(usuarios, me))
    finally:
        db.close()


@app.post("/auth/admin/usuarios/{uid}")
def admin_update(request: Request, uid: int,
                 rol: str = Form("usuario"), aprobado: str = Form(None), activo: str = Form(None)):
    me, redirect = _require_admin(request)
    if redirect:
        return redirect
    db = SessionLocal()
    try:
        u = db.query(Usuario).filter(Usuario.usuario_id == uid).first()
        if u:
            u.rol = "admin" if rol == "admin" else "usuario"
            u.aprobado = aprobado is not None
            u.activo = activo is not None
            db.commit()
        return RedirectResponse("/auth/admin/usuarios", status_code=303)
    finally:
        db.close()


@app.post("/auth/admin/usuarios/{uid}/eliminar")
def admin_delete(request: Request, uid: int):
    me, redirect = _require_admin(request)
    if redirect:
        return redirect
    if me.usuario_id == uid:
        raise HTTPException(status_code=400, detail="No puedes eliminarte a ti mismo")
    db = SessionLocal()
    try:
        u = db.query(Usuario).filter(Usuario.usuario_id == uid).first()
        if u:
            db.delete(u)
            db.commit()
        return RedirectResponse("/auth/admin/usuarios", status_code=303)
    finally:
        db.close()


@app.get("/healthz")
def healthz():
    return {"ok": True}


# ---------- Sitio estático protegido (debe ir al final, captura "/") ----------
app.mount("/", StaticFiles(directory=settings.SITE_DIST, html=True), name="site")
