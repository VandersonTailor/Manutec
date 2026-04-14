import Image from "next/image";
import { PROJECTS } from "@/lib/siteConfig";

export default function Projects() {
  return (
    <section id="projetos" className="section">
      <div className="container">
        <p className="eyebrow">Projetos Realizados</p>
        <h2>Resultados reais com padrão técnico e acabamento profissional</h2>
        <p>
          Confira alguns serviços executados pela Manutec com foco em segurança,
          confiabilidade e organização elétrica residencial.
        </p>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <article key={project.image} className="project-card">
              <div className="project-image-wrap">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={900}
                  className="project-image"
                />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
