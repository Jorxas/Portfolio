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
    'Mein Name ist <strong>Jordan Freddy</strong> und ich studiere derzeit <strong>Informatik an der THM in Gießen</strong> (Bachelor) mit Fokus auf <strong>Software Engineering</strong> und <strong>Datenanalyse</strong>.',
    'Besonders interessiere ich mich für die <strong>praktische Umsetzung von IT-Lösungen</strong> und die <strong>Arbeit in dynamischen Teams</strong>. Ich gelte als zuverlässig, teamorientiert und lerne schnell.',
    'Aktuell suche ich eine <strong>Werkstudentenstelle im IT-Bereich</strong>, um mein Wissen zu vertiefen und es in realen Projekten anzuwenden.',
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
  { name: "Python", percentage: 75 },
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
    items: ["Java", "JavaScript", "TypeScript (Grundkenntnisse)", "HTML5", "CSS3", "Bootstrap", "React", "Next.js (Grundkenntnisse)", "Tailwind CSS", "APIs"],
  },
  {
    category: "Python & Data",
    items: ["Python", "SQL", "MariaDB"],
  },
  {
    category: "Tools & DevOps",
    items: ["Docker", "Docker Compose", "Git / GitLab", "MQTT", "Linux-Grundlagen"],
  },
  {
    category: "KI-Fokus",
    items: ["LLM-basierte Features", "Strukturierte Datenverarbeitung", "Python für produktnahe Anwendungen"],
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demoUrl: string | null;
  codeUrl: string;
  category: "Web App" | "Website";
}

