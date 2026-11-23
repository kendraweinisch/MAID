// Spanish pages (/es/). Translations of the core English guides, kept to the
// same facts and sources. Pending review by a native speaker: flagged on
// every page. When an English page changes, update its Spanish pair (see
// ES_PAIRS in layout.mjs).
import { readFileSync } from 'node:fs';
import { esc, fmtDateEs, site, sourcesNoteEs } from './layout.mjs';
import { icons } from './icons.mjs';
import { linkCards, cardifyLists } from './ui.mjs';
import { journeyPage } from './journeys.mjs';
import { estado } from './es-names.mjs';

const ad = JSON.parse(readFileSync(new URL('./data/advance-directives.json', import.meta.url), 'utf8'));

export const EN = ' <span class="muted small">(en inglés)</span>';
export const enLink = (href, text) => `<a href="${href}" hreflang="en">${text}</a>${EN}`;

const META = JSON.parse(readFileSync(new URL('./data/printables-meta.json', import.meta.url), 'utf8'));

// Download panel for a Spanish printable: a picture of the page and buttons.
export function dlPanelEs(slug) {
  const m = META[slug];
  if (!m) return `<p class="no-print"><button class="btn" type="button" onclick="window.print()">Imprimir esta página</button></p>`;
  return `<div class="dl-panel no-print">
<img src="/thumbs/${slug}.png" alt="" width="367" height="475">
<div>
<p class="tag">Para imprimir · Gratis</p>
<p class="dl-meta">${m.pages} ${m.pages === 1 ? 'página' : 'páginas'} · PDF de ${m.kb} KB · Sin registrarse</p>
<div class="actions"><a class="btn" href="/printables/${slug}.pdf" download>Descargar PDF</a><button class="btn btn-quiet" type="button" onclick="window.print()">Imprimir esta página</button></div>
<p class="small muted" style="margin:12px 0 0">Téngala a mano, por ejemplo en la puerta del refrigerador o con sus papeles importantes.</p>
</div>
</div>`;
}

export const reviewNote = `<p class="small muted es-note">Traducción pendiente de revisión por un hablante nativo. ¿Ve un error? <a href="/es/sugerencias/">Díganos</a>.</p>`;


// The same section design as the English guides: an icon per section, key
// facts as a line of text, and "at a glance" figures. Every fact below is
// stated in that section's own text.
const ES_ICONS = {
  '/es/planificar/': { directiva: 'doc', representante: 'people', persona: 'key', conversacion: 'talk', papeles: 'check', despues: 'tree', revisar: 'calendar' },
  '/es/cuidados-paliativos-y-hospicio/': { comparacion: 'scale', cuando: 'clock', polst: 'doc' },
  '/es/senales-de-que-la-muerte-esta-cerca/': { semanas: 'calendar', dias: 'clock', horas: 'lastweeks', ayuda: 'hand' },
  '/es/despues-de-una-muerte/': { 'primeras-horas': 'phone', certificados: 'doc', funeral: 'burial', derechos: 'shield', 'primer-mes': 'calendar', sucesion: 'wills' },
  '/es/cuentas-en-linea/': { antes: 'shield', encontrar: 'check', conmemorar: 'loved', redes: 'people', correo: 'key', pagos: 'costs', suyas: 'plan' },
  '/es/duelo/': { normal: 'grief', antes: 'clock', 'muerte-dificil': 'hand', ninos: 'child', mascota: 'paw', apoyo: 'people', 'mas-ayuda': 'help' },
};
const ES_FACTS = {
  '/es/planificar/': {
    directiva: ['Dos partes: sus deseos y quién decide', 'Normalmente gratis', 'A menudo sin abogado'],
    revisar: ['Tras un diagnóstico, un divorcio o una muerte', 'O cada pocos años'],
  },
  '/es/cuidados-paliativos-y-hospicio/': {
    cuando: ['Paliativos: en cuanto haya dolor o angustia', 'Hospicio: cuando el tratamiento ya no ayuda', 'Puede volver al tratamiento'],
  },
  '/es/despues-de-una-muerte/': {
    'primeras-horas': ['Con hospicio: llame al hospicio', 'Inesperada: número de emergencias', 'No hay prisa por mover el cuerpo'],
    derechos: ['Precios detallados', 'Compre solo lo que quiera', 'Ataúd o urna de otro lugar'],
  },
  '/es/cuentas-en-linea/': {
    antes: ['Guarde primero fotos y mensajes', 'Mantenga activo su teléfono', 'Busque dinero'],
    conmemorar: ['Facebook', 'Instagram', 'LinkedIn'],
  },
  '/es/duelo/': {
    normal: ['Tristeza', 'Entumecimiento', 'Rabia', 'Culpa', 'Alivio', 'Problemas para dormir'],
    ninos: ['Palabras claras', 'Respuestas honestas', 'Ellos deciden si participan'],
  },
};
const ES_GLANCE = {
  '/es/planificar/': [['2 partes', 'Una directiva anticipada: sus deseos, y quién decide por usted'], ['Gratis', 'Los formularios suelen ser gratuitos, a menudo sin abogado'], ['Cada pocos años', 'Revísela, y después de cualquier cambio importante']],
  '/es/despues-de-una-muerte/': [['1 llamada', 'Al hospicio, o a emergencias si la muerte fue inesperada'], ['Sin prisa', 'Normalmente hay tiempo para estar y despedirse'], ['Varias', 'Copias certificadas del certificado de defunción']],
  '/es/cuidados-paliativos-y-hospicio/': [['Cualquier etapa', 'Cuándo pueden empezar los cuidados paliativos'], ['6 meses', 'En EE. UU., esperanza de vida para el hospicio'], ['Reversible', 'Se puede dejar el hospicio y volver al tratamiento']],
};

const esChips = (list) => (list && list.length ? `<ul class="fact-chips" aria-label="Datos clave">${list.map((c) => `<li>${c}</li>`).join('')}</ul>` : '');
const esGlance = (list) =>
  list && list.length
    ? `<div class="glance" role="list" aria-label="De un vistazo">${list.map(([big, label]) => `<div class="glance-card" role="listitem"><strong>${big}</strong><span>${label}</span></div>`).join('')}</div>`
    : '';
function esSection(path, s, i) {
  const icon = s.icon || (ES_ICONS[path] || {})[s.id];
  const badge = icon ? `<span class="sec-icon" aria-hidden="true">${icons[icon]}</span>` : `<span class="h-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>`;
  return `<section class="g-sec" aria-labelledby="${s.id}">
<h2 id="${s.id}" class="num-h${icon ? ' has-icon' : ''}">${badge}<span class="h-text">${s.h}</span></h2>
${esChips(s.facts || (ES_FACTS[path] || {})[s.id])}
${cardifyLists(s.html)}
</section>`;
}

export function esGuide({ path, title, description, eyebrow, lead, icon = 'plan', reviewed, sections, related = [], sources = [], crisis = false, faq = [], glance, seoTitle }) {
  const toc = sections.map((s) => `<li><a href="#${s.id}">${s.h}</a></li>`).join('');
  return {
    path,
    title,
    seoTitle,
    description,
    crisis,
    faq,
    article: { modified: reviewed || site.lastVerified },
    body: `
<section class="page-hero">
<div class="wrap guide-layout">
<div aria-hidden="true"></div>
<div class="prose">
<div class="hero-icon">${icons[icon]}</div>
<p class="eyebrow">${eyebrow}</p>
<h1>${title}</h1>
<p class="lead" style="margin-top:20px">${lead}</p>
<p class="small muted" style="margin:0">Revisión de exactitud: ${fmtDateEs(site.lastScan)} · <a href="/es/acerca/#editorial">Cómo verificamos</a>${EN}</p>
${reviewNote}
</div>
</div>
</section>
<section class="section">
<div class="wrap guide-layout">
<nav class="toc card" aria-label="En esta página"><strong>En esta página</strong><ul>${toc}</ul></nav>
<div class="prose guide-body">
${esGlance(glance || ES_GLANCE[path])}
${sections.map((s, i) => esSection(path, s, i)).join('\n')}
${related.length ? `<h2 id="relacionado">Relacionado</h2>${linkCards(related)}` : ''}
${sources.length ? `<h2 id="fuentes">Fuentes</h2>${sourcesNoteEs(sources.map(([, u]) => u))}<ul>${sources.map(([l, u]) => `<li><a href="${esc(u)}">${esc(l)}</a></li>`).join('')}</ul>` : ''}
</div>
</div>
</section>`,
  };
}

/* ---------- guides ---------- */

