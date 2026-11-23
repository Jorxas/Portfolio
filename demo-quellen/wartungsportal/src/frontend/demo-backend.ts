/** Nur die GitHub-Pages-Demo: synthetische Antworten, kein Netzwerk oder Java-Server. */
import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

interface DemoAuftrag { kennung: string; bezeichnung: string; prioritaet: string; zustand: string }
const auftraege: DemoAuftrag[] = [
  { kennung: 'A01', bezeichnung: 'Sensor prüfen', prioritaet: 'normal', zustand: 'offen' },
  { kennung: 'A02', bezeichnung: 'Kabel austauschen', prioritaet: 'hoch', zustand: 'erledigt' }
];
export const demoZustand = { ausfall: false };
let naechsteKennung = 3;

export const demoBackend: HttpInterceptorFn = (anfrage, weiter) => {
  const pfad = new URL(anfrage.url, 'https://nur-lokale-demo.invalid').pathname;
  if (!pfad.startsWith('/api/auftraege')) return weiter(anfrage);
  const fehler = (status: number, code: string, meldung: string) => throwError(() => new HttpErrorResponse({ status, url: anfrage.url, error: { code, meldung } }));
  if (demoZustand.ausfall) return fehler(503, 'demo_dienst_nicht_erreichbar', 'Simulierter API-Ausfall. Im Demo-Kopf wieder ausschalten.');
  const antwort = (daten: unknown, status = 200) => of(new HttpResponse({ status, body: structuredClone(daten), url: anfrage.url }));
  const koerper = anfrage.body as Record<string, unknown> | null;
  if (pfad === '/api/auftraege') {
    if (anfrage.method === 'GET') return antwort(auftraege);
    if (anfrage.method === 'POST') {
      if (!koerper || Object.keys(koerper).length !== 2 || typeof koerper['bezeichnung'] !== 'string'
        || !koerper['bezeichnung'].trim() || [...koerper['bezeichnung']].length > 120
        || !['normal', 'hoch'].includes(String(koerper['prioritaet']))) return fehler(400, 'ungueltige_anfrage', 'Anfrage ungültig: Feld oder Kennung prüfen.');
      const auftrag = { kennung: 'A' + String(naechsteKennung++).padStart(2, '0'), bezeichnung: koerper['bezeichnung'], prioritaet: String(koerper['prioritaet']), zustand: 'offen' };
      auftraege.push(auftrag); return antwort(auftrag, 201);
    }
  } else {
    const kennung = pfad.slice('/api/auftraege/'.length), auftrag = auftraege.find(a => a.kennung === kennung);
    if (!auftrag) return fehler(404, 'auftrag_nicht_gefunden', 'Der angefragte Auftrag wurde nicht gefunden.');
    if (anfrage.method === 'GET') return antwort(auftrag);
    if (anfrage.method === 'PATCH') {
      if (!koerper || Object.keys(koerper).length !== 1 || !['offen', 'erledigt'].includes(String(koerper['zustand']))) return fehler(400, 'ungueltige_anfrage', 'Anfrage ungültig: Feld oder Kennung prüfen.');
      auftrag.zustand = String(koerper['zustand']); return antwort(auftrag);
    }
  }
  return fehler(405, 'methode_nicht_erlaubt', 'Diese Methode ist hier nicht erlaubt.');
};
