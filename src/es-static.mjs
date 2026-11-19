// Spanish: finding help, about, privacy, accessibility, suggestions, and
// one advance directive page per state. Same content as the English pages.
import { readFileSync } from 'node:fs';
import { esc, fmtDateEs, site, pair } from './layout.mjs';
import { icons } from './icons.mjs';
import { linkCards, dirCard, infoCard } from './ui.mjs';
import { reviewNote } from './es.mjs';
import { estado } from './es-names.mjs';

const ad = JSON.parse(readFileSync(new URL('./data/advance-directives.json', import.meta.url), 'utf8'));
const formKey = process.env.FORMS_ACCESS_KEY || '';
const publicUrl = (process.env.SITE_PUBLIC_URL || site.url).replace(/\/$/, '');
const analyticsOn = Boolean(process.env.GOATCOUNTER_CODE);
const MAID_ES = '/es/muerte-medicamente-asistida';

const ayuda = {
  path: '/es/encontrar-ayuda/',
  title: 'Encontrar ayuda cerca de usted',
  description: 'Directorios independientes para encontrar hospicios, cuidados paliativos, grupos de consumidores de funerales, entierro ecológico, doulas del final de la vida y apoyo en el duelo, en EE. UU. y otros países.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Encontrar ayuda cerca de usted</h1>
<p class="lead" style="margin:20px 0">Directorios independientes, la mayoría de organizaciones sin fines de lucro y de gobiernos. No listamos empresas, no cobramos por aparecer y no evaluamos a los proveedores de estos directorios, así que haga preguntas antes de elegir. La mayoría de estos sitios están en inglés.</p>
${reviewNote}
<h2>Hospicio y cuidados paliativos</h2>
<div class="cards cards-tight">
${dirCard('https://www.medicare.gov/care-compare/?providerType=Hospice', 'Medicare Care Compare', 'EE. UU.', 'Encuentre hospicios, con calificaciones de calidad.')}
${dirCard('https://www.hospiceuk.org/', 'Hospice UK', 'Reino Unido', 'Hospicios y apoyo en todo el Reino Unido.')}
${dirCard('https://www.virtualhospice.ca/', 'Canadian Virtual Hospice', 'Canadá', 'Información y apoyo de expertos en cuidados paliativos.')}
${dirCard('https://www.ehospice.com/', 'ehospice', 'Internacional', 'Noticias y servicios de cuidados paliativos en el mundo.')}
</div>
<h2>Funerales y entierro</h2>
<div class="cards cards-tight">
${dirCard('https://www.funerals.org/', 'Funeral Consumers Alliance', 'EE. UU.', 'Grupos de consumidores sin fines de lucro; algunos encuestan precios de funerales locales.')}
${dirCard('https://www.greenburialcouncil.org/', 'Green Burial Council', 'EE. UU. y otros países', 'Proveedores y terrenos de entierro ecológico certificados.')}
</div>
<h2>Donación del cuerpo y de órganos</h2>
<div class="cards">
${dirCard('https://registerme.org/', 'Register Me (Donate Life America)', 'EE. UU.', 'El registro nacional de donantes de órganos, ojos y tejidos.')}
${dirCard('https://www.hta.gov.uk/donating-your-body', 'Human Tissue Authority', 'Reino Unido', 'Donar el cuerpo a una facultad de medicina.')}
${dirCard('https://www.organtissuedonation.ca/', 'Donación de órganos y tejidos', 'Canadá', 'Registros de donantes por provincia y territorio.')}
<a class="ocard" href="/es/opciones-para-el-cuerpo/#donacion">${icons.donation}<strong>Elegir un programa de donación del cuerpo</strong><span class="muted small">Qué preguntar, y todos los registros que listamos.</span></a>
</div>
<h2>Doulas del final de la vida</h2>
<div class="cards cards-tight">
${dirCard('https://www.nedalliance.org/', 'National End-of-Life Doula Alliance', 'EE. UU.', 'Un directorio de doulas del final de la vida.')}
${dirCard('https://www.inelda.org/', 'INELDA', 'Internacional', 'Directorio de la International End of Life Doula Association.')}
</div>
<h2>Apoyo en el duelo</h2>
<div class="cards cards-tight">
${dirCard('https://www.dougy.org/', 'The Dougy Center', 'EE. UU.', 'Apoyo para niños en duelo, con un directorio de programas.')}
${dirCard('https://www.compassionatefriends.org/', 'The Compassionate Friends', 'EE. UU. y otros países', 'Para familias después de la muerte de un hijo.')}
</div>
<p>Su hospicio local es otro buen punto de partida: la mayoría ofrecen apoyo gratuito en el duelo, incluso si la persona que murió no estaba a su cuidado.</p>
<h2>Muerte médicamente asistida</h2>
<div class="cards cards-tight">
${dirCard('https://wfrtds.org/', 'World Federation of Right to Die Societies', 'Internacional', 'Organizaciones miembro por país.')}
<a class="ocard" href="${MAID_ES}/">${icons.maid}<strong>Nuestra sección sobre la muerte médicamente asistida</strong><span class="muted small">Dónde es legal, con fuentes oficiales de cada lugar.</span></a>
</div>
<h2>En una crisis</h2>
<p>Si está pensando en el suicidio, llame o envíe un mensaje de texto al 988 en EE. UU. (hay atención en español), o <a href="https://findahelpline.com">busque una línea de ayuda en su país</a>.</p>
</div></section>`,
};

const acerca = {
  path: '/es/acerca/',
  title: 'Sobre End of Life Atlas',
  description: 'Cómo se financia End of Life Atlas, cómo verificamos los datos y quién revisa nuestras guías.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Sobre End of Life Atlas</h1>
<p class="lead" style="margin:20px 0">Un solo lugar para todo lo relacionado con el final de la vida: claro, internacional, sin juicios y respetuoso con el derecho de cada persona a morir con dignidad.</p>
${reviewNote}
<section class="founder-note" aria-labelledby="fundadora-h">
<h2 id="fundadora-h">Una nota de quien lo creó</h2>
<p>Creé End of Life Atlas porque no encontraba un solo lugar que contara toda la verdad sobre el final de la vida.</p>
<p>Quien ha visto a alguien que quiere consumirse y morir sabe que la mayoría de las guías no cuentan cómo es de verdad. Te dicen qué hacer, o qué elegir. Yo quería algo distinto: un solo lugar, para cualquier persona en cualquier país, que explique cada opción con claridad, no juzgue y respete el derecho de cada persona a morir con dignidad.</p>
<p>Vivo en el extranjero, y me preocupo por mi madre en Estados Unidos. Cuando vives lejos de las personas que quieres, no puedes ir en coche a resolver las cosas. Necesitas información clara sobre las reglas de donde están ellas y de donde estás tú. Por eso este atlas cubre más de un país, y por eso seguirá añadiendo más.</p>
<p>Sea lo que sea lo que está afrontando, y esté donde esté, espero que encuentre aquí lo que necesita, y que se sienta respetado mientras lo busca.</p>
<p class="signature">KW</p>
</section>
<h2 id="por-que">Por qué existe este atlas</h2>
<p>Planificar el final de la vida suele significar reunir piezas de médicos, abogados, funerarias, gobiernos y grupos de defensa. Cada uno cubre una parte, a menudo de un solo país, y algunos tienen algo que vender o una postura que promover. End of Life Atlas lo reúne en un solo lugar.</p>
<h2 id="principios">Lo que creemos</h2>
<div class="cards cards-tight">
${infoCard('plan', 'Todo en un solo lugar', 'De las directivas anticipadas al duelo, incluidos los temas que otros sitios evitan.')}
${infoCard('scale', 'Sin juicios', 'Explicamos cada opción legal y no le empujamos hacia ninguna. La decisión es de la persona cuya vida es.')}
${infoCard('globe', 'Internacional', 'Las personas viven, tienen casas y mueren entre fronteras. Decimos a qué país se aplica cada regla.')}
${infoCard('loved', 'Dignidad', 'Toda persona merece morir en sus propios términos, y toda familia merece información clara y honesta.')}
</div>
<h2 id="financiacion">Cómo nos financiamos</h2>
<p><strong>End of Life Atlas es un sitio voluntario, hecho solo para compartir información.</strong> No tiene modelo de negocio ni necesita financiación, así que no hay nadie a quien complacer salvo a quienes lo leen, ni ninguna razón para favorecer una opción, un proveedor o un punto de vista.</p>
<p>No hay publicidad, ni patrocinio, ni comisiones por recomendaciones, ni nada a la venta. Las guías y las listas son gratuitas.</p>
<h2 id="editorial">Política editorial y de revisión</h2>
<ul>
<li>Los datos vienen de fuentes oficiales o de informes con nombre, enlazados en la página.</li>
<li>Lo que no hemos confirmado está marcado como "por verificar".</li>
<li>Cada mes revisamos todo el sitio: cada enlace externo, la situación de cada ley que cubrimos y las cifras clave (costos, umbrales y tarifas). Corregimos lo que esté desactualizado y anotamos la fecha. Última revisión: ${fmtDateEs(site.lastScan)}.</li>
<li>Cada guía muestra también cuándo se escribió o se revisó por última vez, y cada página de un lugar muestra cuándo se verificó su ley por última vez.</li>
<li>Solo cubrimos opciones legales.</li>
<li>Las páginas en español traducen las páginas en inglés, con los mismos datos y fuentes, y están pendientes de revisión por un hablante nativo.</li>
</ul>
<p>¿Vio un error o algo desactualizado? <a href="/es/sugerencias/">Envíe una sugerencia</a>; puede quedar en el anonimato.</p>
<h2 id="revisores">Nuestros revisores</h2>
<p>Estamos nombrando a un médico con experiencia en el final de la vida y a un abogado para revisar nuestras guías. Sus nombres aparecerán aquí y en cada página que revisen.</p>
</div></section>`,
};

