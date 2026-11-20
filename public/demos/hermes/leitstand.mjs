import {ANBIETER,GRUPPEN,MODELLE,ZUSTAENDE,erzeugeZustand,waehleRoute,naechsterTakt,kontingentErschoepfen,bestaetigeEnde,stadtZusammenfassung} from './simulation.mjs';

const $=id=>document.getElementById(id);
const knoten=(tag,text,klasse)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=String(text);if(klasse)n.className=klasse;return n;};
let zustand=erzeugeZustand(),uhr=null,ansicht='2d';
const ausgewaehlt=()=>zustand.missionen.find(m=>m.mission_id===zustand.auswahl)||zustand.missionen[0];
const zeit=ts=>new Intl.DateTimeFormat('de-DE',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Europe/Berlin'}).format(new Date(ts*1000));
function status(m){return knoten('span',ZUSTAENDE[m.state]||m.state,'status '+({running:'running',complete:'done',blocked:'waiting',waiting_for_quota:'waiting',reconcile:'error'}[m.state]||'waiting'));}
function waehlen(id){zustand.auswahl=id;zeichnen();}

function missionenZeichnen(){
 const body=$('mission-rows');body.replaceChildren();
 for(const m of zustand.missionen){const tr=knoten('tr');if(m.mission_id===zustand.auswahl)tr.className='gewaehlt';
  const titel=knoten('td'),wahl=knoten('button',m.titel);wahl.type='button';wahl.onclick=()=>waehlen(m.mission_id);titel.append(wahl,knoten('small',m.project_id+' · '+(m.abhaengig.length?'nach '+m.abhaengig.join(', '):'unabhängig')));
  const versuch=m.versuche.at(-1),route=knoten('td',versuch?ANBIETER[versuch.provider]:'Noch nicht zugewiesen');if(versuch)route.append(knoten('small',versuch.name));
  const stand=knoten('td');stand.append(status(m));stand.append(knoten('small',m.grund));tr.append(titel,route,stand,knoten('td',m.modus==='plan'?'Planen':'Implementieren'));body.append(tr);
 }
 const raster=$('agents');raster.replaceChildren();
 for(const [id,name] of Object.entries(ANBIETER)){
  const auftraege=zustand.missionen.filter(m=>m.versuche.at(-1)?.provider===id),aktiv=auftraege.filter(m=>m.state==='running').length;
  const karte=knoten('article',undefined,'agent');karte.append(knoten('strong',name),knoten('p',id==='antigravity'?'Gemini Flash / Argon, Claude-Familien und GPT-OSS':'Eigenständige native Anbindung','muted'));
  karte.append(knoten('p',aktiv?aktiv+' Auftrag in Arbeit':'Bereit für einen passenden Auftrag',aktiv?'aktiv':''));
  const kontingente=id==='antigravity'?['gemini','argon','third_party']:[id];
  for(const gruppe of kontingente){karte.append(knoten('p',GRUPPEN[gruppe]+': '+zustand.kontingente[gruppe]+' % (simuliert)'));const balken=knoten('div',undefined,'mini-kontingent'),fuellung=knoten('span');fuellung.style.width=zustand.kontingente[gruppe]+'%';balken.append(fuellung);karte.append(balken);}
  raster.append(karte);
 }
}

function auswahlZeichnen(){
 const m=ausgewaehlt(),route=waehleRoute(zustand,m),versuch=m.versuche.at(-1);
 const schreibgeschuetzt=['running','waiting_for_quota','reconcile','complete','cancelled'].includes(m.state);
 for(const id of ['modus','schwierigkeit','anbieter','modell'])$(id).disabled=schreibgeschuetzt;
 $('ausgewaehlte-mission').textContent=m.titel;$('modus').value=m.modus;$('schreiben').checked=m.schreiben;$('schreiben').disabled=m.modus==='plan'||schreibgeschuetzt;
 $('schwierigkeit').value=m.schwierigkeit;$('schwierigkeit-wert').textContent=m.schwierigkeit+' / 5';$('anbieter').value=m.vorliebe;$('historie').checked=zustand.historie;
 const modelle=$('modell');modelle.replaceChildren(new Option('Automatisch auswählen','auto'));for(const k of MODELLE.filter(k=>m.vorliebe==='auto'||k.provider===m.vorliebe))modelle.add(new Option(k.name,k.id));modelle.value=m.modell;
 $('route-name').textContent=route.gewaehlt?'Nächste zulässige Auswahl: '+route.gewaehlt.name:'Keine zulässige Route';
 $('route-kurz').textContent=versuch?'Zugewiesen: '+ANBIETER[versuch.provider]+' / '+versuch.name:route.gewaehlt?'Auswahlvorschlag: '+route.gewaehlt.name:'Aktuell keine zulässige Route';
 $('route-gruende').replaceChildren(...route.grund.map(g=>knoten('li',g)));
 $('blocker').textContent=m.state==='running'?'Aktiver Auftrag: '+versuch.name+'. Neue Einstellungen gelten erst für einen späteren Versuch.':m.grund;
 $('kandidaten-titel').textContent=route.bewertungen.length+' Kandidaten und ihre Ausschlüsse';
 $('kandidaten').replaceChildren(...route.bewertungen.map(k=>{const n=knoten('div',undefined,'kandidat'+(k.ausschluss?' ausgeschlossen':''));n.append(knoten('strong',k.name),knoten('p',k.ausschluss||('Kontingent: '+GRUPPEN[k.gruppe]+' · anfängliche Eignung bis '+k.grenze+'/5')),knoten('p',k.qualitaet===null?'Qualität unbekannt · keine Zeitbeobachtung':Math.round(k.qualitaet*100)+' % angenommene Beispielergebnisse · '+k.beobachteteZeit+' s · '+k.beispiele+' erfundene Beobachtungen'));return n;}));
 const versuchsstand={running:'In Arbeit',complete:'Abgeschlossen',sending:'Versand unklar',quota_wait:'Kontingentpause',stopped:'Beendet'};
 const nachweis=$('modellnachweis');nachweis.replaceChildren();for(const [titel,text] of [['Angefordert',m.modell==='auto'?'Automatische Auswahl':m.modell],['Im letzten Versuch ausgewählt',versuch?.name||'Noch keine Auswahl'],['Tatsächlich ausgeführt','Kein echtes Modell: ausschließlich Simulation'],['Auftragsbeleg',versuch?'Versuch '+versuch.nummer+' · '+versuchsstand[versuch.zustand]+' · derselbe Arbeitsbaum':'Noch kein Versuch']])nachweis.append(knoten('dt',titel),knoten('dd',text));
 $('kontingent-leer').disabled=m.state!=='running';$('prozess-ende').disabled=!['waiting_for_quota','reconcile'].includes(m.state);
 $('ram-aendern').textContent=zustand.speicher===8?'RAM-Reserve zeigen (8 auf 4 GiB)':'Beispielspeicher auf 8 GiB zurücksetzen';
}

function postZeichnen(){
 const box=$('postfach');box.replaceChildren();
 if(!zustand.nachrichten.length)box.append(knoten('p','Noch kein Ergebnis gespeichert. Den Ablauf starten oder einen Takt weiterschalten.','muted'));
 for(const n of zustand.nachrichten){const artikel=knoten('article',undefined,'nachricht'),text=knoten('div');text.append(knoten('p',n.text),knoten('small',n.abgerufen?'Abruf durch die Direktion im Beispiel bestätigt.':'Gespeichert im Beispielpostfach; nicht automatisch in einer echten ChatGPT-Sitzung angekommen.'));artikel.append(text);if(!n.abgerufen){const b=knoten('button','Abruf simulieren','ghost');b.onclick=()=>{n.abgerufen=true;zeichnen();};artikel.append(b);}box.append(artikel);}
 $('ereignisse').replaceChildren(...zustand.ereignisse.map(e=>{const li=knoten('li');li.append(knoten('time',zeit(e.zeit)),document.createTextNode(e.text));return li;}));
}

let aufnahme=0;
const bildtexte=['Aufträge vorbereitet','Zwei Aufträge in Arbeit','Ergebnisse und Architekturprüfung','Ergebnisse für die Direktion bündeln','Beispiellauf abgeschlossen'];
function stadtZeichnen(){
 if(ansicht!=='3d')return;
 $('stadt-bild').src='bilder/stadt-'+aufnahme+'.png';
 $('stadt-bildtext').textContent=bildtexte[aufnahme]+': statische Originalaufnahme mit erfundenen Daten. Kein Abbild des aktuellen Simulationszustands; der Produktmotor bleibt privat.';
 $('stadt-missionsliste').replaceChildren(...zustand.missionen.map(m=>{const b=knoten('button',m.titel+' · '+ZUSTAENDE[m.state],'ghost');b.setAttribute('aria-pressed',String(m.mission_id===zustand.auswahl));b.onclick=()=>waehlen(m.mission_id);return b;}));
}

function zeichnen(){
 $('kpi-aktiv').textContent=zustand.missionen.filter(m=>m.state==='running').length;$('kpi-fertig').textContent=zustand.missionen.filter(m=>m.state==='complete').length+' / '+zustand.missionen.length;$('kpi-post').textContent=zustand.nachrichten.filter(n=>!n.abgerufen).length;$('speicher-stand').textContent=zustand.speicher+' GiB Beispielspeicher · '+zustand.reserve+' GiB Reserve';
 missionenZeichnen();auswahlZeichnen();postZeichnen();stadtZeichnen();
}
function anhalten(){clearInterval(uhr);uhr=null;$('abspielen').textContent='Ablauf abspielen';}
function neu(){anhalten();zustand=erzeugeZustand($('szenario').value);zeichnen();}
function wechseln(neu){ansicht=neu;$('klassisch').hidden=neu!=='2d';$('stadtansicht').hidden=neu!=='3d';$('ansicht-2d').setAttribute('aria-pressed',String(neu==='2d'));$('ansicht-3d').setAttribute('aria-pressed',String(neu==='3d'));zeichnen();}
$('ansicht-2d').onclick=()=>wechseln('2d');$('ansicht-3d').onclick=()=>wechseln('3d');$('stadt-zentrieren').onclick=()=>{aufnahme=(aufnahme+1)%bildtexte.length;stadtZeichnen();};
$('takt').onclick=()=>{naechsterTakt(zustand);zeichnen();};$('szenario').onchange=neu;$('zuruecksetzen').onclick=neu;
$('abspielen').onclick=()=>{if(uhr)return anhalten();$('abspielen').textContent='Ablauf anhalten';uhr=setInterval(()=>{naechsterTakt(zustand);zeichnen();if(zustand.missionen.every(m=>m.state==='complete'))anhalten();},1800);};
$('modus').onchange=e=>{const m=ausgewaehlt();m.modus=e.target.value;if(m.modus==='plan')m.schreiben=false;zeichnen();};
$('schreiben').onchange=e=>{ausgewaehlt().schreiben=e.target.checked;zeichnen();};$('schwierigkeit').oninput=e=>{ausgewaehlt().schwierigkeit=Number(e.target.value);zeichnen();};
$('anbieter').onchange=e=>{ausgewaehlt().vorliebe=e.target.value;ausgewaehlt().modell='auto';zeichnen();};$('modell').onchange=e=>{ausgewaehlt().modell=e.target.value;zeichnen();};$('historie').onchange=e=>{zustand.historie=e.target.checked;zeichnen();};
$('kontingent-leer').onclick=()=>{kontingentErschoepfen(zustand,ausgewaehlt().mission_id);zeichnen();};$('prozess-ende').onclick=()=>{bestaetigeEnde(zustand,ausgewaehlt().mission_id);zeichnen();};$('ram-aendern').onclick=()=>{zustand.speicher=zustand.speicher===8?4:8;zeichnen();};
document.addEventListener('visibilitychange',()=>{if(document.hidden)anhalten();});
// Ein lesender Prüfzugang für automatisierte Tests der synthetischen Oberfläche.
window.HermesDemo={zustand:()=>structuredClone(zustand),stadt:()=>null};
zeichnen();
