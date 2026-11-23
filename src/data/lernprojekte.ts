import type { Project } from "./portfolio-data";

/** Studien- und Lernprojekte: Quellcode auf GitHub, ohne Vorschaubilder; nur das Wartungsportal hat eine Demo. */
const lernprojekt = (
  p: Pick<
    Project,
    "id" | "title" | "domain" | "description" | "techStack" | "codeUrl" | "category"
  > & { demoUrl?: string },
): Project => ({ ...p, demoUrl: p.demoUrl ?? null, ausgewaehlt: false });

export const lernprojekte: Project[] = [
  lernprojekt({
    id: "werkstatt-datenqualitaet-bi",
    title: "Werkstattdaten: Datenqualität und Kennzahlen",
    domain: "Datenqualität & Business Intelligence",
    description:
      "Bestellungsdaten einer Werkstatt mit Dubletten und fehlerhaften Beträgen bereinigen und in SQL, Excel und Power BI vergleichbar auswerten.",
    techStack: ["Python", "SQLite", "Power BI", "DAX", "Excel/VBA"],
    codeUrl: "https://github.com/Jorxas/werkstatt-datenqualitaet-bi",
    demoUrl: "https://jorxas.github.io/werkstatt-datenqualitaet-bi/",
    category: "Daten & KI",
  }),
  lernprojekt({
    id: "mini-datahub-api",
    title: "Mini-DataHub für Anwendungsprotokolle",
    domain: "Datenintegration & APIs",
    description:
      "JSONL-Protokolle wiederholt importieren und je Umgebung auswerten, ohne Ereignisse zu verdoppeln.",
    techStack: ["Python", "FastAPI", "SQLite", "JSONL"],
    codeUrl: "https://github.com/Jorxas/mini-datahub-api",
    demoUrl: "https://jorxas.github.io/mini-datahub-api/",
    category: "Daten & KI",
  }),
  lernprojekt({
    id: "lokaler-dokumentenassistent",
    title: "Lokaler Dokumentenassistent mit Quellenprüfung",
    domain: "KI & Dokumentensuche",
    description:
      "Eine passende Anweisung in drei Dokumenten finden; Antworten belegen ihre Quelle oder weisen eine fehlende Grundlage aus.",
    techStack: ["Python", "Ollama", "Quellenprüfung"],
    codeUrl: "https://github.com/Jorxas/lokaler-dokumentenassistent",
    demoUrl: "https://jorxas.github.io/lokaler-dokumentenassistent/",
    category: "Daten & KI",
  }),
  lernprojekt({
    id: "wartungsportal-angular-java",
    title: "Wartungsportal mit Angular und Java",
    domain: "Webentwicklung & Instandhaltung",
    description:
      "Wartungsaufträge anlegen, wiederfinden und im Bearbeitungsstand ändern, mit Angular-Oberfläche und Java-Backend.",
    techStack: ["Angular", "TypeScript", "Java", "HTTP"],
    codeUrl: "https://github.com/Jorxas/wartungsportal-angular-java",
    demoUrl: "/demos/wartungsportal/",
    category: "Software & Systeme",
  }),
  lernprojekt({
    id: "messwertpruefung-dotnet",
    title: "Messwerte mit C# und WPF prüfen",
    domain: "Desktopsoftware & Messtechnik",
    description:
      "Messwerte aus einer CSV-Datei gegen einen Toleranzvertrag prüfen und Fehlerhinweise in einer Windows-Oberfläche anzeigen.",
    techStack: ["C#", ".NET", "WPF", "CSV"],
    codeUrl: "https://github.com/Jorxas/messwertpruefung-dotnet",
    demoUrl: "https://jorxas.github.io/messwertpruefung-dotnet/",
    category: "Software & Systeme",
  }),
  lernprojekt({
    id: "sensorsimulation-cpp",
    title: "Temperatursensor in C++ simulieren",
    domain: "C++ & Sensortechnik",
    description:
      "Temperaturverläufe überwachen und Schwellenüberschreitungen reproduzierbar melden, bevor echte Sensorhardware verfügbar ist.",
    techStack: ["C++", "CMake", "Ninja"],
    codeUrl: "https://github.com/Jorxas/sensorsimulation-cpp",
    demoUrl: "https://jorxas.github.io/sensorsimulation-cpp/",
    category: "Software & Systeme",
  }),
  lernprojekt({
    id: "devops-prueflabor",
    title: "Lokales DevOps-Prüflabor",
    domain: "DevOps & Betrieb",
    description:
      "Einen Dienst reproduzierbar bauen und starten, mit Gesundheitsprüfung, Konfigurationsfehlern und Wiederherstellung.",
    techStack: ["Docker", "Node.js", "Healthcheck"],
    codeUrl: "https://github.com/Jorxas/devops-prueflabor",
    demoUrl: "https://jorxas.github.io/devops-prueflabor/",
    category: "Software & Systeme",
  }),
  lernprojekt({
    id: "it-inventar-support",
    title: "IT-Inventar, Rechte und Support",
    domain: "IT-Betrieb & Support",
    description:
      "Geräte erfassen, zu weit gefasste Rechte erkennen und Support- und Risikoberichte erstellen.",
    techStack: ["PowerShell", "Inventar", "Rechteprüfung"],
    codeUrl: "https://github.com/Jorxas/it-inventar-support",
    demoUrl: "https://jorxas.github.io/it-inventar-support/",
    category: "Automatisierung & GIS",
  }),
  lernprojekt({
    id: "produktkatalog-php",
    title: "Wiederholbarer Produktkatalog mit PHP",
    domain: "E-Commerce & Produktdaten",
    description:
      "Produktdaten in einen kleinen Katalog importieren, ohne Preise zu verfälschen oder beim erneuten Import Duplikate anzulegen.",
    techStack: ["PHP", "PDO", "SQLite"],
    codeUrl: "https://github.com/Jorxas/produktkatalog-php",
    demoUrl: "https://jorxas.github.io/produktkatalog-php/",
    category: "Software & Systeme",
  }),
  lernprojekt({
    id: "maschinenzustand-simulation",
    title: "Zustände eines Förderbands simulieren",
    domain: "Automatisierung & Zustandsmodelle",
    description:
      "Normalbetrieb, Not-Halt und Sensorfehler eines Förderbands als Zustandsautomat nachvollziehbar prüfen.",
    techStack: ["Python", "Zustandsautomat", "Simulation"],
    codeUrl: "https://github.com/Jorxas/maschinenzustand-simulation",
    demoUrl: "https://jorxas.github.io/maschinenzustand-simulation/",
    category: "Automatisierung & GIS",
  }),
  lernprojekt({
    id: "wartungskarte-qgis",
    title: "Wartungsaufträge in QGIS kartieren",
    domain: "Geoinformatik & kommunale Daten",
    description:
      "Wartungsaufträge einer fiktiven Gemeinde nach Bezirk verorten, ohne dass ungültige Koordinaten die Karte verfälschen.",
    techStack: ["QGIS", "GeoJSON", "Python"],
    codeUrl: "https://github.com/Jorxas/wartungskarte-qgis",
    demoUrl: "https://jorxas.github.io/wartungskarte-qgis/",
    category: "Automatisierung & GIS",
  }),
  lernprojekt({
    id: "beschaffungsprozess-node-red",
    title: "Beschaffung mit nachvollziehbarer Freigabe",
    domain: "Prozessautomatisierung & Einkauf",
    description:
      "Kleine Beschaffungsanträge mit getrennten Rollen und prüfbaren Betragsregeln vor einem lokalen ERP-Export freigeben.",
    techStack: ["Node.js", "Node-RED", "JSON Schema"],
    codeUrl: "https://github.com/Jorxas/beschaffungsprozess-node-red",
    demoUrl: "https://jorxas.github.io/beschaffungsprozess-node-red/",
    category: "Automatisierung & GIS",
  }),
  lernprojekt({
    id: "stoerungsklassifikation-ml",
    title: "Störungsmeldungen mit einer Baseline vergleichen",
    domain: "Machine Learning & Evaluation",
    description:
      "Einen kleinen Textklassifikator gegen eine Mehrheitsbaseline prüfen, mit getrennten Trainings- und Testdaten.",
    techStack: ["scikit-learn", "Pandas", "NumPy", "TF-IDF"],
    codeUrl: "https://github.com/Jorxas/stoerungsklassifikation-ml",
    demoUrl: "https://jorxas.github.io/stoerungsklassifikation-ml/",
    category: "Daten & KI",
  }),
];
