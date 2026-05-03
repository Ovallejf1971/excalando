# Integraciones n8n — Picard-IA

Workflows de n8n que orquestan la captura y notificacion de leads del Score Digital.

## Workflow disponible

| Archivo | Trigger | Que hace |
|---|---|---|
| `score-webhook.json` | POST a `https://n8n.lithv.net/webhook/score-digital` | Inserta lead en Postgres `agencia_digital.leads` y envia email transaccional al lead via Gmail OAuth |

## Como importar `score-webhook.json`

### 1. Abrir n8n
Ir a [https://n8n.lithv.net](https://n8n.lithv.net) y loguearse.

### 2. Importar el archivo
- Click el menu hamburguesa (arriba a la izquierda) → **Workflows** → **Import from File**
- Seleccionar `integrations/n8n/score-webhook.json`
- n8n carga el workflow con 4 nodos: Webhook → Postgres INSERT → Gmail Send → Respond to Webhook

### 3. Configurar credenciales

#### Postgres
- Click el nodo **Postgres → INSERT lead**
- En **Credential to connect with**: si ya existe una credencial que apunte al `shared_postgres`, seleccionarla. Si no, crear una nueva con:
  - **Host:** `shared_postgres` (red Docker compartida)
  - **Database:** `agencia_digital`
  - **User:** `postgres`
  - **Password:** (Harol tiene la password del Postgres compartido — pedirsela)
  - **Port:** `5432`
  - **SSL:** disable

#### Gmail
- Click el nodo **Gmail → Enviar reporte**
- En **Credential to connect with**: seleccionar **Gmail account** (o cualquiera de las existentes que pertenezca a Francisco / `ovallejf@gmail.com`)
- Verificar que el campo **Sender Name** dentro de Options diga `Diagnostico Digital`

### 4. Activar el workflow
- Toggle **Active** (esquina superior derecha) → ON
- n8n confirma que el webhook esta listo

### 5. Verificar la URL del webhook
- Click el nodo **Webhook (POST /score-digital)**
- Copiar la URL de **Production URL**: deberia ser `https://n8n.lithv.net/webhook/score-digital`
- Esa URL es la que el frontend ya tiene configurada en `.env.local` (`VITE_SCORE_WEBHOOK_URL`)

## Probar el flujo end-to-end

1. Ir a [https://picard-ia.lithv.net](https://picard-ia.lithv.net)
2. Hacer scroll hasta la seccion **Score Digital**
3. Completar el wizard con datos de prueba (incluir un email real para verificar el envio)
4. Click **Calcular mi Score**
5. Verificar:
   - **Frontend:** se renderiza el reporte con el score
   - **Postgres:** un row nuevo en `agencia_digital.leads` (verificar via psql o pgAdmin)
   - **Gmail:** el email del test recibe el reporte con el branding "Diagnostico Digital"

### Comandos utiles para verificar

Para queries directas al Postgres del VPS, pedirle a Claude Code que use el skill `vps-deploy` (instalado a nivel usuario, fuera del repo). Por ejemplo:

> "Mostrame los ultimos 5 leads de la tabla `agencia_digital.leads`"

Claude Code se encarga del SSH + docker exec + psql sin que las credenciales toquen este repo.

Alternativamente, conectarse via pgAdmin: [https://62.72.27.80](https://62.72.27.80) (Harol tiene las credenciales).

## Schema de payload esperado

El frontend hace POST con este shape:

```json
{
  "respuestas": {
    "sector": "servicios_pro",
    "tamano": "5-9",
    "ciudad": "Bogota",
    "tieneWeb": true,
    "webMobile": true,
    "...": "...",
    "nombre": "Francisco Ovalle",
    "email": "ejemplo@gmail.com",
    "empresa": "Mi PyME",
    "telefono": "+573164728441"
  },
  "reporte": {
    "total": 67,
    "rango": "Aceptable",
    "frentes": [
      { "key": "presencia", "label": "Presencia web", "score": 75, "prioridad": "Media", "notas": [...] }
    ],
    "acciones": [
      { "titulo": "Optimizar Google Business", "impacto": 12, "frente": "seo", "esfuerzo": "Bajo" }
    ],
    "generadoEn": "2026-05-03T14:30:00.000Z"
  }
}
```

## Troubleshooting

| Sintoma | Causa probable | Solucion |
|---|---|---|
| Webhook responde 404 | Workflow no esta activo | Activar el toggle en n8n |
| "Credentials not selected" en logs de n8n | Credenciales sin asignar | Editar nodos Postgres / Gmail y seleccionar credencial |
| Email no llega | Cuota Gmail diaria excedida (500 mails free) | Esperar 24h o migrar a Resend |
| Postgres rechaza connection | Host wrong | Usar `shared_postgres` (no `localhost`) si n8n esta en la misma red Docker |
| CORS error en consola del navegador | Webhook sin allowedOrigins | Verificar opciones del nodo Webhook (ya esta en `*` por defecto) |
