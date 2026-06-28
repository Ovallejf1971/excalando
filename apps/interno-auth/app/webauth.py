"""Auth passwordless: código de un solo uso enviado al correo (portado del PMO).

Flujo: el usuario escribe su correo → se genera un código de 6 dígitos (hash en BD,
expira 10 min, máx. 5 intentos, un solo uso) → se envía por Gmail (webhook n8n) →
el usuario lo escribe → sesión completa (cookie firmada).
"""
import hmac
import logging
import secrets as _secrets
from datetime import datetime, timedelta, timezone
from hashlib import sha256

import requests
from fastapi import Request
from itsdangerous import URLSafeTimedSerializer

from .config import settings
from .db import SessionLocal, Usuario

log = logging.getLogger("interno.webauth")
COOKIE_NAME = "interno_session"
OTP_TTL_MIN = 10
OTP_MAX_INTENTOS = 5


def _serializer() -> URLSafeTimedSerializer:
    return URLSafeTimedSerializer(settings.WEB_SECRET_KEY, salt="interno-session")


# ---------- Código de un solo uso (OTP) ----------
def generar_codigo() -> str:
    return f"{_secrets.randbelow(1_000_000):06d}"


def _hash_codigo(codigo: str) -> str:
    return hmac.new(settings.WEB_SECRET_KEY.encode(), codigo.encode(), sha256).hexdigest()


def emitir_codigo(db, usuario: Usuario) -> str:
    """Genera, guarda (hash+expiración) y devuelve el código (para enviarlo)."""
    codigo = generar_codigo()
    usuario.otp_hash = _hash_codigo(codigo)
    usuario.otp_expira = datetime.now(timezone.utc) + timedelta(minutes=OTP_TTL_MIN)
    usuario.otp_intentos = 0
    db.commit()
    return codigo


def verificar_codigo(db, usuario: Usuario, codigo: str) -> tuple[bool, str]:
    """(ok, motivo). Consume el código si acierta; controla expiración e intentos."""
    if not usuario.otp_hash or not usuario.otp_expira:
        return False, "Solicita un código primero."
    expira = usuario.otp_expira
    if expira.tzinfo is None:
        expira = expira.replace(tzinfo=timezone.utc)
    if datetime.now(timezone.utc) > expira:
        return False, "El código expiró. Pide uno nuevo."
    if (usuario.otp_intentos or 0) >= OTP_MAX_INTENTOS:
        return False, "Demasiados intentos. Pide un código nuevo."
    if hmac.compare_digest(usuario.otp_hash, _hash_codigo((codigo or "").strip())):
        usuario.otp_hash = None
        usuario.otp_expira = None
        usuario.otp_intentos = 0
        db.commit()
        return True, "ok"
    usuario.otp_intentos = (usuario.otp_intentos or 0) + 1
    db.commit()
    return False, "Código incorrecto."


def enviar_codigo_email(email: str, codigo: str) -> bool:
    """Envía el código por el webhook de Gmail (n8n). Devuelve True si se despachó."""
    if not settings.GMAIL_WEBHOOK_URL:
        log.warning("GMAIL_WEBHOOK_URL no configurado; código NO enviado (solo log): %s", codigo)
        return False
    try:
        r = requests.post(settings.GMAIL_WEBHOOK_URL, timeout=20, json={
            "to": email,
            "subject": f"Tu código de acceso al sitio interno: {codigo}",
            "message": (f"Tu código para entrar al sitio interno de eXcalando es: {codigo}\n\n"
                        f"Vence en {OTP_TTL_MIN} minutos y es de un solo uso. "
                        f"Si no lo solicitaste, ignora este correo."),
        })
        return r.status_code < 300
    except Exception as e:  # noqa: BLE001
        log.warning("Fallo enviando código: %s", e)
        return False


# ---------- Sesión (cookie firmada) ----------
def make_token(uid: int, lvl: str) -> str:
    return _serializer().dumps({"uid": uid, "lvl": lvl})


def read_token(token: str):
    try:
        return _serializer().loads(token, max_age=settings.SESSION_HORAS * 3600)
    except Exception:  # noqa: BLE001
        return None


def set_session(resp, uid: int, lvl: str = "full") -> None:
    """lvl: 'full' = autenticado; 'preotp' = correo validado, falta el código."""
    resp.set_cookie(
        COOKIE_NAME, make_token(uid, lvl),
        httponly=True, samesite="lax", secure=settings.WEB_COOKIE_SECURE,
        max_age=settings.SESSION_HORAS * 3600, path="/",
    )


def clear_session(resp) -> None:
    resp.delete_cookie(COOKIE_NAME, path="/")


def _session(request: Request):
    tok = request.cookies.get(COOKIE_NAME)
    return read_token(tok) if tok else None


def _load_user(uid: int):
    db = SessionLocal()
    try:
        u = db.query(Usuario).filter(Usuario.usuario_id == uid).first()
        if u:
            db.expunge(u)
        return u
    finally:
        db.close()


def session_user(request: Request, level: str = "full"):
    data = _session(request)
    if not data or data.get("lvl") != level:
        return None
    u = _load_user(data["uid"])
    if not u or not u.activo or not u.aprobado:
        return None
    return u


def current_user(request: Request):
    """Usuario con sesión COMPLETA (post-código)."""
    return session_user(request, "full")
