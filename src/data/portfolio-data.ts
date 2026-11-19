export const personalInfo = {
  name: "Jordan Freddy",
  shortName: "Jordan Freddy",
  title: "Informatikstudent & Softwareentwickler",
  subtitle: "Werkstudent – Softwareentwicklung",
  location: "Gießen, Hessen",
  phone: "+49 1515 6684392",
  email: "pokemtezo5@gmail.com",
  address: "Eichendorffring 99, Zimmer 009\n35394 Gießen, Deutschland",
  bio: [
    "Mein Name ist <strong>Jordan Freddy</strong> und ich studiere derzeit <strong>Informatik an der THM in Gießen</strong> (Bachelor) mit Fokus auf <strong>Software Engineering</strong> und <strong>Datenanalyse</strong>.",
    "Besonders interessiere ich mich für die <strong>praktische Umsetzung von IT-Lösungen</strong> und die <strong>Arbeit in dynamischen Teams</strong>. Ich gelte als zuverlässig, teamorientiert und lerne schnell.",
    "Aktuell suche ich eine <strong>Werkstudentenstelle im IT-Bereich</strong>, um mein Wissen zu vertiefen und es in realen Projekten anzuwenden.",
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/jordan-freddy",
    github: "https://github.com/Jorxas",
    instagram: "https://www.instagram.com/tezopokem?igsh=MW13cndwMzFmdXN5aw==",
  },
  portfolioUrl: "https://jorxas.github.io/Portfolio",
  formspreeEndpoint: "https://formspree.io/f/mandeweo",
};

export interface Skill {
  name: string;
  percentage: number;
}

export const skills: Skill[] = [
  { name: "Frontend (HTML/CSS/JS)", percentage: 93 },
  { name: "React / Next.js", percentage: 80 },
  { name: "Tailwind CSS", percentage: 88 },
  { name: "Backend (Java – Vert.x)", percentage: 91 },
  { name: "Python (NumPy, Pandas)", percentage: 75 },
  { name: "Echtzeit-Kommunikation (MQTT)", percentage: 93 },
  { name: "Datenbanken (MariaDB / SQL)", percentage: 87 },
  { name: "Tools & DevOps (Docker, Git, Linux)", percentage: 89 },
];

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Softwareentwicklung & Web",
    items: [
      "Java",
      "JavaScript",
      "TypeScript (Grundkenntnisse)",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "React",
      "Next.js (Grundkenntnisse)",
      "Tailwind CSS",
      "APIs",
    ],
  },
  {
    category: "Python & Data",
    items: ["Python", "NumPy", "Pandas", "SQL", "MariaDB"],
  },
  {
    category: "Tools & DevOps",
    items: [
      "Docker",
      "Docker Compose",
      "Git / GitLab",
      "MQTT",
      "Linux-Grundlagen",
    ],
  },
  {
    category: "KI-Fokus",
    items: [
      "LLM-basierte Features",
      "Strukturierte Datenverarbeitung",
      "Python für produktnahe Anwendungen",
    ],
  },
];

import { projektstudien } from "./projektstudien";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  /** "contain" = ganzes Bild sichtbar ohne Beschnitt. Standard: cover */
  imageObjectFit?: "cover" | "contain";
  techStack: string[];
  demoUrl: string | null;
  codeUrl: string;
  category:
    | "Web App"
    | "Website"
    | "Data Science"
    | "Daten & KI"
    | "Software & Systeme"
    | "Automatisierung & GIS";
  demoLabel?: string;
  domain?: string;
  ausgewaehlt?: boolean;
}

