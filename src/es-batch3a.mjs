// Spanish: wills, trusts and the paperwork; wills when you own property
// abroad. Same facts and sources as the English guides.
import { pair } from './layout.mjs';
import { esGuide } from './es.mjs';

const L = (href, text) => `<a class="src-link" href="${href}">${text}</a>`;
const EN = ' (en inglés)';

export const testamentos = esGuide({
  path: '/es/testamentos-y-fideicomisos/',
  title: 'Testamentos, fideicomisos y papeles',
  seoTitle: 'Testamentos, fideicomisos y sucesión: reglas por estado de EE. UU., Canadá, Reino Unido y Australia',
  eyebrow: 'Planificar',
  icon: 'wills',
  description: 'Qué hace cada documento (testamento, poderes, fideicomiso, beneficiarios) y cómo cambian las reglas entre los estados de EE. UU., Canadá, el Reino Unido y Australia.',
  lead: 'Unos pocos documentos le ahorran a su familia meses de trabajo y de gastos. Esto es lo que hace cada uno, y cómo cambian las reglas entre los estados de EE. UU., Canadá, el Reino Unido y Australia.',
  glance: [['15 millones', 'Desde aquí se aplica el impuesto federal sobre el patrimonio en EE. UU. en 2026 (dólares)'], ['12 + DC', 'Estados de EE. UU. con su propio impuesto sobre el patrimonio'], ['2 testigos', 'Necesarios para un testamento en la mayoría de los estados']],
  sections: [
    { id: 'documentos', h: 'Los documentos básicos', icon: 'check', html: `<ul>
<li>Un <strong>testamento</strong>: quién recibe qué, quién se encarga (su albacea) y quién criaría a sus hijos.</li>
<li>Un <strong>poder financiero duradero</strong>: quién maneja su dinero si usted no puede.</li>
<li>Una <strong>directiva anticipada y un poder para decisiones de salud</strong>: sus deseos médicos y quién habla por usted. Vea <a href="/es/planificar/">planificar con tiempo</a>.</li>
<li><strong>Designaciones de beneficiarios al día</strong> en las cuentas de jubilación, los seguros de vida y las cuentas bancarias.</li>
<li>Una <strong>lista de dónde está todo</strong>: use la <a href="/es/imprimibles/planificacion/">hoja de planificación</a>.</li>
<li>A veces, un <strong>fideicomiso</strong> (vea más abajo).</li></ul>` },
    { id: 'testamento', h: 'Lo que hace un testamento, y lo que no', icon: 'wills', html: `<p>Un testamento cubre lo que usted tiene solo a su nombre. No controla:</p>
<ul><li>Las cuentas y pólizas con un beneficiario nombrado, como las cuentas de jubilación y los seguros de vida. Manda el formulario de beneficiario, aunque el testamento diga otra cosa.</li>
<li>Los bienes que tiene en propiedad conjunta con derecho de supervivencia, que pasan al otro propietario.</li>
<li>Lo que esté en un fideicomiso.</li></ul>
<p>Así que revise sus formularios de beneficiario cada vez que actualice su testamento. Los formularios desactualizados, por ejemplo con una expareja como beneficiaria, son uno de los errores más comunes y dolorosos.</p>` },
    { id: 'validez', h: 'Que un testamento sea válido: lo que cambia según el estado', icon: 'doc', html: `<ul>
<li><strong>En todo EE. UU.:</strong> debe ser adulto y estar en su sano juicio, y el testamento debe estar por escrito y firmado.</li>
<li><strong>Testigos:</strong> la mayoría de los estados exigen dos testigos adultos, mejor si son personas que no heredan nada en el testamento.</li>
<li><strong>Testamentos a mano:</strong> ${L('https://www.alllaw.com/articles/nolo/wills-trusts/are-handwritten-holographic-wills-valid.html', 'cerca de la mitad de los estados aceptan un testamento escrito por completo a mano')} y firmado, incluso sin testigos. El resto no.</li>
<li><strong>Declaración notarial "autoprobatoria":</strong> la mayoría de los estados permiten añadirla, para que no haya que buscar a los testigos después. Vale la pena.</li>
<li><strong>Testamentos electrónicos:</strong> por ahora solo se permiten en pocos estados.</li>
<li><strong>Luisiana es distinta.</strong> Sigue un sistema de derecho civil, con sus propios formatos de testamento y reglas limitadas de herencia forzosa para hijos pequeños o con discapacidad.</li></ul>
<p>Si se muda, un testamento válido en un estado suele aceptarse en otro, pero hágalo revisar, porque las reglas sobre los bienes y el cónyuge cambian.</p>
<p>Fuera de EE. UU., las reglas son otras: vea Canadá, el Reino Unido y Australia más abajo, y <a href="/es/propiedades-en-el-extranjero/">testamentos cuando tiene propiedades en el extranjero</a>.</p>` },
    { id: 'conyuges', h: 'Parejas casadas: bienes gananciales y derechos del cónyuge', icon: 'people', html: `<ul>
<li>${L('https://www.nerdwallet.com/estate-planning/learn/community-property', 'Nueve estados con régimen de bienes gananciales')} (Arizona, California, Idaho, Luisiana, Nevada, Nuevo México, Texas, Washington y Wisconsin) suelen considerar que lo ganado durante el matrimonio pertenece por mitades a cada cónyuge. Por testamento solo puede dejar su propia mitad.</li>
<li>En la mayoría de los demás estados, el cónyuge sobreviviente puede reclamar una parte del patrimonio (una "parte electiva") aunque el testamento le deje menos.</li></ul>` },
    { id: 'fideicomisos', h: 'Fideicomisos', icon: 'shield', html: `<p>Un <strong>fideicomiso en vida revocable</strong> guarda sus bienes mientras usted vive, bajo su control, y los pasa a sus beneficiarios sin proceso sucesorio.</p>
<ul><li><strong>Ventajas:</strong> evita la sucesión para lo que está en el fideicomiso, mantiene la privacidad y puede facilitar el manejo si usted deja de poder hacerlo.</li>
<li><strong>Desventajas:</strong> cuesta más crearlo, y solo funciona con los bienes que usted pasa de verdad a él (lo que se llama "fondear" el fideicomiso). Por sí solo no reduce impuestos ni protege de los acreedores.</li>
<li><strong>Útil cuando:</strong> tiene bienes en más de un estado, quiere privacidad, tiene una familia reconstituida o vive en un estado donde la sucesión es lenta o cara.</li></ul>
<p>Otros fideicomisos, como los fideicomisos para necesidades especiales de un beneficiario con discapacidad, los fideicomisos para hijos menores, los fideicomisos irrevocables para planificación fiscal o de Medicaid y los fideicomisos para mascotas, necesitan un abogado.</p>` },
    { id: 'sin-sucesion', h: 'Pasar bienes sin proceso sucesorio', icon: 'steps', html: `<ul>
<li>Designaciones de pago o transferencia al fallecer en las cuentas bancarias y de inversión.</li>
<li>Escrituras de transferencia al fallecer para una vivienda, permitidas en muchos estados, pero no en todos.</li>
<li>La propiedad conjunta con derecho de supervivencia. Tenga cuidado: añadir a un hijo a su cuenta o escritura puede exponerla a sus deudas o a su divorcio, y puede tener efectos fiscales.</li>
<li>Los procedimientos para patrimonios pequeños: todos los estados tienen un proceso más sencillo para patrimonios pequeños, pero los límites cambian mucho.</li></ul>` },
    { id: 'poderes', h: 'Poderes', icon: 'hand', html: `<p>Un poder financiero duradero permite que alguien maneje su dinero y sus bienes si usted no puede. Sin él, su familia puede tener que pedir a un tribunal una tutela o curatela, lo que es lento, caro y público. Los formularios y las reglas de firma cambian según el estado, y algunos bancos tienen sus propios formularios, así que pregunte en el suyo.</p>` },
    { id: 'impuestos', h: 'Impuestos sobre el patrimonio y la herencia', icon: 'costs', html: `<ul>
<li><strong>Impuesto federal sobre el patrimonio:</strong> solo se aplica a ${L('https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax', 'patrimonios de más de 15 millones de dólares en 2026')}, así que la mayoría de las familias no pagan nada.</li>
<li><strong>Impuesto estatal sobre el patrimonio:</strong> ${L('https://taxfoundation.org/data/all/state/estate-inheritance-taxes/', '12 estados y el Distrito de Columbia tienen uno')}, algunos a partir de cantidades mucho menores; el de Oregón empieza en 1 millón de dólares.</li>
<li><strong>Impuesto estatal sobre la herencia</strong> (lo paga quien hereda): ${L('https://www.aarp.org/money/retirement/states-with-estate-inheritance-taxes/', 'Kentucky, Maryland, Nebraska, Nueva Jersey y Pensilvania')}. El cónyuge suele estar exento, y a menudo también los hijos. Maryland tiene los dos impuestos.</li></ul>` },
    { id: 'digital', h: 'Su vida digital', icon: 'key', html: `<p>Muchas cuentas le permiten nombrar a alguien ahora: el <a href="https://support.apple.com/es-us/102631">contacto de legado de Apple</a>, el <a href="https://support.google.com/accounts/answer/3036546?hl=es">Administrador de cuentas inactivas de Google</a> y el <a href="https://www.facebook.com/help/1568013990080948">contacto de legado de Facebook</a>. Un gestor de contraseñas con acceso de emergencia también ayuda. Nunca escriba contraseñas en su testamento, que puede volverse un documento público.</p>
<p>Cuando alguien ha muerto, vea <a href="/es/cuentas-en-linea/">cerrar sus cuentas en línea</a>.</p>` },
    { id: 'canada', h: 'En Canadá', icon: 'globe', html: `<p>Los testamentos y las sucesiones dependen de cada provincia y territorio, así que las reglas dependen de dónde vive.</p>
<ul>
<li><strong>Un testamento válido:</strong> ${L('https://www.canadianlawyermag.com/practice-areas/trusts-and-estates/how-to-craft-valid-wills-in-canada/381456', 'un testamento escrito a máquina debe firmarse ante dos testigos presentes a la vez')}. La mayoría de las provincias también aceptan un testamento escrito por completo a mano y firmado, sin testigos; Columbia Británica y la Isla del Príncipe Eduardo, en general, no, aunque un tribunal de Columbia Británica a veces puede aceptarlo.</li>
<li><strong>Quebec es distinta.</strong> Sigue un sistema de derecho civil. Un testamento hecho ante notario (testamento notarial) ${L('https://canadalife.com/investing-saving/estate-planning/wills-101-what-is-will/types-of-wills.html', 'no necesita proceso sucesorio')}; los testamentos a mano y con testigos sí deben ser verificados por un tribunal o un notario.</li>
<li><strong>El matrimonio:</strong> en algunas provincias, casarse anula un testamento anterior. En otras, como Ontario (desde 2022) y Columbia Británica, no. Compruebe la suya y revise su testamento cuando se case o se separe.</li>
<li><strong>Las tasas sucesorias cambian mucho.</strong> ${L('https://www.ontario.ca/page/estate-administration-tax', 'Ontario cobra 15 dólares por cada 1.000')} del valor de un patrimonio por encima de 50.000 (1,5 %). Algunas provincias cobran mucho menos, y un testamento notarial de Quebec evita la sucesión.</li>
<li><strong>Beneficiarios:</strong> en la mayoría de las provincias puede nombrar un beneficiario en un RRSP, un RRIF o una TFSA para que pase fuera del testamento; Quebec lo permite sobre todo con productos de seguros.</li>
<li><strong>Los poderes también son provinciales.</strong> En Ontario, por ejemplo, hay documentos distintos para los bienes (un poder continuo) y para el cuidado personal. Otras provincias usan otros nombres y formularios.</li>
<li><strong>Impuestos:</strong> no hay impuesto sobre la herencia ni sobre el patrimonio. En cambio, la muerte cuenta como si vendiera sus bienes a valor de mercado, así que puede deberse impuesto sobre las ganancias de capital en la última declaración. La vivienda principal suele estar exenta, y los RRSP y RRIF tributan por completo salvo que pasen al cónyuge o a ciertos dependientes.</li></ul>` },
    { id: 'reino-unido', h: 'En el Reino Unido', icon: 'globe', html: `<p>Inglaterra y Gales, Escocia e Irlanda del Norte tienen cada uno sus propias reglas. Esto cubre Inglaterra y Gales, con notas sobre Escocia.</p>
<ul>
<li><strong>Un testamento válido (Inglaterra y Gales):</strong> debe estar por escrito y firmarse ante dos testigos, ${L('https://www.gov.uk/make-will', 'que deben verle firmar con claridad')}. No puede dejarle nada a un testigo ni a su cónyuge o pareja de hecho. Un testamento a mano sin testigos no es válido.</li>
<li><strong>El matrimonio anula un testamento</strong> en Inglaterra y Gales, salvo que se hiciera pensando en ese matrimonio. El divorcio no anula todo el testamento, pero los legados a la expareja dejan de valer.</li>
<li><strong>Las parejas no casadas no heredan nada automáticamente</strong> si no hay testamento. Es una de las razones más importantes para hacerlo.</li>
<li><strong>No hay partes fijas para los hijos,</strong> pero los familiares y dependientes pueden pedir a un tribunal una provisión si el testamento les deja sin un sustento razonable.</li>
<li><strong>Poderes permanentes (lasting powers of attorney):</strong> hay dos tipos, uno para bienes y asuntos financieros y otro para salud y bienestar. Cada uno debe inscribirse en la Office of the Public Guardian, ${L('https://www.gov.uk/power-of-attorney', 'lo que cuesta 92 libras por documento')} (con tarifas reducidas para ingresos bajos).</li>
<li><strong>Los fideicomisos</strong> se usan sobre todo para la planificación fiscal, los hijos o los beneficiarios vulnerables, más que para evitar la sucesión.</li>
<li><strong>Impuesto sobre la herencia:</strong> ${L('https://www.gov.uk/inheritance-tax', 'el 40 % del valor por encima de 325.000 libras')}, con una deducción extra cuando una vivienda pasa a hijos o nietos. Los legados al cónyuge, a la pareja de hecho o a organizaciones benéficas suelen estar exentos. Desde abril de 2027, está previsto que la mayoría de los fondos de pensiones no usados cuenten para el impuesto sobre la herencia; compruebe las reglas vigentes.</li>
<li><strong>Escocia es distinta:</strong> ${L('https://www.mygov.scot/making-a-will', 'un testamento solo necesita un testigo')}, y el cónyuge y los hijos tienen "derechos legales" a una parte de los bienes muebles (el dinero y las pertenencias, no la tierra ni los edificios), diga lo que diga el testamento.</li></ul>` },
    { id: 'australia', h: 'En Australia', icon: 'globe', html: `<p>Los testamentos, las sucesiones y los poderes dependen de cada estado y territorio, así que las reglas dependen de dónde vive.</p>
<ul>
<li><strong>Un testamento válido:</strong> debe estar por escrito y ${L('https://www.legalaid.tas.gov.au/wills-making-a-will', 'firmarse ante dos testigos presentes al mismo tiempo')}. Lo más seguro es elegir testigos que no hereden nada en el testamento.</li>
<li><strong>Testamentos informales:</strong> en todos los estados y territorios, la Corte Suprema puede aceptar un documento que no se firmó o atestiguó correctamente si está claro que la persona lo quería como su testamento. Es lento, caro e incierto, así que haga un testamento como es debido.</li>
<li><strong>El matrimonio y el divorcio:</strong> en la mayoría de los estados, casarse anula un testamento anterior salvo que se hiciera pensando en ese matrimonio; Australia Meridional y el Territorio de la Capital Australiana son excepciones. El divorcio suele anular los legados a la expareja, aunque los detalles cambian. Revise su testamento después de cualquiera de los dos.</li>
<li><strong>La superannuation (jubilación) no la cubre su testamento.</strong> Su fondo la paga según una designación vinculante de beneficiario si tiene una válida, y si no, a criterio del administrador. Algunas designaciones caducan, a menudo a los tres años, así que revise la suya.</li>
<li><strong>Impuestos:</strong> Australia no tiene impuesto sobre la herencia ni sobre el patrimonio. Pero la superannuation pagada a alguien que no dependía económicamente de usted, como un hijo adulto, puede tributar: ${L('https://www.ato.gov.au/super/apra-regulated-funds/paying-benefits/paying-superannuation-death-benefits/', 'en general hasta un 15 % sobre la parte gravable')} (más sobre una parte no gravada), más el recargo de Medicare cuando la paga directamente el fondo. Los bienes heredados también pueden tributar por ganancias de capital cuando se venden más adelante.</li>
<li><strong>Reclamaciones de provisión familiar:</strong> ciertos familiares, y en algunos estados otras personas que dependían de usted, pueden pedir al tribunal una parte mayor si el testamento no les da lo adecuado.</li>
<li><strong>Los poderes y las decisiones médicas</strong> tienen nombres y formularios distintos en cada estado. Por ejemplo, ${L('https://www.alrc.gov.au/publication/elder-abuse-dp-83/5-enduring-powers-of-attorney-and-enduring-guardianship/development-of-enduring-powers/', 'Nueva Gales del Sur usa documentos distintos para el dinero')} (un poder duradero) y para las decisiones de salud y personales (un tutor duradero), mientras que Queensland y Victoria los combinan. ${L('https://www.compass.info/featured-topics/powers-of-attorney/what-is-the-difference-between-a-will-an-enduring-power-of-attorney-an-enduring-guardian-and-an-advance-care-directive-/', 'Algunos estados reconocen el documento de otro estado')}, pero no todos automáticamente.</li>
<li><strong>La sucesión</strong> la concede la Corte Suprema del estado donde vivía la persona o tenía bienes, y las tasas cambian según el estado.</li></ul>` },
    { id: 'abogado', h: '¿Hacerlo usted mismo, o ver a un abogado?', icon: 'scale', html: `<p>Un patrimonio sencillo a menudo puede resolverse con los formularios estándar de su estado o con un programa de testamentos de confianza. Vea a un abogado si tiene una familia reconstituida, hijos menores, un negocio, bienes en más de un estado o país, un beneficiario con discapacidad, un patrimonio grande o alguien que probablemente impugne el testamento. Si el dinero es un problema, las organizaciones de asistencia legal y los servicios de referencia de los colegios de abogados pueden ayudar.</p>` },
    { id: 'guardar', h: 'Guardarlo y actualizarlo', icon: 'calendar', html: `<ul>
<li>Guarde el testamento original en un lugar seguro al que su albacea pueda llegar. Una caja de seguridad solo a su nombre puede ser difícil de abrir después de su muerte.</li>
<li>Dígales a su albacea y a su persona de confianza dónde está todo.</li>
<li>Revíselo después de un matrimonio, un divorcio, un nacimiento, una muerte, una mudanza o un cambio grande en su dinero, y cada pocos años de todos modos.</li></ul>` },
  ],
  sources: [
    ['Tax Foundation: impuestos estatales sobre el patrimonio y la herencia' + EN, 'https://taxfoundation.org/data/all/state/estate-inheritance-taxes/'],
    ['AARP: estados con impuestos sobre el patrimonio y la herencia' + EN, 'https://www.aarp.org/money/retirement/states-with-estate-inheritance-taxes/'],
    ['IRS: impuesto sobre el patrimonio' + EN, 'https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax'],
    ['Nolo: ¿son válidos los testamentos a mano?' + EN, 'https://www.alllaw.com/articles/nolo/wills-trusts/are-handwritten-holographic-wills-valid.html'],
    ['NerdWallet: estados con bienes gananciales' + EN, 'https://www.nerdwallet.com/estate-planning/learn/community-property'],
    ['Canadian Lawyer: qué hace válido un testamento en Canadá' + EN, 'https://www.canadianlawyermag.com/practice-areas/trusts-and-estates/how-to-craft-valid-wills-in-canada/381456'],
    ['Canada Life: tipos de testamento, incluido Quebec' + EN, 'https://canadalife.com/investing-saving/estate-planning/wills-101-what-is-will/types-of-wills.html'],
    ['Ontario: Estate Administration Tax' + EN, 'https://www.ontario.ca/page/estate-administration-tax'],
    ['GOV.UK: hacer un testamento' + EN, 'https://www.gov.uk/make-will'],
    ['GOV.UK: poder permanente (lasting power of attorney)' + EN, 'https://www.gov.uk/power-of-attorney'],
    ['GOV.UK: impuesto sobre la herencia' + EN, 'https://www.gov.uk/inheritance-tax'],
    ['mygov.scot: hacer un testamento' + EN, 'https://www.mygov.scot/making-a-will'],
    ['Legal Aid Commission of Tasmania: hacer un testamento' + EN, 'https://www.legalaid.tas.gov.au/wills-making-a-will'],
    ['Australian Taxation Office: pago de beneficios de superannuation por fallecimiento' + EN, 'https://www.ato.gov.au/super/apra-regulated-funds/paying-benefits/paying-superannuation-death-benefits/'],
    ['Australian Law Reform Commission: poderes y tutelas duraderos' + EN, 'https://www.alrc.gov.au/publication/elder-abuse-dp-83/5-enduring-powers-of-attorney-and-enduring-guardianship/development-of-enduring-powers/'],
    ['Compass (Gobierno de Australia): testamentos, poderes y directivas anticipadas' + EN, 'https://www.compass.info/featured-topics/powers-of-attorney/what-is-the-difference-between-a-will-an-enduring-power-of-attorney-an-enduring-guardian-and-an-advance-care-directive-/'],
  ],
  related: [
    ['/es/imprimibles/planificacion/', 'Hoja de planificación', 'Dónde está todo, en un solo lugar.', 'printer'],
    ['/es/propiedades-en-el-extranjero/', 'Propiedades en el extranjero', 'Testamentos en otros países.', 'globe'],
  ],
});

