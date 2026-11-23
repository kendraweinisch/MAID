// Spanish: serious illness, the last weeks, choices near the end of life,
// death certificates, and talking with a parent. Same facts and sources as
// the English guides.
import { pair } from './layout.mjs';
import { esGuide } from './es.mjs';

const MAID_ES = '/es/muerte-medicamente-asistida';

export const enfermedad = esGuide({
  path: '/es/enfermedad-grave/',
  title: 'Enfermedad grave',
  seoTitle: 'Enfermedad grave: cuidados paliativos, hospicio y POLST',
  eyebrow: 'Etapa 2',
  icon: 'illness',
  description: 'Cuidados paliativos, hospicio, formularios POLST, los cuidados en casa y las preguntas que hacer después de un diagnóstico grave.',
  lead: 'Un diagnóstico grave trae un aluvión de decisiones. Estas son las opciones que la mayoría de las familias desearían haber conocido antes.',
  glance: [['Cualquier etapa', 'Cuándo pueden empezar los cuidados paliativos'], ['6 meses', 'En EE. UU., esperanza de vida para el hospicio, o menos'], ['Reversible', 'Se puede dejar el hospicio y volver al tratamiento']],
  sections: [
    { id: 'paliativos', h: 'Cuidados paliativos: en cualquier etapa', icon: 'hand', facts: ['Cualquier etapa', 'Junto con el tratamiento'], html: `<p>¿No sabe cuál necesita? Vea <a href="/es/cuidados-paliativos-y-hospicio/">cuidados paliativos y hospicio</a>.</p>
<p>Los cuidados paliativos son atención especializada para el dolor, los síntomas y el estrés. Puede recibirlos en cualquier etapa de una enfermedad grave, junto con el tratamiento que busca curar. Pida pronto que le deriven a cuidados paliativos; muchas personas solo oyen hablar de ellos cerca del final.</p>` },
    { id: 'hospicio', h: 'Hospicio: cuando el foco pasa a ser el alivio', icon: 'bed', facts: ['Centrado en el alivio', 'EE. UU.: esperanza de vida de 6 meses o menos', 'Puede dejarlo'], html: `<p>El hospicio es atención centrada en el alivio cuando la curación ya no es el objetivo. Existe en la mayoría de los países, aunque se organiza y se paga de forma distinta. En EE. UU., <a class="src-link" href="https://www.medicare.gov/coverage/hospice-care">Medicare cubre el hospicio cuando un médico certifica una esperanza de vida de seis meses o menos</a> si la enfermedad sigue su curso habitual. Incluye el equipo de cuidados, los medicamentos para el alivio y el equipo, normalmente en casa.</p>
<ul><li>Elegir el hospicio suele significar dejar el tratamiento para curar la enfermedad terminal, pero no el resto de la atención.</li>
<li>Puede dejar el hospicio y volver al tratamiento para curar si cambia de opinión.</li>
<li>Muchas familias dicen que les habría gustado saber antes del hospicio.</li></ul>` },
    { id: 'polst', h: 'Órdenes médicas para ahora (POLST)', icon: 'doc', facts: ['Una orden médica', 'Para una enfermedad grave ahora'], html: `<p>La directiva anticipada es para el futuro. En EE. UU., <a class="src-link" href="https://polst.org/">un formulario POLST</a> (también llamado MOLST, POST o MOST, según el estado) es una orden médica firmada por un profesional para alguien que está gravemente enfermo ahora. Indica a los servicios de emergencia y a los hospitales qué tratamiento quiere, por ejemplo si intentar la reanimación (RCP). Otros países usan formularios parecidos, como ReSPECT en el Reino Unido; pregunte al equipo de cuidados qué se usa donde usted vive.</p>` },
    { id: 'donde', h: 'Dónde se recibe la atención', icon: 'home', html: `<p>La atención puede darse en casa, con ayuda de la familia, de asistentes y de un equipo de hospicio; en una residencia asistida o un hogar de ancianos; o en un centro de hospicio. Pregunte cuánto cuesta cada opción y qué cubren el seguro o los programas públicos antes de decidir. Vea <a href="/es/lo-que-cuesta/">lo que cuesta</a>.</p>` },
    { id: 'preguntas', h: 'Preguntas para el médico', icon: 'ask', html: `<p>¿Qué es probable que pase ahora? ¿Cuáles son las opciones de tratamiento, y qué supondría cada una para mi vida diaria? ¿Qué haría usted en mi lugar? Lleve a alguien que tome notas.</p>
<p><a href="/es/imprimibles/preguntas-para-el-medico/">Imprima la lista completa de preguntas</a>.</p>` },
    { id: 'cuidador', h: 'Si usted es quien cuida', icon: 'people', html: `<p>Cuidar es un trabajo. Pida ayuda para tareas concretas, acéptela cuando se la ofrezcan y pregunte al equipo de cuidados por los cuidados de relevo, que dan un descanso a los familiares que cuidan.</p>` },
    { id: 'opciones', h: 'Opciones cerca del final de la vida', icon: 'scale', html: `<p>Algunas personas quieren todos los tratamientos posibles. Otras eligen solo cuidados de alivio. En algunos lugares, las personas con una enfermedad terminal también pueden pedir la <a href="${MAID_ES}/">muerte médicamente asistida</a>. Todas son opciones legítimas, y es la persona enferma quien decide.</p>
<div class="cards cards-two"><a class="ocard" href="/es/opciones-cerca-del-final/"><strong>Todas las opciones cerca del final de la vida</strong><span class="muted small">Tratamiento, cuidados de alivio, dejar un tratamiento, órdenes médicas, sedación, muerte médicamente asistida y dónde estar.</span></a></div>` },
  ],
  sources: [
    ['Medicare: cobertura del hospicio (en inglés)', 'https://www.medicare.gov/coverage/hospice-care'],
    ['National POLST (en inglés)', 'https://polst.org/'],
    ['National Institute on Aging: el final de la vida (en inglés)', 'https://www.nia.nih.gov/health/end-of-life'],
  ],
  related: [
    ['/es/cuidados-paliativos-y-hospicio/', 'Cuidados paliativos y hospicio', 'La diferencia, y cuándo pedirlos.', 'scale'],
    ['/es/ultimas-semanas/', 'Las últimas semanas', 'Qué esperar cuando la muerte se acerca.', 'lastweeks'],
    ['/es/imprimibles/preguntas-para-el-medico/', 'Preguntas para el médico', 'Para imprimir, para las citas.', 'printer'],
  ],
});