export const projects: Project[] = [
  ...projektstudien.map(
    (p): Project => ({
      id: p.slug,
      title: p.titel,
      description: p.problem,
      image: `/images/projektstudien/${p.slug}.png`,
      imageObjectFit: "contain",
      techStack: p.technologien,
      demoUrl: `/projects/${p.slug}/`,
      demoLabel: "Demo & Erklärung",
      codeUrl: p.repository,
      domain: p.bereich,
      ausgewaehlt: ["P01", "P04", "P05", "P11"].includes(p.id),
      category: ["P01", "P02", "P03", "P13"].includes(p.id)
        ? "Daten & KI"
        : ["P08", "P10", "P11", "P12"].includes(p.id)
          ? "Automatisierung & GIS"
          : "Software & Systeme",
    }),
  ),
  {
    id: "concal",
    domain: "Webanwendung & Ernährung",
    title: "Concal",
    description:
      "Ernährung im Alltag erfassen: Mahlzeiten, Tagesziele und ein Dashboard in einer Next.js-Anwendung mit Supabase und Gemini-Anbindung.",
    image: "/images/concal-cover.png",
    techStack: ["Next.js", "Supabase", "Gemini AI", "TypeScript"],
    demoUrl: "https://concal-eight.vercel.app",
    codeUrl: "https://github.com/Jorxas/Concal",
    ausgewaehlt: true,
    category: "Web App",
  },
  {
    id: "quizgame",
    domain: "Verteilte Systeme & Echtzeit",
    title: "Multiplayer Trivia Quiz",
    description:
      "Akademisches Gruppenprojekt: ein verteiltes Quiz mit Java-Backend, Datenbank und MQTT. Die Web-Demo macht eine lokale Runde ohne Server spielbar.",
    image: "/images/quizgame-demo.png",
    techStack: [
      "Java (Vert.x)",
      "MariaDB",
      "MQTT",
      "Docker Compose",
      "Nginx",
      "HTML/CSS/JS",
      "Bootstrap",
    ],
    demoUrl: "/projects/multiplayer-trivia-quiz/",
    codeUrl: "https://github.com/Jorxas/quizgame",
    ausgewaehlt: true,
    category: "Web App",
  },
  {
    id: "cnn-clothing-classification",
    domain: "Deep Learning & Bildklassifikation",
    title: "CNN Clothing Classification",
    description:
      "Fünf Kleidungsklassen, ein eigenes CNN und 392 Testbilder. Die Auswertung zeigt 72,45 % Testgenauigkeit und die häufigsten Verwechslungen.",
    image: "/images/cnn-clothing-confusion-matrix.png",
    imageObjectFit: "contain",
    techStack: ["PyTorch", "Python", "torchvision", "CNN", "Weights & Biases"],
    demoUrl: "/projects/cnn-clothing-classification/",
    codeUrl: "https://github.com/Jorxas/cnn-clothing-classification",
    ausgewaehlt: true,
    category: "Data Science",
  },
  {
    id: "rnn-music-generation",
    domain: "Deep Learning & Musik",
    title: "Irische Musikgenerierung mit RNN",
    description:
      "LSTM und GRU lernen irische Musik als ABC-Zeichenfolgen. Verglichen werden dokumentierte Trainingsverläufe und gespeicherte Musikbeispiele.",
    image: "/images/rnn-music-lstm-vs-gru.png",
    imageObjectFit: "contain",
    techStack: [
      "PyTorch",
      "Python",
      "LSTM/GRU",
      "Sequenzmodellierung",
      "Weights & Biases",
    ],
    demoUrl: "/projects/rnn-music-generation/",
    codeUrl: "https://github.com/Jorxas/eidl-abgabe3-musikgenerierung",
    ausgewaehlt: true,
    category: "Data Science",
  },
];

