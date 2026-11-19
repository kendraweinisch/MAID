// The installable app: "Get the app" and the offline page, in English and
// Spanish. The pages listed as saved for offline match PRECACHE in build.mjs.
import { pair } from './layout.mjs';
import { icons } from './icons.mjs';
import { reviewNote } from './es.mjs';

const SAVED_EN = [
  ['/checklists/after-a-death/', 'After a death: the first 24 hours'],
  ['/last-weeks/signs-death-is-near/', 'Signs that death is near'],
  ['/last-weeks/', 'The last weeks'],
  ['/serious-illness/hospice-vs-palliative-care/', 'Hospice vs palliative care'],
  ['/after-a-death/', 'After a death'],
  ['/grief/', 'Grief'],
  ['/plan-ahead/', 'Plan ahead'],
  ['/for-myself/', "I'm planning for myself"],
  ['/for-someone-i-love/', "I'm planning for someone I love"],
  ['/checklists/', 'Printables'],
];
const SAVED_ES = [
  ['/es/primeras-24-horas/', 'Después de una muerte: las primeras 24 horas'],
  ['/es/senales-de-que-la-muerte-esta-cerca/', 'Señales de que la muerte está cerca'],
  ['/es/ultimas-semanas/', 'Las últimas semanas'],
  ['/es/cuidados-paliativos-y-hospicio/', 'Cuidados paliativos y hospicio'],
  ['/es/despues-de-una-muerte/', 'Después de una muerte'],
  ['/es/duelo/', 'Duelo'],
  ['/es/planificar/', 'Planificar con tiempo'],
  ['/es/para-mi/', 'Planifico para mí'],
  ['/es/para-un-ser-querido/', 'Planifico para un ser querido'],
  ['/es/imprimibles/', 'Hojas para imprimir'],
];
const list = (items) => `<ul class="saved-list">${items.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>`;

const appEn = {
  path: '/app/',
  title: 'Get the app',
  seoTitle: 'End of Life Atlas app: free, works offline',
  description: "Add End of Life Atlas to your phone's home screen. It opens like an app, it's free, and the key guides work without a signal.",
  body: `
<section class="page-hero">
<div class="wrap prose">
<div class="hero-icon">${icons.phone}</div>
<p class="eyebrow">Free · No app store · Works offline</p>
<h1>Get the app</h1>
<p class="lead" style="margin-top:20px">Add End of Life Atlas to your phone's home screen. It opens like an app, and the key guides keep working without a signal: at a bedside, in a hospital, or anywhere the connection drops.</p>
<p style="margin-top:24px"><button class="btn" type="button" data-install hidden>Install the app</button></p>
</div>
</section>
<section class="section">
<div class="wrap prose">
<h2 id="iphone">On an iPhone or iPad</h2>
<ol class="mini-steps">
<li>Open this site in Safari.</li>
<li>Tap the Share button (the square with an arrow).</li>
<li>Tap "Add to Home Screen", then "Add".</li>
</ol>
<h2 id="android">On an Android phone</h2>
<ol class="mini-steps">
<li>Open this site in Chrome.</li>
<li>Tap the menu (three dots).</li>
<li>Tap "Install app" or "Add to Home screen".</li>
</ol>
<h2 id="computer">On a computer</h2>
<p>In Chrome or Edge, click the install icon at the right end of the address bar, or use the "Install the app" button above if you see it.</p>
<h2 id="offline">What works offline</h2>
<p>These are saved on your device the first time you open the site, so they work without a connection:</p>
${list(SAVED_EN)}
<p>Every other page you open is saved too, so it's there next time. Printables you have opened or downloaded stay available as well.</p>
<h2 id="privacy">Privacy</h2>
<p>The app is the same website, so it collects nothing extra. Saved pages stay on your device. To remove them, delete the app or clear the site's data in your browser.</p>
<p class="small muted"><a href="/es/app/" hreflang="es" lang="es">Instrucciones en español</a></p>
</div>
</section>`,
};

