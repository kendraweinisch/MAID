import { esc, fmtDate, site } from './layout.mjs';

const MAID = '/medical-aid-in-dying';

/* ---------- shared pieces ---------- */

const pill = (p) => `<span class="pill pill-${p.status}">${esc(p.statusLabel)}</span>`;

const placeOptions = (places) =>
  ['<option value="">Choose a state or country</option>']
    .concat(places.map((p) => `<option value="${p.slug}">${esc(p.name)}</option>`))
    .concat('<option value="elsewhere">Somewhere else</option>')
    .join('\n');

const placeRows = (list) =>
  list
    .map(
      (p) => `<tr><td><a href="${MAID}/places/${p.slug}/">${esc(p.name)}</a></td><td>${pill(p)}</td><td>${esc(p.since)}</td><td>${esc(p.nonResidents)}</td><td class="muted">${fmtDate(p.verified)}</td></tr>`
    )
    .join('\n');

const placeTable = (list, caption) => `<div class="table-box"><table>
<caption class="skip">${esc(caption)}</caption>
<thead><tr><th scope="col">Place</th><th scope="col">Status</th><th scope="col">Since</th><th scope="col">Open to non-residents?</th><th scope="col">Last verified</th></tr></thead>
<tbody>
${placeRows(list)}
</tbody></table></div>`;

// Forms post to FORM_ENDPOINT (for example a Formspree URL) when it is set,
// use Netlify Forms when building on Netlify, and otherwise show as "opening soon".
const formEndpoint = process.env.FORM_ENDPOINT || '';
const onNetlify = process.env.NETLIFY === 'true';

const signupForm = (name, fields, button, note) => {
  if (!formEndpoint && !onNetlify) {
    return `<div class="card"><p style="margin:0"><strong>Sign-up opens soon.</strong> <span class="muted">This form isn't connected yet.</span></p></div>`;
  }
  const attrs = formEndpoint
    ? `action="${esc(formEndpoint)}"`
    : `action="/thanks/" data-netlify="true" netlify-honeypot="company"`;
  return `<form class="form" name="${name}" method="POST" ${attrs}>
<input type="hidden" name="form-name" value="${name}">
<p class="skip"><label>Leave this empty <input name="company"></label></p>
${fields}
<button class="btn btn-dark" type="submit">${button}</button>
${note ? `<p class="form-note">${note}</p>` : ''}
</form>`;
};

const emailField = (id) => `<div class="field"><label for="${id}">Email</label><input id="${id}" name="email" type="email" autocomplete="email" required></div>`;

const updatesForm = (id) =>
  signupForm(
    'updates',
    emailField(`${id}-email`) +
      `<div class="field"><label for="${id}-place">State or country (optional)</label><input id="${id}-place" name="place" type="text"></div>`,
    'Get updates',
    'New guides and law changes for your area. Unsubscribe any time. <a href="/privacy/">Privacy</a>'
  );

const sourceList = (sources) =>
  sources.length
    ? `<h2 id="sources">Sources</h2><ul>${sources.map(([label, url]) => `<li><a href="${esc(url)}">${esc(label)}</a></li>`).join('')}</ul>`
    : '';

const relatedCards = (items) =>
  `<div class="grid grid-wide" style="margin-top:24px">${items
    .map(([href, title, text]) => `<a class="card" href="${href}"><strong>${title}</strong><span class="muted small">${text}</span></a>`)
    .join('')}</div>`;

// A guide page: hero, "on this page" list, sections, sources and related links.
function guide({ path, title, description, eyebrow, lead, reviewed = site.lastVerified, sections, sources = [], related = [], crisis = false }) {
  const toc = sections.map((s) => `<li><a href="#${s.id}">${s.h}</a></li>`).join('');
  return {
    path,
    title,
    description,
    crisis,
    body: `
<section class="page-hero">
<div class="wrap prose">
<p class="eyebrow">${eyebrow}</p>
<h1>${title}</h1>
<p class="lead" style="margin-top:20px">${lead}</p>
<p class="small muted" style="margin:0">Last reviewed ${fmtDate(reviewed)} · <a href="/about/#editorial">How we check facts</a></p>
</div>
</section>
<section class="section">
<div class="wrap prose">
<nav class="toc card" aria-label="On this page"><strong>On this page</strong><ul>${toc}</ul></nav>
${sections.map((s) => `<h2 id="${s.id}">${s.h}</h2>\n${s.html}`).join('\n')}
${sourceList(sources)}
${related.length ? `<h2 id="related">Related</h2>${relatedCards(related)}` : ''}
</div>
</section>`,
  };
}

