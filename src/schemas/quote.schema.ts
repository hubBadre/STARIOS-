import { z } from 'zod';

export const SERVICE_CATEGORIES = [
  'INSTALLATION_CLIM',
  'B13_PLATRE',
  'PRODUITS_CLIM',
  'MAINTENANCE',
  'VENTILATION',
  'VENTILATION_CAISSON',
  'POMPE_CHALEUR',
  'CTA',
  'PLOMBERIE',
] as const;

export const PROPERTY_TYPES = [
  'APPARTEMENT',
  'VILLA',
  'BUREAU',
  'COMMERCE',
  'RESTAURANT',
  'INDUSTRIE',
] as const;

/** Numéro marocain : 06/07 national, ou +212 international. */
const phoneRegex = /^(?:(?:\+|00)212[\s.-]?[5-7]\d{8}|0[5-7]\d{8})$/;

// --- Étape 1 : la prestation ---
export const stepServiceSchema = z.object({
  category: z.enum(SERVICE_CATEGORIES, {
    required_error: 'Choisissez une prestation.',
  }),
});

// --- Étape 2 : le bien ---
export const stepPropertySchema = z.object({
  propertyType: z.enum(PROPERTY_TYPES, {
    required_error: 'Choisissez un type de bien.',
  }),
  surfaceM2: z.coerce
    .number({ invalid_type_error: 'Indiquez une surface en m².' })
    .int('La surface doit être un nombre entier.')
    .min(5, 'Surface minimale : 5 m².')
    .max(5000, 'Au-delà de 5 000 m², contactez-nous directement.'),
  roomsCount: z.coerce
    .number()
    .int()
    .min(1, 'Au moins une pièce.')
    .max(60, 'Au-delà de 60 pièces, contactez-nous directement.')
    .optional(),
  city: z.string().min(2, 'Indiquez votre ville.'),
});

// --- Étape 3 : le contact ---
export const stepContactSchema = z.object({
  fullName: z.string().min(3, 'Indiquez votre nom complet.').max(120),
  phone: z
    .string()
    .min(1, 'Le téléphone est obligatoire.')
    .regex(phoneRegex, 'Numéro marocain invalide (ex. 0661234567 ou +212661234567).'),
  email: z
    .string()
    .email('Adresse email invalide.')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  preferredDate: z.string().optional(),
  message: z.string().max(2000, 'Message trop long (2 000 caractères maximum).').optional(),
  // Piège à robots : un humain ne remplit jamais ce champ masqué.
  website: z.string().max(0, 'Requête rejetée.').optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter le traitement de vos données.' }),
  }),
});

export const quoteSchema = stepServiceSchema
  .merge(stepPropertySchema)
  .merge(stepContactSchema);

export type QuoteInput = z.infer<typeof quoteSchema>;

/** Les champs validés à chaque étape du wizard, dans l'ordre d'affichage. */
export const QUOTE_STEP_FIELDS = [
  ['category'],
  ['propertyType', 'surfaceM2', 'roomsCount', 'city'],
  ['fullName', 'phone', 'email', 'preferredDate', 'message', 'consent'],
] as const satisfies ReadonlyArray<ReadonlyArray<keyof QuoteInput>>;
