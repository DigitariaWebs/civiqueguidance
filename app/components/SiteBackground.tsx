"use client";

import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

/**
 * Renders an elegant, premium institutional background.
 * Blends a soft, bright tricolor Aurora with administrative geometric vector lines.
 */
export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen overflow-hidden bg-white">
      
      {/* 1. L'Aurora réadaptée : très lumineuse et diffuse (Bleu/Blanc/Rouge subtil) */}
      <AuroraBackground 
        className="!h-full !w-full opacity-60 mix-blend-multiply scale-110"
        // Note : Assurez-vous que votre fichier aurora-background utilise des variables CSS claires.
        // Si vous utilisez la version de Shadcn/Aceternity, elle s'adaptera parfaitement.
      >
        <></>
      </AuroraBackground>

      {/* 2. Superposition de lignes géométriques "Tech & Administration" (Style filigrane) */}
      <div className="absolute inset-0 opacity-[0.04] text-ink-black select-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="none">
          {/* Grille de perspective fine */}
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Lignes abstraites inspirées des structures de sécurité des documents officiels */}
          <path d="M-100,200 Q300,50 800,400 T1600,100" fill="none" stroke="url(#line-grad)" strokeWidth="1.5" />
          <path d="M-50,300 Q400,600 900,200 T1500,700" fill="none" stroke="url(#line-grad)" strokeWidth="1" />
          <path d="M0,700 Q500,400 1100,800 T1600,400" fill="none" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="5,5" />
          
          {/* Formes géométriques polygonales discrètes en arrière-plan (comme sur la maquette à droite) */}
          <polygon points="1200,100 1350,150 1300,300 1150,200" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
          <polygon points="100,600 250,550 300,700 150,750" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      </div>

      {/* 3. Léger voile de texture (Bruit ou points discrets pour lier le tout) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 4. Effet de fondu radial pour garder le centre de l'écran très lisible */}
      <div className="absolute inset-0 bg-radial from-transparent via-white/20 to-white/60" />
    </div>
  );
}