"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const ok = login(
      String(fd.get("username") ?? ""),
      String(fd.get("password") ?? "")
    );
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("Identifiants incorrects.");
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

        <div className="bg-white border border-ink-black/[0.08] rounded-2xl p-8 sm:p-10 shadow-xl">
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
                Espace admin
              </h1>
              <p className="text-[13px] text-on-surface-variant">
                Connexion sécurisée
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <label className="block">
              <span className="block text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                Identifiant
              </span>
              <input
                type="text"
                name="username"
                required
                autoComplete="username"
                placeholder="admin"
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

          <p className="text-[12px] text-on-surface-variant/70 text-center mt-6">
            Accès réservé aux administrateurs. Démo : <code>admin</code> /{" "}
            <code>admin2026</code>
          </p>
        </div>
      </div>
    </main>
  );
}
