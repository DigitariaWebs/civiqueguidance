export default function MapSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-content mx-auto px-page">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-[26px] leading-8 sm:text-[32px] sm:leading-10 font-bold tracking-tight text-ink-black mb-4">
            Nous trouver
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
            Cabinet d&apos;accompagnement administratif au cœur de Paris. Nos
            conseillers vous reçoivent sur rendez-vous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Map */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full">
              <iframe
                title="Localisation du cabinet DémarchesCivique"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.3200%2C48.8530%2C2.3600%2C48.8700&layer=mapnik&marker=48.8615%2C2.3400"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-lg shadow-md px-4 py-3 border border-outline-variant/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-french-blue">
                  location_on
                </span>
                <div>
                  <p className="text-[12px] font-bold text-french-blue uppercase tracking-wider">
                    Cabinet principal
                  </p>
                  <p className="text-[14px] font-semibold text-ink-black">
                    Paris, 1<sup>er</sup> arrondissement
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <div className="bg-white border border-outline-variant rounded-2xl shadow-xl p-7 flex flex-col">
            <h3 className="text-[20px] font-semibold text-ink-black mb-6">
              Informations pratiques
            </h3>

            <ul className="space-y-5 grow">
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-french-blue/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-french-blue text-[20px]">
                    location_on
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Adresse
                  </p>
                  <p className="text-[15px] text-ink-black">
                    12 rue de la République
                    <br />
                    75001 Paris, France
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-french-blue/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-french-blue text-[20px]">
                    schedule
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Horaires
                  </p>
                  <p className="text-[15px] text-ink-black">
                    Lun-Ven : 9h - 18h
                    <br />
                    Sam : sur rendez-vous
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-marianne-red/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-marianne-red text-[20px]">
                    call
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Téléphone
                  </p>
                  <p className="text-[15px] text-ink-black">
                    +33 1 23 45 67 89
                  </p>
                </div>
              </li>
            </ul>

            <button className="mt-6 w-full bg-french-blue text-white py-3 rounded-lg text-[15px] font-bold hover:opacity-90 transition-opacity">
              Itinéraire sur Google Maps
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