export const ultimas = esGuide({
  path: '/es/ultimas-semanas/',
  title: 'Las últimas semanas',
  seoTitle: 'Las últimas semanas de vida: cómo es morir de verdad',
  eyebrow: 'Etapa 3',
  icon: 'lastweeks',
  description: 'Qué esperar en las últimas semanas y días de vida, cómo mantener a alguien cómodo, las doulas del final de la vida y la despedida.',
  lead: 'Morir suele ser más lento y más duro de lo que la gente espera. Saber cómo puede ser de verdad ayuda a prepararse, a pedir la ayuda adecuada y a decidir lo que uno quiere.',
  sections: [
    { id: 'realidad', h: 'Cómo puede ser morir de verdad', icon: 'lastweeks', html: `<p>Para una lista por etapas, vea <a href="/es/senales-de-que-la-muerte-esta-cerca/">señales de que la muerte está cerca</a>.</p>
<p>Algunas muertes son tranquilas. Muchas no lo son, sobre todo después de una larga enfermedad. Ayuda saber qué puede pasar, para que no tome por sorpresa:</p>
<ul><li><strong>Consunción.</strong> La persona puede perder mucho peso y músculo, hasta parecer muy distinta de la persona que usted conocía.</li>
<li><strong>Agotamiento y dependencia.</strong> Muchas necesitan ayuda para lavarse, comer, usar el baño y darse la vuelta en la cama. Para alguien que valoraba su independencia, esto puede ser lo más duro.</li>
<li><strong>Dolor y falta de aire.</strong> Los dos suelen poder aliviarse, pero no siempre del todo, ni siempre rápido.</li>
<li><strong>Confusión y agitación.</strong> El delirio es frecuente cerca del final. Alguien puede no reconocer a su familia, o estar inquieto y angustiado.</li>
<li><strong>Los últimos días.</strong> La persona duerme casi todo el tiempo y deja de comer y de beber. La respiración suele cambiar, con pausas largas o un ruido de estertor. Ese ruido suele angustiar más a quien lo oye que a quien lo tiene.</li></ul>
<p>Nada de esto significa que alguien haya fallado. Es lo que hace un cuerpo cuando se apaga. Y es razonable que resulte insoportable verlo, o saber que uno no lo quiere para sí.</p>` },
    { id: 'alivio', h: 'Aliviar el sufrimiento', icon: 'hand', facts: ['Avise de cualquier señal de angustia', 'Insista si no mejora', 'Sedación cuando nada más funciona'], html: `<p>Avise al equipo de cuidados de cualquier señal de dolor, falta de aire, agitación o miedo, e insista si no mejora. Los equipos de cuidados paliativos tienen más opciones de las que la mayoría imagina, incluidos medicamentos para calmar la agitación y, cuando el sufrimiento no puede aliviarse de otra forma, la sedación. Las cosas pequeñas también ayudan: humedecer los labios, cambiar de postura, una luz suave, voces conocidas y música.</p>` },
    { id: 'dignidad', h: 'La dignidad, en sus propios términos', icon: 'shield', html: `<p>Pregúntele a la persona, mientras pueda responder, qué significa para ella la dignidad: quién quiere que le ayude con el cuidado personal, qué no quiere que vean las visitas, qué quiere llevar puesto, qué no quiere que le hagan nunca. Escríbalo y compártalo con el equipo de cuidados. Algunas personas, sabiendo lo que puede implicar el final, eligen dejar tratamientos, rechazar la comida y la bebida cerca del final, o pedir la <a href="${MAID_ES}/">muerte médicamente asistida</a> donde es legal. Otras quieren cada día que puedan tener. Todas son opciones legítimas.</p>` },
    { id: 'doulas', h: 'Doulas del final de la vida', icon: 'people', html: `<p>Una doula del final de la vida da apoyo no médico a la persona que muere y a su familia: planificar los últimos días, acompañar en la vigilia y ayudar después. Trabajan junto al hospicio, no en su lugar.</p>` },
    { id: 'despedida', h: 'La despedida', icon: 'loved', facts: ['Gracias', 'Te quiero', 'Te perdono', 'Perdóname', 'Adiós'], html: `<p>Se cree que el oído es uno de los últimos sentidos en apagarse, así que siga hablándole. A muchas personas les ayuda decir cinco cosas: gracias, te quiero, te perdono, perdóname y adiós. También está bien salir de la habitación. Algunas personas mueren justo cuando su familia acaba de salir.</p>` },
    { id: 'prepararse', h: 'Prepararse para el momento de la muerte', icon: 'check', html: `<p>Decida de antemano a quién llamar. Si la persona está en hospicio en casa, llame al hospicio, no a emergencias. Tenga a mano la <a href="/es/primeras-24-horas/">lista de las primeras 24 horas</a>.</p>` },
  ],
  sources: [
    ['National Institute on Aging: el final de la vida (en inglés)', 'https://www.nia.nih.gov/health/end-of-life'],
    ['National End-of-Life Doula Alliance (en inglés)', 'https://www.nedalliance.org/'],
    ['INELDA, International End of Life Doula Association (en inglés)', 'https://www.inelda.org/'],
  ],
  related: [
    ['/es/senales-de-que-la-muerte-esta-cerca/', 'Señales de que la muerte está cerca', 'Por etapas.', 'clock'],
    ['/es/primeras-24-horas/', 'Las primeras 24 horas', 'Lista para imprimir.', 'printer'],
    ['/es/opciones-cerca-del-final/', 'Opciones cerca del final de la vida', 'Todas, sin juzgar.', 'scale'],
  ],
});

