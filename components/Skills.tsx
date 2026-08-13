import { type CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { skillGroups } from "@/lib/data";

const TICK_COUNT = 5;

export default function Skills() {
  return (
    <section
      id="competences"
      className="section section--top"
      aria-labelledby="titre-competences"
    >
      <div className="container">
        <SectionHeader
          index="02"
          title="Compétences"
          titleId="titre-competences"
          side="Outils du quotidien"
        />
        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 120}>
              <div className="skill-group">
                <div className="skill-group__head">
                  <span className="skill-group__id">{group.id}.</span>
                  <h3 className="skill-group__label">{group.label}</h3>
                </div>
                <p className="skill-group__note">{group.note}</p>
                <div style={{ marginTop: "1rem" }}>
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="skill">
                      <div className="skill__top">
                        <span className="skill__name">{skill.name}</span>
                        <span className="skill__level">
                          {skill.level}/{TICK_COUNT}
                        </span>
                      </div>
                      <span className="skill__note">{skill.note}</span>
                      <div
                        className="skill__bar"
                        role="img"
                        aria-label={`Niveau : ${skill.level} sur ${TICK_COUNT}`}
                      >
                        <span
                          className="skill__bar-fill"
                          style={
                            {
                              "--level": `${(skill.level / TICK_COUNT) * 100}%`,
                            } as CSSProperties
                          }
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
