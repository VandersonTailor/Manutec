import "./globals.css";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const metadata = {
  title: "Manutec | Instalacao e Manutencao Eletrica Residencial",
  description:
    "Servicos eletricos residenciais com qualidade, seguranca e atendimento profissional.",
  keywords: [
    "eletricista residencial",
    "manutencao eletrica",
    "instalacao eletrica",
    "orcamento eletricista",
    "manutec",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <footer className="bg-black text-white/70 py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm">
            {new Date().getFullYear()} {SITE_CONFIG.company}. Todos os direitos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
