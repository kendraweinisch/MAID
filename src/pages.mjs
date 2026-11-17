import { esc, fmtDate, site } from './layout.mjs';

const pill = (p) => `<span class="pill pill-${p.status}">${esc(p.statusLabel)}</span>`;

const placeOptions = (places) =>
  ['<option value="">Choose a state or country</option>']
    .concat(places.map((p) => `<option value="${p.slug}">${esc(p.name)}</option>`))
    .concat('<option value="elsewhere">Somewhere else</option>')
    .join('\n');

const placeRows = (list) =>
  list
    .map(
      (p) => `<tr><td><a href="/places/${p.slug}/">${esc(p.name)}</a></td><td>${pill(p)}</td><td>${esc(p.since)}</td><td>${esc(p.nonResidents)}</td><td class="muted">${fmtDate(p.verified)}</td></tr>`
    )
    .join('\n');

const placeTable = (list, caption) => `<div class="table-box"><table>
<caption class="skip">${esc(caption)}</caption>
<thead><tr><th scope="col">Place</th><th scope="col">Status</th><th scope="col">Since</th><th scope="col">Open to non-residents?</th><th scope="col">Last verified</th></tr></thead>
<tbody>
${placeRows(list)}
</tbody></table></div>`;

const netlifyForm = (name, fields, button, note) => `<form class="form" name="${name}" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="company">
<input type="hidden" name="form-name" value="${name}">
<p class="skip"><label>Leave this empty <input name="company"></label></p>
${fields}
<button class="btn btn-dark" type="submit">${button}</button>
${note ? `<p class="form-note">${note}</p>` : ''}
</form>`;

const emailField = (id) => `<div class="field"><label for="${id}">Email</label><input id="${id}" name="email" type="email" autocomplete="email" required></div>`;

const checkerScript = `<script>
(function () {
  var f = document.getElementById('where-form');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    var v = f.elements.place.value;
    e.preventDefault();
    window.location.href = v === 'elsewhere' ? '/places/#elsewhere' : v ? '/places/' + v + '/' : '/places/';
  });
})();
</script>`;

