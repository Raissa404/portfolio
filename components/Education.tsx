import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

export default function Education() {
  return (
    <section id="parcours" className="section" aria-labelledby="titre-parcours">
      <div className="container">
        <SectionHeader
          index="04"
          title="Parcours"
          titleId="titre-parcours"
          side="Études"
        />
        <div className="parcours__grid">
          <Reveal>
            <div className="timeline">
              <div className="tl-item">
                <p className="tl-period">2024 — En cours</p>
                <h3 className="tl-title">
                  L2 Informatique <span className="badge">En cours</span>
                </h3>
                <p className="tl-school">
                  École de Management et d&rsquo;Innovation Technologique (EMIT)
                </p>
                <div className="tl-desc">
                  <p>
                    Deuxième année de Licence Informatique à l&rsquo;EMIT.
                    Premiers pas sérieux dans le développement logiciel et web,
                    entre conception d&rsquo;interfaces, programmation objet et
                    bases de données.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150} className="parcours__note">
            <p>
              <span>Actuellement</span>
              <br />
              Approfondissement de Next.js, modélisation de bases de données et
              bonnes pratiques de génie logiciel. Prochaine étape&nbsp;: un stage
              pour mettre en pratique tout cela sur des projets réels.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