export const projects: Project[] = [
  {
    id: "simon-goes-multiplayer",
    title: "Simon Goes Multiplayer",
    description: "Verteiltes Multiplayer-Spiel mit Echtzeit-Synchronisation (MQTT). Backend in Java (Vert.x) mit MariaDB; Frontend in HTML/CSS/JS; DevOps via Docker Compose.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=2070&q=80",
    techStack: ["Java (Vert.x)", "MariaDB", "MQTT", "Docker", "HTML/CSS/JS", "Git"],
    demoUrl: null,
    codeUrl: "https://github.com/Jorxas/simon_game",
    category: "Web App",
  },
  {
    id: "todo-app",
    title: "To-Do App",
    description: "Task-Management-Anwendung mit responsivem UI. Backend Java (Vert.x) mit MariaDB, Frontend HTML/CSS/JS, Deployment via Docker, Versionskontrolle mit Git.",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=2072&q=80",
    techStack: ["Java (Vert.x)", "MariaDB", "HTML/CSS/JS", "Docker", "Git"],
    demoUrl: null,
    codeUrl: "https://github.com/Jorxas/Todo-app",
    category: "Web App",
  },
  {
    id: "function-plotter",
    title: "Function Plotter",
    description: "Java-basiertes Tool zum Plotten von Funktionen mit Fokus auf Streams, Collections und funktionaler Programmierung.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2072&q=80",
    techStack: ["Java", "Markdown", "HTML/CSS"],
    demoUrl: null,
    codeUrl: "https://github.com/Jorxas/funtionplotter",
    category: "Web App",
  },
  {
    id: "steinbeis",
    title: "Steinbeis Beratungszentrum",
    description: "Moderne Unternehmenswebsite zur Präsentation der Beratungsdienstleistungen im Bereich Bau und Immobilien, mit Expertise in Bauprojektmanagement, Immobilienbewertung und Risk Engineering.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2070&q=80",
    techStack: ["Next.js", "React", "Tailwind CSS", "Lucide React", "JSX", "Google Fonts"],
    demoUrl: null,
    codeUrl: "https://bitbucket.org/jorxas/steinbeis",
    category: "Website",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Moderne Portfolio-Website mit responsivem Design, Bootstrap und interaktiven Elementen. Präsentiert Projekte, Erfahrungen und Kontaktinformationen.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=2070&q=80",
    techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    demoUrl: null,
    codeUrl: "https://github.com/Jorxas/Portfolio",
    category: "Website",
  },
  {
    id: "mini-apps",
    title: "Mini Apps Collection – Spielezentrum",
    description: "Moderne Benutzeroberfläche, die alle JavaScript-Projekte an einem Ort zusammenführt. Enthält Taschenrechner, Countdown Timer, Währungsrechner, Witz-Generator und Zahlenraten.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2070&q=80",
    techStack: ["JavaScript", "HTML", "CSS"],
    demoUrl: "https://jorxas.github.io/mini_js_project/",
    codeUrl: "https://github.com/Jorxas/mini_js_project",
    category: "Web App",
  },
  {
    id: "empanadas-3d",
    title: "Interaktive 3D-Karte – Empanadas",
    description: "Interaktive elektronische Karte zur Förderung eines Empanada-Verkaufsstands. 3D-Rotationsanimation, Touch-Interaktion, Vollbildansicht und Download-Funktion.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2070&q=80",
    techStack: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    demoUrl: "https://cs-empanadas.netlify.app",
    codeUrl: "https://github.com/Jorxas/empanadas",
    category: "Web App",
  },
  {
    id: "jorxas-shop",
    title: "Jorxas – Elektronik Online-Shop",
    description: "Moderne E-Commerce-Website für den Verkauf von Elektronikgeräten. Vollständig funktional mit Warenkorb, Produktkatalog, FAQ und responsive Design.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2070&q=80",
    techStack: ["HTML", "CSS", "JavaScript", "Font Awesome", "Leaflet.js"],
    demoUrl: null,
    codeUrl: "#",
    category: "Web App",
  },
  {
    id: "erste-webseite",
    title: "Meine Erste Webseite",
    description: "Meine erste selbst erstellte Webseite mit HTML und CSS. Portfolio-Projekt mit Navigation, Kontaktformular und Social Media Integration.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=2070&q=80",
    techStack: ["HTML", "CSS", "Font Awesome", "Google Fonts"],
    demoUrl: null,
    codeUrl: "https://github.com/Jorxas/myfirstpage",
    category: "Website",
  },
  {
    id: "freizeitaktivitaeten",
    title: "Freizeitaktivitäten Hessen",
    description: "Website mit umfassender Übersicht über Freizeitaktivitäten in der Region Hessen, von Outdoor-Sport bis hin zu kulturellen Veranstaltungen.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80",
    techStack: ["HTML", "CSS"],
    demoUrl: null,
    codeUrl: "https://github.com/Jorxas/My-Blog",
    category: "Website",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Webseiten wie ein Profi strukturieren: Semantische Tags in HTML5",
    excerpt: "Entdecke, wie du semantische HTML5-Tags verwendest, um eine professionelle und zugängliche Webstruktur zu erstellen.",
    content: "<p>Die Struktur einer Webseite ist fundamental für ihre Qualität...</p>",
    date: "12. April 2025",
    author: "Jordan Freddy",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=2070&q=80",
    readTime: "10 Min.",
  },
  {
    id: "2",
    title: "Responsive Design mit Flexbox und Grid erstellen",
    excerpt: "Lerne moderne CSS-Layout-Techniken mit Flexbox und Grid für professionelle, responsive Websites.",
    content: "<p>Moderne CSS-Layout-Techniken haben die Webentwicklung revolutioniert...</p>",
    date: "18. April 2025",
    author: "Jordan Freddy",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2070&q=80",
    readTime: "12 Min.",
  },
  {
    id: "3",
    title: "3 kleine JavaScript-Tricks für interaktive Webseiten",
    excerpt: "Entdecke 3 praktische JavaScript-Techniken, die deine Webseiten sofort interaktiver und benutzerfreundlicher machen.",
    content: "<p>JavaScript macht Webseiten lebendig und interaktiv...</p>",
    date: "25. April 2025",
    author: "Jordan Freddy",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=2070&q=80",
    readTime: "8 Min.",
  },
  {
    id: "4",
    title: "Inhalte einfach mit Bootstrap-Utilities organisieren",
    excerpt: "Entdecke die Macht der Bootstrap-Utilities – organisiere deine Inhalte schnell und effizient ohne Custom CSS.",
    content: "<p>Als Entwickler habe ich oft gesehen, wie Bootstrap-Utilities unterschätzt werden...</p>",
    date: "28. April 2025",
    author: "Jordan Freddy",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=2070&q=80",
    readTime: "12 Min.",
  },
];

