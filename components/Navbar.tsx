"use client";

import { useEffect, useState } from "react";

const nav = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#parcours" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("#accueil");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`nav ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Navigation principale"
      >
        <div className="container">
          <div className="nav__inner">
            <a href="#accueil" className="nav__logo" onClick={() => setOpen(false)}>
              Onjatina <span>Raissa</span>
            </a>

            <div className="nav__right">
              <div className="nav__links">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={item.href === active ? "is-active" : undefined}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <a href="/CV.pdf" download className="nav__cta nav__cta--ghost">
                CV
              </a>
              <button
                type="button"
                className={`nav__burger ${open ? "is-open" : ""}`}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        <div
          className="nav__progress"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </nav>

      <div
        id="menu-mobile"
        className={`nav__mobile ${open ? "is-open" : ""}`}
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a href="/CV.pdf" download className="nav__mobile-cta">
          Télécharger mon CV
        </a>
      </div>
    </>
  );
}