export const opciones = esGuide({
  path: '/es/opciones-cerca-del-final/',
  title: 'Opciones cerca del final de la vida',
  seoTitle: 'Opciones al final de la vida: tratamiento, hospicio y POLST',
  eyebrow: 'Enfermedad grave',
  icon: 'scale',
  description: 'Todas las opciones cerca del final de la vida: todos los tratamientos, solo cuidados de alivio, dejar un tratamiento, la RCP y las órdenes médicas, la sedación, dejar de comer y beber, la muerte médicamente asistida y dónde estar.',
  lead: 'No hay una única forma correcta de afrontar el final de la vida. Estas son las opciones que eligen las personas, una al lado de la otra, sin juzgar. Decide la persona enferma.',
  sections: [
    { id: 'todas', h: 'Las opciones, una al lado de la otra', icon: 'scale', html: `<div class="cards cards-tight">
<a class="ocard" href="#tratamiento"><strong>Todos los tratamientos</strong><span class="muted small">Probar todo lo que pueda ayudar.</span></a>
<a class="ocard" href="#alivio"><strong>Solo cuidados de alivio</strong><span class="muted small">Cuidados paliativos y hospicio.</span></a>
<a class="ocard" href="#dejar"><strong>Dejar un tratamiento</strong><span class="muted small">Cuando ya no ayuda, o ya no se quiere.</span></a>
<a class="ocard" href="#ordenes"><strong>RCP y órdenes médicas</strong><span class="muted small">Dejar por escrito qué hacer en una emergencia.</span></a>
<a class="ocard" href="#sedacion"><strong>Cuando el sufrimiento no se puede aliviar</strong><span class="muted small">La sedación paliativa.</span></a>
<a class="ocard" href="#comer"><strong>Dejar de comer y beber</strong><span class="muted small">Una opción que algunas personas eligen cerca del final.</span></a>
<a class="ocard" href="#muerte-asistida"><strong>Muerte médicamente asistida</strong><span class="muted small">Donde es legal.</span></a>
<a class="ocard" href="#donde"><strong>Dónde estar</strong><span class="muted small">En casa, en un hospicio o en un hospital.</span></a>
</div>
<p>Se pueden combinar y cambiar. Alguien puede probar un tratamiento y luego pasar a los cuidados de alivio; o recibir hospicio y, donde es legal, preguntar también por la muerte médicamente asistida.</p>` },
    { id: 'tratamiento', h: 'Todos los tratamientos posibles', icon: 'illness', html: `<p>Algunas personas quieren todos los tratamientos que puedan darles más tiempo, incluidos los nuevos o experimentales. Es una opción legítima. Antes de cada decisión, pregunte qué es probable que pase con y sin el tratamiento, y qué supondría para la vida diaria. Los cuidados paliativos pueden añadirse en cualquier etapa, junto con el tratamiento, para aliviar los síntomas. Vea <a href="/es/enfermedad-grave/#preguntas">preguntas para el médico</a>.</p>` },
    { id: 'alivio', h: 'Solo cuidados de alivio', icon: 'hand', facts: ['Hospicio', 'Puede cambiar de opinión'], html: `<p>Cuando la curación ya no es el objetivo, o las cargas del tratamiento superan sus beneficios, la atención puede centrarse por completo en el alivio. <a class="src-link" href="https://www.medicare.gov/coverage/hospice-care">El hospicio da esta atención</a>, normalmente en casa. Elegir el hospicio suele significar dejar el tratamiento para curar la enfermedad terminal, pero no el resto de la atención, y puede dejar el hospicio y volver al tratamiento si cambia de opinión. Vea <a href="/es/cuidados-paliativos-y-hospicio/">cuidados paliativos y hospicio</a>.</p>` },
    { id: 'dejar', h: 'Dejar un tratamiento', icon: 'shield', html: `<p>Algunas personas deciden dejar un tratamiento, como la diálisis, un respirador o una sonda de alimentación, cuando ya no ayuda o ya no se quiere. Esto es distinto de la muerte médicamente asistida. Pregunte al equipo de cuidados qué esperar después de dejarlo y cómo se mantendrá el alivio. Si la persona no puede hablar por sí misma, su <a href="/es/planificar/#representante">representante</a> y su <a href="/es/directivas-anticipadas/">directiva anticipada</a> guían la decisión.</p>` },
    { id: 'ordenes', h: 'RCP y órdenes médicas', icon: 'doc', facts: ['POLST, MOLST, POST o MOST', 'ReSPECT en el Reino Unido'], html: `<p>La directiva anticipada es para el futuro. Para alguien gravemente enfermo ahora, <a class="src-link" href="https://polst.org/">un formulario POLST</a> (también llamado MOLST, POST o MOST en algunos estados de EE. UU.) es una orden médica firmada por un profesional. Indica a los servicios de emergencia y a los hospitales qué tratamiento quiere la persona, por ejemplo si intentar la reanimación (RCP). Otros países usan formularios parecidos, como ReSPECT en el Reino Unido. Pregunte al equipo de cuidados qué se usa donde vive la persona. Más sobre las <a href="/es/enfermedad-grave/#polst">órdenes médicas</a>.</p>` },
    { id: 'sedacion', h: 'Cuando el sufrimiento no se puede aliviar', icon: 'lastweeks', html: `<p>Avise al equipo de cuidados de cualquier señal de dolor, falta de aire, agitación o miedo, e insista si no mejora. Los equipos de cuidados paliativos tienen más opciones de las que la mayoría imagina, incluidos medicamentos para calmar la agitación y, cuando el sufrimiento no puede aliviarse de otra forma, la sedación. Vea <a href="/es/ultimas-semanas/#alivio">aliviar el sufrimiento</a>.</p>` },
    { id: 'comer', h: 'Dejar de comer y beber', icon: 'water', html: `<p>Cerca del final, la mayoría de las personas comen y beben menos de forma natural, y forzar la comida o los líquidos puede causar molestias. Algunas personas, sabiendo lo que puede implicar el final, también eligen rechazar la comida y la bebida. Si se está considerando, háblenlo antes con el equipo de cuidados y con la familia, para que todos sepan qué esperar. Vea <a href="/es/ultimas-semanas/#dignidad">la dignidad, en sus propios términos</a>.</p>` },
    { id: 'muerte-asistida', h: 'Muerte médicamente asistida, donde es legal', icon: 'maid', facts: ['Enfermedad terminal', 'Las reglas cambian según el lugar'], html: `<p>En algunos lugares, un adulto con una enfermedad terminal que puede tomar sus propias decisiones puede pedir a un médico un medicamento para terminar su vida en paz. Las reglas, los plazos de espera y quién cumple los requisitos cambian según el lugar, y no es legal en la mayor parte del mundo. Vea <a href="${MAID_ES}/">dónde es legal</a>, <a href="${MAID_ES}/proceso/">cómo funciona el proceso</a> y <a href="${MAID_ES}/familias/">una guía para familias</a>.</p>` },
    { id: 'donde', h: 'Dónde estar al final', icon: 'home', html: `<p>La atención puede darse en casa, con ayuda de la familia, de asistentes y de un equipo de hospicio; en una residencia asistida o un hogar de ancianos; o en un centro de hospicio. Pregunte cuánto cuesta cada opción y qué cubren el seguro o los programas públicos antes de decidir. Vea <a href="/es/lo-que-cuesta/">lo que cuesta</a>.</p>` },
    { id: 'quien', h: 'Quién decide', icon: 'people', facts: ['La persona enferma', 'Después, su representante'], html: `<p>La persona enferma. Si ya no puede decidir, decide la persona que nombró como su representante para decisiones de salud, guiada por lo que dijo que quería. Por eso importa dejarlo por escrito y hablarlo. Empiece por <a href="/es/planificar/">planificar con tiempo</a> y <a href="/es/directivas-anticipadas/">el formulario de directiva anticipada de su estado</a>.</p>` },
  ],
  sources: [
    ['National POLST (en inglés)', 'https://polst.org/'],
    ['Medicare: cobertura del hospicio (en inglés)', 'https://www.medicare.gov/coverage/hospice-care'],
    ['National Institute on Aging: el final de la vida (en inglés)', 'https://www.nia.nih.gov/health/end-of-life'],
  ],
  related: [
    ['/es/enfermedad-grave/', 'Enfermedad grave', 'La guía completa.', 'illness'],
    ['/es/ultimas-semanas/', 'Las últimas semanas', 'Cómo puede ser morir de verdad.', 'lastweeks'],
    ['/es/imprimibles/preguntas-para-el-medico/', 'Preguntas para el médico', 'Para imprimir, para las citas.', 'printer'],
  ],
});

