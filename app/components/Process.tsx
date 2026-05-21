const steps = [
  {
    n: 1,
    title: "Contact",
    desc: "Prise de contact initiale et analyse sommaire de votre situation administrative.",
  },
  {
    n: 2,
    title: "Proposition",
    desc: "Établissement d'un devis transparent et d'une stratégie juridique personnalisée.",
  },
  {
    n: 3,
    title: "Accompagnement",
    desc: "Montage du dossier, relecture critique et suivi constant avec les autorités.",
  },
  {
    n: 4,
    title: "Finalisation",
    desc: "Obtention de votre titre ou validation de votre démarche administrative.",
  },
];

export default function Process() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface-container-lowest/50">
      <div className="max-w-content mx-auto px-page">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-[26px] leading-8 sm:text-[32px] sm:leading-10 font-bold tracking-tight text-ink-black mb-4">
            Notre Processus d&apos;Accompagnement
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
            Une méthode rigoureuse en quatre étapes pour garantir la clarté et
            l&apos;efficacité de vos démarches.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-outline-variant" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white lg:bg-transparent p-6 lg:p-0 rounded-lg"
              >
                <div className="w-16 h-16 rounded-full bg-french-blue text-white flex items-center justify-center text-[24px] font-semibold mb-6 relative z-10 border-4 border-white scale-110 shadow-lg">
                  {s.n}
                </div>
                <h4 className="text-[24px] leading-8 font-semibold text-ink-black mb-3">
                  {s.title}
                </h4>
                <p className="text-[16px] text-on-surface-variant">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
