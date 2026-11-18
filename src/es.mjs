// Spanish pages (/es/). Translations of the core English guides, kept to the
// same facts and sources. Pending review by a native speaker: flagged on
// every page. When an English page changes, update its Spanish pair (see
// ES_PAIRS in layout.mjs).
import { readFileSync } from 'node:fs';
import { esc, fmtDateEs, site } from './layout.mjs';
import { icons } from './icons.mjs';
import { linkCards, cardifyLists } from './ui.mjs';
import { journeyPage } from './journeys.mjs';

const ad = JSON.parse(readFileSync(new URL('./data/advance-directives.json', import.meta.url), 'utf8'));

const EN = ' <span class="muted small">(en inglés)</span>';
const enLink = (href, text) => `<a href="${href}" hreflang="en">${text}</a>${EN}`;

const META = JSON.parse(readFileSync(new URL('./data/printables-meta.json', import.meta.url), 'utf8'));

// Download panel for a Spanish printable: a picture of the page and buttons.
function dlPanelEs(slug) {
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

const reviewNote = `<p class="small muted es-note">Traducción pendiente de revisión por un hablante nativo. ¿Ve un error? <a href="/suggestions/">Díganos</a>.</p>`;

function esGuide({ path, title, description, eyebrow, lead, icon = 'plan', reviewed, sections, related = [], sources = [], crisis = false, faq = [] }) {
  const toc = sections.map((s) => `<li><a href="#${s.id}">${s.h}</a></li>`).join('');
  return {
    path,
    title,
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
<p class="small muted" style="margin:0">Revisión de exactitud: ${fmtDateEs(site.lastScan)} · <a href="/about/#editorial" hreflang="en">Cómo verificamos</a>${EN}</p>
${reviewNote}
</div>
</div>
</section>
<section class="section">
<div class="wrap guide-layout">
<nav class="toc card" aria-label="En esta página"><strong>En esta página</strong><ul>${toc}</ul></nav>
<div class="prose guide-body">
${sections.map((s, i) => `<h2 id="${s.id}" class="num-h"><span class="h-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${s.h}</h2>\n${cardifyLists(s.html)}`).join('\n')}
${related.length ? `<h2 id="relacionado">Relacionado</h2>${linkCards(related)}` : ''}
${sources.length ? `<h2 id="fuentes">Fuentes</h2><ul>${sources.map(([l, u]) => `<li><a href="${esc(u)}">${esc(l)}</a></li>`).join('')}</ul>` : ''}
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
    { id: 'persona', h: 'Nombre a una persona que sepa dónde está todo', html: `<p>Además de su representante y de su albacea, ayuda elegir a una persona de confianza que sepa dónde están sus documentos, contraseñas y deseos, y a quién llamar. Puede ser la misma persona. Dígaselo y anote su nombre en la ${enLink('/checklists/plan-ahead/', 'hoja de planificación')}.</p>` },
    { id: 'conversacion', h: 'Tenga la conversación', html: `<p>El documento importa menos que la conversación que hay detrás. Preguntas útiles:</p>
<ul><li>¿Qué haría que la vida no valiera la pena para usted? ¿Qué estaría dispuesto a pasar para tener más tiempo?</li>
<li>¿Dónde querría estar al final: en casa, en un hospicio, en un hospital?</li>
<li>¿A quién quiere a su lado, y quién quiere que tome las decisiones?</li>
<li>¿Qué quiere para su cuerpo y para su funeral?</li></ul>` },
    { id: 'papeles', h: 'Ponga sus papeles en orden', html: `<p>Las familias pierden semanas buscando cosas. Anote dónde están su testamento, sus pólizas de seguro, sus cuentas bancarias y de jubilación, la escritura o el contrato de alquiler, las contraseñas, y quién debe cuidar de sus hijos y mascotas. Ponga un beneficiario en las cuentas donde se pueda: esas cuentas suelen pasar fuera del proceso sucesorio (probate).</p>
<p>Para saber qué hace cada documento y cómo cambian las reglas según el estado, vea ${enLink('/plan-ahead/wills-and-trusts/', 'testamentos, fideicomisos y papeles')}. ¿Tiene una casa en otro país? Puede necesitar un testamento allí también: vea ${enLink('/plan-ahead/property-abroad/', 'propiedades en el extranjero')}.</p>` },
    { id: 'despues', h: 'Diga lo que quiere para después', html: `<p>Entierro, cremación, entierro ecológico o donación del cuerpo. Un servicio religioso, una celebración de vida, una fiesta o nada. Música, lecturas, quién debe hablar. Vea ${enLink('/plan-ahead/choices-for-the-body/', 'todas las opciones para el cuerpo')}. Dejarlo por escrito es un regalo para quien tenga que organizarlo. La donación del cuerpo normalmente hay que arreglarla con antelación con una facultad de medicina o un programa.</p>` },
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
  .map((s) => `<a class="ocard state-card" href="/plan-ahead/advance-directives/${s.slug}/" hreflang="en"><strong>${esc(s.name)}</strong><span class="muted small">Formularios del estado</span></a>`)
  .join('');

const directivas = {
  path: '/es/directivas-anticipadas/',
  title: 'Directivas anticipadas por estado',
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
<p>Las páginas de cada estado y la mayoría de los formularios oficiales están en inglés. Algunos estados publican su formulario también en español, entre ellos Oregón y Wisconsin (en sus páginas oficiales, enlazadas desde la página de cada estado).</p>
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
<ul><li><a href="https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care">National Institute on Aging (en inglés)</a></li><li><a href="https://www.caringinfo.org/planning/advance-directives/by-state/">CaringInfo: formularios por estado (en inglés)</a></li></ul>
<p class="small muted">Información, no consejo legal. Las instrucciones del propio formulario son la última palabra.</p>
</div>
</section>`,
};

const paliativos = esGuide({
  path: '/es/cuidados-paliativos-y-hospicio/',
  title: 'Cuidados paliativos y hospicio',
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
    ['/serious-illness/', 'Serious illness (en inglés)', 'La guía completa, en inglés.', 'illness'],
  ],
  sources: [
    ['Medicare: beneficio de hospicio (en inglés)', 'https://www.medicare.gov/coverage/hospice-care'],
    ['National Institute on Aging: el final de la vida (en inglés)', 'https://www.nia.nih.gov/health/end-of-life'],
  ],
});

const senales = esGuide({
  path: '/es/senales-de-que-la-muerte-esta-cerca/',
  title: 'Señales de que la muerte está cerca',
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
    ['/last-weeks/', 'The last weeks (en inglés)', 'Lo que es morir de verdad, en inglés.', 'lastweeks'],
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
<p>Hay muchas más opciones, como la cremación con agua, el compostaje humano, el entierro en el mar o ser plantado bajo un árbol: vea ${enLink('/plan-ahead/choices-for-the-body/', 'todas las opciones para el cuerpo')}. La ceremonia puede hacerse semanas después, de la forma que usted quiera.</p>` },
    { id: 'derechos', h: 'Sus derechos con las funerarias', html: `<p>Esté donde esté, pida precios por escrito y detallados antes de aceptar nada. En EE. UU., la <a class="src-link" href="https://consumidor.ftc.gov/articulos/la-regla-sobre-funerales">Regla sobre Funerales de la FTC</a> le da derecho a:</p>
<ul><li>Recibir una lista de precios detallada en persona, y precios por teléfono.</li>
<li>Comprar solo los productos y servicios que quiera.</li>
<li>Usar un ataúd o una urna comprados en otro lugar, sin cargo por manejo.</li>
<li>Rechazar el embalsamamiento en la mayoría de los casos. Pregunte qué exige realmente la ley.</li></ul>
<p>Los precios varían mucho. Llamar a dos o tres funerarias puede ahorrar miles de dólares. Vea ${enLink('/what-it-costs/', 'lo que cuesta')}.</p>` },
    { id: 'primer-mes', h: 'El primer mes', html: `<ul><li>Busque el testamento y contacte al albacea que nombra.</li>
<li>Avise a la agencia de pensiones o seguridad social del gobierno (en EE. UU., el Seguro Social; muchas veces lo hace la funeraria), a otros planes de pensiones, a las aseguradoras y a los bancos.</li>
<li>Reclame el seguro de vida y cualquier beneficio; pregunte por los beneficios para sobrevivientes.</li>
<li>Cancele o transfiera servicios, suscripciones y cuentas. Siga pagando las facturas esenciales.</li>
<li>Redirija el correo, asegure la casa y el auto, y cuide de las mascotas.</li></ul>` },
    { id: 'sucesion', h: 'La sucesión y el patrimonio', html: `<p>El proceso sucesorio (en EE. UU., probate) es el proceso legal para cerrar el patrimonio de una persona; su nombre y sus pasos cambian según el país. Las cuentas con un beneficiario nombrado y los bienes en propiedad conjunta suelen pasar fuera de él, y muchos lugares, entre ellos todos los estados de EE. UU., tienen un proceso más sencillo para patrimonios pequeños. Si el patrimonio es grande o complicado, hable con un abogado de sucesiones.</p>
<p>Si tenía propiedades en otro país, vea ${enLink('/plan-ahead/property-abroad/', 'propiedades en el extranjero')}.</p>` },
  ],
  related: [
    ['/es/primeras-24-horas/', 'Las primeras 24 horas', 'Lista para imprimir.', 'printer'],
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
    { id: 'mas-ayuda', h: 'Cuándo pedir más ayuda', html: `<p>Hable con un médico o un consejero si el duelo sigue siendo tan intenso que no puede con la vida diaria durante muchos meses, o si está bebiendo o usando drogas para sobrellevarlo. Si está pensando en el suicidio, llame o envíe un mensaje de texto al 988 en EE. UU. (<a class="src-link" href="https://988lifeline.org/es/home/">hay atención en español</a>), o <a href="https://findahelpline.com">busque una línea de ayuda en su país</a>.</p>` },
  ],
  related: [
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'Lo urgente y lo que puede esperar.', 'afterdeath'],
    ['/checklists/remembering-someone/', 'Libro para recordar (en inglés)', 'Para niños en duelo, para imprimir.', 'printer'],
  ],
  sources: [['988 Suicide & Crisis Lifeline: ayuda en español', 'https://988lifeline.org/es/home/']],
});