const appEs = {
  path: '/es/app/',
  title: 'Instale la app',
  seoTitle: 'La app de End of Life Atlas: gratis y funciona sin conexión',
  description: 'Añada End of Life Atlas a la pantalla de inicio de su teléfono. Se abre como una app, es gratis, y las guías clave funcionan sin señal.',
  body: `
<section class="page-hero">
<div class="wrap prose">
<div class="hero-icon">${icons.phone}</div>
<p class="eyebrow">Gratis · Sin tienda de apps · Funciona sin conexión</p>
<h1>Instale la app</h1>
<p class="lead" style="margin-top:20px">Añada End of Life Atlas a la pantalla de inicio de su teléfono. Se abre como una app, y las guías clave siguen funcionando sin señal: junto a una cama, en un hospital o donde falle la conexión.</p>
<p style="margin-top:24px"><button class="btn" type="button" data-install hidden>Instalar la app</button></p>
${reviewNote}
</div>
</section>
<section class="section">
<div class="wrap prose">
<h2 id="iphone">En un iPhone o iPad</h2>
<ol class="mini-steps">
<li>Abra este sitio en Safari.</li>
<li>Toque el botón Compartir (el cuadrado con una flecha).</li>
<li>Toque "Agregar a inicio" (o "Añadir a pantalla de inicio") y luego "Agregar".</li>
</ol>
<h2 id="android">En un teléfono Android</h2>
<ol class="mini-steps">
<li>Abra este sitio en Chrome.</li>
<li>Toque el menú (tres puntos).</li>
<li>Toque "Instalar aplicación" o "Agregar a la pantalla principal".</li>
</ol>
<h2 id="computadora">En una computadora</h2>
<p>En Chrome o Edge, haga clic en el icono de instalar al final de la barra de direcciones, o use el botón "Instalar la app" de arriba si lo ve.</p>
<h2 id="sin-conexion">Qué funciona sin conexión</h2>
<p>Estas páginas se guardan en su dispositivo la primera vez que abre el sitio, así que funcionan sin conexión:</p>
${list(SAVED_ES)}
<p>Cada página que abra también se guarda, para que esté ahí la próxima vez. Las hojas para imprimir que haya abierto o descargado también siguen disponibles.</p>
<h2 id="privacidad">Privacidad</h2>
<p>La app es el mismo sitio web, así que no recoge nada más. Las páginas guardadas se quedan en su dispositivo. Para borrarlas, elimine la app o borre los datos del sitio en su navegador.</p>
<p class="small muted"><a href="/app/" hreflang="en" lang="en">Instructions in English</a></p>
</div>
</section>`,
};

const offlineEn = {
  path: '/offline/',
  title: "You're offline",
  description: 'This page is shown when there is no connection and the page you asked for has not been saved yet.',
  body: `
<section class="section"><div class="wrap prose">
<h1>You're offline</h1>
<p class="lead" style="margin:20px 0">This page isn't saved on your device yet. These are, and they work without a connection:</p>
${list(SAVED_EN)}
<p>Any page you have opened before also works. When you're back online, the page you asked for will load.</p>
</div></section>`,
};

const offlineEs = {
  path: '/es/sin-conexion/',
  title: 'Está sin conexión',
  description: 'Esta página aparece cuando no hay conexión y la página que pidió todavía no está guardada.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Está sin conexión</h1>
<p class="lead" style="margin:20px 0">Esta página todavía no está guardada en su dispositivo. Estas sí, y funcionan sin conexión:</p>
${list(SAVED_ES)}
<p>Cualquier página que haya abierto antes también funciona. Cuando vuelva a tener conexión, se cargará la página que pidió.</p>
</div></section>`,
};

pair('/app/', '/es/app/');
pair('/offline/', '/es/sin-conexion/');

export const appPages = [appEn, appEs, offlineEn, offlineEs];
