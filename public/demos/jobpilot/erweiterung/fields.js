(() => {
  const normalize = value => String(value || '').replace(/([a-z])([A-Z])/g, '$1 $2').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u00df/g, 'ss').toLowerCase().replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim();
  // Saved answers to employer-specific questions. Entries are explicit user input,
  // so they may answer questions the profile rules deliberately never guess.
  const clean = value => normalize(value).replace(/\*/g, ' ').replace(/\((?:optional|pflicht|required)\)/g, ' ').replace(/\b(erforderlich|pflichtfeld|bitte wahlen|please select|required)\b/g, ' ').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const isYes = value => /^(ja|yes|oui|true|1|x)$/.test(normalize(value));
  // The same question is worded differently from portal to portal; these map the
  // common variants onto the canonical saved question.
  const questionAliases = [
    [/kanal.*erfahren|von uns gehort|aufmerksam geworden|how did you (?:hear|find)|hear about us|comment avez vous connu/, 'wie haben sie von uns gehort'],
  ];
  function bankAnswer(bank, label) {
    const text = clean(label); if (!text || !Array.isArray(bank)) return null;
    const entries = bank.filter(entry => entry && typeof entry.question === 'string' && typeof entry.answer === 'string' && entry.question);
    const find = wanted => entries.find(entry => entry.question === wanted) || entries.find(entry => entry.question.length >= 12 && wanted.length >= 12 && (wanted.includes(entry.question) || entry.question.includes(wanted)));
    const alias = questionAliases.find(([re]) => re.test(text));
    const hit = find(text) || (alias && find(alias[1]));
    return hit ? hit.answer : null;
  }
  // Picks the option that answers a saved answer: exact text, then containing text,
  // then the part before a parenthesis, then known synonyms ("Jobbörse" is any job portal).
  // Returns the index, or -1 when nothing or more than one option fits.
  const synonymGroups = [[/^jobborse/, ['stepstone', 'monster', 'sonstiges jobportal', 'jobportal', 'jobborse', 'internetrecherche', 'sonstige', 'sonstiges']]];
  function pickOption(texts, answer) {
    const term = normalize(answer), options = texts.map(normalize), head = term.split('(')[0].trim();
    const unique = test => { const hits = options.map((text, index) => test(text) ? index : -1).filter(index => index >= 0); return hits.length === 1 ? hits[0] : null; };
    for (const test of [text => text === term, text => term && text.includes(term), text => head.length >= 4 && text.split('(')[0].trim() === head]) { const hit = unique(test); if (hit !== null) return hit; }
    const group = synonymGroups.find(([re]) => re.test(term));
    if (group) for (const word of group[1]) { const compact = word.replace(/\s/g, ''), hit = unique(text => text.replace(/\s/g, '').includes(compact)); if (hit !== null) return hit; }
    return -1;
  }
  const rules = [
    ['firstName', /\b(vorname|first name|firstname|given name|prenom|fname)\b/],
    ['lastName', /\b(nachname|familienname|last name|lastname|surname|family name|nom de famille|lname)\b/],
    ['fullName', /\b(vor(?:name)? und nachname|vollstandiger name|full name|fullname|nom complet)\b/],
    ['email', /\b(e mail|email|e mail adresse|email address|courriel)\b/],
    ['phoneCountryCode', /\b(vorwahl|landervorwahl|country calling code|dial code|phone country code|indicatif)\b/],
    ['phone', /\b(telefon|telefonnummer|phone|phone number|mobile number|telephone|mobilnummer)\b/],
    ['postalCode', /\b(plz|postleitzahl|postal code|zip code|postcode|code postal)\b/],
    ['city', /\b(wohnort|stadt|ort|city|ville|location city|locality)\b/],
    ['houseNumber', /\b(hausnummer|house number|street number|numero de rue)\b/],
    ['street', /\b(strasse|street|street address|rue|address line 1|addressline1)\b/],
    ['country', /\b(wohnland|wohnsitzland|country of residence|residence country|pays de residence)\b/],
    ['github', /\b(github|git hub)\b/], ['linkedin', /\b(linkedin|linked in)\b/], ['portfolio', /\b(portfolio|personal website|personliche website)\b/],
    ['university', /\b(hochschule|universitat|university|universite)\b/],
    ['degree', /\b(studiengang|course of study|degree program|fachrichtung)\b/],
    ['availability', /\b(verfugbarkeit|availability)\b/],
    ['startDate', /\b(startdatum|eintrittsdatum|eintrittstermin|verfugbar ab|available from|start date|starting date|earliest start|date de debut|ab wann.{0,120}(?:starten|beginnen|anfangen|eintreten))\b/],
    ['weeklyHours', /\b(wochenstunden|stunden pro woche|hours per week|weekly hours|heures par semaine)\b/],
    ['annualSalary', /\b(jahresgehalt|jahresbrutto|annual salary|annual gross|yearly salary|salaire annuel)\b/],
    ['hourlySalary', /\b(stundenlohn|stundenvergutung|hourly salary|hourly rate|hourly wage|salaire horaire)\b/],
    ['fieldOfInterest', /\b(?:bereich|berufsfeld|fachbereich|unternehmensbereich|abteilung|themen|fachrichtung des praktikums)\b.{0,90}(?:interessier|absolvieren|bewerben|arbeiten|tatig)/],
    ['motivation', /\b(motivationsschreiben|motivation letter|cover letter|anschreiben|lettre de motivation)\b/],
  ];
  const autocomplete = {'given-name':'firstName','family-name':'lastName','name':'fullName','email':'email','tel':'phone','tel-national':'phone','tel-country-code':'phoneCountryCode','address-line1':'street','street-address':'street','address-level2':'city','postal-code':'postalCode','country-name':'country','country':'country','url':'portfolio'};
  // Many portals hide the native <select> and show a styled replacement (Chosen, Select2, nice-select).
  // The select still holds the value, so it counts as visible when its replacement is.
  function shown(element) {
    if (element.getClientRects().length) return true;
    if (element.tagName !== 'SELECT') return false;
    const doc = element.ownerDocument, byId = element.id && doc.getElementById(element.id + '_chosen'), next = element.nextElementSibling;
    const replacement = [byId, next && /chosen|select2|nice-select|ts-wrapper|selectric/.test(next.className || '') ? next : null].find(Boolean);
    return !!replacement && replacement.getClientRects().length > 0;
  }
  function allowed(doc = document) {
    const url = new URL(doc.URL);
    return (url.protocol === 'https:' || ['127.0.0.1', 'localhost'].includes(url.hostname)) && !/(^|\.)(linkedin\.com|indeed\.[a-z.]+)$/.test(url.hostname);
  }
  function elements() {
    const found = [], seen = new Set();
    function visit(root) {
      if (!root || seen.has(root)) return; seen.add(root);
      for (const element of root.querySelectorAll('*')) {
        if (['INPUT','TEXTAREA','SELECT'].includes(element.tagName)) found.push(element);
        if (element.shadowRoot && element.getClientRects().length) visit(element.shadowRoot);
        if (element.tagName === 'IFRAME' && element.getClientRects().length && !element.closest('[hidden],[aria-hidden="true"]')) {
          try { const doc = element.contentDocument; if (doc && (allowed(doc) || /^about:(blank|srcdoc)$/.test(doc.URL))) visit(doc); } catch { /* Other origins require opening the employer form directly. */ }
        }
      }
    }
    visit(document); return found;
  }
  function labelOf(element) {
    const ids = (element.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean), root = element.getRootNode();
    return [...(element.labels || [])].map(l => l.textContent).join(' ') || element.getAttribute('aria-label') || ids.map(id => root.getElementById?.(id)?.textContent || '').join(' ').trim() || element.placeholder || '';
  }
  function keyOf(element, label) {
    const text = normalize(label + ' ' + element.name + ' ' + element.id);
    if (/\b(employer|company|unternehmen|firma|recruiter|citizenship|nationality|nationalite|nationalitat|staatsangehorigkeit|geburtsland|geburtsdatum|birthdate|date of birth|gender|geschlecht|anrede|salutation|country of birth|pays de naissance|arbeitserlaubnis|aufenthaltstitel|visa|visum|work permit|work authorization|right to work|password|kennwort|passwort|highest degree|hochster (?:bildungs)?abschluss|completed degree)\b/.test(text)) return null;
    const token = String(element.autocomplete || '').split(/\s+/).pop(), auto = autocomplete[token];
    const matches = rules.filter(([, re]) => re.test(text)).map(([key]) => key);
    if (matches.includes('fullName')) return 'fullName';
    if (matches.includes('phoneCountryCode')) return 'phoneCountryCode';
    if (matches.includes('houseNumber')) return 'houseNumber';
    if (matches.includes('startDate') && matches.includes('availability')) return 'startDate';
    if (auto && (!matches.length || matches.includes(auto))) return auto;
    if (matches.length === 1) return matches[0];
    // Salary units must be explicit; a bare numeric salary field remains unanswered.
    if (/gehalt|salary|salaire/.test(text) && /pro jahr|per year|p\.\s*a\.|annuel/.test(text)) return 'annualSalary';
    if (/gehalt|salary|salaire/.test(text) && /pro stunde|per hour|horaire/.test(text)) return 'hourlySalary';
    if (/gehaltsvorstellung|gehaltswunsch|salary expectation|desired salary|expected salary|salaire souhaite/.test(text) && !/monat|month|mois|stunde|hour|woche|week/.test(text)) return 'annualSalary';
    return null;
  }
  function writable(element, key, targetValue) {
    if (element.disabled || element.readOnly || !shown(element) || element.closest('[hidden],[aria-hidden="true"],[inert]')) return false;
    if (element.tagName === 'INPUT' && !['text','email','tel','url','date','number'].includes(element.type)) return false;
    if (element.tagName === 'SELECT') { const selected = element.selectedOptions[0]; return !element.multiple && (!element.value.trim() || selected?.disabled); }
    const current = element.value.trim();
    // International phone widgets often initialize an otherwise empty field
    // with the dial code. Complete only that unchanged prefix, never a number.
    const emptyPhonePrefix = key === 'phone' && element.type === 'tel' && /^\+\d{1,3}$/.test(current) && element.defaultValue === element.value && typeof targetValue === 'string' && targetValue.replace(/[\s()-]/g, '').startsWith(current) && targetValue.replace(/[\s()-]/g, '').length > current.length;
    return !current || emptyPhonePrefix;
  }
  function numeric(value) { return /^\d+(?:[.,]\d{1,2})?$/.test(value) ? value.replace(',', '.') : null; }
  function dateValue(value, element, label) {
    let iso;
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) iso = value;
    else { const parts = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value); if (parts) iso = parts[3]+'-'+parts[2]+'-'+parts[1]; }
    if (!iso || !Number.isFinite(Date.parse(iso+'T12:00:00Z')) || new Date(iso+'T12:00:00Z').toISOString().slice(0,10)!==iso) return null;
    if (element.type === 'date') return (!element.min || iso >= element.min) && (!element.max || iso <= element.max) ? iso : null;
    const placeholder = normalize(element.placeholder);
    if (/yyyy.mm.dd|jjjj.mm.tt/.test(placeholder)) return iso;
    const dayFirst = /(?:tt|dd)([./-])mm\1(?:jjjj|yyyy)/.exec(placeholder);
    if (dayFirst || /startdatum|eintrittsdatum|eintrittstermin|verfugbar ab|\bab wann\b/.test(normalize(label))) { const separator = dayFirst?.[1] || '.'; return iso.slice(8,10)+separator+iso.slice(5,7)+separator+iso.slice(0,4); }
    return null;
  }
  function optionValue(element, key, value) {
    let terms = [normalize(value)];
    if (key === 'phoneCountryCode') terms.push(normalize(value.replace(/^\+/, '')));
    if (key === 'country') {
      const countries = [['de','deu','deutschland','germany','allemagne'],['fr','fra','frankreich','france']];
      terms = countries.find(group=>group.includes(terms[0])) || terms;
    }
    const options = [...element.options].filter(option=>!option.disabled && option.value && (terms.includes(normalize(option.value)) || terms.includes(normalize(option.textContent)) || key==='phoneCountryCode' && new RegExp('(?:^|[\\s(])'+value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?:[)\\s]|$)').test(option.textContent)));
    return options.length === 1 ? options[0].value : null;
  }
  function bankedField(element, index, label, answer) {
    if (element.disabled || element.readOnly || !shown(element) || element.closest('[hidden],[aria-hidden="true"],[inert]')) return [];
    const base = {index, key: 'bank', label: label.trim().slice(0, 200) || element.name || 'bank', signature: [element.tagName, element.type || '', element.name, element.id].join(':')};
    if (element.tagName === 'INPUT' && element.type === 'checkbox') return isYes(answer) && !element.checked ? [{...base, kind: 'check', value: 'Ja'}] : [];
    if (element.tagName === 'INPUT' && !['text','email','tel','url','date','number'].includes(element.type)) return [];
    let value = answer.trim();
    if (!value) return [];
    if (element.tagName === 'SELECT') { if (!writable(element, 'bank', value)) return []; const choices = [...element.options].filter(option => !option.disabled && option.value); const index = pickOption(choices.map(option => option.textContent), value); value = index >= 0 ? choices[index].value : null; }
    else if (element.value.trim()) return [];
    else if (element.type === 'date') value = dateValue(value, element, label);
    return value && !(element.maxLength > 0 && value.length > element.maxLength) ? [{...base, value}] : [];
  }
  function inspect(answers, bank = []) {
    if (!allowed()) throw Error('Ouvre le portail employeur pour remplir le formulaire.');
    const all = elements(), identified = all.map(element=>({element,label:labelOf(element)})).map(field=>({...field,key:keyOf(field.element,field.label)}));
    const street = typeof answers.street === 'string' ? answers.street.trim() : '', addressParts = /^(.*\S)\s+(\d+[a-zA-Z]?(?:\s?[-/]\s?\d+[a-zA-Z]?)?)$/.exec(street);
    const separateHouse = identified.some(field=>field.key==='houseNumber' && field.element.getClientRects().length);
    return identified.flatMap(({element, label, key}, index) => {
      const banked = bankAnswer(bank, label);
      if (banked !== null) return bankedField(element, index, label, banked);
      if (!key) return [];
      let value = answers[key];
      if (key==='fullName' && !value && answers.firstName && answers.lastName) value=answers.firstName+' '+answers.lastName;
      if (!writable(element, key, value)) return [];
      if (key==='houseNumber' && !value && addressParts) value=addressParts[2];
      if (key==='street' && separateHouse && addressParts) value=addressParts[1];
      if (key==='phoneCountryCode' && !value) value=String(answers.phone||'').match(/^(\+49|\+33)(?=\s|\d)/)?.[1];
      const dial = identified.find(field => field.key === 'phoneCountryCode' && field.element.ownerDocument === element.ownerDocument && field.element.form === element.form && field.element.getClientRects().length);
      const phonesInForm = identified.filter(field => field.key === 'phone' && field.element.ownerDocument === element.ownerDocument && field.element.form === element.form && field.element.getClientRects().length).length;
      const localPhone = element.autocomplete?.split(/\s+/).pop() === 'tel-national' || /\b(local|national)\b/.test(normalize(element.name + ' ' + element.id)) || phonesInForm === 1;
      if (key==='phone' && typeof value==='string' && dial && localPhone) {
        const code = String(answers.phoneCountryCode || String(answers.phone||'').match(/^(\+49|\+33)(?=\s|\d)/)?.[1] || '');
        const selected = dial.element.tagName==='SELECT' ? dial.element.selectedOptions[0]?.textContent : dial.element.value;
        const expectedCode = code && (String(selected||'').includes(code) || String(dial.element.value).replace(/^\+/, '') === code.replace(/^\+/, '') || writable(dial.element) && (dial.element.tagName!=='SELECT' || optionValue(dial.element,'phoneCountryCode',code)));
        if (expectedCode && value.startsWith(code)) value=value.slice(code.length).replace(/[\s()-]/g,'').replace(/^0+/,'');
      }
      if (typeof value!=='string' || !value.trim() || value.length>30000) return [];
      value=value.trim();
      if (key==='startDate') value=dateValue(value,element,label);
      if (value && element.tagName==='SELECT') value=optionValue(element,key,value);
      if (value && element.type==='number') {
        value=numeric(value);
        if (value!==null && (element.min!=='' && Number(value)<Number(element.min) || element.max!=='' && Number(value)>Number(element.max))) value=null;
      }
      if (!value || element.maxLength>0 && value.length>element.maxLength) return [];
      return [{index,key,label:label.trim().slice(0,200)||element.name||key,value,signature:[element.tagName,element.type||'',element.name,element.id].join(':')}];
    });
  }
  function fill(answers, expected, bank = []) {
    const fields = inspect(answers, bank);
    if (JSON.stringify(fields)!==JSON.stringify(expected)) throw Error('Le formulaire a changé. Analyse-le à nouveau avant de remplir.');
    const all = elements(); let count=0;
    for (const field of fields) count += fillField(all[field.index], field);
    return count;
  }
  function fillField(element, field) {
    if (!element.isConnected) return 0;
    if (field.kind === 'check') { if (!element.checked) { element.click(); return 1; } return 0; }
    if (!writable(element, field.key, field.value)) return 0;
    const view=element.ownerDocument.defaultView, prototype=element.tagName==='TEXTAREA'?view.HTMLTextAreaElement.prototype:element.tagName==='SELECT'?view.HTMLSelectElement.prototype:view.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype,'value').set.call(element,field.value);
    element.dispatchEvent(new view.Event('input',{bubbles:true,composed:true})); element.dispatchEvent(new view.Event('change',{bubbles:true,composed:true}));
    if (element.tagName==='SELECT') for (const type of ['chosen:updated','change.select2']) element.dispatchEvent(new view.Event(type,{bubbles:true}));
    return 1;
  }
  // Same result as fill(), but one field at a time with a pause and a visible scroll, so a person can follow it.
  async function fillPaced(answers, expected, bank, pace) {
    const fields = inspect(answers, bank);
    if (JSON.stringify(fields)!==JSON.stringify(expected)) throw Error('Le formulaire a changé. Analyse-le à nouveau avant de remplir.');
    const all = elements(); let count=0;
    for (const field of fields) {
      const element = all[field.index]; if (!element?.isConnected) continue;
      try { element.scrollIntoView({block:'center', behavior:'smooth'}); } catch { /* not scrollable */ }
      await wait(pace * 0.6 + Math.random() * pace * 0.8);
      count += fillField(element, field);
    }
    return count;
  }
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const placeholderText = /^(bitte wahlen|please select|select|choisir|auswahlen)/;
  function comboLabel(element) {
    const root = element.getRootNode(), ids = (element.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean);
    return element.getAttribute('aria-label') || ids.map(id => root.getElementById?.(id)?.textContent || '').join(' ').trim();
  }
  function press(element) {
    const view = element.ownerDocument.defaultView;
    for (const type of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) element.dispatchEvent(new view.MouseEvent(type, {bubbles: true, cancelable: true, composed: true, view}));
  }
  function visibleCombos() {
    return [...document.querySelectorAll('[role="combobox"]')].filter(element => !['INPUT','SELECT'].includes(element.tagName) && element.getClientRects().length && !element.closest('[hidden],[aria-hidden="true"],[inert]'));
  }
  async function comboOptions(element) {
    if (element.getAttribute('aria-expanded') !== 'true') press(element);
    await wait(250);
    return [...document.querySelectorAll('[role="option"]')].filter(option => option.getClientRects().length && !placeholderText.test(normalize(option.textContent)));
  }
  async function closeCombo(element) {
    element.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
    await wait(150);
    if (element.getAttribute('aria-expanded') === 'true') { document.body.click(); await wait(100); }
  }
  // Custom dropdowns (role=combobox on a div) are opened, then the option whose
  // text equals the saved answer is clicked. Anything ambiguous is left unanswered.
  async function fillCombos(bank) {
    const filled = [], pending = [];
    for (const element of visibleCombos()) {
      const label = comboLabel(element); if (!label) continue;
      const shown = normalize(element.textContent);
      if (shown && !placeholderText.test(shown)) continue;
      const options = await comboOptions(element), answer = bankAnswer(bank, label);
      const index = answer === null ? -1 : pickOption(options.map(option => option.textContent), answer), hit = index >= 0 ? options[index] : null;
      if (hit) { const text = hit.textContent.trim(); press(hit); await wait(200); filled.push({label, value: text}); }
      else { pending.push({label, question: clean(label), kind: 'choice', required: true, options: options.map(option => option.textContent.trim())}); await closeCombo(element); }
    }
    return {filled, pending};
  }
  // Visible, still-empty controls that neither the profile nor a saved answer could fill.
  function scan(bank = []) {
    const seen = new Set(), pending = [];
    for (const element of elements()) {
      if (!shown(element) || element.disabled || element.readOnly || element.closest('[hidden],[aria-hidden="true"],[inert]')) continue;
      const type = element.type, label = labelOf(element).trim();
      if (element.tagName === 'INPUT' && ['hidden','submit','button','reset','password','image'].includes(type)) continue;
      if (!label) continue;
      // A saved "no" for a checkbox is a deliberate empty box. Any other saved answer that did not land is reported.
      if (bankAnswer(bank, label) !== null && type === 'checkbox') continue;
      if (type === 'checkbox' ? element.checked : type !== 'radio' && element.value.trim()) continue;
      if (type === 'radio') { const group = element.name + '|' + (element.form ? 'f' : ''); if (seen.has(group) || [...element.ownerDocument.getElementsByName(element.name)].some(other => other.checked)) continue; seen.add(group); }
      const options = element.tagName === 'SELECT' ? [...element.options].filter(option => option.value && !option.disabled).map(option => option.textContent.trim()) : undefined;
      pending.push({label: label.slice(0, 200), question: clean(label), kind: type === 'checkbox' ? 'checkbox' : type === 'radio' || element.tagName === 'SELECT' ? 'choice' : type === 'file' ? 'file' : 'text', required: element.required || element.getAttribute('aria-required') === 'true' || /\*/.test(label), options});
    }
    return pending;
  }
  async function run(answers, bank = [], options = {}) {
    const fields = inspect(answers, bank), count = options.pace > 0 ? await fillPaced(answers, fields, bank, options.pace) : fill(answers, fields, bank);
    const combos = await fillCombos(bank), filled = [...fields.map(field => ({label: field.label, value: field.value})), ...combos.filled];
    // Documents are attached last so that "still to do" below reflects the files as well.
    const documents = Array.isArray(options.files) && options.files.length ? await attachFiles(options.files) : {attached: [], missing: []};
    const pending = [...scan(bank), ...combos.pending];
    return {count: count + combos.filled.length, filled, pending, attached: documents.attached, missingFiles: documents.missing};
  }
  // Documents. The company's own CV and letter go into the file field that asks for them, never into a
  // photo or certificate field; a lone file field is used for the CV only when it is not such a field.
  const documentRules = {
    cv: {wants: /lebenslauf|curriculum|\bcv\b|resume|bewerbungsunterlagen|vollstandige unterlagen|unterlagen/, not: /foto|photo|bild|zeugnis|zertifikat|nachweis|anschreiben|motivation|mappe/},
    letter: {wants: /anschreiben|motivationsschreiben|motivation|cover letter|bewerbungsmappe|mappe/, not: /foto|photo|bild|lebenslauf|\bcv\b/},
  };
  function fileDescription(element) {
    const own = labelOf(element).trim();
    return normalize(own || (element.closest('li,tr,fieldset,.form-group,div')?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160));
  }
  // files: [{kind: 'cv'|'letter', name, type, base64}]. Returns what was attached and what found no field.
  async function attachFiles(files) {
    const inputs = elements().filter(element => element.tagName === 'INPUT' && element.type === 'file' && !element.disabled && !element.closest('[inert]'));
    const used = new Set(), attached = [], missing = [];
    for (const file of Array.isArray(files) ? files : []) {
      const rule = documentRules[file.kind]; if (!rule || typeof file.base64 !== 'string') continue;
      let index = inputs.findIndex((element, position) => !used.has(position) && !element.files?.length && rule.wants.test(fileDescription(element)) && !rule.not.test(fileDescription(element)));
      if (index < 0 && file.kind === 'cv' && inputs.length === 1 && !inputs[0].files?.length && !documentRules.cv.not.test(fileDescription(inputs[0]))) index = 0;
      if (index < 0) { missing.push(file.kind); continue; }
      const element = inputs[index], view = element.ownerDocument.defaultView;
      const bytes = Uint8Array.from(atob(file.base64), character => character.charCodeAt(0));
      const transfer = new view.DataTransfer();
      transfer.items.add(new view.File([bytes], String(file.name || file.kind + '.pdf'), {type: file.type || 'application/pdf'}));
      element.files = transfer.files;
      element.dispatchEvent(new view.Event('input', {bubbles: true, composed: true})); element.dispatchEvent(new view.Event('change', {bubbles: true, composed: true}));
      used.add(index); attached.push({kind: file.kind, field: labelOf(element).trim().slice(0, 90) || file.kind, name: file.name});
      await wait(300);
    }
    return {attached, missing};
  }
  globalThis.jobAssistantFields={inspect,fill,run,scan,clean,attachFiles};
})();
