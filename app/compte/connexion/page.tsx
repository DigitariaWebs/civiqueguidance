"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signIn, translateAuthError } from "@/lib/client-auth";

export default function ClientLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const result = await signIn(
      String(fd.get("email") ?? ""),
      String(fd.get("password") ?? "")
    );
    if (result.ok) {
      router.push("/compte");
      router.refresh();
    } else {
      setError(translateAuthError(result.error));
      setBusy(false);
    }
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
                Connexion
              </h1>
              <p className="text-[13px] text-on-surface-variant">
                Accédez à votre espace
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <label className="block">
              <span className="block text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
                className="w-full bg-white border border-ink-black/10 rounded-xl px-4 py-3 text-[15px] text-ink-black placeholder:text-ink-black/30 focus:border-french-blue focus:ring-2 focus:ring-french-blue/10 focus:outline-none transition-all"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                Mot de passe
              </span>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-white border border-ink-black/10 rounded-xl px-4 py-3 text-[15px] text-ink-black placeholder:text-ink-black/30 focus:border-french-blue focus:ring-2 focus:ring-french-blue/10 focus:outline-none transition-all"
              />
            </label>

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
              {busy ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          <p className="text-[13px] text-on-surface-variant text-center mt-6">
            Pas encore inscrit ?{" "}
            <Link
              href="/compte/inscription"
              className="text-french-blue font-bold hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