export interface Hobby {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export const hobbies: Hobby[] = [
  {
    icon: "Gamepad2",
    title: "Gaming",
    subtitle: "Videospiele",
    description:
      "Ich liebe es, verschiedene Videospiele zu spielen und neue Welten zu entdecken.",
  },
  {
    icon: "Film",
    title: "Filme & Anime",
    subtitle: "Unterhaltung",
    description:
      "Ich schaue gerne Filme und Anime, um neue Geschichten und Kulturen kennenzulernen.",
  },
  {
    icon: "Music",
    title: "Tanz & Musik",
    subtitle: "Kreativität",
    description: "Ich tanze gerne und genieße es, mich zur Musik zu bewegen.",
  },
  {
    icon: "Dumbbell",
    title: "Sport",
    subtitle: "Fitness",
    description: "Ich treibe regelmäßig Sport, um fit und gesund zu bleiben.",
  },
  {
    icon: "Piano",
    title: "Klavier",
    subtitle: "Musik",
    description: "Ich spiele gerne Klavier und genieße es, Musik zu machen.",
  },
  {
    icon: "Code",
    title: "Programmierung",
    subtitle: "Technologie",
    description:
      "Ich liebe es, neue Projekte zu entwickeln und zu programmieren.",
  },
];

export interface Certification {
  abbr: string;
  title: string;
  provider: string;
  date: string;
  description: string;
  url: string;
}

export const certifications: Certification[] = [
  {
    abbr: "FE",
    title: "Frontend-Webentwickler",
    provider: "LinkedIn Learning • 45 Std.",
    date: "Abgeschlossen: 6. April 2025",
    description:
      "Frontend-Entwicklung mit HTML, CSS, JavaScript und modernen Frameworks",
    url: "https://www.linkedin.com/learning/certificates/45c3d36f14565fda11b59d76061c19d52be168fa5498b1a0c1c6b9fbe3b29c33?trk=share_certificate",
  },
  {
    abbr: "SQL",
    title: "Das Wesentliche von SQL",
    provider: "LinkedIn Learning • 5h 17m",
    date: "Abgeschlossen: 20. Juni 2025",
    description: "Datenbankverwaltung und SQL-Abfrageoptimierung",
    url: "https://www.linkedin.com/learning/certificates/289576a1aa90d368578acca712d86007814e363e9dda095ee717197520ace77e",
  },
  {
    abbr: "OOP",
    title: "Grundlagen der Programmierung: Objektorientiertes Design",
    provider: "LinkedIn Learning • 2h 8m",
    date: "Abgeschlossen: 25. Januar 2025",
    description:
      "Grundlagen der objektorientierten Programmierung und Design-Patterns",
    url: "https://www.linkedin.com/learning/certificates/7e5c5694213eb3709e6c36fb503151555600510c2094dbd9a0c7e107760dd4ae",
  },
];

export interface Language {
  flag: string;
  name: string;
  level: string;
  dots: number;
  description: string;
}

export const languages: Language[] = [
  {
    flag: "🇫🇷",
    name: "Französisch",
    level: "Muttersprache",
    dots: 5,
    description: "Perfekte Beherrschung in Wort und Schrift",
  },
  {
    flag: "🇩🇪",
    name: "Deutsch",
    level: "Sehr gut",
    dots: 4,
    description: "DSH3 – Sehr gute Kommunikation im Alltag und Beruf",
  },
  {
    flag: "🇬🇧",
    name: "Englisch",
    level: "Grundkenntnisse",
    dots: 2,
    description: "Grundlegende Kommunikation und Verständnis",
  },
];

export interface TimelineItem {
  title: string;
  organization?: string;
  period: string;
  description?: string;
}

export const experience: TimelineItem[] = [
  {
    title: "Werkstudent – Softwareentwicklung (gesucht)",
    period: "Aktiv auf der Suche",
    description:
      "Motiviert, praktische Erfahrungen in realen Projekten zu sammeln und mein Studium sinnvoll zu ergänzen.",
  },
  {
    title: "Werkstudent – Lagerhelfer",
    period: "seit 2025",
    description:
      "Wareneingang/-ausgang, Kommissionierung und Bestandskontrolle; effizientes Arbeiten im Team und unter Zeitdruck.",
  },
  {
    title: "Werkstudent – Verkäufer",
    period: "2023 – 2024",
    description:
      "Kundenberatung, Kassenabwicklung und Warenpräsentation; Stärkung von Kommunikations- und Organisationsfähigkeiten.",
  },
];

export const education: TimelineItem[] = [
  {
    title: "Bachelor Informatik",
    organization: "Technische Hochschule Mittelhessen (THM), Gießen",
    period: "seit 2024",
    description:
      "Schwerpunkte: Softwareentwicklung, Data Science, verteilte Systeme, Datenbanken",
  },
  {
    title: "Bachelor Informatik",
    organization: "Technische Universität Darmstadt",
    period: "10/2023 – 2024",
    description: "Grundstudium Informatik",
  },
  {
    title: "Baccalauréat (Allgemeine Hochschulreife)",
    organization: "Kamerun",
    period: "2021",
  },
];

export const furtherTraining = [
  "TypeScript & Next.js",
  "Python für produktnahe Anwendungen",
  "Grundlagen der LLM-Integration in Web-Workflows",
];