const sugerencias = {
  path: '/es/sugerencias/',
  title: 'Envíe una sugerencia',
  description: 'Envíe una sugerencia, una corrección o una pregunta a la persona que lleva End of Life Atlas. Anónimo si quiere: su nombre y su correo son opcionales.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Envíe una sugerencia</h1>
<p class="lead" style="margin:20px 0">¿Vio un error, echa algo en falta o tiene una idea? Díganos aquí. Puede quedar en el anonimato: solo el mensaje es obligatorio.</p>
<p class="small muted">Su mensaje llega en privado a la persona que lleva este sitio. Añada su correo solo si quiere una respuesta. Por favor, no incluya datos médicos ni nada que no quiera que se guarde. Este formulario no se atiende para emergencias: si está en crisis, llame o envíe un mensaje de texto al 988 en EE. UU. (hay atención en español), o <a href="https://findahelpline.com">busque una línea de ayuda</a>.</p>
${formKey ? `<form class="form suggest-form" method="POST" action="https://api.web3forms.com/submit">
<input type="hidden" name="access_key" value="${esc(formKey)}">
<input type="hidden" name="subject" value="End of Life Atlas: una nueva sugerencia (español)">
<input type="hidden" name="from_name" value="End of Life Atlas: sugerencias">
<input type="hidden" name="redirect" value="${publicUrl}/es/sugerencias/gracias/">
<p hidden><label>Deje esto vacío <input type="checkbox" name="botcheck" tabindex="-1"></label></p>
<div class="field" style="flex-basis:100%"><label for="s-topic">¿Sobre qué es?</label>
<select id="s-topic" name="topic">
<option>Una sugerencia o idea</option>
<option>Una corrección o información desactualizada</option>
<option>Algo difícil de usar (accesibilidad)</option>
<option>Un error en la traducción</option>
<option>Una pregunta sobre privacidad</option>
<option>Otra cosa</option>
</select></div>
<div class="field" style="flex-basis:100%"><label for="s-message">Su mensaje (obligatorio)</label><textarea id="s-message" name="message" rows="7" required></textarea></div>
<div class="field" style="flex-basis:100%"><label for="s-page">¿Qué página? (opcional)</label><input id="s-page" name="page" type="text"></div>
<div class="field"><label for="s-name">Su nombre (opcional)</label><input id="s-name" name="name" type="text" autocomplete="name"></div>
<div class="field"><label for="s-email">Su correo (opcional, solo si quiere una respuesta)</label><input id="s-email" name="email" type="email" autocomplete="email"></div>
<button class="btn" type="submit">Enviar</button>
</form>` : `<div class="notice"><strong>Estamos preparando el formulario de sugerencias.</strong> Vuelva pronto, por favor.</div>`}
</div></section>`,
};

const gracias = {
  path: '/es/sugerencias/gracias/',
  title: 'Gracias',
  description: 'Su sugerencia se envió.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Gracias</h1>
<p class="lead" style="margin:20px 0">Su mensaje se envió. Leemos cada sugerencia.</p>
<p><a href="/es/">Volver al inicio</a></p>
</div></section>`,
};

