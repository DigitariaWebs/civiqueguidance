"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCurrentClient, signOut } from "@/lib/client-auth";
import type { User } from "@supabase/supabase-js";

export default function ClientShell({
  children,
}: {
  children: (user: User) => React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const u = await getCurrentClient();
      if (!u) {
        router.replace("/compte/connexion");
        return;
      }
      setUser(u);
      setReady(true);
    })();
  }, [router]);

  async function onLogout() {
    await signOut();
    router.replace("/");
    router.refresh();
  }

  if (!ready || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[14px] text-on-surface-variant">Chargement…</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6fa]">
      <header className="bg-white border-b border-ink-black/8 sticky top-0 z-40">
        <div className="flex items-center justify-between gap-6 px-4 md:px-8 h-16 max-w-content mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="text-[16px] font-black tracking-tight text-ink-black hidden sm:inline">
              Mon espace
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[12px] text-on-surface-variant">
              {user.email}
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 bg-marianne-red/5 hover:bg-marianne-red text-marianne-red hover:text-white border border-marianne-red/20 hover:border-marianne-red px-4 py-2 rounded-lg text-[13px] font-bold transition-all"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'wght' 400" }}
              >
                logout
              </span>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-content mx-auto px-4 md:px-8 py-8">
        {children(user)}
      </main>
    </div>
  );
}