// A printable checklist page.
function checklist({ path, title, description, lead, groups, note }) {
  return {
    path,
    title,
    description,
    body: `
<section class="section">
<div class="wrap prose">
<p class="small no-print"><a href="/checklists/">All checklists</a></p>
<p class="eyebrow">Printable checklist</p>
<h1>${title}</h1>
<p class="lead" style="margin:20px 0">${lead}</p>
<p class="no-print"><button class="btn" type="button" onclick="window.print()">Print this checklist</button></p>
${groups
  .map(
    (g) => `<h2>${g.h}</h2>
<ul class="check">${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>`
  )
  .join('\n')}
${note ? `<p class="muted small">${note}</p>` : ''}
<p class="muted small print-only">From End of Life Atlas · eolatlas.com · Information, not medical or legal advice.</p>
</div>
</section>`,
  };
}

const checkerScript = `<script>
(function () {
  var f = document.getElementById('where-form');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    var v = f.elements.place.value;
    var base = document.documentElement.getAttribute('data-base') || '';
    e.preventDefault();
    window.location.href = base + '${MAID}' + (v === 'elsewhere' ? '/#elsewhere' : v ? '/places/' + v + '/' : '/');
  });
})();
</script>`;

/* ---------- home ---------- */

export function home(data) {
  const usCount = data.places.filter((p) => p.region === 'us' && p.status === 'legal').length - 1;
  return {
    path: '/',
    title: site.name,
    description: 'Every part of the end of life, explained plainly: planning ahead, serious illness, the last weeks, what to do after a death, grief, and medical aid in dying.',
    body: `
<section class="hero">
<div class="wrap">
<div class="hero-main">
<p class="eyebrow">A plain guide to the end of life</p>
<h1>Every part of the end of life, explained.</h1>
<p class="lead" style="margin-top:24px">Planning ahead, serious illness, the last weeks, what to do after a death, and grief. What to know, what to ask, and what the rules are where you live.</p>
<p style="margin-top:28px;display:flex;flex-wrap:wrap;gap:12px"><a class="btn" href="#where">Find where to start</a><a class="btn btn-quiet" href="/after-a-death/">Someone has just died</a></p>
</div>
<aside class="hero-side card" aria-labelledby="trust-h">
<h2 id="trust-h" class="eyebrow" style="font-family:var(--sans);color:var(--muted)">What makes this different</h2>
<div class="trust">
<div><strong>Organized by what you're facing</strong><span class="muted">Not by what someone wants to sell you.</span></div>
<div><strong>Checked and dated</strong><span class="muted">Every guide shows when it was last reviewed and links its sources.</span></div>
<div><strong>Nothing to sell inside the guide</strong><span class="muted">No funding, no ads, no referral fees. <a href="/about/#funding">How we're funded</a></span></div>
<div><strong>Every option, including the hard ones</strong><span class="muted">Hospice, home funerals, green burial and medical aid in dying, covered plainly.</span></div>
</div>
</aside>
</div>
</section>

<section id="where" class="section" aria-labelledby="where-h">
<div class="wrap">
<h2 id="where-h">Where are you right now?</h2>
<p class="sub" style="margin-bottom:32px">Start with what you're facing. Each guide is short, plain and links to the next step.</p>
<div class="grid">
<a class="card stage" href="/plan-ahead/"><span class="stage-n">1</span><strong>I want to plan ahead</strong><span class="muted small">Advance directives, a health care proxy, your wishes and your paperwork.</span></a>
<a class="card stage" href="/serious-illness/"><span class="stage-n">2</span><strong>Someone I love is seriously ill</strong><span class="muted small">Palliative care, hospice, care at home, and the questions to ask.</span></a>
<a class="card stage" href="/last-weeks/"><span class="stage-n">3</span><strong>Death may be weeks away</strong><span class="muted small">What to expect, comfort, being present, and saying goodbye.</span></a>
<a class="card stage" href="/after-a-death/"><span class="stage-n">4</span><strong>Someone has just died</strong><span class="muted small">The first 24 hours, the first week, funerals and paperwork.</span></a>
<a class="card stage" href="/grief/"><span class="stage-n">5</span><strong>I'm grieving</strong><span class="muted small">For adults, children and pets, and when to get more help.</span></a>
<a class="card stage" href="${MAID}/"><span class="stage-n">+</span><strong>I'm considering medical aid in dying</strong><span class="muted small">Where it's legal, who qualifies and how the process works.</span></a>
</div>
</div>
</section>

<section class="band" aria-labelledby="tools-h">
<div class="wrap section">
<h2 id="tools-h">Free printable checklists</h2>
<p class="sub" style="margin-bottom:28px">No account, no email. Print them, fill them in, and keep them where your family can find them.</p>
<div class="grid grid-wide">
<a class="card" href="/checklists/plan-ahead/"><strong>Plan-ahead worksheet</strong><span class="muted small">Your wishes, your people and where everything is kept.</span></a>
<a class="card" href="/checklists/questions-for-the-doctor/"><strong>Questions for the doctor</strong><span class="muted small">What to ask after a serious diagnosis, and about hospice.</span></a>
<a class="card" href="/checklists/after-a-death/"><strong>After a death: the first 24 hours</strong><span class="muted small">Who to call first, and what can wait.</span></a>
</div>
</div>
</section>

<section class="section" aria-labelledby="maid-h">
<div class="wrap" style="display:flex;flex-wrap:wrap;gap:32px;align-items:flex-start">
<div style="flex:999 1 480px;min-width:0">
<p class="eyebrow">One choice among many</p>
<h2 id="maid-h">Medical aid in dying, covered carefully</h2>
<p class="sub">Where it's legal, who qualifies, how long it takes and what it costs, kept current and checked against official sources. It sits alongside hospice and palliative care, not instead of them.</p>
<form class="form" id="where-form" action="${MAID}/" method="get" style="margin-top:24px;max-width:560px">
<div class="field"><label for="place">Where do you live?</label>
<select id="place" name="place">
${placeOptions(data.places)}
</select></div>
<button class="btn" type="submit">See the rules</button>
</form>
</div>
<div class="grid" style="flex:1 1 320px;min-width:0">
<div class="card"><div class="stat">${usCount} states + DC</div><p class="muted small" style="margin:6px 0 0">allow medical aid in dying in the US.</p></div>
<div class="card"><div class="stat">${data.places.filter((p) => p.region === 'world').length} countries</div><p class="muted small" style="margin:6px 0 0">covered outside the US, with more being researched.</p></div>
</div>
</div>
</section>

<section class="band-tint" aria-labelledby="updates-h">
<div class="wrap section" style="display:flex;flex-wrap:wrap;gap:32px;align-items:center;justify-content:space-between">
<div style="flex:1 1 420px;min-width:0">
<h2 id="updates-h">New guides and law changes, by email</h2>
<p style="margin:0">Occasional, plain updates. Tell us your state or country to hear when its rules change.</p>
</div>
<div style="flex:1 1 420px;min-width:0">${updatesForm('home')}</div>
</div>
</section>

<section class="section" aria-label="Services">
<div class="wrap" style="display:flex;flex-wrap:wrap;gap:24px">
<div class="card" style="flex:999 1 560px;min-width:0;padding:36px">
<p class="eyebrow">Paid service</p>
<h2>Want a person to help you through it?</h2>
<p class="sub">A navigator helps you or your family make sense of the options: planning documents, choosing hospice, arranging a funeral, handling paperwork after a death, or medical aid in dying.</p>
<a class="btn" href="/navigation/">About navigation sessions</a>
</div>
<div class="card" style="flex:1 1 300px;min-width:0;padding:36px">
<p class="eyebrow">For organizations</p>
<h2 style="font-size:30px">Hospices, employers and insurers</h2>
<p class="muted">License our guides and checklists for your patients, employees or members, or train your staff.</p>
<a href="/professionals/">Work with us</a>
</div>
</div>
</section>
${checkerScript}`,
  };
}

/* ---------- stage guides ---------- */

export const guides = [
  guide({
    path: '/plan-ahead/',
    title: 'Plan ahead',
    eyebrow: 'Stage 1',
    description: 'How to plan for the end of life: advance directives, a health care proxy, the conversation with your family, and getting your paperwork in order.',
    lead: "You don't need a diagnosis to start. Planning ahead spares the people you love from guessing what you would have wanted.",
    sections: [
      { id: 'directive', h: 'Write an advance directive', html: `<p>An advance directive is a legal document that says what medical care you want if you can't speak for yourself. It usually has two parts:</p>
<ul><li><strong>A living will:</strong> the treatments you would and wouldn't want, such as breathing machines or tube feeding.</li>
<li><strong>A health care power of attorney:</strong> the person who decides for you (your health care proxy or agent).</li></ul>
<p>Each US state has its own form and its own rules about witnesses or notaries. Forms are free; you don't need a lawyer. Give copies to your proxy and your doctor, and keep the original where it can be found.</p>` },
      { id: 'proxy', h: 'Choose your health care proxy', html: `<p>Pick someone who will follow your wishes even if they disagree, can stay calm under pressure, and can be reached quickly. Name a backup. Then tell them, in detail, what matters to you.</p>` },
      { id: 'talk', h: 'Have the conversation', html: `<p>The document matters less than the conversation behind it. Useful questions to talk through:</p>
<ul><li>What would make life not worth living for you? What would you be willing to go through for more time?</li>
<li>Where would you want to be at the end: at home, in a hospice, in a hospital?</li>
<li>Who do you want with you, and who do you want to make decisions?</li>
<li>What do you want for your body and your funeral?</li></ul>` },
      { id: 'paperwork', h: 'Get your paperwork in order', html: `<p>Families lose weeks looking for things. Write down where to find your will, insurance policies, bank and retirement accounts, the deed or lease, passwords, and who should look after children and pets. Add a beneficiary to accounts where you can: those usually pass outside probate.</p>
<p><a href="/checklists/plan-ahead/">Use the printable plan-ahead worksheet</a>.</p>` },
      { id: 'wishes', h: 'Say what you want afterward', html: `<p>Burial, cremation, green burial or body donation. A religious service, a celebration of life, or nothing at all. Music, readings, who should speak. Writing it down is a gift to whoever has to arrange it. Body donation usually has to be arranged in advance with a medical school or program.</p>` },
      { id: 'review', h: 'Review it every few years', html: `<p>Look again after a new diagnosis, a divorce or a death in the family, or every few years anyway. Update the documents and tell your proxy what changed.</p>` },
    ],
    sources: [
      ['National Institute on Aging: advance care planning', 'https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care'],
    ],
    related: [
      ['/checklists/plan-ahead/', 'Plan-ahead worksheet', 'Printable, no account needed.'],
      ['/serious-illness/', 'Serious illness', 'If a diagnosis has already come.'],
    ],
  }),

  guide({
    path: '/serious-illness/',
    title: 'Serious illness',
    eyebrow: 'Stage 2',
    description: 'Palliative care, hospice, POLST forms, care at home and the questions to ask after a serious diagnosis.',
    lead: 'A serious diagnosis brings a flood of decisions. These are the options most families wish they had heard about sooner.',
    sections: [
      { id: 'palliative', h: 'Palliative care: at any stage', html: `<p>Palliative care is specialist care for pain, symptoms and stress. You can have it at any stage of a serious illness, alongside treatment aimed at a cure. Ask for a palliative care referral early; many people only hear about it near the end.</p>` },
      { id: 'hospice', h: 'Hospice: when the focus turns to comfort', html: `<p>Hospice is care focused on comfort when a cure is no longer the goal. In the US, Medicare covers hospice when a doctor certifies a life expectancy of six months or less if the illness runs its usual course. It includes the care team, comfort medications and equipment, usually at home.</p>
<ul><li>Choosing hospice usually means stopping treatment meant to cure the terminal illness, but not other care.</li>
<li>You can leave hospice and go back to curative treatment if you change your mind.</li>
<li>Many families say they wish they had started hospice sooner.</li></ul>` },
      { id: 'polst', h: 'POLST: medical orders for now', html: `<p>An advance directive covers the future. A POLST form (also called MOLST, POST or MOST, depending on the state) is a medical order signed by a clinician for someone who is seriously ill now. It tells emergency crews and hospitals what treatment you want, such as whether to attempt CPR.</p>` },
      { id: 'where', h: 'Where care happens', html: `<p>Care can happen at home with help from family, aides and a hospice team; in assisted living or a nursing home; or in an inpatient hospice. Ask what each option costs and what insurance or Medicaid covers before you decide.</p>` },
      { id: 'ask', h: 'Questions to ask the doctor', html: `<p>What is likely to happen next? What are the treatment options, and what would each one mean for my daily life? What would you do in my place? Bring someone to take notes.</p>
<p><a href="/checklists/questions-for-the-doctor/">Print the full list of questions</a>.</p>` },
      { id: 'caregivers', h: 'If you are the caregiver', html: `<p>Caregiving is work. Ask for help with specific tasks, accept it when it's offered, and ask the care team about respite care, which gives family caregivers a break.</p>` },
      { id: 'choices', h: 'Choices near the end of life', html: `<p>Some people want every treatment available. Some choose comfort care only. In some places, people who are terminally ill can also ask for <a href="${MAID}/">medical aid in dying</a>. All of these are legitimate choices, and the person who is ill gets to make them.</p>` },
    ],
    sources: [
      ['Medicare: hospice care coverage', 'https://www.medicare.gov/coverage/hospice-care'],
      ['National POLST', 'https://polst.org/'],
      ['National Institute on Aging: end of life', 'https://www.nia.nih.gov/health/end-of-life'],
    ],
    related: [
      ['/checklists/questions-for-the-doctor/', 'Questions for the doctor', 'Printable, for appointments.'],
      ['/last-weeks/', 'The last weeks', 'What to expect as death comes closer.'],
    ],
  }),

  guide({
    path: '/last-weeks/',
    title: 'The last weeks',
    eyebrow: 'Stage 3',
    description: 'What to expect in the last weeks and days of life, how to keep someone comfortable, end-of-life doulas, and saying goodbye.',
    lead: 'Knowing what is normal near the end makes it less frightening, for the person who is dying and for the people with them.',
    sections: [
      { id: 'expect', h: 'What to expect', html: `<p>As death comes closer, many people sleep more, eat and drink less, and withdraw from conversation. Breathing may change and hands and feet may feel cool. These changes are usually a normal part of dying, not signs of suffering. The hospice team can explain what you are seeing.</p>` },
      { id: 'comfort', h: 'Keeping someone comfortable', html: `<p>Comfort comes first: pain and breathlessness can be treated, so tell the care team about any sign of distress. Small things help too: moistening the lips, changing position, soft light, familiar voices and music.</p>` },
      { id: 'doulas', h: 'End-of-life doulas', html: `<p>An end-of-life doula gives non-medical support to the dying person and their family: planning the last days, sitting vigil, and helping afterward. They work alongside hospice, not instead of it.</p>` },
      { id: 'goodbye', h: 'Saying goodbye', html: `<p>Hearing is thought to be one of the last senses to fade, so keep talking. Many people find it helps to say five things: thank you, I love you, I forgive you, please forgive me, and goodbye. It's also fine to step out. Some people die when their family has just left the room.</p>` },
      { id: 'prepare', h: 'Prepare for the moment of death', html: `<p>Decide in advance who to call. If the person is in hospice at home, call the hospice, not 911. Keep the <a href="/checklists/after-a-death/">first-24-hours checklist</a> nearby.</p>` },
    ],
    sources: [
      ['National Institute on Aging: end of life', 'https://www.nia.nih.gov/health/end-of-life'],
      ['National End-of-Life Doula Alliance', 'https://www.nedalliance.org/'],
      ['INELDA (International End of Life Doula Association)', 'https://www.inelda.org/'],
    ],
    related: [
      ['/after-a-death/', 'After a death', 'What to do in the first hours and days.'],
      ['/grief/', 'Grief', 'For you, and for children in the family.'],
    ],
  }),

  guide({
    path: '/after-a-death/',
    title: 'After a death',
    eyebrow: 'Stage 4',
    description: 'What to do after someone dies: the first 24 hours, death certificates, funeral and burial options, your rights with funeral homes, and paperwork.',
    lead: 'Very little has to happen in the first hours. This guide separates what is urgent from what can wait.',
    sections: [
      { id: 'first-hours', h: 'The first hours', html: `<ul><li><strong>Expected death at home with hospice:</strong> call the hospice. They will confirm the death and help with next steps.</li>
<li><strong>Unexpected death:</strong> call 911.</li>
<li><strong>In a hospital or care home:</strong> staff will guide you.</li></ul>
<p>There is usually no rush to move the body. You can take time to sit, say goodbye, and call family.</p>
<p><a href="/checklists/after-a-death/">Print the first-24-hours checklist</a>.</p>` },
      { id: 'certificates', h: 'Death certificates', html: `<p>A funeral home usually files the death certificate. Order several certified copies: banks, insurers, pension plans and government agencies often each want one.</p>` },
      { id: 'options', h: 'Funeral, burial and cremation options', html: `<ul><li><strong>Burial:</strong> traditional, or green (natural) burial without embalming or a concrete vault.</li>
<li><strong>Cremation:</strong> with or without a service. Direct cremation, with no service beforehand, usually costs least.</li>
<li><strong>Body donation:</strong> usually arranged in advance with a program.</li>
<li><strong>Home funeral:</strong> most states allow families to care for their own dead; some require a funeral director for certain steps.</li></ul>
<p>A service can happen weeks later, in any form you like.</p>` },
      { id: 'rights', h: 'Your rights with funeral homes', html: `<p>In the US, the FTC Funeral Rule gives you the right to:</p>
<ul><li>Get an itemized price list, in person, and prices by phone.</li>
<li>Buy only the goods and services you want.</li>
<li>Use a casket or urn bought elsewhere, without a handling fee.</li>
<li>Refuse embalming in most cases. Ask what the law actually requires.</li></ul>
<p>Prices vary widely. Calling two or three funeral homes can save thousands of dollars.</p>` },
      { id: 'first-month', h: 'The first month', html: `<ul><li>Find the will, and contact the executor named in it.</li>
<li>Notify Social Security (the funeral home often does this), pension plans, insurers and banks.</li>
<li>Claim life insurance and any benefits; ask about survivor benefits.</li>
<li>Cancel or transfer utilities, subscriptions and accounts. Keep paying essential bills.</li>
<li>Forward mail, secure the home and car, and look after pets.</li></ul>` },
      { id: 'probate', h: 'Probate and the estate', html: `<p>Probate is the court process for settling an estate. Accounts with a named beneficiary and jointly owned property usually pass outside it, and every state has a simpler process for small estates. If the estate is large or complicated, talk to a probate lawyer.</p>` },
    ],
    sources: [
      ['FTC: the Funeral Rule', 'https://consumer.ftc.gov/articles/ftc-funeral-rule'],
      ['Funeral Consumers Alliance', 'https://www.funerals.org/'],
    ],
    related: [
      ['/checklists/after-a-death/', 'First-24-hours checklist', 'Printable.'],
      ['/grief/', 'Grief', 'What to expect, and when to get more help.'],
    ],
  }),

  guide({
    path: '/grief/',
    title: 'Grief',
    eyebrow: 'Stage 5',
    crisis: true,
    description: 'Grief after a death: what is normal, helping children, losing a pet, and when to get more help.',
    lead: "Grief doesn't follow stages or a schedule. Here is what's normal, and when to reach for more help.",
    sections: [
      { id: 'normal', h: "What's normal", html: `<p>Sadness, numbness, anger, guilt, relief and trouble sleeping or concentrating are all common. Grief often comes in waves, set off by dates, places and songs. Relief after a long illness is normal too, and doesn't mean you loved them less.</p>` },
      { id: 'anticipatory', h: 'Grief before a death', html: `<p>Many people start grieving during a long illness. It's called anticipatory grief, and it's normal to feel it while also caring for someone.</p>` },
      { id: 'children', h: 'Helping children', html: `<ul><li>Use clear words: "died," not "went to sleep" or "we lost her," which can confuse or frighten.</li>
<li>Answer questions honestly and simply; it's fine to say you don't know.</li>
<li>Let children choose whether to take part in goodbyes and funerals.</li>
<li>Expect grief to come and go in play and questions over months and years.</li>
<li>Tell their school and their other caregivers.</li></ul>` },
      { id: 'pets', h: 'When a pet dies', html: `<p>Losing a pet is a real loss, and grief for an animal can be as strong as for a person. For children, it's often their first experience of death; the same honest language helps.</p>` },
      { id: 'support', h: 'Where to find support', html: `<p>Hospices offer bereavement support to families, usually for about a year after a death, often for free. Grief groups, counselors and faith communities help too.</p>` },
      { id: 'more-help', h: 'When to get more help', html: `<p>Talk to a doctor or counselor if grief stays so intense that you can't manage daily life for many months, or if you are drinking or using drugs to cope. If you are thinking about suicide, call or text <strong>988</strong> in the US, or <a href="https://findahelpline.com">find a helpline in your country</a>.</p>` },
    ],
    sources: [
      ['National Institute on Aging: end of life', 'https://www.nia.nih.gov/health/end-of-life'],
      ['The Dougy Center (grieving children)', 'https://www.dougy.org/'],
    ],
    related: [
      ['/after-a-death/', 'After a death', 'The practical steps.'],
      ['/navigation/', 'Talk to a navigator', 'Help with the paperwork, so you have room to grieve.'],
    ],
  }),
];

/* ---------- checklists ---------- */

export const checklists = [
  checklist({
    path: '/checklists/plan-ahead/',
    title: 'Plan-ahead worksheet',
    description: 'A printable worksheet for your end-of-life wishes, your people, and where your documents are kept.',
    lead: 'Fill this in, then give a copy to your health care proxy and keep one with your important papers.',
    groups: [
      { h: 'Medical wishes', items: ['I have an advance directive. It is kept: ______________', 'My health care proxy is: ______________ Phone: ______________', 'My backup proxy is: ______________', 'My doctor has a copy of my wishes.', 'What matters most to me at the end of life: ______________'] },
      { h: 'My people', items: ['People to call first: ______________', 'Who looks after my children / pets: ______________', 'My executor is: ______________'] },
      { h: 'Where things are', items: ['Will: ______________', 'Life insurance policies: ______________', 'Bank and retirement accounts: ______________', 'Deed, lease or mortgage: ______________', 'Passwords and phone passcode: ______________'] },
      { h: 'Afterward', items: ['Burial / cremation / green burial / body donation (circle one)', 'Service I would like: ______________', 'Music, readings or people I want included: ______________', 'Letters or messages to deliver: ______________'] },
    ],
  }),
  checklist({
    path: '/checklists/questions-for-the-doctor/',
    title: 'Questions for the doctor',
    description: 'A printable list of questions to ask after a serious diagnosis, about treatment, palliative care and hospice.',
    lead: 'Take this to appointments. Bring someone to take notes, and ask the doctor to slow down if you need to.',
    groups: [
      { h: 'Understanding the illness', items: ['What is happening, in plain words?', 'What is likely to happen next, and over what time?', 'What symptoms should I watch for, and who do I call?'] },
      { h: 'Treatment', items: ['What are my options, including no treatment?', 'What would each option mean for my daily life?', 'What would you do in my place?'] },
      { h: 'Comfort and support', items: ['Can I see a palliative care team now?', 'When should we talk about hospice?', 'Should I have a POLST form?', 'What help is there for my family or caregiver?'] },
      { h: 'If it matters to you', items: ['Would you take part in medical aid in dying, if it is legal here?', 'Can we write my wishes into my medical record?'] },
    ],
  }),
  checklist({
    path: '/checklists/after-a-death/',
    title: 'After a death: the first 24 hours',
    description: 'A printable checklist for the first day after someone dies: who to call, and what can wait.',
    lead: 'Very little is urgent. Do these in order, and leave the rest for later.',
    groups: [
      { h: 'Right away', items: ['Expected death with hospice: call the hospice. Unexpected death: call 911.', 'Take a moment. There is usually no rush to move the body.', 'Call one person to be with you.'] },
      { h: 'Within the day', items: ['Tell close family and friends, or ask someone to do it.', 'Choose a funeral home or cremation provider. Ask for the itemized price list.', 'Look for written wishes about the body and the funeral.', 'Arrange care for children and pets, and secure the home.'] },
      { h: 'This can wait a few days', items: ['Order certified copies of the death certificate.', 'Find the will and contact the executor.', 'Notify Social Security, employers, banks and insurers.', 'Plan the service. It can happen weeks later.'] },
    ],
    note: 'If you are struggling, you do not have to do this alone. Ask a friend, the hospice team or a navigator for help.',
  }),
];

export const checklistIndex = {
  path: '/checklists/',
  title: 'Printable checklists',
  description: 'Free printable end-of-life checklists: a plan-ahead worksheet, questions for the doctor, and the first 24 hours after a death.',
  body: `
<section class="section"><div class="wrap">
<h1>Printable checklists</h1>
<p class="lead" style="margin:20px 0 32px">Free, no account, no email. Print them and keep them where your family can find them.</p>
${relatedCards(checklists.map((c) => [c.path, c.title, c.description]))}
</div></section>`,
};

/* ---------- medical aid in dying section ---------- */

export function maidHub(data) {
  const us = data.places.filter((p) => p.region === 'us');
  const world = data.places.filter((p) => p.region === 'world');
  return {
    path: `${MAID}/`,
    title: 'Medical aid in dying',
    crisis: true,
    description: 'Where medical aid in dying is legal in the US and worldwide, who qualifies, how the process works, and going to Switzerland.',
    body: `
<section class="page-hero">
<div class="wrap prose">
<p class="eyebrow">One choice among many</p>
<h1>Medical aid in dying</h1>
<p class="lead" style="margin-top:20px">In some places, an adult with a terminal illness who can make their own decisions can ask a doctor for medication to end their life peacefully. Here is where it's legal, who qualifies and how it works.</p>
<p class="small muted" style="margin:0">Last verified ${fmtDate(site.lastVerified)} · We cover legal processes only.</p>
</div>
</section>
<section class="section"><div class="wrap">
<div class="grid grid-wide" style="margin-bottom:56px">
<a class="card" href="${MAID}/process/"><strong>How the process works</strong><span class="muted small">The steps, and why starting early matters.</span></a>
<a class="card" href="${MAID}/families/"><strong>For families</strong><span class="muted small">Talking about it, the day itself, insurance and grief.</span></a>
<a class="card" href="${MAID}/switzerland/"><strong>Going to Switzerland</strong><span class="muted small">For people whose country has no law, and the legal risks.</span></a>
</div>
<h2>United States</h2>
<p class="sub">Legal in ${us.length - 1} states and the District of Columbia. Only Oregon and Vermont accept people who live elsewhere.</p>
${placeTable(us, 'United States')}
<h2 style="margin-top:56px">Around the world</h2>
${placeTable(world, 'Around the world')}
<div id="elsewhere" class="card" style="margin-top:40px">
<h3>Don't see your country?</h3>
<p>We're researching: ${data.researching.map(esc).join(', ')}. <a href="/updates/">Get updates</a> when we add it.</p>
<p class="muted" style="margin:0">Whatever the law where you live, <a href="/serious-illness/">hospice and palliative care</a> are available, and they can make a great difference.</p>
</div>
</div></section>`,
  };
}

export function placePage(p) {
  const residentsOnly = p.region === 'us' && /residents only/.test(p.nonResidents);
  const sources = p.sources.length
    ? `<ul>${p.sources.map((s) => `<li><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join('')}</ul>`
    : '<p class="muted">Official sources are being added.</p>';
  return {
    path: `${MAID}/places/${p.slug}/`,
    title: `Medical aid in dying in ${p.name}`,
    crisis: true,
    description: `${p.name}: ${p.statusLabel}. ${p.summary}`,
    body: `
<section class="section">
<div class="wrap prose">
<p class="small"><a href="${MAID}/">Medical aid in dying: all places</a></p>
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
${residentsOnly ? `<p>If you don't live here, <a href="${MAID}/places/oregon/">Oregon</a> and <a href="${MAID}/places/vermont/">Vermont</a> accept people from other states.</p>` : ''}
${p.status === 'not-legal' ? `<p>Helping someone die can be a crime here, including traveling with them abroad. Read <a href="${MAID}/switzerland/">going to Switzerland</a> and talk to a lawyer first.</p>` : ''}
<div class="notice"><strong>Details we're still verifying:</strong> waiting periods, how many clinicians must agree, self-administration rules, typical costs and insurance coverage. Until they're checked, confirm them with the official sources below or your doctor.</div>
<h2>Sources</h2>
${sources}
<h2>Next steps</h2>
<ul>
<li><a href="${MAID}/process/">How the process works</a></li>
<li><a href="/serious-illness/">Hospice and palliative care</a></li>
<li><a href="${MAID}/families/">A guide for families</a></li>
<li><a href="/navigation/">Talk to a navigator</a></li>
<li><a href="/updates/">Get updates when ${esc(p.name)}'s law changes</a></li>
</ul>
</div>
</section>`,
  };
}

export const maidPages = [
  guide({
    path: `${MAID}/process/`,
    title: 'How the process works',
    eyebrow: 'Medical aid in dying',
    crisis: true,
    description: 'The usual steps for medical aid in dying in US states, and why starting early matters.',
    lead: "The process has several steps, and illness can move faster than paperwork. This is the usual shape in US states; details differ, so check your state's page.",
    sections: [
      { id: 'steps', h: 'The usual steps', html: `<ol>
<li><strong>First request.</strong> Tell your doctor you want to ask. Not every doctor, hospital or hospice takes part.</li>
<li><strong>Second opinion.</strong> A second clinician confirms the diagnosis, prognosis and your ability to decide.</li>
<li><strong>Waiting period.</strong> Most states require time between requests. Some shorten it for people near death.</li>
<li><strong>Written request.</strong> A signed form, usually with witnesses, then the prescription.</li>
<li><strong>Decide if and when.</strong> Having the prescription doesn't mean you must use it.</li></ol>` },
      { id: 'early', h: 'Why starting early matters', html: `<p>Everyone who asks must be able to make and communicate their own decision at every step. If illness takes that ability away, the process stops. Starting the conversation early keeps the option open, even if you never use it.</p>` },
      { id: 'decline', h: "If your doctor won't take part", html: `<p>Doctors and hospices can decline. Ask for a referral, or <a href="/navigation/">talk to a navigator</a> about clinicians who do take part where you live.</p>` },
      { id: 'hospice', h: 'Alongside hospice', html: `<p>Many people who ask for medical aid in dying are also in hospice. <a href="/serious-illness/">Hospice and palliative care</a> remain available whatever you decide.</p>` },
    ],
    related: [
      [`${MAID}/`, 'Where it is legal', 'Every place we cover.'],
      [`${MAID}/families/`, 'For families', 'What to expect.'],
    ],
  }),
  guide({
    path: `${MAID}/families/`,
    title: 'Medical aid in dying: for families',
    eyebrow: 'Medical aid in dying',
    crisis: true,
    description: 'For families of someone considering medical aid in dying: talking about it, the day itself, death certificates, insurance and grief.',
    lead: 'When someone you love is considering medical aid in dying, you may feel relief, fear, grief and disagreement all at once. All of those are normal.',
    sections: [
      { id: 'talking', h: 'Talking about it', html: `<ul><li>Ask what they want and why, and listen before you respond.</li>
<li>The decision is theirs. Every law requires the person to ask freely, without pressure from anyone.</li>
<li>Ask whether they want you involved, and how.</li>
<li>Hospice teams, social workers, chaplains and end-of-life doulas can help families with these conversations.</li></ul>` },
      { id: 'day', h: 'Planning the day', html: `<p>Many people choose where they'll be, who will be with them, and what they'll hear and see. Ask their care team what support is available on the day where you live.</p>` },
      { id: 'insurance', h: 'Death certificates and insurance', html: `<p>In most US states with these laws, the death certificate lists the underlying illness. US aid-in-dying laws generally say that using the law does not count as suicide. Check your state's law and the specific insurance policy before you rely on this.</p>` },
      { id: 'grief', h: 'Grief afterward', html: `<p>Grief after a planned death can include relief and guilt at the same time. Hospice bereavement programs are often free to families. See our <a href="/grief/">guide to grief</a>.</p>` },
    ],
    related: [
      ['/after-a-death/', 'After a death', 'The practical steps.'],
      ['/grief/', 'Grief', 'For adults and children.'],
    ],
  }),
  guide({
    path: `${MAID}/switzerland/`,
    title: 'Going to Switzerland',
    eyebrow: 'Medical aid in dying',
    crisis: true,
    description: 'How assisted dying in Switzerland works for people from other countries, approximate costs, and the legal risks for companions.',
    lead: "Switzerland is the main option for people whose own country has no law. It's a long, costly process, and it can carry legal risk for anyone who helps you.",
    sections: [
      { id: 'why', h: 'Why Switzerland', html: `<p>Under article 115 of the Swiss Criminal Code, helping someone die by suicide is a crime only when the motive is selfish. Private organizations run the process, and some accept people from other countries. See our <a href="${MAID}/places/switzerland/">Switzerland page</a> for sources.</p>` },
      { id: 'involves', h: 'What it usually involves', html: `<ul><li>Joining an organization and sending your medical records, which often need translating.</li>
<li>A review of your case, and an assessment by a Swiss doctor before anything is approved.</li>
<li>Travel to Switzerland while you are still well enough to travel.</li>
<li>Arrangements for afterward: cremation in Switzerland or bringing the body home.</li></ul>` },
      { id: 'costs', h: 'Approximate costs', html: `<p>News reports put Dignitas at about CHF 7,500, or CHF 10,500 to 11,000 with funeral and administrative services, plus membership fees. Pegasos is reported at about CHF 10,000 all-in. Travel, accommodation and medical reports are extra. Confirm current fees with each organization; some reduce fees for people with little money.</p>` },
      { id: 'risk', h: 'Legal risk for family and friends', html: `<p>Your companions are covered by the law of the country they live in, not only Swiss law. In some countries, including England and Wales, helping someone travel to die can be investigated as assisting a suicide. Talk to a lawyer in your country before you plan the trip.</p>` },
    ],
    sources: [
      ['Swissinfo: Pegasos', 'https://www.swissinfo.ch/eng/assisted-suicide/pegasos-association-rekindles-controversy-over-assisted-suicide-in-switzerland/90228578'],
    ],
    related: [
      ['/navigation/', 'Talk to a navigator', 'Help preparing an application.'],
      [`${MAID}/`, 'Where it is legal', 'Every place we cover.'],
    ],
  }),
];

