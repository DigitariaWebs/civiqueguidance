"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "ds_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) {
      // Petit délai pour ne pas surgir avant que la page soit lisible
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(KEY, "accepted");
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem(KEY, "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white border border-ink-black/8 rounded-2xl shadow-2xl p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-french-blue/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-french-blue text-[20px]">
            cookie
          </span>
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-ink-black mb-1">
            Cookies & confidentialité
          </h3>
          <p className="text-[13px] leading-relaxed text-on-surface-variant">
            Nous utilisons des cookies essentiels au fonctionnement du site
            (session admin, préférences). Aucune donnée n&apos;est partagée
            avec des tiers à des fins publicitaires.{" "}
            <Link
              href="/conditions-utilisation"
              className="text-french-blue underline underline-offset-2 hover:no-underline"
            >
              En savoir plus
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={refuse}
          className="px-4 py-2 text-[13px] font-bold text-on-surface-variant hover:text-ink-black hover:bg-ink-black/[0.04] rounded-lg transition-colors"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={accept}
          className="px-5 py-2 text-[13px] font-bold text-white bg-french-blue hover:bg-[#000066] rounded-lg transition-colors shadow-sm"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
