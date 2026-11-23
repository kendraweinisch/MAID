// Spanish: medical aid in dying (hub, process, families, Switzerland, and
// one page per place). Same facts and sources as the English pages; the
// Spanish wording for each place lives in src/data/places.json under "es".
import { readFileSync } from 'node:fs';
import { esc, fmtDateEs, fmtDateEsShort, site, pair, sourcesNoteEs } from './layout.mjs';
import { linkCards } from './ui.mjs';
import { esGuide, enLink, reviewNote } from './es.mjs';

const data = JSON.parse(readFileSync(new URL('./data/places.json', import.meta.url), 'utf8'));
const MAID = '/medical-aid-in-dying';
export const MAID_ES = '/es/muerte-medicamente-asistida';

const pill = (p) => `<span class="pill pill-${p.status}">${esc(p.es.statusLabel)}</span>`;
const rows = (list) =>
  list
    .map((p) => `<tr><td><a href="${MAID_ES}/lugares/${p.slug}/">${esc(p.es.name)}</a></td><td>${pill(p)}</td><td>${esc(p.es.since)}</td><td>${esc(p.es.nonResidents)}</td><td class="muted">${fmtDateEsShort(p.verified)}</td></tr>`)
    .join('\n');
const table = (list, caption) => `<div class="table-box" tabindex="0" role="region" aria-label="${esc(caption)}"><table>
<caption class="sr-only">${esc(caption)}</caption>
<thead><tr><th scope="col">Lugar</th><th scope="col">Situación</th><th scope="col">Desde</th><th scope="col">¿Abierto a no residentes?</th><th scope="col">Última verificación</th></tr></thead>
<tbody>
${rows(list)}
</tbody></table></div>`;

const bar = (label, pct) => `<li><div class="bar-label"><span>${label}</span><strong>${pct}%</strong></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${pct}%"></div></div></li>`;

