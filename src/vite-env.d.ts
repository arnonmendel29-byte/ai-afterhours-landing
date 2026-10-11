/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ACTION_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
