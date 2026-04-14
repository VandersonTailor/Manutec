"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/siteConfig";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.25, 0.45, 0.65], rootMargin: "-20% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        scrolled
          ? "border-b border-white/15 bg-black/65 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
          : "border-b border-transparent bg-black/10 backdrop-blur-[2px]"
      } ${mounted ? "opacity-100" : "opacity-0 -translate-y-2"}`}
    >
      <div
        className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between transition-all duration-300"
      >
        <a
          href="#home"
          className={`group flex items-center gap-3 md:mr-8 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]`}
          onClick={() => setOpen(false)}
        >
          <span
            className={`grid place-items-center transition-all duration-300 ${
              scrolled ? "h-14 w-14 md:h-16 md:w-16" : "h-16 w-16 md:h-20 md:w-20"
            }`}
          >
            <Image
              src="/assets/logo/logo.png"
              alt="Logo Manutec"
              width={80}
              height={80}
              className={`object-contain transition-all duration-300 ${
                scrolled ? "h-14 w-14 md:h-16 md:w-16" : "h-16 w-16 md:h-20 md:w-20"
              } drop-shadow-[0_10px_20px_rgba(0,0,0,0.38)] group-hover:drop-shadow-[0_0_16px_rgba(56,189,248,0.4)]`}
              priority
            />
          </span>
          <span className="font-semibold tracking-[0.06em] text-white/95 group-hover:text-white transition-colors duration-300 [text-shadow:0_0_10px_rgba(56,189,248,0.28)]">
            {SITE_CONFIG.company}
          </span>
        </a>

        <button
          type="button"
          className="md:hidden inline-flex flex-col gap-1.5 rounded-md p-1.5 hover:bg-white/10 transition-colors duration-300"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>

        <nav
          className={`${
            open ? "max-h-80 opacity-100" : "max-h-0 opacity-0 md:opacity-100 md:max-h-none"
          } absolute md:static left-0 top-24 w-full md:w-auto overflow-hidden md:overflow-visible bg-black/95 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5 p-4 md:p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group relative block rounded-md px-3 py-2 text-sm transition-all duration-300 ${
                    activeSection === item.href.replace("#", "")
                      ? "text-white"
                      : "text-white/85 hover:text-white"
                  } hover:bg-white/10 md:hover:bg-transparent`}
                >
                  {item.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-[1px] h-[2px] origin-left rounded-full bg-cyan-300 transition-transform duration-300 ${
                      activeSection === item.href.replace("#", "") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            ))}
            <li className="md:ml-3">
              <a
                href="#orcamento"
                onClick={() => setOpen(false)}
                className="btn-premium inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-black md:text-white md:bg-cyan-500 md:hover:bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
              >
                Solicitar Orcamento
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