export function home(data) {
  const { places } = data;
  const usCount = places.filter((p) => p.region === 'us' && p.status === 'legal').length;
  const sample = ['oregon', 'vermont', 'new-york', 'illinois', 'switzerland', 'france', 'england-and-wales'].map((s) => places.find((p) => p.slug === s));
  return {
    path: '/',
    title: site.name,
    description: 'Clear, current answers about medical aid in dying in the US and worldwide: who qualifies, how long it takes, what it costs and who can help.',
    body: `
<section class="hero">
<div class="wrap">
<div class="hero-main">
<p class="eyebrow">Medical aid in dying · US and worldwide</p>
<h1>Clear, current answers about medical aid in dying.</h1>
<p class="lead" style="margin-top:24px">Every legal route, place by place: who qualifies, how long it takes, what it costs and who can help. Free, plainly written, and checked against official sources.</p>
<div class="form-panel">
<form class="form" id="where-form" action="/places/" method="get">
<div class="field"><label for="place">Where do you live?</label>
<select id="place" name="place">
${placeOptions(places)}
</select></div>
<button class="btn" type="submit">See what's available</button>
<p class="form-note">Nothing is saved. This is information, not a medical or legal decision.</p>
</form>
</div>
</div>
<aside class="hero-side card" aria-labelledby="trust-h">
<h2 id="trust-h" class="eyebrow" style="font-family:var(--sans);color:var(--muted)">Why you can trust this</h2>
<div class="trust">
<div><strong>Last verified ${fmtDate(site.lastVerified)}</strong><span class="muted">Every place page shows its own check date and sources.</span></div>
<div><strong>Clinical and legal review</strong><span class="muted">Named reviewers are being appointed. <a href="/about/#reviewers">Our review process</a></span></div>
<div><strong>No money from providers</strong><span class="muted">No referral fees and no ads. <a href="/about/#funding">How we're funded</a></span></div>
<div><strong>Legal routes only</strong><span class="muted">We cover legal processes, never methods outside the law.</span></div>
</div>
</aside>
</div>
</section>

<section class="section-tight" aria-label="At a glance">
<div class="wrap grid">
<div class="card"><div class="stat">${usCount - 1} states + DC</div><p class="muted" style="margin:8px 0 0">allow medical aid in dying in the US, including New York and Illinois in 2026.</p></div>
<div class="card"><div class="stat">2 states</div><p class="muted" style="margin:8px 0 0">accept people from out of state: Oregon and Vermont.</p></div>
<div class="card"><div class="stat">France, 2027</div><p class="muted" style="margin:8px 0 0">Its new law passed in August 2026 and is expected to take effect early next year.</p></div>
</div>
</section>

<section class="section" aria-labelledby="five-h">
<div class="wrap">
<h2 id="five-h">The five questions everyone asks</h2>
<p class="sub" style="margin-bottom:32px">Start with any of them. Each answer depends on where you live.</p>
<div class="grid">
<a class="card" href="/places/"><strong>Am I eligible?</strong><span class="muted small">Diagnosis, prognosis, residency and the ability to decide for yourself.</span></a>
<a class="card" href="/places/"><strong>Where is it legal?</strong><span class="muted small">Every state and country we cover, with the date the law took effect.</span></a>
<a class="card" href="/timeline/"><strong>How long does it take?</strong><span class="muted small">The steps, and why starting early matters.</span></a>
<a class="card" href="/going-abroad/"><strong>What does it cost?</strong><span class="muted small">Doctor visits, insurance and travel abroad.</span></a>
<a class="card" href="/navigation/"><strong>Who can help?</strong><span class="muted small">Clinicians, hospices, doulas and navigators.</span></a>
</div>
</div>
</section>

<section class="band" aria-labelledby="places-h">
<div class="wrap section">
<h2 id="places-h">Where it's legal</h2>
<p class="sub" style="margin-bottom:28px">A sample of the places we cover. <a href="/places/">See all ${places.length} places</a>.</p>
${placeTable(sample, 'Sample of places')}
</div>
</section>

<section class="section" aria-label="Guides">
<div class="wrap grid grid-wide">
<a class="card" href="/going-abroad/"><h3>Going to Switzerland</h3><p class="muted" style="margin:0">How it works for people from abroad, approximate costs, and the legal risk for family who travel with you.</p></a>
<a class="card" href="/families/"><h3>For families</h3><p class="muted" style="margin:0">Talking about it, what happens on the day, death certificates, insurance and grief.</p></a>
<a class="card" href="/plan-ahead/"><h3>Plan ahead</h3><p class="muted" style="margin:0">A checklist anyone can use: advance directive, health care proxy, wishes and documents.</p></a>
</div>
</section>

<section class="band-tint" aria-labelledby="alert-h">
<div class="wrap section" style="display:flex;flex-wrap:wrap;gap:32px;align-items:center;justify-content:space-between">
<div style="flex:1 1 420px;min-width:0">
<h2 id="alert-h">Know when the law changes where you live</h2>
<p style="margin:0">One email when a bill moves or a law takes effect in your state or country. Nothing else.</p>
</div>
<div style="flex:1 1 420px;min-width:0">
${netlifyForm('alerts', emailField('alert-email') + `<div class="field"><label for="alert-place">Place</label><input id="alert-place" name="place" type="text" placeholder="State or country"></div>`, 'Get alerts', 'Unsubscribe any time. <a href="/privacy/">Privacy</a>')}
</div>
</div>
</section>

<section class="section" aria-label="Services">
<div class="wrap" style="display:flex;flex-wrap:wrap;gap:24px">
<div class="card" style="flex:999 1 560px;min-width:0;padding:36px">
<p class="eyebrow">Paid service</p>
<h2>Want a person to walk you through it?</h2>
<p class="sub">A trained navigator helps you or your family understand the options, gather paperwork, find clinicians who take part, or prepare an application abroad. Navigators never judge whether you qualify; doctors do.</p>
<a class="btn" href="/navigation/">About navigation sessions</a>
</div>
<div class="card" style="flex:1 1 300px;min-width:0;padding:36px">
<p class="eyebrow">For professionals</p>
<h2 style="font-size:30px">Training and data</h2>
<p class="muted">Courses for doulas, social workers, chaplains and nurses, and a licensed law database for hospices, law firms and benefits teams.</p>
<a href="/professionals/">Explore professional options</a>
</div>
</div>
</section>
${checkerScript}`,
  };
}

