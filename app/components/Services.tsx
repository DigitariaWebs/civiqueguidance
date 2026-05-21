const services = [
  {
    icon: "policy",
    title: "Demandeurs d'asile",
    desc: "Accompagnement complet pour les procédures OFPRA et CNDA, rédaction de récits et préparation aux entretiens.",
  },
  {
    icon: "history_edu",
    title: "Étudiants",
    desc: "Gestion des visas d'études, renouvellement de titres et changement de statut vers le salariat.",
  },
  {
    icon: "assignment_ind",
    title: "Titre de séjour",
    desc: "Première demande ou renouvellement, nous sécurisons vos dossiers pour éviter les refus et les OQTF.",
  },
  {
    icon: "flag",
    title: "Naturalisation",
    desc: "Accès à la nationalité française par décret ou mariage. Audit de dossier et préparation aux tests.",
  },
  {
    icon: "family_restroom",
    title: "Regroupement familial",
    desc: "Réunissez votre famille en France avec une assistance experte sur les conditions de ressources et de logement.",
  },
  {
    icon: "balance",
    title: "Régularisation",
    desc: "Conseil juridique pour les situations irrégulières (travail, vie privée et familiale) selon la circulaire Valls.",
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
            <div
              key={s.title}
              className="bg-white p-8 border border-outline-variant card-hover group cursor-pointer rounded"
            >
              <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-primary-fixed transition-colors rounded">
                <span className="material-symbols-outlined text-french-blue">
                  {s.icon}
                </span>
              </div>
              <h3 className="text-[24px] leading-8 font-semibold text-ink-black mb-3">
                {s.title}
              </h3>
              <p className="text-[16px] text-on-surface-variant mb-6">
                {s.desc}
              </p>
              <div className="flex items-center text-french-blue text-[14px] font-bold">
                En savoir plus
                <span className="material-symbols-outlined ml-2 text-[18px]">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
