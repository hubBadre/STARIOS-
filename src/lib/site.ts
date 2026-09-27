/**
 * Coordonnées de l'entreprise.
 *
 * ⚠️ DONNÉES FICTIVES — à remplacer par les vraies informations Starios.
 * Ces valeurs servent de repli ; l'admin peut les surcharger via le modèle
 * `Setting` (clés : phone, whatsapp, address, mapsEmbed, hours).
 */
export const site = {
  name: 'Starios',
  legalName: 'Starios Climatisation SARL',
  tagline: {
    fr: 'Vente, installation et maintenance de climatisation',
    en: 'Air conditioning sales, installation and maintenance',
    ar: 'بيع وتركيب وصيانة أجهزة التكييف',
  },
  founded: 2014,

  phone: process.env.NEXT_PUBLIC_PHONE ?? '06 61 78 47 16',
  phoneRaw: '+212661784716',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '212661784716',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'contact@starios.ma',

  address: {
    street: 'ZI Sapino, 3ème étage, lot 719',
    city: 'Nouaceur',
    country: 'Maroc',
  },

  hours: {
    fr: 'Ouvert 24h/24',
    en: 'Open 24/7',
    ar: 'مفتوح على مدار 24 ساعة',
  },

  // Intervention couverte — sert aussi de liste de villes dans le formulaire
  cities: [
    'Casablanca',
    'Mohammedia',
    'Rabat',
    'Salé',
    'Marrakech',
    'Tanger',
    'Agadir',
    'Fès',
    'Kénitra',
    'El Jadida',
  ],

  // Placeholder Google Maps centré sur l'adresse
  mapsEmbed:
    'https://www.google.com/maps?q=ZI+Sapino,+Nouaceur&output=embed',

  social: {
    facebook: 'https://facebook.com/starios.ma',
    instagram: 'https://instagram.com/starios.ma',
    linkedin: 'https://linkedin.com/company/starios-ma',
  },

  // Chiffres de réassurance affichés en page d'accueil — à ajuster
  stats: {
    projects: 120000,
    yearsExperience: 18,
    technicians: 18,
    responseHours: 24,
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
