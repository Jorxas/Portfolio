import daten from "./projektstudien.json";

export interface ProjektStudie {
  id: string;
  slug: string;
  titel: string;
  bereich: string;
  kopfzeile: string;
  problem: string;
  nutzen: string;
  ergebnis: string;
  grenze: string;
  farbe: string;
  technologien: string[];
  kennzahlen: { wert: string; text: string }[];
  vorgehen: { titel: string; text: string }[];
  repository: string;
  original: string;
  demoHinweis?: string;
  herkunft?: string;
}

export const projektstudien = daten as ProjektStudie[];

const weitereStudien: ProjektStudie[] = [
  {
    id: "CNN",
    slug: "cnn-clothing-classification",
    titel: "CNN Clothing Classification",
    bereich: "Daten & KI",
    kopfzeile: "Fünf Klassen. Ein Netz. Echte Fehler.",
    problem:
      "Wie gut erkennt ein selbst aufgebautes neuronales Netz Kleidungsstücke? Eine nachvollziehbare Testauswertung statt einer isolierten Erfolgszahl.",
    nutzen:
      "Ein CNN wird von Grund auf mit PyTorch trainiert. Die Konfusionsmatrix macht sichtbar, zwischen welchen Kleidungsklassen das Netz unterscheidet und welche es verwechselt.",
    ergebnis:
      "Der veröffentlichte Testlauf erreicht 72,45 % Genauigkeit bei 392 Bildern. Die Matrix enthält 284 richtige Zuordnungen. Trainingskurven und Fehlklassifikationen sind als Originalgrafiken verlinkt.",
    grenze:
      "Die Aussage gilt für diesen Testsplit mit fünf Klassen. Es gibt hier keine neue Bilderkennung; die Browseransicht zeigt gespeicherte Ergebnisse. Kurs-Bilddaten und eine produktive Klassifikations-API werden nicht bereitgestellt.",
    farbe: "#165dff",
    technologien: [
      "Python",
      "PyTorch",
      "torchvision",
      "CNN",
      "Weights & Biases",
    ],
    kennzahlen: [
      { wert: "72,45 %", text: "Genauigkeit im Test" },
      { wert: "392", text: "Bilder im Testsplit" },
      { wert: "767.365", text: "Modellparameter" },
    ],
    vorgehen: [
      {
        titel: "Daten aufteilen",
        text: "3.128 Trainingsbilder, 391 Validierungsbilder und 392 Testbilder. Fünf Kleidungsklassen bilden die Aufgabe.",
      },
      {
        titel: "Ein eigenes CNN trainieren",
        text: "Data Augmentation, Dropout und ein Lernraten-Scheduler unterstützen das Training ohne vortrainiertes Backbone.",
      },
      {
        titel: "Fehler untersuchen",
        text: "Die Testmatrix, Lernkurven und fehlklassifizierte Beispiele ergänzen die Gesamtgenauigkeit.",
      },
    ],
    repository: "https://github.com/Jorxas/cnn-clothing-classification",
    original:
      "Gemeinsames Kursprojekt mit Leslie Tsafack, Einführung in Deep Learning an der THM. Die Abbildungen und Messwerte stammen aus dem Original-Repository.",
    demoHinweis:
      "Gespeicherte Modellauswertung. Matrix und Kennzahlen stammen aus dem dokumentierten Testlauf. Keine neue Inferenz, kein Modelltraining und kein KI-Backend im Browser.",
    herkunft:
      "Kursprojekt in Zusammenarbeit. Diese zusätzliche interaktive Präsentation zeigt veröffentlichte Projektartefakte und wurde mit KI-Unterstützung erstellt.",
  },
  {
    id: "RNN",
    slug: "rnn-music-generation",
    titel: "Irische Musikgenerierung mit RNN",
    bereich: "Daten & KI",
    kopfzeile: "Wenn Musik zur Zeichenfolge wird.",
    problem:
      "LSTM oder GRU: Wie lernen rekurrente Netze irische Musik in ABC-Notation? Ein Vergleich gespeicherter Lernverläufe mit hörbaren Textbeispielen.",
    nutzen:
      "Ein zeichenbasiertes Modell lernt am IrishMAN-Datensatz die Vorhersage des nächsten Zeichens. Trainings-, Validierungs- und Testdaten bleiben als unterschiedliche Auswertungen erkennbar.",
    ergebnis:
      "Nach zehn Epochen erreicht die GRU im dokumentierten Test 68,54 % Top-1- und 93,64 % Top-5-Genauigkeit. Das LSTM erreicht 67,58 % und 93,36 %. Drei gespeicherte ABC-Beispiele sind in der Demo lesbar und vereinfacht abspielbar.",
    grenze:
      "Zeichengenauigkeit ist kein Maß für musikalische Qualität. Die Browser-Synthese interpretiert ABC nur vereinfacht; sie ist keine originale Audiodatei. Das Umschalten des Modells erzeugt keine neue Musik, und die gespeicherten Beispiele sind keinem Modell einzeln zugeordnet.",
    farbe: "#165dff",
    technologien: ["Python", "PyTorch", "LSTM", "GRU", "ABC-Notation"],
    kennzahlen: [
      { wert: "2", text: "verglichene Modelltypen" },
      { wert: "10", text: "Epochen je Modell" },
      { wert: "68,54 %", text: "GRU Top-1 im Test" },
    ],
    vorgehen: [
      {
        titel: "Musik als Text vorbereiten",
        text: "ABC-Notation wird tokenisiert. Das Modell verarbeitet Zeichenfolgen statt Audiosignale.",
      },
      {
        titel: "LSTM und GRU vergleichen",
        text: "Die gespeicherte Auswertung enthält zehn Epochen mit Trainings- und Validierungswerten pro Modell sowie getrennte Testergebnisse.",
      },
      {
        titel: "Ergebnisse greifbar machen",
        text: "Kurven, genaue Zahlen und gespeicherte ABC-Beispiele erlauben einen verständlichen Einblick. Eine lokale Sinus-Synthese dient nur zum Anhören.",
      },
    ],
    repository: "https://github.com/Jorxas/eidl-abgabe3-musikgenerierung",
    original:
      "Akademisches Gruppenprojekt im Kurs Einführung in Deep Learning (THM). Kennzahlen und ABC-Texte stammen aus den veröffentlichten Artefakten.",
    demoHinweis:
      "Gespeicherte Modellergebnisse. Kein Training und kein neues Modell-Sampling. Audio wird auf Wunsch lokal aus einem gespeicherten ABC-Text vereinfacht synthetisiert; es wird kein KI-Dienst aufgerufen.",
    herkunft:
      "Akademisches Gruppenprojekt. Die interaktive Präsentation und die vereinfachte Browser-Synthese wurden ergänzend mit KI-Unterstützung erstellt.",
  },
  {
    id: "QUIZ",
    slug: "multiplayer-trivia-quiz",
    titel: "Multiplayer Trivia Quiz",
    bereich: "Software & Systeme",
    kopfzeile: "Ein Quiz. Mehrere Spieler. Ein gemeinsamer Zustand.",
    problem:
      "Wie bleiben Lobby, Fragen und Ergebnisse in einem verteilten Quiz synchron? Ein akademisches Gruppenprojekt mit Java, MariaDB, MQTT und Web-Controllern.",
    nutzen:
      "Das Original trennt REST-Anfragen, persistente Daten und MQTT-Ereignisse. Die Demo nutzt sein vorhandenes Web-Frontend und ersetzt die externen Systeme durch einen lokalen Adapter.",
    ergebnis:
      "Eine Runde mit fünf originalen Web-Fragen ist lokal spielbar. Der Adapter liefert Lobby-, Frage- und Auswertungsereignisse an das ursprüngliche Frontend. Code und Demo bleiben getrennte Zugänge.",
    grenze:
      "Backend, MQTT und ein Mitspieler sind simuliert. Es gibt keine echte Anmeldung oder Mehrgeräte-Synchronisierung. Die Demo vergibt vereinfacht 100 Punkte pro richtiger Antwort. Sie validiert keine laufende Java-/MariaDB-/Broker-Installation.",
    farbe: "#165dff",
    technologien: [
      "Java · Vert.x",
      "MariaDB",
      "MQTT",
      "Docker Compose",
      "HTML/CSS/JS",
    ],
    kennzahlen: [
      { wert: "5", text: "originale Fragen in der Demo" },
      { wert: "REST + MQTT", text: "Kommunikation im Original" },
      { wert: "Lokal", text: "vollständig simulierter Server" },
    ],
    vorgehen: [
      {
        titel: "Verantwortlichkeiten trennen",
        text: "Java-Vert.x verarbeitet die API, MariaDB speichert Daten und MQTT verteilt Zustandsänderungen an Host und Controller.",
      },
      {
        titel: "Eine Runde synchronisieren",
        text: "Von der Lobby über die Frage bis zur Auswertung verwenden die Oberflächen gemeinsame Ereignisse.",
      },
      {
        titel: "Ohne Infrastruktur erklären",
        text: "Der Demo-Adapter ersetzt HTTP und MQTT im Browser. Antwortklicks am Host werden ausschließlich für diese Demo ergänzt.",
      },
    ],
    repository: "https://github.com/Jorxas/quizgame",
    original:
      "Akademisches Gruppenprojekt. Das vorhandene HTML/CSS/JavaScript-Frontend wird mit einem zusätzlichen lokalen Demo-Adapter verwendet; keine reale Serververbindung.",
    demoHinweis:
      "Backend, MQTT und Mitspieler simuliert. Keine echte Anmeldung und keine Datenbank. Die fünf Fragen stammen aus dem Originalprojekt; alle Spielzustände bleiben in diesem Browser und werden beim Neuladen zurückgesetzt.",
    herkunft:
      "Akademisches Gruppenprojekt. Die ergänzende Browser-Demo verwendet das originale Frontend mit einem klar gekennzeichneten, KI-unterstützt erstellten lokalen Adapter.",
  },
];
export const alleStudien: ProjektStudie[] = [
  ...projektstudien,
  ...weitereStudien,
];