export const certificados = esGuide({
  path: '/es/certificados-de-defuncion/',
  title: '¿Cuántos certificados de defunción necesita?',
  seoTitle: '¿Cuántos certificados de defunción necesito?',
  eyebrow: 'Después de una muerte',
  icon: 'doc',
  description: 'Cuántas copias certificadas del certificado de defunción pedir, quién las necesita, cómo pedirlas y qué hacer si la muerte ocurrió en el extranjero.',
  lead: 'La mayoría de los bancos, aseguradoras y organismos quieren una copia certificada. Contarlas desde el principio ahorra semanas de espera para pedir más.',
  sections: [
    { id: 'contar', h: 'Cuente quién va a necesitar una', icon: 'check', html: `<p>Haga una lista. Cada uno de estos suele querer su propia copia certificada, y algunos se la quedan:</p>
<ul><li>Cada banco y cooperativa de crédito</li>
<li>Cada póliza de seguro de vida</li>
<li>Las pensiones y las cuentas de jubilación</li>
<li>Las cuentas de inversión y de corretaje</li>
<li>Los títulos de vehículos y las escrituras de propiedades</li>
<li>Los organismos públicos, como la agencia de seguridad social o de pensiones, o la oficina de impuestos</li>
<li>El tribunal o registro que se ocupa del testamento y del patrimonio (la sucesión)</li>
<li>Los beneficios del empleador y las compañías de tarjetas de crédito</li></ul>
<p>Algunas organizaciones aceptan una fotocopia o devuelven el original, así que pregunte antes de enviar una.</p>` },
    { id: 'pedir', h: 'Cómo pedirlas', icon: 'doc', html: `<p>En EE. UU., la funeraria suele tramitar el certificado de defunción y puede pedir copias certificadas. Más adelante puede pedir otras a la oficina de registros vitales del estado o del condado donde ocurrió la muerte. Las tarifas cambian según el estado. En otros países, las copias las emite el registro civil donde se inscribió la muerte.</p>` },
    { id: 'extranjero', h: 'Si la muerte ocurrió en el extranjero', icon: 'globe', html: `<p>Un certificado de defunción extranjero puede tener que certificarse oficialmente (con una apostilla, en muchos países) y traducirse antes de que los bancos o los tribunales del país de origen lo acepten. La embajada o el consulado más cercano del país de la persona puede ayudar con los primeros pasos. Vea <a href="/es/propiedades-en-el-extranjero/#despues">si alguien muere con propiedades en el extranjero</a>.</p>` },
  ],
  related: [
    ['/es/despues-de-una-muerte/', 'Después de una muerte', 'La guía completa.', 'afterdeath'],
    ['/es/primeras-24-horas/', 'Las primeras 24 horas', 'Lista para imprimir.', 'printer'],
  ],
});