export function placesIndex(data) {
  const us = data.places.filter((p) => p.region === 'us');
  const world = data.places.filter((p) => p.region === 'world');
  return {
    path: '/places/',
    title: 'Where medical aid in dying is legal',
    description: 'Every US state and country we cover, with status, effective date, residency rules and the date we last checked.',
    body: `
<section class="section">
<div class="wrap">
<h1>Where it's legal</h1>
<p class="lead" style="margin:20px 0 40px">Status, effective date and residency rules for every place we cover. Each page lists its sources and the date we last checked it.</p>
<h2>United States</h2>
<p class="sub">Medical aid in dying is legal in ${us.length - 1} states and the District of Columbia. Only Oregon and Vermont accept people who live elsewhere.</p>
${placeTable(us, 'United States')}
<h2 style="margin-top:56px">Around the world</h2>
${placeTable(world, 'Around the world')}
<div id="elsewhere" class="card" style="margin-top:40px">
<h3>Don't see your country?</h3>
<p>We're researching: ${data.researching.map(esc).join(', ')}. <a href="/alerts/">Get an alert</a> when we add your country.</p>
<p class="muted" style="margin:0">If medical aid in dying is not legal where you live, the <a href="/going-abroad/">going-abroad guide</a> explains the options and the legal risks.</p>
</div>
</div>
</section>`,
  };
}

export function placePage(p) {
  const residentsOnly = p.region === 'us' && /residents only/.test(p.nonResidents);
  const sources = p.sources.length
    ? `<ul>${p.sources.map((s) => `<li><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join('')}</ul>`
    : '<p class="muted">Official sources are being added.</p>';
  return {
    path: `/places/${p.slug}/`,
    title: `Medical aid in dying in ${p.name}`,
    description: `${p.name}: ${p.statusLabel}. ${p.summary}`,
    body: `
<section class="section">
<div class="wrap prose">
<p class="small"><a href="/places/">All places</a></p>
<h1>${esc(p.name)}</h1>
<p style="margin:16px 0">${pill(p)}</p>
<p class="lead">${esc(p.summary)}</p>
<dl class="facts">
<dt>Status</dt><dd>${esc(p.statusLabel)}</dd>
<dt>Law</dt><dd>${esc(p.law)}</dd>
<dt>Since</dt><dd>${esc(p.since)}</dd>
<dt>Open to non-residents?</dt><dd>${esc(p.nonResidents)}</dd>
<dt>Last verified</dt><dd>${fmtDate(p.verified)}</dd>
</dl>
${residentsOnly ? '<p>If you don\'t live here, <a href="/places/oregon/">Oregon</a> and <a href="/places/vermont/">Vermont</a> accept people from other states.</p>' : ''}
${p.status === 'not-legal' ? '<p>Helping someone die can be a crime here, including traveling with them abroad. Read the <a href="/going-abroad/">going-abroad guide</a> and talk to a lawyer first.</p>' : ''}
<div class="notice"><strong>Details we're still verifying:</strong> waiting periods, how many clinicians must agree, self-administration rules, typical costs and insurance coverage. Until they're checked, confirm them with the official sources below or your doctor.</div>
<h2>Sources</h2>
${sources}
<h2>Next steps</h2>
<ul>
<li><a href="/timeline/">How long the process takes</a></li>
<li><a href="/families/">A guide for families</a></li>
<li><a href="/navigation/">Talk to a navigator</a></li>
<li><a href="/alerts/">Get an alert when ${esc(p.name)}'s law changes</a></li>
</ul>
</div>
</section>`,
  };
}

export const staticPages = [
  {
    path: '/timeline/',
    title: 'How long medical aid in dying takes',
    description: 'The usual steps in the US, and why starting early matters.',
    body: `