/* ---------- service and policy pages ---------- */

export const staticPages = [
  {
    path: '/navigation/',
    title: 'Navigation sessions',
    description: 'Paid, one-to-one help with any end-of-life question: planning documents, hospice, funerals, paperwork after a death, or medical aid in dying.',
    body: `
<section class="section"><div class="wrap prose">
<p class="eyebrow">Paid service</p>
<h1>Talk to a navigator</h1>
<p class="lead" style="margin:20px 0">One-to-one help for you or your family, at any stage: making a plan, choosing hospice, arranging a funeral, sorting out paperwork after a death, or understanding medical aid in dying.</p>
<h2>What navigators do and don't do</h2>
<ul>
<li>They explain the options and the process, and help you prepare.</li>
<li>They never give medical or legal advice, and never decide whether you qualify for anything. Doctors and lawyers do.</li>
<li>They never help with anything outside the law.</li>
<li>If you're in crisis, they'll connect you with crisis support first.</li>
</ul>
<h2>Prices</h2>
<ul>
<li>One session: [PRICE]</li>
<li>Ongoing support: [PRICE]</li>
<li>Reduced fees available on request</li>
</ul>
<p>We are never paid by hospices, funeral homes, clinicians or assisted-dying organizations, so our guidance doesn't depend on where you go.</p>
<h2>Booking opens soon</h2>
${signupForm('navigation-interest', emailField('nav-email') + '<div class="field"><label for="nav-topic">What would you like help with?</label><input id="nav-topic" name="topic" type="text"></div>', 'Tell me when booking opens', "Please don't include medical details here. <a href=\"/privacy/\">Privacy</a>")}
</div></section>`,
  },
  {
    path: '/professionals/',
    title: 'For organizations',
    description: 'License End of Life Atlas guides and checklists for patients, employees or members, and train your staff.',
    body: `
<section class="section"><div class="wrap prose">
<h1>For organizations</h1>
<p class="lead" style="margin:20px 0">For hospices, health systems, employers, insurers, and the professionals who support families at the end of life.</p>
<h2>Licensed guides and checklists</h2>
<p>Give patients, employees or members our plain-language guides and printable checklists, under your name or ours.</p>
<h2>Benefits programs</h2>
<p>Support for employees who are caring for a dying parent or have lost someone, from planning through bereavement.</p>
<h2>Training</h2>
<p>Short courses for doulas, social workers, chaplains and nurses, including how medical aid in dying works in practice.</p>
<h2>Get in touch</h2>
${signupForm('professionals-interest', emailField('pro-email') + '<div class="field"><label for="pro-role">Your organization and role</label><input id="pro-role" name="role" type="text"></div>', 'Contact me', '')}
</div></section>`,
  },
  {
    path: '/updates/',
    title: 'Updates by email',
    description: 'Occasional email updates: new guides and law changes for your state or country.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Updates by email</h1>
<p class="lead" style="margin:20px 0">Occasional, plain updates: new guides, and changes to the rules where you live.</p>
${updatesForm('updates')}
</div></section>`,
  },
  {
    path: '/about/',
    title: 'About End of Life Atlas',
    description: 'How End of Life Atlas is funded, how we check facts, and who reviews our guides.',
    body: `
<section class="section"><div class="wrap prose">
<h1>About End of Life Atlas</h1>
<p class="lead" style="margin:20px 0">A plain, trustworthy guide to every part of the end of life, from planning ahead to grief, with the rules for where you live.</p>
<h2 id="funding">How we're funded</h2>
<p><strong>End of Life Atlas currently has no funding.</strong> It is built and maintained independently, and it earns no money. The guides and checklists are free.</p>
<p>We take no advertising, no referral fees and no payments from hospices, funeral homes, clinicians, pharmacies or assisted-dying organizations.</p>
<p>The navigation and organization services described on this site are not open yet. If we start charging for them, or take any other funding, we will say so on this page.</p>
<h2 id="editorial">Editorial and review policy</h2>
<ul>
<li>Facts come from official sources or named reports, linked on the page.</li>
<li>Anything we haven't confirmed is marked "to be verified."</li>
<li>Every guide shows the date it was last reviewed. We re-check law pages every quarter and whenever a law changes.</li>
<li>We cover legal options only.</li>
</ul>
<p>Spotted an error? Email corrections@eolatlas.com.</p>
<h2 id="reviewers">Our reviewers</h2>
<p>We're appointing a physician experienced in end-of-life care and an attorney to review our guides. Their names will appear here and on each page they review.</p>
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
<li>Checklists and the place picker run in your browser and save nothing.</li>
<li>If you sign up for updates or services, we store your email and what you told us, and use them only for what you asked for.</li>
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
<p class="lead" style="margin:20px 0">That page doesn't exist. Try the <a href="/">home page</a> or the <a href="/checklists/">checklists</a>.</p>
</div></section>`,
};
