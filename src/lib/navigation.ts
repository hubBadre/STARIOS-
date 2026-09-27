/** Source unique de la navigation : header, menu mobile et footer la partagent. */
export const mainNav = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'about', href: '/a-propos' },
  { key: 'contact', href: '/contact' },
] as const;

export const footerNav = [
  { key: 'faq', href: '/faq' },
  { key: 'legal', href: '/mentions-legales' },
  { key: 'privacy', href: '/confidentialite' },
] as const;

export const SERVICE_SLUGS: Record<string, string> = {
  INSTALLATION_CLIM: 'installation-climatisation',
  B13_PLATRE: 'b13-platre',
  PRODUITS_CLIM: 'produits-climatisation',
  MAINTENANCE: 'maintenance-entretien',
  VENTILATION: 'ventilation',
  VENTILATION_CAISSON: 'ventilation-caisson',
  POMPE_CHALEUR: 'pompe-a-chaleur',
  CTA: 'centrale-traitement-air',
  PLOMBERIE: 'plomberie',
};
