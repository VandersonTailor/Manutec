import Reveal from "@/components/Reveal";
import { SITE_CONFIG } from "@/lib/siteConfig";

export default function Contact() {
  const message = encodeURIComponent("Ola, quero falar com a Manutec sobre servicos eletricos residenciais.");

  return (
    <section id="contato" className="snap-section py-20 md:py-24 bg-gradient-to-b from-white to-slate-100 text-slate-900 scroll-mt-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Reveal className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-700">Contato</p>
            <h2 className="text-3xl md:text-4xl font-bold">Fale com a Manutec e solicite seu atendimento</h2>
            <p className="text-slate-700">Atendimento tecnico, rapido e profissional para instalacao e manutencao eletrica residencial.</p>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="btn-premium inline-flex items-center justify-center rounded-full px-7 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-all duration-500 ease-in-out shadow-[0_0_22px_rgba(14,165,233,0.28)]"
            >
              Chamar no WhatsApp
            </a>
          </Reveal>

          <Reveal delay={120} className="card-interactive space-y-3 rounded-2xl border border-slate-300 bg-white p-6">
            <p><strong>Telefone:</strong> {SITE_CONFIG.phone}</p>
            <p><strong>E-mail:</strong> {SITE_CONFIG.email}</p>
            <p><strong>Area de atendimento:</strong> {SITE_CONFIG.coverage}</p>
            <p><strong>Localizacao:</strong> {SITE_CONFIG.address}</p>
            <div className="mt-4 h-44 rounded-xl border border-slate-300 grid place-items-center text-slate-600 text-sm">
              Espaco reservado para mapa
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
