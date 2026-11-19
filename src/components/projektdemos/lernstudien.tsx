"use client";
/* eslint-disable @next/next/no-img-element -- Originalgrafiken werden unverändert lokal ausgeliefert. */
import { useEffect, useRef, useState } from "react";
import { Play, Square } from "lucide-react";
import daten from "@/data/legacy-daten.json";
import { assetPath } from "@/lib/asset-path";

export function Kleidungsnetz() {
  const [zelle, setzen] = useState<[number, number]>([0, 0]);
  const d = daten.cnn,
    namen = ["Langarm", "Hose", "Shorts", "Socken", "T-Shirt"];
  const [zeile, spalte] = zelle;
  const anzahl = d.konfusionsmatrix[zeile][spalte];
  return (
    <div className="lern-demo">
      <div className="demo-werkzeugkopf">
        <span>Gespeicherte Testauswertung</span>
        <span>392 Bilder · 5 Klassen</span>
      </div>
      <div className="lern-einleitung">
        <h3>Was verwechselt das Netz?</h3>
        <p>
          Eine Zelle auswählen: Zeilen zeigen die tatsächliche Klasse, Spalten
          die Vorhersage. Die Diagonale enthält die richtigen Klassifikationen.
        </p>
      </div>
      <div className="matrix-scroll">
        <table className="konfusionsmatrix">
          <caption>Konfusionsmatrix des dokumentierten Testlaufs</caption>
          <thead>
            <tr>
              <th scope="col">Ist ↓ / Vorhersage →</th>
              {namen.map((n) => (
                <th scope="col" key={n}>
                  {n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.konfusionsmatrix.map((werte, i) => (
              <tr key={namen[i]}>
                <th scope="row">{namen[i]}</th>
                {werte.map((wert, j) => (
                  <td key={j}>
                    <button
                      onClick={() => setzen([i, j])}
                      aria-pressed={zeile === i && spalte === j}
                      aria-label={`${namen[i]} als ${namen[j]}: ${wert} Bilder`}
                      style={{
                        background: `rgba(22,93,255,${0.05 + (wert / 65) * 0.8})`,
                        color: wert > 35 ? "white" : "#18385f",
                      }}
                    >
                      {wert}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lern-rueckmeldung" aria-live="polite">
        <strong>
          {anzahl} Bilder: {namen[zeile]} → {namen[spalte]}
        </strong>
        <p>
          {zeile === spalte
            ? "Richtig erkannt."
            : "Eine Verwechslung zwischen zwei Klassen."}{" "}
          Das sind{" "}
          {(
            (anzahl / d.konfusionsmatrix[zeile].reduce((a, b) => a + b, 0)) *
            100
          ).toLocaleString("de-DE", { maximumFractionDigits: 1 })}{" "}
          % der tatsächlichen Klasse „{namen[zeile]}“.
        </p>
      </div>
      <details className="lern-details">
        <summary>Originale Trainingskurven ansehen</summary>
        <img
          loading="lazy"
          src={assetPath("/images/lernstudien/cnnkurven.png")}
          alt="Originale Trainings- und Validierungskurven des CNN-Projekts"
        />
        <p>
          Originalgrafik aus dem Repository. Es wurden keine fehlenden
          Kurvenwerte rekonstruiert.
        </p>
      </details>
      <details className="lern-details">
        <summary>Fehlklassifizierte Testbeispiele ansehen</summary>
        <img
          loading="lazy"
          src={assetPath("/images/lernstudien/cnnfehler.png")}
          alt="Im Originalprojekt veröffentlichte Fehlklassifikationen mit tatsächlichen und vorhergesagten Klassen"
        />
      </details>
      <a
        className="lern-quellenlink"
        href={d.quellen[0].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Quelle: gespeicherte Metriken im Original-Repository ↗
      </a>
    </div>
  );
}

export function Musiknetz() {
  const [modell, setzenModell] = useState<"lstm" | "gru">("lstm"),
    [beispiel, setzenBeispiel] = useState(0),
    [spielt, setzenSpielt] = useState(false),
    [meldung, setzenMeldung] = useState("");
  const audio = useRef<AudioContext | null>(null),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const d = daten.rnn,
    m = d[modell];
  function stoppen() {
    if (timer.current) clearTimeout(timer.current);
    if (audio.current) {
      void audio.current.close();
      audio.current = null;
    }
    setzenSpielt(false);
  }
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (audio.current) void audio.current.close();
    },
    [],
  );
  async function spielen() {
    stoppen();
    try {
      const ctx = new AudioContext();
      audio.current = ctx;
      await ctx.resume();
      const abc = d.abcBeispiele[beispiel]
        .split("\n")
        .filter((l) => !/^\w:/.test(l))
        .join(" ")
        .replace(/\[[^\]]*\]|\{[^}]*\}/g, "");
      const noten = [
        ...abc.matchAll(/([\^_=]?)([A-Ga-gz])([,']*)(\d*)(?:\/(\d*))?/g),
      ].slice(0, 150);
      let zeit = ctx.currentTime + 0.06;
      for (const n of noten) {
        let dauer = 0.2 * (Number(n[4]) || 1);
        if (n[0].includes("/")) dauer /= Number(n[5]) || 2;
        dauer = Math.min(dauer, 1.2);
        if (n[2] !== "z") {
          const basis: Record<string, number> = {
            C: 0,
            D: 2,
            E: 4,
            F: 5,
            G: 7,
            A: 9,
            B: 11,
          };
          const buchstabe = n[2].toUpperCase();
          const vorzeichen =
            n[1] === "^"
              ? 1
              : n[1] === "_"
                ? -1
                : n[1] === "="
                  ? 0
                  : ["F", "C"].includes(buchstabe)
                    ? 1
                    : 0;
          const midi =
            60 +
            basis[buchstabe] +
            (n[2] === n[2].toLowerCase() ? 12 : 0) +
            (n[3].split("'").length - 1) * 12 -
            (n[3].split(",").length - 1) * 12 +
            vorzeichen;
          const oscillator = ctx.createOscillator(),
            gain = ctx.createGain();
          oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
          gain.gain.setValueAtTime(0, zeit);
          gain.gain.linearRampToValueAtTime(0.12, zeit + 0.015);
          gain.gain.linearRampToValueAtTime(0, zeit + dauer * 0.95);
          oscillator.connect(gain);
          gain.connect(ctx.destination);
          oscillator.start(zeit);
          oscillator.stop(zeit + dauer);
        }
        zeit += dauer;
      }
      setzenSpielt(true);
      setzenMeldung(
        "Vereinfachte lokale Sinus-Synthese. Verzierungen, Wiederholungen und Taktwechsel werden nicht vollständig interpretiert.",
      );
      timer.current = setTimeout(
        stoppen,
        (zeit - ctx.currentTime) * 1000 + 100,
      );
    } catch {
      stoppen();
      setzenMeldung(
        "Die Audiowiedergabe ist in diesem Browser nicht verfügbar. Das gespeicherte ABC-Beispiel bleibt lesbar.",
      );
    }
  }
  const punkte = (art: "trainingLoss" | "validierungLoss") =>
    m.epochen
      .map((e, i) => `${50 + i * 52},${215 - (e[art] - 0.8) * 120}`)
      .join(" ");
  return (
    <div className="lern-demo">
      <div className="demo-werkzeugkopf">
        <span>Gespeicherte Trainings- und Testergebnisse</span>
        <span>10 Epochen je Modell</span>
      </div>
      <div className="lern-einleitung">
        <h3>Zwei Modelle, dieselbe Aufgabe.</h3>
        <p>
          Das Netz sagt das nächste Zeichen einer ABC-Musiknotation voraus. Die
          Testgenauigkeit misst Zeichenprognosen, keine musikalische Qualität.
        </p>
      </div>
      <div className="lern-modellauswahl" role="group" aria-label="RNN-Modell">
        {(["lstm", "gru"] as const).map((x) => (
          <button
            key={x}
            onClick={() => setzenModell(x)}
            aria-pressed={modell === x}
          >
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="lern-kennzahlen">
        <div>
          <strong>
            {(m.test.top1 * 100).toLocaleString("de-DE", {
              maximumFractionDigits: 2,
            })}{" "}
            %
          </strong>
          <span>Top-1 im Test</span>
        </div>
        <div>
          <strong>
            {(m.test.top5 * 100).toLocaleString("de-DE", {
              maximumFractionDigits: 2,
            })}{" "}
            %
          </strong>
          <span>Top-5 im Test</span>
        </div>
        <div>
          <strong>
            {m.test.loss.toLocaleString("de-DE", { maximumFractionDigits: 3 })}
          </strong>
          <span>Test-Loss</span>
        </div>
      </div>
      <figure className="lern-kurve">
        <svg
          viewBox="0 0 560 250"
          role="img"
          aria-label={`${modell.toUpperCase()}: Trainings- und Validierungs-Loss über zehn Epochen`}
        >
          <path d="M45 20v195h485" fill="none" stroke="#a4b8d4" />
          {[1, 1.5, 2].map((y) => (
            <g key={y}>
              <path d={`M45 ${215 - (y - 0.8) * 120}h485`} stroke="#e2eaf5" />
              <text
                x="12"
                y={219 - (y - 0.8) * 120}
                fontSize="11"
                fill="#657d9c"
              >
                {y}
              </text>
            </g>
          ))}
          <polyline
            points={punkte("trainingLoss")}
            fill="none"
            stroke="#165dff"
            strokeWidth="3"
          />
          <polyline
            points={punkte("validierungLoss")}
            fill="none"
            stroke="#799bcd"
            strokeWidth="3"
            strokeDasharray="5 4"
          />
          <text x="45" y="239" fontSize="11" fill="#657d9c">
            Epoche 1
          </text>
          <text x="475" y="239" fontSize="11" fill="#657d9c">
            Epoche 10
          </text>
        </svg>
        <figcaption>
          <span>━ Training</span>
          <span>┄ Validierung</span>
        </figcaption>
      </figure>
      <details className="lern-details">
        <summary>Exakte Kurvenwerte als Tabelle</summary>
        <div className="matrix-scroll">
          <table>
            <thead>
              <tr>
                <th>Epoche</th>
                <th>Training-Loss</th>
                <th>Validierungs-Loss</th>
              </tr>
            </thead>
            <tbody>
              {m.epochen.map((e) => (
                <tr key={e.epoche}>
                  <td>{e.epoche}</td>
                  <td>{e.trainingLoss.toFixed(4)}</td>
                  <td>{e.validierungLoss.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <section className="lern-audio">
        <h3>Ein gespeichertes Ergebnis anhören.</h3>
        <p>
          Wiedergabe eines gespeicherten ABC-Beispiels – kein neues
          Modell-Sampling. Die Beispiele sind im Quellartefakt keinem der beiden
          Modelle einzeln zugeordnet.
        </p>
        <label>
          ABC-Beispiel
          <select
            value={beispiel}
            onChange={(e) => {
              stoppen();
              setzenBeispiel(Number(e.target.value));
              setzenMeldung("");
            }}
          >
            {d.abcBeispiele.map((_, i) => (
              <option key={i} value={i}>
                Beispiel {i + 1}
              </option>
            ))}
          </select>
        </label>
        <pre>{d.abcBeispiele[beispiel]}</pre>
        <button
          className="knopf knopf-blau"
          onClick={spielt ? stoppen : spielen}
        >
          {spielt ? <Square size={15} /> : <Play size={15} />}{" "}
          {spielt ? "Wiedergabe stoppen" : "Gespeichertes Beispiel anhören"}
        </button>
        <p className="lern-audiostatus" aria-live="polite">
          {meldung}
        </p>
      </section>
      <a
        className="lern-quellenlink"
        href={d.quellen[0].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Quelle: Originalauswertung und gespeicherte Beispiele ↗
      </a>
    </div>
  );
}

export function Quizstudie() {
  return (
    <div>
      <div className="demo-werkzeugkopf">
        <span>Originales Quiz-Frontend</span>
        <span>Backend & MQTT lokal simuliert</span>
      </div>
      <iframe
        src={assetPath("/demos/quiz/")}
        title="Multiplayer-Quiz: lokale Demo mit simuliertem Mitspieler"
        className="quiz-rahmen"
        sandbox="allow-scripts allow-same-origin"
      />
      <p className="demo-mikro">
        Fünf originale Web-Fragen. Antworten hier per Klick statt über
        Hardware-Controller. 100 Punkte pro richtiger Antwort sind eine
        vereinfachte Demoregel; keine echte Anmeldung, kein Broker und kein
        echter Mehrspielerbetrieb.
      </p>
    </div>
  );
}
