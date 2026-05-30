import nodemailer from "nodemailer";

/**
 * Helper d'envoi d'emails via Gmail SMTP.
 * Configuration requise dans .env.local :
 *   GMAIL_USER=service.horizon224@gmail.com
 *   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (App Password généré depuis Google Account)
 */

export function isEmailConfigured(): boolean {
  return !!process.env.GMAIL_USER && !!process.env.GMAIL_APP_PASSWORD;
}

function getTransporter() {
  if (!isEmailConfigured()) {
    throw new Error(
      "Gmail SMTP non configuré. Ajoute GMAIL_USER et GMAIL_APP_PASSWORD dans .env.local."
    );
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_APP_PASSWORD!.replace(/\s/g, ""),
    },
  });
}

export type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail(
  params: SendEmailParams
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"DémarchesCivique" <${process.env.GMAIL_USER}>`,
      to: params.to,
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo,
    });
    return { ok: true };
  } catch (e) {
    console.error("[email] send failed:", e);
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erreur d'envoi inconnue.",
    };
  }
}

// ============================================================================
// Templates HTML (style sobre, compatible Gmail/Outlook/Apple Mail)
// ============================================================================

const FRENCH_BLUE = "#000091";
const MARIANNE_RED = "#E1000F";

function shell(content: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DémarchesCivique</title>
</head>
<body style="margin:0;padding:0;background:#f6f6fa;font-family:Arial,Helvetica,sans-serif;color:#161616;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f6fa;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.04);">
  <tr><td style="background:${FRENCH_BLUE};padding:24px 32px;">
    <div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.02em;">DémarchesCivique</div>
    <div style="color:rgba(255,255,255,0.7);font-size:12px;margin-top:4px;">Accompagnement administratif</div>
  </td></tr>
  <tr><td style="padding:32px;">
${content}
  </td></tr>
  <tr><td style="background:#fafafc;padding:20px 32px;border-top:1px solid #eaeaef;color:#6b6b78;font-size:12px;">
    <div style="margin-bottom:6px;">
      <strong style="color:#161616;">DémarchesCivique</strong> · service.horizon224@gmail.com · +33 7 51 25 23 09
    </div>
    <div>Accompagnement administratif — pas un cabinet juridique. <span style="color:${MARIANNE_RED};">●</span></div>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Email envoyé à l'admin quand un visiteur soumet une demande. */
export function notifyAdminTemplate(d: {
  name: string;
  email: string;
  phone: string;
  serviceLabel: string;
  message: string;
  date?: string;
  time?: string;
}): { subject: string; html: string } {
  return {
    subject: `Nouvelle demande — ${d.serviceLabel} — ${d.name}`,
    html: shell(`
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#161616;">Nouvelle demande reçue</h1>
      <p style="margin:0 0 24px;font-size:15px;color:#454653;line-height:1.6;">Un visiteur vient de soumettre une demande via le formulaire du site. Détails ci-dessous :</p>
      <table cellpadding="8" cellspacing="0" style="width:100%;border:1px solid #eaeaef;border-radius:12px;font-size:14px;">
        <tr><td style="color:#6b6b78;width:140px;">Nom</td><td style="font-weight:600;">${escapeHtml(d.name)}</td></tr>
        <tr><td style="color:#6b6b78;">Email</td><td style="font-weight:600;"><a href="mailto:${escapeHtml(d.email)}" style="color:${FRENCH_BLUE};">${escapeHtml(d.email)}</a></td></tr>
        <tr><td style="color:#6b6b78;">Téléphone</td><td style="font-weight:600;"><a href="tel:${escapeHtml(d.phone)}" style="color:${FRENCH_BLUE};">${escapeHtml(d.phone)}</a></td></tr>
        <tr><td style="color:#6b6b78;">Service</td><td style="font-weight:600;">${escapeHtml(d.serviceLabel)}</td></tr>
        ${d.date ? `<tr><td style="color:#6b6b78;">Date</td><td style="font-weight:600;">${escapeHtml(d.date)} ${d.time ? `· ${escapeHtml(d.time)}` : ""}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;background:#fafafc;border-radius:12px;padding:16px;border-left:3px solid ${FRENCH_BLUE};">
        <div style="color:#6b6b78;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-bottom:8px;">Message du client</div>
        <div style="font-size:14px;color:#161616;line-height:1.6;white-space:pre-line;">${escapeHtml(d.message || "(aucun message)")}</div>
      </div>
      <p style="margin:24px 0 0;font-size:13px;color:#6b6b78;">Connectez-vous au tableau de bord pour gérer cette demande.</p>
    `),
  };
}

/** Email de confirmation envoyé au visiteur après soumission. */
export function clientConfirmationTemplate(d: {
  name: string;
  serviceLabel: string;
}): { subject: string; html: string } {
  return {
    subject: `Votre demande est bien reçue — DémarchesCivique`,
    html: shell(`
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#161616;">Bonjour ${escapeHtml(d.name)},</h1>
      <p style="margin:0 0 16px;font-size:15px;color:#454653;line-height:1.6;">Nous avons bien reçu votre demande pour le service <strong>${escapeHtml(d.serviceLabel)}</strong>.</p>
      <p style="margin:0 0 24px;font-size:15px;color:#454653;line-height:1.6;">Un conseiller revient vers vous sous <strong>24 heures ouvrées</strong> avec une proposition d'accompagnement adaptée à votre situation.</p>
      <p style="margin:0;font-size:14px;color:#6b6b78;">À très bientôt,<br>L'équipe DémarchesCivique</p>
    `),
  };
}

/** Reçu envoyé au client après paiement Stripe. */
export function receiptTemplate(p: {
  customerName: string;
  amountCents: number;
  currency: string;
  description: string;
  receiptUrl?: string;
  paymentDate: Date;
}): { subject: string; html: string } {
  const amount = (p.amountCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: p.currency.toUpperCase(),
  });
  const dateFr = p.paymentDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return {
    subject: `Reçu de paiement — ${amount} — DémarchesCivique`,
    html: shell(`
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#161616;">Merci ${escapeHtml(p.customerName)} 🙏</h1>
      <p style="margin:0 0 24px;font-size:15px;color:#454653;line-height:1.6;">Votre paiement a bien été enregistré. Voici votre reçu officiel.</p>
      <table cellpadding="14" cellspacing="0" style="width:100%;border:1px solid #eaeaef;border-radius:12px;font-size:14px;">
        <tr><td style="color:#6b6b78;width:140px;">Date</td><td style="font-weight:600;">${dateFr}</td></tr>
        <tr><td style="color:#6b6b78;">Prestation</td><td style="font-weight:600;">${escapeHtml(p.description)}</td></tr>
        <tr><td style="color:#6b6b78;">Montant</td><td style="font-weight:800;font-size:18px;color:${FRENCH_BLUE};">${amount}</td></tr>
      </table>
      ${p.receiptUrl ? `<p style="margin:24px 0 0;font-size:14px;"><a href="${p.receiptUrl}" style="color:${FRENCH_BLUE};font-weight:700;">Télécharger le reçu Stripe officiel →</a></p>` : ""}
      <p style="margin:24px 0 0;font-size:13px;color:#6b6b78;">Conservez ce reçu pour votre comptabilité.</p>
    `),
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
