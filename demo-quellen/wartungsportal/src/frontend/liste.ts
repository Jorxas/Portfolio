import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auftragsdienst, fehlermeldung } from './auftragsdienst';
import { Wartungsauftrag } from './fachmodell';

@Component({
  selector: 'auftrags-liste',
  imports: [RouterLink],
  template: `
    <h1>Wartungsaufträge</h1>
    <p><a routerLink="/auftraege/neu">Neuer Auftrag</a></p>
    @if (laedt()) { <p role="status">Aufträge werden geladen …</p> }
    @if (fehler()) {
      <p role="alert">{{ fehler() }}</p><button (click)="laden()">Erneut laden</button>
    }
    @if (!laedt() && !fehler()) {
      @if (auftraege().length === 0) { <p>Noch keine Aufträge.</p> }
      @else {
        <table>
          <caption>Vorhandene Wartungsaufträge</caption>
          <thead><tr><th>Kennung</th><th>Bezeichnung</th><th>Priorität</th><th>Zustand</th><th>Aktion</th></tr></thead>
          <tbody>@for (auftrag of auftraege(); track auftrag.kennung) {
            <tr><td>{{ auftrag.kennung }}</td><td>{{ auftrag.bezeichnung }}</td>
              <td>{{ auftrag.prioritaet }}</td><td>{{ auftrag.zustand }}</td>
              <td><a [routerLink]="['/auftraege', auftrag.kennung]">Details {{ auftrag.kennung }}</a></td></tr>
          }</tbody>
        </table>
      }
    }
  `
})
export class Auftragsliste {
  private readonly dienst = inject(Auftragsdienst);
  readonly auftraege = signal<Wartungsauftrag[]>([]);
  readonly laedt = signal(false);
  readonly fehler = signal('');
  constructor() { this.laden(); }
  laden() {
    this.laedt.set(true);
    this.fehler.set('');
    this.dienst.liste().subscribe({
      next: auftraege => { this.auftraege.set(auftraege); this.laedt.set(false); },
      error: fehler => { this.fehler.set(fehlermeldung(fehler)); this.laedt.set(false); }
    });
  }
}
