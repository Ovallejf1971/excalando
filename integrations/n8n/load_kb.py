#!/usr/bin/env python3
"""Carga kb-content a agencia_digital (Postgres+pgvector) con embeddings.

Reemplaza al agent-kb-loader de n8n para poder cargar las 3 tablas de una
(kb_servicios via UPSERT por slug; kb_faq y kb_politicas via DELETE+INSERT, que
son tablas hoja sin FK entrantes — NO se usa TRUNCATE).

Uso (dentro del contenedor pmo_core, que ya tiene OPENAI_API_KEY en su entorno):
    KB_PG_PW=... python load_kb.py kb-content.v2.json
"""
import json
import os
import sys
import time

import psycopg2
import requests

MODEL = "text-embedding-3-small"  # 1536 dims, coincide con el schema
OPENAI_KEY = os.environ["OPENAI_API_KEY"]


def embed(text: str) -> list[float]:
    for intento in range(4):
        r = requests.post(
            "https://api.openai.com/v1/embeddings",
            headers={"Authorization": f"Bearer {OPENAI_KEY}"},
            json={"model": MODEL, "input": text[:8000]},
            timeout=60,
        )
        if r.status_code < 300:
            return r.json()["data"][0]["embedding"]
        time.sleep(2 * (intento + 1))
    raise RuntimeError(f"OpenAI embeddings falló: {r.status_code} {r.text[:200]}")


def vec(e: list[float]) -> str:
    return "[" + ",".join(f"{x:.7f}" for x in e) + "]"


def main(path: str):
    data = json.load(open(path, encoding="utf-8"))
    conn = psycopg2.connect(
        host=os.getenv("KB_DB_HOST", "shared_postgres"),
        port=5432, dbname="agencia_digital",
        user="postgres", password=os.environ["KB_PG_PW"],
    )
    conn.autocommit = False
    cur = conn.cursor()

    # ---- kb_servicios (UPSERT por slug) ----
    for s in data["servicios"]:
        txt = (f"{s['nombre']}. {s['descripcion_corta']} {s['descripcion_larga']} "
               f"Incluye: {'; '.join(s.get('entregables') or [])}. "
               f"Ideal para: {'; '.join(s.get('casos_uso') or [])}.")
        emb = vec(embed(txt))
        cur.execute("""
            INSERT INTO kb_servicios
              (slug, categoria, nombre, descripcion_corta, descripcion_larga,
               precio_setup, precio_recurrente, tiempo_entrega,
               entregables, casos_uso, prerequisitos, embedding, updated_at)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s::vector, NOW())
            ON CONFLICT (slug) DO UPDATE SET
              categoria=EXCLUDED.categoria, nombre=EXCLUDED.nombre,
              descripcion_corta=EXCLUDED.descripcion_corta,
              descripcion_larga=EXCLUDED.descripcion_larga,
              precio_setup=EXCLUDED.precio_setup,
              precio_recurrente=EXCLUDED.precio_recurrente,
              tiempo_entrega=EXCLUDED.tiempo_entrega,
              entregables=EXCLUDED.entregables, casos_uso=EXCLUDED.casos_uso,
              prerequisitos=EXCLUDED.prerequisitos,
              embedding=EXCLUDED.embedding, updated_at=NOW();
        """, (s["slug"], s["categoria"], s["nombre"], s["descripcion_corta"],
              s["descripcion_larga"], s.get("precio_setup"), s.get("precio_recurrente"),
              s.get("tiempo_entrega"), s.get("entregables") or [],
              s.get("casos_uso") or [], s.get("prerequisitos") or [], emb))
    print(f"kb_servicios: {len(data['servicios'])} upserted")

    # ---- kb_faq (reemplazo completo: DELETE + INSERT) ----
    cur.execute("DELETE FROM kb_faq;")
    for f in data.get("faq", []):
        emb = vec(embed(f"{f['pregunta']} {f['respuesta']}"))
        cur.execute("""
            INSERT INTO kb_faq (pregunta, respuesta, categoria, embedding, updated_at)
            VALUES (%s,%s,%s,%s::vector, NOW());
        """, (f["pregunta"], f["respuesta"], f.get("categoria"), emb))
    print(f"kb_faq: {len(data.get('faq', []))} insertadas")

    # ---- kb_politicas (reemplazo completo: DELETE + INSERT) ----
    cur.execute("DELETE FROM kb_politicas;")
    for p in data.get("politicas", []):
        emb = vec(embed(f"{p['topic']}: {p['contenido']}"))
        cur.execute("""
            INSERT INTO kb_politicas (topic, contenido, embedding, updated_at)
            VALUES (%s,%s,%s::vector, NOW());
        """, (p["topic"], p["contenido"], emb))
    print(f"kb_politicas: {len(data.get('politicas', []))} insertadas")

    conn.commit()
    cur.close()
    conn.close()
    print("COMMIT OK")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "kb-content.v2.json")
