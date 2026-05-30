import Stripe from "stripe";

/**
 * Client Stripe côté serveur uniquement (ne JAMAIS exposer dans un Client Component).
 * Lance une erreur claire si la clé secrète n'est pas définie.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY manquante. Ajoute-la dans .env.local (et dans Vercel Environment Variables)."
    );
  }
  return new Stripe(key, {
    apiVersion: "2026-05-27.dahlia",
  });
}

export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}
