// Spanish: every choice for the body, what it costs, and the cost database.
// Same facts and sources as the English pages.
import { pair } from './layout.mjs';
import { icons } from './icons.mjs';
import { dirCard } from './ui.mjs';
import { esGuide } from './es.mjs';

const L = (href, text) => `<a class="src-link" href="${href}">${text}</a>`;
const EN = ' (en inglés)';
const MAID_ES = '/es/muerte-medicamente-asistida';

const CUERPO = '/es/opciones-para-el-cuerpo/';
const opcionesCuerpo = [
  ['tradicional', 'burial', 'Entierro tradicional', 'Un ataúd en una parcela de cementerio, normalmente tras un velatorio.'],
  ['mausoleo', 'mausoleum', 'Mausoleo o columbario', 'Sobre la tierra, para un cuerpo o para cenizas.'],
  ['ecologico', 'green', 'Entierro ecológico', 'Sin embalsamar ni bóveda: de vuelta a la tierra.'],
  ['arbol', 'tree', 'Bajo un árbol', 'Entierro en un bosque, urnas para árboles y bosques conmemorativos.'],
  ['cremacion', 'cremation', 'Cremación', 'La opción más común en EE. UU.'],
  ['agua', 'water', 'Cremación con agua', 'Hidrólisis alcalina; legal en unos 28 estados de EE. UU.'],
  ['compostaje', 'compost', 'Compostaje humano', 'Se convierte en tierra en semanas; legal en 14 estados de EE. UU.'],
  ['mar', 'sea', 'Entierro en el mar', 'Un cuerpo o las cenizas, con reglas sencillas.'],
  ['cenizas', 'ashes', 'Qué hacer con las cenizas', 'Guardarlas, enterrarlas, esparcirlas, plantarlas o repartirlas.'],
  ['donacion', 'donation', 'Donación del cuerpo y de órganos', 'Ayudar a otros, o a la ciencia médica.'],
  ['en-casa', 'home', 'Un funeral en casa', 'Cuidar primero de la persona en casa.'],
];
const tarjetas = `<div class="cards cards-tight">${opcionesCuerpo
  .map(([id, icon, name, line]) => `<a class="ocard" href="${CUERPO}#${id}">${icons[icon]}<strong>${name}</strong><span class="muted small">${line}</span></a>`)
  .join('')}</div>`;

const barra = (name, v, best) => `<li${best ? ' class="bar-best"' : ''}><div class="bar-label"><span>${name}</span><strong>${v} kg CO₂e</strong></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${Math.round((v / 181) * 100)}%"></div></div></li>`;

