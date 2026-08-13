import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const infos = [
  {
    num: "01",
    title: "Formation",
    text: "L2 Informatique — École de Management et d'Innovation Technologique (EMIT)",
  },
  {
    num: "02",
    title: "Domaine",
    text: "Développement logiciel & web",
  },
  {
    num: "03",
    title: "Technologies",
    text: "Web, Java, C#, PHP, MySQL",
  },
  {
    num: "04",
    title: "Objectif",
    text: "Développer des solutions utiles et apprendre continuellement.",
  },
];

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
            <p>
              Je suis étudiante en 2<sup>e</sup> année de Licence Informatique à
              l&rsquo;EMIT. Je conçois des applications web et logicielles, de
              la réflexion sur l&rsquo;architecture jusqu&rsquo;à l&rsquo;interface que
              l&rsquo;utilisateur voit et touche.
            </p>
            <p>
              J&rsquo;apprends en faisant&nbsp;: beaucoup de documentation, des
              essais, quelques erreurs assumées — et une petite fierté chaque
              fois que le code fonctionne du premier coup.
            </p>
            <blockquote className="about__quote">
              «&nbsp;Le code transforme une idée en une solution que d&rsquo;autres
              peuvent utiliser.&nbsp;»
            </blockquote>
          </Reveal>

          <Reveal delay={150}>
            <div className="about__list">
              {infos.map((info) => (
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