const planificar = esGuide({
  path: '/es/planificar/',
  title: 'Planificar con tiempo',
  description: 'Cómo planificar el final de la vida: directivas anticipadas (testamento vital), un representante para decisiones médicas, la conversación con su familia y sus papeles en orden.',
  eyebrow: 'Etapa 1',
  lead: 'No hace falta un diagnóstico para empezar. Planificar con tiempo evita que las personas que usted quiere tengan que adivinar lo que usted habría querido.',
  sections: [
    { id: 'directiva', h: 'Escriba una directiva anticipada', html: `<p>Una directiva anticipada es un documento legal que dice qué atención médica quiere si usted no puede hablar por sí mismo. Según el país, también se llama instrucciones previas, voluntades anticipadas o testamento vital. Suele tener dos partes:</p>
<ul><li><strong>Un testamento vital:</strong> los tratamientos que querría y los que no, como respiradores o alimentación por sonda.</li>
<li><strong>Un poder para decisiones de salud:</strong> la persona que decide por usted (su representante o agente).</li></ul>
<p>Los nombres, formularios y reglas cambian según el país. En EE. UU., cada estado tiene su propio formulario y sus reglas sobre testigos o notario. Los formularios suelen ser gratuitos y a menudo no necesita un abogado. <strong>Encuentre <a href="/es/directivas-anticipadas/">el formulario de su estado</a></strong>. Dé copias a su representante y a su médico, y guarde el original donde se pueda encontrar.</p>` },
    { id: 'representante', h: 'Elija a su representante', html: `<p>Elija a alguien que respete sus deseos aunque no esté de acuerdo, que mantenga la calma bajo presión y a quien se pueda localizar rápido. Nombre también a un suplente. Luego dígale, con detalle, qué es importante para usted.</p>` },
    { id: 'persona', h: 'Nombre a una persona que sepa dónde está todo', html: `<p>Además de su representante y de su albacea, ayuda elegir a una persona de confianza que sepa dónde están sus documentos, contraseñas y deseos, y a quién llamar. Puede ser la misma persona. Dígaselo y anote su nombre en la ${`<a href="/es/imprimibles/planificacion/">hoja de planificación</a>`}.</p>` },
    { id: 'conversacion', h: 'Tenga la conversación', html: `<p>El documento importa menos que la conversación que hay detrás. Preguntas útiles:</p>
<ul><li>¿Qué haría que la vida no valiera la pena para usted? ¿Qué estaría dispuesto a pasar para tener más tiempo?</li>
<li>¿Dónde querría estar al final: en casa, en un hospicio, en un hospital?</li>
<li>¿A quién quiere a su lado, y quién quiere que tome las decisiones?</li>
<li>¿Qué quiere para su cuerpo y para su funeral?</li></ul>` },
    { id: 'papeles', h: 'Ponga sus papeles en orden', html: `<p>Las familias pierden semanas buscando cosas. Anote dónde están su testamento, sus pólizas de seguro, sus cuentas bancarias y de jubilación, la escritura o el contrato de alquiler, las contraseñas, y quién debe cuidar de sus hijos y mascotas. Ponga un beneficiario en las cuentas donde se pueda: esas cuentas suelen pasar fuera del proceso sucesorio (probate).</p>
<p>Para saber qué hace cada documento y cómo cambian las reglas según el estado, vea ${`<a href="/es/testamentos-y-fideicomisos/">testamentos, fideicomisos y papeles</a>`}. ¿Tiene una casa en otro país? Puede necesitar un testamento allí también: vea ${`<a href="/es/propiedades-en-el-extranjero/">propiedades en el extranjero</a>`}.</p>` },
    { id: 'despues', h: 'Diga lo que quiere para después', html: `<p>Entierro, cremación, entierro ecológico o donación del cuerpo. Un servicio religioso, una celebración de vida, una fiesta o nada. Música, lecturas, quién debe hablar. Vea ${`<a href="/es/opciones-para-el-cuerpo/">todas las opciones para el cuerpo</a>`}. Dejarlo por escrito es un regalo para quien tenga que organizarlo. La donación del cuerpo normalmente hay que arreglarla con antelación con una facultad de medicina o un programa.</p>` },
    { id: 'revisar', h: 'Revíselo cada pocos años', html: `<p>Vuelva a mirarlo después de un diagnóstico nuevo, un divorcio o una muerte en la familia, o cada pocos años de todos modos. Actualice los documentos y cuéntele a su representante qué cambió.</p>` },
  ],
  related: [
    ['/es/directivas-anticipadas/', 'Directivas anticipadas por estado', 'Formularios oficiales y gratuitos.', 'plan'],
    ['/es/para-mi/', 'Planifico para mí', 'Un camino paso a paso.', 'self'],
    ['/es/para-un-ser-querido/', 'Planifico para un ser querido', 'Para ayudar a un padre, pareja o amigo.', 'loved'],
  ],
  sources: [['National Institute on Aging: planificación anticipada de la atención (en inglés)', 'https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care']],
});

const stateCards = ad.states
  .map((s) => `<a class="ocard state-card" href="/es/directivas-anticipadas/${s.slug}/"><strong>${esc(estado(s.name))}</strong><span class="muted small">Formularios del estado</span></a>`)
  .join('');

const directivas = {
  path: '/es/directivas-anticipadas/',
  title: 'Directivas anticipadas por estado',
  seoTitle: 'Directivas anticipadas y testamento vital por estado, gratis',
  description: 'Formularios gratuitos de directiva anticipada y testamento vital para los 50 estados de EE. UU. y DC: el formulario oficial del estado o la ley que lo establece, y un formulario gratuito para cada estado.',
  article: { modified: ad.verified },
  faq: [
    ['¿Necesito un abogado para hacer una directiva anticipada?', 'Normalmente no. Cada estado de EE. UU. tiene un formulario que usted puede llenar gratis. Sí debe firmarlo como indica el formulario, normalmente ante testigos o un notario.'],
    ['¿Es lo mismo un testamento vital que una directiva anticipada?', 'El testamento vital es una parte de la directiva anticipada: los tratamientos que querría o no querría. La otra parte nombra a la persona que decide por usted.'],
  ],
  body: `
<section class="page-hero">
<div class="wrap prose">
<div class="hero-icon">${icons.plan}</div>
<p class="eyebrow">Planificar</p>
<h1>Directivas anticipadas por estado</h1>
<p class="lead" style="margin-top:20px">Cada estado de EE. UU. tiene un formulario gratuito para sus deseos médicos y para nombrar a la persona que habla por usted. Elija su estado.</p>
<p class="small muted" style="margin:0">Enlaces revisados: ${fmtDateEs(ad.verified)}</p>
${reviewNote}
</div>
</section>
<section class="section">
<div class="wrap prose">
<h2 id="que-es">Qué es una directiva anticipada</h2>
<p>Es un documento legal que dice qué atención médica quiere si usted no puede hablar por sí mismo. Tiene dos partes: <strong>instrucciones</strong> (el testamento vital) y <strong>la persona que decide por usted</strong> (su representante, agente o apoderado para decisiones de salud). Más en <a href="/es/planificar/#directiva">planificar con tiempo</a>.</p>
<h2 id="estados">Elija su estado</h2>
<p>La mayoría de los formularios oficiales están en inglés. Algunos estados publican su formulario también en español, entre ellos Oregón y Wisconsin (en sus páginas oficiales, enlazadas desde la página de cada estado).</p>
</div>
<div class="wrap">
<div class="cards cards-tight state-grid" style="margin-top:20px">${stateCards}</div>
</div>
<div class="wrap prose">
<h2 id="pasos">Para que tenga validez</h2>
<ol>
<li><strong>Elija a su persona.</strong> Un representante y un suplente. Pregúnteles primero.</li>
<li><strong>Hable con ellos.</strong> Dígales qué es importante para usted.</li>
<li><strong>Llene el formulario.</strong> Normalmente no hace falta un abogado.</li>
<li><strong>Fírmelo como indica el formulario.</strong> La mayoría de los estados exigen testigos, un notario, o cualquiera de los dos, y limitan quién puede ser testigo. Siga las instrucciones del propio formulario.</li>
<li><strong>Dé copias</strong> a su representante, a su médico y a su hospital. Guarde el original donde se pueda encontrar, no en una caja de seguridad del banco.</li>
<li><strong>Revíselo</strong> después de un diagnóstico, un divorcio, una muerte en la familia o una mudanza a otro estado.</li>
</ol>
<h2 id="polst">No es lo mismo que un POLST</h2>
<p>La directiva anticipada es para el futuro. Si alguien está gravemente enfermo ahora, pregunte al equipo médico por un POLST (también llamado MOLST, POST o MOST): una orden médica que siguen los servicios de emergencia. Vea <a href="/es/cuidados-paliativos-y-hospicio/">cuidados paliativos y hospicio</a>.</p>
<h2 id="fuentes">Fuentes</h2>
${sourcesNoteEs()}
<ul><li><a href="https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care">National Institute on Aging (en inglés)</a></li><li><a href="https://www.caringinfo.org/planning/advance-directives/by-state/">CaringInfo: formularios por estado (en inglés)</a></li></ul>
<p class="small muted">Información, no consejo legal. Las instrucciones del propio formulario son la última palabra.</p>
</div>
</section>`,
};