/* ---------- printable: the first 24 hours ---------- */

const primeras24 = {
  path: '/es/primeras-24-horas/',
  title: 'Después de una muerte: las primeras 24 horas',
  seoTitle: 'Qué hacer cuando alguien muere: lista de las primeras 24 horas (para imprimir)',
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
<p class="muted small print-only">De End of Life Atlas · eolatlas.com · Información, no consejo médico ni legal. Traducción pendiente de revisión; para avisar de un error: eolatlas.com/suggestions</p>
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
        { id: 'body', t: 'Decida qué pasará con su cuerpo', d: 'Entierro, cremación, entierro ecológico, bajo un árbol, en el mar, compostaje, donación y más.', links: [E('/plan-ahead/choices-for-the-body/', 'Todas las opciones')] },
        { id: 'gathering', t: 'Planifique la despedida', d: 'Un funeral, una celebración de vida, una fiesta o nada. Música, palabras y personas.', links: [E('/checklists/funeral-planner/', 'Planificador de funeral')] },
      ],
    },
    {
      h: 'Déjelo por escrito',
      stops: [
        { id: 'medical', t: 'Escriba sus deseos médicos', d: 'Una directiva anticipada y un poder para decisiones de salud, en el formulario de su estado o país.', links: [['/es/directivas-anticipadas/', 'El formulario de su estado'], ['/es/planificar/#directiva', 'Directivas anticipadas']] },
        { id: 'will', t: 'Haga un testamento y los documentos del dinero', d: 'Un testamento, un poder financiero y beneficiarios al día. Las reglas cambian según el estado y el país.', links: [E('/plan-ahead/wills-and-trusts/', 'Testamentos y papeles'), E('/plan-ahead/property-abroad/', 'Propiedades en el extranjero')] },
        { id: 'words', t: 'Deje sus palabras', d: 'Cartas para las personas que quiere, y la historia de su vida contada por usted.', links: [E('/checklists/letters-to-leave/', 'Cartas para dejar')] },
        { id: 'one-place', t: 'Ponga todo en un solo lugar', d: 'Dónde están sus documentos, sus cuentas, su vida digital y a quién llamar.', links: [['/es/planificar/#papeles', 'Sus papeles en orden'], E('/checklists/plan-ahead/', 'Hoja de planificación')] },
      ],
    },
    {
      h: 'Compártalo y manténgalo al día',
      stops: [
        { id: 'costs', t: 'Sepa lo que puede costar', d: 'Los cuidados, los funerales y las opciones que cuestan menos.', links: [E('/what-it-costs/', 'Lo que cuesta')] },
        { id: 'tell', t: 'Cuénteselo a su familia', d: 'Dé copias a su representante y a su albacea, y hablen de lo que decidió.', links: [['/es/planificar/#conversacion', 'La conversación']] },
        { id: 'ill', t: 'Si se enferma gravemente', d: 'Cuidados paliativos, hospicio, órdenes médicas y todas las opciones cerca del final.', links: [['/es/cuidados-paliativos-y-hospicio/', 'Paliativos y hospicio'], E('/medical-aid-in-dying/', 'Muerte médicamente asistida')] },
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
        { id: 'talk', t: 'Empiece la conversación', d: 'Formas suaves de preguntarle qué quiere, con espacio para anotar sus respuestas.', links: [['/es/planificar/#conversacion', 'Preguntas para hablar'], E('/plan-ahead/talking-with-a-parent/', 'Hablar con un padre')] },
        { id: 'documents', t: 'Ayúdele a poner sus documentos en orden', d: 'Una directiva anticipada, un testamento, poderes y una lista de dónde está todo.', links: [['/es/directivas-anticipadas/', 'Directivas anticipadas por estado'], ['/es/planificar/#papeles', 'Papeles en orden']] },
        { id: 'far', t: 'Si vive lejos', d: 'Videollamadas, ayuda local, copias de los papeles clave, y ser su representante a distancia.', links: [E('/plan-ahead/talking-with-a-parent/#far', 'Cuando vive lejos')] },
      ],
    },
    {
      h: 'Si está gravemente enfermo',
      stops: [
        { id: 'comfort-care', t: 'Pregunte pronto por los cuidados de alivio', d: 'Los cuidados paliativos pueden empezar en cualquier etapa. Muchas familias desearían haber sabido antes del hospicio.', links: [['/es/cuidados-paliativos-y-hospicio/', 'Paliativos y hospicio']] },
        { id: 'appointments', t: 'Vaya preparado a las citas', d: 'Qué preguntar, y alguien que tome notas.', links: [E('/checklists/questions-for-the-doctor/', 'Preguntas para el médico')] },
        { id: 'caregiver', t: 'Cuídese como cuidador', d: 'Pida ayuda concreta, y pida cuidados de relevo.', links: [E('/serious-illness/#caregivers', 'Si usted cuida')] },
        { id: 'choices', t: 'Respete sus decisiones', d: 'Todos los tratamientos, solo cuidados de alivio, o la muerte médicamente asistida donde es legal: la decisión es suya.', links: [E('/serious-illness/#choices', 'Opciones cerca del final'), E('/medical-aid-in-dying/families/', 'Para familias')] },
      ],
    },
    {
      h: 'En las últimas semanas',
      stops: [
        { id: 'expect', t: 'Sepa qué esperar', d: 'Las señales de que la muerte está cerca, para que no le tomen por sorpresa.', links: [['/es/senales-de-que-la-muerte-esta-cerca/', 'Señales de que la muerte está cerca']] },
        { id: 'suffering', t: 'Alivie el sufrimiento y proteja su dignidad', d: 'Insista al equipo médico sobre el dolor y la angustia, y pregúntele qué significa para él o ella la dignidad.', links: [['/es/senales-de-que-la-muerte-esta-cerca/#ayuda', 'Lo que ayuda'], E('/last-weeks/#dignity', 'La dignidad')] },
        { id: 'moment', t: 'Prepárese para el momento de la muerte', d: 'A quién llamar, y la lista a mano.', links: [['/es/primeras-24-horas/', 'Lista de las primeras 24 horas']] },
      ],
    },
    {
      h: 'Después de su muerte',
      stops: [
        { id: 'first-day', t: 'Las primeras 24 horas', d: 'Muy poco es urgente. A quién llamar primero y qué puede esperar.', links: [['/es/despues-de-una-muerte/#primeras-horas', 'Las primeras horas'], ['/es/primeras-24-horas/', 'Lista para imprimir']] },
        { id: 'funeral', t: 'Organice el funeral o la despedida', d: 'Todas las opciones para el cuerpo, sus derechos con las funerarias y lo que cuesta.', links: [['/es/despues-de-una-muerte/#funeral', 'Funeral, entierro y cremación'], ['/es/despues-de-una-muerte/#derechos', 'Sus derechos']] },
        { id: 'eulogy', t: 'Escriba el elogio fúnebre', d: 'Una historia verdadera vale más que una lista de virtudes.', links: [E('/checklists/eulogy/', 'Escribir un elogio')] },
        { id: 'estate', t: 'Ocúpese de los trámites y del patrimonio', d: 'Certificados de defunción, avisos a organismos y bancos, y la sucesión.', links: [['/es/despues-de-una-muerte/#primer-mes', 'El primer mes'], ['/es/despues-de-una-muerte/#sucesion', 'La sucesión']] },
      ],
    },
    {
      h: 'Duelo',
      stops: [
        { id: 'your-grief', t: 'Su propio duelo', d: 'Qué es normal, el duelo antes de la muerte, y después de presenciar una muerte difícil.', links: [['/es/duelo/', 'Duelo']] },
        { id: 'children', t: 'Cómo ayudar a los niños', d: 'Palabras sencillas, respuestas honestas, y libros para recordar que pueden llenar juntos.', links: [['/es/duelo/#ninos', 'Ayudar a los niños'], E('/checklists/remembering-someone/', 'Libros para recordar')] },
        { id: 'support', t: 'Busque apoyo', d: 'Servicios de duelo del hospicio, grupos de duelo y consejeros.', links: [['/es/duelo/#apoyo', 'Dónde encontrar apoyo'], E('/finding-help/', 'Ayuda cerca de usted')] },
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
  description: 'Información clara y sin juicios sobre el final de la vida: directivas anticipadas, cuidados paliativos y hospicio, los últimos días, qué hacer después de una muerte y el duelo.',
  body: `
<section class="page-hero">
<div class="wrap prose">
<p class="eyebrow">En español</p>
<h1>El final de la vida, explicado</h1>
<p class="lead" style="margin-top:20px">Un solo lugar, gratuito y sin juicios, para entender el final de la vida: planificar, los cuidados, los últimos días, lo que hay que hacer después y el duelo. Para usted, o para alguien a quien quiere.</p>
${reviewNote}
</div>
</section>
<section class="section">
<div class="wrap">
<h2>Por dónde empezar</h2>
<div class="cards cards-two" style="margin-top:20px">${jcard(paraMi)}${jcard(paraSerQuerido)}</div>
<h2 style="margin-top:56px">Las guías en español</h2>
${linkCards([
    ['/es/planificar/', 'Planificar con tiempo', 'Directivas anticipadas, su representante y la conversación.', 'plan'],
    ['/es/directivas-anticipadas/', 'Directivas anticipadas por estado', 'Formularios oficiales y gratuitos de los 50 estados.', 'plan'],
    ['/es/cuidados-paliativos-y-hospicio/', 'Cuidados paliativos y hospicio', 'La diferencia, y cuándo pedirlos.', 'illness'],
    ['/es/senales-de-que-la-muerte-esta-cerca/', 'Señales de que la muerte está cerca', 'Qué esperar y qué ayuda.', 'lastweeks'],
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'Lo urgente y lo que puede esperar.', 'afterdeath'],
    ['/es/primeras-24-horas/', 'Las primeras 24 horas', 'Una lista para imprimir, también en PDF.', 'printer'],
    ['/es/duelo/', 'Duelo', 'Qué es normal, los niños, y cuándo pedir ayuda.', 'grief'],
    ['/es/preguntar/', 'Haga una pregunta', 'Respuestas de las páginas en español de este sitio.', 'ask'],
  ])}
<div class="notice" style="margin-top:48px"><p style="margin:0"><strong>Solo en inglés por ahora:</strong> ${enLink('/medical-aid-in-dying/', 'la muerte médicamente asistida y la eutanasia')}, ${enLink('/plan-ahead/wills-and-trusts/', 'testamentos y fideicomisos')}, ${enLink('/what-it-costs/', 'los costos')}, ${enLink('/plan-ahead/choices-for-the-body/', 'las opciones para el cuerpo')} y ${enLink('/checklists/', 'las demás hojas para imprimir')}.</p></div>
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
<p class="small muted">Privado: sus preguntas se quedan en su navegador y no se guardan ni se envían. Esto es información, no consejo médico ni legal. Si está en crisis, llame o envíe un mensaje de texto al 988 en EE. UU. (hay atención en español), o <a href="https://findahelpline.com">busque una línea de ayuda</a>.</p>
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

export const esPages = [inicio, ...esJourneys, planificar, directivas, paliativos, senales, despues, primeras24, duelo, preguntar];
