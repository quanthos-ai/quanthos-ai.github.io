/// <reference types="vite/client" />

interface Window {
  fbq?: (
    command: 'track' | 'trackCustom',
    eventName: string,
    parameters?: Record<string, unknown>,
  ) => void;
}