/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ACTION_URL?: string;
  readonly VITE_LEAD_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
