'use server';

import { prisma } from '@/lib/prisma';
import { quoteSchema } from '@/schemas/quote.schema';
import { estimateQuote, ESTIMATE_DISCLAIMER } from '@/lib/estimate';
import { sendEmail } from '@/lib/email';
import { site } from '@/lib/site';
import { formatMAD } from '@/lib/utils';

export interface QuoteResult {
  ok: boolean;
  reference?: string;
  /** false quand l'enregistrement en base a échoué mais que l'email est parti */
  persisted?: boolean;
  fieldErrors?: Record<string, string[]>;
  message?: string;
}

const LABELS: Record<string, string> = {
  INSTALLATION_CLIM: 'Installation de climatisation',
  B13_PLATRE: 'B13 Plâtre',
  PRODUITS_CLIM: 'Produits de climatisation',
  MAINTENANCE: 'Maintenance et entretien',
  VENTILATION: 'Ventilation',
  VENTILATION_CAISSON: 'Deshumidificateur',
  POMPE_CHALEUR: 'Pompe à chaleur',
  CTA: 'CTA — centrale de traitement d\'air',
  PLOMBERIE: 'Plomberie',
  APPARTEMENT: 'Appartement',
  VILLA: 'Villa / maison',
  BUREAU: 'Bureau',
  COMMERCE: 'Commerce',
  RESTAURANT: 'Restaurant / café',
  INDUSTRIE: 'Local industriel',
};

/** DEV-2026-0001 — lisible au téléphone, trié naturellement. */
async function nextReference(): Promise<string> {
  const year = new Date().getFullYear();
  try {
    const count = await prisma.quote.count({
      where: { createdAt: { gte: new Date(`${year}-01-01T00:00:00.000Z`) } },
    });
    return `DEV-${year}-${String(count + 1).padStart(4, '0')}`;
  } catch {
    // Base injoignable : référence horodatée, unique en pratique
    return `DEV-${year}-T${Date.now().toString().slice(-6)}`;
  }
}

function adminEmailHtml(data: {
  reference: string;
  values: Record<string, unknown>;
  estimate: ReturnType<typeof estimateQuote>;
}) {
  const { reference, values, estimate } = data;
  const row = (label: string, value: unknown) =>
    value === undefined || value === null || value === ''
      ? ''
      : `<tr>
           <td style="padding:8px 12px;background:#F8FAFC;font-weight:600;color:#0F172A;border:1px solid #E2E8F0">${label}</td>
           <td style="padding:8px 12px;color:#334155;border:1px solid #E2E8F0">${String(value)}</td>
         </tr>`;

  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:auto">
    <h2 style="color:#0F172A;margin-bottom:4px">Nouvelle demande de devis</h2>
    <p style="color:#475569;margin-top:0">Référence <strong>${reference}</strong></p>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${row('Prestation', LABELS[String(values.category)])}
      ${row('Type de bien', LABELS[String(values.propertyType)])}
      ${row('Surface', `${values.surfaceM2} m²`)}
      ${row('Pièces', values.roomsCount)}
      ${row('Ville', values.city)}
      ${row('Nom', values.fullName)}
      ${row('Téléphone', values.phone)}
      ${row('Email', values.email)}
      ${row('Date souhaitée', values.preferredDate)}
      ${row('Message', values.message)}
      ${row(
        'Estimation automatique',
        estimate.requiresSurvey
          ? 'Hors grille — visite technique requise'
          : `${formatMAD(estimate.min)} – ${formatMAD(estimate.max)}`,
      )}
    </table>
    <p style="color:#94A3B8;font-size:12px;margin-top:16px">
      Estimation calculée automatiquement, non contractuelle.
    </p>
  </div>`;
}

function clientEmailHtml(reference: string, fullName: string) {
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:auto">
    <h2 style="color:#0F172A">Nous avons bien reçu votre demande</h2>
    <p style="color:#334155;line-height:1.6">
      Bonjour ${fullName},<br><br>
      Votre demande de devis est enregistrée sous la référence <strong>${reference}</strong>.
      Un technicien ${site.name} vous rappelle sous 24 h ouvrées pour préciser votre besoin
      et convenir d'une visite technique si nécessaire.
    </p>
    <p style="color:#475569;line-height:1.6">
      Une urgence ? Appelez-nous au <a href="tel:${site.phoneRaw}" style="color:#0369A1">${site.phone}</a>.
    </p>
    <p style="color:#94A3B8;font-size:12px;border-top:1px solid #E2E8F0;padding-top:12px">
      ${ESTIMATE_DISCLAIMER.fr}<br>
      ${site.legalName} — ${site.address.street}, ${site.address.city}
    </p>
  </div>`;
}

export async function submitQuote(input: unknown): Promise<QuoteResult> {
  const parsed = quoteSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Certains champs sont invalides.',
    };
  }

  const values = parsed.data;

  // Piège à robots : on renvoie un succès neutre sans rien enregistrer.
  if (values.website) return { ok: true, reference: 'DEV-0000-0000', persisted: false };

  const estimate = estimateQuote({
    category: values.category,
    propertyType: values.propertyType,
    surfaceM2: values.surfaceM2,
    roomsCount: values.roomsCount,
  });

  const reference = await nextReference();

  let persisted = false;
  try {
    await prisma.quote.create({
      data: {
        reference,
        category: values.category,
        propertyType: values.propertyType,
        surfaceM2: values.surfaceM2,
        roomsCount: values.roomsCount ?? null,
        city: values.city,
        preferredDate: values.preferredDate ? new Date(values.preferredDate) : null,
        fullName: values.fullName,
        phone: values.phone,
        email: values.email ?? null,
        message: values.message ?? null,
        estimateMin: estimate.requiresSurvey ? null : estimate.min,
        estimateMax: estimate.requiresSurvey ? null : estimate.max,
        estimatedBtu: estimate.estimatedBtu || null,
      },
    });
    persisted = true;
  } catch (error) {
    // Un lead perdu coûte plus cher qu'un enregistrement manquant : on
    // poursuit vers l'email pour que la demande parvienne malgré tout.
    console.error('[quote] enregistrement impossible', error);
  }

  await sendEmail({
    to: process.env.EMAIL_TO_ADMIN ?? site.email,
    subject: `Devis ${reference} — ${values.fullName} (${values.city})`,
    html: adminEmailHtml({ reference, values, estimate }),
    replyTo: values.email,
  });

  if (values.email) {
    await sendEmail({
      to: values.email,
      subject: `Votre demande de devis ${reference} — ${site.name}`,
      html: clientEmailHtml(reference, values.fullName),
    });
  }

  return { ok: true, reference, persisted };
}
