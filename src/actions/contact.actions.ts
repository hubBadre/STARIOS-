'use server';

import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/schemas/contact.schema';
import { sendEmail } from '@/lib/email';
import { site } from '@/lib/site';

export interface ContactResult {
  ok: boolean;
  fieldErrors?: Record<string, string[]>;
  message?: string;
}

export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const values = parsed.data;
  if (values.website) return { ok: true };

  try {
    await prisma.contactMessage.create({
      data: {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone ?? null,
        subject: values.subject,
        message: values.message,
      },
    });
  } catch (error) {
    console.error('[contact] enregistrement impossible', error);
  }

  await sendEmail({
    to: process.env.EMAIL_TO_ADMIN ?? site.email,
    subject: `Contact — ${values.subject}`,
    replyTo: values.email,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px">
        <h2 style="color:#0F172A">Nouveau message depuis le site</h2>
        <p style="color:#334155"><strong>${values.fullName}</strong> — ${values.email}
        ${values.phone ? ` — ${values.phone}` : ''}</p>
        <p style="color:#334155"><strong>Objet :</strong> ${values.subject}</p>
        <p style="color:#334155;white-space:pre-wrap;border-top:1px solid #E2E8F0;padding-top:12px">${values.message}</p>
      </div>`,
  });

  return { ok: true };
}
