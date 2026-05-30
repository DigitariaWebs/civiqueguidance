"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signUp, translateAuthError } from "@/lib/client-auth";

export default function ClientSignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const result = await signUp({
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      fullName: String(fd.get("fullName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
    });
    if (result.ok) {
      setSent(true);
    } else {
      setError(translateAuthError(result.error));
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center bg-white border border-ink-black/8 rounded-2xl p-10 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-french-blue/10 flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-french-blue text-[32px]">
              mark_email_read
            </span>
          </div>
          <h1 className="text-2xl font-bold text-ink-black mb-3">
            Vérifie ta boîte de réception
          </h1>
          <p className="text-[15px] text-on-surface-variant mb-6">
            On t&apos;a envoyé un lien de confirmation. Clique dessus pour
            activer ton compte, puis reviens te connecter.
          </p>
          <Link
            href="/compte/connexion"
            className="inline-block bg-french-blue text-white px-6 py-3 rounded-lg text-[14px] font-bold"
          >
            Aller à la connexion
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-on-surface-variant hover:text-french-blue mb-8 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Retour au site
        </Link>

        <div className="bg-white border border-ink-black/8 rounded-2xl p-8 sm:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-[20px] font-black tracking-tight text-ink-black leading-tight">
                Créer mon compte
              </h1>
              <p className="text-[13px] text-on-surface-variant">
                Accédez à votre espace personnel
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Field label="Nom complet" required>
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Jean Dupont"
                className="form-input"
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
                className="form-input"
              />
            </Field>
            <Field label="Téléphone" required>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                placeholder="+33 6 12 34 56 78"
                className="form-input"
              />
            </Field>
            <Field label="Mot de passe" hint="Minimum 6 caractères">
              <input
                type="password"
                name="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="••••••••"
                className="form-input"
              />
            </Field>

            {error && (
              <div className="bg-marianne-red/5 border border-marianne-red/20 text-marianne-red rounded-xl px-4 py-3 text-[13px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-french-blue hover:bg-[#000066] disabled:opacity-60 text-white py-3.5 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all"
            >
              {busy ? "Création…" : "Créer mon compte"}
            </button>
          </form>

          <p className="text-[13px] text-on-surface-variant text-center mt-6">
            Déjà inscrit ?{" "}
            <Link
              href="/compte/connexion"
              className="text-french-blue font-bold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
      <style jsx>{`
        .form-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(22, 22, 22, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #161616;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder {
          color: rgba(22, 22, 22, 0.35);
        }
        .form-input:focus {
          border-color: #000091;
          box-shadow: 0 0 0 4px rgba(0, 0, 145, 0.08);
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
        {label}
        {required && <span className="text-marianne-red ml-1">*</span>}
      </span>
      {children}
      {hint && (
        <span className="block text-[11px] text-on-surface-variant/70 mt-1">
          {hint}
        </span>
      )}
    </label>
  );
}
