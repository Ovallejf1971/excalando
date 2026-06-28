"""Configuración del gateway de auth del sitio interno. Lee de variables de entorno."""
import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    # --- Sesión / OTP ---
    # Clave para firmar la cookie y hashear los códigos OTP. OBLIGATORIA en prod.
    WEB_SECRET_KEY: str = os.getenv("WEB_SECRET_KEY", "")
    # Cookie segura solo bajo HTTPS; en dev local (HTTP) debe ir False.
    WEB_COOKIE_SECURE: bool = os.getenv("WEB_COOKIE_SECURE", "false").lower() == "true"
    SESSION_HORAS: int = int(os.getenv("SESSION_HORAS", "12"))

    # --- Base de datos de usuarios (SQLite, autocontenida) ---
    DB_PATH: str = os.getenv("DB_PATH", "./data/interno.db")

    # --- Envío del código por correo (webhook de Gmail en n8n, el mismo del PMO) ---
    GMAIL_WEBHOOK_URL: str = os.getenv("GMAIL_WEBHOOK_URL", "")

    # --- Sitio estático que se protege (build de Astro Starlight) ---
    SITE_DIST: str = os.getenv("SITE_DIST", "../interno/dist")

    # --- Administradores semilla (correos separados por coma, pre-aprobados) ---
    ADMIN_EMAILS: str = os.getenv("ADMIN_EMAILS", "ovallejf@gmail.com")

    # --- Branding ---
    APP_NAME: str = os.getenv("APP_NAME", "eXcalando · Sitio interno")

    @property
    def database_url(self) -> str:
        return f"sqlite:///{self.DB_PATH}"

    @property
    def admin_emails(self) -> list[str]:
        return [e.strip().lower() for e in self.ADMIN_EMAILS.split(",") if e.strip()]


settings = Settings()