export const cuerpo = esGuide({
  path: CUERPO,
  title: 'Todas las opciones para el cuerpo',
  seoTitle: 'Entierro ecológico, compostaje humano, cremación con agua, entierro en el mar: todas las opciones',
  eyebrow: 'Planificar',
  icon: 'tree',
  description: 'Todas las opciones para el cuerpo después de la muerte: entierro tradicional, mausoleos, entierro ecológico, bajo un árbol, cremación, cremación con agua, compostaje humano, entierro en el mar, las cenizas y la donación.',
  lead: 'Hay muchas más opciones que el entierro o la cremación. Aquí está cada una, cómo funciona y dónde está permitida, para que pueda elegir la que le corresponde.',
  glance: [['11', 'Opciones que cubrimos aquí, del entierro al compostaje'], ['40 kg', 'CO₂e del entierro natural, el menor en el estudio de DELA'], ['14 estados', 'Permitían el compostaje humano en enero de 2026']],
  sections: [
    { id: 'resumen', h: 'De un vistazo', icon: 'steps', html: `${tarjetas}
<p>Casi cualquiera de estas puede ir con un funeral, una celebración de vida, un funeral en casa o ninguna ceremonia. Anote su elección en el <a href="/es/imprimibles/funeral/">planificador de funeral</a>.</p>` },
    { id: 'tradicional', h: 'Entierro tradicional', icon: 'burial', facts: ['Suele ser lo más caro', 'Embalsamar rara vez lo exige la ley', 'La bóveda es una regla del cementerio'], html: `<p>El cuerpo se coloca en un ataúd y se entierra en una parcela de cementerio, normalmente después de un velatorio. La ley rara vez exige embalsamar, aunque algunas funerarias lo exigen para un velatorio abierto al público. Muchos cementerios exigen una bóveda o un revestimiento alrededor del ataúd; es una regla del cementerio, no de la ley. Suele ser la opción más cara cuando se suman la parcela, la apertura de la tumba y la lápida. Vea <a href="/es/lo-que-cuesta/">lo que cuesta</a>.</p>` },
    { id: 'mausoleo', h: 'Mausoleos y columbarios', icon: 'mausoleum', facts: ['Sobre la tierra', 'Un nicho para cenizas cuesta mucho menos que una cripta'], html: `<p>La sepultura en mausoleo coloca el ataúd en una cripta sobre la tierra. Un columbario es un muro o un edificio con pequeños nichos para urnas con cenizas. Los dos existen en muchos cementerios, y un nicho de columbario suele costar mucho menos que una cripta.</p>` },
    { id: 'ecologico', h: 'Entierro ecológico (natural)', icon: 'green', facts: ['Sin embalsamar', 'Sin bóveda de concreto', 'Algunos terrenos son reservas naturales'], html: `<p>El cuerpo se entierra sin embalsamar, en un sudario o un ataúd sencillo y biodegradable, sin bóveda de concreto, para que vuelva a la tierra. Algunos terrenos de entierro ecológico también son reservas naturales, con la tierra protegida para siempre. Algunos cementerios corrientes ya tienen secciones ecológicas.</p>
<p>En EE. UU., el <a href="https://www.greenburialcouncil.org/">Green Burial Council</a> lista proveedores certificados. En el Reino Unido, los cementerios naturales y en bosques están muy extendidos.</p>` },
    { id: 'arbol', h: 'Ser plantado bajo un árbol', icon: 'tree', facts: ['Entierro en un bosque', 'Urnas para árboles', 'Bosques conmemorativos'], html: `<ul>
<li><strong>Entierro en un bosque o ecológico,</strong> donde se planta un árbol sobre la tumba o cerca, o la tumba está entre árboles ya existentes.</li>
<li><strong>Una urna para árbol para las cenizas:</strong> una urna biodegradable con un plantón o una semilla. Las cenizas son muy alcalinas y saladas, lo que puede dañar las plantas, así que las buenas urnas para árboles incluyen una mezcla de tierra para equilibrarlas. Plántela solo donde lo permitan el dueño del terreno o las reglas locales.</li>
<li><strong>Bosques conmemorativos:</strong> bosques de gestión privada donde las cenizas se colocan en las raíces de un árbol elegido, a menudo con una pequeña placa.</li></ul>` },
    { id: 'cremacion', h: 'Cremación', icon: 'cremation', facts: ['La opción más común en EE. UU.', 'La cremación directa cuesta menos'], html: `<p>El cuerpo se reduce a cenizas con calor. La cremación directa, sin velatorio ni ceremonia antes, suele ser la opción menos cara, y se puede celebrar una reunión más tarde. La cremación también puede seguir a un funeral completo. La cremación es ahora la opción más común en EE. UU. Vea <a href="#cenizas">qué hacer con las cenizas</a>.</p>` },
    { id: 'agua', h: 'Cremación con agua (hidrólisis alcalina)', icon: 'water', facts: ['Mucha menos energía que la llama', 'Unos 28 estados de EE. UU. (enero de 2026)'], html: `<p>También llamada acuamación. El cuerpo se coloca en agua tibia con una solución alcalina, que lo descompone en varias horas y deja los huesos, que se procesan en cenizas, como en la cremación con llama. Usa mucha menos energía que la cremación con llama. En EE. UU., ${L('https://archive.legmt.gov/content/Committees/Interim/2025-2026/EAIC/January_20_2026/HJ27_BackgroundPaper.pdf', 'era legal en unos 28 estados en enero de 2026')}. En el Reino Unido aún no está muy disponible, y la Law Commission ha estado revisando métodos nuevos como este.</p>` },
    { id: 'compostaje', h: 'Compostaje humano (reducción orgánica natural)', icon: 'compost', facts: ['Tierra en 1 a 2 meses', '14 estados de EE. UU. (enero de 2026)'], html: `<p>También llamada terramación. El cuerpo se coloca en un recipiente con astillas de madera, paja y otro material vegetal, y en uno o dos meses se convierte en tierra. Las familias pueden llevarse parte de la tierra, a menudo para un jardín o un árbol, o donarla a terrenos de conservación. En enero de 2026, ${L('https://archive.legmt.gov/content/Committees/Interim/2025-2026/EAIC/January_20_2026/HJ27_BackgroundPaper.pdf', 'era legal en 14 estados de EE. UU.')}: Arizona, California, Colorado, Delaware, Georgia, Maine, Maryland, Minnesota, Nevada, Nueva Jersey, Nueva York, Oregón, Vermont y Washington. Los proveedores pueden atender a personas de otros estados, aunque el traslado aumenta el costo.</p>` },
    { id: 'mar', h: 'Entierro en el mar', icon: 'sea', facts: ['EE. UU.: a 3 millas náuticas o más', 'Avisar a la EPA en 30 días', 'Reino Unido: licencia marina para un cuerpo'], html: `<ul>
<li><strong>EE. UU.:</strong> un cuerpo puede enterrarse a por lo menos 3 millas náuticas de la costa, en aguas de al menos 600 pies (unos 180 metros) de profundidad. Las cenizas pueden esparcirse o colocarse a por lo menos 3 millas náuticas de la costa, a cualquier profundidad. ${L('https://www.epa.gov/ocean-dumping/burial-sea', 'Hay que avisar a la EPA en un plazo de 30 días')}, con su herramienta en línea. Los veteranos que cumplan los requisitos también pueden organizar el entierro en el mar con la Marina de EE. UU.</li>
<li><strong>Reino Unido:</strong> enterrar un cuerpo en el mar en aguas inglesas ${L('https://www.gov.uk/burial-at-sea', 'necesita una licencia marina de la Marine Management Organisation')}, normalmente en unos pocos lugares designados, como frente a los Needles (isla de Wight). Esparcir cenizas en el mar no necesita licencia.</li>
<li><strong>Arrecifes conmemorativos:</strong> las cenizas se mezclan en una estructura de arrecife de concreto que se coloca en el fondo del mar, donde se convierte en un hábitat para la vida marina. Lo ofrecen unas pocas empresas especializadas.</li></ul>` },
    { id: 'cenizas', h: 'Qué hacer con las cenizas', icon: 'ashes', facts: ['Guardar', 'Enterrar', 'Esparcir', 'Plantar', 'Repartir', 'Recuerdos'], html: `<ul>
<li><strong>Guardarlas</strong> en casa en una urna, o en un nicho de columbario.</li>
<li><strong>Enterrarlas</strong> en una parcela de cementerio, una tumba familiar o un terreno de entierro ecológico, a menudo por menos que un entierro completo.</li>
<li><strong>Esparcirlas:</strong> en terreno privado con permiso del dueño. Los parques, los terrenos públicos, los ríos y los lagos tienen sus propias reglas, y algunos necesitan un permiso, así que pregunte antes al dueño o a la autoridad local.</li>
<li><strong>Plantarlas</strong> con un árbol (vea más arriba).</li>
<li><strong>Repartirlas</strong> entre los familiares, para que cada uno guarde o esparza una parte.</li>
<li><strong>Recuerdos:</strong> pequeñas cantidades pueden convertirse en joyas, vidrio o incluso diamantes de laboratorio, o enviarse en un vuelo espacial conmemorativo.</li></ul>` },
    { id: 'donacion', h: 'Donación del cuerpo y de órganos', icon: 'donation', facts: ['La donación de órganos encaja con casi cualquier opción', 'Donación del cuerpo: arreglarla con antelación'], html: `<p><strong>La donación de órganos y tejidos</strong> puede ayudar a otras personas y es compatible con casi todas las opciones de arriba, incluido un funeral con el ataúd abierto. Regístrese en el registro de donantes de su país o estado y dígaselo a su familia.</p>
<p><strong>La donación del cuerpo entero</strong> a una facultad de medicina o a un programa de investigación es otra cosa. Normalmente hay que arreglarla con antelación, y muchos programas cubren la cremación después y devuelven las cenizas. Los programas pueden rechazar una donación, por ejemplo por ciertas enfermedades o si se hizo una autopsia, así que tenga un plan alternativo.</p>
<p><strong>Elija el programa con cuidado.</strong> En EE. UU. no hay un registro nacional único para la donación del cuerpo entero: usted se inscribe directamente en un programa. ${L('https://anatomy.org/AAA/About-AAA/What-Is-Anatomy/Body-Donation-Discussion.aspx', 'Los anatomistas recomiendan una facultad de medicina universitaria o un programa anatómico estatal')}. Algunas empresas privadas también aceptan cuerpos, y solo algunos estados las regulan, así que pregunte a cualquier programa qué pasa con el cuerpo, si pueden venderse partes y cuándo se devuelven las cenizas. Si también quiere donar órganos, pregunte al programa si acepta las dos cosas.</p>
<p><strong>Dónde registrarse o empezar:</strong></p>
<div class="cards cards-tight">
${dirCard('https://registerme.org/', 'Register Me (Donate Life America)', 'EE. UU. · órganos', 'Inscríbase en el registro nacional de donantes de órganos, ojos y tejidos.')}
${dirCard('https://www.organdonor.gov/', 'OrganDonor.gov', 'EE. UU. · gobierno', 'Información oficial de EE. UU. sobre la donación de órganos, ojos y tejidos.')}
${dirCard('https://funerals.org/get-help/making-decisions/body-organ-and-brain-donation/', 'Funeral Consumers Alliance: donación del cuerpo', 'EE. UU. · sin fines de lucro', 'Cómo funciona la donación del cuerpo, de órganos y del cerebro, y qué preguntar a un programa.')}
${dirCard('https://www.organdonation.nhs.uk/register-your-decision/', 'NHS Organ Donor Register', 'Reino Unido · órganos', 'Registre su decisión de donar, o de no donar.')}
${dirCard('https://www.hta.gov.uk/donating-your-body', 'Human Tissue Authority: donar el cuerpo', 'Reino Unido · cuerpo', 'Cómo funciona la donación del cuerpo en el Reino Unido, y las facultades de medicina autorizadas.')}
${dirCard('https://www.organtissuedonation.ca/', 'Donación de órganos y tejidos en Canadá', 'Canadá', 'Enlaces al registro de donantes de cada provincia y territorio.')}
${dirCard('https://www.donatelife.gov.au/', 'DonateLife', 'Australia', 'Inscríbase en el registro australiano de donantes de órganos.')}
</div>
<p class="small muted">Estos sitios están en inglés.</p>` },
    { id: 'en-casa', h: 'Un funeral en casa', icon: 'home', facts: ['Permitido en la mayoría de los estados', 'Las doulas pueden ayudar'], html: `<p>Sea cual sea la elección final, una familia puede cuidar del cuerpo en casa durante un día o más antes del entierro o la cremación: lavarlo, vestirlo y acompañarlo. La mayoría de los estados de EE. UU. permiten a las familias hacerlo; algunos exigen un director de funeraria para ciertos pasos. Las doulas del final de la vida pueden ayudar.</p>` },
    { id: 'otras', h: 'Otras opciones por las que pregunta la gente', icon: 'ask', html: `<p><strong>La criónica</strong> conserva un cuerpo o un cerebro a temperaturas muy bajas con la esperanza de que la ciencia del futuro pueda revivirlo. Es muy cara, la ofrecen muy pocas organizaciones y aún no hay pruebas de que revivir sea posible.</p>` },
    { id: 'ecologica', h: '¿Qué opción es la más ecológica?', icon: 'green', html: `<p><strong>El entierro natural (ecológico) suele ser la opción de menor impacto,</strong> sobre todo en un terreno de conservación donde la tierra está protegida para siempre.</p>
<p>${L('https://www.hhc.earth/knowledge-base/articles/client-case-dela-a-comparative-lca-study-on-various-methods-of-the-disposal-of-human-bodies', 'Un estudio de ciclo de vida para DELA')}, una funeraria neerlandesa, comparó el impacto climático de cada método por persona:</p>
<ul class="bars" aria-label="Impacto climático de cada método, por persona, en kilogramos de CO₂ equivalente">
${barra('Entierro natural', 40, true)}
${barra('Cremación eléctrica', 45)}
${barra('Compostaje humano', 47)}
${barra('Cremación con agua (resomación)', 118)}
${barra('Entierro tradicional con lápida de piedra', 120)}
${barra('Cremación a gas', 181)}
</ul>
<p class="small muted">Fuente: <a href="https://www.hhc.earth/knowledge-base/articles/client-case-dela-a-comparative-lca-study-on-various-methods-of-the-disposal-of-human-bodies">Hedgehog, estudio comparativo de ciclo de vida para DELA</a> (Países Bajos, en inglés). El <a href="https://www.greenburialcouncil.org/wp-content/uploads/2025/10/The-Potential-Environmental-Benefits-and-Costs-of-Disposition-Revised-9.30.24-1.pdf">Green Burial Council</a> también concluye que la cremación con llama tiene la mayor huella de carbono, y señala que libera mercurio.</p>
<p>La clasificación depende de las condiciones locales. Un crematorio eléctrico con energía limpia sale mucho mejor que uno de gas. Las cifras de los métodos nuevos, como la cremación con agua y el compostaje humano, cambian entre estudios, y muchas afirmaciones publicadas vienen de las empresas que los ofrecen. La huella de un entierro tradicional también aumenta con el embalsamamiento, la bóveda de concreto y el terreno que ocupa.</p>
<p><strong>Formas de reducir el impacto, elija lo que elija:</strong></p>
<ul><li>No embalsame.</li>
<li>Elija un sudario sencillo o un ataúd o una urna biodegradable.</li>
<li>Evite la bóveda de concreto donde el cementerio lo permita.</li>
<li>Elija un proveedor cercano, para reducir el transporte.</li>
<li>Elija flores locales y de temporada, o donaciones en su lugar.</li></ul>` },
    { id: 'elegir', h: 'Cómo elegir', icon: 'scale', html: `<ul>
<li>Qué le parece bien a usted: volver a la tierra, quedarse en un lugar que la familia pueda visitar, o ser esparcido en algún lugar que amó.</li>
<li>Su fe o su cultura: muchas tradiciones tienen prácticas claras, así que pregunte a su líder religioso.</li>
<li>El costo, y lo que está disponible y es legal donde vive.</li>
<li>Lo que necesita su familia: una tumba que visitar, o la libertad de recordarle en cualquier lugar.</li></ul>
<p>Déjelo por escrito, cuénteselo a alguien y guárdelo con su <a href="/es/imprimibles/planificacion/">hoja de planificación</a>.</p>` },
  ],
  sources: [
    ['US EPA: entierro en el mar' + EN, 'https://www.epa.gov/ocean-dumping/burial-sea'],
    ['GOV.UK: entierro en el mar' + EN, 'https://www.gov.uk/burial-at-sea'],
    ['Legislatura de Montana: informe sobre la reducción orgánica natural y la hidrólisis alcalina (enero de 2026, PDF)' + EN, 'https://archive.legmt.gov/content/Committees/Interim/2025-2026/EAIC/January_20_2026/HJ27_BackgroundPaper.pdf'],
    ['Green Burial Council' + EN, 'https://www.greenburialcouncil.org/'],
    ['American Association for Anatomy: sobre la donación del cuerpo' + EN, 'https://anatomy.org/AAA/About-AAA/What-Is-Anatomy/Body-Donation-Discussion.aspx'],
    ['Funeral Consumers Alliance' + EN, 'https://www.funerals.org/'],
    ['Hedgehog: estudio comparativo de ciclo de vida para DELA' + EN, 'https://www.hhc.earth/knowledge-base/articles/client-case-dela-a-comparative-lca-study-on-various-methods-of-the-disposal-of-human-bodies'],
    ['Green Burial Council: beneficios y costos ambientales de cada opción (PDF)' + EN, 'https://www.greenburialcouncil.org/wp-content/uploads/2025/10/The-Potential-Environmental-Benefits-and-Costs-of-Disposition-Revised-9.30.24-1.pdf'],
  ],
  related: [
    ['/es/imprimibles/funeral/', 'Planificador de funeral o celebración de vida', 'Deje por escrito sus elecciones.', 'printer'],
    ['/es/lo-que-cuesta/', 'Lo que cuesta', 'Precios de funerales, entierros y cremaciones.', 'costs'],
  ],
});

