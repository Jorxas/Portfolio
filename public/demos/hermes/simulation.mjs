// Browserlokales Anschauungsmodell. Es führt keine MCP-, CLI- oder Netzaufrufe aus.
export const ANBIETER = {claude:'Claude Code',codex:'Codex',antigravity:'Antigravity'};
export const GRUPPEN = {claude:'Claude-Code-Abonnement',codex:'Codex-Abonnement',gemini:'Gemini Models',argon:'Gemini 4 Argon',third_party:'Claude and GPT models'};
const familien = [
 ['gemini-3.8-flash','Gemini 3.8 Flash','gemini',{low:2,medium:3,high:4},18],
 ['gemini-4-argon','Gemini 4 Argon','argon',{low:3,medium:5,high:5},32],
 ['claude-opus-5-5','Claude Opus 5.5','third_party',{low:4,medium:5,high:5},89],
 ['claude-sonnet-5-5','Claude Sonnet 5.5','third_party',{low:3,medium:4,high:5},53],
 ['gpt-oss-120b','GPT-OSS 120B','third_party',{medium:3},36],
];
export const MODELLE = [
 {id:'sonnet',name:'Claude Code · Sonnet',provider:'claude',gruppe:'claude',grenze:5,zeit:76},
 {id:'gpt-6.1-sol',name:'Codex · GPT-6.1 Sol',provider:'codex',gruppe:'codex',grenze:5,zeit:48},
 ...familien.flatMap(([id,name,gruppe,stufen,zeit])=>Object.entries(stufen).map(([stufe,grenze])=>({id:id+'-'+stufe,name:name+' · '+stufe,provider:'antigravity',gruppe,grenze,zeit:zeit+(stufe==='high'?12:stufe==='medium'?5:0)}))),
];
export const ZUSTAENDE = {queued:'Bereit',running:'In Arbeit',complete:'Abgeschlossen',blocked:'Blockiert',waiting_for_quota:'Kontingentpause',reconcile:'Zustellung unklar',cancelled:'Abgebrochen'};
const kopie = wert=>structuredClone(wert);
function ereignis(z,text,mission){z.ereignisse.unshift({id:++z.zaehler,text,mission,zeit:z.zeit});z.ereignisse=z.ereignisse.slice(0,50);}

export function erzeugeZustand(szenario='team') {
 const start=Math.floor(Date.now()/1000);
 const mission=(id,titel,projekt,schwierigkeit,modus,abhaengig=[])=>({mission_id:id,titel,project_id:projekt,schwierigkeit,modus,schreiben:modus==='implement',vorliebe:'auto',modell:'auto',abhaengig,state:'queued',grund:'Wartet auf den nächsten Simulationstakt.',versuche:[],takte:0,berichte:[],arbeitsbaum:projekt+'/'+id,created_at:start,updated_at:start});
 const z={simulation:true,szenario,zeit:start,zaehler:0,takt:0,historie:true,speicher:8,reserve:2,proAuftrag:2,kontingente:{claude:72,codex:64,gemini:68,argon:81,third_party:46},auswahl:'daten',ereignisse:[],nachrichten:[],missionen:[
  mission('daten','Datenvertrag analysieren','Werkstatt',2,'plan'),
  mission('api','Import-API implementieren','Datenportal',3,'implement'),
  mission('review','Architektur und Randfälle prüfen','Datenportal',5,'plan',['api']),
  mission('bericht','Ergebnisse für ChatGPT bündeln','Werkstatt',2,'plan',['daten','review']),
 ]};
 if(szenario==='sperre'){z.missionen[0].arbeitsbaum='demo/gemeinsamer-arbeitsbaum';z.missionen[1].arbeitsbaum='demo/gemeinsamer-arbeitsbaum';z.missionen[0].modus='implement';z.missionen[0].schreiben=true;}
 if(szenario==='unklar'){z.missionen[0].state='reconcile';z.missionen[0].grund='Unklarer Empfang: vor einem neuen Versuch erst den früheren Auftrag abgleichen.';z.missionen[0].versuche.push({provider:'antigravity',id:'gemini-3.8-flash-low',name:'Gemini 3.8 Flash · low',gruppe:'gemini',zustand:'sending',nummer:1,simuliert:true});}
 if(szenario==='quota')z.kontingente.gemini=0;
 ereignis(z,'ChatGPT hat vier Beispielaufgaben mit Abhängigkeiten übergeben. Alle Daten sind erfunden.');
 return z;
}

