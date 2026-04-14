import { SITE_CONFIG } from "@/lib/siteConfig";

export default function WhatsAppFloat() {
  const text = encodeURIComponent("Ola, gostaria de solicitar um orcamento com a Manutec.");

  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold grid place-items-center shadow-xl transition-transform duration-500 ease-in-out hover:scale-105"
    >
      WA
    </a>
  );
}