const paliativos = esGuide({
  path: '/es/cuidados-paliativos-y-hospicio/',
  title: 'Cuidados paliativos y hospicio',
  seoTitle: 'Cuidados paliativos y hospicio: ¿cuál es la diferencia?',
  description: 'La diferencia entre cuidados paliativos y hospicio: cuándo empieza cada uno, si se puede seguir con el tratamiento, quién paga y dónde se recibe.',
  eyebrow: 'Enfermedad grave',
  icon: 'illness',
  lead: 'Los dos se centran en el alivio y la calidad de vida. La diferencia está sobre todo en el momento, y en si continúa el tratamiento para curar.',
  sections: [
    { id: 'comparacion', h: 'Uno al lado del otro', html: `<div class="table-box" tabindex="0" role="region" aria-label="Cuidados paliativos y hospicio comparados"><table>
<caption class="sr-only">Cuidados paliativos y hospicio comparados</caption>
<thead><tr><th scope="col"></th><th scope="col">Cuidados paliativos</th><th scope="col">Hospicio</th></tr></thead>
<tbody>
<tr><th scope="row">Cuándo</th><td>En cualquier etapa de una enfermedad grave, incluso justo después del diagnóstico</td><td>Cerca del final de la vida; en EE. UU., normalmente cuando la esperanza de vida es de seis meses o menos</td></tr>
<tr><th scope="row">Tratamiento para curar</th><td>Puede continuar al mismo tiempo</td><td>Normalmente se deja para la enfermedad terminal; el resto de la atención continúa</td></tr>
<tr><th scope="row">Enfoque</th><td>Alivio del dolor, los síntomas y el estrés</td><td>Comodidad, dignidad y apoyo para toda la familia</td></tr>
<tr><th scope="row">Dónde</th><td>Hospital, clínica o en casa</td><td>Sobre todo en casa; también en residencias y centros de hospicio</td></tr>
<tr><th scope="row">Quién paga (EE. UU.)</th><td>Normalmente se cubre como otra atención médica, con los costos habituales</td><td>El <a class="src-link" href="https://www.medicare.gov/coverage/hospice-care">beneficio de hospicio de Medicare</a> cubre la mayoría de los costos</td></tr>
</tbody></table></div>
<p>Fuera de EE. UU., los dos suelen ofrecerse a través del sistema público de salud o de organizaciones benéficas, a menudo gratis para el paciente.</p>` },
    { id: 'cuando', h: 'Cuándo pedirlos', html: `<p>Pida cuidados paliativos en cuanto una enfermedad cause dolor, angustia o decisiones difíciles. Pregunte por el hospicio cuando el tratamiento ya no ayude, o ya no sea lo que la persona quiere. Se puede dejar el hospicio y volver al tratamiento si cambia de opinión. Muchas familias dicen que les habría gustado saber antes del hospicio.</p>` },
    { id: 'polst', h: 'Órdenes médicas para ahora (POLST)', html: `<p>La directiva anticipada es para el futuro. En EE. UU., un formulario POLST (también llamado MOLST, POST o MOST, según el estado) es una orden médica firmada por un profesional para alguien que está gravemente enfermo ahora. Indica a los servicios de emergencia y a los hospitales qué tratamiento quiere, por ejemplo si intentar la reanimación (RCP). Pregunte al equipo médico qué se usa donde usted vive.</p>` },
  ],
  related: [
    ['/es/senales-de-que-la-muerte-esta-cerca/', 'Señales de que la muerte está cerca', 'Qué esperar y qué ayuda.', 'lastweeks'],
    ['/es/directivas-anticipadas/', 'Directivas anticipadas por estado', 'Formularios gratuitos.', 'plan'],
    ['/es/enfermedad-grave/', 'Enfermedad grave', 'La guía completa.', 'illness'],
  ],
  sources: [
    ['Medicare: beneficio de hospicio (en inglés)', 'https://www.medicare.gov/coverage/hospice-care'],
    ['National Institute on Aging: el final de la vida (en inglés)', 'https://www.nia.nih.gov/health/end-of-life'],
  ],
});

const senales = esGuide({
  path: '/es/senales-de-que-la-muerte-esta-cerca/',
  title: 'Señales de que la muerte está cerca',
  seoTitle: 'Señales de que la muerte está cerca: semanas, días y horas',
  description: 'Las señales comunes de que la muerte está a semanas, días u horas, qué significan y cómo mantener a la persona cómoda.',
  eyebrow: 'Las últimas semanas',
  icon: 'lastweeks',
  lead: 'Cada muerte es distinta, pero la mayoría de las personas muestran algunas de estas señales. Conocerlas ayuda a entender lo que está viendo y cuándo llamar a la familia.',
  sections: [
    { id: 'semanas', h: 'En las últimas semanas', html: `<ul><li>Dormir mucho más, y costar más despertarse.</li>
<li>Comer y beber menos, y perder el interés por la comida. Es una parte natural de morir; forzar comida o líquidos puede causar molestias.</li>
<li>Apartarse de la gente y de las actividades, y hablar menos.</li>
<li>Debilidad, y necesitar ayuda para moverse, lavarse y usar el baño.</li></ul>` },
    { id: 'dias', h: 'En los últimos días', html: `<ul><li>Confusión, inquietud o agitación, o ver a personas que no están.</li>
<li>Menos orina, y más oscura.</li>
<li>Manos, pies y rodillas fríos, y piel con manchas o azulada.</li>
<li>Algunas personas tienen un breve momento de energía o lucidez antes de volver a decaer. Puede ser una oportunidad para decir lo que importa.</li></ul>` },
    { id: 'horas', h: 'En las últimas horas', html: `<ul><li>Cambios en la respiración: pausas largas entre respiraciones, o respiraciones rápidas y superficiales.</li>
<li>Un ruido de estertor o gorgoteo porque la persona ya no puede tragar la saliva. Suele angustiar más a quien lo oye que a quien lo tiene.</li>
<li>Dejar de responder. El oído puede mantenerse, así que siga hablándole.</li></ul>` },
    { id: 'ayuda', h: 'Lo que ayuda', html: `<p>Avise al equipo de cuidados de cualquier señal de dolor, falta de aire o angustia: se pueden tratar. Humedezca los labios y la boca, cambie la postura con suavidad y mantenga la habitación tranquila. Si la persona está en hospicio, llame al equipo del hospicio siempre que tenga dudas. Cuando haya ocurrido la muerte, vea <a href="/es/primeras-24-horas/">las primeras 24 horas</a>.</p>` },
  ],
  related: [
    ['/es/primeras-24-horas/', 'Las primeras 24 horas', 'Lista para imprimir.', 'printer'],
    ['/es/cuidados-paliativos-y-hospicio/', 'Cuidados paliativos y hospicio', 'La diferencia, y cuándo pedirlos.', 'illness'],
    ['/es/ultimas-semanas/', 'Las últimas semanas', 'Cómo puede ser morir de verdad.', 'lastweeks'],
  ],
  sources: [['National Institute on Aging: el final de la vida (en inglés)', 'https://www.nia.nih.gov/health/end-of-life']],
});

