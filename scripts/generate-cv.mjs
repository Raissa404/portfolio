import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const INK = rgb(0.12, 0.12, 0.12); // #1f1f1f
const SOFT = rgb(0.42, 0.42, 0.42); // #6b6b6b
const MUTED = rgb(0.6, 0.6, 0.6); // #999
const FAINT = rgb(0.86, 0.86, 0.86); // #dbdbdb
const PAPER = rgb(1, 1, 1); // #ffffff
const SIDE = rgb(0.958, 0.953, 0.946); // sidebar bg
const TRACK = rgb(0.87, 0.865, 0.855); // skill track
const ACCENT = rgb(0.16, 0.16, 0.16); // #292929

const PERSONAL = {
  name: "Onjatina Raissa",
  last: "FANEVASOA",
  role: "Développeur fullstack",
  email: "fanevasoaonjatinaraissa@gmail.com",
  github: "github.com/Raissa404",
};

const PROFILE =
  "Étudiante en Licence Informatique à l'EMIT. Je conçois des applications web et logicielles, de la réflexion sur l'architecture jusqu'à l'interface utilisateur. Curieuse, rigoureuse et en apprentissage continu, j'aime transformer une idée en solution concrète.";

const EDUCATION = [
  {
    period: "2024 — En cours",
    title: "L2 Informatique",
    school: "École de Management et d'Innovation Technologique (EMIT)",
    text: "Développement web et logiciel, programmation orientée objet, bases de données et conception d'interfaces.",
  },
];

const SKILLS = [
  {
    label: "Frontend",
    items: [
      ["HTML / CSS", 5],
      ["JavaScript", 4],
      ["Next.js / React", 3],
    ],
  },
  {
    label: "Backend",
    items: [
      ["Java", 4],
      ["C# / .NET", 3],
      ["PHP", 3],
    ],
  },
  {
    label: "Base de données",
    items: [["MySQL", 4]],
  },
];

const INTERESTS = [
  "Veille technologique",
  "Design & interface",
  "Lecture",
  "Musique",
  "Jeux d'échecs",
];

const PROJECTS = [
  {
    num: "01",
    title: "Gestion de scolarité",
    type: "Application web",
    desc: "Plateforme web de gestion des données scolaires : ajout, modification et consultation des élèves, enseignants et classes. Interface responsive avec recherche et filtres, tableaux de bord et génération de listes. Conception de la base de données MySQL (schéma relationnel, requêtes optimisées).",
    techs: "Next.js · JavaScript · MySQL",
  },
  {
    num: "02",
    title: "Gestion de bibliothèque",
    type: "Application desktop",
    desc: "Application de bureau de gestion d'une bibliothèque : catalogue des livres, gestion des membres, enregistrement et suivi des emprunts et retours, avec contrôle des retards. Modèle orienté objet en Java, persistance des données et interface graphique ergonomique.",
    techs: "Java",
  },
  {
    num: "03",
    title: "Gestion de vente d'aluminium",
    type: "Application web",
    desc: "Application web de gestion commerciale : suivi des produits, des stocks et des ventes, enregistrement des transactions et génération des états. Backend en PHP avec base de données MySQL, sessions et authentification des utilisateurs.",
    techs: "PHP · MySQL",
  },
];

function wrap(text, font, size, maxWidth) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function paragraph(page, { text, x, y, maxWidth, size, lineHeight, font, color, justify = false }) {
  for (const line of wrap(text, font, size, maxWidth)) {
    page.drawText(line, { x, y, size, font, color });
    y -= lineHeight;
  }
  return y;
}

function sectionTitle(page, { x, y, label, font, color, titleWidth }) {
  page.drawText(label.toUpperCase(), {
    x,
    y,
    size: 10,
    font,
    color: ACCENT,
    letterSpacing: 2.5,
  });
  page.drawLine({
    start: { x, y: y - 6 },
    end: { x: x + titleWidth, y: y - 6 },
    thickness: 1.1,
    color: FAINT,
  });
  return y - 28;
}

