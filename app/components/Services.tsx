const services = [
  {
    icon: "policy",
    title: "Demandeurs d'asile",
    desc: "Accompagnement complet pour les procédures OFPRA et CNDA, rédaction de récits et préparation aux entretiens.",
    gradient: "from-french-blue via-[#1a2a8a] to-[#000053]",
    accent: "bg-marianne-red/80",
  },
  {
    icon: "history_edu",
    title: "Étudiants",
    desc: "Gestion des visas d'études, renouvellement de titres et changement de statut vers le salariat.",
    gradient: "from-[#0a4ea8] via-[#2563c4] to-[#5b8def]",
    accent: "bg-white/30",
  },
  {
    icon: "assignment_ind",
    title: "Titre de séjour",
    desc: "Première demande ou renouvellement, nous sécurisons vos dossiers pour éviter les refus et les OQTF.",
    gradient: "from-[#7a1020] via-marianne-red to-[#ff6a4d]",
    accent: "bg-white/30",
  },
  {
    icon: "flag",
    title: "Naturalisation",
    desc: "Accès à la nationalité française par décret ou mariage. Audit de dossier et préparation aux tests.",
    gradient: "from-french-blue via-white to-marianne-red",
    accent: "bg-french-blue/20",
    invertIcon: true,
  },
  {
    icon: "family_restroom",
    title: "Regroupement familial",
    desc: "Réunissez votre famille en France avec une assistance experte sur les conditions de ressources et de logement.",
    gradient: "from-[#3a3a99] via-[#5b5bc4] to-[#a8b0f5]",
    accent: "bg-marianne-red/40",
  },
  {
    icon: "balance",
    title: "Régularisation",
    desc: "Conseil juridique pour les situations irrégulières (travail, vie privée et familiale) selon la circulaire Valls.",
    gradient: "from-[#2f1b50] via-[#5b3a8a] to-[#8f6dc4]",
    accent: "bg-marianne-red/30",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-surface-grey/60">
      <div className="max-w-content mx-auto px-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[26px] leading-8 sm:text-[32px] sm:leading-10 font-bold tracking-tight text-ink-black mb-4">
              Domaines d&apos;Intervention
            </h2>
            <p className="text-[16px] text-on-surface-variant">
              Une assistance complète et spécialisée pour chaque étape de votre
              vie en France.
            </p>
          </div>
          <div className="h-px grow mx-8 bg-outline-variant hidden md:block" />
          <span className="text-[14px] font-bold text-french-blue uppercase tracking-wider">
            6 Services clés
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <article
              key={s.title}
              className="bg-white border border-outline-variant card-hover group cursor-pointer rounded-xl overflow-hidden flex flex-col"
            >
              {/* Visual header */}
              <div
                className={`relative h-36 bg-linear-to-br ${s.gradient} overflow-hidden`}
              >
                {/* Decorative circles */}
                <div
                  className={`absolute -top-6 -right-6 w-28 h-28 rounded-full ${s.accent} blur-xl`}
                />
                <div
                  className={`absolute -bottom-10 -left-6 w-32 h-32 rounded-full ${s.accent} blur-2xl`}
                />
                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />
                {/* Large icon */}
                <span
                  className={`material-symbols-outlined absolute right-5 bottom-4 ${
                    s.invertIcon ? "text-french-blue" : "text-white"
                  }`}
                  style={{ fontSize: "84px", lineHeight: 1, opacity: 0.95 }}
                >
                  {s.icon}
                </span>
              </div>

              <div className="p-7 flex flex-col grow">
                <h3 className="text-[22px] leading-7 font-semibold text-ink-black mb-3">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-6 text-on-surface-variant mb-6 grow">
                  {s.desc}
                </p>
                <div className="flex items-center text-french-blue text-[14px] font-bold group-hover:gap-3 transition-all gap-2">
                  En savoir plus
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
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