const privacidad = {
  path: '/es/privacidad/',
  title: 'Privacidad',
  description: 'End of Life Atlas no recoge información personal: sin cuentas, sin listas de correo y sin rastreo. El formulario de sugerencias es anónimo.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Privacidad</h1>
<p class="lead" style="margin:20px 0">Es un tema delicado, así que no recogemos nada sobre usted.</p>
<ul>
<li>No hay cuentas ni listas de correo. No usamos cookies de publicidad ni de rastreo.</li>
${analyticsOn ? '<li><strong>Estadísticas de visitas:</strong> contamos las páginas vistas con <a href="https://www.goatcounter.com/">GoatCounter</a>, que no usa cookies, no recoge información personal y no le sigue por otros sitios. Nos dice cosas como qué páginas se leen y, de forma aproximada, de qué países vienen las visitas.</li>' : ''}
<li><strong>Sugerencias:</strong> si usa el <a href="/es/sugerencias/">formulario de sugerencias</a>, su mensaje se envía por correo a la persona que lleva el sitio, a través de <a href="https://web3forms.com/">Web3Forms</a>, un servicio que convierte formularios en correos. Su nombre y su correo son opcionales.</li>
<li><strong>La app:</strong> si <a href="/es/app/">instala la app</a> o usa el sitio sin conexión, las páginas que abre se guardan solo en su dispositivo, para que funcionen sin conexión. No se nos envía nada.</li>
<li>Las listas, el buscador de lugares y el asistente de preguntas funcionan en su navegador y no guardan nada. Las preguntas que escribe no se guardan ni se envían a ningún lugar.</li>
<li>Como cualquier sitio web, el servicio que aloja el sitio (GitHub Pages) guarda registros técnicos habituales, como las direcciones IP, para que el sitio funcione y esté protegido, y las fuentes tipográficas se cargan desde Google Fonts, que también ve su dirección IP. No usamos esto para identificarle ni seguirle.</li>
</ul>
<p>¿Preguntas sobre la privacidad? <a href="/es/sugerencias/">Envíenos un mensaje</a>.</p>
</div></section>`,
};

const accesibilidad = {
  path: '/es/accesibilidad/',
  title: 'Accesibilidad',
  description: 'Declaración de accesibilidad de End of Life Atlas: nuestros objetivos de WCAG 2.2 AA y Sección 508, cómo lo comprobamos y cómo informar de un problema.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Accesibilidad</h1>
<p class="lead" style="margin:20px 0">End of Life Atlas debe poder usarlo todo el mundo, incluidas las personas que usan lectores de pantalla, el teclado, la ampliación o el control por voz.</p>
<h2>Nuestro estándar</h2>
<p>Buscamos cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 en el nivel AA. Eso también cubre las normas de la Sección 508, que adoptan el nivel AA de las WCAG.</p>
<h2>Lo que hacemos</h2>
<ul>
<li>Cada página puede usarse solo con el teclado, con un contorno de foco visible y un enlace para "ir al contenido principal".</li>
<li>Las páginas usan encabezados reales, regiones, campos de formulario con etiqueta y encabezados de tabla, para que los lectores de pantalla puedan recorrerlas.</li>
<li>El texto y los controles cumplen las proporciones de contraste de las WCAG, y nada depende solo del color.</li>
<li>Las páginas funcionan con un zoom del 400 % y en pantallas de 320 píxeles de ancho sin desplazamiento lateral.</li>
<li>Las palabras en otros idiomas están marcadas, para que los lectores de pantalla las pronuncien bien.</li>
<li>No hay videos, animaciones, límites de tiempo ni ventanas emergentes.</li>
<li>Las listas se imprimen limpias para quien prefiere el papel.</li>
</ul>
<h2>Cómo lo comprobamos</h2>
<p>Antes de cada actualización, cada página se comprueba automáticamente con las reglas A y AA de las WCAG 2.2 (con axe-core) en anchos de computadora y de teléfono, y se comprueba el foco del teclado. Las pruebas automáticas no lo detectan todo, así que también revisamos páginas a mano. Última prueba: ${fmtDateEs(site.lastVerified)}.</p>
<h2>Limitaciones conocidas</h2>
<p>Algunas páginas enlazan a sitios web y documentos de otras organizaciones, que no podemos hacer accesibles nosotros. Muchos de ellos solo están en inglés.</p>
<h2>Informar de un problema</h2>
<p>Si algo de este sitio es difícil de usar, <a href="/es/sugerencias/">envíe un mensaje</a> y díganos la página y qué pasó. Cuando podamos, le daremos la información de otra forma.</p>
</div></section>`,
};