const despues = esGuide({
  path: '/es/despues-de-una-muerte/',
  title: 'Después de una muerte',
  description: 'Qué hacer cuando alguien muere: las primeras 24 horas, los certificados de defunción, el funeral, sus derechos con las funerarias y los trámites.',
  eyebrow: 'Etapa 4',
  icon: 'afterdeath',
  lead: 'En las primeras horas hay muy poco que sea urgente. Esta guía separa lo urgente de lo que puede esperar.',
  sections: [
    { id: 'primeras-horas', h: 'Las primeras horas', html: `<ul><li><strong>Muerte esperada en casa, con hospicio:</strong> llame al hospicio. Confirmarán la muerte y le ayudarán con los siguientes pasos.</li>
<li><strong>Muerte inesperada:</strong> llame al número de emergencias (911 en EE. UU. y Canadá, 999 en el Reino Unido, 112 en la Unión Europea).</li>
<li><strong>En un hospital o una residencia:</strong> el personal le guiará.</li></ul>
<p>Normalmente no hay prisa por mover el cuerpo. Puede tomarse tiempo para estar, despedirse y llamar a la familia. <a href="/es/primeras-24-horas/">Imprima la lista de las primeras 24 horas</a>.</p>` },
    { id: 'certificados', h: 'Certificados de defunción', html: `<p>Normalmente la funeraria tramita el certificado de defunción. Pida varias copias certificadas: bancos, aseguradoras, planes de pensiones y organismos públicos suelen querer una cada uno.</p>` },
    { id: 'funeral', h: 'Funeral, entierro y cremación', html: `<ul><li><strong>Entierro:</strong> tradicional, o ecológico (natural), sin embalsamar y sin bóveda de concreto.</li>
<li><strong>Cremación:</strong> con o sin ceremonia. La cremación directa, sin ceremonia antes, suele ser la que menos cuesta.</li>
<li><strong>Donación del cuerpo:</strong> normalmente se arregla con antelación con un programa.</li>
<li><strong>Funeral en casa:</strong> la mayoría de los estados permiten a las familias cuidar de sus propios muertos; algunos exigen un director de funeraria para ciertos pasos.</li></ul>
<p>Hay muchas más opciones, como la cremación con agua, el compostaje humano, el entierro en el mar o ser plantado bajo un árbol: vea ${`<a href="/es/opciones-para-el-cuerpo/">todas las opciones para el cuerpo</a>`}. La ceremonia puede hacerse semanas después, de la forma que usted quiera.</p>` },
    { id: 'derechos', h: 'Sus derechos con las funerarias', html: `<p>Esté donde esté, pida precios por escrito y detallados antes de aceptar nada. En EE. UU., la <a class="src-link" href="https://consumidor.ftc.gov/articulos/la-regla-sobre-funerales">Regla sobre Funerales de la FTC</a> le da derecho a:</p>
<ul><li>Recibir una lista de precios detallada en persona, y precios por teléfono.</li>
<li>Comprar solo los productos y servicios que quiera.</li>
<li>Usar un ataúd o una urna comprados en otro lugar, sin cargo por manejo.</li>
<li>Rechazar el embalsamamiento en la mayoría de los casos. Pregunte qué exige realmente la ley.</li></ul>
<p>Los precios varían mucho. Llamar a dos o tres funerarias puede ahorrar miles de dólares. Vea ${`<a href="/es/lo-que-cuesta/">lo que cuesta</a>`}.</p>` },
    { id: 'primer-mes', h: 'El primer mes', html: `<ul><li>Busque el testamento y contacte al albacea que nombra.</li>
<li>Avise a la agencia de pensiones o seguridad social del gobierno (en EE. UU., el Seguro Social; muchas veces lo hace la funeraria), a otros planes de pensiones, a las aseguradoras y a los bancos.</li>
<li>Reclame el seguro de vida y cualquier beneficio; pregunte por los beneficios para sobrevivientes.</li>
<li>Cancele o transfiera servicios, suscripciones y cuentas. Siga pagando las facturas esenciales.</li>
<li>Cierre o convierta en conmemorativas sus redes sociales, su correo y otras cuentas en línea, después de guardar lo que la familia quiera conservar. Vea <a href="/es/cuentas-en-linea/">cerrar sus cuentas en línea</a>.</li>
<li>Redirija el correo, asegure la casa y el auto, y cuide de las mascotas.</li></ul>` },
    { id: 'sucesion', h: 'La sucesión y el patrimonio', html: `<p>El proceso sucesorio (en EE. UU., probate) es el proceso legal para cerrar el patrimonio de una persona; su nombre y sus pasos cambian según el país. Las cuentas con un beneficiario nombrado y los bienes en propiedad conjunta suelen pasar fuera de él, y muchos lugares, entre ellos todos los estados de EE. UU., tienen un proceso más sencillo para patrimonios pequeños. Si el patrimonio es grande o complicado, hable con un abogado de sucesiones.</p>
<p>Si tenía propiedades en otro país, vea ${`<a href="/es/propiedades-en-el-extranjero/">propiedades en el extranjero</a>`}.</p>` },
  ],
  related: [
    ['/es/primeras-24-horas/', 'Las primeras 24 horas', 'Lista para imprimir.', 'printer'],
    ['/es/cuentas-en-linea/', 'Cerrar sus cuentas en línea', 'Redes sociales, correo y pagos.', 'key'],
    ['/es/duelo/', 'Duelo', 'Qué es normal y cuándo pedir más ayuda.', 'grief'],
    ['/es/para-un-ser-querido/', 'Planifico para un ser querido', 'Un camino paso a paso.', 'loved'],
  ],
  sources: [
    ['FTC: la Regla sobre Funerales (en español)', 'https://consumidor.ftc.gov/articulos/la-regla-sobre-funerales']
  ],
});

const duelo = esGuide({
  path: '/es/duelo/',
  title: 'Duelo',
  description: 'El duelo después de una muerte: qué es normal, cómo ayudar a los niños, la pérdida de una mascota y cuándo pedir más ayuda.',
  eyebrow: 'Etapa 5',
  icon: 'grief',
  crisis: true,
  lead: 'El duelo no sigue etapas ni un calendario. Esto es lo normal, y cuándo pedir más ayuda.',
  sections: [
    { id: 'normal', h: 'Qué es normal', html: `<p>Tristeza, entumecimiento, rabia, culpa, alivio y problemas para dormir o concentrarse son comunes. El duelo suele llegar en olas, provocadas por fechas, lugares y canciones. El alivio después de una larga enfermedad también es normal, y no significa que usted quisiera menos a la persona.</p>` },
    { id: 'antes', h: 'El duelo antes de la muerte', html: `<p>Muchas personas empiezan a sentir el duelo durante una larga enfermedad. Se llama duelo anticipado, y es normal sentirlo mientras se cuida a alguien.</p>` },
    { id: 'muerte-dificil', h: 'Si presenció una muerte difícil', html: `<p>Ver a alguien que quiere consumirse, sufrir o perderse a sí mismo puede dejar imágenes que duran: recuerdos que irrumpen, pesadillas, o culpa por lo que no pudo evitar. No es una debilidad, y vale la pena hablarlo con alguien, sobre todo con un consejero de duelo que entienda el trauma.</p>
<p>Muchas personas descubren que presenciar una muerte cambia lo que quieren para la suya. Si a usted le ha pasado, escríbalo mientras lo tiene claro: lo que querría, lo que rechazaría y quién debe hablar por usted. <a href="/es/planificar/">Planificar con tiempo</a> puede ayudar.</p>` },
    { id: 'ninos', h: 'Cómo ayudar a los niños', html: `<ul><li>Use palabras claras: "murió", no "se quedó dormido" o "la perdimos", que pueden confundir o asustar.</li>
<li>Responda a sus preguntas con honestidad y sencillez; está bien decir que no sabe.</li>
<li>Deje que los niños decidan si participan en las despedidas y en el funeral.</li>
<li>Espere que el duelo vaya y venga en sus juegos y preguntas durante meses y años.</li>
<li>Avise a su escuela y a las demás personas que los cuidan.</li></ul>` },
    { id: 'mascota', h: 'Cuando muere una mascota', html: `<p>Perder una mascota es una pérdida real, y el duelo por un animal puede ser tan fuerte como por una persona. Para los niños, a menudo es su primera experiencia con la muerte; ayuda el mismo lenguaje honesto.</p>` },
    { id: 'apoyo', h: 'Dónde encontrar apoyo', html: `<p>Los hospicios ofrecen apoyo en el duelo a las familias, normalmente durante cerca de un año después de una muerte, muchas veces gratis. También ayudan los grupos de duelo, los consejeros y las comunidades de fe.</p>` },
    { id: 'mas-ayuda', h: 'Cuándo pedir más ayuda', html: `<p>Hable con un médico o un consejero si el duelo sigue siendo tan intenso que no puede con la vida diaria durante muchos meses, o si está bebiendo o usando drogas para sobrellevarlo. Si está pensando en el suicidio, llame o envíe un mensaje de texto al 988 en EE. UU. (<a class="src-link" href="https://988lifeline.org/es/home/">hay atención en español</a>), o <a href="https://befrienders.org/find-support-now/">busque una línea de ayuda en su país</a>.</p>` },
  ],
  related: [
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'Lo urgente y lo que puede esperar.', 'afterdeath'],
    ['/es/imprimibles/recordar-a-alguien/', 'Libro para recordar', 'Para niños en duelo, para imprimir.', 'printer'],
  ],
  sources: [['988 Suicide & Crisis Lifeline: ayuda en español', 'https://988lifeline.org/es/home/']],
});

/* ---------- printable: the first 24 hours ---------- */

