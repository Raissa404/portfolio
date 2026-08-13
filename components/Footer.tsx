import { fullLabel, fullName, links, personal } from "@/lib/data";

const socials = [
  { label: "GitHub", href: links.github },
  { label: "Email", href: `mailto:${links.email}` },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__mark" aria-hidden="true">
        {personal.second}
      </div>
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__name">
              {personal.last} <em>{fullName}</em>
            </p>
            <p className="footer__role">{personal.role}</p>
          </div>
          <div className="footer__socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="link-line"
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {personal.year} {fullLabel}</span>
        </div>
      </div>
    </footer>
  );
}
