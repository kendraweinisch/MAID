// Spanish printables: worksheets, checklists and children's remembering
// books, the printables index, and the Spanish binder. Same content as the
// English printables. PDFs are made by scripts/make-printables.cjs (see
// ES_PRINTABLES) and the binder by scripts/make-binder.py --lang es.
import { readFileSync } from 'node:fs';
import { pair } from './layout.mjs';
import { dlPanelEs, reviewNote } from './es.mjs';

const META = JSON.parse(readFileSync(new URL('./data/printables-meta.json', import.meta.url), 'utf8'));
const P = '/es/imprimibles';
const blank = '<span class="blank" aria-hidden="true"></span>';
const lines = (n) => `<div class="write-lines" style="--lines:${n}" aria-hidden="true"></div>`;
const drawBox = (h = 260) => `<div class="draw-box" style="height:${h}px" aria-hidden="true"></div>`;
const footer = `<p class="muted small print-only">De End of Life Atlas · eolatlas.org · Gratis para imprimir y compartir. Traducción pendiente de revisión.</p>`;

// [slug used for the PDF and thumbnail, Spanish path, English path, title, kind, one line]
export const ES_PRINTABLES = [];

function page({ slug, path, en, title, kind, description, seoTitle, lead, intro = '', body }) {
  ES_PRINTABLES.push({ slug, path, title });
  pair(en, path);
  return {
    path,
    title,
    seoTitle,
    description,
    body: `
<section class="section">
<div class="wrap prose">
<p class="small no-print"><a href="${P}/">Todas las hojas para imprimir</a></p>
<p class="eyebrow">${kind}</p>
<h1>${title}</h1>
<p class="lead" style="margin:20px 0">${lead}</p>
${dlPanelEs(slug)}
<div class="no-print">${reviewNote}</div>
${intro}
${body}
${footer}
</div>
</section>`,
  };
}

