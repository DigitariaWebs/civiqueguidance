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
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-6 px-page py-12 sm:py-16 max-w-content mx-auto">
        <div className="col-span-2 md:col-span-4 mb-4 md:mb-0">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/logo.png"
              alt="DémarchesCivique"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-[20px] font-bold text-french-blue">
              DémarchesCivique
            </span>
          </div>
          <p className="text-[16px] text-on-surface-variant mb-6 leading-relaxed">
            Accompagnement administratif et juridique pour les étrangers en
            France. Une expertise au service de votre intégration.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-on-surface-variant hover:text-french-blue"
            >
              <span className="material-symbols-outlined">share</span>
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant hover:text-french-blue"
            >
              <span className="material-symbols-outlined">mail</span>
            </Link>
          </div>
        </div>

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
            <h5 className="text-[14px] font-bold text-ink-black mb-6 uppercase tracking-wider">
              {col.title}
            </h5>
            <ul className="space-y-4">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="text-[12px] text-on-surface-variant hover:text-french-blue transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-outline-variant/30 py-8 px-page max-w-content mx-auto">
        <p className="text-[12px] text-on-surface-variant text-center opacity-70">
          © {new Date().getFullYear()} DémarchesCivique. Service public de
          l&apos;accompagnement administratif.
        </p>
      </div>
    </footer>
  );
}
