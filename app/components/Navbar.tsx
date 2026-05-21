"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#expertise", label: "Expertise" },
  { href: "#apropos", label: "À propos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-outline-variant transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-surface-container-lowest"
      }`}
    >
      <div className="flex justify-between items-center px-page h-24 max-w-content mx-auto">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="DémarchesCivique Logo"
            width={80}
            height={80}
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
            priority
          />
          <span className="text-[24px] leading-8 font-bold text-french-blue tracking-tight">
            DémarchesCivique
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#services"
            className="text-[14px] font-bold text-french-blue active-nav-item"
          >
            Services
          </Link>
          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14px] font-bold text-on-surface-variant hover:text-french-blue transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <button className="bg-french-blue text-white px-6 py-3 rounded-lg text-[14px] font-bold hover:opacity-90 transition-opacity active:scale-[0.98]">
            Prendre rendez-vous
          </button>
        </div>

        <button
          className="md:hidden text-french-blue p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-outline-variant bg-white px-page py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[14px] font-bold text-on-surface-variant hover:text-french-blue"
            >
              {l.label}
            </Link>
          ))}
          <button className="bg-french-blue text-white px-6 py-3 rounded-lg text-[14px] font-bold">
            Prendre rendez-vous
          </button>
        </div>
      )}
    </nav>
  );
}