function hub() {
  const us = data.places.filter((p) => p.region === 'us');
  const world = data.places.filter((p) => p.region === 'world');
  return {
    path: `${MAID_ES}/`,
    title: 'Muerte médicamente asistida',
    seoTitle: 'Eutanasia y suicidio asistido: dónde es legal',
    article: { modified: site.lastScan },
    crisis: true,
    faq: [
      ['¿Cuál es la diferencia entre la eutanasia y el suicidio asistido?', 'En la eutanasia, un médico o una enfermera administra el medicamento, normalmente por inyección. En el suicidio asistido, también llamado muerte médicamente asistida o muerte asistida autoadministrada, la persona toma el medicamento por sí misma. Algunos países permiten las dos; los estados de EE. UU. solo permiten la segunda.'],
      ['¿Es legal la eutanasia en Estados Unidos?', 'No. Ningún estado de EE. UU. permite que un profesional administre el medicamento. En los estados con leyes de muerte médicamente asistida, un adulto que cumpla los requisitos y tenga una enfermedad terminal puede recibir una receta de un medicamento que toma por sí mismo.'],
      ['¿Dónde es legal la eutanasia?', 'La eutanasia (que un profesional administre el medicamento) está permitida en lugares como Canadá, los Países Bajos, Bélgica, España y Nueva Zelanda. Suiza permite el suicidio asistido, pero no la eutanasia. Consulte la página de cada lugar para ver su situación actual.'],
    ],
    description: 'Dónde son legales la eutanasia, el suicidio asistido y la muerte médicamente asistida en EE. UU. y en el mundo, qué significa cada término, quién cumple los requisitos y cómo funciona el proceso.',
    body: `
<section class="page-hero">
<div class="wrap prose">
<p class="eyebrow">Una opción entre muchas</p>
<h1>Muerte médicamente asistida</h1>
<p class="lead" style="margin-top:20px">En algunos lugares, un adulto con una enfermedad terminal que puede tomar sus propias decisiones puede pedir a un médico un medicamento para terminar su vida en paz. Aquí está dónde es legal, quién cumple los requisitos y cómo funciona.</p>
<p class="small muted" style="margin:0">Leyes revisadas: ${fmtDateEs(site.lastScan)} · Solo cubrimos procesos legales.</p>
${reviewNote}
</div>
</section>
<section class="section"><div class="wrap">
<div class="prose" style="margin-bottom:48px">
<h2 id="terminos">Cómo se llama</h2>
<p>Las personas, las leyes y los países usan palabras distintas. No todas significan exactamente lo mismo:</p>
<div class="table-box" tabindex="0" role="region" aria-label="Términos para la muerte asistida"><table style="min-width:560px">
<caption class="sr-only">Términos para la muerte asistida y dónde se usan</caption>
<thead><tr><th scope="col">Término</th><th scope="col">Qué suele significar</th><th scope="col">Dónde lo oirá</th></tr></thead>
<tbody>
<tr><td><strong>Muerte médicamente asistida</strong> (<span lang="en">medical aid in dying</span>)</td><td>Un médico receta un medicamento que la persona toma por sí misma.</td><td>Leyes y grupos médicos de EE. UU.</td></tr>
<tr><td><strong>Muerte digna</strong> (<span lang="en">Death with Dignity</span>)</td><td>Lo mismo, como nombre de varias leyes estatales de EE. UU.</td><td>Oregón, Washington, Maine, DC</td></tr>
<tr><td><strong>Suicidio asistido</strong></td><td>La persona toma el medicamento por sí misma, con ayuda para obtenerlo.</td><td>Suiza; común en noticias y búsquedas</td></tr>
<tr><td><strong>Eutanasia</strong></td><td>Un médico o una enfermera administra el medicamento, normalmente por inyección.</td><td>Países Bajos, Bélgica, España; muy usado en búsquedas</td></tr>
<tr><td><strong>Asistencia médica para morir</strong> (<span lang="en">MAID</span>)</td><td>Abarca las dos: la persona lo toma, o un profesional lo administra.</td><td>Canadá</td></tr>
<tr><td><strong>Muerte asistida</strong>, <strong>muerte voluntaria asistida</strong></td><td>El término general, para una o ambas.</td><td>Reino Unido; Australia (muerte voluntaria asistida)</td></tr>
</tbody></table></div>
<ul>
<li><strong>¿Es legal la eutanasia en EE. UU.?</strong> No. Ningún estado permite que un profesional administre el medicamento. En los estados con leyes de muerte médicamente asistida, la persona debe tomarlo por sí misma.</li>
<li><strong>¿Dónde está permitida la eutanasia?</strong> En lugares como Canadá, los Países Bajos, Bélgica, España y Nueva Zelanda, un profesional puede administrar el medicamento. Suiza permite el suicidio asistido, pero no la eutanasia.</li>
<li><strong>¿Por qué tantos nombres?</strong> A algunas personas la palabra "suicidio" no les parece adecuada para alguien que ya se está muriendo y elige cómo; otras la usan sin más. Este sitio usa el término de la ley de cada lugar y los describe todos sin juzgar.</li></ul>
<h2 id="por-que">Por qué lo piden las personas</h2>
<p>Oregón ha publicado datos de cada persona que ha usado su ley desde 1998. En 2025, las preocupaciones que dieron las personas fueron:</p>
<ul class="bars bars-plain" aria-label="Preocupaciones que dieron las personas, Oregón, 2025, porcentaje de personas">
${bar('Perder su autonomía', 89)}
${bar('Poder hacer cada vez menos las cosas que disfrutaban', 89)}
${bar('Perder su dignidad', 65)}
${bar('Perder el control de las funciones del cuerpo', 53)}
${bar('Ser una carga para la familia, los amigos o los cuidadores', 40)}
${bar('Un control insuficiente del dolor, o la preocupación por ello', 37)}
</ul>
<p>Para la mayoría, se trata de cómo tendrían que vivir sus últimas semanas, no solo del dolor.</p>
<p class="small muted">Fuente: <a href="https://www.oregon.gov/oha/ph/providerpartnerresources/evaluationresearch/deathwithdignityact/Documents/year28.pdf">Autoridad de Salud de Oregón, resumen de datos de 2025 de la Ley de Muerte Digna (PDF, en inglés)</a></p>
</div>
<div style="margin-bottom:56px">${linkCards([
      [`${MAID_ES}/proceso/`, 'Cómo funciona el proceso', 'Los pasos, y por qué empezar pronto.', 'steps'],
      [`${MAID_ES}/familias/`, 'Para familias', 'Hablar de ello, el día, los seguros y el duelo.', 'loved'],
      [`${MAID_ES}/suiza/`, 'Ir a Suiza', 'Para quienes viven en un país sin ley, y los riesgos legales.', 'globe'],
      ['/es/cuidados-paliativos-y-hospicio/', 'Cuidados paliativos y hospicio', 'Disponibles decida lo que decida.', 'illness'],
    ])}</div>
<h2>Estados Unidos</h2>
<p class="sub">Legal en ${us.length - 1} estados y el Distrito de Columbia. Solo Oregón y Vermont aceptan a personas que viven en otro lugar.</p>
${table(us, 'Estados Unidos')}
<h2 style="margin-top:56px">En el mundo</h2>
${table(world, 'En el mundo')}
<div id="otros" class="card" style="margin-top:40px">
<h3>¿No ve su país?</h3>
<p>Estamos investigando: ${data.researchingEs.map(esc).join(', ')}.</p>
<p class="muted" style="margin:0">Sea cual sea la ley donde usted vive, los <a href="/es/cuidados-paliativos-y-hospicio/">cuidados paliativos y el hospicio</a> están disponibles, y pueden marcar una gran diferencia.</p>
</div>
</div></section>`,
  };
}