// One Spanish page per state, from the same data as the English pages.
const KIND_ES = { form: 'Formulario oficial del estado', law: 'Formulario o reglas en la ley del estado', info: 'Información oficial del estado', partner: 'Fuente reconocida por el estado' };
const card = (kind, label, url, text = '') =>
  `<a class="ocard dcard" href="${esc(url)}"><span class="tag">${esc(kind)}</span><strong>${esc(label)}</strong>${text ? `<span class="muted small">${esc(text)}</span>` : ''}<span class="dcard-host small">${new URL(url).hostname.replace(/^www\./, '')} · en inglés</span></a>`;

const pasos = `<ol>
<li><strong>Elija a su persona.</strong> Un representante (también llamado agente o apoderado) y un suplente. Pregúnteles primero.</li>
<li><strong>Hable con ellos.</strong> Dígales qué es importante para usted: qué pasaría para tener más tiempo, y qué no querría.</li>
<li><strong>Llene el formulario.</strong> Normalmente no hace falta un abogado. Puede saltarse las partes que no quiera responder.</li>
<li><strong>Fírmelo como indica el formulario.</strong> La mayoría de los estados exigen testigos, un notario, o cualquiera de los dos, y limitan quién puede ser testigo (a menudo no su representante ni un familiar). Siga las instrucciones del propio formulario; no las resumimos aquí porque es fácil equivocarse.</li>
<li><strong>Dé copias</strong> a su representante, a su suplente, a su médico y a su hospital. Guarde el original donde se pueda encontrar, no en una caja de seguridad del banco.</li>
<li><strong>Revíselo</strong> después de un diagnóstico nuevo, un divorcio, una muerte en la familia o una mudanza a otro estado.</li>
</ol>`;

