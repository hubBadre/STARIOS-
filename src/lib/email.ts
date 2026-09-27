import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Envoi d'email transactionnel.
 *
 * Sans RESEND_API_KEY (cas du développement local), l'email est journalisé
 * dans la console au lieu d'être envoyé : le formulaire reste testable sans
 * compte Resend, et l'enregistrement en base n'est jamais bloqué par l'email.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  const from = process.env.EMAIL_FROM ?? 'Starios <onboarding@resend.dev>';

  if (!resend) {
    console.info('[email:dev] envoi simulé', { to, subject });
    return { simulated: true as const };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    });
    if (error) {
      console.error('[email] échec Resend', error);
      return { simulated: false as const, error };
    }
    return { simulated: false as const, id: data?.id };
  } catch (error) {
    // Un email en échec ne doit jamais faire échouer la demande de devis.
    console.error('[email] exception', error);
    return { simulated: false as const, error };
  }
}