const cuentas = esGuide({
  path: '/es/cuentas-en-linea/',
  title: 'Cerrar sus cuentas en línea',
  description: 'Cómo cerrar o convertir en conmemorativas las redes sociales, el correo y las cuentas en línea de alguien que murió: Facebook, Instagram, Google y Gmail, Apple e iCloud, Microsoft y Outlook, X, LinkedIn y PayPal.',
  eyebrow: 'Después de una muerte',
  icon: 'afterdeath',
  lead: 'No hay prisa. Guarde primero lo que importa y luego use el proceso propio de cada empresa para cerrar o convertir sus cuentas en conmemorativas. Esto es lo que ofrece cada una y lo que va a necesitar.',
  sections: [
    { id: 'antes', h: 'Antes de cerrar nada', html: `<ul>
<li><strong>Guarde lo que importa.</strong> Las fotos, los videos, los mensajes y los documentos pueden perderse para siempre cuando se cierra una cuenta. Descargue o copie primero lo que la familia quiera conservar.</li>
<li><strong>Mantenga por ahora su número de teléfono y su correo principal.</strong> Muchas cuentas envían códigos de acceso a un teléfono o a un correo. Si se cancelan demasiado pronto, otras cuentas pueden quedar fuera de alcance.</li>
<li><strong>Busque dinero.</strong> Las cuentas de pago, el crédito en tiendas, las tarjetas de regalo y las monedas digitales pertenecen al patrimonio. Avise al albacea.</li>
<li><strong>Use el proceso oficial.</strong> Las empresas no dan contraseñas. Entrar como si fuera la persona puede ir en contra de las condiciones de la empresa, así que el proceso de solicitud de cada empresa es el camino más seguro.</li>
</ul>` },
    { id: 'encontrar', h: 'Encuentre sus cuentas', html: `<p>La mayoría de las personas tienen muchas más cuentas de las que su familia conoce. Dónde buscar:</p>
<ul>
<li>Un gestor de contraseñas, o una lista que hayan dejado.</li>
<li>Su bandeja de entrada: los correos de bienvenida, los recibos y los avisos de inicio de sesión muestran qué servicios usaban.</li>
<li>Los extractos del banco y de las tarjetas, para las suscripciones y los pagos periódicos.</li>
<li>Las aplicaciones de su teléfono y de su computadora.</li>
</ul>
<p>Para llevar la cuenta de cada una, use la <a href="/es/lista-cuentas-en-linea/">lista para imprimir</a>.</p>` },
    { id: 'conmemorar', h: '¿Convertirla en conmemorativa o cerrarla?', html: `<p>Algunos servicios, como Facebook, Instagram y LinkedIn, pueden convertir un perfil en conmemorativo en lugar de borrarlo. Un perfil conmemorativo sigue visible para que los amigos compartan recuerdos, pero nadie puede entrar en él. Cerrarlo lo elimina. Háblenlo primero en familia: a algunas personas les reconforta una página conmemorativa y a otras les duele. Si la persona dejó deseos sobre esto, respételos.</p>` },
    { id: 'redes', h: 'Redes sociales', html: `
<h3>Facebook</h3>
<p>Los amigos o la familia pueden pedir a Meta que convierta el perfil en conmemorativo. La familia directa o el albacea pueden pedir que se elimine, con prueba de la muerte. Si la persona eligió un contacto de legado, esa persona puede cuidar el perfil conmemorativo.</p>
<p><a class="btn btn-small" href="https://www.facebook.com/help/contact/228813257197480?locale=es_LA">Facebook: cuenta conmemorativa o eliminación</a></p>
<h3>Instagram</h3>
<p>Instagram puede convertir una cuenta en conmemorativa si recibe prueba de la muerte, como una esquela. Solo la familia directa verificada puede pedir que se elimine, con documentos que demuestren el parentesco o su autoridad legal.</p>
<p><a class="btn btn-small" href="https://help.instagram.com/264154560391256?locale=es_LA">Instagram: informar sobre la cuenta de una persona fallecida</a></p>
<h3>X (Twitter)</h3>
<p>X no convierte cuentas en conmemorativas ni da acceso a nadie. La familia directa o alguien que actúe en nombre del patrimonio puede pedir que se desactive la cuenta.</p>
<p><a class="btn btn-small" href="https://help.x.com/en/rules-and-policies/contact-x-about-media-on-a-deceased-family-members-account" hreflang="en">X: usuarios fallecidos (en inglés)</a></p>
<h3>LinkedIn</h3>
<p>Cualquiera puede avisar de que un miembro ha muerto. Alguien con autoridad para actuar en nombre de la persona puede pedir que el perfil se convierta en conmemorativo o se cierre.</p>
<p><a class="btn btn-small" href="https://www.linkedin.com/help/linkedin/ask/ts-rdmlp?lang=es">LinkedIn: solicitud sobre un miembro fallecido</a></p>` },
    { id: 'correo', h: 'Correo, fotos y almacenamiento en la nube', html: `
<h3>Google (Gmail, Google Fotos, YouTube)</h3>
<p>La familia directa o un representante pueden pedir a Google que cierre la cuenta. En algunos casos Google puede entregar parte de su contenido, pero revisa cada solicitud y puede necesitar documentos legales, como una orden judicial. Nunca da contraseñas. Pida el contenido antes de cerrarla: una vez cerrada la cuenta, Google no puede entregar nada de ella.</p>
<p><a class="btn btn-small" href="https://support.google.com/accounts/troubleshooter/6357590?hl=es">Google: solicitud sobre la cuenta de un usuario fallecido</a></p>
<h3>Apple (iCloud, cuenta de Apple)</h3>
<p>Si la persona le nombró contacto de legado, puede pedir acceso con su clave de acceso y un certificado de defunción. El acceso dura tres años y no incluye las películas, la música ni los libros comprados, ni las contraseñas y los datos de pago guardados. Sin contacto de legado, Apple suele pedir un certificado de defunción y puede pedir una orden judicial u otros documentos, según el país. Apple no puede desbloquear un dispositivo protegido con código.</p>
<p><a class="btn btn-small" href="https://support.apple.com/es-us/102431">Apple: cuenta de un familiar fallecido</a></p>
<h3>Microsoft (Outlook, Hotmail, OneDrive)</h3>
<p>En general, Microsoft no entrega correos ni archivos a la familia sin un proceso legal válido, como una orden judicial, y ni siquiera así lo promete. Si nadie puede entrar, la cuenta acaba cerrándose por inactividad y se borran sus correos y archivos, así que guarde pronto lo importante si puede acceder.</p>
<p><a class="btn btn-small" href="https://support.microsoft.com/es-es/topic/ebbd2860-917e-4b39-9913-212362da6b2f">Microsoft: cuando alguien ha fallecido</a></p>` },
    { id: 'pagos', h: 'Cuentas de pago y suscripciones', html: `
<h3>PayPal</h3>
<p>Solo el albacea o el administrador del patrimonio puede cerrar la cuenta. PayPal pide documentos como una identificación con foto y una prueba de su autoridad, como el testamento o las cartas del tribunal. El saldo pasa al patrimonio.</p>
<p><a class="btn btn-small" href="https://www.paypal.com/us/cshelp/article/how-do-i-close-the-paypal-account-of-a-deceased-relative-help220" hreflang="en">PayPal: cerrar la cuenta de un familiar fallecido (en inglés)</a></p>
<h3>Suscripciones</h3>
<p>Los servicios de streaming, las aplicaciones, las membresías y el almacenamiento en la nube suelen seguir cobrando a una tarjeta. Cancélelos con cada servicio, o pida al banco o al emisor de la tarjeta que detenga los pagos periódicos cuando le avise de la muerte. Guarde una lista de lo que canceló, para el albacea.</p>` },
    { id: 'suyas', h: 'Cómo facilitárselo a su propia familia', html: `<p>Unos minutos ahora le ahorran meses a su familia:</p>
<ul>
<li><strong>Nombre contactos de legado.</strong> Facebook, Apple y Google le permiten elegir a alguien ahora. Con Google, configure el <a href="https://support.google.com/accounts/answer/3036546?hl=es">Administrador de cuentas inactivas</a>. Con Apple, <a href="https://support.apple.com/es-us/102631">agregue un contacto de legado</a>.</li>
<li><strong>Deje por escrito sus deseos.</strong> Qué cuentas convertir en conmemorativas, cuáles cerrar y qué guardar.</li>
<li><strong>Use un gestor de contraseñas con acceso de emergencia,</strong> y diga a una persona de confianza cómo llegar a él. Nunca ponga contraseñas en su testamento, que puede volverse un documento público.</li>
</ul>
<p>Más en <a href="/es/planificar/#papeles">ponga sus papeles en orden</a>.</p>` },
  ],
  related: [
    ['/es/lista-cuentas-en-linea/', 'Lista para imprimir', 'Para ir cuenta por cuenta, también en PDF.', 'printer'],
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'Las primeras horas, el funeral y el primer mes.', 'afterdeath'],
    ['/es/planificar/', 'Planificar con tiempo', 'Para sus propias cuentas.', 'plan'],
  ],
  sources: [
    ['Meta: política de cuentas conmemorativas (en inglés)', 'https://transparency.meta.com/policies/community-standards/memorialization/'],
    ['Instagram: cuenta de una persona fallecida', 'https://help.instagram.com/264154560391256?locale=es_LA'],
    ['X: usuarios fallecidos (en inglés)', 'https://help.x.com/en/rules-and-policies/contact-x-about-media-on-a-deceased-family-members-account'],
    ['LinkedIn: miembro fallecido', 'https://www.linkedin.com/help/linkedin/ask/ts-rdmlp?lang=es'],
    ['Google: cuenta de un usuario fallecido', 'https://support.google.com/accounts/troubleshooter/6357590?hl=es'],
    ['Apple: cuenta de un familiar fallecido', 'https://support.apple.com/es-us/102431'],
    ['Microsoft: cuando alguien ha fallecido', 'https://support.microsoft.com/es-es/topic/ebbd2860-917e-4b39-9913-212362da6b2f'],
    ['PayPal: cuenta de un familiar fallecido (en inglés)', 'https://www.paypal.com/us/cshelp/article/how-do-i-close-the-paypal-account-of-a-deceased-relative-help220'],
  ],
});

