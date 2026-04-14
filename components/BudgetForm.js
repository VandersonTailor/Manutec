"use client";

import Reveal from "@/components/Reveal";
import { useMemo, useState } from "react";
import { SITE_CONFIG } from "@/lib/siteConfig";

const INITIAL_FORM = {
  nome: "",
  telefone: "",
  local: "",
  tipo: "",
  descricao: "",
  horario: "",
};

export default function BudgetForm() {
  const [form, setForm] = useState(INITIAL_FORM);

  const whatsappHref = useMemo(() => {
    const text = `Ola, gostaria de solicitar um orcamento com a Manutec.\n\nNome: ${form.nome || "-"}\nTelefone: ${form.telefone || "-"}\nLocal: ${form.local || "-"}\nTipo de servico: ${form.tipo || "-"}\nDescricao: ${form.descricao || "-"}\nMelhor horario para contato: ${form.horario || "-"}\n\nGostaria de receber atendimento.`;
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section id="orcamento" className="snap-section section-divider section-ambient py-20 md:py-24 bg-black text-white scroll-mt-24 relative overflow-hidden flex items-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.2),transparent_45%)]" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-10">
        <Reveal className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Orcamento</p>
          <h2 className="text-3xl md:text-4xl font-bold">Solicite seu orcamento com atendimento rapido</h2>
        </Reveal>

        <Reveal delay={120}>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" onSubmit={(event) => event.preventDefault()}>
            <label className="floating-field">
              <input name="nome" value={form.nome} onChange={handleChange} className="floating-input" placeholder=" " required />
              <span className="floating-label">Nome</span>
            </label>
            <label className="floating-field">
              <input name="telefone" value={form.telefone} onChange={handleChange} className="floating-input" placeholder=" " required />
              <span className="floating-label">Telefone</span>
            </label>
            <label className="floating-field">
              <input name="local" value={form.local} onChange={handleChange} className="floating-input" placeholder=" " required />
              <span className="floating-label">Bairro ou cidade</span>
            </label>
            <label className="floating-field">
              <input name="tipo" value={form.tipo} onChange={handleChange} className="floating-input" placeholder=" " required />
              <span className="floating-label">Tipo de servico</span>
            </label>
            <label className="floating-field md:col-span-2">
              <textarea name="descricao" value={form.descricao} onChange={handleChange} rows={4} className="floating-input resize-none" placeholder=" " required />
              <span className="floating-label">Descricao do problema ou necessidade</span>
            </label>
            <label className="floating-field md:col-span-2">
              <input name="horario" value={form.horario} onChange={handleChange} className="floating-input" placeholder=" " required />
              <span className="floating-label">Melhor horario para contato</span>
            </label>
            <div className="md:col-span-2 flex justify-center">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-premium w-full md:w-auto inline-flex items-center justify-center rounded-full px-10 py-4 bg-cyan-500 hover:bg-cyan-400 transition-all duration-500 ease-in-out font-semibold shadow-[0_0_24px_rgba(56,189,248,0.35)]">
                Enviar Orcamento
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
