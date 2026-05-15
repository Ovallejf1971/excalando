-- ====================================================================
-- eXcalando · Knowledge Base Schema
-- ====================================================================
-- Base: agencia_digital
-- Pre-requisito: extension pgvector instalada (verificar con `\dx`)
-- Ejecutar UNA o VARIAS veces (es idempotente):
--   psql -h shared_postgres -U postgres -d agencia_digital -f kb-schema.sql
--
-- IMPORTANTE: el script usa ALTER TABLE ADD COLUMN IF NOT EXISTS para
-- evitar conflictos cuando las tablas ya existen con schema viejo.
-- ====================================================================

-- Habilitar pgvector si aun no esta
CREATE EXTENSION IF NOT EXISTS vector;

-- ====================================================================
-- Tabla 1: kb_servicios (catalogo principal)
-- ====================================================================
CREATE TABLE IF NOT EXISTS kb_servicios (id SERIAL PRIMARY KEY);

-- Asegurar que todas las columnas existan (idempotente)
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS categoria TEXT;
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS nombre TEXT;
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS descripcion_corta TEXT;
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS descripcion_larga TEXT;
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS precio_setup TEXT;
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS precio_recurrente TEXT;
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS tiempo_entrega TEXT;
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS entregables TEXT[];
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS casos_uso TEXT[];
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS prerequisitos TEXT[];
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS embedding VECTOR(1536);
ALTER TABLE kb_servicios ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- UNIQUE constraint sobre slug (necesario para ON CONFLICT del UPSERT del loader)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'kb_servicios_slug_key') THEN
    ALTER TABLE kb_servicios ADD CONSTRAINT kb_servicios_slug_key UNIQUE (slug);
  END IF;
END $$;

-- Indices
CREATE INDEX IF NOT EXISTS idx_kb_servicios_embedding
  ON kb_servicios USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_kb_servicios_categoria
  ON kb_servicios (categoria);

-- ====================================================================
-- Tabla 2: kb_faq (preguntas frecuentes)
-- ====================================================================
CREATE TABLE IF NOT EXISTS kb_faq (id SERIAL PRIMARY KEY);

ALTER TABLE kb_faq ADD COLUMN IF NOT EXISTS pregunta TEXT;
ALTER TABLE kb_faq ADD COLUMN IF NOT EXISTS respuesta TEXT;
ALTER TABLE kb_faq ADD COLUMN IF NOT EXISTS categoria TEXT;
ALTER TABLE kb_faq ADD COLUMN IF NOT EXISTS embedding VECTOR(1536);
ALTER TABLE kb_faq ADD COLUMN IF NOT EXISTS veces_consultado INT DEFAULT 0;
ALTER TABLE kb_faq ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_kb_faq_embedding
  ON kb_faq USING hnsw (embedding vector_cosine_ops);

-- ====================================================================
-- Tabla 3: kb_politicas (formas de pago, garantias, etc.)
-- ====================================================================
CREATE TABLE IF NOT EXISTS kb_politicas (id SERIAL PRIMARY KEY);

ALTER TABLE kb_politicas ADD COLUMN IF NOT EXISTS topic TEXT;
ALTER TABLE kb_politicas ADD COLUMN IF NOT EXISTS contenido TEXT;
ALTER TABLE kb_politicas ADD COLUMN IF NOT EXISTS embedding VECTOR(1536);
ALTER TABLE kb_politicas ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_kb_politicas_embedding
  ON kb_politicas USING hnsw (embedding vector_cosine_ops);

-- ====================================================================
-- Tabla 4: kb_casos (casos de exito, cuando existan)
-- ====================================================================
CREATE TABLE IF NOT EXISTS kb_casos (id SERIAL PRIMARY KEY);

ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS cliente_nombre TEXT;
ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS sector TEXT;
ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS problema TEXT;
ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS solucion TEXT;
ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS resultado TEXT;
ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS duracion TEXT;
ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS publicable BOOL DEFAULT FALSE;
ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS embedding VECTOR(1536);
ALTER TABLE kb_casos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_kb_casos_embedding
  ON kb_casos USING hnsw (embedding vector_cosine_ops);

-- ====================================================================
-- Verificacion (ejecutar manualmente despues del script)
-- ====================================================================
-- SELECT tablename FROM pg_tables WHERE tablename LIKE 'kb_%' ORDER BY tablename;
-- SELECT column_name, data_type FROM information_schema.columns
--   WHERE table_name = 'kb_servicios' ORDER BY ordinal_position;
-- SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';
