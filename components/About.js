import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="sobre" className="snap-section section-divider py-20 md:py-24 bg-white text-slate-900 scroll-mt-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal className="max-w-3xl mx-auto text-center space-y-5">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Sobre a Manutec</p>
          <h2 className="text-3xl md:text-4xl font-bold">Compromisso tecnico, atendimento humano e execucao confiavel</h2>
          <p className="text-slate-700 leading-relaxed">
            A Manutec e especializada em instalacoes e manutencoes eletricas residenciais, entregando servicos seguros,
            eficientes e alinhados as boas praticas tecnicas. Atuamos com pontualidade, responsabilidade e foco total na
            seguranca dos moradores.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
