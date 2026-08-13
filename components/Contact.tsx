import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { fullName, links } from "@/lib/data";

const contactLinks = [
  { label: "CV", href: "/CV.pdf", text: "Télécharger mon CV (PDF)" },
  { label: "GitHub", href: links.github, text: "github.com/Raissa404" },
  { label: "Email", href: `mailto:${links.email}`, text: links.email },
];

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="titre-contact">
      <div className="container">
        <SectionHeader
          index="05"
          title="Contact"
          titleId="titre-contact"
          side="Écrivons-nous"
        />
        <Reveal>
          <h2 className="contact__statement">
            Construisons quelque chose <em>ensemble.</em>
          </h2>
          <p className="contact__intro">
            Que ce soit pour un stage, un projet, une collaboration ou toute
            autre opportunité professionnelle&nbsp;: dites-moi où vous voulez
            aller, je me charge de trouver la solution.
          </p>
          <p className="contact__signature">
            <span>signé</span>
            {fullName}
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
          <Reveal delay={220}>
            <p className="contact__links-title">Autres moyens de contact</p>
            <div className="contact__links">
              {contactLinks.map((item) => (
                <div key={item.label} className="contact__link">
                  <span>{item.label}</span>
                  <a
                    href={item.href}
                    className="link-line"
                    download={item.href === "/CV.pdf" ? "" : undefined}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
            <div className="contact__availability">
              <span className="pulse-dot" aria-hidden="true" />
              <p>
                <b>Disponible pour un stage</b>
                Réponse rapide — je consulte mes messages régulièrement.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
