import Image from "next/image";
import Reveal from "@/components/Reveal";
import NeuralNetwork from "@/components/NeuralNetwork";
import { heroTechs, personal } from "@/lib/data";

export default function Hero() {
  return (
    <header className="hero" id="accueil">
      <NeuralNetwork />
      <div className="container">
        <div className="hero__grid">
          <div>
            <Reveal>
              <p className="hero__eyebrow">{personal.last}</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="hero__name">
                {personal.first} <em>{personal.second}</em>
              </h1>
              <svg
                className="scribble"
                viewBox="0 0 340 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M4 18 C 38 5, 66 30, 104 15 S 170 5, 208 17 S 286 33, 336 13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </Reveal>
            <Reveal delay={180}>
              <p className="hero__role">
                <span className="hero__mark" aria-hidden="true" />
                {personal.role}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="hero__status">
                <span className="pulse-dot" aria-hidden="true" />
                <b>{personal.status}</b>
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="hero__desc">{personal.description}</p>
            </Reveal>
            <Reveal delay={380}>
              <div className="hero__actions">
                <a href="#projets" className="btn">
                  Voir mes projets
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a href="#contact" className="btn btn--ghost">
                  Me contacter
                </a>
                <a href="/CV.pdf" download className="btn btn--ghost">
                  Télécharger mon CV
                  <svg
                    className="btn__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M4 21h16" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400} className="hero__aside">
            <figure className="hero__portrait">
              <span className="hero__frame">
                <span className="hero__glow" aria-hidden="true" />
                <Image
                  src="/portrait.jpg"
                  alt="Portrait de FANEVASOA Onjatina Raissa"
                  width={1000}
                  height={1000}
                  priority
                />
                <span className="hero__orbit hero__orbit--a" aria-hidden="true" />
                <span className="hero__orbit hero__orbit--b" aria-hidden="true" />
              </span>
              <figcaption>
                Portrait — {personal.year}
              </figcaption>
            </figure>
            <div className="hero__side">
              <p>Portfolio — {personal.year}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="hero__techs">
        <div className="hero__techs-track">
          <span className="hero__techs-group">
            <b>Stack&nbsp;:</b>
            {heroTechs.join(" — ")} <span aria-hidden="true">✦</span>
          </span>
          <span className="hero__techs-group" aria-hidden="true">
            <b>Stack&nbsp;:</b>
            {heroTechs.join(" — ")} <span aria-hidden="true">✦</span>
          </span>
        </div>
      </Reveal>
    </header>
  );
}