const fila = (tipo, mediana, anual) => `<tr><td>${tipo}</td><td>${mediana}</td><td>${anual}</td></tr>`;

export const cuesta = esGuide({
  path: '/es/lo-que-cuesta/',
  title: 'Lo que cuesta',
  seoTitle: '¿Cuánto cuesta morir? Hospicio, residencias y funerales',
  eyebrow: 'Costos',
  icon: 'costs',
  description: 'Lo que cuesta el final de la vida: la atención médica, el hospicio, los cuidados en casa y en residencias, los funerales y la muerte médicamente asistida, con cifras con fuente y dónde consultar precios.',
  lead: 'Casi nadie le dice con claridad lo que cuesta morir. Esto es lo que pudimos confirmar, con la fuente y la fecha de cada cifra, y dónde consultar los precios usted mismo.',
  glance: [['~25 %', 'Del gasto de Medicare en mayores de 65 años va al último año de vida (2014)'], ['355 $/día', 'Mediana en EE. UU. de una habitación privada en un hogar de ancianos (2025)'], ['8.300 $', 'Mediana en EE. UU. de un funeral con velatorio y entierro (2023)']],
  sections: [
    { id: 'resumen', h: 'En pocas palabras', icon: 'check', html: `<ul>
<li><strong>Depende sobre todo de dónde vive.</strong> En los países con sistemas públicos de salud, como el Reino Unido y Canadá, la mayor parte de la atención médica y del hospicio es gratuita o está muy cubierta. En EE. UU., los costos dependen del seguro y del tipo de atención que se necesite.</li>
<li><strong>Los mayores gastos de bolsillo no suelen ser médicos.</strong> Los cuidados pagados en casa o en una residencia, y el funeral, son lo que la mayoría de las familias pagan de su bolsillo.</li>
<li><strong>Los precios varían mucho,</strong> incluso entre hospitales y funerarias cercanos. Pedir precios por escrito y detallados es la mejor forma de ahorrar.</li></ul>
<p>Las cifras de abajo son medianas nacionales de EE. UU., en dólares, salvo que digamos otra cosa. En su zona pueden ser mucho más altas o más bajas. Para consultar precios usted mismo, use la <a href="/es/base-de-datos-de-costos/">base de datos de costos</a>.</p>` },
    { id: 'medica', h: 'La atención médica en el último año de vida', icon: 'illness', html: `<p>En EE. UU., cerca de una cuarta parte del gasto de Medicare en personas de 65 años o más va a la atención en su último año de vida, ${L('https://www.kff.org/medicare/medicare-spending-at-the-end-of-life/', 'según el análisis de KFF de los datos de 2014')}, los más recientes que ha publicado. Gran parte es atención hospitalaria e intensiva.</p>
<p>Cuánta atención recibe la gente cerca del final cambia mucho entre hospitales. El <a href="https://www.dartmouthatlas.org/interactive-apps/data-by-hospital/medicare-reimbursements/">Dartmouth Atlas</a> compara los hospitales de EE. UU. según el gasto de Medicare, los días de hospital y de cuidados intensivos y el uso del hospicio en los dos últimos años de vida de sus pacientes. Sus datos por hospital son de 2017, así que úselos para comparar patrones, no los precios de hoy.</p>` },
    { id: 'hospicio', h: 'Hospicio y cuidados paliativos', icon: 'bed', html: `<ul>
<li><strong>EE. UU., Medicare:</strong> el hospicio está cubierto. ${L('https://www.medicare.gov/coverage/hospice-care', 'Puede pagar hasta 5 dólares por cada receta')} para el alivio del dolor y los síntomas, y el 5 % del importe aprobado por Medicare para el relevo en un centro. Medicare no paga el alojamiento ni la comida si la persona vive en un hogar de ancianos u otro centro.</li>
<li><strong>Reino Unido:</strong> el hospicio es gratuito para los pacientes. La mayoría de los hospicios son organizaciones benéficas.</li>
<li><strong>Canadá:</strong> los cuidados paliativos los cubren los planes de salud provinciales, aunque algunos cuidados en casa pueden costar aparte.</li></ul>` },
    { id: 'cuidados', h: 'Cuidados en casa y en residencias', icon: 'home', html: `<p>Este suele ser el mayor gasto, y en EE. UU. Medicare no paga los cuidados personales a largo plazo. Medicaid puede pagarlos, para personas con pocos ingresos y ahorros. Costos medianos nacionales en 2025:</p>
<div class="table-box" tabindex="0" role="region" aria-label="Costos medianos de los cuidados a largo plazo en EE. UU., 2025"><table style="min-width:520px">
<caption class="sr-only">Costos medianos de los cuidados a largo plazo en EE. UU., 2025</caption>
<thead><tr><th scope="col">Tipo de cuidado</th><th scope="col">Costo mediano</th><th scope="col">Por año</th></tr></thead>
<tbody>
${fila('Hogar de ancianos, habitación privada', '355 $ al día', '129.575 $')}
${fila('Hogar de ancianos, habitación compartida', '315 $ al día', '114.975 $')}
${fila('Residencia asistida', '6.200 $ al mes', '74.400 $')}
${fila('Cuidador pagado en casa (44 horas a la semana)', '35 $ la hora', '80.080 $')}
${fila('Centro de día para adultos (5 días a la semana)', '95 $ al día', '24.700 $')}
</tbody></table></div>
<p class="small muted">Fuente: <a href="https://investor.genworth.com/news-events/press-releases/detail/1054">CareScout 2025 Cost of Care Survey</a>, publicada el 2 de marzo de 2026 (en inglés). Consulte su zona con la <a href="https://www.carescout.com/cost-of-care">calculadora de costos de CareScout</a>.</p>` },
    { id: 'funeral', h: 'Funerales, entierro y cremación', icon: 'burial', html: `<ul>
<li><strong>Funeral con velatorio y entierro:</strong> unos 8.300 dólares de mediana, o unos 9.995 con una bóveda.</li>
<li><strong>Funeral con velatorio y cremación:</strong> unos 6.280 dólares de mediana.</li></ul>
<p class="small muted">Fuente: estudio de listas de precios de 2023 de la National Funeral Directors Association, según lo publicado por <a href="https://www.kiplinger.com/retirement/estate-planning/the-cost-of-dying-burial-and-cremation-prices-by-state">Kiplinger</a> (en inglés). Cubren solo la funeraria, no la parcela, la lápida, las flores ni la esquela.</p>
<p>La cremación directa o el entierro directo (sin velatorio ni ceremonia antes) suelen costar mucho menos, y se puede celebrar una reunión más tarde en cualquier lugar. La cremación es ahora la opción más común en EE. UU.; ${L('https://nfda.org/news/statistics', 'la NFDA proyectó una tasa de cremación del 63,4 % para 2025')}. En EE. UU., tiene derecho a precios detallados según la Regla sobre Funerales de la FTC; vea <a href="/es/despues-de-una-muerte/#derechos">sus derechos con las funerarias</a>.</p>` },
    { id: 'muerte-asistida', h: 'Muerte médicamente asistida', icon: 'maid', html: `<ul>
<li><strong>Los programas federales de EE. UU. no pagan.</strong> ${L('https://www.law.cornell.edu/uscode/text/42/chapter-138', 'Una ley federal de 1997 prohíbe usar fondos federales para pagarla')}, así que Medicare, el VA y la parte federal de Medicaid no cubren el medicamento ni las consultas médicas relacionadas.</li>
<li><strong>Los seguros privados varían.</strong> Algunos planes de algunos estados la cubren; muchos no. Pregúntelo a la aseguradora por escrito.</li>
<li><strong>Pida el costo total por adelantado:</strong> las consultas, el medicamento y cualquier apoyo junto a la cama. Los costos publicados van de unos cientos de dólares solo por el medicamento a varios miles con el tiempo de los profesionales.</li>
<li><strong>Suiza es mucho más cara;</strong> vea <a href="${MAID_ES}/suiza/">ir a Suiza</a>.</li></ul>` },
    { id: 'consultar', h: 'Dónde consultar precios', icon: 'help', html: `<div class="cards cards-tight">
${dirCard('https://www.dartmouthatlas.org/interactive-apps/data-by-hospital/medicare-reimbursements/', 'Dartmouth Atlas', 'EE. UU. · hospitales', 'Patrones de atención al final de la vida por hospital (datos de 2017).')}
${dirCard('https://www.medicare.gov/care-compare/?providerType=Hospice', 'Medicare Care Compare', 'EE. UU. · hospicio', 'Calificaciones de calidad de los hospicios.')}
${dirCard('https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency', 'Transparencia de precios hospitalarios', 'EE. UU. · hospitales', 'Todo hospital debe publicar sus precios; no todos cumplen.')}
${dirCard('https://www.fairhealthconsumer.org/', 'FAIR Health Consumer', 'EE. UU. · atención médica', 'Costos habituales de los procedimientos en su zona.')}
${dirCard('https://www.carescout.com/cost-of-care', 'CareScout', 'EE. UU. · cuidados', 'Costos de residencias y cuidados en casa por zona.')}
${dirCard('https://www.funerals.org/', 'Funeral Consumers Alliance', 'EE. UU. · funerales', 'Grupos locales, algunos de los cuales encuestan precios de funerales.')}
</div>
<p style="margin-top:18px"><a class="btn btn-quiet" href="/es/base-de-datos-de-costos/">Vea la base de datos de costos completa: cada fuente, según lo que quiera saber</a></p>` },
    { id: 'ahorrar', h: 'Formas de reducir los costos', icon: 'shield', html: `<ul>
<li>Pregunte pronto por el hospicio. Medicare lo cubre en EE. UU., y es gratuito en muchos otros países.</li>
<li>Pida precios por escrito y detallados a dos o tres funerarias antes de elegir.</li>
<li>Considere la cremación directa o el entierro directo, con una reunión después.</li>
<li>Infórmese sobre la donación del cuerpo: algunos programas cubren el costo de la cremación después.</li>
<li>En EE. UU., los veteranos que cumplan los requisitos pueden ser enterrados en un cementerio nacional del VA y pueden tener derecho a otros beneficios de entierro; compruébelo.</li>
<li>Revise qué cubren el seguro, Medicaid o los beneficios del empleador antes de pagar de su bolsillo los cuidados.</li></ul>` },
  ],
  sources: [
    ['KFF: el gasto de Medicare al final de la vida (datos de 2014)' + EN, 'https://www.kff.org/medicare/medicare-spending-at-the-end-of-life/'],
    ['Dartmouth Atlas: atención al final de la vida por hospital' + EN, 'https://www.dartmouthatlas.org/interactive-apps/data-by-hospital/medicare-reimbursements/'],
    ['Medicare: cobertura del hospicio' + EN, 'https://www.medicare.gov/coverage/hospice-care'],
    ['CareScout 2025 Cost of Care Survey (comunicado de Genworth, marzo de 2026)' + EN, 'https://investor.genworth.com/news-events/press-releases/detail/1054'],
    ['Kiplinger: el costo de morir (cita el estudio de 2023 de la NFDA)' + EN, 'https://www.kiplinger.com/retirement/estate-planning/the-cost-of-dying-burial-and-cremation-prices-by-state'],
    ['Estadísticas de la NFDA (tasa de cremación)' + EN, 'https://nfda.org/news/statistics'],
    ['Código de EE. UU., 42 U.S.C. capítulo 138: restricción de fondos para el suicidio asistido' + EN, 'https://www.law.cornell.edu/uscode/text/42/chapter-138'],
    ['CMS: transparencia de precios hospitalarios' + EN, 'https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency'],
  ],
  related: [
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'Opciones de funeral y sus derechos.', 'afterdeath'],
    ['/es/encontrar-ayuda/', 'Ayuda cerca de usted', 'Directorios independientes.', 'help'],
  ],
});

