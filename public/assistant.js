/* End of Life Atlas: "Ask" assistant.
   Answers questions using ONLY this site's own pages (search-index.json,
   built at deploy time). Runs entirely in the browser: questions are not
   stored or sent anywhere.

   Later, an AI chatbot can be added: if window.ATLAS_AI_ENDPOINT is set,
   the top passages found here can be sent to it as the only context, so it
   still answers from the site alone. Not enabled. */
(function () {
  'use strict';
  var base = document.documentElement.getAttribute('data-base') || '';
  var ES = document.documentElement.lang === 'es';
  var T = ES ? {
    you: 'Usted preguntó', atlas: 'Del Atlas', here: 'Esto dice el sitio:',
    none: 'No encontré eso en las páginas en español. Pruebe otras palabras, vea <a href="' + base + '/es/">las guías en español</a> o <a href="' + base + '/ask/" hreflang="en">pregunte en inglés</a>.',
    support: 'También puede leer sobre <a href="' + base + '/es/duelo/#mas-ayuda">cuándo pedir más ayuda</a>.',
    crisis: '<p><strong>Si está pensando en quitarse la vida, merece apoyo ahora mismo.</strong> En EE. UU., llame o envíe un mensaje de texto al <strong>988</strong> (hay atención en español). En otros países, <a href="https://befrienders.org/find-support-now/">busque una línea de ayuda</a>. Si tiene una enfermedad terminal y quiere entender sus opciones legales, la información de abajo puede ayudar, y hablarlo antes con alguien nunca está de más.</p>',
    failed: 'Lo siento, el asistente no pudo cargarse. Puede ver las guías.'
  } : {
    you: 'You asked', atlas: 'From the Atlas', here: 'Here is what this site says:',
    none: 'I couldn’t find that on this site. Try different words, browse <a href="' + base + '/#where">where to start</a>, or see <a href="' + base + '/finding-help/">finding help near you</a>.',
    support: 'You can also read about <a href="' + base + '/grief/#more-help">when to get more help</a>, or find <a href="' + base + '/finding-help/">support near you</a>.',
    crisis: '<p><strong>If you are thinking about ending your life, you deserve support right now.</strong> In the US, call or text <strong>988</strong>. Elsewhere, <a href="https://befrienders.org/find-support-now/">find a helpline in your country</a>. If you are facing a terminal illness and want to understand your legal options, the information below may help, and talking it through with someone first is never a bad step.</p>',
    failed: 'Sorry, the assistant could not load. Please browse the guides instead.'
  };
  var form = document.getElementById('ask-form');
  var input = document.getElementById('ask-input');
  var log = document.getElementById('ask-log');
  if (!form || !input || !log) return;

  var STOP = ('a an the and or but if of to in on at by for with from as is are was were be been being it its this that these those ' +
    'i me my we our you your he she they them their what which who whom how when where why do does did can could should would ' +
    'will shall may might must have has had not no so than too very just about into over after before there here any all some ' +
    'get got tell know want need please much many more most').split(' ');
  if (ES) STOP = ('el la los las un una unos unas y o pero si de del al a en por para con sin sobre como que cual cuales quien quienes ' +
    'cuando donde porque es son era ser estar esta este esto estos estas eso esa ese lo le les se me mi mis mio nos nuestro su sus tu ' +
    'yo usted ustedes hay ha he han hace hacer hago puedo puede pueden debo debe tengo tiene tienen mas muy ya no ni tambien que como ' +
    'quiero necesito saber').split(' ');
  var STOPSET = {};
  STOP.forEach(function (w) { STOPSET[w] = 1; });

  // Everyday words mapped to the terms the site uses.
  var SYNONYMS = {
    euthanasia: 'medical aid dying', 'assisted suicide': 'medical aid dying', 'assisted dying': 'medical aid dying',
    maid: 'medical aid dying', 'death with dignity': 'medical aid dying', 'right to die': 'medical aid dying',
    poa: 'power attorney', lpa: 'lasting power attorney', 'living will': 'advance directive form state', 'health care proxy': 'advance directive proxy form', 'advance directive': 'advance directive form state', 'medical power of attorney': 'advance directive power attorney health care',
    dnr: 'polst cpr', 'do not resuscitate': 'polst cpr', molst: 'polst',
    cost: 'cost price pay', price: 'cost price', expensive: 'cost price', afford: 'cost pay',
    obituary: 'obituary life story', eulogy: 'eulogy', urn: 'cremation ashes', ashes: 'cremation ashes',
    aquamation: 'water cremation alkaline hydrolysis', resomation: 'water cremation alkaline hydrolysis', terramation: 'human composting', compost: 'composting', 'sea burial': 'burial sea', tree: 'tree woodland', mausoleum: 'mausoleum entombment', buried: 'burial', bury: 'burial', scatter: 'scatter ashes', donate: 'donation',
    passed: 'death died', 'signs of death': 'signs death near', 'death is near': 'signs death near', dying: 'dying death signs', 'palliative': 'palliative hospice', 'death certificate': 'death certificates', 'death certificates': 'death certificates', 'passed away': 'death died', died: 'death died', dies: 'death died',
    kids: 'children', child: 'children', grandma: 'grandparent', grandpa: 'grandparent', dog: 'pet', cat: 'pet',
    mom: 'parent', mum: 'parent', dad: 'parent', mother: 'parent', father: 'parent',
    inheritance: 'inheritance estate will', estate: 'estate will probate', executor: 'executor will',
    trust: 'trust trusts', switzerland: 'switzerland dignitas pegasos', abroad: 'abroad country far away distance',
    'live abroad': 'far away distance', 'far away': 'far away distance', expat: 'far away distance abroad',
    'dies at home': 'first hours hospice call', 'died at home': 'first hours hospice call', 'just died': 'first hours call',
    mexico: 'mexico fideicomiso', uk: 'uk england wales scotland', britain: 'uk england', canada: 'canada', australia: 'australia', aussie: 'australia', super: 'superannuation super', superannuation: 'superannuation super',
    facebook: 'facebook memorialize online accounts', instagram: 'instagram memorialize online accounts', gmail: 'google email online accounts', email: 'email online accounts', icloud: 'apple icloud online accounts', 'social media': 'social media online accounts close memorialize', passwords: 'password online accounts', password: 'password online accounts', linkedin: 'linkedin online accounts', twitter: 'x twitter online accounts', paypal: 'paypal online accounts',
    nursing: 'nursing home care', 'care home': 'nursing home care', hospice: 'hospice palliative',
    backyard: 'backyard burial own land', 'own land': 'backyard burial own land', 'home burial': 'backyard burial own land', garden: 'backyard burial own land',
    movie: 'movies pill how long medical aid dying', movies: 'movies pill how long medical aid dying', pill: 'pill movies medical aid dying', 'how long': 'how long minutes hours',
    'pet trust': 'pets pet trust caregiver will', 'my dog': 'pets pet trust caregiver will', 'my cat': 'pets pet trust caregiver will', 'pets after': 'pets pet trust caregiver will',
    pain: 'pain comfort suffering', grief: 'grief grieving', grieving: 'grief grieving', funeral: 'funeral burial cremation'
  };

  var SYNONYMS_ES = {
    'testamento vital': 'directiva anticipada testamento vital', 'voluntades anticipadas': 'directiva anticipada', 'instrucciones previas': 'directiva anticipada',
    poder: 'poder representante', representante: 'representante poder', apoderado: 'representante poder',
    hospicio: 'hospicio paliativos', paliativos: 'paliativos hospicio', murio: 'muerte murio', fallecio: 'muerte murio', muerto: 'muerte',
    funeraria: 'funeraria funeral', velorio: 'funeral', entierro: 'entierro funeral', cremacion: 'cremacion funeral', certificado: 'certificados defuncion',
    nino: 'ninos', hijo: 'ninos', hija: 'ninos', perro: 'mascota', gato: 'mascota', mama: 'padre', papa: 'padre', madre: 'padre',
    facebook: 'facebook cuentas linea', instagram: 'instagram cuentas linea', gmail: 'google correo cuentas linea', correo: 'correo cuentas linea', redes: 'redes sociales cuentas linea', 'redes sociales': 'redes sociales cuentas linea', icloud: 'apple icloud cuentas', contrasena: 'contrasena cuentas linea', contrasenas: 'contrasena cuentas linea',
    testamento: 'testamento testamentos albacea', herencia: 'herencia sucesion testamento', mexico: 'mexico fideicomiso notario', fideicomiso: 'fideicomiso', costo: 'cuesta costos precio', precio: 'cuesta costos precio', cuesta: 'cuesta costos', funeral: 'funeral funeraria entierro cremacion', imprimir: 'imprimir lista hoja', hoja: 'hoja imprimir',
    patio: 'patio enterrar terreno', jardin: 'patio enterrar terreno', terreno: 'patio enterrar terreno', finca: 'patio enterrar terreno',
    pelicula: 'peliculas pastilla cuanto tarda muerte asistida', peliculas: 'peliculas pastilla cuanto tarda muerte asistida', pastilla: 'pastilla peliculas muerte asistida', tarda: 'cuanto tarda minutos horas',
    'fideicomiso para mascotas': 'mascotas fideicomiso cuidar testamento', 'mis mascotas': 'mascotas fideicomiso cuidar testamento', 'mi perro': 'mascotas cuidar testamento', 'mi gato': 'mascotas cuidar testamento',
    duelo: 'duelo', luto: 'duelo', eutanasia: 'eutanasia muerte asistida', 'suicidio asistido': 'suicidio asistido muerte', suiza: 'suiza dignitas pegasos', 'muerte digna': 'muerte digna asistida', dolor: 'dolor alivio'
  };
  if (ES) SYNONYMS = SYNONYMS_ES;
  var CRISIS_ES = /\b(matarme|suicidarme|quitarme la vida|quiero morir(me)?|no quiero vivir|hacerme da(n|ñ)o|suicid(io|a))\b/i;
  var CRISIS = /\b(kill(ing)? myself|end(ing)? (it all|my life)|take my (own )?life|want(ed)? to die|wish i (was|were) dead|don'?t want to (live|be here)|hurt(ing)? myself|self[- ]?harm|(?<!assisted )suicid(e|al))\b/i;

  function fold(t) { return t.toLowerCase().normalize ? t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : t.toLowerCase(); }
  function stem(w) {
    if (ES) {
      if (w.length > 5 && /ces$/.test(w)) return w.slice(0, -3) + 'z';
      if (w.length > 4 && /es$/.test(w) && !/[aeiou]es$/.test(w)) return w.slice(0, -2);
      if (w.length > 3 && /s$/.test(w)) return w.slice(0, -1);
      return w;
    }
    if (w.length > 5 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 5 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 4 && /ed$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function tokens(text) {
    return (fold(text).match(/[a-z0-9£$]+/g) || []).filter(function (w) { return !STOPSET[w] && w.length > 1; }).map(stem);
  }
  function expand(q) {
    var lower = ' ' + fold(q).replace(/[¿?¡!.,]/g, ' ') + ' ';
    var extra = [];
    Object.keys(SYNONYMS).forEach(function (k) { if (lower.indexOf(' ' + k + ' ') !== -1 || lower.indexOf(' ' + k + '?') !== -1) extra.push(SYNONYMS[k]); });
    return tokens(q + ' ' + extra.join(' '));
  }

  var docs = null, df = {}, titleDf = {}, avgLen = 0;
  var ready = fetch(base + (ES ? '/search-index-es.json' : '/search-index.json')).then(function (r) { return r.json(); }).then(function (data) {
    docs = data.map(function (d) {
      var body = tokens(d.x), head = tokens(d.h), title = tokens(d.t), tf = {};
      body.forEach(function (w) { tf[w] = (tf[w] || 0) + 1; });
      head.forEach(function (w) { tf[w] = (tf[w] || 0) + 2; });
      title.forEach(function (w) { tf[w] = (tf[w] || 0) + 3; });
      title.filter(function (w, i) { return title.indexOf(w) === i; }).forEach(function (w) { titleDf[w] = (titleDf[w] || 0) + 1; });
      Object.keys(tf).forEach(function (w) { df[w] = (df[w] || 0) + 1; });
      return { d: d, tf: tf, title: title, len: body.length + head.length + title.length };
    });
    avgLen = docs.reduce(function (s, x) { return s + x.len; }, 0) / docs.length;
  });

  function search(q) {
    var terms = expand(q);
    var uniq = terms.filter(function (w, i) { return terms.indexOf(w) === i; });
    var N = docs.length;
    var scored = docs.map(function (doc) {
      var s = 0, hits = 0, boost = 1;
      uniq.forEach(function (w) {
        var f = doc.tf[w];
        if (!f) return;
        hits++;
        var idf = Math.log(1 + (N - df[w] + 0.5) / (df[w] + 0.5));
        s += idf * (f * 2.2) / (f + 1.2 * (0.6 + 0.4 * Math.sqrt(doc.len / avgLen)));
        // A specific place or topic named in a page title (e.g. "Canada") is a strong signal.
        if (titleDf[w] && titleDf[w] <= 3 && doc.title.indexOf(w) !== -1) boost *= 2.5;
      });
      // State form pages only rank high when the question names the state.
      if (doc.d.s && boost === 1) s *= 0.2;
      return { doc: doc, score: s * boost * (1 + hits / Math.max(uniq.length, 1)) };
    }).filter(function (r) { return r.score > 0; });
    scored.sort(function (a, b) { return b.score - a.score; });
    var seen = {}, out = [];
    for (var i = 0; i < scored.length && out.length < 3; i++) {
      var key = scored[i].doc.d.u.split('#')[0] + scored[i].doc.d.h;
      if (!seen[key]) { seen[key] = 1; out.push(scored[i]); }
    }
    return { results: out, terms: uniq };
  }

  function excerpt(text, terms) {
    var sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    var ranked = sentences.map(function (s, i) {
      var t = tokens(s), score = 0;
      terms.forEach(function (w) { if (t.indexOf(w) !== -1) score++; });
      return { s: s.trim(), i: i, score: score };
    });
    var best = ranked.slice().sort(function (a, b) { return b.score - a.score || a.i - b.i; }).slice(0, 3);
    best.sort(function (a, b) { return a.i - b.i; });
    var out = best.map(function (b) { return b.s; }).join(' ');
    return out.length > 420 ? out.slice(0, 417).replace(/\s\S*$/, '') + '…' : out;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function addMessage(who, nodes) {
    var li = el('li', 'msg msg-' + who);
    var label = el('p', 'msg-who', who === 'you' ? T.you : T.atlas);
    li.appendChild(label);
    nodes.forEach(function (n) { li.appendChild(n); });
    log.appendChild(li);
    li.scrollIntoView({ block: 'nearest' });
    return li;
  }

  function answer(q) {
    addMessage('you', [el('p', 'msg-text', q)]);
    var nodes = [];
    if (CRISIS.test(q) || (ES && CRISIS_ES.test(fold(q)) && !/suicidio asistido/.test(fold(q)))) {
      var c = el('div', 'msg-crisis');
      c.innerHTML = T.crisis;
      nodes.push(c);
    }
    var found = search(q);
    if (!found.results.length && nodes.length) {
      var support = el('p', 'msg-text');
      support.innerHTML = T.support;
      nodes.push(support);
    } else if (!found.results.length) {
      var none = el('p', 'msg-text');
      none.innerHTML = T.none;
      nodes.push(none);
    } else {
      nodes.push(el('p', 'msg-text', T.here));
      var list = el('ol', 'msg-results');
      found.results.forEach(function (r) {
        var d = r.doc.d;
        var item = el('li');
        var h = el('p', 'res-title');
        var a = el('a', null, d.h === 'Overview' ? d.t : d.h + ' — ' + d.t);
        a.href = base + d.u;
        h.appendChild(a);
        item.appendChild(h);
        item.appendChild(el('p', 'res-text', excerpt(d.x, found.terms)));
        list.appendChild(item);
      });
      nodes.push(list);
    }
    addMessage('atlas', nodes);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    input.value = '';
    ready.then(function () { answer(q); }).catch(function () {
      addMessage('atlas', [el('p', 'msg-text', T.failed)]);
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-ask]'), function (b) {
    b.addEventListener('click', function () {
      input.value = b.getAttribute('data-ask');
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true }));
      input.focus();
    });
  });

  // Searches from the site-wide search box arrive as /ask/?q=...
  var fromUrl = '';
  try { fromUrl = (new URLSearchParams(window.location.search).get('q') || '').trim(); } catch (e) {}
  if (fromUrl) {
    ready.then(function () { answer(fromUrl); }).catch(function () {});
    var top = document.getElementById('site-search-q');
    if (top) top.value = fromUrl;
  }

  var clear = document.getElementById('ask-clear');
  if (clear) clear.addEventListener('click', function () { log.innerHTML = ''; input.focus(); });
})();