export function waehleRoute(z,m) {
 const bewertungen=MODELLE.map(k=>{
  let ausschluss=null;
  if(m.vorliebe!=='auto'&&k.provider!==m.vorliebe)ausschluss='Andere vorgegebene Ausführungsroute';
  if(m.modell!=='auto'&&k.id!==m.modell)ausschluss='Anderes vorgegebenes Modell';
  if(z.kontingente[k.gruppe]<=0)ausschluss='Kontingentgruppe erschöpft';
  if(k.provider==='antigravity'&&z.missionen.some(n=>n!==m&&['running','waiting_for_quota','reconcile'].includes(n.state)&&n.versuche.at(-1)?.provider==='antigravity'))ausschluss='Antigravity-Ausführungsplatz belegt';
  if(!z.historie&&k.grenze<m.schwierigkeit&&m.modell==='auto')ausschluss='Anfängliche Schwierigkeitseignung reicht nicht';
  // Bewusst erfundene, vergleichbare Beispielbeobachtungen; keine Anbieter-Benchmarks.
  let qualitaet=null,zeit=null;
  if(z.historie){qualitaet=m.schwierigkeit>=5?(k.provider==='claude'?.98:k.id.startsWith('claude-opus')?.97:k.provider==='codex'?.86:.90):.95;zeit=k.zeit;}
  return {...k,ausschluss,qualitaet,beobachteteZeit:zeit,beispiele:z.historie?8:0};
 });
 let pool=bewertungen.filter(k=>!k.ausschluss),grund=[];
 if(pool.length&&z.historie){const beste=Math.max(...pool.map(k=>k.qualitaet));pool=pool.filter(k=>k.qualitaet>=beste-.05);grund.push('Vergleichbare Beispielhistorie: Qualität innerhalb einer Toleranz von 0,05.');const schnellste=Math.min(...pool.map(k=>k.beobachteteZeit));pool=pool.filter(k=>k.beobachteteZeit<=schnellste*1.1+2);grund.push('Danach zählt die beobachtete Gesamtzeit im vergleichbaren Beispiel.');}
 else grund.push('Keine Beispielhistorie: unbekannte Qualität bleibt unbekannt; Rückgriff auf ausreichende Eignung.');
 pool.sort((a,b)=>a.grenze-b.grenze||a.id.localeCompare(b.id));
 const gewaehlt=pool[0]||null;
 if(gewaehlt)grund.push('Geeignete, verfügbare Route: '+ANBIETER[gewaehlt.provider]+' / '+gewaehlt.name+'.');
 else grund.push('Kein zulässiger Kandidat. Hermes wartet; es wird kein zusätzlicher API-Zugang gekauft.');
 return {gewaehlt,bewertungen,grund,vereinfacht:true};
}

export function diagnose(z,m) {
 if(['complete','cancelled'].includes(m.state))return 'Aufgabe ist abgeschlossen.';
 if(m.state==='reconcile')return 'Zustellung unklar: Abgleich und Beendigungsbeleg erforderlich.';
 if(m.state==='waiting_for_quota')return 'Kontingentwechsel wartet auf bestätigtes Ende des bisherigen Prozesses.';
 if(m.modus==='implement'&&!m.schreiben)return 'Schreibfreigabe fehlt.';
 if(m.abhaengig.some(id=>z.missionen.find(n=>n.mission_id===id)?.state!=='complete'))return 'Voraussetzung noch nicht abgeschlossen.';
 if(m.modus==='implement'&&z.missionen.some(n=>n!==m&&n.modus==='implement'&&['running','waiting_for_quota','reconcile'].includes(n.state)&&n.arbeitsbaum===m.arbeitsbaum))return 'Ein anderer Auftrag hält die Schreibreservierung für diesen Arbeitsbaum.';
 const aktiv=z.missionen.filter(n=>['running','waiting_for_quota','reconcile'].includes(n.state));
 if(aktiv.length>=3||z.speicher-z.reserve-aktiv.length*z.proAuftrag<z.proAuftrag)return 'Speicherreserve oder Parallelitätsgrenze erreicht.';
 const route=waehleRoute(z,m);
 if(!route.gewaehlt)return 'Kein verfügbares Kontingent für einen zulässigen Kandidaten.';
 if(route.gewaehlt.provider==='antigravity'&&aktiv.some(n=>n.versuche.at(-1)?.provider==='antigravity'))return 'Der einzelne Antigravity-Ausführungsplatz ist belegt.';
 return null;
}

