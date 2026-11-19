/* Reiner Browser-Adapter: keine Netzwerkverbindung, keine Anmeldung, kein Broker. */
(() => {
  const teilnehmer = [
    {
      username: "Demospieler",
      controllerId: "DEMO-WEB-1",
      controllerStatus: "ONLINE",
      ready: true,
    },
    {
      username: "Lernbot (simuliert)",
      controllerId: "DEMO-WEB-2",
      controllerStatus: "ONLINE",
      ready: true,
    },
  ];
  const meldungen = {};
  const anfragen = window.fetch.bind(window);
  let fragen = [],
    index = 0,
    punkte = 0,
    botPunkte = 0,
    aktiv = false,
    beantwortet = false,
    ablauf = null;
  const senden = (thema, daten) => {
    if (meldungen.message)
      meldungen.message("demo/" + thema, JSON.stringify(daten));
  };
  window.__ENV__ = { MQTT_MESSAGE_PREFIX: "demo/" };
  window.mqtt = {
    connect() {
      setTimeout(() => {
        if (meldungen.connect) meldungen.connect();
      }, 0);
      return {
        on(name, fn) {
          meldungen[name] = fn;
          return this;
        },
        subscribe() {},
        publish() {},
      };
    },
  };
  // Ausschließlich die bekannten API-Aufrufe ersetzen; unbekannte URLs werden abgewiesen.
  window.fetch = async (input) => {
    const url = new URL(
      typeof input === "string" ? input : input.url,
      location.href,
    );
    if (!url.pathname.startsWith("/api/"))
      throw new Error("In der Quiz-Demo ist kein externer Abruf vorgesehen.");
    const p = url.pathname;
    const json = (d) =>
      new Response(JSON.stringify(d), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    if (p === "/api/lobby/status") return json({ players: teilnehmer });
    if (p === "/api/controllers/available")
      return json({
        controllers: [{ controllerId: "DEMO-WEB-1", type: "WEB" }],
      });
    if (p.startsWith("/api/highscores/"))
      return json(
        aktiv || punkte
          ? [
              {
                username: "Demospieler",
                score: punkte,
                created_at: new Date().toISOString(),
              },
              {
                username: "Lernbot (simuliert)",
                score: botPunkte,
                created_at: new Date().toISOString(),
              },
            ]
          : [],
      );
    if (p === "/api/auth/rfid") return json({ rfidUid: null });
    if (p === "/api/game/start") {
      setTimeout(starten, 0);
      return new Response("Lokale Demorunde gestartet.");
    }
    if (p === "/api/controllers/create-web")
      return json({ controllerId: "DEMO-WEB-1" });
    if (
      [
        "/api/lobby/create",
        "/api/lobby/join",
        "/api/lobby/leave",
        "/api/game/config",
        "/api/auth/login",
        "/api/auth/register",
        "/api/players/bind",
      ].includes(p)
    )
      return new Response("Lokale Demo: keine Daten gespeichert.");
    return new Response(
      "Diese Funktion ist in der lokalen Demo nicht verfügbar.",
      { status: 400 },
    );
  };
  function naechsteFrage() {
    clearTimeout(ablauf);
    if (!aktiv) return;
    if (index >= fragen.length) {
      aktiv = false;
      senden("game/ended", {});
      senden("game/state", { state: "ENDED" });
      document.getElementById("demo-start").disabled = false;
      document.getElementById("demo-status").textContent =
        "Runde abgeschlossen: " +
        punkte +
        " / 500 Punkte. Lernbot und Punktevergabe sind simuliert.";
      return;
    }
    beantwortet = false;
    const f = fragen[index];
    senden("game/state", { state: "QUESTION" });
    senden("game/question", {
      ...f,
      questionIndex: index + 1,
      totalQuestions: fragen.length,
      duration: 30,
    });
    document.getElementById("demo-start").disabled = true;
    document.getElementById("demo-status").textContent =
      "Frage " +
      (index + 1) +
      " von 5 – eine Antwort anklicken. Nach 30 Sekunden wird ohne Antwort ausgewertet.";
    ablauf = setTimeout(() => antworten(null), 30000);
  }
  function antworten(option) {
    if (!aktiv || beantwortet) return;
    beantwortet = true;
    clearTimeout(ablauf);
    const f = fragen[index],
      richtig = option === f.correctOption,
      botRichtig = index % 2 === 0;
    punkte += richtig ? 100 : 0;
    botPunkte += botRichtig ? 100 : 0;
    senden("game/state", { state: "EVALUATION" });
    senden("game/evaluation", {
      questionIndex: index + 1,
      totalQuestions: 5,
      correctOption: f.correctOption,
      questionResults: [
        {
          username: "Demospieler",
          correct: richtig,
          points: richtig ? 100 : 0,
        },
        {
          username: "Lernbot (simuliert)",
          correct: botRichtig,
          points: botRichtig ? 100 : 0,
        },
      ],
      rankings: [
        { username: "Demospieler", totalPoints: punkte },
        { username: "Lernbot (simuliert)", totalPoints: botPunkte },
      ].sort((a, b) => b.totalPoints - a.totalPoints),
    });
    document.getElementById("demo-status").textContent =
      (richtig ? "Richtig!" : "Richtige Antwort: " + f.correctOption) +
      " · " +
      f.options[f.correctOption];
    index++;
    const weiter = document.getElementById("demo-weiter");
    weiter.textContent = index === 5 ? "Endergebnis anzeigen" : "Nächste Frage";
    weiter.hidden = false;
  }
  function starten() {
    if (!fragen.length) return;
    clearTimeout(ablauf);
    index = 0;
    punkte = 0;
    botPunkte = 0;
    aktiv = true;
    document.getElementById("demo-weiter").hidden = true;
    naechsteFrage();
  }
  document.addEventListener("DOMContentLoaded", async () => {
    const hinweis = document.querySelector(".demo-hinweis");
    const status = document.createElement("p");
    status.id = "demo-status";
    status.setAttribute("aria-live", "polite");
    status.textContent = "Fragen werden vorbereitet …";
    hinweis.append(status);
    const weiter = document.createElement("button");
    weiter.id = "demo-weiter";
    weiter.hidden = true;
    weiter.onclick = () => {
      weiter.hidden = true;
      naechsteFrage();
    };
    hinweis.append(weiter);
    document.getElementById("demo-start").disabled = true;
    document.getElementById("demo-start").onclick = starten;
    document.getElementById("demo-neustart").onclick = () => location.reload();
    document
      .querySelectorAll("#answerGrid .answer")
      .forEach((knopf) =>
        knopf.addEventListener("click", () => antworten(knopf.dataset.option)),
      );
    // Der Originalhost wird hier zum lokalen Eingabegerät; echte Controller sind nicht eingebunden.
    document
      .querySelectorAll('[data-section="web-controller"]')
      .forEach((e) => {
        e.hidden = true;
      });
    document.querySelector(".panel.left").hidden = true;
    document.querySelector("#modePills").closest(".card").hidden = true;
    document.body.className = "demo-modus";
    try {
      const r = await anfragen("fragen.json");
      if (!r.ok) throw Error("Fragen nicht erreichbar");
      const d = await r.json();
      fragen = d.fragen;
      document.getElementById("demo-start").disabled = false;
      status.textContent =
        "Bereit: fünf originale Web-Fragen. Keine echte Anmeldung oder Mehrspieler-Verbindung.";
    } catch {
      status.textContent =
        "Die lokalen Fragen konnten nicht geladen werden. Bitte neu laden.";
    }
  });
})();
