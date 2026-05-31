---
title: Deploy VPS
description: Pipeline de deploy GitHub Actions → VPS Hostinger.
---

# Deploy automatizado al VPS — guía para Harol

eXcalando se sirve desde el VPS Hostinger (`62.72.27.80`, CyberPanel + OpenLiteSpeed). Cada push a `main` debe rebuildear y subir el `dist/` al document root del sitio automáticamente. Sin GitHub Pages, sin servicios de terceros — self-hosted como dice el Manifiesto.

El workflow ya está creado en `.github/workflows/deploy.yml`. Solo falta configurar los 4 secrets en GitHub.

## 1. Crear usuario `deploy` en el VPS (recomendado, no usar root)

```bash
# SSH al VPS como root
adduser deploy
usermod -aG www-data deploy   # ajustar al grupo correcto segun CyberPanel
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
touch /home/deploy/.ssh/authorized_keys && chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh

# Dar permisos de escritura al document root del sitio
chown -R deploy:www-data /home/excalando.com/public_html
chmod -R 775 /home/excalando.com/public_html
```

(Si preferis ir mas rapido y usar `root` provisionalmente, salta este paso y usa `VPS_USER=root` en el secret. Migrar a un usuario dedicado despues.)

## 2. Generar par de claves SSH (en tu maquina local, no en el VPS)

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy-excalando" -f ~/.ssh/excalando_deploy -N ""
# Esto crea: ~/.ssh/excalando_deploy (privada) y ~/.ssh/excalando_deploy.pub (publica)
```

## 3. Pegar la clave publica en el VPS

```bash
# Copiar contenido de la publica al authorized_keys del VPS
ssh-copy-id -i ~/.ssh/excalando_deploy.pub deploy@62.72.27.80
# O manualmente: cat ~/.ssh/excalando_deploy.pub | ssh deploy@62.72.27.80 'cat >> ~/.ssh/authorized_keys'
```

Verificar que funciona:
```bash
ssh -i ~/.ssh/excalando_deploy deploy@62.72.27.80 'whoami && ls /home/excalando.com/public_html'
```

## 4. Configurar secrets en GitHub

Ir a https://github.com/Ovallejf1971/excalando/settings/secrets/actions y agregar:

| Secret name | Valor |
|---|---|
| `VPS_HOST` | `62.72.27.80` |
| `VPS_USER` | `deploy` (o `root` si saltaste paso 1) |
| `VPS_PATH` | `/home/excalando.com/public_html` (verificar en CyberPanel) |
| `VPS_SSH_KEY` | Contenido completo de `~/.ssh/excalando_deploy` (la PRIVADA, incluyendo headers `-----BEGIN/END OPENSSH PRIVATE KEY-----`) |

## 5. Disparar el primer deploy automatizado

Ir a https://github.com/Ovallejf1971/excalando/actions → seleccionar "Deploy to VPS" → click "Run workflow" → branch `main` → Run.

En ~2 minutos deberia estar el rediseno nuevo en https://excalando.com.

## 6. Subida manual UNA SOLA VEZ (para no esperar al setup de secrets)

Mientras Harol configura los secrets, podes subir el `dist/` actual manualmente para que el sitio nuevo este en vivo HOY:

```powershell
# Desde Windows con WinSCP o desde PowerShell con scp:
scp -r "C:\Users\User\Downloads\picard-ia\dist\*" deploy@62.72.27.80:/home/excalando.com/public_html/
```

O via WinSCP / File Manager de CyberPanel como ya describimos antes.

## 7. Mantenimiento futuro

- **Cualquier push a `main`** desencadena un nuevo deploy automatico. No mas subidas manuales.
- **Logs del workflow:** https://github.com/Ovallejf1971/excalando/actions
- **Si el deploy falla:** logs estan en el run de GitHub Actions; revisar permisos en VPS o ortografia de los secrets.
- **Cache de OpenLiteSpeed:** si el sitio sirve HTML stale despues de un deploy, descomentar el step "Purge OpenLiteSpeed cache" en `.github/workflows/deploy.yml`.

## 8. Rollback

Si un deploy rompe algo en produccion:

```bash
# Desde tu maquina local
cd C:/Users/User/Downloads/picard-ia
git revert HEAD
git push origin main
# El workflow rebuildea con el commit anterior y vuelve atras
```

O manualmente:
```bash
ssh deploy@62.72.27.80 'cd /home/excalando.com/public_html && [restore from backup]'
```

Recomendado: snapshot diario del VPS desde Hostinger panel.
