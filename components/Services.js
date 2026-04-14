import Image from "next/image";
import Reveal from "@/components/Reveal";
import { PROJECTS, SERVICES } from "@/lib/siteConfig";

export default function Services() {
  return (
    <section id="servicos" className="snap-section section-divider section-ambient py-20 md:py-24 bg-[#0B1E3A] text-white scroll-mt-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <Reveal className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Servicos</p>
          <h2 className="text-3xl md:text-4xl font-bold">Servicos eletricos residenciais com padrao profissional</h2>
          <p className="text-white/80">
            Equipe preparada para diagnosticar, corrigir e prevenir falhas, com acabamento tecnico e seguranca.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={80 + index * 70}>
              <article className="card-interactive h-full flex flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-6">
                <div className="space-y-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-200 font-bold">
                    {service.title.charAt(0)}
                  </span>
                  <h3 className="text-xl font-semibold leading-snug min-h-14">{service.title}</h3>
                  <p className="text-white/80">{service.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="space-y-6">
          <Reveal>
            <h3 className="text-2xl font-semibold text-center">Projetos Realizados</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.image} delay={120 + index * 90}>
                <article className="card-interactive h-full flex flex-col rounded-2xl border border-white/15 bg-white/5 overflow-hidden">
                  <div className="relative aspect-[4/5] w-full bg-slate-950">
                    <Image src={project.image} alt={project.title} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-lg font-semibold">{project.title}</h4>
                    <p className="text-white/80">{project.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