export function naechsterTakt(z) {
 z.takt++;z.zeit++;
 // Laufende Aufträge erst abschließen, danach neue Voraussetzungen bewerten.
 for(const m of z.missionen.filter(m=>m.state==='running')){
  m.takte++;m.updated_at=z.zeit;
  if(m.takte>=2){m.state='complete';m.grund='Simulierter Ergebnisbeleg liegt vor.';m.versuche.at(-1).zustand='complete';m.berichte.push({text:'Beispielergebnis: '+m.titel+'. Prüfung und Ergebnis gehören nur zu dieser Simulation.',zeit:z.zeit});z.nachrichten.unshift({mission:m.mission_id,text:m.titel+': Ergebnis für die Direktion gespeichert.',abgerufen:false});ereignis(z,m.titel+': Ergebnis gespeichert; noch keine Bestätigung aus einer echten ChatGPT-Sitzung.',m.mission_id);}
 }
 for(const m of z.missionen.filter(m=>['queued','blocked'].includes(m.state))){
  const grund=diagnose(z,m);
  if(grund){m.state='blocked';m.grund=grund;continue;}
  const route=waehleRoute(z,m).gewaehlt;
  m.state='running';m.takte=0;m.updated_at=z.zeit;m.grund='Route ausgewählt; Ausführung wird simuliert.';m.versuche.push({...kopie(route),modus:m.modus,schreiben:m.schreiben,nummer:m.versuche.length+1,zustand:'running',simuliert:true});
  ereignis(z,m.titel+': '+ANBIETER[route.provider]+' / '+route.name+' gewählt.',m.mission_id);
 }
 return z;
}

export function kontingentErschoepfen(z,id) {
 const m=z.missionen.find(m=>m.mission_id===id),versuch=m?.versuche.at(-1);
 if(!m||m.state!=='running'||!versuch)return false;
 z.kontingente[versuch.gruppe]=0;m.state='waiting_for_quota';versuch.zustand='quota_wait';m.grund='Kontingent erschöpft. Reservierung bleibt bis zum bestätigten Prozessende bestehen.';
 ereignis(z,m.titel+': Gruppe '+GRUPPEN[versuch.gruppe]+' erschöpft; kein blinder Wechsel.',id);return true;
}

export function bestaetigeEnde(z,id) {
 const m=z.missionen.find(m=>m.mission_id===id);
 if(!m||!['waiting_for_quota','reconcile'].includes(m.state))return false;
 if(m.versuche.length)m.versuche.at(-1).zustand='stopped';
 m.state='queued';m.grund='Beendigung im Beispiel bestätigt. Derselbe Auftrag kann neu bewertet werden.';m.updated_at=++z.zeit;
 ereignis(z,m.titel+': Beendigungsbeleg simuliert; vorhandene Aufgabe und Arbeitsbaum bleiben erhalten.',id);return true;
}

export function stadtZusammenfassung(z,m) {
 const erledigt=m.state==='complete'?1:0;
 return {mission_id:m.mission_id,title:m.titel,project_id:m.project_id,project_label:m.project_id,state:m.state,progress:{done:erledigt,total:1,ratio:erledigt},agents:{working:m.state==='running'?1:0,pending:m.state==='queued'?1:0,total:m.versuche.length,finished:erledigt},workshop_active:m.state==='running',providers:m.versuche.map(v=>v.provider),alerts:[],updated_at:m.updated_at};
}
