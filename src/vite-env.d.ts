/// <reference types="vite/client" />

interface Window {
  dataLayer: unknown[];
  gtag?: (
    command: 'config' | 'event' | 'js',
    target: string | Date,
    parameters?: Record<string, unknown>,
  ) => void;
  fbq?: (
    command: 'track' | 'trackCustom',
    eventName: string,
    parameters?: Record<string, unknown>,
  ) => void;
}