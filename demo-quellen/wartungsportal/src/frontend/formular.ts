import { Component, ElementRef, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auftragsdienst, fehlermeldung } from './auftragsdienst';

// Der Vertrag zählt Unicode-Codepunkte, nicht UTF-16-Codeeinheiten.
function bezeichnungPruefen(feld: AbstractControl<string>): ValidationErrors | null {
  return feld.value.trim().length > 0 && Array.from(feld.value).length <= 120
    ? null : { bezeichnung: true };
}

@Component({
  selector: 'auftrags-formular', imports: [ReactiveFormsModule, RouterLink],
  template: `
    <h1>Neuer Wartungsauftrag</h1>
    <p><a routerLink="/auftraege">Zur Liste</a></p>
    <form [formGroup]="formular" (ngSubmit)="speichern()">
      <label for="bezeichnung">Bezeichnung (Pflichtfeld)</label>
      <input id="bezeichnung" formControlName="bezeichnung" aria-required="true"
        [attr.aria-describedby]="formular.controls.bezeichnung.touched && formular.controls.bezeichnung.invalid ? 'bezeichnung-hilfe bezeichnung-fehler' : 'bezeichnung-hilfe'"
        [attr.aria-invalid]="formular.controls.bezeichnung.touched && formular.controls.bezeichnung.invalid">
      <p id="bezeichnung-hilfe">1 bis 120 Zeichen, mindestens ein sichtbares Zeichen.</p>
      @if (formular.controls.bezeichnung.touched && formular.controls.bezeichnung.invalid) {
        <p id="bezeichnung-fehler" role="alert">Bitte eine Bezeichnung mit 1 bis 120 Zeichen eingeben.</p>
      }
      <label for="prioritaet">Priorität (Pflichtfeld)</label>
      <select id="prioritaet" formControlName="prioritaet" aria-required="true"
        [attr.aria-describedby]="formular.controls.prioritaet.touched && formular.controls.prioritaet.invalid ? 'prioritaet-fehler' : null"
        [attr.aria-invalid]="formular.controls.prioritaet.touched && formular.controls.prioritaet.invalid">
        <option value="">Bitte wählen</option><option value="normal">normal</option><option value="hoch">hoch</option>
      </select>
      @if (formular.controls.prioritaet.touched && formular.controls.prioritaet.invalid) {
        <p id="prioritaet-fehler" role="alert">Bitte eine Priorität auswählen.</p>
      }
      <p><button type="submit" [disabled]="speichert()">Auftrag anlegen</button> <a routerLink="/auftraege">Abbrechen</a></p>
      @if (speichert()) { <p role="status">Auftrag wird angelegt …</p> }
      @if (fehler()) { <p role="alert">{{ fehler() }}</p> }
    </form>
  `
})
export class Auftragsformular {
  private readonly dienst = inject(Auftragsdienst);
  private readonly router = inject(Router);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly speichert = signal(false);
  readonly fehler = signal('');
  readonly formular = new FormGroup({
    bezeichnung: new FormControl('', { nonNullable: true, validators: [bezeichnungPruefen] }),
    prioritaet: new FormControl<'' | 'normal' | 'hoch'>('', { nonNullable: true, validators: [Validators.required] })
  });
  speichern() {
    if (this.speichert()) return;
    this.fehler.set('');
    if (this.formular.invalid) {
      this.formular.markAllAsTouched();
      const feld = this.formular.controls.bezeichnung.invalid ? 'bezeichnung' : 'prioritaet';
      this.element.nativeElement.querySelector<HTMLElement>('#' + feld)?.focus();
      return;
    }
    const eingabe = this.formular.getRawValue();
    if (eingabe.prioritaet === '') return;
    this.speichert.set(true);
    this.dienst.anlegen({ bezeichnung: eingabe.bezeichnung, prioritaet: eingabe.prioritaet }).subscribe({
      next: auftrag => { void this.router.navigate(['/auftraege', auftrag.kennung]); },
      error: fehler => { this.fehler.set(fehlermeldung(fehler)); this.speichert.set(false); }
    });
  }
}