function term(p) {
  if (p.region === 'us') return 'Muerte médicamente asistida (suicidio asistido)';
  return { canada: 'Eutanasia y asistencia médica para morir (MAID)', switzerland: 'Suicidio asistido', 'england-and-wales': 'Muerte asistida', france: 'Ayuda para morir' }[p.slug] || 'Eutanasia y muerte asistida';
}

function placePageEs(p) {
  const e = p.es;
  const residentsOnly = p.region === 'us' && /residents only/.test(p.nonResidents);
  const sources = p.sources.length
    ? `<ul>${p.sources.map((s) => `<li><a href="${esc(s.url)}">${esc(s.label)}</a> <span class="muted small">(en inglés)</span></li>`).join('')}</ul>`
    : '<p class="muted">Estamos agregando las fuentes oficiales.</p>';
  pair(`${MAID}/places/${p.slug}/`, `${MAID_ES}/lugares/${p.slug}/`);
  return {
    path: `${MAID_ES}/lugares/${p.slug}/`,
    title: `Muerte médicamente asistida en ${e.name}`,
    seoTitle: p.region === 'us' ? `Suicidio asistido en ${e.name}: la ley de muerte asistida` : `${term(p)} en ${e.name}: ¿es legal?`,
    article: { modified: p.verified || site.lastScan },
    crisis: true,
    description: `${term(p)} en ${e.name}: ${e.statusLabel}. ${e.summary}`,
    body: `
<section class="section">
<div class="wrap prose">
<p class="small"><a href="${MAID_ES}/">Muerte médicamente asistida: todos los lugares</a></p>
<h1>${esc(e.name)}</h1>
<p style="margin:16px 0">${pill(p)}</p>
<p class="lead">${esc(e.summary)}</p>
<dl class="facts">
<dt>Situación</dt><dd>${esc(e.statusLabel)}</dd>
<dt>Ley</dt><dd>${p.sources.length ? `<a class="src-link" href="${esc(p.sources[0].url)}" lang="en">${esc(p.law)}</a>` : `<span lang="en">${esc(p.law)}</span>`}</dd>
<dt>Desde</dt><dd>${esc(e.since)}</dd>
<dt>¿Abierto a no residentes?</dt><dd>${esc(e.nonResidents)}</dd>
<dt>Última verificación</dt><dd>${fmtDateEs(p.verified)}</dd>
</dl>
${residentsOnly ? `<p>Si no vive aquí, <a href="${MAID_ES}/lugares/oregon/">Oregón</a> y <a href="${MAID_ES}/lugares/vermont/">Vermont</a> aceptan a personas de otros estados.</p>` : ''}
${p.status === 'not-legal' ? `<p>Ayudar a alguien a morir puede ser delito aquí, incluido acompañarle al extranjero. Lea <a href="${MAID_ES}/suiza/">ir a Suiza</a> y hable antes con un abogado.</p>` : ''}
<div class="notice"><strong>Detalles que aún estamos verificando:</strong> los plazos de espera, cuántos profesionales deben estar de acuerdo, las reglas de autoadministración, los costos habituales y la cobertura de los seguros. Hasta que estén comprobados, confírmelos con las fuentes oficiales de abajo o con su médico.</div>
${reviewNote}
<h2>Fuentes</h2>
${sourcesNoteEs()}
${sources}
<h2>Siguientes pasos</h2>
${linkCards([
      [`${MAID_ES}/proceso/`, 'Cómo funciona el proceso', 'Los pasos habituales.', 'steps'],
      ['/es/cuidados-paliativos-y-hospicio/', 'Cuidados paliativos y hospicio', 'Cuidados de alivio, decida lo que decida.', 'illness'],
      [`${MAID_ES}/familias/`, 'Una guía para familias', 'Qué esperar, y el duelo.', 'loved'],
      ['/es/preguntar/', 'Haga una pregunta', 'Respuestas de este sitio.', 'ask'],
    ])}
</div>
</section>`,
  };
}