const blankEs = '<span class="blank" aria-hidden="true"></span>';
const FILAS = ['Facebook', 'Instagram', 'X (Twitter)', 'LinkedIn', 'Google (Gmail, Fotos, YouTube)', 'Apple (iCloud)', 'Microsoft (Outlook, Hotmail, OneDrive)', 'PayPal', '', '', '', '', '', ''];

const listaCuentas = {
  path: '/es/lista-cuentas-en-linea/',
  title: 'Cerrar sus cuentas en línea',
  seoTitle: 'Lista para cerrar las cuentas en línea de una persona fallecida (para imprimir)',
  description: 'Una lista para imprimir para cerrar o convertir en conmemorativas las cuentas en línea de una persona que murió: qué guardar primero, dónde buscar, qué documentos necesita y una tabla para cada cuenta.',
  body: `
<section class="section">
<div class="wrap prose">
<p class="eyebrow">Lista para imprimir</p>
<h1>Cerrar sus cuentas en línea</h1>
<p class="lead" style="margin:20px 0">No hay prisa. Guarde primero lo que importa y luego vaya cuenta por cuenta. El proceso de cada empresa, con enlaces, está en nuestra guía: <a href="/es/cuentas-en-linea/">eolatlas.org/es/cuentas-en-linea</a>.</p>
${dlPanelEs('lista-cuentas-en-linea')}
<div class="no-print">${reviewNote}</div>
<h2>Antes de cerrar nada</h2>
<ul class="check">
<li>Descargue o copie las fotos, los videos, los mensajes y los documentos que la familia quiera conservar.</li>
<li>Mantenga activo su número de teléfono (allí llegan los códigos de acceso) hasta: ${blankEs}</li>
<li>Mantenga activo su correo principal hasta que se cierren las demás cuentas.</li>
<li>Avise al albacea de cualquier dinero en cuentas en línea: aplicaciones de pago, crédito en tiendas, tarjetas de regalo, monedas digitales.</li>
<li>Hablen en familia de qué cuentas convertir en conmemorativas y cuáles cerrar. Sus deseos, si los dejó: ${blankEs}</li>
</ul>
<h2>Encuentre sus cuentas</h2>
<ul class="check">
<li>Gestor de contraseñas o lista escrita. Dónde está: ${blankEs}</li>
<li>Revisé su bandeja de entrada: correos de bienvenida, recibos y avisos de inicio de sesión.</li>
<li>Revisé los extractos del banco y de las tarjetas: suscripciones y pagos periódicos.</li>
<li>Anoté las aplicaciones de su teléfono y su computadora.</li>
</ul>
<h2>Lo que puede necesitar</h2>
<ul class="check">
<li>Copias certificadas del certificado de defunción (cuántas: ${blankEs})</li>
<li>Su propia identificación con foto</li>
<li>Prueba de su autoridad, si es el albacea: el testamento o las cartas del tribunal</li>
<li>Un enlace a la esquela o al aviso de defunción (algunos servicios lo aceptan como prueba)</li>
<li>Para Apple: la clave de acceso, si usted es su contacto de legado</li>
</ul>
<div class="wb-page">
<h2>Cada cuenta</h2>
<p class="muted small">Decida: convertir en conmemorativa, cerrar o mantener por ahora. Anote la fecha en que envió la solicitud y marque cuando esté hecho.</p>
<div class="table-box print-table" tabindex="0" role="region" aria-label="Cuentas para cerrar o convertir en conmemorativas"><table class="acct-table">
<caption class="sr-only">Cuentas para cerrar o convertir en conmemorativas</caption>
<thead><tr><th scope="col">Servicio</th><th scope="col">Su usuario o correo</th><th scope="col">Conmemorar, cerrar o mantener</th><th scope="col">Solicitud enviada</th><th scope="col">Hecho</th></tr></thead>
<tbody>
${FILAS.map((n) => `<tr><td>${n || '<span class="sr-only">Otro servicio</span>'}</td><td></td><td></td><td></td><td><span class="tick" aria-hidden="true"></span></td></tr>`).join('\n')}
</tbody></table></div>
</div>
<h2>Suscripciones para cancelar</h2>
<ul class="check">
<li>Servicios de streaming: ${blankEs}</li>
<li>Aplicaciones y membresías: ${blankEs}</li>
<li>Almacenamiento en la nube: ${blankEs}</li>
<li>Pedí al banco o al emisor de la tarjeta que detenga los pagos periódicos (fecha): ${blankEs}</li>
<li>Guardé una lista de todo lo cancelado, para el albacea.</li>
</ul>
<p class="muted small">Información, no consejo legal. Las empresas cambian sus procesos; consulte la página de ayuda de cada una.</p>
<p class="muted small print-only">De End of Life Atlas · eolatlas.org · Información, no consejo médico ni legal. Traducción pendiente de revisión; para avisar de un error: eolatlas.org/suggestions</p>
</div>
</section>`,
};

const primeras24 = {
  path: '/es/primeras-24-horas/',
  title: 'Después de una muerte: las primeras 24 horas',
  seoTitle: 'Qué hacer cuando alguien muere: las primeras 24 horas',
  description: 'Una lista para imprimir para el primer día después de una muerte: a quién llamar y qué puede esperar.',
  body: `
<section class="section">
<div class="wrap prose">
<p class="eyebrow">Lista para imprimir</p>
<h1>Después de una muerte: las primeras 24 horas</h1>
<p class="lead" style="margin:20px 0">Muy poco es urgente. Haga esto en orden y deje el resto para después.</p>
${dlPanelEs('primeras-24-horas')}
<div class="no-print">${reviewNote}</div>
<h2>Enseguida</h2>
<ul class="check">
<li>Muerte esperada con hospicio: llame al hospicio. Muerte inesperada: llame al número de emergencias (911 en EE. UU. y Canadá, 999 en el Reino Unido, 112 en la Unión Europea).</li>
<li>Tómese un momento. Normalmente no hay prisa por mover el cuerpo.</li>
<li>Llame a una persona para que le acompañe.</li>
</ul>
<h2>Durante el día</h2>
<ul class="check">
<li>Avise a la familia y a los amigos cercanos, o pida a alguien que lo haga.</li>
<li>Elija una funeraria o un proveedor de cremación. Pida la lista de precios detallada.</li>
<li>Busque si hay deseos por escrito sobre el cuerpo y el funeral.</li>
<li>Organice el cuidado de los niños y las mascotas, y asegure la casa.</li>
</ul>
<h2>Esto puede esperar unos días</h2>
<ul class="check">
<li>Pida copias certificadas del certificado de defunción.</li>
<li>Busque el testamento y contacte al albacea.</li>
<li>Avise a la agencia de seguridad social o pensiones, a los empleadores, a los bancos y a las aseguradoras.</li>
<li>Planifique la ceremonia. Puede hacerse semanas después.</li>
</ul>
<p class="muted small">Si le está costando, no tiene que hacerlo solo. Pida ayuda a un amigo, a un familiar o al equipo del hospicio.</p>
<p class="muted small print-only">De End of Life Atlas · eolatlas.org · Información, no consejo médico ni legal. Traducción pendiente de revisión; para avisar de un error: eolatlas.org/suggestions</p>
</div>
</section>`,
};

/* ---------- journeys ---------- */

const ES_T = {
  eyebrow: 'Un camino paso a paso',
  start: (n) => `${n} paradas. Sus marcas se guardan solo en este navegador.`,
  progress: '{done} de {total} paradas hechas. Sus marcas se guardan solo en este navegador.',
  done: 'Hecho',
  also: 'También',
  others: { myself: ['/es/para-un-ser-querido/', 'Planifico para un ser querido'], 'loved-one': ['/es/para-mi/', 'Planifico para mí'] },
  extra: '<a href="/es/preguntar/">Haga una pregunta</a> · <a href="/es/">Inicio en español</a>',
};

const E = (href, label) => [href, `${label} (en inglés)`];

