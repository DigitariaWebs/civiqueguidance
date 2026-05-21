import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-surface-container-lowest/50">
      <div className="absolute inset-0 french-gradient-subtle pointer-events-none" />
      <div className="max-w-content mx-auto px-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[12px] font-bold uppercase tracking-widest mb-6 rounded">
              Service Public de l&apos;Accompagnement
            </span>
            <h1 className="text-[32px] leading-10 md:text-[48px] md:leading-[56px] font-bold tracking-tight text-ink-black mb-8">
              Accompagnement d&apos;excellence pour vos{" "}
              <span className="text-french-blue">démarches en France.</span>
            </h1>
            <p className="text-[18px] leading-7 text-on-surface-variant mb-10">
              Expertise juridique et administrative dédiée à la réussite de
              votre parcours républicain. Nous simplifions la complexité pour
              sécuriser votre avenir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-french-blue text-white px-8 py-4 rounded-lg text-[16px] font-bold hover:opacity-95 transition-all shadow-sm">
                Démarrer ma procédure
              </button>
              <button className="border-2 border-french-blue text-french-blue px-8 py-4 rounded-lg text-[16px] font-bold hover:bg-french-blue hover:text-white transition-all">
                Découvrir nos services
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuuud3TrtxSA6_So2qjeQOzXCzibX9Ys2vcf_a0ZQFrguFJCUEhIGB4rLr2M7NAze6qpJRH9TvfRron8U87cRst9GW6TPg54auLQrhfO_fAdLB8GZ9FTwIXSQlTIitO5v6bNCacwgCnxCHbHEvOKE1RWAM0TsjTfpX3juotQtYGokjlGryPKs3Sq5ypN9oFuLvhhE9H1jFxM5Mb2cHFfiR5wraCPNT0-ioVfNeDq01TURetv0exjisCsteuSYGjF0wq5cOKzruc7lu"
                alt="Ambiance de bureau professionnel"
                fill
                className="object-cover rounded-2xl shadow-2xl border-8 border-white/50"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-l-8 border-b-8 border-french-blue" />
              <div className="absolute -top-4 -right-4 w-16 h-16 border-r-8 border-t-8 border-marianne-red" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