const proceso = esGuide({
  path: `${MAID_ES}/proceso/`,
  title: 'Cómo funciona el proceso',
  eyebrow: 'Muerte médicamente asistida',
  icon: 'steps',
  crisis: true,
  description: 'Los pasos habituales de la muerte médicamente asistida en los estados de EE. UU., y por qué importa empezar pronto.',
  lead: 'El proceso tiene varios pasos, y la enfermedad puede avanzar más rápido que los trámites. Esta es la forma habitual en los estados de EE. UU.; los detalles cambian, así que consulte la página de su estado.',
  sections: [
    { id: 'pasos', h: 'Los pasos habituales', icon: 'steps', html: `<ol class="trail">
<li class="stop"><span class="stop-n" aria-hidden="true">1</span><div class="stop-card"><h3>Primera solicitud</h3><p>Dígale a su médico que quiere pedirlo. No todos los médicos, hospitales u hospicios participan.</p></div></li>
<li class="stop"><span class="stop-n" aria-hidden="true">2</span><div class="stop-card"><h3>Segunda opinión</h3><p>Un segundo profesional confirma el diagnóstico, el pronóstico y su capacidad para decidir.</p></div></li>
<li class="stop"><span class="stop-n" aria-hidden="true">3</span><div class="stop-card"><h3>Plazo de espera</h3><p>La mayoría de los estados exigen un tiempo entre las solicitudes. Algunos lo acortan para personas cercanas a la muerte.</p></div></li>
<li class="stop"><span class="stop-n" aria-hidden="true">4</span><div class="stop-card"><h3>Solicitud por escrito</h3><p>Un formulario firmado, normalmente con testigos, y luego la receta.</p></div></li>
<li class="stop"><span class="stop-n" aria-hidden="true">5</span><div class="stop-card"><h3>Decidir si y cuándo</h3><p>Tener la receta no significa que deba usarla.</p></div></li>
</ol>` },
    { id: 'pronto', h: 'Por qué importa empezar pronto', icon: 'clock', html: `<p>Toda persona que lo pide debe poder tomar y comunicar su propia decisión en cada paso. Si la enfermedad le quita esa capacidad, el proceso se detiene. Empezar la conversación pronto mantiene la opción abierta, aunque nunca la use.</p>` },
    { id: 'si-no', h: 'Si su médico no quiere participar', icon: 'help', html: `<p>Los médicos y los hospicios pueden negarse. Pida que le deriven a uno que sí participe. Los equipos de hospicio y los grupos locales que apoyan la muerte médicamente asistida suelen saber qué profesionales participan donde usted vive.</p>` },
    { id: 'hospicio', h: 'Junto con el hospicio', icon: 'bed', html: `<p>Muchas personas que piden la muerte médicamente asistida también están en un hospicio. Los <a href="/es/cuidados-paliativos-y-hospicio/">cuidados paliativos y el hospicio</a> siguen disponibles decida lo que decida.</p>` },
  ],
  related: [
    [`${MAID_ES}/`, 'Dónde es legal', 'Todos los lugares que cubrimos.', 'maid'],
    [`${MAID_ES}/familias/`, 'Para familias', 'Qué esperar.', 'loved'],
  ],
});

const familias = esGuide({
  path: `${MAID_ES}/familias/`,
  title: 'Muerte médicamente asistida: para familias',
  eyebrow: 'Muerte médicamente asistida',
  icon: 'loved',
  crisis: true,
  description: 'Para las familias de alguien que considera la muerte médicamente asistida: hablar de ello, el día, los certificados de defunción, los seguros y el duelo.',
  lead: 'Cuando alguien a quien quiere considera la muerte médicamente asistida, puede sentir alivio, miedo, duelo y desacuerdo a la vez. Todo eso es normal.',
  sections: [
    { id: 'hablar', h: 'Hablar de ello', icon: 'talk', html: `<ul><li>Pregúntele qué quiere y por qué, y escuche antes de responder.</li>
<li>La decisión es suya. Todas las leyes exigen que la persona lo pida libremente, sin presión de nadie.</li>
<li>Pregúntele si quiere que usted participe, y cómo.</li>
<li>Los equipos de hospicio, los trabajadores sociales, los capellanes y las doulas del final de la vida pueden ayudar a las familias con estas conversaciones.</li></ul>` },
    { id: 'dia', h: 'Planificar el día', icon: 'calendar', html: `<p>Muchas personas eligen dónde estarán, quién les acompañará y qué oirán y verán. Pregunte a su equipo de cuidados qué apoyo hay ese día donde usted vive.</p>` },
    { id: 'seguros', h: 'Certificados de defunción y seguros', icon: 'doc', html: `<p>En la mayoría de los estados de EE. UU. con estas leyes, el certificado de defunción indica la enfermedad de fondo. Las leyes de EE. UU. sobre la muerte médicamente asistida suelen decir que usarlas no cuenta como suicidio. Consulte la ley de su estado y la póliza de seguro concreta antes de contar con ello.</p>` },
    { id: 'duelo', h: 'El duelo después', icon: 'grief', html: `<p>El duelo después de una muerte planificada puede incluir alivio y culpa al mismo tiempo. Los programas de duelo de los hospicios suelen ser gratuitos para las familias. Vea nuestra <a href="/es/duelo/">guía sobre el duelo</a>.</p>` },
  ],
  related: [
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'Los pasos prácticos.', 'afterdeath'],
    ['/es/duelo/', 'Duelo', 'Para adultos y niños.', 'grief'],
  ],
});

