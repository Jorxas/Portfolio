/* Erweiterungsprofil und Antwortbank bleiben in chrome.storage.local. */
const feld = document.getElementById("profil"),
  status = document.getElementById("status"),
  fragen = document.getElementById("fragen");
let bank = [];
const berichten = (text) => {
  status.textContent = text;
};
async function ziel() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !/^https?:/.test(tab.url || ""))
    throw Error(
      "Bitte ein Arbeitgeberformular in einem normalen Browser-Tab öffnen.",
    );
  if (/(^|\.)(linkedin\.com|indeed\.com)$/.test(new URL(tab.url).hostname))
    throw Error("Bitte das Formular auf der Arbeitgeberseite öffnen.");
  return tab.id;
}
async function ausfuehren(art, zusatz) {
  const tabId = await ziel();
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["fields.js"],
  });
  const profil = JSON.parse(feld.value || "{}");
  if (!profil || Array.isArray(profil) || typeof profil !== "object")
    throw Error("Ein JSON-Objekt als Profil verwenden.");
  const [r] = await chrome.scripting.executeScript({
    target: { tabId },
    func: async (art, profil, bank, zusatz) => {
      const motor = globalThis.jobAssistantFields;
      if (art === "inspect") return motor.inspect(profil, bank);
      if (art === "files") return motor.attachFiles(zusatz);
      return motor.run(profil, bank);
    },
    args: [art, profil, bank, zusatz || null],
  });
  return r?.result;
}
function offeneFragen(eintraege) {
  fragen.replaceChildren();
  for (const f of eintraege || []) {
    const label = document.createElement("label");
    label.textContent = f.question || f.label || "Unbekannte Frage";
    const eingabe = document.createElement("input");
    eingabe.placeholder = "Ausdrückliche Antwort";
    const knopf = document.createElement("button");
    knopf.textContent = "Antwort merken & erneut füllen";
    knopf.onclick = () =>
      sicher(async () => {
        const question = String(f.question || f.label || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ß/g, "ss")
          .replace(/[^a-z0-9 ]+/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        const answer = eingabe.value.trim();
        if (!question || !answer)
          throw Error("Bitte eine ausdrückliche Antwort eintragen.");
        bank = bank
          .filter((x) => x.question !== question)
          .concat({ question, answer });
        await chrome.storage.local.set({ bank });
        const r = await ausfuehren("run");
        offeneFragen(r?.pending);
        berichten(
          "Antwort lokal gespeichert. Offene Fragen: " +
            (r?.pending?.length || 0),
        );
      });
    label.append(eingabe, knopf);
    fragen.append(label);
  }
}
async function sicher(fn) {
  try {
    await fn();
  } catch (e) {
    berichten(e instanceof Error ? e.message : String(e));
  }
}
document.getElementById("speichern").onclick = () =>
  sicher(async () => {
    const profile = JSON.parse(feld.value || "{}");
    if (!profile || typeof profile !== "object" || Array.isArray(profile))
      throw Error("Ein JSON-Objekt als Profil verwenden.");
    await chrome.storage.local.set({ profile });
    berichten("Profil lokal gespeichert.");
  });
document.getElementById("pruefen").onclick = () =>
  sicher(async () => {
    const r = await ausfuehren("inspect");
    berichten(JSON.stringify(r, null, 2));
  });
document.getElementById("fuellen").onclick = () =>
  sicher(async () => {
    const r = await ausfuehren("run");
    offeneFragen(r?.pending);
    berichten(
      `${r?.count || 0} Felder ausgefüllt. Keine Bewerbung abgesendet.`,
    );
  });
document.getElementById("dokumente").onclick = () =>
  sicher(async () => {
    const dateien = [];
    for (const kind of ["cv", "letter"]) {
      const f = document.getElementById(kind).files[0];
      if (!f) continue;
      if (f.size > 5 * 1024 * 1024 || !f.name.toLowerCase().endsWith(".pdf"))
        throw Error("Bitte PDF-Dateien bis jeweils 5 MiB auswählen.");
      const bytes = new Uint8Array(await f.arrayBuffer());
      let binaer = "";
      for (let i = 0; i < bytes.length; i += 8192)
        binaer += String.fromCharCode(...bytes.subarray(i, i + 8192));
      dateien.push({
        kind,
        name: f.name,
        type: "application/pdf",
        base64: btoa(binaer),
      });
    }
    if (!dateien.length)
      throw Error("Bitte die passenden PDF zuerst auswählen.");
    const r = await ausfuehren("files", dateien);
    berichten(
      JSON.stringify(r, null, 2) +
        "\nDateien wurden nur zugeordnet. Kein Versand.",
    );
  });
document.getElementById("loeschen").onclick = () =>
  sicher(async () => {
    await chrome.storage.local.remove(["profile", "bank"]);
    feld.value = "";
    bank = [];
    fragen.replaceChildren();
    berichten(
      "Profil und Antworten gelöscht. Bereits auf Webseiten eingetragene Felder bleiben unverändert.",
    );
  });
chrome.storage.local.get(["profile", "bank"]).then((d) => {
  feld.value = JSON.stringify(d.profile || {}, null, 2);
  bank = Array.isArray(d.bank) ? d.bank : [];
});
