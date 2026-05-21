const values = [
  {
    icon: "visibility",
    title: "Transparence",
    desc: "Aucun frais caché. Nous vous informons en temps réel de l'avancée de vos dossiers et des chances de succès réelles.",
  },
  {
    icon: "verified_user",
    title: "Expertise",
    desc: "Une connaissance approfondie du droit des étrangers et des rouages de l'administration préfectorale française.",
  },
  {
    icon: "favorite",
    title: "Approche Humaine",
    desc: "Parce que derrière chaque dossier se trouve une vie humaine, nous traitons chaque cas avec empathie et dignité.",
  },
];

export default function TrustFactors() {
  return (
    <section
      id="expertise"
      className="py-16 sm:py-20 lg:py-24 overflow-hidden relative bg-surface-grey/60"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-marianne-red opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-content mx-auto px-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <div>
            <h2 className="text-[26px] leading-8 sm:text-[32px] sm:leading-10 font-bold tracking-tight mb-6 sm:mb-8 text-ink-black">
              Pourquoi choisir CiviqueGuidance ?
            </h2>
            <div className="space-y-8 sm:space-y-10">
              {values.map((v) => (
                <div key={v.title} className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-french-blue/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-french-blue">
                      {v.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[24px] leading-8 font-semibold mb-2 text-ink-black">
                      {v.title}
                    </h4>
                    <p className="text-on-surface-variant text-[16px]">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ConsultForm />
        </div>
      </div>
    </section>
  );
}

function ConsultForm() {
  return (
    <div className="relative p-6 sm:p-8 border rounded-xl backdrop-blur-sm bg-white shadow-xl border-outline-variant">
      <div className="mb-8">
        <h3 className="text-[24px] leading-8 font-semibold mb-6 text-ink-black">
          Consultation Express
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-on-surface-variant">
              Nom Complet
            </label>
            <input
              type="text"
              placeholder="Jean Dupont"
              className="w-full bg-surface-bright border border-outline-variant rounded-lg py-3 px-4 text-on-surface placeholder:text-outline focus:border-french-blue focus:outline-none focus:ring-0 transition-all"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-2 text-on-surface-variant">
              Type de Demande
            </label>
            <select className="w-full bg-surface-bright border border-outline-variant rounded-lg py-3 px-4 text-on-surface focus:border-french-blue focus:outline-none focus:ring-0 transition-all">
              <option>Titre de séjour</option>
              <option>Asile</option>
              <option>Naturalisation</option>
              <option>Autre</option>
            </select>
          </div>
          <button
            type="button"
            className="w-full bg-french-blue text-white py-4 rounded-lg text-[16px] font-bold hover:opacity-90 transition-colors mt-4"
          >
            Demander un rappel gratuit
          </button>
        </form>
      </div>
      <div className="flex items-center gap-4 text-[12px] border-t border-outline-variant/30 pt-6 text-on-surface-variant">
        <span className="material-symbols-outlined text-[16px]">lock</span>
        Données sécurisées et confidentielles conformes RGPD.
      </div>
    </div>
  );
}
