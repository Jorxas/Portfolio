/* Verhalten und Darstellung des statischen Portfolios im echten Browser prüfen. */
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODUL || "playwright");
const basis = process.argv[2];
if (
  !basis ||
  !/^https?:\/\/(127\.0\.0\.1:\d+|jorxas\.github\.io)\/Portfolio\/$/.test(basis)
)
  throw Error("Explizite lokale oder öffentliche Portfolio-URL erforderlich.");
const ziel = path.resolve(__dirname, "../.demo-nachweise/refonte");
fs.mkdirSync(ziel, { recursive: true });
const bericht = {
  beginn: new Date().toISOString(),
  basis,
  erfolgreich: false,
  pruefungen: [],
  fehler: [],
  backendAnfragen: [],
  fehlendeDateien: [],
};
const pruefen = (name) => {
  bericht.pruefungen.push(name);
  console.log(name);
};
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const kontext = await browser.newContext({
      viewport: { width: 1440, height: 1050 },
      locale: "de-DE",
      permissions: ["clipboard-read", "clipboard-write"],
    });
    const seite = await kontext.newPage();
    async function alleBilderLaden() {
      await seite.locator("img").evaluateAll((bilder) =>
        Promise.all(
          bilder.map((b) => {
            b.loading = "eager";
            return b.decode();
          }),
        ),
      );
      await seite.evaluate(() => scrollTo(0, 0));
    }
    seite.setDefaultTimeout(12000);
    seite.on("pageerror", (e) => bericht.fehler.push(e.message));
    seite.on("request", (r) => {
      if (
        /\/api\/|^wss?:/.test(r.url()) ||
        !["GET", "HEAD"].includes(r.method())
      )
        bericht.backendAnfragen.push(r.url());
    });
    seite.on("response", (r) => {
      if (r.status() >= 400)
        bericht.fehlendeDateien.push(r.status() + " " + r.url());
    });
    await seite.goto(basis, { waitUntil: "networkidle" });
    assert.match(await seite.locator("h1").textContent(), /Software/);
    assert.equal(await seite.locator(".projektkarte").count(), 6);
    await seite.getByRole("button", { name: "Daten", exact: true }).click();
    assert.match(
      await seite.locator(".kompass-vorschau").getAttribute("href"),
      /werkstatt-datenqualitaet/,
    );
    await seite
      .getByRole("button", { name: "Automatisierung", exact: true })
      .click();
    assert.match(
      await seite.locator(".kompass-vorschau").textContent(),
      /Maschinenzustände/,
    );
    await alleBilderLaden();
    await seite.screenshot({
      path: path.join(ziel, "start-desktop.png"),
      fullPage: true,
      animations: "disabled",
    });
    pruefen("Startseite und interaktiver Projektkompass");
    await seite.goto(basis + "projects/", { waitUntil: "networkidle" });
    assert.equal(await seite.locator(".projektkarte").count(), 9);
    await alleBilderLaden();
    await seite.getByRole("button", { name: /Alle Arbeiten/ }).click();
    assert.equal(await seite.locator(".projektkarte").count(), 18);
    for (const karte of await seite.locator(".projektkarte").all()) {
      const code = karte.getByRole("link", { name: /^Code:/ });
      const demo = karte.getByRole("link", { name: /^Demo:/ });
      assert.match(
        await code.getAttribute("href"),
        /^https:\/\/github\.com\/Jorxas\/.+/,
      );
      assert(await demo.getAttribute("href"));
    }
    assert(
      !/To-Do App|Meine Erste Webseite|Simon Game|Empanadas/.test(
        await seite.locator(".projektgitter").textContent(),
      ),
    );
    await seite
      .getByRole("searchbox", { name: "Projekte suchen" })
      .fill("Power BI");
    assert.equal(await seite.locator(".projektkarte").count(), 1);
    await seite.getByRole("searchbox").fill("kein-treffer-xyz");
    assert.equal(await seite.locator(".projektkarte").count(), 0);
    await seite
      .getByRole("button", { name: "Alle Projekte anzeigen", exact: true })
      .click();
    assert.equal(await seite.locator(".projektkarte").count(), 18);
    await seite
      .getByRole("button", { name: "Daten & KI", exact: true })
      .click();
    assert.equal(await seite.locator(".projektkarte").count(), 6);
    await seite.getByRole("button", { name: /Auswahl/ }).click();
    assert.equal(await seite.locator(".projektkarte").count(), 9);
    await seite.screenshot({
      path: path.join(ziel, "projekte-desktop.png"),
      fullPage: true,
      animations: "disabled",
    });
    pruefen("Auswahl 9 / alle 18, Filter, Suche, echte Code- und Demo-Links");
    await seite.goto(basis + "projects/stellensuche-jobpilot/", {
      waitUntil: "networkidle",
    });
    const jobpilot = seite.frameLocator("iframe");
    await jobpilot
      .getByRole("button", { name: "Demo zurücksetzen", exact: true })
      .click();
    assert.equal(await jobpilot.locator(".stellenzeile").count(), 8);
    await jobpilot
      .getByRole("searchbox", { name: "Stellen durchsuchen" })
      .fill("Nordlicht");
    assert.equal(await jobpilot.locator(".stellenzeile").count(), 1);
    await jobpilot
      .getByRole("button", { name: "Suchmechanik", exact: true })
      .click();
    assert.equal(await jobpilot.locator(".familienraster>div").count(), 24);
    await jobpilot
      .getByRole("button", { name: "Formularassistent", exact: true })
      .click();
    await jobpilot
      .getByRole("button", { name: "1. Beispielprofil eintragen", exact: true })
      .click();
    assert.equal(
      await jobpilot
        .frameLocator("iframe")
        .getByLabel("Vorname", { exact: true })
        .inputValue(),
      "Alex",
    );
    assert.equal(
      await jobpilot.frameLocator("iframe").getByRole("checkbox").isChecked(),
      false,
    );
    pruefen(
      "JobPilot: eingebettete Stellenübersicht, Suchplan und echter Formularmotor",
    );
    await seite.goto(basis + "projects/cnn-clothing-classification/", {
      waitUntil: "networkidle",
    });
    await seite
      .getByRole("button", {
        name: "Langarm als T-Shirt: 15 Bilder",
        exact: true,
      })
      .click();
    assert.match(
      await seite.locator(".lern-rueckmeldung").textContent(),
      /15 Bilder/,
    );
    await seite
      .getByText("Originale Trainingskurven ansehen", { exact: true })
      .click();
    await seite
      .getByText("Fehlklassifizierte Testbeispiele ansehen", { exact: true })
      .click();
    for (const bild of await seite.locator(".lern-details img").all()) {
      await bild.scrollIntoViewIfNeeded();
      await bild.evaluate((e) => e.decode());
    }
    assert(
      await seite
        .locator(".lern-details img")
        .evaluateAll((bilder) =>
          bilder.every((b) => b.complete && b.naturalWidth > 0),
        ),
    );
    await seite.screenshot({
      path: path.join(ziel, "cnn-desktop.png"),
      fullPage: true,
      animations: "disabled",
    });
    pruefen("CNN: Matrixauswahl und originale Grafiken");
    await seite.goto(basis + "projects/rnn-music-generation/", {
      waitUntil: "networkidle",
    });
    assert.match(
      await seite.locator(".lern-kennzahlen").textContent(),
      /67,58/,
    );
    await seite.getByRole("button", { name: "GRU", exact: true }).click();
    assert.match(
      await seite.locator(".lern-kennzahlen").textContent(),
      /68,54/,
    );
    await seite.getByLabel("ABC-Beispiel").selectOption("2");
    assert.match(await seite.locator(".lern-audio pre").textContent(), /DFE/);
    await seite
      .getByRole("button", {
        name: "Gespeichertes Beispiel anhören",
        exact: true,
      })
      .click();
    await seite
      .getByRole("button", { name: "Wiedergabe stoppen", exact: true })
      .waitFor();
    await seite
      .getByRole("button", { name: "Wiedergabe stoppen", exact: true })
      .click();
    assert.match(
      await seite.locator(".lern-audiostatus").textContent(),
      /Sinus-Synthese/,
    );
    pruefen("RNN: Modellvergleich, Beispielwechsel, Audio starten und stoppen");
    await seite.goto(basis + "projects/multiplayer-trivia-quiz/", {
      waitUntil: "networkidle",
    });
    const quiz = seite.frameLocator("iframe");
    await quiz
      .getByRole("button", { name: "Fünf Fragen starten", exact: true })
      .click();
    const antworten = ["A", "B", "A", "B", "C"];
    for (let i = 0; i < 5; i++) {
      await quiz
        .locator('#answerGrid .answer[data-option="' + antworten[i] + '"]')
        .click();
      await quiz
        .getByRole("button", {
          name: i === 4 ? "Endergebnis anzeigen" : "Nächste Frage",
          exact: true,
        })
        .click();
    }
    await quiz
      .getByText("Runde abgeschlossen: 500 / 500 Punkte.", { exact: false })
      .waitFor();
    await alleBilderLaden();
    await seite.screenshot({
      path: path.join(ziel, "quiz-desktop.png"),
      fullPage: true,
      animations: "disabled",
    });
    await quiz
      .getByRole("button", { name: "Zurücksetzen", exact: true })
      .click();
    await quiz
      .getByRole("button", { name: "Fünf Fragen starten", exact: true })
      .waitFor();
    pruefen(
      "Quiz: alle fünf Fragen, 500 Punkte, simulierte Gegner, Zurücksetzen",
    );
    await seite.goto(basis + "contact/", { waitUntil: "networkidle" });
    assert.match(
      await seite.locator(".kontaktmail").getAttribute("href"),
      /^mailto:/,
    );
    await seite
      .getByRole("button", { name: "E-Mail kopieren", exact: true })
      .click();
    assert.equal(
      await seite.evaluate(() => navigator.clipboard.readText()),
      "pokemtezo5@gmail.com",
    );
    pruefen("Kontakt: E-Mail und Zwischenablage ohne Versand");
    await seite.setViewportSize({ width: 390, height: 844 });
    for (const route of [
      "",
      "projects/",
      "about/",
      "contact/",
      "projects/cnn-clothing-classification/",
      "projects/rnn-music-generation/",
      "projects/multiplayer-trivia-quiz/",
      "projects/stellensuche-jobpilot/",
    ]) {
      await seite.goto(basis + route, { waitUntil: "networkidle" });
      assert(
        await seite.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        "Überbreite: " + route,
      );
      await alleBilderLaden();
      await seite.screenshot({
        path: path.join(
          ziel,
          (route.replaceAll("/", "-") || "start") + "mobil.png",
        ),
        fullPage: true,
        animations: "disabled",
      });
    }
    await seite.goto(basis);
    await seite
      .getByRole("button", { name: "Menü öffnen", exact: true })
      .click();
    assert(await seite.locator("#mobile-navigation").isVisible());
    await seite.keyboard.press("Escape");
    assert.equal(await seite.locator("#mobile-navigation").count(), 0);
    await seite
      .getByRole("button", { name: "Menü öffnen", exact: true })
      .click();
    await seite
      .locator("#mobile-navigation")
      .getByRole("link", { name: "Projekte", exact: true })
      .click();
    await seite.waitForURL("**/projects/");
    assert.equal(await seite.locator("#mobile-navigation").count(), 0);
    pruefen("Mobile Ansichten und Tastaturbedienung des Menüs");
    await seite.emulateMedia({ reducedMotion: "reduce" });
    await seite.goto(basis, { waitUntil: "networkidle" });
    assert.equal(
      await seite
        .locator(".kompass-linie")
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    pruefen("Reduzierte Bewegung berücksichtigt");
    assert.deepEqual(bericht.fehler, []);
    assert.deepEqual(bericht.backendAnfragen, []);
    assert.deepEqual(bericht.fehlendeDateien, []);
    bericht.erfolgreich = true;
  } catch (e) {
    bericht.prueffehler = e.stack;
    console.error(e.stack);
    process.exitCode = 1;
  } finally {
    await browser.close();
    bericht.ende = new Date().toISOString();
    fs.writeFileSync(
      path.join(ziel, "bericht.json"),
      JSON.stringify(bericht, null, 2) + "\n",
    );
  }
})();
