import { DIFFERENTIALS } from "@/lib/siteConfig";
import Reveal from "@/components/Reveal";

export default function Differentials() {
  return (
    <section id="diferenciais" className="snap-section section-divider py-20 md:py-24 bg-gray-100 text-slate-900 scroll-mt-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <Reveal className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-700">Diferenciais</p>
          <h2 className="text-3xl md:text-4xl font-bold">Qualidade, seguranca e confianca em cada atendimento</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIALS.map((item, index) => (
            <Reveal key={item.title} delay={80 + index * 70}>
              <article className="card-interactive h-full flex flex-col justify-between rounded-2xl border border-slate-300 bg-white p-6">
                <div className="space-y-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-semibold">+</span>
                  <h3 className="text-xl font-semibold min-h-14">{item.title}</h3>
                  <p className="text-slate-700">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
