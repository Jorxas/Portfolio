import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auftragseingabe, Auftragszustand, Wartungsauftrag } from './fachmodell';

@Injectable({ providedIn: 'root' })
export class Auftragsdienst {
  private readonly http = inject(HttpClient);
  liste() { return this.http.get<Wartungsauftrag[]>('/api/auftraege'); }
  detail(kennung: string) {
    return this.http.get<Wartungsauftrag>('/api/auftraege/' + encodeURIComponent(kennung));
  }
  anlegen(eingabe: Auftragseingabe) {
    return this.http.post<Wartungsauftrag>('/api/auftraege', eingabe);
  }
  zustandAendern(kennung: string, zustand: Auftragszustand) {
    return this.http.patch<Wartungsauftrag>('/api/auftraege/' + encodeURIComponent(kennung), { zustand });
  }
}

export function fehlermeldung(fehler: HttpErrorResponse): string {
  if (fehler.status === 404) return 'Der angefragte Auftrag wurde nicht gefunden.';
  if (fehler.status === 400) return 'Die Eingabe wurde abgelehnt. Bitte Bezeichnung und Priorität prüfen.';
  return 'Die Aufträge konnten nicht übertragen werden. Bitte die lokale API prüfen und erneut versuchen.';
}