export const extranjero = esGuide({
  path: '/es/propiedades-en-el-extranjero/',
  title: 'Testamentos cuando tiene propiedades en el extranjero',
  seoTitle: 'Testamentos para expatriados: propiedades en México, Costa Rica, Canadá, el Reino Unido y Europa',
  eyebrow: 'Planificar',
  icon: 'globe',
  description: 'Qué revisar si tiene una casa en otro país: testamentos locales, fideicomisos en México, Costa Rica, Canadá, el Reino Unido, España, Portugal, Francia e Italia, y los impuestos.',
  lead: 'Si tiene una casa en otro país, su testamento de casa puede no bastar. Esto es lo que hay que revisar, con notas sobre los países donde más a menudo tienen propiedades los expatriados.',
  sections: [
    { id: 'resumen', h: 'En pocas palabras', icon: 'check', html: `<ul>
<li>Muchos asesores recomiendan un testamento local aparte para las propiedades en el extranjero, hecho con un notario local y que cubra solo los bienes de ese país.</li>
<li>Asegúrese de que sus testamentos funcionen juntos. Un testamento nuevo puede anular uno anterior salvo que cada uno esté redactado para cubrir solo los bienes de su país. Cuéntele a cada abogado lo del otro testamento.</li>
<li>Revise cómo está registrada la propiedad. Un fideicomiso, una sociedad o un copropietario pueden cambiar quién hereda, diga lo que diga su testamento.</li>
<li>Pregunte por los impuestos en los dos países antes de dar nada por hecho.</li></ul>` },
    { id: 'por-que', h: 'Por qué su testamento de casa puede no bastar', icon: 'ask', html: `<p>Para usar un testamento extranjero, los herederos a menudo tienen que cerrar primero la sucesión en el país de origen, y luego certificar los documentos con una apostilla, traducirlos y que un tribunal o un notario local los reconozca. Eso puede llevar mucho tiempo y costar mucho. La ley local también puede decidir quién hereda la tierra que está allí, y algunos países reservan partes fijas para los hijos (lo que se llama herencia forzosa), diga lo que diga el testamento.</p>` },
    { id: 'mexico', h: 'México', icon: 'globe', html: `<ul>
<li><strong>Propiedad en fideicomiso.</strong> Los extranjeros suelen tener las propiedades cerca de la costa o de las fronteras (la "zona restringida") ${L('https://www.americanbar.org/groups/real_property_trust_estate/resources/probate-property/2026-may-june/legal-ownership-real-property-mexican-restricted-zone-by-foreign-investors/', 'a través de un fideicomiso bancario')}. Usted nombra beneficiarios sustitutos en el propio fideicomiso, y es el fideicomiso, no su testamento, el que decide quién recibe esa propiedad. Mantenga esos beneficiarios al día.</li>
<li><strong>Un testamento mexicano.</strong> A los expatriados se les suele aconsejar hacer un testamento mexicano, un testamento público abierto, ante un notario público mexicano, en español. Cubre los bienes fuera del fideicomiso, como las cuentas bancarias y los autos.</li>
<li><strong>Usar un testamento de EE. UU.</strong> Un testamento de EE. UU. puede ser válido en México, pero los herederos suelen tener que cerrarlo primero en EE. UU. y luego hacerlo reconocer en México, lo que es lento y caro.</li>
<li><strong>El Mes del Testamento.</strong> Cada septiembre es el Mes del Testamento. ${L('https://www.viveusa.mx/en/negocios/cuanto-cuesta-hacer-un-testamento-en-septiembre-de-2026-y-que-descuentos-hay/', 'Los notarios rebajan sus honorarios por los testamentos, a menudo hasta la mitad')}. Los descuentos y las fechas cambian según el estado.</li></ul>` },
    { id: 'costa-rica', h: 'Costa Rica', icon: 'globe', html: `<ul>
<li>${L('https://aglegal.com/costa-rica-wills-foreigners/', 'Los testamentos se hacen ante notario, en español, y pueden limitarse a sus bienes en Costa Rica')}.</li>
<li>Las propiedades a su nombre normalmente pasan por la sucesión costarricense, incluso con testamento. Cuando los herederos están de acuerdo y ninguno es menor de edad, un notario puede tramitarla en lugar de un tribunal.</li>
<li>Algunos extranjeros tienen la propiedad a través de una sociedad costarricense. Eso cambia cómo se hereda, así que pida asesoría local antes de crear una.</li></ul>` },
    { id: 'canada', h: 'Canadá', icon: 'globe', html: `<ul>
<li><strong>Sin impuesto sobre la herencia, pero con ganancias de capital.</strong> Canadá no tiene impuesto sobre la herencia ni sobre el patrimonio. En cambio, la muerte cuenta como si vendiera sus bienes a valor de mercado, así que puede deberse impuesto sobre las ganancias de capital por una cabaña o una propiedad de alquiler canadiense en su última declaración.</li>
<li><strong>Un certificado antes de pagar a los herederos.</strong> El albacea del patrimonio de un no residente suele ${L('https://www.osullivanlaw.com/wp-content/uploads/2026/04/Advisory-11-Cross-border-Canada-U.S.-estate-administration-highlights.pdf', 'necesitar un certificado de autorización de la Agencia Tributaria de Canadá')} antes de entregar la propiedad canadiense a los herederos. Si la propiedad se vende, el comprador retiene parte del precio hasta que se emita otro certificado.</li>
<li><strong>Sucesión en la provincia.</strong> La resolución de un tribunal de EE. UU. no suele bastar por sí sola. La provincia donde está la propiedad emite su propia resolución, a menudo solo después de terminar la sucesión en EE. UU. Las reglas y las tasas cambian según la provincia: ${L('https://www.mondaq.com/canada/wills-intestacy-estate-planning/685076/cross-border-canada-us-estate-administration-highlights', 'Ontario emite una resolución auxiliar y puede exigir una fianza')}, y Quebec tiene otro sistema legal, con testamentos notariales.</li>
<li><strong>Un testamento canadiense.</strong> Pregunte a un abogado canadiense si un testamento aparte para su propiedad canadiense le facilitaría las cosas a su albacea.</li></ul>` },
    { id: 'reino-unido', h: 'Reino Unido', icon: 'globe', html: `<ul>
<li><strong>${L('https://www.gov.uk/inheritance-tax', 'El impuesto británico sobre la herencia se aplica a las propiedades en el Reino Unido')}</strong>, sea cual sea su nacionalidad o dónde viva. El tipo estándar es del 40 % sobre el valor por encima del umbral de 325.000 libras. Algunos legados, como al cónyuge o a una organización benéfica, pueden estar exentos; pregunte cómo se aplican las reglas a su caso.</li>
<li>Si vive en el Reino Unido, desde abril de 2025 sus bienes en todo el mundo pueden tributar cuando ha sido residente en el Reino Unido durante 10 de los últimos 20 años fiscales.</li>
<li><strong>La sucesión.</strong> ${L('https://www.gov.uk/applying-for-probate', 'Los albaceas necesitan una resolución sucesoria británica')} para vender o transferir una propiedad en el Reino Unido. La resolución de algunos países de la Commonwealth puede revalidarse; la de EE. UU. normalmente no, así que hace falta una solicitud nueva en el Reino Unido.</li>
<li><strong>Los testamentos.</strong> Un testamento hecho en el extranjero puede ser válido en Inglaterra y Gales si cumple las reglas formales del lugar donde se hizo, o de su residencia o nacionalidad. Aun así, muchas personas usan un testamento británico aparte que cubre solo los bienes en el Reino Unido, para simplificar la sucesión.</li>
<li><strong>Escocia es distinta.</strong> Tiene su propio proceso sucesorio (llamado confirmation) y sus propias reglas de herencia, así que pida asesoría escocesa para una propiedad allí.</li></ul>` },
    { id: 'europa', h: 'España, Portugal, Francia e Italia', icon: 'globe', html: `<ul>
<li><strong>Qué ley se aplica.</strong> ${L('https://eur-lex.europa.eu/eli/reg/2012/650', 'Según el Reglamento Europeo de Sucesiones')}, la ley del país donde usted vive habitualmente al morir se aplica a todo su patrimonio, salvo que su testamento elija la ley de un país del que sea ciudadano.</li>
<li><strong>Partes fijas para los hijos.</strong> ${L('https://www.notariesofeurope.eu/wp-content/uploads/2025/05/CNUE_Handbook-Successions_2025_EN_0006-1.pdf', 'Todos estos países tienen reglas de herencia forzosa')} que reservan parte del patrimonio para los hijos, y a veces para el cónyuge. Si vive allí y no elige nada en su testamento, esas reglas pueden aplicársele.</li>
<li><strong>Un testamento local.</strong> Muchos asesores recomiendan un testamento local para la propiedad allí, hecho con un notario y que indique su elección de ley si la quiere.</li>
<li><strong>Prueba para los herederos.</strong> Los herederos pueden usar un ${L('https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/civil-justice/family-law/successions-and-wills_en', 'certificado sucesorio europeo')} para probar sus derechos en otros países de la UE.</li>
<li><strong>Los impuestos.</strong> Los impuestos sobre la herencia cambian según el país y, en España, según la comunidad autónoma. Pregunte antes de dar por hecho que no hay ninguno.</li></ul>` },
    { id: 'impuestos', h: 'Los impuestos en su país', icon: 'costs', html: `<p>Si es ciudadano de EE. UU., todos sus bienes en el mundo cuentan para el impuesto federal sobre el patrimonio, incluida una casa en el extranjero. Para las muertes de 2026, ${L('https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax', 'solo hace falta presentar una declaración federal del impuesto sobre el patrimonio cuando el patrimonio bruto supera los 15 millones de dólares')}, así que la mayoría no paga nada. El otro país puede gravar igualmente la propiedad. EE. UU. tiene tratados fiscales que cubren los patrimonios con algunos países, entre ellos Canadá y el Reino Unido; un asesor fiscal internacional puede decirle si alguno le ayuda.</p>` },
    { id: 'ahora', h: 'Qué hacer ahora', icon: 'steps', html: `<ul>
<li>Haga una lista de todos los bienes que tiene fuera de su país, y de cómo está registrado cada uno.</li>
<li>Pregunte a un notario o abogado local si necesita un testamento local.</li>
<li>Asegúrese de que cada testamento cubra solo los bienes de su país y no anule los demás.</li>
<li>Si tiene un fideicomiso en México, revise los beneficiarios sustitutos.</li>
<li>Guarde copias, con traducciones, donde su albacea pueda encontrarlas.</li>
<li>Revíselo todo si cambia de país, se casa, se divorcia o vende.</li></ul>` },
    { id: 'despues', h: 'Si alguien muere con propiedades en el extranjero', icon: 'afterdeath', html: `<p>Contacte pronto con un notario o un abogado de ese país. Normalmente necesitará copias certificadas, apostilladas y traducidas del certificado de defunción y del testamento. Si la muerte ocurrió en el extranjero, la embajada o el consulado más cercano del país de la persona puede ayudar con los primeros pasos.</p>` },
  ],
  sources: [
    ['American Bar Association: propiedad extranjera en la zona restringida de México (2026)' + EN, 'https://www.americanbar.org/groups/real_property_trust_estate/resources/probate-property/2026-may-june/legal-ownership-real-property-mexican-restricted-zone-by-foreign-investors/'],
    ['Vive USA: el Mes del Testamento de septiembre de 2026 en México', 'https://www.viveusa.mx/en/negocios/cuanto-cuesta-hacer-un-testamento-en-septiembre-de-2026-y-que-descuentos-hay/'],
    ['AG Legal: testamentos en Costa Rica para propietarios extranjeros' + EN, 'https://aglegal.com/costa-rica-wills-foreigners/'],
    ['O’Sullivan Estate Lawyers: sucesiones transfronterizas Canadá–EE. UU. (abril de 2026, PDF)' + EN, 'https://www.osullivanlaw.com/wp-content/uploads/2026/04/Advisory-11-Cross-border-Canada-U.S.-estate-administration-highlights.pdf'],
    ['Mondaq: sucesiones transfronterizas Canadá–EE. UU.' + EN, 'https://www.mondaq.com/canada/wills-intestacy-estate-planning/685076/cross-border-canada-us-estate-administration-highlights'],
    ['GOV.UK: cómo funciona el impuesto sobre la herencia' + EN, 'https://www.gov.uk/inheritance-tax'],
    ['GOV.UK: solicitar la sucesión' + EN, 'https://www.gov.uk/applying-for-probate'],
    ['IRS: impuesto sobre el patrimonio (umbrales de declaración)' + EN, 'https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax'],
    ['Reglamento Europeo de Sucesiones (UE) n.º 650/2012', 'https://eur-lex.europa.eu/eli/reg/2012/650'],
    ['Comisión Europea: sucesiones y testamentos' + EN, 'https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/civil-justice/family-law/successions-and-wills_en'],
    ['Notarios de Europa: manual de sucesiones (2025, PDF)' + EN, 'https://www.notariesofeurope.eu/wp-content/uploads/2025/05/CNUE_Handbook-Successions_2025_EN_0006-1.pdf'],
  ],
  related: [
    ['/es/planificar/', 'Planificar con tiempo', 'El resto de su planificación.', 'plan'],
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'Cerrar un patrimonio en casa.', 'afterdeath'],
  ],
});

pair('/plan-ahead/wills-and-trusts/', '/es/testamentos-y-fideicomisos/');
pair('/plan-ahead/property-abroad/', '/es/propiedades-en-el-extranjero/');

export const esBatch3a = [testamentos, extranjero];
