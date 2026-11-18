import { Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Auftragsdienst, fehlermeldung } from './auftragsdienst';
import { Auftragszustand, Wartungsauftrag } from './fachmodell';

@Component({
  selector: 'auftrags-detail', imports: [RouterLink],
  template: `
    <h1>Auftragsdetails</h1>
    <p><a routerLink="/auftraege">Zur Liste</a></p>
    @if (laedt()) { <p role="status">Auftrag wird geladen …</p> }
    @if (fehler()) { <p role="alert">{{ fehler() }}</p> }
    @if (auftrag(); as auftrag) {
      <h2>Auftrag {{ auftrag.kennung }}</h2>
      <dl><dt>Bezeichnung</dt><dd>{{ auftrag.bezeichnung }}</dd>
        <dt>Priorität</dt><dd>{{ auftrag.prioritaet }}</dd>
        <dt>Zustand</dt><dd>{{ auftrag.zustand }}</dd></dl>
      <button type="button" [disabled]="speichert()" (click)="zustandAendern()">
        {{ auftrag.zustand === 'offen' ? 'Als erledigt markieren' : 'Wieder öffnen' }}
      </button>
      <p role="status">{{ speichert() ? 'Zustand wird gespeichert …' : bestaetigung() }}</p>
    }
  `
})
export class Auftragsdetail {
  readonly auftrag = signal<Wartungsauftrag | null>(null);
  readonly laedt = signal(true);
  readonly fehler = signal('');
  readonly speichert = signal(false);
  readonly bestaetigung = signal('');
  private readonly dienst = inject(Auftragsdienst);
  private readonly zerstoerung = inject(DestroyRef);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  private fokusWiederherstellen() {
    // Der deaktivierte Knopf verliert während des Speicherns den Browserfokus.
    // Nach der erneuten Darstellung bleibt die Tastaturbedienung am Auslöser.
    setTimeout(() => {
      if (!this.zerstoerung.destroyed) this.element.nativeElement.querySelector<HTMLButtonElement>('button')?.focus();
    }, 0);
  }

  zustandAendern() {
    const bisher = this.auftrag();
    if (!bisher || this.speichert()) return;
    const zustand: Auftragszustand = bisher.zustand === 'offen' ? 'erledigt' : 'offen';
    this.speichert.set(true);
    this.fehler.set('');
    this.bestaetigung.set('');
    this.dienst.zustandAendern(bisher.kennung, zustand).pipe(
      takeUntilDestroyed(this.zerstoerung)
    ).subscribe({
      next: geaendert => {
        this.auftrag.set(geaendert);
        this.bestaetigung.set('Zustand gespeichert: ' + geaendert.zustand + '.');
        this.speichert.set(false);
        this.fokusWiederherstellen();
      },
      error: fehler => {
        this.fehler.set('Der Zustand konnte nicht gespeichert werden. ' + fehlermeldung(fehler));
        this.speichert.set(false);
        this.fokusWiederherstellen();
      }
    });
  }
  constructor() {
    inject(ActivatedRoute).paramMap.pipe(
      tap(() => { this.laedt.set(true); this.fehler.set(''); this.bestaetigung.set(''); this.auftrag.set(null); }),
      switchMap(parameter => this.dienst.detail(parameter.get('kennung') ?? '').pipe(
        catchError(fehler => { this.fehler.set(fehlermeldung(fehler)); return of(null); })
      )),
      takeUntilDestroyed(inject(DestroyRef))
    ).subscribe(auftrag => { this.auftrag.set(auftrag); this.laedt.set(false); });
  }
}
