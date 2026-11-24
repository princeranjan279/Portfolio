// ─────────────────────────────────────────────────────────────────
//  EmailJS Configuration
//  Loaded securely from environment variables (.env)
//  Setup guide: https://www.emailjs.com/docs/
// ─────────────────────────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  SERVICE_ID:  import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  TO_EMAIL:    import.meta.env.VITE_EMAILJS_TO_EMAIL || 'princeranjan279@gmail.com',
};

export const EMAILJS_NEWSLETTER_TEMPLATE =
  import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE || 'template_newsletter';
