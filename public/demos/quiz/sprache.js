/* Sprachumschaltung der Demo: Deutsch ist Standard, Französisch wird über ein
   Wörterbuch auf die deutschen Originaltexte gelegt. Die Wahl wird gespeichert. */
(() => {
  const SCHLUESSEL = "portfolioDemoSprache";
  let sprache = "de";
  const wunsch = new URLSearchParams(location.search).get("lang");
  try {
    if (wunsch === "de" || wunsch === "fr")
      localStorage.setItem(SCHLUESSEL, wunsch);
    sprache = localStorage.getItem(SCHLUESSEL) === "fr" ? "fr" : "de";
  } catch {
    sprache = wunsch === "fr" ? "fr" : "de";
  }
  window.__DEMO_SPRACHE__ = sprache;
  document.documentElement.lang = sprache;

  const woerterbuch = {
    "Quiz – lokale Browser-Demo": "Quiz – démo locale dans le navigateur",
    "Lokale Demo": "Démo locale",
    "· Backend, MQTT und Mitspieler simuliert. Keine Anmeldung erforderlich. Antworten direkt anklicken.":
      "· Backend, MQTT et co-joueur simulés. Aucune connexion nécessaire. Cliquez directement sur les réponses.",
    "Fünf Fragen starten": "Lancer cinq questions",
    "Zurücksetzen": "Réinitialiser",
    "Nächste Frage": "Question suivante",
    "Endergebnis anzeigen": "Afficher le résultat final",
    "Fragen werden vorbereitet …": "Préparation des questions …",
    "Bereit: fünf originale Web-Fragen. Keine echte Anmeldung oder Mehrspieler-Verbindung.":
      "Prêt : cinq questions web d’origine. Ni vraie connexion ni liaison multijoueur.",
    "Die lokalen Fragen konnten nicht geladen werden. Bitte neu laden.":
      "Les questions locales n’ont pas pu être chargées. Merci de recharger la page.",
    "Konfiguration": "Configuration",
    "Login": "Connexion",
    "Registrieren": "S’inscrire",
    "Controller": "Contrôleur",
    "Benutzername": "Nom d’utilisateur",
    "Passwort": "Mot de passe",
    "Benutzername eingeben": "Saisir le nom d’utilisateur",
    "Passwort eingeben": "Saisir le mot de passe",
    "Anmelden": "Se connecter",
    "Benutzername wählen": "Choisir un nom d’utilisateur",
    "RFID-Karte (optional)": "Carte RFID (facultatif)",
    "z.B. DEMO-ID oder DEMO-ID": "p. ex. DEMO-ID",
    "Passwort wiederholen": "Répéter le mot de passe",
    "Benutzername min. 3 Zeichen, Passwort min. 4 Zeichen.":
      "Nom d’utilisateur : 3 caractères minimum, mot de passe : 4 caractères minimum.",
    "← Zurück": "← Retour",
    "Zurück": "Retour",
    "Controller Konfiguration": "Configuration du contrôleur",
    "Wähle einen verfügbaren Controller aus:": "Choisissez un contrôleur disponible :",
    "+ Controller erstellen": "+ Créer un contrôleur",
    "↻ Aktualisieren": "↻ Actualiser",
    "Lade Controller…": "Chargement des contrôleurs…",
    "Eigene RFID-Karte anpassen:": "Modifier sa propre carte RFID :",
    "Karten-ID, bspw.: DEMO-ID oder DEMO-ID": "ID de carte, p. ex. DEMO-ID",
    "Speichern": "Enregistrer",
    "Weiter zur Lobby": "Continuer vers le lobby",
    "Quiz-Plattform": "Plateforme de quiz",
    "Lobby": "Lobby",
    "Spiel": "Jeu",
    "Auswertung": "Résultats",
    "Web-Controller": "Contrôleur web",
    "Highscores": "Meilleurs scores",
    "Spiel-Konfiguration": "Configuration du jeu",
    "5 Fragen": "5 questions",
    "10 Fragen": "10 questions",
    "20 Fragen": "20 questions",
    "Fragen:": "Questions :",
    "(verfügbar / Modus)": "(disponibles / mode)",
    "Kategorien (leicht, mittel, schwer)": "Catégories (facile, moyen, difficile)",
    "Programmierung": "Programmation",
    "Datenbanken": "Bases de données",
    "Web-Technologien": "Technologies web",
    "Netzwerke": "Réseaux",
    "Betriebssysteme": "Systèmes d’exploitation",
    "IT-Sicherheit": "Sécurité informatique",
    "Algorithmen": "Algorithmes",
    "Software Engineering": "Génie logiciel",
    "Embedded Systems": "Systèmes embarqués",
    "Linux & Tools": "Linux et outils",
    "Schwierigkeitsstufe": "Niveau de difficulté",
    "Leicht": "Facile",
    "Mittel": "Moyen",
    "Schwer": "Difficile",
    "▶ Spiel starten": "▶ Lancer le jeu",
    "Aktive Teilnehmer": "Participants actifs",
    "Frage:": "Question :",
    "Kein aktives Spiel. Starte die Partie aus der Lobby.":
      "Aucune partie en cours. Lancez la partie depuis le lobby.",
    "Ergebnisse dieser Frage": "Résultats de cette question",
    "Gesamtwertung": "Classement général",
    "Rang": "Rang",
    "Spieler": "Joueur",
    "Punkte": "Points",
    "Keine Auswertung verfügbar.": "Aucun résultat disponible.",
    "Zurück zur Lobby": "Retour au lobby",
    "← Zurück zur Lobby": "← Retour au lobby",
    "Nicht verbunden": "Non connecté",
    "✔ Bereit": "✔ Prêt",
    "Nach Antwort gesperrt bis zur nächsten Frage.":
      "Verrouillé après la réponse jusqu’à la question suivante.",
    "Bestenliste": "Meilleurs scores",
    "Datum / Uhrzeit": "Date / heure",
    "Keine Einträge. Lade Highscores…": "Aucune entrée. Chargement des meilleurs scores…",
    "Lade Highscores…": "Chargement des meilleurs scores…",
    "Keine freien Controller.": "Aucun contrôleur libre.",
    "Keine Teilnehmer in der Lobby.": "Aucun participant dans le lobby.",
    "Verfügbar": "Disponible",
    "Offline": "Hors ligne",
    "Bereit": "Prêt",
    "Nicht bereit": "Pas prêt",
    "Austreten": "Quitter",
    "Falsch": "Faux",
    "Demospieler": "Joueur démo",
    "Lernbot (simuliert)": "Lernbot (simulé)",
    "Verbindungsfehler.": "Erreur de connexion.",
    "Verbindungsfehler. Bitte erneut versuchen.": "Erreur de connexion. Veuillez réessayer.",
    "Bitte Kategorien und Schwierigkeiten auswählen.":
      "Veuillez choisir des catégories et des niveaux de difficulté.",
    "Nicht alle Spieler sind bereit.": "Tous les joueurs ne sont pas prêts.",
    "Spiel gestartet!": "Jeu lancé !",
  };

  const muster = [
    [/^Frage (\d+) von (\d+) – eine Antwort anklicken\. Nach 30 Sekunden wird ohne Antwort ausgewertet\.$/,
      "Question $1 sur $2 – cliquez sur une réponse. Sans réponse, l’évaluation a lieu après 30 secondes."],
    [/^Runde abgeschlossen: (\d+) \/ (\d+) Punkte\. Lernbot und Punktevergabe sind simuliert\.$/,
      "Manche terminée : $1 / $2 points. Lernbot et attribution des points sont simulés."],
    [/^Richtig!( · [\s\S]*)?$/, "Correct !$1"],
    [/^Richtige Antwort: ([A-D])( · [\s\S]*)?$/, "Bonne réponse : $1$2"],
    [/^Frage (\d+)\/(\d+) — Richtige Antwort: ([A-D])$/, "Question $1/$2 — Bonne réponse : $3"],
    [/^\+(\d+) Pkt$/, "+$1 pts"],
    [/^Keine Einträge für (\d+) Fragen\.$/, "Aucune entrée pour $1 questions."],
    [/^(\d+)s$/, "$1 s"],
  ];

  function uebersetze(text) {
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(text);
    const kern = m[2];
    if (!kern) return text;
    let ziel = woerterbuch[kern];
    if (ziel === undefined) {
      for (const [regel, ersatz] of muster) {
        if (regel.test(kern)) {
          ziel = kern.replace(regel, ersatz);
          break;
        }
      }
    }
    return ziel === undefined ? text : m[1] + ziel + m[3];
  }

  const ATTRIBUTE = ["placeholder", "title", "aria-label"];
  function attribute(el) {
    for (const a of ATTRIBUTE) {
      if (!el.hasAttribute(a)) continue;
      const alt = el.getAttribute(a);
      const neu = uebersetze(alt);
      if (neu !== alt) el.setAttribute(a, neu);
    }
  }
  function durchlaufe(knoten) {
    if (knoten.nodeType === 3) {
      const alt = knoten.nodeValue;
      if (alt === knoten.__fr) return;
      const neu = uebersetze(alt);
      if (neu !== alt) {
        knoten.__fr = neu;
        knoten.nodeValue = neu;
      }
    } else if (knoten.nodeType === 1) {
      if (/^(SCRIPT|STYLE)$/.test(knoten.tagName)) return;
      attribute(knoten);
      knoten.childNodes.forEach(durchlaufe);
    }
  }

  function umschalter() {
    const feld = document.createElement("div");
    feld.className = "demo-sprache";
    feld.setAttribute("role", "group");
    feld.setAttribute("aria-label", "Sprache");
    [["de", "DE"], ["fr", "FR"]].forEach(([code, beschriftung]) => {
      const knopf = document.createElement("button");
      knopf.type = "button";
      knopf.textContent = beschriftung;
      knopf.setAttribute("aria-pressed", String(code === sprache));
      knopf.onclick = () => {
        if (code === sprache) return;
        try {
          localStorage.setItem(SCHLUESSEL, code);
        } catch {
          /* ohne Speicher gilt die Adresse */
        }
        const adresse = new URL(location.href);
        adresse.searchParams.set("lang", code);
        location.href = adresse.toString();
      };
      feld.append(knopf);
    });
    const leiste = document.querySelector(".demo-hinweis");
    (leiste || document.body).prepend(feld);
  }

  document.addEventListener("DOMContentLoaded", () => {
    umschalter();
    if (sprache !== "fr") return;
    durchlaufe(document.documentElement);
    new MutationObserver((liste) => {
      for (const eintrag of liste) {
        if (eintrag.type === "childList") eintrag.addedNodes.forEach(durchlaufe);
        else if (eintrag.type === "characterData") durchlaufe(eintrag.target);
        else if (eintrag.type === "attributes") attribute(eintrag.target);
      }
    }).observe(document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
      attributeFilter: ATTRIBUTE,
    });
  });
})();
