-- ====================================================================
-- Picard-IA · Knowledge Base Schema
-- ====================================================================
-- Base: agencia_digital
-- Pre-requisito: extension pgvector instalada (verificar con `\dx`)
-- Ejecutar UNA VEZ desde pgAdmin o psql:
--   psql -h 62.72.27.80 -U postgres -d agencia_digital -f kb-schema.sql
-- ====================================================================

-- Habilitar pgvector si aun no esta
CREATE EXTENSION IF NOT EXISTS vector;

-- ====================================================================
-- Tabla 1: kb_servicios (catalogo principal)
-- ====================================================================
CREATE TABLE IF NOT EXISTS kb_servicios (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  categoria TEXT,                       -- 'diagnostico', 'presencia', 'empleado', 'automatizacion'
  nombre TEXT NOT NULL,
  descripcion_corta TEXT,
  descripcion_larga TEXT,
  precio_setup TEXT,
  precio_recurrente TEXT,
  tiempo_entrega TEXT,
  entregables TEXT[],
  casos_uso TEXT[],
  prerequisitos TEXT[],
  embedding VECTOR(1536),               -- OpenAI text-embedding-3-small
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kb_servicios_embedding
  ON kb_servicios USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_kb_servicios_categoria
  ON kb_servicios (categoria);

-- ====================================================================
-- Tabla 2: kb_faq (preguntas frecuentes)
-- ====================================================================
CREATE TABLE IF NOT EXISTS kb_faq (
  id SERIAL PRIMARY KEY,
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  categoria TEXT,                       -- 'precios', 'entregables', 'proceso', 'tecnico', 'general'
  embedding VECTOR(1536),
  veces_consultado INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kb_faq_embedding
  ON kb_faq USING hnsw (embedding vector_cosine_ops);

-- ====================================================================
-- Tabla 3: kb_politicas (formas de pago, garantias, etc.)
-- ====================================================================
CREATE TABLE IF NOT EXISTS kb_politicas (
  id SERIAL PRIMARY KEY,
  topic TEXT NOT NULL,                  -- 'pago', 'garantia', 'cancelacion', 'soporte', 'tiempos'
  contenido TEXT NOT NULL,
  embedding VECTOR(1536),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kb_politicas_embedding
  ON kb_politicas USING hnsw (embedding vector_cosine_ops);

-- ====================================================================
-- Tabla 4: kb_casos (casos de exito, cuando existan)
-- ====================================================================
CREATE TABLE IF NOT EXISTS kb_casos (
  id SERIAL PRIMARY KEY,
  cliente_nombre TEXT,
  sector TEXT,
  problema TEXT,
  solucion TEXT,
  resultado TEXT,
  duracion TEXT,
  publicable BOOL DEFAULT FALSE,
  embedding VECTOR(1536),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kb_casos_embedding
  ON kb_casos USING hnsw (embedding vector_cosine_ops);

-- ====================================================================
-- Verificacion
-- ====================================================================
-- Despues de aplicar, ejecutar para verificar:
-- SELECT tablename FROM pg_tables WHERE tablename LIKE 'kb_%' ORDER BY tablename;
-- SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';