// The cost database, in Spanish: the same sources, grouped by what people want to find out.
const TAREAS = [
  { id: 'estimar', h: 'Estimar una factura de hospital o de médico', icon: 'costs', intro: 'Ninguna base de datos puede decirle exactamente lo que va a pagar: eso depende de su seguro y de lo que se haga. Estas dan un rango realista, y la lista de precios del propio hospital.', steps: ['Busque un precio habitual del servicio en su zona.', 'Busque los precios publicados por el hospital para el mismo servicio.', 'Pida al hospital y a su seguro un presupuesto por escrito antes de la atención programada.'], cards: [
    ['https://www.fairhealthconsumer.org/', 'FAIR Health Consumer', 'EE. UU. · gratis', 'Estimaciones de costos de miles de servicios médicos, dentales y de centros, basadas en reclamaciones a seguros y a Medicare, por código postal.'],
    ['https://www.medicare.gov/procedure-price-lookup/', 'Medicare Procedure Price Lookup', 'EE. UU. · Medicare', 'Lo que paga Medicare y lo que usted puede deber por procedimientos ambulatorios, en departamentos de hospital y centros quirúrgicos.'],
    ['https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency', 'Transparencia de precios hospitalarios (CMS)', 'EE. UU. · hospitales', 'Todo hospital de EE. UU. debe publicar sus precios, incluidas las tarifas negociadas. No todos cumplen.'],
    ['https://turquoise.health/', 'Turquoise Health', 'EE. UU. · hospitales', 'Permite buscar en los archivos de precios publicados por los hospitales.'],
  ] },
  { id: 'comparar-hospitales', h: 'Comparar hospitales cerca del final de la vida', icon: 'illness', intro: 'Los hospitales cambian mucho en cuántos cuidados intensivos, cuántos días de hospital y cuánto hospicio reciben sus pacientes en los últimos meses de vida.', steps: ['Busque los hospitales cercanos en el Dartmouth Atlas.', 'Compare los días de cuidados intensivos y el uso del hospicio en los últimos seis meses a dos años de vida.', 'Úselo para preguntar al equipo por su enfoque, no como precios de hoy.'], cards: [
    ['https://www.dartmouthatlas.org/', 'Dartmouth Atlas of Health Care', 'EE. UU. · investigación', 'Patrones de atención al final de la vida y gasto de Medicare por hospital y región. Datos por hospital de 2017.'],
    ['https://hcup-us.ahrq.gov/', 'HCUP (AHRQ)', 'EE. UU. · gobierno', 'Datos de hospitalizaciones, urgencias y atención ambulatoria de los estados de EE. UU., de la Agencia para la Investigación y la Calidad de la Atención Médica.'],
    ['https://datatools.ahrq.gov/hcupnet/', 'HCUPnet', 'EE. UU. · gratis', 'Una herramienta gratuita de estadísticas de HCUP: hospitalizaciones, cargos y costos por enfermedad, estado y año.'],
    ['https://datatools.ahrq.gov/hcup-fast-stats/', 'HCUP Fast Stats', 'EE. UU. · gratis', 'Gráficos rápidos y ya hechos del uso de hospitales nacional y por estado.'],
  ] },
  { id: 'hospicio-residencias', h: 'Elegir un hospicio o un hogar de ancianos', icon: 'lastweeks', intro: 'En el hospicio y los hogares de ancianos, la calidad importa tanto como el precio. Medicare publica calificaciones de cada proveedor certificado.', steps: ['Busque hospicios u hogares de ancianos cerca de la persona.', 'Compare las calificaciones y las encuestas a familias.', 'Llame a dos o tres y pregunte qué incluyen y qué cuesta aparte.'], cards: [
    ['https://www.medicare.gov/care-compare/?providerType=Hospice', 'Care Compare: hospicios', 'EE. UU. · Medicare', 'Medidas de calidad y encuestas a familias de los hospicios certificados por Medicare.'],
    ['https://www.medicare.gov/care-compare/?providerType=NursingHome', 'Care Compare: hogares de ancianos', 'EE. UU. · Medicare', 'Calificaciones, inspecciones y personal de los hogares de ancianos.'],
  ] },
  { id: 'largo-plazo', h: 'Consultar el costo de los cuidados a largo plazo', icon: 'home', intro: 'Los cuidados pagados en casa, las residencias asistidas y los hogares de ancianos suelen ser los mayores gastos que pagan las familias.', steps: ['Busque el costo mediano en la zona de la persona.', 'Revise qué cubre Medicaid u otros programas donde vive.', 'Pida a cada proveedor una lista de tarifas por escrito.'], cards: [
    ['https://www.carescout.com/cost-of-care', 'CareScout: costo de los cuidados', 'EE. UU. · gratis', 'Costos medianos de los cuidados en casa, los centros de día, las residencias asistidas y los hogares de ancianos, por zona.'],
  ] },
  { id: 'funerales', h: 'Comparar costos de funerales', icon: 'afterdeath', intro: 'No hay una base de datos pública completa de precios de funerarias. Llamar sigue siendo la mejor forma, y en EE. UU. las funerarias deben dar los precios por teléfono.', steps: ['Llame a dos o tres funerarias y pida sus precios detallados.', 'Vea si un grupo local de consumidores ha encuestado precios cerca de usted.', 'Compare con las cifras nacionales.'], cards: [
    ['https://www.funerals.org/', 'Funeral Consumers Alliance', 'EE. UU. · sin fines de lucro', 'Consejos para consumidores y grupos locales, algunos de los cuales encuestan precios de funerales.'],
    ['https://nfda.org/news/statistics', 'Estadísticas de la NFDA', 'EE. UU. · sector', 'Precios medianos nacionales de los funerales y tasas de cremación, de la asociación de directores de funerarias.'],
    ['https://www.sunlife.co.uk/funeral-costs/', 'SunLife Cost of Dying report', 'Reino Unido · anual', 'El costo medio de un funeral en el Reino Unido, publicado cada año.'],
  ], after: 'Sus derechos al contratar un funeral en EE. UU.: <a href="/es/despues-de-una-muerte/#derechos">la Regla sobre Funerales de la FTC</a>.' },
  { id: 'ayuda-factura', h: 'Conseguir ayuda con una factura', icon: 'help', intro: 'Las facturas de hospital a menudo pueden reducirse. Muchos hospitales perdonan facturas según los ingresos, y en EE. UU. la ley limita las facturas sorpresa por atención fuera de la red.', steps: ['Pida una factura detallada y revísela línea por línea.', 'Pregunte al hospital por su política de ayuda financiera (atención caritativa).', 'Si algo parece incorrecto, pida ayuda.'], cards: [
    ['https://dollarfor.org/', 'Dollar For', 'EE. UU. · sin fines de lucro', 'Ayuda gratuita para pedir que le perdonen las facturas de hospital según sus ingresos.'],
    ['https://www.cms.gov/medical-bill-rights', 'Sus derechos ante facturas sorpresa (CMS)', 'EE. UU. · gobierno', 'De qué le protege la Ley Sin Sorpresas, y cómo disputar una factura.'],
    ['https://kffhealthnews.org/send-us-your-medical-bills/', 'KFF Health News: envíenos su factura', 'EE. UU. · periodismo', 'La serie Bill of the Month investiga facturas médicas de lectores. Se hizo con NPR hasta 2024 y continúa en KFF Health News.'],
  ] },
  { id: 'finanzas', h: 'Investigar las finanzas y los costos de los hospitales', icon: 'scale', intro: 'Para periodistas, investigadores y defensores: lo que los hospitales informan sobre sus propios costos, cargos y ganancias.', steps: [], cards: [
    ['https://www.cms.gov/data-research/statistics-trends-and-reports/cost-reports', 'Informes de costos de Medicare (HCRIS)', 'EE. UU. · gobierno', 'Informes anuales de costos de los hospitales, hospicios, hogares de ancianos y otros proveedores certificados por Medicare.'],
    ['https://tool.nashp.org/', 'NASHP Hospital Cost Tool', 'EE. UU. · gratis', 'Costos, cargos, rentabilidad e ingresos de miles de hospitales de EE. UU., de la National Academy for State Health Policy.'],
    ['https://data.cms.gov/', 'data.cms.gov', 'EE. UU. · gobierno', 'Los conjuntos de datos públicos de Medicare, incluidos los de proveedores y gasto.'],
    ['https://www.kff.org/medicare/medicare-spending-at-the-end-of-life/', 'KFF: el gasto de Medicare al final de la vida', 'EE. UU. · análisis', 'Cuánto gasta Medicare en el último año de vida de las personas (datos de 2014).'],
  ] },
  { id: 'paises', h: 'Comparar países', icon: 'globe', intro: 'Cuánto gastan los países en salud, y cuánto pagan las familias de su bolsillo.', steps: [], cards: [
    ['https://apps.who.int/nha/database/', 'OMS: Base de Datos Mundial sobre el Gasto en Salud', 'Mundial', 'Gasto en salud comparable de más de 190 países y territorios, incluido el gasto público, de los hogares y por persona.'],
    ['https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS', 'Banco Mundial: gasto en salud', 'Mundial', 'El gasto corriente en salud como parte de la economía de cada país, a lo largo del tiempo.'],
    ['https://www.healthsystemtracker.org/', 'Peterson-KFF Health System Tracker', 'EE. UU. y países similares', 'Cómo se comparan el gasto y los costos de salud de EE. UU. con los de otros países ricos.'],
    ['https://www.cihi.ca/en/national-health-expenditure-trends', 'CIHI: tendencias del gasto nacional en salud', 'Canadá', 'El gasto en salud por provincia y territorio, con comparaciones internacionales.'],
  ] },
];
const totalFuentes = TAREAS.reduce((n, t) => n + t.cards.length, 0);

