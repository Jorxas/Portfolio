import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, RouterOutlet, withHashLocation } from '@angular/router';
import { routen } from './routen';
import { demoBackend, demoZustand } from './demo-backend';

@Component({
  selector: 'wartungs-portal', imports: [RouterOutlet],
  template: `<header>Wartungsportal · Frontend-Demo</header>
    <aside style="padding:12px 20px;background:#fff7df;border-bottom:1px solid #e8d3a3;font-size:12px;line-height:1.7">
      <strong>Backend simuliert.</strong> Synthetische Daten, nur im Browser.
      <label style="display:flex;align-items:center;gap:8px;margin-top:7px;font-weight:400"><input type="checkbox" style="width:auto;margin:0;display:inline-block" (change)="ausfallAendern($event)"> API-Ausfall simulieren (beim nächsten Aufruf)</label>
    </aside><main><router-outlet /></main>`
})
class Wartungsportal {
  ausfallAendern(ereignis: Event) { demoZustand.ausfall = (ereignis.target as HTMLInputElement).checked; }
}

bootstrapApplication(Wartungsportal, {
  providers: [provideRouter(routen, withHashLocation()), provideHttpClient(withInterceptors([demoBackend]))]
}).catch(() => {
  document.body.textContent = 'Das Wartungsportal konnte nicht gestartet werden. Bitte die Seite erneut laden.';
});
