"""Motor SQLAlchemy (SQLite) + modelo de Usuario para la auth del sitio interno."""
import os

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    create_engine,
    func,
)
from sqlalchemy.orm import declarative_base, sessionmaker

from .config import settings

# Asegura que exista el directorio del archivo SQLite.
_db_dir = os.path.dirname(settings.DB_PATH)
if _db_dir:
    os.makedirs(_db_dir, exist_ok=True)

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False},
    future=True,
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()


class Usuario(Base):
    __tablename__ = "usuarios"

    usuario_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(120))
    email = Column(String(150), unique=True, index=True)
    rol = Column(String(20), default="usuario")     # 'admin' | 'usuario'
    aprobado = Column(Boolean, default=False)        # el admin aprueba el registro
    activo = Column(Boolean, default=True)
    fecha_registro = Column(DateTime(timezone=True), server_default=func.now())
    # --- OTP (código de un solo uso enviado al correo) ---
    otp_hash = Column(String(128))
    otp_expira = Column(DateTime(timezone=True))
    otp_intentos = Column(Integer, default=0)


def init_db() -> None:
    Base.metadata.create_all(engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