const paraMi = {
  slug: 'myself',
  path: '/es/para-mi/',
  title: 'Planifico para mí',
  icon: icons.self,
  description: 'Un camino paso a paso para planificar el final de su propia vida: sus deseos, sus personas, sus documentos, su cuerpo, sus palabras y su familia.',
  lead: 'Doce paradas, en un orden lógico. No tiene que hacerlas todas a la vez y puede saltarse las que no correspondan. Márquelas a medida que avanza.',
  phases: [
    {
      h: 'Decida lo que quiere',
      stops: [
        { id: 'matters', t: 'Piense en lo que le importa', d: 'Qué haría que la vida no valiera la pena, qué estaría dispuesto a pasar para tener más tiempo, y dónde querría estar al final.', links: [['/es/planificar/#conversacion', 'Preguntas para pensar']] },
        { id: 'people', t: 'Elija a sus personas', d: 'Un representante para decisiones de salud, un suplente, un albacea, y una persona que sepa dónde está todo.', links: [['/es/planificar/#representante', 'Elegir representante'], ['/es/planificar/#persona', 'La persona de confianza']] },
        { id: 'body', t: 'Decida qué pasará con su cuerpo', d: 'Entierro, cremación, entierro ecológico, bajo un árbol, en el mar, compostaje, donación y más.', links: [['/es/opciones-para-el-cuerpo/', 'Todas las opciones']] },
        { id: 'gathering', t: 'Planifique la despedida', d: 'Un funeral, una celebración de vida, una fiesta o nada. Música, palabras y personas.', links: [['/es/imprimibles/funeral/', 'Planificador de funeral']] },
      ],
    },
    {
      h: 'Déjelo por escrito',
      stops: [
        { id: 'medical', t: 'Escriba sus deseos médicos', d: 'Una directiva anticipada y un poder para decisiones de salud, en el formulario de su estado o país.', links: [['/es/directivas-anticipadas/', 'El formulario de su estado'], ['/es/planificar/#directiva', 'Directivas anticipadas']] },
        { id: 'will', t: 'Haga un testamento y los documentos del dinero', d: 'Un testamento, un poder financiero y beneficiarios al día. Las reglas cambian según el estado y el país.', links: [['/es/testamentos-y-fideicomisos/', 'Testamentos y papeles'], ['/es/propiedades-en-el-extranjero/', 'Propiedades en el extranjero']] },
        { id: 'words', t: 'Deje sus palabras', d: 'Cartas para las personas que quiere, y la historia de su vida contada por usted.', links: [['/es/imprimibles/cartas/', 'Cartas para dejar']] },
        { id: 'one-place', t: 'Ponga todo en un solo lugar', d: 'Dónde están sus documentos, sus cuentas, su vida digital y a quién llamar.', links: [['/es/planificar/#papeles', 'Sus papeles en orden'], ['/es/imprimibles/planificacion/', 'Hoja de planificación']] },
      ],
    },
    {
      h: 'Compártalo y manténgalo al día',
      stops: [
        { id: 'costs', t: 'Sepa lo que puede costar', d: 'Los cuidados, los funerales y las opciones que cuestan menos.', links: [['/es/lo-que-cuesta/', 'Lo que cuesta']] },
        { id: 'tell', t: 'Cuénteselo a su familia', d: 'Dé copias a su representante y a su albacea, y hablen de lo que decidió.', links: [['/es/planificar/#conversacion', 'La conversación']] },
        { id: 'ill', t: 'Si se enferma gravemente', d: 'Cuidados paliativos, hospicio, órdenes médicas y todas las opciones cerca del final.', links: [['/es/cuidados-paliativos-y-hospicio/', 'Paliativos y hospicio'], ['/es/muerte-medicamente-asistida/', 'Muerte médicamente asistida']] },
        { id: 'review', t: 'Revíselo cada pocos años', d: 'Y después de un matrimonio, un divorcio, un nacimiento, una muerte, una mudanza o un diagnóstico.', links: [['/es/planificar/#revisar', 'Mantenerlo al día']] },
      ],
    },
  ],
};

const paraSerQuerido = {
  slug: 'loved-one',
  path: '/es/para-un-ser-querido/',
  title: 'Planifico para un ser querido',
  icon: icons.loved,
  description: 'Un camino paso a paso para ayudar a un padre, una pareja o un amigo: mientras está bien, durante una enfermedad grave y las últimas semanas, después de su muerte y en el duelo.',
  lead: 'Empiece donde esté. Cada etapa tiene unas pocas paradas; márquelas a medida que avanza. Si vive lejos, también hay ayuda para eso.',
  phases: [
    {
      h: 'Mientras está bien',
      stops: [
        { id: 'talk', t: 'Empiece la conversación', d: 'Formas suaves de preguntarle qué quiere, con espacio para anotar sus respuestas.', links: [['/es/planificar/#conversacion', 'Preguntas para hablar'], ['/es/hablar-con-un-padre/', 'Hablar con un padre']] },
        { id: 'documents', t: 'Ayúdele a poner sus documentos en orden', d: 'Una directiva anticipada, un testamento, poderes y una lista de dónde está todo.', links: [['/es/directivas-anticipadas/', 'Directivas anticipadas por estado'], ['/es/planificar/#papeles', 'Papeles en orden']] },
        { id: 'far', t: 'Si vive lejos', d: 'Videollamadas, ayuda local, copias de los papeles clave, y ser su representante a distancia.', links: [['/es/hablar-con-un-padre/#lejos', 'Cuando vive lejos']] },
      ],
    },
    {
      h: 'Si está gravemente enfermo',
      stops: [
        { id: 'comfort-care', t: 'Pregunte pronto por los cuidados de alivio', d: 'Los cuidados paliativos pueden empezar en cualquier etapa. Muchas familias desearían haber sabido antes del hospicio.', links: [['/es/cuidados-paliativos-y-hospicio/', 'Paliativos y hospicio']] },
        { id: 'appointments', t: 'Vaya preparado a las citas', d: 'Qué preguntar, y alguien que tome notas.', links: [['/es/imprimibles/preguntas-para-el-medico/', 'Preguntas para el médico']] },
        { id: 'caregiver', t: 'Cuídese como cuidador', d: 'Pida ayuda concreta, y pida cuidados de relevo.', links: [['/es/enfermedad-grave/#cuidador', 'Si usted cuida']] },
        { id: 'choices', t: 'Respete sus decisiones', d: 'Todos los tratamientos, solo cuidados de alivio, o la muerte médicamente asistida donde es legal: la decisión es suya.', links: [['/es/opciones-cerca-del-final/', 'Opciones cerca del final'], ['/es/muerte-medicamente-asistida/familias/', 'Para familias']] },
      ],
    },
    {
      h: 'En las últimas semanas',
      stops: [
        { id: 'expect', t: 'Sepa qué esperar', d: 'Las señales de que la muerte está cerca, para que no le tomen por sorpresa.', links: [['/es/senales-de-que-la-muerte-esta-cerca/', 'Señales de que la muerte está cerca']] },
        { id: 'suffering', t: 'Alivie el sufrimiento y proteja su dignidad', d: 'Insista al equipo médico sobre el dolor y la angustia, y pregúntele qué significa para él o ella la dignidad.', links: [['/es/senales-de-que-la-muerte-esta-cerca/#ayuda', 'Lo que ayuda'], ['/es/ultimas-semanas/#dignidad', 'La dignidad']] },
        { id: 'moment', t: 'Prepárese para el momento de la muerte', d: 'A quién llamar, y la lista a mano.', links: [['/es/primeras-24-horas/', 'Lista de las primeras 24 horas']] },
      ],
    },
    {
      h: 'Después de su muerte',
      stops: [
        { id: 'first-day', t: 'Las primeras 24 horas', d: 'Muy poco es urgente. A quién llamar primero y qué puede esperar.', links: [['/es/despues-de-una-muerte/#primeras-horas', 'Las primeras horas'], ['/es/primeras-24-horas/', 'Lista para imprimir']] },
        { id: 'funeral', t: 'Organice el funeral o la despedida', d: 'Todas las opciones para el cuerpo, sus derechos con las funerarias y lo que cuesta.', links: [['/es/despues-de-una-muerte/#funeral', 'Funeral, entierro y cremación'], ['/es/despues-de-una-muerte/#derechos', 'Sus derechos']] },
        { id: 'eulogy', t: 'Escriba el elogio fúnebre', d: 'Una historia verdadera vale más que una lista de virtudes.', links: [['/es/imprimibles/elogio/', 'Escribir un elogio']] },
        { id: 'estate', t: 'Ocúpese de los trámites y del patrimonio', d: 'Certificados de defunción, avisos a organismos y bancos, cuentas en línea y la sucesión.', links: [['/es/despues-de-una-muerte/#primer-mes', 'El primer mes'], ['/es/cuentas-en-linea/', 'Sus cuentas en línea'], ['/es/despues-de-una-muerte/#sucesion', 'La sucesión']] },
      ],
    },
    {
      h: 'Duelo',
      stops: [
        { id: 'your-grief', t: 'Su propio duelo', d: 'Qué es normal, el duelo antes de la muerte, y después de presenciar una muerte difícil.', links: [['/es/duelo/', 'Duelo']] },
        { id: 'children', t: 'Cómo ayudar a los niños', d: 'Palabras sencillas, respuestas honestas, y libros para recordar que pueden llenar juntos.', links: [['/es/duelo/#ninos', 'Ayudar a los niños'], ['/es/imprimibles/recordar-a-alguien/', 'Libros para recordar']] },
        { id: 'support', t: 'Busque apoyo', d: 'Servicios de duelo del hospicio, grupos de duelo y consejeros.', links: [['/es/duelo/#apoyo', 'Dónde encontrar apoyo'], ['/es/encontrar-ayuda/', 'Ayuda cerca de usted']] },
      ],
    },
  ],
};

const withNote = (page) => ({ ...page, body: page.body.replace('</p>\n</div>\n</section>', `</p>\n${reviewNote}\n</div>\n</section>`) });
const esJourneys = [withNote(journeyPage(paraMi, ES_T)), withNote(journeyPage(paraSerQuerido, ES_T))];

