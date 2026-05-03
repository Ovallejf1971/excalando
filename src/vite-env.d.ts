/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SCORE_WEBHOOK_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
