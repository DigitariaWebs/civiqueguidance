export default function CTA() {
  return (
    <section className="py-20 bg-surface-container-lowest/50">
      <div className="max-w-content mx-auto px-page">
        <div className="bg-surface-grey border border-outline-variant p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 rounded-xl">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-[32px] leading-10 font-bold tracking-tight text-ink-black mb-4">
              Prêt à régulariser votre situation ?
            </h2>
            <p className="text-[16px] text-on-surface-variant">
              Nos conseillers sont disponibles pour un premier diagnostic
              gratuit de votre dossier par téléphone ou en cabinet.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="bg-marianne-red text-white px-8 py-4 rounded-lg text-[16px] font-bold hover:opacity-90 shadow-sm whitespace-nowrap">
              Urgences Administratives
            </button>
            <button className="bg-french-blue text-white px-8 py-4 rounded-lg text-[16px] font-bold hover:opacity-90 shadow-sm whitespace-nowrap">
              Fixer un rendez-vous
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
