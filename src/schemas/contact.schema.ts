import { z } from 'zod';

const phoneRegex = /^(?:(?:\+|00)212[\s.-]?[5-7]\d{8}|0[5-7]\d{8})$/;

export const contactSchema = z.object({
  fullName: z.string().min(3, 'Indiquez votre nom complet.').max(120),
  email: z.string().email('Adresse email invalide.'),
  phone: z
    .string()
    .regex(phoneRegex, 'Numéro marocain invalide.')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  subject: z.string().min(3, 'Indiquez un objet.').max(150),
  message: z.string().min(10, 'Votre message est trop court.').max(2000),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
