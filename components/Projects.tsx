import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projets" className="section" aria-labelledby="titre-projets">
      <div className="container">
        <SectionHeader
          index="03"
          title="Projets"
          titleId="titre-projets"
          side="Travaux réalisés"
        />
        {projects.map((project, i) => (
          <Reveal key={project.num}>
            <article
              className={`project ${i % 2 === 1 ? "project--flip" : ""}`}
            >
              <div className="project__info">
                <div className="project__meta">
                  <span className="project__index">
                    Projet — {project.num}
                  </span>
                  <span className="project__type">{project.type}</span>
                </div>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__desc">{project.description}</p>
                <ul className="project__techs" aria-label="Technologies">
                  {project.techs.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="project__links">
                  <a href={project.demo} className="project__link">
                    Voir le projet <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href={project.github}
                    className="project__link project__link--muted"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
              <div className="project__shot">
                <span className="project__watermark" aria-hidden="true">
                  {project.num}
                </span>
                <Image
                  src={project.image}
                  alt={`Capture d'écran du projet — ${project.title}`}
                  width={1200}
                  height={900}
                  sizes="(min-width: 960px) 45vw, 100vw"
                />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
