/* Sprachumschaltung der Wartungsportal-Demo: Deutsch ist Standard, Französisch
   wird über ein Wörterbuch auf die deutschen Originaltexte gelegt. */
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
    "Wartungsportal": "Portail de maintenance",
    "Wartungsportal · Frontend-Demo": "Portail de maintenance · démo frontend",
    "Backend simuliert.": "Backend simulé.",
    "Synthetische Daten, nur im Browser.": "Données synthétiques, uniquement dans le navigateur.",
    "API-Ausfall simulieren (beim nächsten Aufruf)": "Simuler une panne de l’API (au prochain appel)",
    "Wartungsaufträge": "Ordres de maintenance",
    "Neuer Auftrag": "Nouvel ordre",
    "Aufträge werden geladen …": "Chargement des ordres …",
    "Erneut laden": "Recharger",
    "Noch keine Aufträge.": "Aucun ordre pour le moment.",
    "Vorhandene Wartungsaufträge": "Ordres de maintenance existants",
    "Kennung": "Référence",
    "Bezeichnung": "Désignation",
    "Priorität": "Priorité",
    "Zustand": "État",
    "Aktion": "Action",
    "Auftragsdetails": "Détails de l’ordre",
    "Zur Liste": "Retour à la liste",
    "Auftrag wird geladen …": "Chargement de l’ordre …",
    "Als erledigt markieren": "Marquer comme terminé",
    "Wieder öffnen": "Rouvrir",
    "Zustand wird gespeichert …": "Enregistrement de l’état …",
    "Neuer Wartungsauftrag": "Nouvel ordre de maintenance",
    "Bezeichnung (Pflichtfeld)": "Désignation (obligatoire)",
    "1 bis 120 Zeichen, mindestens ein sichtbares Zeichen.": "De 1 à 120 caractères, au moins un caractère visible.",
    "Bitte eine Bezeichnung mit 1 bis 120 Zeichen eingeben.": "Veuillez saisir une désignation de 1 à 120 caractères.",
    "Priorität (Pflichtfeld)": "Priorité (obligatoire)",
    "Bitte wählen": "Veuillez choisir",
    "Bitte eine Priorität auswählen.": "Veuillez choisir une priorité.",
    "Auftrag anlegen": "Créer l’ordre",
    "Abbrechen": "Annuler",
    "Auftrag wird angelegt …": "Création de l’ordre …",
    "offen": "ouvert",
    "erledigt": "terminé",
    "normal": "normale",
    "hoch": "haute",
    "Sensor prüfen": "Contrôler le capteur",
    "Kabel austauschen": "Remplacer le câble",
    "Der angefragte Auftrag wurde nicht gefunden.": "L’ordre demandé est introuvable.",
    "Die Eingabe wurde abgelehnt. Bitte Bezeichnung und Priorität prüfen.": "La saisie a été refusée. Veuillez vérifier la désignation et la priorité.",
    "Die Aufträge konnten nicht übertragen werden. Bitte die lokale API prüfen und erneut versuchen.": "Les ordres n’ont pas pu être transmis. Veuillez vérifier l’API locale et réessayer.",
    "Das Wartungsportal konnte nicht gestartet werden. Bitte die Seite erneut laden.": "Le portail de maintenance n’a pas pu démarrer. Veuillez recharger la page.",
  };

  const muster = [
    [/^Details (\S+)$/, "Détails $1"],
    [/^Auftrag (\S+)$/, "Ordre $1"],
    [/^Zustand gespeichert: offen\.$/, "État enregistré : ouvert."],
    [/^Zustand gespeichert: erledigt\.$/, "État enregistré : terminé."],
    [/^Der Zustand konnte nicht gespeichert werden\. ([\s\S]*)$/, "L’état n’a pas pu être enregistré. $1"],
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
    const stil = document.createElement("style");
    stil.textContent =
      ".demo-sprache{position:fixed;right:12px;bottom:12px;z-index:50;display:inline-flex;box-shadow:0 2px 8px rgba(0,0,0,.18);border-radius:6px}" +
      ".demo-sprache button{margin:0;padding:6px 11px;font:600 12px system-ui,sans-serif;background:#fff;color:#0b5f78;border:1px solid #0b5f78;cursor:pointer;width:auto}" +
      ".demo-sprache button:first-child{border-radius:6px 0 0 6px}" +
      ".demo-sprache button:last-child{border-radius:0 6px 6px 0;border-left:0}" +
      '.demo-sprache button[aria-pressed="true"]{background:#0b5f78;color:#fff}';
    document.head.append(stil);
    document.body.append(feld);
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
