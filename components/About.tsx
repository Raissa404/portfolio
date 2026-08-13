import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { about } from "@/lib/data";

export default function About() {
  return (
    <section id="a-propos" className="section" aria-labelledby="titre-a-propos">
      <div className="container">
        <SectionHeader
          index="01"
          title="À propos"
          titleId="titre-a-propos"
          side="Qui suis-je"
        />
        <div className="about__grid">
          <Reveal className="about__text">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote className="about__quote">{about.quote}</blockquote>
          </Reveal>

          <Reveal delay={150}>
            <div className="about__list">
              {about.infos.map((info) => (
                <div key={info.num} className="about__item">
                  <strong>{info.num}</strong>
                  <div>
                    <h3>{info.title}</h3>
                    <p>{info.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
