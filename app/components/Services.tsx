"use client";

import React from "react";

const services = [
  {
    icon: "gavel",
    title: "Demandeurs d'asile",
    desc: "Accompagnement complet pour les procédures OFPRA et CNDA, rédaction de récits et préparation aux entretiens.",
    gridClass: "md:col-span-2 lg:col-span-7",
    bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "school",
    title: "Étudiants",
    desc: "Gestion des visas d'études, renouvellement de titres et changement de statut.",
    gridClass: "md:col-span-1 lg:col-span-5",
    bgImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "badge",
    title: "Titre de séjour",
    desc: "Première demande ou renouvellement, nous sécurisons vos dossiers pour éviter les refus et les OQTF.",
    gridClass: "md:col-span-1 lg:col-span-5",
    bgImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "flag",
    title: "Naturalisation",
    desc: "Accès à la nationalité française par décret ou mariage. Audit de dossier et préparation rigoureuse aux tests.",
    gridClass: "md:col-span-2 lg:col-span-7",
    bgImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "diversity_3",
    title: "Regroupement familial",
    desc: "Réunissez votre famille en France avec une assistance experte sur les conditions de ressources et de logement.",
    gridClass: "md:col-span-1 lg:col-span-6",
    bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "balance",
    title: "Régularisation",
    desc: "Conseil juridique pour les situations irrégulières (travail, vie privée et familiale) selon la circulaire Valls.",
    gridClass: "md:col-span-1 lg:col-span-6",
    bgImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-content mx-auto px-page relative z-10">
        
        {/* En-tête avec la réplique exacte de ton soulignement incurvé rouge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl relative">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-french-blue bg-french-blue/5 px-3 py-1 rounded-full border border-french-blue/10">
              Expertise
            </span>
            
            <div className="relative inline-block w-full mt-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink-black pb-3">
                Champs d&apos;Intervention
              </h2>
              
              {/* Le fameux trait rouge incurvé dynamique (effet pinceau / feutre de ta capture) */}
              <div className="absolute left-0 bottom-0 w-full max-w-[280px] h-[8px] pointer-events-none">
                <svg viewBox="0 0 300 10" width="100%" height="100%" preserveAspectRatio="none">
                  <path
                    d="M5 5 Q 150 9, 295 4"
                    fill="none"
                    stroke="#E1000F"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <p className="text-[14px] text-on-surface-variant leading-relaxed opacity-80 mt-5">
              Une ingénierie juridique rigoureuse pour sécuriser et accélérer chaque étape de vos démarches réglementaires.
            </p>
          </div>
          
          <div className="h-[1px] grow mx-8 bg-ink-black/5 hidden md:block" />
          
          <span className="text-[11px] font-mono font-bold text-ink-black/40 bg-white/80 px-3 py-1.5 rounded-lg border border-ink-black/[0.04]">
            SERVICES COMPLETS
          </span>
        </div>

        {/* Grille Bento avec Photos en Couleur et Zoom Unique */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {services.map((s, index) => (
            <article
              key={s.title}
              className={`relative bg-ink-black border border-ink-black/[0.08] transition-all duration-500 group cursor-pointer rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 ${s.gridClass}`}
            >
              
              {/* IMAGE EN BACKGROUND : En couleur, pas d'overlay de couleur crado, juste un zoom propre */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
                <img 
                  src={s.bgImage} 
                  alt={s.title}
                  className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Dégradé neutre permanent (noir à transparent) pour assurer la lisibilité parfaite du texte blanc */}
                <div className="absolute inset-0 bg-linear-to-t from-ink-black via-ink-black/80 to-ink-black/20" />
              </div>

              {/* CONTENU AU PREMIER PLAN */}
              <div className="relative z-10 flex flex-col h-full justify-between grow">
                
                <div>
                  {/* Badge icône blanc translucide */}
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-10 transition-all duration-500 group-hover:bg-white group-hover:border-transparent group-hover:scale-105">
                    <span 
                      className="material-symbols-outlined text-white group-hover:text-french-blue transition-colors duration-300"
                      style={{ 
                        fontSize: "20px",
                        strokeWidth: "1.5",
                        fontVariationSettings: "'wght' 300, 'opsz' 24"
                      }}
                    >
                      {s.icon}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {s.title}
                  </h3>
                  
                  {/* Descriptif */}
                  <p className="text-[13.5px] leading-relaxed text-white/80 max-w-xl group-hover:text-white transition-colors duration-300">
                    {s.desc}
                  </p>
                </div>

                {/* Pied de la carte */}
                <div className="mt-12 flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center text-white/80 group-hover:text-white text-[11px] font-extrabold tracking-widest uppercase gap-1 transition-colors">
                    <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white group-hover:after:w-full after:transition-all after:duration-300">
                      Découvrir le pôle
                    </span>
                    <span className="material-symbols-outlined text-[14px] transition-transform duration-300 group-hover:translate-x-1" style={{ fontVariationSettings: "'wght' 300" }}>
                      arrow_right_alt
                    </span>
                  </div>
                  
                  {/* Index de la carte */}
                  <span className="text-[10px] font-mono font-bold text-white/30 group-hover:text-white/60 transition-colors">
                    [ 0{index + 1} ]
                  </span>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}