function statePage(s) {
  const path = `/es/directivas-anticipadas/${s.slug}/`;
  const name = estado(s.name);
  pair(`/plan-ahead/advance-directives/${s.slug}/`, path);
  const official = s.links.map((l) => card(KIND_ES[l.kind], l.label, l.url)).join('');
  return {
    path,
    title: `Directiva anticipada en ${name}`,
    seoTitle: `Formularios de directiva anticipada y testamento vital de ${name} (gratis, oficiales)`,
    description: `Formularios gratuitos de directiva anticipada de ${name}: el formulario oficial del estado o la ley que lo establece, un formulario gratuito para el estado y cómo hacerlo válido.`,
    article: { modified: ad.verified },
    stateForm: true,
    body: `
<section class="page-hero">
<div class="wrap prose">
<div class="hero-icon">${icons.plan}</div>
<p class="eyebrow">Directivas anticipadas por estado</p>
<h1>Directiva anticipada en ${esc(name)}</h1>
<p class="lead" style="margin-top:20px">Dónde conseguir un formulario gratuito de ${esc(name)} para sus deseos médicos y para nombrar a la persona que habla por usted, y qué hacer cuando esté lleno.</p>
<p class="small muted" style="margin:0">Enlaces revisados: ${fmtDateEs(ad.verified)} · <a href="/es/acerca/#editorial">Cómo verificamos</a></p>
${reviewNote}
</div>
</section>
<section class="section">
<div class="wrap prose">
<h2 id="formularios">Los formularios</h2>
${s.called ? `<p>En ${esc(name)}, los documentos suelen llamarse (en inglés): <strong lang="en">${esc(s.called)}</strong>. Mucha gente llama a cualquiera de ellos testamento vital.</p>` : ''}
${s.links.length ? '' : `<p>No encontramos un formulario publicado por el gobierno de ${esc(name)}. La ley del estado establece un formulario que puede usar; el formulario de CaringInfo de abajo lo sigue.</p>`}
<div class="cards" style="margin-top:20px">
${official}
${card('Formulario gratuito del estado', `Directiva anticipada de ${name} de CaringInfo`, s.caringinfo, 'CaringInfo es el programa para el público de la National Alliance for Care at Home, la asociación de hospicios y cuidados en casa de EE. UU.')}
</div>
<p class="small muted">Cada estado permite usar su formulario, y la mayoría también aceptan otro formulario que cumpla sus reglas. Si ya tiene una directiva válida, no necesita una nueva. Los formularios están en inglés.</p>
${s.registry ? `<h2 id="registro">Registrarla</h2><p>${esc(s.registryEs || s.registry)}</p><p>Una directiva es válida aunque no se registre; registrarla solo ayuda a que los hospitales la encuentren.</p>` : ''}
<h2 id="pasos">Para que tenga validez</h2>
${pasos}
<h2 id="varios-lugares">Si reparte su tiempo entre varios lugares</h2>
<p>La mayoría de los estados aceptan una directiva hecha en otro estado si era válida donde se firmó, pero los hospitales se sienten más cómodos con el formulario de su propio estado. Si vive en dos estados, o en el extranjero, considere hacer una para cada lugar. Vea <a href="/es/propiedades-en-el-extranjero/">propiedades en el extranjero</a> para planificar entre países.</p>
<h2 id="polst">No es lo mismo que un POLST</h2>
<p>La directiva anticipada es para el futuro. Si está gravemente enfermo ahora, pregunte a su médico por un POLST (también llamado MOLST, POST o MOST), una orden médica que siguen los servicios de emergencia. Vea <a href="/es/enfermedad-grave/#polst">enfermedad grave</a>.</p>
<h2 id="relacionado">Relacionado</h2>
${linkCards([
      ['/es/directivas-anticipadas/', 'Todos los estados', 'Formularios de directiva anticipada de los 50 estados y DC.', 'plan'],
      ['/es/planificar/', 'Planificar con tiempo', 'Elegir a su representante y tener la conversación.', 'plan'],
      ['/es/imprimibles/planificacion/', 'Hoja de planificación', 'Anote dónde está guardada su directiva.', 'printer'],
    ])}
<p class="small muted" style="margin-top:24px">Información, no consejo legal. Los formularios y las reglas cambian; las instrucciones del propio formulario son la última palabra. ¿Un enlace roto? <a href="/es/sugerencias/">Díganos</a>.</p>
</div>
</section>`,
  };
}

pair('/finding-help/', '/es/encontrar-ayuda/');
pair('/about/', '/es/acerca/');
pair('/suggestions/', '/es/sugerencias/');
pair('/suggestions/thanks/', '/es/sugerencias/gracias/');
pair('/privacy/', '/es/privacidad/');
pair('/accessibility/', '/es/accesibilidad/');

export const esStaticPages = [ayuda, acerca, sugerencias, gracias, privacidad, accesibilidad, ...ad.states.map(statePage)];
