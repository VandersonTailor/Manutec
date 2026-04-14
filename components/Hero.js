/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/siteConfig";

export default function Hero() {
  const panelRef = useRef(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");
  const [hasLocalVideo, setHasLocalVideo] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const baseMessage = encodeURIComponent("Ola, gostaria de solicitar um orcamento com a Manutec.");
  const reelEmbedUrl =
    "https://www.instagram.com/reel/DTOLcLbEp5x/embed/?autoplay=1&muted=1";

  useEffect(() => {
    let active = true;
    fetch("/assets/video/hero.mp4", { method: "HEAD" })
      .then((response) => {
        if (!active) return;
        setHasLocalVideo(response.ok);
      })
      .catch(() => {
        if (!active) return;
        setHasLocalVideo(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (!isDesktop) return;

    let rafId = null;
    const handleMove = (event) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = panel.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const tx = x * 10;
        const ty = y * 10;
        setTransform(`translate3d(${tx}px, ${ty}px, 0)`);
      });
    };

    const handleLeave = () => setTransform("translate3d(0,0,0)");
    panel.addEventListener("mousemove", handleMove);
    panel.addEventListener("mouseleave", handleLeave);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      panel.removeEventListener("mousemove", handleMove);
      panel.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section id="home" className="snap-section section-divider section-ambient particles min-h-screen flex items-center py-20 md:py-24 bg-gradient-to-br from-black via-zinc-900 to-slate-950 text-white scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
        <div className="space-y-6 text-center lg:text-left lg:col-span-4">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Instalacao e Manutencao Eletrica Residencial</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-balance">
            {SITE_CONFIG.company} - Energia segura e confiavel para o seu lar
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto lg:mx-0">
            Servicos eletricos residenciais com padrao tecnico, atendimento agil e foco total em seguranca.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-center lg:justify-start">
            <a href="#orcamento" className="btn-premium inline-flex items-center justify-center rounded-full px-7 py-3 bg-red-500 hover:bg-red-400 transition-all duration-500 ease-in-out shadow-[0_0_24px_rgba(239,68,68,0.35)] font-semibold">
              Solicitar Orcamento
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${baseMessage}`}
              target="_blank"
              rel="noreferrer"
              className="btn-premium inline-flex items-center justify-center rounded-full px-7 py-3 bg-cyan-500 hover:bg-cyan-400 transition-all duration-500 ease-in-out shadow-[0_0_24px_rgba(56,189,248,0.35)] font-semibold"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div
          ref={panelRef}
          className="parallax-card rounded-2xl border border-white/20 bg-white/5 backdrop-blur p-4 md:p-5 shadow-2xl lg:col-span-8"
          style={{ transform }}
        >
          <div className="relative w-full h-[42vh] md:h-[52vh] lg:h-[62vh] min-h-[300px] max-h-[700px] rounded-xl overflow-hidden border border-white/20 bg-black/40">
            {hasLocalVideo && !useIframeFallback ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/logo/logo.png"
                onError={() => setUseIframeFallback(true)}
              >
                <source src="/assets/video/hero.mp4" type="video/mp4" />
              </video>
            ) : (
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  src={reelEmbedUrl}
                  title="Video institucional Manutec"
                  className="absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="eager"
                />
              </div>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white/90 text-sm font-medium">
                Video em destaque da Manutec
              </p>
              {!hasLocalVideo || useIframeFallback ? (
                <p className="text-white/70 text-xs mt-1">
                  Para autoplay total, adicione /public/assets/video/hero.mp4
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
