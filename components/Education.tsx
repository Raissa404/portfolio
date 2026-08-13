import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { education } from "@/lib/data";

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
              {education.map((item) => (
                <div className="tl-item" key={item.period + item.title}>
                  <p className="tl-period">{item.period}</p>
                  <h3 className="tl-title">
                    {item.title} {item.badge && <span className="badge">{item.badge}</span>}
                  </h3>
                  <p className="tl-school">{item.school}</p>
                  <div className="tl-desc">
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
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