function checklist({ groups, note, ...rest }) {
  const body =
    groups.map((g) => `<h2>${g.h}</h2>\n<ul class="check">${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('\n') +
    (note ? `<p class="muted small">${note}</p>` : '');
  return page({ kind: 'Lista para imprimir', ...rest, body });
}

function workbook({ sections, kind = 'Cuaderno para imprimir', ...rest }) {
  const body = sections
    .map(
      (s) => `<div class="wb-page">
<h2>${s.h}</h2>
${s.note ? `<p class="muted">${s.note}</p>` : ''}
${s.prompts.map((p) => `<div class="prompt"><p><strong>${p.q}</strong></p>${p.draw ? drawBox(p.draw) : lines(p.lines || 3)}</div>`).join('\n')}
</div>`
    )
    .join('\n');
  return page({ kind, ...rest, body });
}

const b = (label) => `${label} ${blank}`;

export const planificacion = checklist({
  slug: 'planificacion',
  path: `${P}/planificacion/`,
  en: '/checklists/plan-ahead/',
  title: 'Hoja de planificación',
  seoTitle: 'Hoja de planificación para el final de la vida (para imprimir)',
  description: 'Una hoja completa para imprimir: sus personas, sus profesionales, sus documentos de salud y legales, su dinero, sus bienes, su vida digital y sus deseos, y dónde se guarda todo.',
  lead: 'Llene lo que corresponda y sáltese el resto. Dé una copia a su representante para decisiones de salud o a su albacea, y guarde otra con sus papeles importantes. Nunca escriba aquí contraseñas completas; diga dónde encontrarlas.',
  groups: [
    { h: 'Sobre mí', items: [b('Nombre legal completo:'), b('Fecha de nacimiento:'), b('Dónde están mi identificación, mi pasaporte y mi acta de nacimiento:'), b('Papeles de matrimonio, divorcio o unión:'), b('Papeles del servicio militar (si los hay):')] },
    { h: 'Mis personas', items: [`Mi representante para decisiones de salud: ${blank} Teléfono: ${blank}`, b('Representante suplente:'), b('Albacea nombrado en mi testamento:'), b('Apoderado financiero:'), b('La persona que sabe dónde está todo:'), b('A quién llamar primero:'), b('Tutor de mis hijos:'), b('Personas que dependen de mí, y cómo:')] },
    { h: 'Mis profesionales', items: [b('Médico(s):'), b('Abogado:'), b('Contador o preparador de impuestos:'), b('Asesor financiero o contacto en el banco:'), b('Agente de seguros:'), b('Líder religioso u otro apoyo:'), b('Empleador o recursos humanos (para los beneficios):')] },
    { h: 'Documentos de salud', items: [b('Directiva anticipada (testamento vital). Guardada en:'), b('Poder para decisiones de salud. Guardado en:'), b('POLST u orden médica parecida (si hay enfermedad grave). Guardada en:'), b('Donación de órganos y tejidos: sí / no / inscrito en:'), 'Mi médico y mi representante tienen copias.'] },
    { h: 'Documentos legales', items: [b('Testamento. Original guardado en:'), `Fideicomiso (si lo hay). Fiduciario: ${blank} Guardado en: ${blank}`, b('Poder financiero duradero. Guardado en:'), b('Testamentos o documentos de propiedades en otro estado o país:'), b('Papeles de funeral prepagado o de parcela en el cementerio:')] },
    { h: 'Dinero y cuentas', items: [b('Cuentas en bancos y cooperativas de crédito:'), b('Cuentas de jubilación y pensiones:'), b('Inversiones:'), b('Pólizas de seguro de vida:'), b('Cuentas con un beneficiario nombrado, y quién es:'), b('Deudas, préstamos y tarjetas de crédito:'), b('Facturas habituales y pagos automáticos:'), b('Dónde están mis últimas declaraciones de impuestos:'), b('Caja de seguridad, y dónde está la llave:')] },
    { h: 'Bienes', items: [b('Vivienda: escritura, contrato de alquiler o hipoteca. Guardado en:'), b('Vehículos y títulos:'), b('Propiedades en otro estado o país, y cómo están registradas:'), b('Objetos de valor, y quién debe tenerlos:')] },
    { h: 'Mis mascotas', items: [b('Mis mascotas (nombres y tipo de animal):'), `Quién las cuidará: ${blank} Teléfono: ${blank}`, b('Persona suplente para cuidarlas:'), `Veterinario: ${blank} Teléfono: ${blank}`, b('Comida, medicamentos y problemas de salud:'), b('Costumbres, rutinas y lo que las calma:'), b('Fideicomiso para mascotas, o instrucciones en mi testamento. Guardado en:'), b('Dinero reservado para su cuidado:'), b('Registradas en un servicio de cuidado (como la Canine Care Card de Dogs Trust):'), b('Quién tiene llave y puede atenderlas en una emergencia:')] },
    { h: 'Vida digital', items: [b('Códigos del teléfono y la computadora, o dónde encontrarlos:'), b('Gestor de contraseñas y su acceso de emergencia:'), b('Cuentas de correo:'), b('Contacto de legado configurado en Apple, Google o Facebook:'), b('Suscripciones para cancelar:'), b('Fotos y archivos que guardar:')] },
    { h: 'Mis deseos', items: [b('Lo que más me importa al final de la vida:'), b('Dónde me gustaría estar:'), b('Entierro / cremación / entierro ecológico / donación del cuerpo / otro:'), b('Ceremonia o reunión que me gustaría (vea el planificador de funeral):'), b('Cartas o mensajes que entregar (vea cartas para dejar):'), b('Mi historia o notas para la esquela (vea mi historia):')] },
    { h: 'Revisión', items: [b('Fecha en que llené esto:'), b('Próxima revisión (cada 2 o 3 años, o tras un cambio importante):'), b('Copias entregadas a:')] },
  ],
});

export const preguntas = checklist({
  slug: 'preguntas-para-el-medico',
  path: `${P}/preguntas-para-el-medico/`,
  en: '/checklists/questions-for-the-doctor/',
  title: 'Preguntas para el médico',
  seoTitle: 'Preguntas para el médico después de un diagnóstico grave (para imprimir)',
  description: 'Una lista para imprimir de preguntas para después de un diagnóstico grave, sobre el tratamiento, los cuidados paliativos y el hospicio.',
  lead: 'Llévela a las citas. Vaya con alguien que tome notas, y pida al médico que vaya más despacio si lo necesita.',
  groups: [
    { h: 'Entender la enfermedad', items: ['¿Qué está pasando, en palabras sencillas?', '¿Qué es probable que pase ahora, y en cuánto tiempo?', '¿A qué síntomas debo estar atento, y a quién llamo?'] },
    { h: 'El tratamiento', items: ['¿Cuáles son mis opciones, incluida la de no tratarme?', '¿Qué supondría cada opción para mi vida diaria?', '¿Qué haría usted en mi lugar?'] },
    { h: 'Alivio y apoyo', items: ['¿Puedo ver ahora a un equipo de cuidados paliativos?', '¿Cuándo deberíamos hablar del hospicio?', '¿Debería tener un formulario POLST?', '¿Qué ayuda hay para mi familia o mi cuidador?'] },
    { h: 'Si le importa', items: ['¿Participaría usted en la muerte médicamente asistida, si es legal aquí?', '¿Podemos dejar mis deseos por escrito en mi historial médico?'] },
  ],
});

export const funeral = checklist({
  slug: 'funeral',
  path: `${P}/funeral/`,
  en: '/checklists/funeral-planner/',
  title: 'Planificador de funeral o celebración de vida',
  seoTitle: 'Lista para planificar un funeral o una celebración de vida (para imprimir)',
  description: 'Un planificador para imprimir para un funeral, un acto conmemorativo o una celebración de vida: el cuerpo, la reunión, las personas, la música, las palabras y el encuentro después.',
  lead: 'Úselo para planificar el suyo, para que nadie tenga que adivinar, o para planificar el de alguien que ha muerto. Sáltese lo que no encaje.',
  groups: [
    { h: 'El cuerpo', items: [b('Entierro / mausoleo / entierro ecológico o en un bosque / cremación / cremación con agua / compostaje humano / entierro en el mar / donación del cuerpo / otro:'), b('Si hay cenizas: guardarlas / enterrarlas / esparcirlas (dónde) / plantarlas con un árbol / repartirlas:'), b('Dónde debe descansar el cuerpo o las cenizas:'), b('Ropa, joyas u objetos que incluir:'), b('Velatorio o sin velatorio:')] },
    { h: 'La reunión', items: [b('Tipo de reunión: funeral, acto conmemorativo, celebración de vida, servicio religioso, nada formal:'), b('Dónde:'), b('Cuándo (puede ser semanas después):'), b('Quién la dirige:'), b('El tono: tranquilo, alegre, una mezcla:')] },
    { h: 'Palabras y música', items: [b('Música que poner:'), b('Lecturas, poemas u oraciones:'), b('Quién debe hablar:'), b('Lo que no debe decirse ni ponerse:')] },
    { h: 'Personas', items: [b('Personas a las que hay que avisar en persona:'), b('Personas a las que invitar:'), b('Quién se ocupa de la lista de invitados y los mensajes:')] },
    { h: 'Después', items: [b('Una comida, bebidas o una fiesta: dónde y quién la organiza:'), b('Comidas, canciones o tradiciones que incluir:'), b('Flores, o donaciones a:'), b('Fotos, una presentación o una mesa de recuerdos:')] },
    { h: 'Lo práctico', items: [b('Presupuesto:'), 'Pida a las funerarias precios por escrito y detallados.', b('Esquela o aviso de defunción: quién la escribe y dónde se publica:')] },
  ],
  note: '¿Planifica el suyo? Guárdelo con su hoja de planificación y dígale a alguien dónde está.',
});

export const hablar = workbook({
  slug: 'hablar-con-un-padre',
  path: `${P}/hablar-con-un-padre/`,
  en: '/checklists/talking-with-a-parent/',
  title: 'Hablar con un padre sobre el final de la vida',
  kind: 'Hoja para la conversación, para imprimir',
  seoTitle: 'Preguntas para hacer a sus padres sobre sus deseos al final de la vida (para imprimir)',
  description: 'Una hoja para imprimir con preguntas amables para hacer a un padre o una madre sobre sus deseos, con espacio para anotar sus respuestas, también cuando vive lejos.',
  lead: 'Una conversación no lo cubrirá todo. Elija dos o tres preguntas, y vuelva al resto en otro momento.',
  intro: `<p>Lea antes la guía completa: <a href="/es/hablar-con-un-padre/">hablar con un padre, de cerca o de lejos</a>.</p>`,
  sections: [
    { h: 'Lo que le importa', prompts: [{ q: '¿Qué hace que un día sea bueno para ti ahora?' }, { q: 'Si te enfermaras gravemente, ¿qué te importaría más? ¿Qué no querrías?' }, { q: '¿Dónde querrías estar al final?' }] },
    { h: 'Quién decide', prompts: [{ q: 'Si no pudieras hablar por ti, ¿quién debería tomar las decisiones sobre tu atención?' }, { q: '¿Lo has dejado por escrito en algún lugar? ¿Dónde está?' }] },
    { h: 'Dónde están las cosas', prompts: [{ q: '¿Dónde guardas tu testamento, tus seguros y los datos del banco?' }, { q: '¿Quiénes son tu médico, tu abogado o tu asesor financiero?' }] },
    { h: 'Después', prompts: [{ q: '¿Qué querrías para tu cuerpo y para un funeral o una reunión?' }, { q: '¿Hay música, una lectura o una historia que quieras que se comparta?' }] },
    { h: 'Notas para mí', prompts: [{ q: 'Lo que quiero recordar de esta conversación:', lines: 5 }, { q: 'De lo que todavía tenemos que hablar:', lines: 3 }] },
  ],
});

export const elogio = workbook({
  slug: 'elogio',
  path: `${P}/elogio/`,
  en: '/checklists/eulogy/',
  title: 'Escribir un elogio fúnebre',
  kind: 'Guía para imprimir',
  seoTitle: 'Cómo escribir un elogio fúnebre: preguntas y plantilla (para imprimir)',
  description: 'Una guía para imprimir para escribir un elogio fúnebre: preguntas para reunir recuerdos, una forma sencilla en tres partes y espacio para el borrador.',
  lead: 'Un elogio no tiene que resumir una vida entera. Tiene que sonar a la persona, y a usted.',
  intro: `<ul>
<li><strong>Apunte a entre tres y cinco minutos,</strong> unas 400 a 700 palabras, salvo que le pidan más.</li>
<li><strong>Una historia verdadera vale más que una lista de virtudes.</strong> En lugar de "era generosa", cuente la vez que regaló su abrigo.</li>
<li><strong>Está bien hacer reír,</strong> y está bien llorar. Imprímalo con letra grande y lleve agua.</li>
</ul>`,
  sections: [
    { h: 'Reunir', note: 'Tome notas rápidas. No las usará todas.', prompts: [{ q: 'Tres palabras que la gente usaría para describir a la persona:', lines: 2 }, { q: 'Una historia que muestre cómo era:', lines: 5 }, { q: 'Algo que siempre decía o hacía:', lines: 2 }, { q: 'Lo que más le importaba:', lines: 3 }, { q: 'Lo que usted aprendió de ella:', lines: 3 }] },
    { h: 'Darle forma en tres partes', prompts: [{ q: '1. Cómo era: una primera frase o imagen que suene a la persona.', lines: 4 }, { q: '2. Una o dos historias que lo muestren.', lines: 6 }, { q: '3. Lo que nos deja, y su despedida.', lines: 4 }] },
    { h: 'Borrador', prompts: [{ q: 'Escríbalo de un tirón. Ya lo arreglará después.', lines: 18 }] },
  ],
});

export const cartas = workbook({
  slug: 'cartas',
  path: `${P}/cartas/`,
  en: '/checklists/letters-to-leave/',
  title: 'Cartas para dejar',
  kind: 'Hoja para imprimir',
  seoTitle: 'Cartas para dejar a sus seres queridos: preguntas (para imprimir)',
  description: 'Una hoja para imprimir para escribir cartas que se lean después de su muerte: a quién escribir, preguntas que ayudan y cómo asegurarse de que lleguen.',
  lead: 'Una carta puede decir lo que cuesta decir en voz alta. Muchas familias dicen que una carta fue lo que más atesoraron.',
  intro: `<h2>Para que lleguen</h2>
<ul>
<li>Cierre cada carta y escriba en el sobre para quién es y cuándo abrirla.</li>
<li>Guárdelas con su testamento o su hoja de planificación, y dígale a su albacea o a una persona de confianza dónde están.</li>
<li>Para un niño, puede escribir cartas para momentos futuros: una graduación, una boda, el nacimiento de un hijo.</li>
</ul>`,
  sections: [
    { h: 'A quién quiero escribir', prompts: [{ q: 'Nombres, y cualquier detalle sobre cuándo debe leerse cada carta:', lines: 5 }] },
    { h: 'Preguntas', note: 'Use las que le ayuden. Sáltese el resto.', prompts: [{ q: 'Lo que quiero que sepas de lo que siento por ti:', lines: 4 }, { q: 'Un recuerdo nuestro que atesoro:', lines: 4 }, { q: 'Lo que deseo para ti:', lines: 4 }, { q: 'Algo por lo que quiero pedir perdón, o que perdono:', lines: 3 }, { q: 'Lo que me gustaría que hicieras cuando me eches de menos:', lines: 3 }] },
  ],
});

export const historia = workbook({
  slug: 'mi-historia',
  path: `${P}/mi-historia/`,
  en: '/checklists/life-story/',
  title: 'Mi historia',
  kind: 'Hoja para imprimir',
  seoTitle: 'Escriba su propia historia de vida y su esquela (para imprimir)',
  description: 'Una hoja para imprimir para escribir la historia de su vida con sus propias palabras, para ayudar a su familia a escribir una esquela o una página conmemorativa que usted aprobaría.',
  lead: 'Su familia querrá contar su historia. Ayúdeles a contarla como usted lo haría.',
  sections: [
    { h: 'Los datos', prompts: [{ q: 'Nombre completo, y otros nombres por los que le conocían:', lines: 2 }, { q: 'Dónde y cuándo nació, y dónde ha vivido:', lines: 3 }, { q: 'La familia: las personas que querría que se nombraran:', lines: 3 }, { q: 'Trabajo, estudios, servicio:', lines: 3 }] },
    { h: 'La historia', prompts: [{ q: 'De lo que está más orgulloso u orgullosa:', lines: 3 }, { q: 'Lo que le encantaba hacer:', lines: 3 }, { q: 'Un momento decisivo de su vida:', lines: 3 }, { q: 'Cómo le gustaría ser recordado:', lines: 3 }] },
    { h: 'Preferencias', prompts: [{ q: 'Una foto que le gustaría que se usara (diga dónde está):', lines: 2 }, { q: 'Lo que no quiere que se mencione:', lines: 2 }, { q: 'Dónde debe publicarse una esquela o un aviso, si en algún lugar:', lines: 2 }] },
  ],
});

const paraAdultos = (extra) => `<div class="notice"><strong>Para el adulto:</strong> Vaya al ritmo del niño. Deje que elija qué páginas hacer, que dibuje en lugar de escribir, o que pare. Use palabras sencillas como "murió". ${extra} Más ayuda: <a href="/es/duelo/#ninos">cómo ayudar a los niños en el duelo</a>.</div>`;

export const recordarAlguien = workbook({
  slug: 'recordar-a-alguien',
  path: `${P}/recordar-a-alguien/`,
  en: '/checklists/remembering-someone/',
  title: 'Alguien a quien quiero: un libro para recordar',
  kind: 'Cuaderno para niños, para imprimir',
  seoTitle: 'Cuaderno de duelo para niños: un libro para recordar (para imprimir)',
  description: 'Un libro para recordar, gratuito y para imprimir, para un niño después de que muere alguien a quien quiere: páginas para dibujar y escribir sobre la persona, los recuerdos y los sentimientos.',
  lead: 'Un libro para llenar sobre alguien especial que murió.',
  intro: paraAdultos('Los niños más pequeños quizá quieran que usted escriba mientras ellos hablan.'),
  sections: [
    { h: 'Este es mi libro', prompts: [{ q: 'Me llamo:', lines: 1 }, { q: 'Este libro es sobre:', lines: 1 }, { q: 'Dibuja a esta persona, o pega una foto.', draw: 300 }] },
    { h: 'Todo sobre esta persona', prompts: [{ q: 'Era mi:', lines: 1 }, { q: 'Sus cosas favoritas eran:', lines: 3 }, { q: 'Algo gracioso que hacía:', lines: 3 }] },
    { h: 'Nuestros recuerdos', prompts: [{ q: 'Mi momento favorito con esta persona:', lines: 3 }, { q: 'Dibuja un lugar al que fuimos juntos.', draw: 260 }] },
    { h: 'Mis sentimientos', note: 'Todos los sentimientos están bien. Tristeza, rabia, confusión, incluso alegría.', prompts: [{ q: 'Hoy me siento:', lines: 2 }, { q: 'Cuando la echo de menos, puedo:', lines: 3 }, { q: 'Dibuja cómo se ven hoy tus sentimientos.', draw: 220 }] },
    { h: 'Lo que quiero decir', prompts: [{ q: 'Si pudiera decirle una cosa, le diría:', lines: 4 }] },
  ],
});

export const recordarAbuelo = workbook({
  slug: 'recordar-a-un-abuelo',
  path: `${P}/recordar-a-un-abuelo/`,
  en: '/checklists/remembering-grandparent/',
  title: 'Mi abuela o mi abuelo: un libro para recordar',
  kind: 'Cuaderno para niños, para imprimir',
  seoTitle: 'Cuaderno de duelo para niños por la muerte de un abuelo o una abuela (para imprimir)',
  description: 'Un libro para recordar, gratuito y para imprimir, para un niño cuya abuela o abuelo ha muerto: la historia de la familia, anécdotas, recetas y recuerdos.',
  lead: 'Un libro para llenar sobre tu abuela o tu abuelo, y las historias de la familia que quieres guardar.',
  intro: paraAdultos('Es un buen libro para llenar junto con otros familiares, que pueden añadir historias que el niño nunca oyó.'),
  sections: [
    { h: 'Mi abuela o mi abuelo', prompts: [{ q: 'Yo le decía:', lines: 1 }, { q: 'Dibújale, o pega una foto.', draw: 300 }] },
    { h: 'De dónde venimos', prompts: [{ q: 'Dónde creció:', lines: 2 }, { q: 'Una historia de cuando era joven (¡pregunta a un adulto!):', lines: 4 }, { q: 'Dibuja nuestro árbol familiar.', draw: 300 }] },
    { h: 'Cosas que me enseñó', prompts: [{ q: 'Algo que me enseñó a hacer:', lines: 3 }, { q: 'Un dicho o una palabra que siempre usaba:', lines: 2 }, { q: 'Una comida o una receta que recuerdo:', lines: 3 }] },
    { h: 'Nuestro tiempo juntos', prompts: [{ q: 'Mi recuerdo favorito:', lines: 4 }, { q: 'Hoy me siento:', lines: 2 }, { q: 'Lo que quiero seguir haciendo para recordarle:', lines: 3 }] },
  ],
});

export const recordarMascota = workbook({
  slug: 'recordar-a-una-mascota',
  path: `${P}/recordar-a-una-mascota/`,
  en: '/checklists/remembering-pet/',
  title: 'Mi mascota: un libro para recordar',
  kind: 'Cuaderno para niños, para imprimir',
  seoTitle: 'Cuaderno para niños por la muerte de una mascota (para imprimir)',
  description: 'Un libro para recordar, gratuito y para imprimir, para un niño después de la muerte de una mascota: dibujos, momentos favoritos y sentimientos.',
  lead: 'Un libro para llenar sobre tu mascota.',
  intro: paraAdultos('Para muchos niños, una mascota es su primera experiencia con la muerte. Las respuestas sencillas y honestas ayudan.'),
  sections: [
    { h: 'Mi mascota', prompts: [{ q: 'El nombre de mi mascota:', lines: 1 }, { q: 'Qué animal era:', lines: 1 }, { q: 'Dibuja a tu mascota.', draw: 300 }] },
    { h: 'Todo sobre mi mascota', prompts: [{ q: 'Lo que más le gustaba hacer:', lines: 3 }, { q: 'Su comida o su juguete favorito:', lines: 2 }, { q: 'Algo tonto que hacía:', lines: 3 }] },
    { h: 'Para recordar', prompts: [{ q: 'Mi momento favorito con mi mascota:', lines: 3 }, { q: 'Cómo me siento ahora:', lines: 2 }, { q: 'Haz un dibujo para tu mascota.', draw: 260 }] },
  ],
});

// Cards for the Spanish printables index.
const CARD = {
  planificacion: ['Planificar', 'Sus personas, sus documentos, su dinero, su vida digital y sus deseos, en un solo lugar.'],
  funeral: ['Planificar', 'Para su propio funeral o reunión, o el de alguien que ha muerto.'],
  'hablar-con-un-padre': ['Planificar', 'Preguntas amables, con espacio para anotar las respuestas.'],
  cartas: ['Planificar', 'Preguntas para cartas que se lean después, y cómo asegurarse de que lleguen.'],
  'mi-historia': ['Planificar', 'Cuente su historia con sus palabras, para que su familia la cuente a su manera.'],
  'preguntas-para-el-medico': ['Enfermedad grave', 'Qué preguntar después de un diagnóstico, sobre el alivio y el hospicio.'],
  'primeras-24-horas': ['Después de una muerte', 'A quién llamar primero, qué hacer en el día y qué puede esperar.'],
  elogio: ['Después de una muerte', 'Preguntas, una forma sencilla en tres partes y espacio para el borrador.'],
  'lista-cuentas-en-linea': ['Después de una muerte', 'Qué guardar primero, dónde buscar y una tabla para cada cuenta.'],
  'recordar-a-alguien': ['Para niños', 'Páginas para dibujar y escribir sobre alguien que quieren y que murió.'],
  'recordar-a-un-abuelo': ['Para niños', 'Historias de la familia, recuerdos y recetas de un abuelo o una abuela.'],
  'recordar-a-una-mascota': ['Para niños', 'Momentos favoritos, sentimientos y dibujos para una mascota que murió.'],
};
const HREF = { 'primeras-24-horas': '/es/primeras-24-horas/', 'lista-cuentas-en-linea': '/es/lista-cuentas-en-linea/' };
const href = (slug) => HREF[slug] || `${P}/${slug}/`;

function card(slug, title) {
  const [tag, short] = CARD[slug];
  const m = META[slug] || { pages: 1, kb: 100 };
  return `<article class="pcard">
<div class="pcard-thumb"><img src="/thumbs/${slug}.png" alt="" width="367" height="475" loading="lazy"></div>
<div class="pcard-body">
<p class="tag">Gratis para imprimir · ${tag}</p>
<h3><a href="${href(slug)}">${title}</a></h3>
<p class="muted small">${short}</p>
<p class="pcard-actions"><a class="btn btn-small" href="/printables/${slug}.pdf" download>Descargar PDF<span class="sr-only">: ${title}</span></a> <a class="small" href="${href(slug)}">Abrir e imprimir<span class="sr-only">: ${title}</span></a></p>
<p class="small muted pcard-meta">${m.pages} ${m.pages === 1 ? 'página' : 'páginas'} · PDF de ${m.kb} KB</p>
</div>
</article>`;
}

export const ES_BINDER = [
  ['Planificar', [['planificacion', 'Hoja de planificación'], ['funeral', 'Planificador de funeral o celebración de vida'], ['hablar-con-un-padre', 'Hablar con un padre sobre el final de la vida'], ['cartas', 'Cartas para dejar'], ['mi-historia', 'Mi historia']]],
  ['Enfermedad grave y después de una muerte', [['preguntas-para-el-medico', 'Preguntas para el médico'], ['primeras-24-horas', 'Después de una muerte: las primeras 24 horas'], ['elogio', 'Escribir un elogio fúnebre'], ['lista-cuentas-en-linea', 'Cerrar sus cuentas en línea']]],
  ['Para niños en duelo', [['recordar-a-alguien', 'Alguien a quien quiero: un libro para recordar'], ['recordar-a-un-abuelo', 'Mi abuela o mi abuelo: un libro para recordar'], ['recordar-a-una-mascota', 'Mi mascota: un libro para recordar']]],
];

const indice = {
  path: `${P}/`,
  title: 'Hojas gratuitas para imprimir',
  seoTitle: 'Listas gratuitas para imprimir sobre el final de la vida',
  description: 'Hojas, listas y libros para recordar gratuitos para imprimir sobre el final de la vida. Sin cuenta ni correo.',
  body: `
<section class="section"><div class="wrap">
<h1>Hojas gratuitas para imprimir</h1>
<p class="lead" style="margin:20px 0 24px">Hojas, listas y libros para recordar. Gratis, sin cuenta y sin correo. Imprímalas, llénelas a mano y guárdelas donde su familia pueda encontrarlas.</p>
${reviewNote}
<div class="card binder-promo" style="margin-top:24px"><p class="tag">Todo junto</p><h2 style="margin-top:4px"><a href="${P}/carpeta/">La carpeta de End of Life Atlas</a></h2><p class="muted">Las doce hojas en un solo PDF, con portada e índice. Imprímala una vez y guárdela en un lugar seguro.</p><p><a class="btn btn-small" href="/printables/carpeta.pdf" download>Descargar la carpeta (PDF)</a> <a class="small" href="${P}/carpeta/">Qué incluye</a></p></div>
${ES_BINDER.map(([h, list]) => `<h2>${h}</h2><div class="cards" style="margin:20px 0 56px">${list.map(([s, t]) => card(s, t)).join('')}</div>`).join('\n')}
</div></section>`,
};

const FRONT = 2;
function carpeta() {
  let n = FRONT + 1;
  const total = ES_BINDER.flatMap(([, l]) => l).reduce((t, [s]) => t + ((META[s] || {}).pages || 1), 0) + FRONT;
  const m = META.carpeta;
  const rows = ES_BINDER.map(([h, list]) => `<h3>${h}</h3><ul class="binder-toc">${list
    .map(([s, t]) => {
      const row = `<li><a href="${href(s)}">${t}</a><span class="pg"><span class="sr-only">página </span>${n}</span></li>`;
      n += (META[s] || {}).pages || 1;
      return row;
    })
    .join('')}</ul>`).join('\n');
  return {
    path: `${P}/carpeta/`,
    title: 'La carpeta de End of Life Atlas',
    seoTitle: 'Carpeta gratuita para planificar el final de la vida: todas las hojas en un PDF',
    description: 'Todas las hojas, listas y libros para recordar de End of Life Atlas en un solo PDF gratuito, con portada e índice. Sin cuenta ni correo.',
    body: `
<section class="section">
<div class="wrap prose">
<p class="small no-print"><a href="${P}/">Todas las hojas para imprimir</a></p>
<div class="binder-cover">
<p class="eyebrow">Carpeta gratuita para imprimir</p>
<h1>La carpeta de End of Life Atlas</h1>
<p class="lead" style="margin:20px 0">Todas las hojas, listas y libros para recordar en un solo PDF. Imprímala, guárdela en una carpeta, llene lo que pueda y dígale a alguien dónde está.</p>
<div class="binder-for print-only">
<p>Esta carpeta es de: ${blank}</p>
<p>Si está leyendo esto porque no puedo hablar por mí o porque he muerto, empiece por la hoja de planificación. Mi directiva anticipada está guardada en: ${blank}</p>
<p>Mis mascotas, y a quién llamar para que las cuide: ${blank} (más detalles en el recuadro «Mis mascotas» de la hoja de planificación)</p>
<p>Empezada el: ${blank} Última actualización: ${blank}</p>
</div>
</div>
${m ? `<div class="dl-panel no-print"><img src="/thumbs/carpeta.png" alt="" width="367" height="475"><div><p class="tag">Para imprimir · Todo</p><p class="dl-meta">${m.pages} páginas · PDF de ${(m.kb / 1024).toFixed(1)} MB · Sin registrarse</p><div class="actions"><a class="btn" href="/printables/carpeta.pdf" download>Descargar la carpeta (PDF)</a></div><p class="small muted" style="margin:12px 0 0">O imprima solo las partes que necesite desde la <a href="${P}/">página de hojas para imprimir</a>.</p></div></div>` : ''}
<div class="no-print">${reviewNote}</div>
<div class="binder-contents">
<h2>Índice</h2>
<p class="muted small">${total} páginas. Llénelas a mano. Sáltese lo que no encaje.</p>
${rows}
<p class="muted small">El formulario de directiva anticipada de su estado no está incluido, porque cada estado tiene el suyo: encuentre el suyo en eolatlas.org/es/directivas-anticipadas/ y guárdelo en esta carpeta.</p>
</div>
${footer}
</div>
</section>`,
  };
}

pair('/checklists/', `${P}/`);
pair('/checklists/binder/', `${P}/carpeta/`);

export const esPrintPages = [indice, planificacion, preguntas, funeral, hablar, elogio, cartas, historia, recordarAlguien, recordarAbuelo, recordarMascota, carpeta()];