<section class="section"><div class="wrap">
<h1>Start earlier than you think</h1>
<p class="lead" style="margin:20px 0 40px">The process has several steps, and illness can move faster than paperwork. This is the usual shape in US states; waiting periods and other details differ by state, so check <a href="/places/">your state's page</a>.</p>
<ol class="steps">
<li class="card"><div class="step-n">1</div><strong>First request</strong><p class="muted small" style="margin:0">Tell your doctor you want to ask. Not every doctor, hospital or hospice takes part.</p></li>
<li class="card"><div class="step-n">2</div><strong>Second opinion</strong><p class="muted small" style="margin:0">A second clinician confirms the diagnosis, prognosis and your ability to decide.</p></li>
<li class="card"><div class="step-n">3</div><strong>Waiting period</strong><p class="muted small" style="margin:0">Most states require time between requests. Some shorten it for people near death.</p></li>
<li class="card"><div class="step-n">4</div><strong>Written request</strong><p class="muted small" style="margin:0">A signed form, usually with witnesses, then the prescription.</p></li>
<li class="card"><div class="step-n">5</div><strong>Decide if and when</strong><p class="muted small" style="margin:0">Having the prescription doesn't mean you must use it.</p></li>
</ol>
<div class="prose">
<h2>Why starting early matters</h2>
<p>Everyone who asks must be able to make and communicate their own decision at every step. If illness takes that ability away, the process stops. Starting the conversation with your doctor early keeps the option open, even if you never use it.</p>
<h2>If your doctor won't take part</h2>
<p>Doctors and hospices can decline. Ask for a referral, or <a href="/navigation/">talk to a navigator</a> about clinicians in your state who do take part.</p>
</div>
</div></section>`,
  },
  {
    path: '/going-abroad/',
    title: 'Going to Switzerland',
    description: 'How assisted dying in Switzerland works for people from other countries, approximate costs, and the legal risks for companions.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Going to Switzerland</h1>
<p class="lead" style="margin:20px 0">Switzerland is the main option for people whose own country has no law. It's a long, costly process, and it can carry legal risk for anyone who helps you.</p>
<h2>Why Switzerland</h2>
<p>Under article 115 of the Swiss Criminal Code, helping someone die by suicide is a crime only when the motive is selfish. Private organizations run the process, and some of them accept people from other countries. Read our <a href="/places/switzerland/">Switzerland page</a> for sources.</p>
<h2>What it usually involves</h2>
<ul>
<li>Joining an organization and sending your medical records, which often need translating.</li>
<li>A review of your case, and an assessment by a Swiss doctor before anything is approved.</li>
<li>Travel to Switzerland while you are still well enough to travel.</li>
<li>Arrangements for afterward: cremation in Switzerland or bringing the body home.</li>
</ul>
<h2>Approximate costs</h2>
<p>News reports put Dignitas at about CHF 7,500, or CHF 10,500 to 11,000 with funeral and administrative services, plus membership fees. Pegasos is reported at about CHF 10,000 all-in. Travel, accommodation and medical reports are extra. Confirm current fees with each organization; some reduce fees for people with little money.</p>
<h2>Legal risk for family and friends</h2>
<p>Your companions are covered by the law of the country they live in, not just Swiss law. In some countries, including England and Wales, helping someone travel to die can be investigated as assisting a suicide. Talk to a lawyer in your country before you plan the trip.</p>
<p><a class="btn" href="/navigation/">Get help planning an application</a></p>
</div></section>`,
  },
  {
    path: '/families/',
    title: 'A guide for families',
    description: 'How to talk about medical aid in dying, what to expect, death certificates, life insurance and grief.',
    body: `
<section class="section"><div class="wrap prose">
<h1>For families</h1>
<p class="lead" style="margin:20px 0">When someone you love is considering medical aid in dying, you may feel relief, fear, grief and disagreement all at once. All of those are normal.</p>
<h2>Talking about it</h2>
<ul>
<li>Ask what they want and why, and listen before you respond.</li>
<li>The decision is theirs. Every law requires the person to ask freely, without pressure from anyone.</li>
<li>Ask whether they want you involved, and how.</li>
<li>Hospice teams, social workers, chaplains and end-of-life doulas can help families have these conversations.</li>
</ul>
<h2>Planning the day</h2>
<p>Many people choose where they'll be, who will be with them, and what they'll hear and see. Ask their care team what support is available on the day where you live.</p>
<h2>Death certificates and insurance</h2>
<p>In most US states with these laws, the death certificate lists the underlying illness. US aid-in-dying laws generally say that using the law does not count as suicide. Check your state's law and the specific insurance policy before you rely on this.</p>
<h2>Grief afterward</h2>
<p>Grief after a planned death can include relief and guilt at the same time. Hospice bereavement programs are often free to families, even after the person has died.</p>
</div></section>`,
  },
  {
    path: '/plan-ahead/',
    title: 'Plan ahead: an end-of-life checklist',
    description: 'A plain checklist for anyone: advance directive, health care proxy, conversations, wishes and documents.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Plan ahead</h1>
<p class="lead" style="margin:20px 0">You don't need a diagnosis to start. These are the things families most often wish had been done.</p>
<h2>Medical wishes</h2>
<ul class="check">
<li>Write an advance directive (a living will), using your state's form.</li>
<li>Name a health care proxy: the person who decides if you can't.</li>
<li>Talk to your doctor about your wishes, and ask whether they would take part in medical aid in dying if it's legal where you live.</li>
<li>Ask about a POLST or MOLST form if you are seriously ill.</li>
</ul>
<h2>Practical matters</h2>
<ul class="check">
<li>Make a list of where your will, insurance, accounts and passwords are kept.</li>
<li>Say what you want for a funeral, cremation or celebration of life.</li>
<li>Decide who looks after children, pets and digital accounts.</li>
</ul>
<h2>Personal matters</h2>
<ul class="check">
<li>Write letters or record messages for the people you love.</li>
<li>Tell people what matters to you about your last weeks.</li>
</ul>
<p>Print this page to use it as a worksheet.</p>
</div></section>`,
  },
  {
    path: '/navigation/',
    title: 'Navigation sessions',
    description: 'Paid, one-to-one help understanding end-of-life options, gathering paperwork and finding clinicians who take part.',
    body: `
<section class="section"><div class="wrap prose">
<p class="eyebrow">Paid service</p>
<h1>Talk to a navigator</h1>
<p class="lead" style="margin:20px 0">One-to-one help for you or your family: understanding the options where you live, gathering paperwork, finding clinicians and hospices that take part, or preparing an application abroad.</p>
<h2>What navigators do and don't do</h2>
<ul>
<li>They explain the law and the process, and help you prepare.</li>
<li>They never decide whether you qualify. Doctors do.</li>
<li>They never give medical or legal advice, and never help with anything outside the law.</li>
<li>If you're in crisis, they'll connect you with crisis support first.</li>
</ul>
<h2>Prices</h2>
<ul>
<li>One session: [PRICE]</li>
<li>Full guidance through the process: [PRICE]</li>
<li>Reduced fees available on request</li>
</ul>
<p>We are never paid by clinicians, hospices or Swiss organizations, so our guidance doesn't depend on where you go.</p>
<h2>Booking opens soon</h2>
${netlifyForm('navigation-interest', emailField('nav-email') + '<div class="field"><label for="nav-place">Where you live</label><input id="nav-place" name="place" type="text"></div>', 'Tell me when booking opens', 'Please don\'t include medical details here. <a href="/privacy/">Privacy</a>')}
</div></section>`,
  },
  {
    path: '/professionals/',
    title: 'For professionals',
    description: 'Training for end-of-life professionals and a licensed law database for organizations.',
    body: `
<section class="section"><div class="wrap prose">
<h1>For professionals</h1>
<p class="lead" style="margin:20px 0">For doulas, social workers, chaplains, nurses, and the organizations they work for.</p>
<h2>Training</h2>
<p>Short courses on how medical aid in dying works in practice, state by state, and how to support patients and families through it.</p>
<h2>Law database</h2>
<p>The data behind this site, kept current and licensed for hospices, estate law firms, insurers and employee-benefits teams.</p>
<h2>Get early access</h2>
${netlifyForm('professionals-interest', emailField('pro-email') + '<div class="field"><label for="pro-role">Your role or organization</label><input id="pro-role" name="role" type="text"></div>', 'Join the list', '')}
</div></section>`,
  },
  {
    path: '/alerts/',
    title: 'Law-change alerts',
    description: 'Get one email when the law on medical aid in dying changes in your state or country.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Law-change alerts</h1>
<p class="lead" style="margin:20px 0">One email when a bill moves or a law takes effect in the place you choose. Nothing else.</p>
${netlifyForm('alerts', emailField('alerts-email') + '<div class="field"><label for="alerts-place">State or country</label><input id="alerts-place" name="place" type="text"></div>', 'Get alerts', 'Unsubscribe any time. <a href="/privacy/">Privacy</a>')}
</div></section>`,
  },
  {
    path: '/about/',
    title: 'About End of Life Atlas',
    description: 'How End of Life Atlas is funded, how we check facts, and who reviews our pages.',
    body: `
<section class="section"><div class="wrap prose">
<h1>About End of Life Atlas</h1>
<p class="lead" style="margin:20px 0">A neutral, current guide to legal end-of-life choices in the US and around the world.</p>
<h2 id="funding">How we're funded</h2>
<p>End of Life Atlas is run by an independent company. The guide is free. We earn money from paid navigation sessions, professional training and licensing our law database.</p>
<p>We take no referral fees or payments from clinicians, hospices, pharmacies or assisted-dying organizations, and we run no advertising.</p>
<h2 id="editorial">Editorial and review policy</h2>
<ul>
<li>Every fact on a place page comes from an official source or a named report, linked on that page.</li>
<li>Anything we haven't confirmed is marked "to be verified."</li>
<li>We re-check each place every quarter, and whenever a bill moves.</li>
<li>Each page shows the date it was last verified.</li>
<li>We cover legal processes only. We never publish information about ending a life outside the law.</li>
</ul>
<p>Spotted an error? Email corrections@eolatlas.com.</p>
<h2 id="reviewers">Our reviewers</h2>
<p>We're appointing a physician experienced in end-of-life care and an attorney to review every place page. Their names will appear here and on each page they review.</p>
</div></section>`,
  },
  {
    path: '/privacy/',
    title: 'Privacy',
    description: 'What End of Life Atlas collects and what we never do with it.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Privacy</h1>
<p class="lead" style="margin:20px 0">This is a sensitive subject, so we collect as little as we can.</p>
<ul>
<li>We use no advertising or tracking cookies.</li>
<li>The "where do you live" tool runs in your browser and saves nothing.</li>
<li>If you sign up for alerts or services, we store your email and the place you chose, and use them only for what you asked for.</li>
<li>We never sell or share your information with advertisers or providers.</li>
<li>Please don't send medical details through our forms.</li>
</ul>
<p>To see or delete your information, email privacy@eolatlas.com.</p>
</div></section>`,
  },
  {
    path: '/thanks/',
    title: 'Thank you',
    description: 'Your request was received.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Thank you</h1>
<p class="lead" style="margin:20px 0">We've received your request. We'll only email you about what you asked for.</p>
<p><a href="/">Back to the home page</a></p>
</div></section>`,
  },
];

export const notFound = {
  path: '/404.html',
  title: 'Page not found',
  description: 'This page does not exist.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Page not found</h1>
<p class="lead" style="margin:20px 0">That page doesn't exist. Try <a href="/places/">where it's legal</a> or the <a href="/">home page</a>.</p>
</div></section>`,
};