export const hablar = esGuide({
  path: '/es/hablar-con-un-padre/',
  title: 'Hablar con un padre, de cerca o de lejos',
  seoTitle: 'Cómo hablar con sus padres sobre el final de la vida',
  eyebrow: 'Planificar',
  icon: 'talk',
  description: 'Cómo empezar la conversación con un padre o una madre sobre el final de la vida, qué preguntar, qué hacer si no quiere hablar, y cómo ayudar cuando vive lejos.',
  lead: 'Casi nunca parece el momento adecuado. Empezar mientras su padre o su madre está bien significa que es él o ella quien decide, y que usted no tendrá que adivinar después.',
  sections: [
    { id: 'empezar', h: 'Cómo empezar', icon: 'talk', html: `<ul><li><strong>Empiece por poco.</strong> Una pregunta basta para una primera conversación.</li>
<li><strong>Busque una entrada.</strong> La enfermedad de un amigo, una noticia, o su propia planificación: "He estado escribiendo mis propios deseos, y me pregunté cuáles serían los tuyos".</li>
<li><strong>Escuche más de lo que habla.</strong> El objetivo es saber qué quiere, no convencerle.</li>
<li><strong>Anote lo que dice</strong> y léaselo para que pueda corregirlo.</li></ul>
<p><a href="/es/imprimibles/hablar-con-un-padre/">Imprima la hoja para la conversación</a>, con preguntas y espacio para escribir.</p>` },
    { id: 'temas', h: 'De qué hablar', icon: 'ask', html: `<ul><li>Qué le importa más si se enfermara gravemente, y qué no querría.</li>
<li>Quién debe tomar las decisiones si no puede, y si eso está por escrito.</li>
<li>Dónde están su testamento, sus seguros, sus cuentas y sus papeles importantes.</li>
<li>Qué quiere para su cuerpo y para un funeral o una despedida.</li></ul>` },
    { id: 'no-quiere', h: 'Si no quiere hablar', icon: 'hand', html: `<p>Está en su derecho. Dígale por qué le importa a usted, deje la puerta abierta y vuelva a intentarlo en otro momento. A algunas personas les resulta más fácil llenar un formulario a solas, o hablar con su médico, un líder religioso o un amigo en lugar de con su hijo o hija.</p>` },
    { id: 'lejos', h: 'Cuando vive lejos', icon: 'phone', html: `<ul><li>Hable por videollamada y deje las conversaciones más importantes para cuando le visite.</li>
<li><strong>Use las reglas de donde vive.</strong> Su directiva anticipada debe hacerse en el formulario del estado o país donde vive, no donde vive usted. Vea <a href="/es/directivas-anticipadas/">directivas anticipadas por estado</a>.</li>
<li><strong>La distancia y los husos horarios importan.</strong> Puede ser su representante para decisiones de salud desde el extranjero, pero nombre un suplente que viva cerca, y asegúrese de que sus médicos tengan su número y sepan su huso horario.</li>
<li>Forme un círculo local: un vecino, un amigo o un familiar que pueda pasar a verle, con sus datos de contacto y los de ellos por escrito.</li>
<li>Guarde copias de sus documentos y contactos clave donde pueda consultarlos, por ejemplo copias escaneadas en una carpeta compartida segura.</li>
<li>Sepa qué haría si tuviera que viajar de urgencia: pasaporte vigente, y quién le cubre en casa.</li></ul>` },
  ],
  related: [
    ['/es/imprimibles/hablar-con-un-padre/', 'Hoja para la conversación', 'Preguntas para imprimir con espacio para las respuestas.', 'printer'],
    ['/es/propiedades-en-el-extranjero/', 'Propiedades en el extranjero', 'Si alguno de los dos tiene casa en otro país.', 'globe'],
  ],
});

pair('/serious-illness/', '/es/enfermedad-grave/');
pair('/last-weeks/', '/es/ultimas-semanas/');
pair('/serious-illness/choices-near-the-end/', '/es/opciones-cerca-del-final/');
pair('/after-a-death/death-certificates/', '/es/certificados-de-defuncion/');
pair('/plan-ahead/talking-with-a-parent/', '/es/hablar-con-un-padre/');

export const esBatch2 = [enfermedad, ultimas, opciones, certificados, hablar];
