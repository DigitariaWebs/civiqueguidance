"use client";

import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

/**
 * Renders an ultra-premium, deeply textured institutional background.
 * Combines a diffuse Aurora with luxury security guilloché patterns and high-end geometric glass layers.
 */
export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen overflow-hidden bg-white">
      
      {/* 1. L'Aurora réadaptée : lumineuse et mouvante */}
      <AuroraBackground 
        className="!h-full !w-full opacity-55 mix-blend-multiply scale-110"
      >
        <></>
      </AuroraBackground>

      {/* 2. Éléments Géométriques Premium 3D Tridimensionnels (Style Maquette Verre/Ombre) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
        {/* Forme géométrique floutée géante en haut à droite */}
        <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-[40px] border border-ink-black/[0.03] bg-linear-to-br from-white/10 to-ink-black/[0.01] rotate-12 backdrop-blur-3xs shadow-2xl shadow-ink-black/[0.02]" />
        
        {/* Forme géométrique imbriquée en bas à gauche */}
        <div className="absolute bottom-[5%] left-[-10%] w-[35vw] h-[35vw] rounded-full border border-ink-black/[0.02] bg-linear-to-tr from-french-blue/[0.02] to-transparent -rotate-45" />
      </div>

      {/* 3. Filigrane de Haute Sécurité : Motif Guilloché Mathématique (Passeport / Documents officiels) */}
      <div className="absolute inset-0 opacity-[0.06] text-ink-black select-none z-10 mix-blend-difference">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            {/* Dégradé progressif pour effacer les lignes sur le centre */}
            <radialGradient id="center-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="60%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
            </radialGradient>
            
            {/* Motif complexe de sécurité (Grille de lignes imbriquées) */}
            <pattern id="guilloche-complex" width="160" height="160" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
              <path d="M 0,80 Q 40,40 80,80 T 160,80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <path d="M 0,80 Q 40,120 80,80 T 160,80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <path d="M 80,0 Q 120,40 80,80 T 80,160" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
              <path d="M 80,0 Q 40,40 80,80 T 80,160" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
              {/* Cercles concentriques de trame */}
              <circle cx="80" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.2" />
              <circle cx="80" cy="80" r="50" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2,2" opacity="0.4" />
            </pattern>
          </defs>
          
          {/* Application de la trame de sécurité sur tout l'écran */}
          <rect width="100%" height="100%" fill="url(#guilloche-complex)" />
          
          {/* Lignes d'ondes majeures (L'armature du document d'État) */}
          <g opacity="0.7">
            <path d="M-100,300 C300,100 600,600 1100,200 S1500,400 1600,500" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <path d="M-100,315 C300,115 600,615 1100,215 S1500,415 1600,515" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4,4" />
            <path d="M-100,285 C300,85 600,585 1100,185 S1500,385 1600,485" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          </g>
        </svg>
      </div>

      {/* 4. Trame de points de précision suisse (Dot Matrix) */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-20"
        style={{
          backgroundImage: `radial-gradient(currentColor 1.2px, transparent 1.2px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* 5. TEXTURE : Effet de Grain Argentique / Bruit Cinématique (Le secret des sites premium) */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 6. Masque radial d'éclairage de scène (Vignettage inverse pour focus central) */}
      <div className="absolute inset-0 bg-radial from-transparent via-white/10 to-white/80 z-20 pointer-events-none" />
    </div>
  );
}