export const personal = {
  first: "Onjatina Raissa",
  last: "FANEVASOA",
  role: "Développeur fullstack",
  year: "2026",
};

export const links = {
  github: "https://github.com/",
  email: "fanevasoaonjatinaraissa@gmail.com",
};

export type Skill = {
  name: string;
  level: number;
  note: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  note: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "A",
    label: "Frontend",
    note: "Interface & expérience utilisateur",
    skills: [
      { name: "HTML / CSS", level: 5, note: "Mise en page responsive" },
      { name: "JavaScript", level: 4, note: "Interactions dynamiques" },
      { name: "Next.js", level: 3, note: "Applications React" },
    ],
  },
  {
    id: "B",
    label: "Backend & programmation",
    note: "Logique, algorithmique & architecture",
    skills: [
      { name: "Java", level: 4, note: "Applications orientées objet" },
      { name: "C#", level: 3, note: "Développement .NET" },
      { name: "PHP", level: 3, note: "Applications web côté serveur" },
    ],
  },
  {
    id: "C",
    label: "Base de données",
    note: "Stockage & organisation des données",
    skills: [{ name: "MySQL", level: 4, note: "Modélisation & requêtes SQL" }],
  },
];

export const heroTechs = [
  "HTML",
  "CSS",
  "JavaScript",
  "Next.js",
  "Java",
  "C#",
  "PHP",
  "MySQL",
];

export type Project = {
  num: string;
  title: string;
  type: string;
  description: string;
  techs: string[];
  image: string;
  demo: string;
  github: string;
};

export const projects: Project[] = [
  {
    num: "01",
    title: "Gestion de scolarité",
    type: "Application web",
    description:
      "Application web destinée à faciliter la gestion des informations liées à la scolarité, avec une interface permettant d'organiser et de consulter les données scolaires.",
    techs: ["Next.js", "JavaScript", "MySQL"],
    image: "/project-01.png",
    demo: "#projets",
    github: links.github,
  },
  {
    num: "02",
    title: "Gestion de bibliothèque",
    type: "Application desktop",
    description:
      "Application de gestion de bibliothèque permettant d'organiser les livres, les utilisateurs et les opérations liées à la gestion des emprunts.",
    techs: ["Java"],
    image: "/project-03.png",
    demo: "#projets",
    github: links.github,
  },
  {
    num: "03",
    title: "Gestion de vente d'aluminium",
    type: "Application web",
    description:
      "Application permettant de gérer les ventes d'aluminium et les informations associées aux produits et aux transactions.",
    techs: ["PHP", "MySQL"],
    image: "/project-02.png",
    demo: "#projets",
    github: links.github,
  },
];
