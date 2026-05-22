import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: ["Asile", "Titres de séjour", "Naturalisation", "Regroupement"],
  },
  {
    title: "Information",
    links: ["Contact", "Expertise", "Tarifs"],
  },
  {
    title: "Légal",
    links: ["Mentions Légales", "Politique de Confidentialité", "CGU"],
  },
];

export default function Footer() {
  return (
    // Fond clair officiel (style service-public.fr) avec texte sombre pour la clarté et le sérieux
    <footer className="relative bg-[#f6f6f6] border-t-2 border-[#000091] text-ink-black overflow-hidden">
      
      <div className="relative grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-6 px-page py-12 sm:py-16 max-w-content mx-auto">
        
        {/* Colonne d'identité (Logo de type républicain) */}
        <div className="col-span-2 md:col-span-4 mb-4 md:mb-0">
          <div className="flex items-center gap-4 mb-6">
            {/* Simulation du bloc Marianne/Gouvernemental clean */}
            <div className="flex flex-col border-l-2 border-[#000091] pl-3 py-1 uppercase tracking-wider font-extrabold text-[11px] leading-tight text-ink-black">
              <span>République</span>
              <span>Française</span>
            </div>
            
            <div className="h-8 w-px bg-ink-black/20" /> {/* Séparateur fin */}

            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="DémarchesCivique"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-[18px] font-black tracking-tight text-ink-black">
                DémarchesCivique
              </span>
            </div>
          </div>
          
          <p className="text-[14px] text-on-surface-variant mb-6 leading-relaxed max-w-sm">
            Accompagnement privé, indépendant et juridique pour les étrangers en France. Une expertise au service de votre intégration.
          </p>
          
          {/* Boutons de contact officiels et épurés (pas de ronds rouges vifs) */}
          <div className="flex gap-2">
            <Link
              href="#"
              aria-label="Partager"
              className="px-4 py-2 text-xs font-semibold rounded-md border border-[#000091] text-[#000091] bg-white hover:bg-[#f0f0ff] flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              Partager
            </Link>
            <Link
              href="#"
              aria-label="Email"
              className="px-4 py-2 text-xs font-semibold rounded-md border border-[#000091] text-[#000091] bg-white hover:bg-[#f0f0ff] flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              Nous écrire
            </Link>
          </div>
        </div>

        {/* Liens de navigation */}
        {columns.map((col, i) => (
          <div
            key={col.title}
            className={
              i === 0
                ? "md:col-span-2 md:col-start-6"
                : i === 1
                ? "md:col-span-2"
                : "md:col-span-3"
            }
          >
            <h5 className="text-[12px] font-black text-ink-black mb-4 uppercase tracking-widest">
              {col.title}
            </h5>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="text-[14px] text-on-surface-variant hover:text-[#000091] hover:underline underline-offset-4 transition-all"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bandeau de copyright & Mentions légales obligatoires */}
      <div className="relative border-t border-ink-black/10 py-6 px-page max-w-content mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-on-surface-variant/80">
          <p>
            © {new Date().getFullYear()} DémarchesCivique. Service indépendant d&apos;accompagnement.
          </p>
          <div className="flex gap-4 text-[11px]">
            <span className="text-[#e1000f] font-bold">●</span> Non affilié à l&apos;administration publique.
          </div>
        </div>
      </div>
    </footer>
  );
}