export const baseDatos = esGuide({
  path: '/es/base-de-datos-de-costos/',
  title: 'Base de datos de costos: dónde consultar precios reales',
  seoTitle: 'Bases de datos de costos de salud y funerales: dónde consultar los precios del final de la vida',
  eyebrow: 'Base de datos de costos',
  icon: 'costs',
  description: `${totalFuentes} bases de datos y herramientas públicas y gratuitas para consultar costos de hospitales, hospicios, cuidados a largo plazo y funerales, según lo que quiera saber.`,
  lead: 'Los precios de morir están repartidos entre datos del gobierno, herramientas sin fines de lucro y listas de precios que la mayoría nunca conoce. Aquí están las mejores, según lo que quiera saber. La mayoría de estos sitios están en inglés.',
  glance: [[`${totalFuentes}`, 'Bases de datos y herramientas gratuitas, todas revisadas'], ['Siempre', 'Pida también un presupuesto por escrito y detallado: ninguna base de datos conoce su factura'], ['Por teléfono', 'En EE. UU., las funerarias deben darle los precios cuando llama']],
  sections: TAREAS.map((t) => ({
    id: t.id,
    h: t.h,
    icon: t.icon,
    html: `<p>${t.intro}</p>
${t.steps.length ? `<ol class="mini-steps">${t.steps.map((s) => `<li>${s}</li>`).join('')}</ol>` : ''}
<div class="cards cards-tight" style="margin-top:18px">${t.cards.map((c) => dirCard(...c)).join('')}</div>
${t.after ? `<p class="small" style="margin-top:14px">${t.after}</p>` : ''}`,
  })),
  related: [
    ['/es/lo-que-cuesta/', 'Lo que cuesta', 'Cifras nacionales de cuidados, hospicio y funerales, con fuentes.', 'costs'],
    ['/es/sugerencias/', 'Sugiera una fuente', '¿Conoce una buena base de datos que no tengamos? Díganos.', 'talk'],
  ],
});

pair('/plan-ahead/choices-for-the-body/', CUERPO);
pair('/what-it-costs/', '/es/lo-que-cuesta/');
pair('/what-it-costs/database/', '/es/base-de-datos-de-costos/');

export const esBatch3b = [cuerpo, cuesta, baseDatos];
