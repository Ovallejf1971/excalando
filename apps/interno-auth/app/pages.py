"""Páginas HTML del gateway: login (correo), código, registro y panel de admin."""
import html

_CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#0b0d10;color:#e6e8eb;line-height:1.45}
.auth{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.box{width:100%;max-width:380px;background:#13161b;border:1px solid #1f242b;border-radius:16px;padding:28px}
.brand{font-size:13px;font-weight:700;letter-spacing:.04em;color:#1f6feb;margin-bottom:14px}
.box h1{font-size:20px;font-weight:650;letter-spacing:-.02em;margin-bottom:4px}
.box .sub{color:#8b929c;font-size:13px;margin-bottom:20px}
label{font-size:12px;color:#8b929c;display:block;margin:12px 0 5px}
input,select{width:100%;background:#0e1116;border:1px solid #262c34;border-radius:10px;color:#e6e8eb;padding:11px 12px;font-size:14px;font-family:inherit}
.code-in{text-align:center;letter-spacing:.4em;font-size:22px}
button{width:100%;margin-top:18px;background:#1f6feb;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;cursor:pointer}
button:hover{background:#388bfd}
.err{background:#2d1517;border:1px solid #5c2326;color:#f5a3a3;border-radius:10px;padding:10px 12px;font-size:13px;margin-bottom:14px}
.ok{background:#0f2e1a;border:1px solid #1f6f3f;color:#7ee2a8;border-radius:10px;padding:10px 12px;font-size:13px;margin-bottom:14px}
.muted{color:#6b727c;font-size:12px;text-align:center;margin-top:16px}
.muted a{color:#58a6ff;text-decoration:none}
.wrap{max-width:1000px;margin:0 auto;padding:28px}
header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f242b;padding-bottom:16px;margin-bottom:22px}
header h1{font-size:20px}
.top a{color:#8b929c;font-size:13px;text-decoration:none;margin-left:14px}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;color:#9aa2ad;font-size:11px;text-transform:uppercase;letter-spacing:.05em;padding:8px;border-bottom:1px solid #1f242b}
td{padding:10px 8px;border-bottom:1px solid #1a1e24;vertical-align:middle}
.uform{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.uform select{width:auto;padding:6px 8px}
.uform label{margin:0;color:#c9d1d9;display:inline-flex;align-items:center;gap:4px}
.uform input[type=checkbox]{width:auto}
.uform button{width:auto;margin:0;padding:6px 12px;font-size:12px}
.pill{font-size:10px;border-radius:6px;padding:1px 7px}
.pa{background:#0f2e1a;border:1px solid #1f6f3f;color:#3fb950}
.pp{background:#2d2410;border:1px solid #6f561f;color:#f5a524}
"""


def _esc(s):
    return html.escape(str(s)) if s is not None else ""


def _shell(title, body):
    return (f'<!doctype html><html lang="es"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<meta name="robots" content="noindex"><title>{_esc(title)}</title>'
            f'<style>{_CSS}</style></head><body>{body}</body></html>')


def login_page(error=None, info=None):
    msg = f'<div class="err">{_esc(error)}</div>' if error else ''
    msg += f'<div class="ok">{_esc(info)}</div>' if info else ''
    return _shell("Ingresar · eXcalando interno", f"""
<div class="auth"><div class="box">
  <div class="brand">eXcalando</div>
  <h1>Sitio interno</h1><div class="sub">Te enviaremos un código a tu correo</div>
  {msg}
  <form method="post" action="/auth/login">
    <label>Correo</label><input name="email" type="email" required autofocus>
    <button type="submit">Enviar código</button>
  </form>
  <div class="muted">¿No tienes cuenta? <a href="/auth/register">Regístrate</a></div>
</div></div>""")


def code_page(email, error=None, info=None):
    msg = f'<div class="err">{_esc(error)}</div>' if error else ''
    msg += f'<div class="ok">{_esc(info)}</div>' if info else ''
    return _shell("Código · eXcalando interno", f"""
<div class="auth"><div class="box">
  <div class="brand">eXcalando</div>
  <h1>Revisa tu correo</h1>
  <div class="sub">Enviamos un código de 6 dígitos a <b>{_esc(email)}</b>. Vence en 10 min.</div>
  {msg}
  <form method="post" action="/auth/login/codigo">
    <label>Código</label>
    <input class="code-in" name="codigo" inputmode="numeric" pattern="[0-9]*" maxlength="6" required autofocus>
    <button type="submit">Entrar</button>
  </form>
  <div class="muted"><a href="/auth/login/reenviar">Reenviar código</a> · <a href="/auth/logout">Cambiar correo</a></div>
</div></div>""")


def register_page(error=None, ok=False):
    if ok:
        return _shell("Registro · eXcalando interno", """
<div class="auth"><div class="box">
  <div class="brand">eXcalando</div>
  <h1>¡Registro recibido!</h1>
  <div class="ok">Tu cuenta quedó pendiente de aprobación por un administrador.
  Te avisaremos cuando esté activa.</div>
  <div class="muted"><a href="/auth/login">Volver a ingresar</a></div>
</div></div>""")
    msg = f'<div class="err">{_esc(error)}</div>' if error else ''
    return _shell("Registro · eXcalando interno", f"""
<div class="auth"><div class="box">
  <div class="brand">eXcalando</div>
  <h1>Crear cuenta</h1><div class="sub">Un administrador aprobará tu acceso</div>
  {msg}
  <form method="post" action="/auth/register">
    <label>Nombre</label><input name="nombre" required autofocus>
    <label>Correo</label><input name="email" type="email" required>
    <button type="submit">Registrarme</button>
  </form>
  <div class="muted">¿Ya tienes cuenta? <a href="/auth/login">Ingresa</a></div>
</div></div>""")


def admin_page(usuarios, me):
    rows = ""
    for u in usuarios:
        apr = ('<span class="pill pa">aprobado</span>' if u.aprobado
               else '<span class="pill pp">pendiente</span>')
        act = "checked" if u.activo else ""
        aprc = "checked" if u.aprobado else ""
        rol_opts = "".join(
            f'<option value="{r}"{" selected" if u.rol == r else ""}>{r}</option>'
            for r in ("usuario", "admin"))
        es_yo = u.usuario_id == me.usuario_id
        if es_yo:
            del_form = '<span style="color:#6b727c;font-size:11px">tú</span>'
        else:
            confirm = _esc(f"Eliminar a {u.email}?")
            del_form = (
                f'<form method="post" action="/auth/admin/usuarios/{u.usuario_id}/eliminar" '
                f'onsubmit="return confirm(&quot;{confirm}&quot;)">'
                f'<button style="background:#5c2326">Eliminar</button></form>')
        rows += f"""
<tr>
  <td>{_esc(u.nombre)}<br><span style="color:#6b727c;font-size:11px">{_esc(u.email)}</span></td>
  <td>{apr}</td>
  <td>
    <form class="uform" method="post" action="/auth/admin/usuarios/{u.usuario_id}">
      <select name="rol">{rol_opts}</select>
      <label><input type="checkbox" name="aprobado" {aprc}> aprobado</label>
      <label><input type="checkbox" name="activo" {act}> activo</label>
      <button type="submit">Guardar</button>
    </form>
  </td>
  <td>{del_form}</td>
</tr>"""
    return _shell("Usuarios · eXcalando interno", f"""
<div class="wrap">
  <header>
    <h1>Usuarios del sitio interno</h1>
    <div class="top"><a href="/">Ir al sitio</a><a href="/auth/logout">Salir</a></div>
  </header>
  <table>
    <thead><tr><th>Usuario</th><th>Estado</th><th>Permisos</th><th></th></tr></thead>
    <tbody>{rows}</tbody>
  </table>
</div>""")
