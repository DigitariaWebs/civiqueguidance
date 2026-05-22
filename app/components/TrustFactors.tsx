"use client";

import React from "react";

// Sélection d'icônes plus adaptées et sérieuses
const values = [
  {
    icon: "gavel", // Le marteau de justice / la règle -> Évoque la loi et la clarté immédiate
    title: "Transparence absolue",
    desc: "Aucun frais caché. Nous vous informons en temps réel de l'avancée de vos dossiers et des chances de succès réelles.",
  },
  {
    icon: "balance", // La balance de la justice -> L'expertise juridique pure
    title: "Expertise pointue",
    desc: "Une connaissance approfondie du droit des étrangers et des rouages de l'administration préfectorale française.",
  },
  {
    icon: "shield_person", // Protection / Accompagnement humain -> Plus fort et professionnel que le simple "cœur"
    title: "Engagement humain",
    desc: "Parce que derrière chaque dossier se trouve une vie humaine, nous traitons chaque cas avec la plus grande dignité.",
  },
];

export default function TrustFactors() {
  return (
    <section
      id="expertise"
      className="py-20 sm:py-28 overflow-hidden relative bg-transparent"
    >
      {/* Halos de lumière subtils */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-marianne-red/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-french-blue/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />

      <div className="max-w-content mx-auto px-page relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Colonne Gauche : Valeurs Stylisées */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-french-blue/5 text-french-blue mb-6 border border-french-blue/10 tracking-wide">
              <span className="w-1 h-1 rounded-full bg-french-blue animate-pulse" />
              Garanties & Déontologie
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-12 text-ink-black max-w-xl leading-[1.15]">
              Un accompagnement bâti sur la confiance
            </h2>
            
            <div className="space-y-10">
              {values.map((v) => (
                <div 
                  key={v.title} 
                  className="flex gap-8 items-start group relative"
                >
                  {/* Traitement d'icône Haute Couture / Architectural */}
                  <div className="shrink-0 relative flex items-center justify-center w-16 h-16">
                    {/* Anneau extérieur fin en pointillé, s'active au hover */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-french-blue/20 group-hover:scale-110 group-hover:border-french-blue/50 group-hover:rotate-45 transition-all duration-700" />
                    
                    {/* Disque central effet dépoli */}
                    <div className="absolute w-12 h-12 rounded-full bg-white border border-ink-black/5 shadow-xs flex items-center justify-center transition-all duration-300 group-hover:bg-french-blue/5 group-hover:border-french-blue/20">
                      {/* L'icône configurée en mode ultra-fin (wght: 200) et Sharp */}
                      <span 
                        className="material-symbols-outlined text-french-blue transition-all duration-300 group-hover:scale-105" 
                        style={{ 
                          fontSize: "22px",
                          fontVariationSettings: "'wght' 200, 'opsz' 24, 'GRAD' 0" // Look minimaliste et luxe
                        }}
                      >
                        {v.icon}
                      </span>
                    </div>
                  </div>
                  
                  {/* Texte descriptif */}
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-2 text-ink-black tracking-tight transition-colors group-hover:text-french-blue">
                      {v.title}
                    </h4>
                    <p className="text-on-surface-variant text-[15px] leading-relaxed max-w-xl">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne Droite : Formulaire Premium */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-linear-to-tr from-french-blue/5 via-transparent to-marianne-red/5 rounded-3xl blur-2xl opacity-70 pointer-events-none" />
            <ConsultForm />
          </div>

        </div>
      </div>
    </section>
  );
}

function ConsultForm() {
  return (
    <div className="relative p-8 sm:p-10 rounded-2xl bg-white/80 backdrop-blur-md shadow-2xl shadow-ink-black/5 border border-white flex flex-col justify-between">
      
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-ink-black tracking-tight mb-1">
              Consultation Express
            </h3>
            <p className="text-xs text-on-surface-variant">Réponse ou rappel sous 24h ouvrées</p>
          </div>
          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-700 border border-green-200 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            En ligne
          </span>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest mb-2 text-ink-black/60">
              Nom Complet
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Jean Dupont"
                className="w-full bg-white border border-ink-black/10 rounded-xl py-3.5 pl-4 pr-10 text-ink-black placeholder:text-ink-black/20 focus:border-french-blue focus:ring-4 focus:ring-french-blue/5 focus:outline-none transition-all"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-black/20" style={{ fontSize: "18px", fontVariationSettings: "'wght' 300" }}>
                person
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest mb-2 text-ink-black/60">
              Nature de votre démarche
            </label>
            <div className="relative">
              <select className="w-full bg-white border border-ink-black/10 rounded-xl py-3.5 pl-4 pr-10 text-ink-black appearance-none focus:border-french-blue focus:ring-4 focus:ring-french-blue/5 focus:outline-none transition-all cursor-pointer">
                <option>Titre de séjour & Régularisation</option>
                <option>Demande d&apos;Asile</option>
                <option>Naturalisation Française</option>
                <option>Recours administratif</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-black/40 pointer-events-none" style={{ fontSize: "18px" }}>
                expand_more
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-[#000091] text-white py-4 rounded-xl text-sm font-bold tracking-wide shadow-xl shadow-french-blue/10 hover:bg-[#000066] active:scale-[0.99] transition-all mt-6 uppercase"
          >
            Être recontacté gratuitement
          </button>
        </form>
      </div>

      <div className="flex items-start gap-3 text-[11px] border-t border-ink-black/5 pt-6 mt-8 text-on-surface-variant/70 leading-relaxed">
        <span className="material-symbols-outlined text-french-blue shrink-0" style={{ fontSize: "16px", fontVariationSettings: "'wght' 300" }}>
          verified
        </span>
        <p>
          Dispositif sécurisé de protection des données. Vos informations restent strictement confidentielles au titre du secret professionnel et du <span className="font-semibold text-ink-black">RGPD</span>.
        </p>
      </div>
    </div>
  );
}