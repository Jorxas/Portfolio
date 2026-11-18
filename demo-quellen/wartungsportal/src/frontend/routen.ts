import { Routes } from '@angular/router';
import { Auftragsliste } from './liste';
import { Auftragsdetail } from './detail';
import { Auftragsformular } from './formular';

export const routen: Routes = [
  { path: '', redirectTo: 'auftraege', pathMatch: 'full' },
  { path: 'auftraege', component: Auftragsliste },
  { path: 'auftraege/neu', component: Auftragsformular },
  { path: 'auftraege/:kennung', component: Auftragsdetail },
  { path: '**', component: Auftragsliste }
];