/* ---------- home and search ---------- */

const jcard = (j) => `<a class="jcard" href="${j.path}">
<span class="jcard-icon">${j.icon}</span>
<strong class="jcard-title">${j.title}</strong>
<span class="jcard-text">${j.description}</span>
<span class="jcard-stops">${j.phases.map((p) => p.h).join(' · ')}</span>
<span class="jcard-go">Empiece aquí <span aria-hidden="true">→</span></span>
</a>`;

const inicio = {
  path: '/es/',
  title: 'End of Life Atlas en español',
  crisis: true,
  description: 'Información clara y sin juicios sobre el final de la vida: directivas anticipadas, cuidados paliativos y hospicio, los últimos días, qué hacer después de una muerte y el duelo.',
  body: `
<section class="hero">
<div class="wrap">
<div class="plate">
<img class="plate-map" src="/images/atlas-map.svg" alt="" width="1200" height="620" fetchpriority="high">
<div class="plate-title">
<p class="eyebrow">Un atlas para el final de la vida</p>
<h1>El final de la vida, explicado.</h1>
<p class="lead">Un solo lugar con información confiable sobre el final de la vida, tomada solo de gobiernos, organizaciones sin fines de lucro y universidades. Sin empresas, sin anuncios y sin nada a la venta. <a href="/es/acerca/#fuentes-de-datos">Cómo elegimos las fuentes</a>.</p>
<div class="actions"><a class="btn" href="/es/para-mi/">Planifico para mí</a><a class="btn btn-quiet" href="/es/para-un-ser-querido/">Planifico para un ser querido</a></div>
<p class="small" style="margin:14px 0 0">¿Alguien acaba de morir? <a href="/es/primeras-24-horas/">Las primeras 24 horas</a>.</p>
<p class="small" style="margin:6px 0 0">O <a href="/es/preguntar/">haga una pregunta</a> con sus propias palabras.</p>
<p class="small" style="margin:6px 0 0"><a href="/es/app/">Instale la app</a>: es gratis, y las guías clave funcionan sin conexión.</p>
<p class="small" style="margin:6px 0 0" lang="en">Also in English: <a href="/" hreflang="en">read in English</a>.</p>
<p class="edition">Revisado ${fmtDateEs(site.lastScan)} · Gratis · Sin anuncios</p>
</div>
</div>
<div class="hero-after"></div>
</div>
</section>

<section class="section" aria-labelledby="quien-h">
<div class="wrap">
<p class="eyebrow">Empiece aquí</p>
<h2 id="quien-h">¿Para quién planifica?</h2>
<p class="sub" style="margin-bottom:28px">Elija un camino. Cada uno le lleva paso a paso, en un orden lógico, a las guías y hojas que necesita.</p>
<div class="cards cards-two">${jcard(paraMi)}${jcard(paraSerQuerido)}</div>
<div style="margin-top:28px">${reviewNote}</div>
</div>
</section>

<section class="band section-tight" aria-labelledby="atlas-h">
<div class="wrap">
<h2 id="atlas-h" class="eyebrow">Sobre este atlas</h2>
<div class="trust-row">
<div><strong>Todo en un solo lugar</strong><span class="muted">Planificar, la enfermedad, la muerte, el duelo y los trámites, incluidos los temas difíciles.</span></div>
<div><strong>Sin juicios</strong><span class="muted">Todas las opciones legales, desde todos los tratamientos hasta la muerte médicamente asistida, explicadas con claridad. La decisión es siempre suya.</span></div>
<div><strong>Donde usted viva</strong><span class="muted">Las reglas cambian según el país. Decimos dónde se aplica cada una.</span></div>
<div><strong>Revisado, fechado y sin nada que vender</strong><span class="muted">Cada guía muestra sus fuentes y su fecha de revisión. Un sitio voluntario, sin modelo de negocio, así que sin sesgos.</span></div>
</div>
</div>
</section>

<section class="section" aria-labelledby="guias-h">
<div class="wrap">
<p class="eyebrow">Las guías en español</p>
<h2 id="guias-h">Por dónde empezar</h2>
${linkCards([
    ['/es/planificar/', 'Planificar con tiempo', 'Directivas anticipadas, su representante y la conversación.', 'plan'],
    ['/es/directivas-anticipadas/', 'Directivas anticipadas por estado', 'Formularios oficiales y gratuitos de los 50 estados.', 'doc'],
    ['/es/cuidados-paliativos-y-hospicio/', 'Cuidados paliativos y hospicio', 'La diferencia, y cuándo pedirlos.', 'illness'],
    ['/es/senales-de-que-la-muerte-esta-cerca/', 'Señales de que la muerte está cerca', 'Qué esperar y qué ayuda.', 'lastweeks'],
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'Lo urgente y lo que puede esperar.', 'afterdeath'],
    ['/es/primeras-24-horas/', 'Las primeras 24 horas', 'Una lista para imprimir, también en PDF.', 'printer'],
    ['/es/cuentas-en-linea/', 'Cerrar sus cuentas en línea', 'Redes sociales, correo, nube y pagos, con lista para imprimir.', 'key'],
    ['/es/duelo/', 'Duelo', 'Qué es normal, los niños, y cuándo pedir ayuda.', 'grief'],
    ['/es/muerte-medicamente-asistida/', 'Muerte médicamente asistida', 'Dónde es legal la eutanasia y el suicidio asistido, y cómo funciona.', 'maid'],
    ['/es/enfermedad-grave/', 'Enfermedad grave', 'Cuidados paliativos, hospicio y POLST.', 'illness'],
    ['/es/ultimas-semanas/', 'Las últimas semanas', 'Cómo puede ser morir de verdad.', 'lastweeks'],
    ['/es/testamentos-y-fideicomisos/', 'Testamentos y fideicomisos', 'Qué hace cada documento, por estado y país.', 'wills'],
    ['/es/opciones-para-el-cuerpo/', 'Opciones para el cuerpo', 'Del entierro al compostaje humano.', 'tree'],
    ['/es/lo-que-cuesta/', 'Lo que cuesta', 'Cuidados, hospicio y funerales, con fuentes.', 'costs'],
    ['/es/imprimibles/', 'Hojas para imprimir', 'Doce hojas y una carpeta, gratis.', 'printer'],
    ['/es/preguntar/', 'Haga una pregunta', 'Respuestas de las páginas en español de este sitio.', 'ask'],
  ], 'cards')}
</div>
</section>`,
};

const preguntar = {
  path: '/es/preguntar/',
  title: 'Haga una pregunta',
  description: 'Haga una pregunta sobre el final de la vida y reciba respuestas tomadas solo de las páginas en español de End of Life Atlas. Privado: no se guarda ni se envía nada.',
  body: `
<section class="section"><div class="wrap prose">
<p class="eyebrow">Pregúntele al Atlas</p>
<h1>Haga una pregunta</h1>
<p class="lead" style="margin:20px 0">Escriba su pregunta con sus propias palabras. Las respuestas salen solo de las guías en español de este sitio, con un enlace para leer más.</p>
<p class="small muted">Privado: sus preguntas se quedan en su navegador y no se guardan ni se envían. Esto es información, no consejo médico ni legal. Si está en crisis, llame o envíe un mensaje de texto al 988 en EE. UU. (hay atención en español), o <a href="https://befrienders.org/find-support-now/">busque una línea de ayuda</a>.</p>
<form id="ask-form" class="form ask-form" role="search" aria-label="Pregúntele al Atlas">
<div class="field"><label for="ask-input">Su pregunta</label><input id="ask-input" name="q" type="text" autocomplete="off" required></div>
<button class="btn" type="submit">Preguntar</button>
</form>
<div class="ask-try"><span class="small muted">Pruebe:</span>
<button type="button" class="chip" data-ask="¿Qué hago en las primeras 24 horas después de una muerte?">Las primeras 24 horas</button>
<button type="button" class="chip" data-ask="¿Cuál es la diferencia entre hospicio y cuidados paliativos?">Hospicio o paliativos</button>
<button type="button" class="chip" data-ask="¿Qué es un testamento vital?">Testamento vital</button>
<button type="button" class="chip" data-ask="¿Cómo ayudo a un niño en duelo?">Niños en duelo</button>
</div>
<ol id="ask-log" class="ask-log" aria-live="polite" aria-label="Respuestas"></ol>
<p class="no-print"><button id="ask-clear" type="button" class="btn btn-quiet">Borrar respuestas</button></p>
<noscript><p>El asistente necesita JavaScript. Puede ver <a href="/es/">las guías en español</a>.</p></noscript>
<p class="small muted">También puede <a href="/ask/" hreflang="en">preguntar en inglés</a>: el sitio en inglés tiene más temas.</p>
</div></section>
<script src="/assistant.js" defer></script>`,
};

export const esPages = [inicio, ...esJourneys, planificar, directivas, paliativos, senales, despues, cuentas, listaCuentas, primeras24, duelo, preguntar];
