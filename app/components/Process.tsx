const steps = [
  {
    n: "01",
    icon: "call",
    title: "Contact",
    desc: "Prise de contact initiale et analyse sommaire de votre situation administrative.",
  },
  {
    n: "02",
    icon: "description",
    title: "Proposition",
    desc: "Établissement d'un devis transparent et d'une stratégie juridique personnalisée.",
  },
  {
    n: "03",
    icon: "handshake",
    title: "Accompagnement",
    desc: "Montage du dossier, relecture critique et suivi constant avec les autorités.",
  },
  {
    n: "04",
    icon: "verified",
    title: "Finalisation",
    desc: "Obtention de votre titre ou validation de votre démarche administrative.",
  },
];

export default function Process() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface-container-lowest/50">
      <div className="max-w-content mx-auto px-page">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[26px] leading-8 sm:text-[32px] sm:leading-10 font-bold tracking-tight text-ink-black mb-4">
            Notre Processus d&apos;Accompagnement
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
            Une méthode rigoureuse en quatre étapes pour garantir la clarté et
            l&apos;efficacité de vos démarches.
          </p>
        </div>

        <div className="relative">
          {/* Horizontal connector line (visible from md and up) */}
          <div className="hidden md:block absolute top-[44px] lg:top-12 left-0 right-0 mx-auto h-0.5 bg-linear-to-r from-french-blue via-french-blue/60 to-marianne-red/70" />

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            {steps.map((s, i) => {
              const isLast = i === steps.length - 1;
              return (
                <li
                  key={s.n}
                  className="flex flex-col items-center text-center"
                >
                  {/* Numbered marker — layered medal style */}
                  <div className="relative z-10">
                    {/* Outer halo */}
                    <div
                      className={`absolute inset-0 rounded-full blur-xl scale-110 ${
                        isLast ? "bg-marianne-red/30" : "bg-french-blue/30"
                      }`}
                    />
                    {/* Outer ring */}
                    <div
                      className={`relative w-[88px] h-[88px] lg:w-24 lg:h-24 rounded-full p-[3px] ${
                        isLast
                          ? "bg-linear-to-br from-marianne-red via-[#ff6a4d] to-[#7a1020]"
                          : "bg-linear-to-br from-french-blue via-[#5b8def] to-[#000053]"
                      } shadow-xl`}
                    >
                      {/* White separator */}
                      <div className="w-full h-full rounded-full bg-white p-[3px]">
                        {/* Inner gradient core */}
                        <div
                          className={`w-full h-full rounded-full flex items-center justify-center relative overflow-hidden ${
                            isLast
                              ? "bg-linear-to-br from-marianne-red to-[#7a1020]"
                              : "bg-linear-to-br from-french-blue to-[#000053]"
                          }`}
                        >
                          {/* Subtle dot pattern inside */}
                          <div
                            className="absolute inset-0 opacity-25"
                            style={{
                              backgroundImage:
                                "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
                              backgroundSize: "8px 8px",
                            }}
                          />
                          {/* Glossy highlight */}
                          <div className="absolute inset-x-2 top-1.5 h-1/3 rounded-full bg-white/15 blur-md" />
                          <span className="relative text-white font-bold text-[22px] lg:text-[26px] tracking-tight drop-shadow">
                            {s.n}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Icon badge */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border-2 ${
                        isLast ? "border-marianne-red" : "border-french-blue"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined ${
                          isLast ? "text-marianne-red" : "text-french-blue"
                        }`}
                        style={{ fontSize: "18px" }}
                      >
                        {s.icon}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-8 max-w-xs px-2">
                    <h4 className="text-[18px] sm:text-[20px] leading-7 font-semibold text-ink-black mb-2">
                      {s.title}
                    </h4>
                    <p className="text-[14px] sm:text-[15px] leading-6 text-on-surface-variant">
                      {s.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