async function main() {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const helvOblique = await pdf.embedFont(StandardFonts.HelveticaOblique);

  const SIDEBAR = 220;
  const sideMax = SIDEBAR - 52;

  // ---- Base ----
  page.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: PAPER });

  // ---- Header ----
  page.drawText(PERSONAL.last, {
    x: 40,
    y: 782,
    size: 11,
    font: helv,
    color: SOFT,
    letterSpacing: 4,
  });
  page.drawText(PERSONAL.name, {
    x: 40,
    y: 744,
    size: 32,
    font: helvBold,
    color: INK,
  });
  page.drawText(PERSONAL.role.toUpperCase(), {
    x: 40,
    y: 720,
    size: 10,
    font: helv,
    color: SOFT,
    letterSpacing: 3,
  });
  page.drawLine({
    start: { x: 40, y: 692 },
    end: { x: 555, y: 692 },
    thickness: 1,
    color: FAINT,
  });

  // ---- Sidebar background ----
  page.drawRectangle({ x: 0, y: 0, width: SIDEBAR, height: 692, color: SIDE });

  // ---- Sidebar content ----
  let sy = 645;

  // Contact
  page.drawText("CONTACT", { x: 26, y: sy, size: 9, font: helvBold, color: INK, letterSpacing: 2.5 });
  page.drawLine({ start: { x: 26, y: sy - 6 }, end: { x: SIDEBAR - 26, y: sy - 6 }, thickness: 0.8, color: FAINT });
  sy -= 26;
  const contacts = [
    ["Email", PERSONAL.email],
    ["GitHub", PERSONAL.github],
  ];
  for (const [label, value] of contacts) {
    page.drawText(label.toUpperCase(), { x: 26, y: sy, size: 7, font: helvBold, color: SOFT, letterSpacing: 1.5 });
    sy -= 12;
    for (const line of wrap(value, helv, 9, sideMax)) {
      page.drawText(line, { x: 26, y: sy, size: 9, font: helv, color: INK });
      sy -= 14;
    }
    sy -= 8;
  }
  sy -= 8;

  // Skills
  page.drawText("COMPÉTENCES", { x: 26, y: sy, size: 9, font: helvBold, color: INK, letterSpacing: 2.5 });
  page.drawLine({ start: { x: 26, y: sy - 6 }, end: { x: SIDEBAR - 26, y: sy - 6 }, thickness: 0.8, color: FAINT });
  sy -= 26;
  for (const group of SKILLS) {
    page.drawText(group.label.toUpperCase(), {
      x: 26,
      y: sy,
      size: 7,
      font: helvBold,
      color: SOFT,
      letterSpacing: 1.5,
    });
    sy -= 16;
    for (const [name, level] of group.items) {
      page.drawText(name, { x: 26, y: sy, size: 9.5, font: helv, color: INK });
      sy -= 11;
      page.drawRectangle({ x: 26, y: sy, width: sideMax, height: 2.5, color: TRACK });
      page.drawRectangle({
        x: 26,
        y: sy,
        width: sideMax * (level / 5),
        height: 2.5,
        color: ACCENT,
      });
      sy -= 15;
    }
    sy -= 8;
  }

  // Interests
  page.drawText("CENTRES D'INTÉRÊT", { x: 26, y: sy, size: 9, font: helvBold, color: INK, letterSpacing: 2.5 });
  page.drawLine({ start: { x: 26, y: sy - 6 }, end: { x: SIDEBAR - 26, y: sy - 6 }, thickness: 0.8, color: FAINT });
  sy -= 26;
  for (const interest of INTERESTS) {
    page.drawText(`•  ${interest}`, { x: 26, y: sy, size: 9, font: helv, color: INK });
    sy -= 15;
  }

  // ---- Right column ----
  const RX = SIDEBAR + 30;
  const MAXW = 555 - RX;
  let ry = 645;

  ry = sectionTitle(page, { x: RX, y: ry, label: "Profil", font: helvBold, color: INK, titleWidth: 40 });
  ry = paragraph(page, {
    text: PROFILE,
    x: RX,
    y: ry,
    maxWidth: MAXW,
    size: 9.5,
    lineHeight: 15,
    font: helv,
    color: SOFT,
  });

  ry -= 34;
  ry = sectionTitle(page, { x: RX, y: ry, label: "Formation", font: helvBold, color: INK, titleWidth: 70 });
  for (const e of EDUCATION) {
    page.drawText(e.period, { x: RX, y: ry, size: 8, font: helvBold, color: SOFT, letterSpacing: 1.5 });
    ry -= 17;
    page.drawText(e.title, { x: RX, y: ry, size: 14, font: helvBold, color: INK });
    ry -= 16;
    page.drawText(e.school, { x: RX, y: ry, size: 10, font: helvOblique, color: SOFT });
    ry -= 16;
    ry = paragraph(page, {
      text: e.text,
      x: RX,
      y: ry,
      maxWidth: MAXW,
      size: 9,
      lineHeight: 14,
      font: helv,
      color: SOFT,
    });
  }

  ry -= 34;
  ry = sectionTitle(page, { x: RX, y: ry, label: "Projets", font: helvBold, color: INK, titleWidth: 58 });
  for (const p of PROJECTS) {
    page.drawText(p.num, { x: RX, y: ry + 2, size: 11, font: helvBold, color: FAINT });
    page.drawText(p.title, { x: RX + 20, y: ry, size: 13, font: helvBold, color: INK });
    page.drawText(p.type.toUpperCase(), {
      x: RX + 20 + helvBold.widthOfTextAtSize(p.title, 13) + 12,
      y: ry + 3,
      size: 7,
      font: helvBold,
      color: SOFT,
      letterSpacing: 1.5,
    });
    ry -= 18;
    ry = paragraph(page, {
      text: p.desc,
      x: RX,
      y: ry,
      maxWidth: MAXW,
      size: 9,
      lineHeight: 14,
      font: helv,
      color: SOFT,
    });
    ry -= 5;
    page.drawText(p.techs.toUpperCase(), {
      x: RX,
      y: ry,
      size: 6.5,
      font: helvBold,
      color: SOFT,
      letterSpacing: 1.5,
    });
    ry -= 26;
  }

  const bytes = await pdf.save();
  const out = path.resolve("public", "CV.pdf");
  fs.writeFileSync(out, bytes);
  console.log(`CV généré : ${out} (${(bytes.length / 1024).toFixed(1)} Ko)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
