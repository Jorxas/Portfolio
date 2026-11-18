import type { ReactNode } from "react";

export const euro = (cent: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cent / 100);
export function Kennzahlen({ werte }: { werte: [string, ReactNode][] }) {
  return <div className="demo-kennzahlen">{werte.map(([text, wert]) => <div key={text}><span>{text}</span><strong>{wert}</strong></div>)}</div>;
}
export function Hinweis({ kinder, fehler = false }: { kinder: ReactNode; fehler?: boolean }) {
  return <div className={fehler ? "demo-hinweis demo-fehler" : "demo-hinweis"} role="status" aria-live="polite">{kinder}</div>;
}
export function Status({ text, gut = true }: { text: string; gut?: boolean }) {
  return <span className={gut ? "demo-status demo-gut" : "demo-status demo-warnung"}>{text}</span>;
}
export function Tabelle({ kopf, zeilen }: { kopf: string[]; zeilen: ReactNode[][] }) {
  return <div className="demo-tabelle"><table><thead><tr>{kopf.map(k => <th key={k} scope="col">{k}</th>)}</tr></thead><tbody>{zeilen.map((z, i) => <tr key={i}>{z.map((f, j) => <td key={j}>{f}</td>)}</tr>)}</tbody></table></div>;
}
