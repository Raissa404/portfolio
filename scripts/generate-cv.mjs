import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const DARK = rgb(0.13, 0.11, 0.09); // #211c15
const PAPER = rgb(0.09, 0.08, 0.06); // sidebar bg
const INK = rgb(0.92, 0.89, 0.83); // light text
const MUTED = rgb(0.55, 0.5, 0.44);
const ACCENT = rgb(0.88, 0.4, 0.18); // #e0662f
const TRACK = rgb(0.3, 0.27, 0.22);
const LIGHT = rgb(1, 1, 1);

const PERSONAL = {
  name: "Onjatina Raissa",
  last: "FANEVASOA",
  role: "Étudiante en informatique — L2 · EMIT",
  email: "fanevasoaonjatinaraissa@gmail.com",
  github: "github.com/Raissa404",
  linkedin: "linkedin.com/in/fanevasoa-raissa",
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

const PROJECTS = [
  {
    num: "01",
    title: "Gestion de scolarité",
    type: "Application web",
    desc: "Application web pour organiser et consulter les données scolaires, avec une interface claire et structurée.",
    techs: "Next.js · JavaScript · MySQL",
  },
  {
    num: "02",
    title: "Gestion de bibliothèque",
    type: "Application desktop",
    desc: "Organisation des livres, des utilisateurs et des opérations de prêt dans une application de bureau.",
    techs: "Java",
  },
  {
    num: "03",
    title: "Gestion de vente d'aluminium",
    type: "Application web",
    desc: "Gestion des ventes, des produits et des transactions liées à la vente d'aluminium.",
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
  page.drawRectangle({ x, y: y - 3.5, width: 4, height: 11, color: ACCENT });
  page.drawText(label.toUpperCase(), {
    x: x + 11,
    y,
    size: 10,
    font,
    color,
    letterSpacing: 1.5,
  });
  page.drawLine({
    start: { x: x + 11 + titleWidth + 8, y: y - 2 },
    end: { x: 560, y: y - 2 },
    thickness: 0.7,
    color: MUTED,
  });
  return y - 26;
}

async function main() {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const helvOblique = await pdf.embedFont(StandardFonts.HelveticaOblique);

  const SIDEBAR = 210;

  // ---- Sidebar background ----
  page.drawRectangle({ x: 0, y: 0, width: SIDEBAR, height: 841.89, color: PAPER });
  page.drawRectangle({ x: SIDEBAR, y: 0, width: 1.5, height: 841.89, color: ACCENT });

  // ---- Sidebar content ----
  let sy = 782;

  page.drawText(PERSONAL.last, {
    x: 26,
    y: sy,
    size: 11,
    font: helv,
    color: ACCENT,
    letterSpacing: 3,
  });
  sy -= 30;
  page.drawText(PERSONAL.name, {
    x: 26,
    y: sy,
    size: 26,
    font: helvBold,
    color: INK,
  });
  sy -= 22;
  page.drawLine({
    start: { x: 26, y: sy },
    end: { x: SIDEBAR - 26, y: sy },
    thickness: 1,
    color: ACCENT,
  });
  sy -= 20;
  const roleLines = wrap(PERSONAL.role, helv, 9.5, SIDEBAR - 52);
  page.drawText(roleLines[0], { x: 26, y: sy, size: 9.5, font: helv, color: INK });
  if (roleLines[1]) {
    sy -= 15;
    page.drawText(roleLines[1], { x: 26, y: sy, size: 9.5, font: helv, color: INK });
  }
  sy -= 40;

  // Contact
  sy = sectionTitle(page, { x: 26, y: sy, label: "Coordonnées", font: helvBold, color: INK, titleWidth: 88 });
  const contacts = [
    ["Email", PERSONAL.email],
    ["GitHub", PERSONAL.github],
    ["LinkedIn", PERSONAL.linkedin],
  ];
  for (const [label, value] of contacts) {
    page.drawText(label.toUpperCase(), { x: 26, y: sy, size: 7, font: helvBold, color: ACCENT, letterSpacing: 1 });
    sy -= 12;
    for (const line of wrap(value, helv, 8.5, SIDEBAR - 52)) {
      page.drawText(line, { x: 26, y: sy, size: 8.5, font: helv, color: INK });
      sy -= 13;
    }
    sy -= 6;
  }
  sy -= 12;

  // Skills
  sy = sectionTitle(page, { x: 26, y: sy, label: "Compétences", font: helvBold, color: INK, titleWidth: 90 });
  for (const group of SKILLS) {
    page.drawText(group.label.toUpperCase(), {
      x: 26,
      y: sy,
      size: 7.5,
      font: helvBold,
      color: MUTED,
      letterSpacing: 1.2,
    });
    sy -= 15;
    for (const [name, level] of group.items) {
      page.drawText(name, { x: 26, y: sy, size: 9, font: helv, color: INK });
      sy -= 10;
      page.drawRectangle({ x: 26, y: sy, width: SIDEBAR - 52, height: 3, color: TRACK });
      page.drawRectangle({
        x: 26,
        y: sy,
        width: (SIDEBAR - 52) * (level / 5),
        height: 3,
        color: ACCENT,
      });
      sy -= 14;
    }
    sy -= 8;
  }

  // ---- Right column ----
  const RX = 250;
  const MAXW = 555 - RX;
  let ry = 782;

  ry = sectionTitle(page, { x: RX, y: ry, label: "Profil", font: helvBold, color: DARK, titleWidth: 40 });
  ry = paragraph(page, {
    text: PROFILE,
    x: RX,
    y: ry,
    maxWidth: MAXW,
    size: 10,
    lineHeight: 16,
    font: helv,
    color: DARK,
  });

  ry -= 30;
  ry = sectionTitle(page, { x: RX, y: ry, label: "Formation", font: helvBold, color: DARK, titleWidth: 70 });
  for (const e of EDUCATION) {
    page.drawText(e.period, { x: RX, y: ry, size: 8, font: helvBold, color: ACCENT, letterSpacing: 1 });
    ry -= 16;
    page.drawText(e.title, { x: RX, y: ry, size: 14, font: helvBold, color: DARK });
    ry -= 16;
    page.drawText(e.school, { x: RX, y: ry, size: 11, font: helvOblique, color: DARK });
    ry -= 16;
    ry = paragraph(page, {
      text: e.text,
      x: RX,
      y: ry,
      maxWidth: MAXW,
      size: 9.5,
      lineHeight: 14,
      font: helv,
      color: DARK,
    });
  }

  ry -= 30;
  ry = sectionTitle(page, { x: RX, y: ry, label: "Projets", font: helvBold, color: DARK, titleWidth: 58 });
  for (const p of PROJECTS) {
    page.drawText(p.num, { x: RX, y: ry, size: 10, font: helvBold, color: ACCENT });
    page.drawText(p.title, { x: RX + 22, y: ry, size: 14, font: helvBold, color: DARK });
    const typeWidth = helv.widthOfTextAtSize(p.type, 8);
    page.drawText(p.type.toUpperCase(), {
      x: RX + 22 + helvBold.widthOfTextAtSize(p.title, 14) + 14,
      y: ry + 3,
      size: 7.5,
      font: helvBold,
      color: MUTED,
      letterSpacing: 1,
    });
    void typeWidth;
    ry -= 17;
    ry = paragraph(page, {
      text: p.desc,
      x: RX,
      y: ry,
      maxWidth: MAXW,
      size: 9.5,
      lineHeight: 15,
      font: helv,
      color: DARK,
    });
    ry -= 5;
    page.drawText(p.techs.toUpperCase(), {
      x: RX,
      y: ry,
      size: 7,
      font: helvBold,
      color: ACCENT,
      letterSpacing: 1,
    });
    ry -= 26;
  }

  // footer
  page.drawText(`CV — ${PERSONAL.last} ${PERSONAL.name} · 2026`, {
    x: RX,
    y: 40,
    size: 7.5,
    font: helv,
    color: MUTED,
    letterSpacing: 1,
  });

  const bytes = await pdf.save();
  const out = path.resolve("public", "CV.pdf");
  fs.writeFileSync(out, bytes);
  console.log(`CV généré : ${out} (${(bytes.length / 1024).toFixed(1)} Ko)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