export interface Hobby {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export const hobbies: Hobby[] = [
  { icon: "Gamepad2", title: "Gaming", subtitle: "Videospiele", description: "Ich liebe es, verschiedene Videospiele zu spielen und neue Welten zu entdecken." },
  { icon: "Film", title: "Filme & Anime", subtitle: "Unterhaltung", description: "Ich schaue gerne Filme und Anime, um neue Geschichten und Kulturen kennenzulernen." },
  { icon: "Music", title: "Tanz & Musik", subtitle: "Kreativität", description: "Ich tanze gerne und genieße es, mich zur Musik zu bewegen." },
  { icon: "Dumbbell", title: "Sport", subtitle: "Fitness", description: "Ich treibe regelmäßig Sport, um fit und gesund zu bleiben." },
  { icon: "Piano", title: "Klavier", subtitle: "Musik", description: "Ich spiele gerne Klavier und genieße es, Musik zu machen." },
  { icon: "Code", title: "Programmierung", subtitle: "Technologie", description: "Ich liebe es, neue Projekte zu entwickeln und zu programmieren." },
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
    description: "Frontend-Entwicklung mit HTML, CSS, JavaScript und modernen Frameworks",
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
    description: "Grundlagen der objektorientierten Programmierung und Design-Patterns",
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
  { flag: "🇫🇷", name: "Französisch", level: "Muttersprache", dots: 5, description: "Perfekte Beherrschung in Wort und Schrift" },
  { flag: "🇩🇪", name: "Deutsch", level: "Sehr gut", dots: 4, description: "DSH3 – Sehr gute Kommunikation im Alltag und Beruf" },
  { flag: "🇬🇧", name: "Englisch", level: "Grundkenntnisse", dots: 2, description: "Grundlegende Kommunikation und Verständnis" },
];

export interface TimelineItem {
  title: string;
  organization?: string;
  period: string;
  description?: string;
}

export const experience: TimelineItem[] = [
  { title: "Werkstudent – Softwareentwicklung (gesucht)", period: "Aktiv auf der Suche", description: "Motiviert, praktische Erfahrungen in realen Projekten zu sammeln und mein Studium sinnvoll zu ergänzen." },
  { title: "Werkstudent – Lagerhelfer", period: "seit 2025", description: "Wareneingang/-ausgang, Kommissionierung und Bestandskontrolle; effizientes Arbeiten im Team und unter Zeitdruck." },
  { title: "Werkstudent – Verkäufer", period: "2023 – 2024", description: "Kundenberatung, Kassenabwicklung und Warenpräsentation; Stärkung von Kommunikations- und Organisationsfähigkeiten." },
];

export const education: TimelineItem[] = [
  { title: "Bachelor Informatik", organization: "Technische Hochschule Mittelhessen (THM), Gießen", period: "seit 2024", description: "Schwerpunkte: Softwareentwicklung, Data Science, verteilte Systeme, Datenbanken" },
  { title: "Bachelor Informatik", organization: "Technische Universität Darmstadt", period: "10/2023 – 2024", description: "Grundstudium Informatik" },
  { title: "Baccalauréat (Allgemeine Hochschulreife)", organization: "Kamerun", period: "2021" },
];

export const furtherTraining = [
  "TypeScript & Next.js",
  "Python für produktnahe Anwendungen",
  "Grundlagen der LLM-Integration in Web-Workflows",
];