const suiza = esGuide({
  path: `${MAID_ES}/suiza/`,
  title: 'Ir a Suiza',
  eyebrow: 'Muerte médicamente asistida',
  icon: 'globe',
  crisis: true,
  description: 'Cómo funciona la muerte asistida en Suiza para personas de otros países, costos aproximados y los riesgos legales para quienes acompañan.',
  lead: 'Suiza es la principal opción para quienes viven en un país sin ley. Es un proceso largo y costoso, y puede suponer un riesgo legal para quien le ayude.',
  sections: [
    { id: 'por-que', h: 'Por qué Suiza', icon: 'scale', html: `<p>Según el artículo 115 del Código Penal suizo, ayudar a alguien a morir por suicidio solo es delito cuando el motivo es egoísta. Organizaciones privadas llevan el proceso, y algunas aceptan a personas de otros países. Vea nuestra <a href="${MAID_ES}/lugares/switzerland/">página sobre Suiza</a> para las fuentes.</p>` },
    { id: 'que-implica', h: 'Qué suele implicar', icon: 'steps', html: `<ul><li>Hacerse socio de una organización y enviar su historial médico, que a menudo hay que traducir.</li>
<li>Una revisión de su caso, y una evaluación de un médico suizo antes de aprobar nada.</li>
<li>Viajar a Suiza mientras todavía puede viajar.</li>
<li>Los arreglos para después: la cremación en Suiza o el traslado del cuerpo a casa.</li></ul>` },
    { id: 'costos', h: 'Costos aproximados', icon: 'costs', html: `<p>Cada organización fija sus propias tarifas, y el total suele llegar a miles de francos suizos. Pida por escrito el importe completo y actual: la cuota de socio, la evaluación del médico, la cremación y los trámites. El viaje, el alojamiento y los informes médicos de su país aumentan el costo. Pregunte también si reducen las tarifas a personas con pocos recursos.</p>` },
    { id: 'riesgo', h: 'Riesgo legal para familiares y amigos', icon: 'shield', html: `<p>A sus acompañantes se les aplica la ley del país donde viven, no solo la ley suiza. En algunos países, como Inglaterra y Gales, ayudar a alguien a viajar para morir puede investigarse como ayuda al suicidio. Hable con un abogado de su país antes de planificar el viaje.</p>` },
  ],
  sources: [['Oficina Federal de Justicia de Suiza: las distintas formas de eutanasia (en inglés)', 'https://www.bj.admin.ch/en/the-various-forms-of-euthanasia'], ['Código Penal suizo (Fedlex), artículo 115 (en inglés)', 'https://www.fedlex.admin.ch/eli/cc/54/757_781_799/en']],
  related: [
    [`${MAID_ES}/proceso/`, 'Cómo funciona el proceso', 'Los pasos habituales.', 'steps'],
    [`${MAID_ES}/`, 'Dónde es legal', 'Todos los lugares que cubrimos.', 'maid'],
  ],
});

pair(`${MAID}/`, `${MAID_ES}/`);
pair(`${MAID}/process/`, `${MAID_ES}/proceso/`);
pair(`${MAID}/families/`, `${MAID_ES}/familias/`);
pair(`${MAID}/switzerland/`, `${MAID_ES}/suiza/`);

export const esMaidPages = [hub(), proceso, familias, suiza, ...data.places.map(placePageEs)];
