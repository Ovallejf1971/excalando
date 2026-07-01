#!/usr/bin/env python3
"""Espejo agencia_digital -> Chatwoot (aditivo, desacoplado del bridge de WhatsApp).

Lee mensajes nuevos de `mensajes_analisis` y los replica al inbox de eXcalando en
Chatwoot (cuenta 3, inbox API). Cachea la conversación de Chatwoot en
`conversaciones.chatwoot_id`. Marca cada mensaje con `chatwoot_synced=true`.

Si este proceso falla, el asistente de WhatsApp NO se ve afectado (el bridge vivo
no depende de esto). Llama a Chatwoot por la red interna Docker (el proxy OLS
remueve el header api_access_token).
"""
import logging
import os
import time

import psycopg2
import psycopg2.extras
import requests

log = logging.getLogger("cw-mirror")
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

CW = os.getenv("CW_URL", "http://chatwoot_web:3000").rstrip("/")
CW_TOKEN = os.environ["CW_TOKEN"]
ACCOUNT = os.getenv("CW_ACCOUNT_ID", "3")
INBOX = int(os.getenv("CW_INBOX_ID", "2"))
POLL_SECONDS = int(os.getenv("POLL_SECONDS", "30"))
H = {"api_access_token": CW_TOKEN, "Content-Type": "application/json"}


def db():
    return psycopg2.connect(
        host=os.getenv("PG_HOST", "shared_postgres"), port=5432,
        dbname="agencia_digital", user="postgres", password=os.environ["PG_PW"],
    )


# ---------------- Chatwoot helpers ----------------
def cw_find_or_create_contact(name: str, phone: str):
    """Devuelve (contact_id, source_id) para el inbox. Reusa si ya existe."""
    e164 = phone if phone.startswith("+") else "+" + phone
    # Crear contacto (crea también el contact_inbox y su source_id)
    r = requests.post(f"{CW}/api/v1/accounts/{ACCOUNT}/contacts", headers=H, timeout=30,
                      json={"inbox_id": INBOX, "name": name or e164, "phone_number": e164})
    if r.status_code < 300:
        c = r.json()["payload"]["contact"]
        cis = c.get("contact_inboxes") or []
        src = cis[0]["source_id"] if cis else None
        return c["id"], src
    # Ya existe: buscarlo y asegurar contact_inbox
    s = requests.get(f"{CW}/api/v1/accounts/{ACCOUNT}/contacts/search", headers=H,
                     params={"q": e164}, timeout=30)
    hits = s.json().get("payload", []) if s.status_code < 300 else []
    if not hits:
        raise RuntimeError(f"No pude crear ni encontrar contacto {e164}: {r.status_code} {r.text[:200]}")
    cid = hits[0]["id"]
    ci = requests.post(f"{CW}/api/v1/accounts/{ACCOUNT}/contacts/{cid}/contact_inboxes",
                       headers=H, timeout=30, json={"inbox_id": INBOX})
    src = ci.json().get("source_id") if ci.status_code < 300 else None
    return cid, src


def cw_create_conversation(contact_id: int, source_id: str) -> int:
    r = requests.post(f"{CW}/api/v1/accounts/{ACCOUNT}/conversations", headers=H, timeout=30,
                      json={"source_id": source_id, "inbox_id": INBOX, "contact_id": contact_id})
    r.raise_for_status()
    return r.json()["id"]


def cw_post_message(conv_id: int, content: str, incoming: bool):
    r = requests.post(f"{CW}/api/v1/accounts/{ACCOUNT}/conversations/{conv_id}/messages",
                      headers=H, timeout=30,
                      json={"content": content, "message_type": "incoming" if incoming else "outgoing"})
    r.raise_for_status()
    return r.json().get("id")


# ---------------- Sync ----------------
def ensure_conversation(cur, conv_row) -> int:
    """Devuelve el chatwoot conversation id; lo crea y cachea si falta."""
    if conv_row["chatwoot_id"]:
        return conv_row["chatwoot_id"]
    cid, src = cw_find_or_create_contact(conv_row["customer_name"], conv_row["whatsapp_number"])
    conv_cw = cw_create_conversation(cid, src)
    cur.execute("UPDATE conversaciones SET chatwoot_id=%s WHERE id=%s", (conv_cw, conv_row["id"]))
    log.info("Conversación %s -> Chatwoot conv %s (%s)", conv_row["id"], conv_cw, conv_row["whatsapp_number"])
    return conv_cw


def sync_once(conn) -> int:
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("""
        SELECT m.id, m.conversacion_id, m.direction, m.text,
               c.chatwoot_id, c.whatsapp_number, c.customer_name
        FROM mensajes_analisis m JOIN conversaciones c ON c.id = m.conversacion_id
        WHERE m.chatwoot_synced = false AND m.text IS NOT NULL
        ORDER BY m.id ASC LIMIT 100;
    """)
    rows = cur.fetchall()
    n = 0
    for m in rows:
        try:
            conv_cw = ensure_conversation(cur, m)
            m["chatwoot_id"] = conv_cw  # por si hay varios mensajes de la misma conv en el lote
            cw_post_message(conv_cw, m["text"], incoming=(m["direction"] == "in"))
            cur.execute("UPDATE mensajes_analisis SET chatwoot_synced=true WHERE id=%s", (m["id"],))
            conn.commit()
            n += 1
        except Exception as e:  # noqa: BLE001
            conn.rollback()
            log.warning("Fallo msg %s: %s", m["id"], repr(e)[:200])
    cur.close()
    return n


def main():
    once = os.getenv("RUN_ONCE", "false").lower() == "true"
    while True:
        try:
            conn = db()
            n = sync_once(conn)
            conn.close()
            if n:
                log.info("Espejados %s mensajes", n)
        except Exception as e:  # noqa: BLE001
            log.warning("Ciclo falló: %s", repr(e)[:200])
        if once:
            break
        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    main()
