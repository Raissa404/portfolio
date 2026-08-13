import raw from "./data.json";

export const personal = raw.personal;
export const links = raw.links;
export const heroTechs = raw.heroTechs;
export const about = raw.about;
export const skillGroups = raw.skillGroups;
export const projects = raw.projects;
export const education = raw.education;

export const fullName = `${personal.first} ${personal.second}`;
export const fullLabel = `${personal.last} ${personal.first} ${personal.second}`;

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

export type Education = {
  period: string;
  title: string;
  badge: string;
  school: string;
  text: string;
};
