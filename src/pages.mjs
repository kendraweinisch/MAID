import { esc, fmtDate, site } from './layout.mjs';
import { icons } from './icons.mjs';
import { printCard, dlPanel } from './printables.mjs';
import { iconFor, linkCards, dirCard, infoCard } from './ui.mjs';
import { journeyMeta } from './journeys.mjs';

const MAID = '/medical-aid-in-dying';

// Privacy-friendly analytics: on only when GOATCOUNTER_CODE is set at build time.
const analyticsOn = Boolean(process.env.GOATCOUNTER_CODE);
// The suggestions form works through Netlify Forms on the live site.
const onNetlify = process.env.NETLIFY === 'true';

/* ---------- shared pieces ---------- */

// Cards for every choice for the body (icon, name, one line), linking to sections.
const BODY = '/plan-ahead/choices-for-the-body/';
const bodyOptions = [
  ['traditional', 'burial', 'Traditional burial', 'A casket in a cemetery plot, usually after a viewing.'],
  ['entombment', 'mausoleum', 'Mausoleum or columbarium', 'Above ground, for a body or for ashes.'],
  ['green', 'green', 'Green burial', 'No embalming or vault: back to the earth.'],
  ['tree', 'tree', 'Under a tree', 'Woodland burial, tree urns and memorial forests.'],
  ['cremation', 'cremation', 'Cremation', 'The most common choice in the US.'],
  ['water', 'water', 'Water cremation', 'Alkaline hydrolysis; legal in about 28 US states.'],
  ['composting', 'compost', 'Human composting', 'Becomes soil in weeks; legal in 14 US states.'],
  ['sea', 'sea', 'Burial at sea', 'A body or ashes, under simple rules.'],
  ['ashes', 'ashes', 'What to do with ashes', 'Keep, bury, scatter, plant or divide.'],
  ['donation', 'donation', 'Body and organ donation', 'Help others, or medical science.'],
  ['home', 'home', 'A home funeral', 'Caring for them at home first.'],
];
const optionCards = (list, link = true) =>
  `<div class="cards cards-tight">${list
    .map(([id, icon, name, line]) => `<a class="ocard" href="${link ? BODY : ''}#${id}">${icons[icon]}<strong>${name}</strong><span class="muted small">${line}</span></a>`)
    .join('')}</div>`;

const journeyCards = () =>
  `<div class="cards cards-two">${journeyMeta
    .map(
      (j) => `<a class="jcard" href="${j.path}">
<span class="jcard-icon">${j.icon}</span>
<strong class="jcard-title">${j.title}</strong>
<span class="jcard-text">${j.description}</span>
<span class="jcard-stops">${j.phases.map((p) => p.h).join(' · ')}</span>
<span class="jcard-go">Start here <span aria-hidden="true">→</span></span>
</a>`
    )
    .join('')}</div>`;

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

const placeTable = (list, caption) => `<div class="table-box" tabindex="0" role="region" aria-label="${esc(caption)}"><table>
<caption class="sr-only">${esc(caption)}</caption>
<thead><tr><th scope="col">Place</th><th scope="col">Status</th><th scope="col">Since</th><th scope="col">Open to non-residents?</th><th scope="col">Last verified</th></tr></thead>
<tbody>
${placeRows(list)}
</tbody></table></div>`;

const sourceList = (sources) =>
  sources.length
    ? `<h2 id="sources">Sources</h2><ul>${sources.map(([label, url]) => `<li><a href="${esc(url)}">${esc(label)}</a></li>`).join('')}</ul>`
    : '';

const relatedCards = (items) => linkCards(items);

// Printables that go with each guide, shown as cards at the end of it.
const GUIDE_PRINTABLES = {
  '/plan-ahead/': [['plan-ahead', 'Plan-ahead worksheet'], ['funeral-planner', 'Funeral or celebration of life planner'], ['letters-to-leave', 'Letters to leave'], ['life-story', 'My life story']],
  '/plan-ahead/talking-with-a-parent/': [['talking-with-a-parent', 'Talking with a parent about the end of life']],
  '/plan-ahead/wills-and-trusts/': [['plan-ahead', 'Plan-ahead worksheet']],
  '/plan-ahead/choices-for-the-body/': [['funeral-planner', 'Funeral or celebration of life planner']],
  '/serious-illness/': [['questions-for-the-doctor', 'Questions for the doctor']],
  '/last-weeks/': [['after-a-death', 'After a death: the first 24 hours']],
  '/after-a-death/': [['after-a-death', 'After a death: the first 24 hours'], ['funeral-planner', 'Funeral or celebration of life planner'], ['eulogy', 'Writing a eulogy']],
  '/grief/': [['remembering-someone', 'Someone I love: a remembering book'], ['remembering-grandparent', 'My grandparent: a remembering book'], ['remembering-pet', 'My pet: a remembering book']],
};

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
<div class="hero-icon">${iconFor(path)}</div>
<p class="eyebrow">${eyebrow}</p>
<h1>${title}</h1>
<p class="lead" style="margin-top:20px">${lead}</p>
<p class="small muted" style="margin:0">Written or last revised ${fmtDate(reviewed)} · Checked for accuracy ${fmtDate(site.lastScan)} · <a href="/about/#editorial">How we check facts</a></p>
</div>
</section>
<section class="section">
<div class="wrap prose">
<nav class="toc card" aria-label="On this page"><strong>On this page</strong><ul>${toc}</ul></nav>
${sections.map((s) => `<h2 id="${s.id}">${s.h}</h2>\n${s.html}`).join('\n')}
${GUIDE_PRINTABLES[path] ? `<h2 id="printables">Printables for this</h2>\n<div class="cards" style="margin-top:20px">${GUIDE_PRINTABLES[path].map(([slug, t]) => printCard(slug, t)).join('')}</div>` : ''}
${related.length ? `<h2 id="related">Related</h2>${relatedCards(related)}` : ''}
${sourceList(sources)}
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
<p class="small no-print"><a href="/checklists/">All printables</a></p>
<p class="eyebrow">Printable checklist</p>
<h1>${title}</h1>
<p class="lead" style="margin:20px 0">${lead}</p>
${dlPanel(path.split('/')[2])}
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
<div class="plate">
<img class="plate-map" src="/images/atlas-map.svg" alt="" width="1200" height="620" fetchpriority="high">
<div class="plate-title">
<p class="eyebrow">An atlas for the end of life</p>
<h1>Every part of the end of life, explained.</h1>
<p class="lead">Planning ahead, serious illness, the last weeks, what to do after a death, and grief. What to know, what to ask, and what the rules are where you live.</p>
<div class="actions"><a class="btn" href="/for-myself/">I'm planning for myself</a><a class="btn btn-quiet" href="/for-someone-i-love/">I'm planning for someone I love</a></div>
<p class="small" style="margin:14px 0 0">Has someone just died? <a href="/checklists/after-a-death/">The first 24 hours</a>.</p>
<p class="small" style="margin:6px 0 0">Or <a href="/ask/">ask a question</a> in your own words.</p>
<p class="edition">Last checked ${fmtDate(site.lastScan)} · Free · No ads</p>
</div>
</div>
<div class="hero-after"></div>
</div>
</section>

<section class="section" aria-labelledby="who-h">
<div class="wrap">
<p class="eyebrow">Start here</p>
<h2 id="who-h">Who are you planning for?</h2>
<p class="sub" style="margin-bottom:28px">Choose a path. Each one takes you step by step, in a sensible order, to the guides and printables you need.</p>
${journeyCards()}
</div>
</section>

<section class="band section-tight" aria-labelledby="trust-h">
<div class="wrap">
<h2 id="trust-h" class="eyebrow">About this atlas</h2>
<div class="trust-row">
<div><strong>One place for all of it</strong><span class="muted">Planning, illness, dying, grief and the paperwork in between, including the hard topics.</span></div>
<div><strong>Without judgment</strong><span class="muted">Every legal option, from full treatment to medical aid in dying, explained plainly. The choice is always yours.</span></div>
<div><strong>Wherever you live</strong><span class="muted">The rules differ by country. We say where each one applies, and we keep adding places.</span></div>
<div><strong>Checked, dated, nothing to sell</strong><span class="muted">Every guide shows its sources and review date. A voluntary site with no business model, so no bias. <a href="/about/#funding">How we're funded</a></span></div>
</div>
</div>
</div>
</section>

<section id="where" class="section" aria-labelledby="where-h">
<div class="wrap">
<p class="eyebrow">Contents</p>
<h2 id="where-h">Where are you right now?</h2>
<p class="sub" style="margin-bottom:32px">Start with what you’re facing. Each guide is short, plain and leads to the next step.</p>
<div class="cards cards-stages">
<a class="ocard stage-card" href="/plan-ahead/"><span class="stage-num">01</span>${iconFor('/plan-ahead/')}<strong>I want to plan ahead</strong><span class="muted small">Advance directives, a health care proxy, your wishes and your paperwork.</span></a>
<a class="ocard stage-card" href="/serious-illness/"><span class="stage-num">02</span>${iconFor('/serious-illness/')}<strong>Someone I love is seriously ill</strong><span class="muted small">Palliative care, hospice, care at home, and the questions to ask.</span></a>
<a class="ocard stage-card" href="/last-weeks/"><span class="stage-num">03</span>${iconFor('/last-weeks/')}<strong>Death may be weeks away</strong><span class="muted small">What to expect, comfort, being present, and saying goodbye.</span></a>
<a class="ocard stage-card" href="/after-a-death/"><span class="stage-num">04</span>${iconFor('/after-a-death/')}<strong>Someone has just died</strong><span class="muted small">The first 24 hours, the first week, funerals and paperwork.</span></a>
<a class="ocard stage-card" href="/grief/"><span class="stage-num">05</span>${iconFor('/grief/')}<strong>I’m grieving</strong><span class="muted small">For adults, children and pets, and when to get more help.</span></a>
<a class="ocard stage-card" href="${MAID}/"><span class="stage-num">06</span>${iconFor('/medical-aid-in-dying/')}<strong>I’m considering medical aid in dying</strong><span class="muted small">Where it’s legal, who qualifies and how the process works.</span></a>
</div>
</div>
</section>

<section class="band" aria-labelledby="tools-h">
<div class="wrap section">
<h2 id="tools-h">Free printables</h2>
<p class="sub" style="margin-bottom:28px">Worksheets, checklists and remembering books for children. No account, no email. Print them, fill them in, and keep them where your family can find them.</p>
<div class="cards">
${printCard('plan-ahead', 'Plan-ahead worksheet')}
${printCard('funeral-planner', 'Funeral or celebration of life planner')}
${printCard('remembering-someone', 'Someone I love: a remembering book')}
</div>
<p style="margin-top:24px"><a class="btn btn-quiet" href="/checklists/">See all 11 printables</a></p>
</div>
</section>

<section class="section" aria-labelledby="body-h">
<div class="wrap">
<p class="eyebrow">More than burial or cremation</p>
<h2 id="body-h">Every choice for the body</h2>
<p class="sub" style="margin-bottom:28px">Green burial, being planted under a tree, burial at sea, water cremation, human composting and more: how each works, where it's legal, and which is gentlest on the earth.</p>
${optionCards(bodyOptions.slice(0, 8))}
<p style="margin-top:24px"><a class="btn btn-quiet" href="/plan-ahead/choices-for-the-body/">See every choice</a></p>
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
<p>The names, forms and rules differ by country. In the US, each state has its own form and rules about witnesses or notaries. In England and Wales, the equivalents are an advance decision and a lasting power of attorney for health and welfare. Forms are usually free, and you often don't need a lawyer. Give copies to your proxy and your doctor, and keep the original where it can be found.</p>` },
      { id: 'proxy', h: 'Choose your health care proxy', html: `<p>Pick someone who will follow your wishes even if they disagree, can stay calm under pressure, and can be reached quickly. Name a backup. Then tell them, in detail, what matters to you.</p>` },
      { id: 'steward', h: 'Name one person who knows where everything is', html: `<p>Besides your health care proxy and executor, it helps to choose one trusted person (some call them a steward) who knows where your documents, passwords and wishes are kept, and whom to call. It can be the same person. Tell them, and write their name on your <a href="/checklists/plan-ahead/">plan-ahead worksheet</a>.</p>` },
      { id: 'talk', h: 'Have the conversation', html: `<p>The document matters less than the conversation behind it. Useful questions to talk through:</p>
<ul><li>What would make life not worth living for you? What would you be willing to go through for more time?</li>
<li>Where would you want to be at the end: at home, in a hospice, in a hospital?</li>
<li>Who do you want with you, and who do you want to make decisions?</li>
<li>What do you want for your body and your funeral?</li></ul>` },
      { id: 'paperwork', h: 'Get your paperwork in order', html: `<p>Families lose weeks looking for things. Write down where to find your will, insurance policies, bank and retirement accounts, the deed or lease, passwords, and who should look after children and pets. Add a beneficiary to accounts where you can: those usually pass outside probate.</p>
<p>For what each document does and how the rules differ by state, see <a href="/plan-ahead/wills-and-trusts/">wills, trusts and the paperwork</a>.</p>
<p>Own a home in another country? You may need a will there too. See <a href="/plan-ahead/property-abroad/">wills when you own property abroad</a>.</p>
<p><a href="/checklists/plan-ahead/">Use the printable plan-ahead worksheet</a>.</p>` },
      { id: 'wishes', h: 'Say what you want afterward', html: `<p>Burial, cremation, green burial or body donation. A religious service, a celebration of life, a party, or nothing at all. Music, readings, who should speak. See <a href="/plan-ahead/choices-for-the-body/">every choice for the body</a>, from burial at sea to being planted under a tree. Writing it down is a gift to whoever has to arrange it: use the <a href="/checklists/funeral-planner/">funeral or celebration of life planner</a>. You can also write <a href="/checklists/letters-to-leave/">letters to leave</a> and your <a href="/checklists/life-story/">life story</a>, so your family can tell it your way. Body donation usually has to be arranged in advance with a medical school or program.</p>` },
      { id: 'review', h: 'Review it every few years', html: `<p>Look again after a new diagnosis, a divorce or a death in the family, or every few years anyway. Update the documents and tell your proxy what changed.</p>` },
    ],
    sources: [
      ['National Institute on Aging: advance care planning', 'https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care'],
    ],
    related: [
      ['/checklists/plan-ahead/', 'Plan-ahead worksheet', 'Printable, no account needed.'],
      ['/plan-ahead/choices-for-the-body/', 'Every choice for the body', 'Burial, cremation, sea, trees, composting and more.'],
      ['/plan-ahead/wills-and-trusts/', 'Wills, trusts and the paperwork', 'What each document does, state by state.'],
      ['/plan-ahead/property-abroad/', 'Property abroad', 'Wills for homes in Mexico, Costa Rica, Canada, the UK and Europe.'],
      ['/plan-ahead/talking-with-a-parent/', 'Talking with a parent', 'Near or far.'],
      ['/serious-illness/', 'Serious illness', 'If a diagnosis has already come.'],
    ],
  }),

  guide({
    path: '/plan-ahead/choices-for-the-body/',
    title: 'Every choice for the body',
    eyebrow: 'Plan ahead',
    reviewed: '2026-11-18',
    description: 'Every option for the body after death: traditional burial, mausoleums, green burial, burial under a tree, cremation, water cremation, human composting, burial at sea, scattering ashes, memorial reefs, body donation and more, with where each is legal.',
    lead: "There are far more choices than burial or cremation. Here is each one, how it works, and where it's allowed, so you can choose what fits.",
    sections: [
      { id: 'overview', h: 'At a glance', html: `${optionCards(bodyOptions, false)}
<p>Almost any of these can come with a funeral, a celebration of life, a home funeral, or no ceremony at all. Write your choice down in the <a href="/checklists/funeral-planner/">funeral planner</a>.</p>` },
      { id: 'traditional', h: 'Traditional burial', html: `<p>The body is placed in a casket and buried in a cemetery plot, usually after a viewing. Embalming is rarely required by law, though some funeral homes require it for a public viewing. Many cemeteries require a vault or liner around the casket; that is the cemetery's rule, not the law. It is usually the most expensive option once the plot, opening the grave and a headstone are added. See <a href="/what-it-costs/#funeral">what it costs</a>.</p>` },
      { id: 'entombment', h: 'Mausoleums and columbariums', html: `<p>Entombment places the casket in a crypt above ground in a mausoleum. A columbarium is a wall or building with small niches for urns of ashes. Both are available at many cemeteries, and a columbarium niche usually costs much less than a crypt.</p>` },
      { id: 'green', h: 'Green (natural) burial', html: `<p>The body is buried without embalming, in a shroud or a simple biodegradable coffin, with no concrete vault, so it returns to the earth. Some green burial grounds are also nature reserves, with the land protected for good. Some ordinary cemeteries now have green sections.</p>
<p>In the US, the <a href="https://www.greenburialcouncil.org/">Green Burial Council</a> lists certified providers. In the UK, natural and woodland burial grounds are widespread.</p>` },
      { id: 'tree', h: 'Being planted under a tree', html: `<ul>
<li><strong>Woodland or green burial,</strong> where a tree is planted on or near the grave, or the grave is among existing trees.</li>
<li><strong>A tree urn for ashes:</strong> a biodegradable urn with a seedling or seed. Ashes are very alkaline and salty, which can harm plants, so good tree urns include a soil mix to balance them. Plant it only where the landowner or local rules allow.</li>
<li><strong>Memorial forests:</strong> privately run forests where ashes are placed at the roots of a chosen tree, often with a small marker.</li></ul>` },
      { id: 'cremation', h: 'Cremation', html: `<p>The body is reduced to ashes by heat. <strong>Direct cremation</strong>, with no viewing or service beforehand, is usually the least expensive choice, and a gathering can be held later. Cremation can also follow a full funeral. Cremation is now the most common choice in the US. See <a href="#ashes">what to do with ashes</a>.</p>` },
      { id: 'water', h: 'Water cremation (alkaline hydrolysis)', html: `<p>Also called aquamation. The body is placed in warm water with an alkaline solution, which breaks it down over several hours, leaving bones that are processed into ashes, like flame cremation. It uses far less energy than flame cremation. In the US, it was legal in about 28 states as of January 2026. In the UK, it isn't widely available yet, and the Law Commission has been reviewing new methods like this.</p>` },
      { id: 'composting', h: 'Human composting (natural organic reduction)', html: `<p>Also called terramation. The body is placed in a vessel with wood chips, straw and other plant material, and over about one to two months it becomes soil. Families can take some of the soil home, often to grow a garden or a tree, or donate it to conservation land. As of January 2026, it was legal in 14 US states: Arizona, California, Colorado, Delaware, Georgia, Maine, Maryland, Minnesota, Nevada, New Jersey, New York, Oregon, Vermont and Washington. Providers can serve people from other states, though transport adds cost.</p>` },
      { id: 'sea', h: 'Burial at sea', html: `<ul>
<li><strong>US:</strong> a body may be buried at least 3 nautical miles from land, in water at least 600 feet deep. Ashes may be scattered or placed at least 3 nautical miles from land, in water of any depth. The EPA must be told within 30 days, using its online reporting tool. Eligible veterans may also be able to arrange burial at sea through the US Navy.</li>
<li><strong>UK:</strong> burying a body at sea in English waters needs a marine licence from the Marine Management Organisation, usually at a few designated sites such as off the Needles (Isle of Wight). Scattering ashes at sea doesn't need a licence.</li>
<li><strong>Memorial reefs:</strong> ashes are mixed into a concrete reef structure placed on the sea floor, where it becomes a habitat for marine life. A few specialist companies offer this.</li></ul>` },
      { id: 'ashes', h: 'What to do with ashes', html: `<ul>
<li><strong>Keep them</strong> at home in an urn, or in a columbarium niche.</li>
<li><strong>Bury them</strong> in a cemetery plot, a family grave or a green burial ground, often for less than a full burial.</li>
<li><strong>Scatter them:</strong> on private land with the owner's permission. Parks, public land, rivers and lakes have their own rules, and some need a permit, so ask the landowner or local authority first.</li>
<li><strong>Plant them</strong> with a tree (see above).</li>
<li><strong>Divide them</strong> among family members, so each can keep or scatter a part.</li>
<li><strong>Keepsakes:</strong> small amounts can be made into jewelry, glass, or even lab-grown diamonds, or sent on a memorial spaceflight.</li></ul>` },
      { id: 'donation', h: 'Body and organ donation', html: `<p><strong>Organ and tissue donation</strong> can help others and is compatible with almost every option above, including an open-casket funeral. Register with your country or state donor registry and tell your family.</p>
<p><strong>Whole-body donation</strong> to a medical school or research program is a different thing. It usually has to be arranged in advance, and many programs cover cremation afterward and return the ashes. Programs can decline a donation, for example because of certain illnesses or if an autopsy was done, so have a backup plan.</p>` },
      { id: 'home', h: 'A home funeral', html: `<p>Whatever the final choice, a family can care for the body at home for a day or more before burial or cremation: washing, dressing and sitting with them. Most US states allow families to do this; some require a funeral director for certain steps. End-of-life doulas can help.</p>` },
      { id: 'other', h: 'Other choices people ask about', html: `<p><strong>Cryonics</strong> preserves a body or brain at very low temperatures in the hope that future science could revive it. It is very expensive, offered by only a few organizations, and there is no evidence yet that revival is possible.</p>` },
      { id: 'greenest', h: 'Which choice is the most environmentally friendly?', html: `<p><strong>Natural (green) burial is generally the lowest-impact choice,</strong> especially in a conservation burial ground where the land is protected for good.</p>
<p>A life-cycle study for DELA, a Dutch funeral provider, compared the climate impact of each method per person:</p>
<div class="table-box" tabindex="0" role="region" aria-label="Climate impact by method"><table style="min-width:420px">
<caption class="sr-only">Climate impact of each method, per person</caption>
<thead><tr><th scope="col">Method</th><th scope="col">Climate impact (kg CO₂ equivalent)</th></tr></thead>
<tbody>
<tr><td>Natural burial</td><td>40</td></tr>
<tr><td>Electric cremation</td><td>45</td></tr>
<tr><td>Human composting</td><td>47</td></tr>
<tr><td>Water cremation (resomation)</td><td>118</td></tr>
<tr><td>Traditional burial with a stone monument</td><td>120</td></tr>
<tr><td>Gas cremation</td><td>181</td></tr>
</tbody></table></div>
<p class="small muted">Source: <a href="https://www.hhc.earth/knowledge-base/articles/client-case-dela-a-comparative-lca-study-on-various-methods-of-the-disposal-of-human-bodies">Hedgehog, comparative life-cycle study for DELA</a> (Netherlands). The <a href="https://www.greenburialcouncil.org/wp-content/uploads/2025/10/The-Potential-Environmental-Benefits-and-Costs-of-Disposition-Revised-9.30.24-1.pdf">Green Burial Council</a> also finds flame cremation has the highest carbon footprint, and notes it releases mercury.</p>
<p>The ranking depends on local conditions. An electric cremator run on clean power does far better than a gas one. Figures for newer methods like water cremation and human composting vary between studies, and many published claims come from the companies that offer them. A traditional burial's footprint also grows with embalming, a concrete vault and the land it uses.</p>
<p><strong>Ways to lower the impact, whatever you choose:</strong></p>
<ul>
<li>Skip embalming.</li>
<li>Choose a simple shroud or a biodegradable coffin or urn.</li>
<li>Skip a concrete vault where the cemetery allows it.</li>
<li>Choose a provider nearby, to cut transport.</li>
<li>Choose flowers that are local and in season, or donations instead.</li></ul>` },
      { id: 'choose', h: 'How to choose', html: `<ul>
<li>What feels right to you: returning to the earth, staying in one place family can visit, or being scattered somewhere you loved?</li>
<li>Your faith or culture: many traditions have clear practices, so ask your faith leader.</li>
<li>Cost, and what is available and legal where you live.</li>
<li>What your family needs: a grave to visit, or the freedom to remember you anywhere.</li></ul>
<p>Write it down, tell someone, and keep it with your <a href="/checklists/plan-ahead/">plan-ahead worksheet</a>.</p>` },
    ],
    sources: [
      ['US EPA: burial at sea', 'https://www.epa.gov/ocean-dumping/burial-sea'],
      ['GOV.UK: burial at sea', 'https://www.gov.uk/burial-at-sea'],
      ['Montana Legislature: background paper on natural organic reduction and alkaline hydrolysis (January 2026, PDF)', 'https://archive.legmt.gov/content/Committees/Interim/2025-2026/EAIC/January_20_2026/HJ27_BackgroundPaper.pdf'],
      ['Green Burial Council', 'https://www.greenburialcouncil.org/'],
      ['Funeral Consumers Alliance', 'https://www.funerals.org/'],
      ['Hedgehog: comparative life-cycle study for DELA', 'https://www.hhc.earth/knowledge-base/articles/client-case-dela-a-comparative-lca-study-on-various-methods-of-the-disposal-of-human-bodies'],
      ['Green Burial Council: environmental benefits and costs of disposition (PDF)', 'https://www.greenburialcouncil.org/wp-content/uploads/2025/10/The-Potential-Environmental-Benefits-and-Costs-of-Disposition-Revised-9.30.24-1.pdf'],
    ],
    related: [
      ['/checklists/funeral-planner/', 'Funeral or celebration of life planner', 'Write your choices down.'],
      ['/what-it-costs/#funeral', 'What it costs', 'Funeral, burial and cremation prices.'],
    ],
  }),
  guide({
    path: '/plan-ahead/wills-and-trusts/',
    title: 'Wills, trusts and the paperwork',
    eyebrow: 'Plan ahead',
    reviewed: '2026-11-18',
    description: 'The documents everyone needs, what a will does and does not cover, living trusts, avoiding probate, powers of attorney, and how the rules differ by US state, in Canada, the UK and Australia.',
    lead: "A few documents spare your family months of work and expense. Here is what each one does, and how the rules change across US states, Canada, the UK and Australia.",
    sections: [
      { id: 'set', h: 'The basic set of documents', html: `<ul>
<li><strong>A will:</strong> who gets what, who handles it (your executor), and who would raise your children.</li>
<li><strong>A durable financial power of attorney:</strong> who manages your money if you can't.</li>
<li><strong>An advance directive and health care power of attorney:</strong> your medical wishes and who speaks for you. See <a href="/plan-ahead/">plan ahead</a>.</li>
<li><strong>Up-to-date beneficiary designations</strong> on retirement accounts, life insurance and bank accounts.</li>
<li><strong>A list of where everything is:</strong> use the <a href="/checklists/plan-ahead/">plan-ahead worksheet</a>.</li>
<li><strong>Sometimes, a trust</strong> (see below).</li></ul>` },
      { id: 'will', h: 'What a will does, and what it doesn’t', html: `<p>A will covers what you own in your name alone. It does <strong>not</strong> control:</p>
<ul>
<li>Accounts and policies with a named beneficiary, such as retirement accounts and life insurance. The beneficiary form wins, even if your will says something different.</li>
<li>Property you own jointly with a right of survivorship, which passes to the other owner.</li>
<li>Anything held in a trust.</li></ul>
<p>So check your beneficiary forms whenever you update your will. Out-of-date forms, naming an ex-spouse for example, are one of the most common and painful mistakes.</p>` },
      { id: 'valid', h: 'Making a will valid: what differs by state', html: `<ul>
<li><strong>Everywhere in the US:</strong> you must be an adult of sound mind, and the will must be in writing and signed.</li>
<li><strong>Witnesses:</strong> most states require two adult witnesses, ideally people who inherit nothing under the will.</li>
<li><strong>Handwritten wills:</strong> about half of states accept a will written entirely in your own handwriting and signed, even without witnesses. The rest do not.</li>
<li><strong>Notarized "self-proving" statement:</strong> most states let you add one, so witnesses don't have to be found later. It's worth doing.</li>
<li><strong>Electronic wills</strong> are allowed in only a small number of states so far.</li>
<li><strong>Louisiana is different.</strong> It follows a civil-law system with its own will formats and limited forced-heirship rules for young or disabled children.</li>
<li><strong>If you move,</strong> a will made validly in one state is generally accepted in another, but have it reviewed, because property and spousal rules change.</li></ul>
<p>Outside the US, the rules are different again: see <a href="#canada">Canada</a>, <a href="#uk">the UK</a> and <a href="#australia">Australia</a> below, and <a href="/plan-ahead/property-abroad/">wills when you own property abroad</a>.</p>` },
      { id: 'spouses', h: 'Married couples: community property and spousal rights', html: `<ul>
<li><strong>Nine community property states</strong> (Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington and Wisconsin) generally treat property earned during marriage as owned half by each spouse. You can only leave your own half by will.</li>
<li><strong>In most other states,</strong> a surviving spouse can claim a share of the estate (an "elective share") even if the will leaves them less.</li></ul>` },
      { id: 'trusts', h: 'Trusts', html: `<p>A <strong>revocable living trust</strong> holds your property while you're alive, with you in control, and passes it to your beneficiaries without probate.</p>
<ul>
<li><strong>Pros:</strong> avoids probate for what's in the trust, keeps details private, and can be easier to manage if you become unable to.</li>
<li><strong>Cons:</strong> costs more to set up, and it only works for property you actually move into it (called "funding" the trust). It doesn't by itself reduce taxes or protect against creditors.</li>
<li><strong>Useful when:</strong> you own property in more than one state, want privacy, have a blended family, or live in a state where probate is slow or costly.</li></ul>
<p>Other trusts, such as special needs trusts for a disabled beneficiary, trusts for minor children, irrevocable trusts for tax or Medicaid planning, and pet trusts, need a lawyer.</p>` },
      { id: 'probate', h: 'Passing things on without probate', html: `<ul>
<li><strong>Payable-on-death and transfer-on-death designations</strong> on bank and investment accounts.</li>
<li><strong>Transfer-on-death deeds</strong> for a home, allowed in many but not all states.</li>
<li><strong>Joint ownership with right of survivorship.</strong> Be careful: adding a child to your account or deed can expose it to their debts or divorce, and can have tax effects.</li>
<li><strong>Small-estate procedures:</strong> every state has a simpler process for smaller estates, but the limits vary widely.</li></ul>` },
      { id: 'poa', h: 'Powers of attorney', html: `<p>A <strong>durable financial power of attorney</strong> lets someone manage your money and property if you can't. Without one, your family may have to go to court for guardianship or conservatorship, which is slow, costly and public. Forms and signing rules vary by state, and some banks have their own forms, so ask yours.</p>` },
      { id: 'taxes', h: 'Estate and inheritance taxes', html: `<ul>
<li><strong>Federal estate tax</strong> only applies to estates over $15 million in 2026, so most families owe none.</li>
<li><strong>State estate tax:</strong> 12 states and the District of Columbia have one, some starting at much lower amounts; Oregon's starts at $1 million.</li>
<li><strong>State inheritance tax</strong> (paid by the person who inherits): Kentucky, Maryland, Nebraska, New Jersey and Pennsylvania. Spouses are usually exempt, and often children too. Maryland has both taxes.</li></ul>` },
      { id: 'digital', h: 'Your digital life', html: `<p>Many accounts let you name someone now: <a href="https://support.apple.com/en-us/102631">Apple Legacy Contact</a>, <a href="https://support.google.com/accounts/answer/3036546">Google Inactive Account Manager</a> and <a href="https://www.facebook.com/help/1568013990080948">Facebook legacy contact</a>. A password manager with emergency access helps too. Never write passwords in your will, which can become a public record.</p>` },
      { id: 'canada', h: 'In Canada', html: `<p>Wills and estates are governed by each province and territory, so the rules depend on where you live.</p>
<ul>
<li><strong>Making a valid will:</strong> a typed will must be signed in front of two witnesses who are present together. Most provinces also accept a will written entirely in your own handwriting and signed, without witnesses; British Columbia and Prince Edward Island generally do not, though a BC court can sometimes accept one.</li>
<li><strong>Quebec is different.</strong> It follows a civil-law system. A will made before a notary (a notarial will) doesn't need probate; handwritten and witnessed wills do need to be verified by a court or notary.</li>
<li><strong>Marriage:</strong> in some provinces getting married cancels an earlier will. In others, including Ontario (since 2022) and British Columbia, it doesn't. Check yours, and review your will when you marry or separate.</li>
<li><strong>Probate fees vary a lot.</strong> Ontario charges $15 for every $1,000 of an estate's value above $50,000 (1.5%). Some provinces charge much less, and a Quebec notarial will avoids probate.</li>
<li><strong>Beneficiary designations:</strong> in most provinces you can name a beneficiary on an RRSP, RRIF or TFSA so it passes outside the will; Quebec allows this mainly through insurance products.</li>
<li><strong>Powers of attorney</strong> are provincial too. In Ontario, for example, there are separate documents for property (a continuing power of attorney) and for personal care. Other provinces use different names and forms.</li>
<li><strong>Taxes:</strong> there's no inheritance or estate tax. Instead, death counts as selling your property at market value, so capital gains tax can be due on the final tax return. A principal residence is usually exempt, and RRSPs and RRIFs are fully taxable unless they pass to a spouse or certain dependants.</li></ul>` },
      { id: 'uk', h: 'In the United Kingdom', html: `<p>England and Wales, Scotland and Northern Ireland each have their own rules. This covers England and Wales, with notes on Scotland.</p>
<ul>
<li><strong>Making a valid will (England and Wales):</strong> it must be in writing and signed in front of two witnesses, who must each clearly see you sign. You can't leave anything to a witness or their spouse or civil partner. A handwritten will without witnesses isn't valid.</li>
<li><strong>Marriage cancels a will</strong> in England and Wales, unless the will was made with that marriage in mind. Divorce doesn't cancel the whole will, but gifts to the former spouse fail.</li>
<li><strong>Unmarried partners inherit nothing automatically</strong> if there is no will. This is one of the most important reasons to make one.</li>
<li><strong>No fixed shares for children,</strong> but family members and dependants can ask a court for provision if the will leaves them without reasonable support.</li>
<li><strong>Lasting powers of attorney:</strong> there are two kinds, one for property and financial affairs and one for health and welfare. Each must be registered with the Office of the Public Guardian, which costs £92 per document (reduced fees for low incomes).</li>
<li><strong>Trusts</strong> are used mainly for tax planning, children or vulnerable beneficiaries, rather than to avoid probate.</li>
<li><strong>Inheritance tax:</strong> 40% on the value above £325,000, with an extra allowance when a home goes to children or grandchildren. Gifts to a spouse, civil partner or charity are usually exempt. From April 2027, most unused pension funds are set to count toward inheritance tax; check the current rules.</li>
<li><strong>Scotland is different:</strong> a will needs only one witness, and a spouse and children have "legal rights" to a share of the moveable estate (money and possessions, not land or buildings), whatever the will says.</li></ul>` },
      { id: 'australia', h: 'In Australia', html: `<p>Wills, estates and powers of attorney are governed by each state and territory, so the rules depend on where you live.</p>
<ul>
<li><strong>Making a valid will:</strong> it must be in writing and signed in front of two witnesses who are present at the same time. The safest choice is witnesses who inherit nothing under the will.</li>
<li><strong>Informal wills:</strong> in every state and territory, the Supreme Court can accept a document that wasn't signed or witnessed properly, if it is clear the person meant it as their will. It's slow, costly and uncertain, so make a proper will instead.</li>
<li><strong>Marriage and divorce:</strong> in most states, getting married cancels an earlier will unless it was made with that marriage in mind; South Australia and the ACT are exceptions. Divorce usually cancels gifts to the former spouse, though the details differ. Review your will after either.</li>
<li><strong>Superannuation is not covered by your will.</strong> Your fund pays it according to a <strong>binding death benefit nomination</strong> if you have a valid one, and otherwise at the trustee's discretion. Some nominations lapse, often after three years, so check yours.</li>
<li><strong>Tax:</strong> Australia has no inheritance or estate tax. But super paid to someone who wasn't financially dependent on you, such as an adult child, can be taxed: generally up to 15% on the taxable part (more on any untaxed part), plus the Medicare levy when paid directly from the fund. Inherited assets can also carry capital gains tax when they are later sold.</li>
<li><strong>Family provision claims:</strong> certain family members, and in some states others who depended on you, can ask the court for a larger share if the will doesn't adequately provide for them.</li>
<li><strong>Powers of attorney and medical decisions</strong> have different names and forms in each state. For example, New South Wales uses separate documents for money (an enduring power of attorney) and for health and personal decisions (an enduring guardian), while Queensland and Victoria combine them. Some states recognize another state's document, but not all automatically.</li>
<li><strong>Probate</strong> is granted by the Supreme Court of the state where the person lived or owned property, and fees differ by state.</li></ul>` },
      { id: 'lawyer', h: 'Do it yourself, or see a lawyer?', html: `<p>A simple estate can often be handled with your state's standard forms or reputable will software. See a lawyer if you have a blended family, minor children, a business, property in more than one state or country, a beneficiary with a disability, a large estate, or someone likely to contest the will. If money is tight, legal aid organizations and bar association referral services can help.</p>` },
      { id: 'keep', h: 'Keeping and updating it', html: `<ul>
<li>Keep the original will somewhere safe that your executor can get to. A safe deposit box only in your name can be hard to open after you die.</li>
<li>Tell your executor and your one trusted person where everything is.</li>
<li>Review after a marriage, divorce, birth, death, move or big change in money, and every few years anyway.</li></ul>` },
    ],
    sources: [
      ['Tax Foundation: state estate and inheritance taxes', 'https://taxfoundation.org/data/all/state/estate-inheritance-taxes/'],
      ['AARP: states with estate and inheritance taxes', 'https://www.aarp.org/money/retirement/states-with-estate-inheritance-taxes/'],
      ['IRS: estate tax', 'https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax'],
      ['Nolo: are handwritten wills valid?', 'https://www.alllaw.com/articles/nolo/wills-trusts/are-handwritten-holographic-wills-valid.html'],
      ['NerdWallet: community property states', 'https://www.nerdwallet.com/estate-planning/learn/community-property'],
      ['Canadian Lawyer: what makes a will valid in Canada', 'https://www.canadianlawyermag.com/practice-areas/trusts-and-estates/how-to-craft-valid-wills-in-canada/381456'],
      ['Canada Life: types of wills, including Quebec', 'https://canadalife.com/investing-saving/estate-planning/wills-101-what-is-will/types-of-wills.html'],
      ['Ontario: Estate Administration Tax', 'https://www.ontario.ca/page/estate-administration-tax'],
      ['GOV.UK: making a will', 'https://www.gov.uk/make-will'],
      ['GOV.UK: lasting power of attorney', 'https://www.gov.uk/power-of-attorney'],
      ['GOV.UK: Inheritance Tax', 'https://www.gov.uk/inheritance-tax'],
      ['mygov.scot: making a will', 'https://www.mygov.scot/making-a-will'],
      ['Legal Aid Commission of Tasmania: making a will', 'https://www.legalaid.tas.gov.au/wills-making-a-will'],
      ['Australian Taxation Office: paying superannuation death benefits', 'https://www.ato.gov.au/super/apra-regulated-funds/paying-benefits/paying-superannuation-death-benefits/'],
      ['Australian Law Reform Commission: enduring powers of attorney and guardianship', 'https://www.alrc.gov.au/publication/elder-abuse-dp-83/5-enduring-powers-of-attorney-and-enduring-guardianship/development-of-enduring-powers/'],
      ['Compass (Australian Government): wills, enduring powers and advance care directives', 'https://www.compass.info/featured-topics/powers-of-attorney/what-is-the-difference-between-a-will-an-enduring-power-of-attorney-an-enduring-guardian-and-an-advance-care-directive-/'],
    ],
    related: [
      ['/checklists/plan-ahead/', 'Plan-ahead worksheet', 'Where everything is, all in one place.'],
      ['/plan-ahead/property-abroad/', 'Property abroad', 'Wills in other countries.'],
    ],
  }),
  guide({
    path: '/plan-ahead/property-abroad/',
    title: 'Wills when you own property abroad',
    eyebrow: 'Plan ahead',
    description: 'Wills and inheritance for people who own a home in another country, including Mexico, Costa Rica, Canada, the UK, Spain, Portugal, France and Italy.',
    lead: "If you own a home in another country, your will at home may not be enough. Here's what to check, with notes on the countries where expats most often own property.",
    sections: [
      { id: 'short', h: 'The short version', html: `<ul>
<li>Many advisers recommend a separate local will for property abroad, made with a local notary and covering only the assets in that country.</li>
<li>Make sure your wills work together. A new will can cancel an older one unless each is worded to cover only its own country's assets. Tell each lawyer about the other will.</li>
<li>Check how the property is held. A trust, a company or a co-owner can change who inherits, whatever your will says.</li>
<li>Ask about taxes in both countries before you assume anything.</li></ul>` },
      { id: 'why', h: "Why your home will may not be enough", html: `<p>To use a foreign will, heirs often have to settle the estate at home first, then have the documents certified with an apostille, translated and recognized by a local court or notary. That can take a long time and cost a lot. Local law may also decide who inherits land located there, and some countries reserve fixed shares for children (called forced heirship), whatever the will says.</p>` },
      { id: 'mexico', h: 'Mexico', html: `<ul>
<li><strong>Trust property (<span lang="es">fideicomiso</span>).</strong> Foreigners usually hold property near the coast or borders (the "restricted zone") through a bank trust called a <span lang="es">fideicomiso</span>. You name substitute beneficiaries in the trust itself, and the trust, not your will, decides who receives that property. Keep those beneficiaries up to date.</li>
<li><strong>A Mexican will.</strong> Expats are usually advised to make a Mexican will, a <em lang="es">testamento público abierto</em>, before a Mexican notary (<span lang="es">notario público</span>), in Spanish. It covers assets outside the trust, such as bank accounts and cars.</li>
<li><strong>Using a US will.</strong> A US will can be valid in Mexico, but heirs usually have to settle it in the US first and then have it recognized in Mexico, which is slow and expensive.</li>
<li><strong>Will Month.</strong> Every September is <em lang="es">Mes del Testamento</em> (Will Month). Notaries cut their fees for wills, often by up to half. Discounts and dates vary by state.</li></ul>` },
      { id: 'costa-rica', h: 'Costa Rica', html: `<ul>
<li>Wills are made before a notary, in Spanish, and can be limited to your Costa Rica assets.</li>
<li>Property in your own name normally goes through Costa Rican probate, even with a will. When the heirs agree and none of them is a minor, a notary can handle it instead of a court.</li>
<li>Some foreigners hold property through a Costa Rican company. That changes how it passes on, so get local advice before setting one up.</li></ul>` },
      { id: 'canada', h: 'Canada', html: `<ul>
<li><strong>No inheritance tax, but capital gains.</strong> Canada has no inheritance or estate tax. Instead, death counts as selling your property at its market value, so capital gains tax may be due on a Canadian cottage or rental property on your final tax return.</li>
<li><strong>Clearance before heirs are paid.</strong> The executor of a non-resident's estate usually needs a clearance certificate from the Canada Revenue Agency before handing Canadian property to heirs. If the property is sold, the buyer holds back part of the price until a separate certificate is issued.</li>
<li><strong>Probate in the province.</strong> A US court's grant usually isn't enough on its own. The province where the property is issues its own grant, often only after US probate is finished. Rules and fees differ by province: Ontario issues an ancillary grant and may require a bond, and Quebec has a different legal system with notarial wills.</li>
<li><strong>A Canadian will.</strong> Ask a Canadian lawyer whether a separate will for your Canadian property would make things simpler for your executor.</li></ul>` },
      { id: 'uk', h: 'United Kingdom', html: `<ul>
<li><strong>UK inheritance tax applies to UK property,</strong> whatever your nationality or where you live. The standard rate is 40% on the value above the £325,000 threshold. Some gifts, such as to a spouse or a charity, can be exempt; ask how the rules apply to you.</li>
<li><strong>If you live in the UK,</strong> since April 2025 your assets worldwide can be taxed once you have been UK resident for 10 of the last 20 tax years.</li>
<li><strong>Probate.</strong> Executors need a UK grant of probate to sell or transfer UK property. A grant from some Commonwealth countries can be resealed; a US grant usually can't, so a new UK application is needed.</li>
<li><strong>Wills.</strong> A will made abroad can be valid in England and Wales if it meets the formal rules of the place it was made, or of your residence or nationality. Many people still use a separate UK will covering only UK assets, to make probate simpler.</li>
<li><strong>Scotland is different.</strong> It has its own probate process (called confirmation) and inheritance rules, so get Scottish advice for property there.</li></ul>` },
      { id: 'europe', h: 'Spain, Portugal, France and Italy', html: `<ul>
<li><strong>Which country's law applies.</strong> Under the EU Succession Regulation, the law of the country where you usually live at your death applies to your whole estate, unless your will chooses the law of a country you are a citizen of.</li>
<li><strong>Fixed shares for children.</strong> These countries all have forced-heirship rules that reserve part of an estate for children, and sometimes a spouse. If you live there and make no choice in your will, those rules can apply to you.</li>
<li><strong>A local will.</strong> Many advisers recommend a local will for property there, made with a notary and stating your choice of law if you want one.</li>
<li><strong>Proof for heirs.</strong> Heirs can use a European Certificate of Succession to prove their rights in other EU countries.</li>
<li><strong>Taxes.</strong> Inheritance taxes vary by country and, in Spain, by region. Ask before you assume there is none.</li></ul>` },
      { id: 'taxes', h: 'Taxes at home', html: `<p>If you are a US citizen, all your assets worldwide count for US estate tax, including a home abroad. For deaths in 2026, a federal estate tax return is only required when the gross estate is over $15 million, so most estates owe none. The other country may still tax the property. The US has tax treaties that cover estates with some countries, including Canada and the UK; a cross-border tax adviser can tell you whether one helps.</p>` },
      { id: 'checklist', h: 'What to do now', html: `<ul class="check">
<li>List every asset you own outside your home country, and how each is held.</li>
<li>Ask a local notary or lawyer whether you need a local will.</li>
<li>Make sure each will covers only its own country's assets and doesn't cancel the others.</li>
<li>If you have a <span lang="es">fideicomiso</span> in Mexico, check the substitute beneficiaries.</li>
<li>Keep copies, with translations, where your executor can find them.</li>
<li>Review everything if you move country, marry, divorce or sell.</li></ul>` },
      { id: 'after', h: 'If someone dies owning property abroad', html: `<p>Contact a notary or lawyer in that country early. You'll usually need certified, apostilled and translated copies of the death certificate and the will. If the death happened abroad, the nearest embassy or consulate of the person's home country can help with the first steps.</p>` },
    ],
    sources: [
      ['American Bar Association: foreign ownership of property in Mexico’s restricted zone (2026)', 'https://www.americanbar.org/groups/real_property_trust_estate/resources/probate-property/2026-may-june/legal-ownership-real-property-mexican-restricted-zone-by-foreign-investors/'],
      ['Vive USA: September 2026 Will Month in Mexico', 'https://www.viveusa.mx/en/negocios/cuanto-cuesta-hacer-un-testamento-en-septiembre-de-2026-y-que-descuentos-hay/'],
      ['AG Legal: Costa Rica wills for foreign property owners', 'https://aglegal.com/costa-rica-wills-foreigners/'],
      ['O’Sullivan Estate Lawyers: cross-border Canada–US estate administration (April 2026, PDF)', 'https://www.osullivanlaw.com/wp-content/uploads/2026/04/Advisory-11-Cross-border-Canada-U.S.-estate-administration-highlights.pdf'],
      ['Mondaq: cross-border Canada–US estate administration', 'https://www.mondaq.com/canada/wills-intestacy-estate-planning/685076/cross-border-canada-us-estate-administration-highlights'],
      ['GOV.UK: how Inheritance Tax works', 'https://www.gov.uk/inheritance-tax'],
      ['GOV.UK: applying for probate', 'https://www.gov.uk/applying-for-probate'],
      ['IRS: estate tax (filing thresholds)', 'https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax'],
      ['EU Succession Regulation (EU) No 650/2012', 'https://eur-lex.europa.eu/eli/reg/2012/650'],
      ['European Commission: successions and wills', 'https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/civil-justice/family-law/successions-and-wills_en'],
      ['Notaries of Europe: successions handbook (2025, PDF)', 'https://www.notariesofeurope.eu/wp-content/uploads/2025/05/CNUE_Handbook-Successions_2025_EN_0006-1.pdf'],
    ],
    related: [
      ['/plan-ahead/', 'Plan ahead', 'The rest of your planning.'],
      ['/after-a-death/', 'After a death', 'Settling an estate at home.'],
    ],
  }),
  guide({
    path: '/plan-ahead/talking-with-a-parent/',
    title: 'Talking with a parent, near or far',
    eyebrow: 'Plan ahead',
    description: 'How to talk with an aging parent about their wishes for the end of life, including when you live in another city or country.',
    lead: "It rarely feels like the right time. Starting while your parent is well means they get to decide, and you won't have to guess later.",
    sections: [
      { id: 'start', h: 'Getting started', html: `<ul>
<li><strong>Start small.</strong> One question is enough for a first conversation.</li>
<li><strong>Use an opening.</strong> A friend's illness, a news story, or your own planning: "I've been writing down my own wishes, and it made me wonder about yours."</li>
<li><strong>Listen more than you talk.</strong> The goal is to learn what they want, not to persuade them.</li>
<li><strong>Write down what they say,</strong> and read it back so they can correct it.</li></ul>
<p><a href="/checklists/talking-with-a-parent/">Print the conversation sheet</a> for questions and space to write.</p>` },
      { id: 'what', h: 'What to talk about', html: `<ul>
<li>What matters most to them if they became very ill, and what they would not want.</li>
<li>Who should make decisions if they can't, and whether that's written down.</li>
<li>Where their will, insurance, accounts and important papers are.</li>
<li>What they want for their body and for a funeral or gathering.</li></ul>` },
      { id: 'resist', h: "If they don't want to talk", html: `<p>That's their right. Say why it matters to you, leave the door open, and try again another time. Some people find it easier to fill in a form alone, or to talk with their doctor, a faith leader or a friend instead of their child.</p>` },
      { id: 'far', h: 'When you live far away', html: `<ul>
<li><strong>Talk by video,</strong> and plan the bigger conversations for when you visit.</li>
<li><strong>Use their local rules.</strong> Their advance directive should be on the form for the state or country where they live, not where you live.</li>
<li><strong>Distance and time zones matter.</strong> You can still be their health care proxy from abroad, but name a backup who lives nearby, and make sure their doctors have your number and know your time zone.</li>
<li><strong>Build a local circle:</strong> a neighbor, a friend or a relative who can check in, with your contact details and theirs written down.</li>
<li><strong>Keep copies</strong> of their key documents and contacts where you can reach them, such as scanned copies in a secure shared folder.</li>
<li><strong>Know what you'd do</strong> if you needed to travel at short notice: passport valid, and who covers for you at home.</li></ul>` },
    ],
    related: [
      ['/checklists/talking-with-a-parent/', 'Conversation sheet', 'Printable questions with space for answers.'],
      ['/plan-ahead/property-abroad/', 'Property abroad', 'If either of you owns a home in another country.'],
    ],
  }),
  guide({
    path: '/what-it-costs/',
    title: 'What it costs',
    eyebrow: 'Costs',
    reviewed: '2026-11-18',
    description: 'What the end of life costs: medical care, hospice, care at home and in care homes, funerals and medical aid in dying, with sourced figures and where to look up prices.',
    lead: 'Almost no one tells you plainly what dying costs. Here is what we could confirm, with the source and date for every figure, and where to look up prices yourself.',
    sections: [
      { id: 'short', h: 'The short version', html: `<ul>
<li><strong>It depends most on where you live.</strong> In countries with public health systems, such as the UK and Canada, most medical and hospice care is free or largely covered. In the US, costs depend on insurance and on which kind of care is needed.</li>
<li><strong>The biggest out-of-pocket costs are usually not medical.</strong> Paid care at home or in a care home, and the funeral, are what most families pay for themselves.</li>
<li><strong>Prices vary widely,</strong> even between nearby hospitals and funeral homes. Asking for written, itemized prices is the single best way to save money.</li></ul>
<p>Figures below are US national medians unless we say otherwise. Your area may be much higher or lower.</p>` },
      { id: 'medical', h: 'Medical care in the last year of life', html: `<p>In the US, about a quarter of Medicare spending on people aged 65 and over goes to care in their last year of life, according to KFF's analysis of 2014 data, the most recent it has published. Much of that is hospital and intensive care.</p>
<p>How much care people get near the end varies a great deal between hospitals. The <a href="https://www.dartmouthatlas.org/interactive-apps/data-by-hospital/medicare-reimbursements/">Dartmouth Atlas</a> compares US hospitals on Medicare spending, hospital and intensive-care days and hospice use in patients' last two years of life. Its hospital data is from 2017, so use it to compare patterns, not today's prices.</p>` },
      { id: 'hospice', h: 'Hospice and palliative care', html: `<ul>
<li><strong>US, Medicare:</strong> hospice care is covered. You may pay up to $5 for each prescription for pain and symptom relief, and 5% of the Medicare-approved amount for inpatient respite care. Medicare doesn't pay room and board if you live in a nursing home or other facility.</li>
<li><strong>UK:</strong> hospice care is free to patients. Most hospices are charities.</li>
<li><strong>Canada:</strong> palliative care is covered by provincial health plans, though some care at home may cost extra.</li></ul>` },
      { id: 'care', h: 'Care at home and in care homes', html: `<p>This is often the largest cost, and in the US, Medicare doesn't pay for long-term personal care. Medicaid may, for people with low income and savings. National median costs in 2025:</p>
<div class="table-box" tabindex="0" role="region" aria-label="Long-term care costs"><table style="min-width:520px">
<caption class="sr-only">US national median long-term care costs, 2025</caption>
<thead><tr><th scope="col">Type of care</th><th scope="col">Median cost</th><th scope="col">Per year</th></tr></thead>
<tbody>
<tr><td>Nursing home, private room</td><td>$355 a day</td><td>$129,575</td></tr>
<tr><td>Nursing home, shared room</td><td>$315 a day</td><td>$114,975</td></tr>
<tr><td>Assisted living</td><td>$6,200 a month</td><td>$74,400</td></tr>
<tr><td>Paid caregiver at home (44 hours a week)</td><td>$35 an hour</td><td>$80,080</td></tr>
<tr><td>Adult day care (5 days a week)</td><td>$95 a day</td><td>$24,700</td></tr>
</tbody></table></div>
<p class="small muted">Source: CareScout 2025 Cost of Care Survey, released March 2, 2026. Look up your area with the <a href="https://www.carescout.com/cost-of-care">CareScout cost calculator</a>.</p>` },
      { id: 'funeral', h: 'Funerals, burial and cremation', html: `<ul>
<li><strong>Funeral with viewing and burial:</strong> about $8,300 median, or about $9,995 with a burial vault.</li>
<li><strong>Funeral with viewing and cremation:</strong> about $6,280 median.</li></ul>
<p class="small muted">Source: National Funeral Directors Association 2023 General Price List Study, as reported by <a href="https://www.kiplinger.com/retirement/estate-planning/the-cost-of-dying-burial-and-cremation-prices-by-state">Kiplinger</a>. These cover the funeral home only, not the cemetery plot, headstone, flowers or obituary.</p>
<p><strong>Direct cremation</strong> or <strong>direct burial</strong> (no viewing or service beforehand) usually costs far less, and a gathering can be held later anywhere. Cremation is now the most common choice in the US; the NFDA projected a 63.4% cremation rate for 2025. In the US, you have the right to itemized prices under the FTC Funeral Rule; see <a href="/after-a-death/#rights">your rights with funeral homes</a>.</p>` },
      { id: 'maid', h: 'Medical aid in dying', html: `<ul>
<li><strong>US federal programs don't pay.</strong> A 1997 federal law bars federal funds from paying for it, so Medicare, the VA and the federal share of Medicaid don't cover the medication or the related doctor visits.</li>
<li><strong>Private insurance varies.</strong> Some plans in some states cover it; many don't. Ask the insurer in writing.</li>
<li><strong>Ask for the full cost up front:</strong> the clinician visits, the medication, and any support at the bedside. Reported costs vary from a few hundred dollars for the medication alone to several thousand with clinicians' time included.</li>
<li><strong>Switzerland</strong> is far more expensive; see <a href="/medical-aid-in-dying/switzerland/#costs">going to Switzerland</a>.</li></ul>` },
      { id: 'lookup', h: 'Where to look up prices', html: `<div class="cards cards-tight">
${dirCard('https://www.dartmouthatlas.org/interactive-apps/data-by-hospital/medicare-reimbursements/', 'Dartmouth Atlas', 'US · hospitals', 'End-of-life care patterns by hospital (2017 data).')}
${dirCard('https://www.medicare.gov/care-compare/?providerType=Hospice', 'Medicare Care Compare', 'US · hospice', 'Quality ratings for hospices.')}
${dirCard('https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency', 'Hospital price transparency', 'US · hospitals', 'Every hospital must post its prices; not all comply.')}
${dirCard('https://turquoise.health/', 'Turquoise Health', 'US · hospitals', 'Makes hospital price files searchable.')}
${dirCard('https://www.fairhealthconsumer.org/', 'FAIR Health Consumer', 'US · medical care', 'Typical costs of procedures in your area.')}
${dirCard('https://www.carescout.com/cost-of-care', 'CareScout', 'US · care', 'Care-home and home-care costs by area.')}
${dirCard('https://www.funerals.org/', 'Funeral Consumers Alliance', 'US · funerals', 'Local groups, some of which survey funeral prices.')}
</div>` },
      { id: 'save', h: 'Ways to lower costs', html: `<ul>
<li>Ask about hospice early. It is covered by Medicare in the US, and free in many other countries.</li>
<li>Get written, itemized prices from two or three funeral homes before you choose.</li>
<li>Consider direct cremation or direct burial, with a gathering afterward.</li>
<li>Look into body donation: some programs cover the cost of cremation afterward.</li>
<li>In the US, eligible veterans can be buried in a VA national cemetery and may qualify for other burial benefits; <a href="https://www.va.gov/burials-memorials/eligibility/">check eligibility</a>.</li>
<li>Check what insurance, Medicaid or employer benefits cover before paying privately for care.</li></ul>` },
    ],
    sources: [
      ['KFF: Medicare spending at the end of life (2014 data)', 'https://www.kff.org/medicare/medicare-spending-at-the-end-of-life/'],
      ['Dartmouth Atlas: end-of-life care by hospital', 'https://www.dartmouthatlas.org/interactive-apps/data-by-hospital/medicare-reimbursements/'],
      ['Medicare: hospice care coverage', 'https://www.medicare.gov/coverage/hospice-care'],
      ['CareScout 2025 Cost of Care Survey (Genworth press release, March 2026)', 'https://investor.genworth.com/news-events/press-releases/detail/1054'],
      ['Kiplinger: the cost of dying (citing the NFDA 2023 General Price List Study)', 'https://www.kiplinger.com/retirement/estate-planning/the-cost-of-dying-burial-and-cremation-prices-by-state'],
      ['NFDA statistics (cremation rate)', 'https://nfda.org/news/statistics'],
      ['US Code, 42 U.S.C. chapter 138: restriction on assisted suicide funding', 'https://www.law.cornell.edu/uscode/text/42/chapter-138'],
      ['CMS: hospital price transparency', 'https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency'],
    ],
    related: [
      ['/after-a-death/', 'After a death', 'Funeral options and your rights.'],
      ['/finding-help/', 'Finding help near you', 'Independent directories.'],
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
      { id: 'hospice', h: 'Hospice: when the focus turns to comfort', html: `<p>Hospice is care focused on comfort when a cure is no longer the goal. It exists in most countries, though how it's organized and paid for differs. In the US, Medicare covers hospice when a doctor certifies a life expectancy of six months or less if the illness runs its usual course. It includes the care team, comfort medications and equipment, usually at home.</p>
<ul><li>Choosing hospice usually means stopping treatment meant to cure the terminal illness, but not other care.</li>
<li>You can leave hospice and go back to curative treatment if you change your mind.</li>
<li>Many families say they wish they had known about hospice sooner.</li></ul>` },
      { id: 'polst', h: 'Medical orders for now (POLST)', html: `<p>An advance directive covers the future. In the US, a POLST form (also called MOLST, POST or MOST, depending on the state) is a medical order signed by a clinician for someone who is seriously ill now. It tells emergency crews and hospitals what treatment you want, such as whether to attempt CPR. Other countries use similar forms, such as ReSPECT in the UK; ask the care team what is used where you live.</p>` },
      { id: 'where', h: 'Where care happens', html: `<p>Care can happen at home with help from family, aides and a hospice team; in assisted living or a nursing home; or in an inpatient hospice. Ask what each option costs and what insurance or public programs cover before you decide. See <a href="/what-it-costs/#care">what it costs</a>.</p>` },
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
    lead: 'Dying is often slower and harder than people expect. Knowing what it can really be like helps you prepare, ask for the right help, and decide what you want.',
    sections: [
      { id: 'honest', h: 'What dying can really be like', html: `<p>Some deaths are peaceful. Many are not, especially after a long illness. It helps to know what can happen, so that it doesn't come as a shock:</p>
<ul>
<li><strong>Wasting.</strong> People can lose a great deal of weight and muscle, until they look very different from the person you knew.</li>
<li><strong>Exhaustion and dependence.</strong> Many need help to wash, eat, use the toilet and turn in bed. For someone who valued their independence, this can be the hardest part.</li>
<li><strong>Pain and breathlessness.</strong> Both can usually be eased, but not always completely, and not always quickly.</li>
<li><strong>Confusion and agitation.</strong> Delirium is common near the end. Someone may not recognize their family, or may be restless and distressed.</li>
<li><strong>The last days.</strong> People sleep most of the time and stop eating and drinking. Breathing often changes, with long pauses or a rattling sound. That sound is usually more distressing to hear than to have.</li>
</ul>
<p>None of this means anyone has failed. It's what a body does as it shuts down. And it's reasonable to find it unbearable to watch, or to know you don't want it for yourself.</p>` },
      { id: 'comfort', h: 'Easing suffering', html: `<p>Tell the care team about every sign of pain, breathlessness, agitation or fear, and ask again if it doesn't improve. Palliative care teams have more options than most people realize, including medication to calm agitation and, when suffering can't be eased any other way, sedation. Small things help too: moistening the lips, changing position, soft light, familiar voices and music.</p>` },
      { id: 'dignity', h: 'Dignity, in their terms', html: `<p>Ask the person, while they can answer, what dignity means to them: who they want to help with personal care, what they don't want visitors to see, what they want to wear, what they never want done. Write it down and share it with the care team. Some people, knowing what the end may involve, choose to stop treatments, refuse food and drink near the end, or ask for <a href="/medical-aid-in-dying/">medical aid in dying</a> where it is legal. Others want every day they can have. Each is a legitimate choice.</p>` },
      { id: 'doulas', h: 'End-of-life doulas', html: `<p>An end-of-life doula gives non-medical support to the dying person and their family: planning the last days, sitting vigil, and helping afterward. They work alongside hospice, not instead of it.</p>` },
      { id: 'goodbye', h: 'Saying goodbye', html: `<p>Hearing is thought to be one of the last senses to fade, so keep talking. Many people find it helps to say five things: thank you, I love you, I forgive you, please forgive me, and goodbye. It's also fine to step out. Some people die when their family has just left the room.</p>` },
      { id: 'prepare', h: 'Prepare for the moment of death', html: `<p>Decide in advance who to call. If the person is in hospice at home, call the hospice, not emergency services. Keep the <a href="/checklists/after-a-death/">first-24-hours checklist</a> nearby.</p>` },
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
<li><strong>Unexpected death:</strong> call your local emergency number (911 in the US and Canada, 999 in the UK, 112 across the EU).</li>
<li><strong>In a hospital or care home:</strong> staff will guide you.</li></ul>
<p>There is usually no rush to move the body. You can take time to sit, say goodbye, and call family.</p>
<p><a href="/checklists/after-a-death/">Print the first-24-hours checklist</a>.</p>` },
      { id: 'certificates', h: 'Death certificates', html: `<p>A funeral home usually files the death certificate. Order several certified copies: banks, insurers, pension plans and government agencies often each want one.</p>` },
      { id: 'options', h: 'Funeral, burial and cremation options', html: `<ul><li><strong>Burial:</strong> traditional, or green (natural) burial without embalming or a concrete vault.</li>
<li><strong>Cremation:</strong> with or without a service. Direct cremation, with no service beforehand, usually costs least.</li>
<li><strong>Body donation:</strong> usually arranged in advance with a program.</li>
<li><strong>Home funeral:</strong> most states allow families to care for their own dead; some require a funeral director for certain steps.</li></ul>
<p>There are many more choices, including water cremation, human composting, burial at sea and being planted under a tree: see <a href="/plan-ahead/choices-for-the-body/">every choice for the body</a>.</p>
<p>A service can happen weeks later, in any form you like. The <a href="/checklists/funeral-planner/">funeral or celebration of life planner</a> and <a href="/checklists/eulogy/">eulogy guide</a> can help. To find independent help nearby, see <a href="/finding-help/">finding help</a>.</p>` },
      { id: 'rights', h: 'Your rights with funeral homes', html: `<p>Wherever you are, ask for written, itemized prices before you agree to anything. In the US, the FTC Funeral Rule gives you the right to:</p>
<ul><li>Get an itemized price list, in person, and prices by phone.</li>
<li>Buy only the goods and services you want.</li>
<li>Use a casket or urn bought elsewhere, without a handling fee.</li>
<li>Refuse embalming in most cases. Ask what the law actually requires.</li></ul>
<p>Prices vary widely. Calling two or three funeral homes can save thousands of dollars. See <a href="/what-it-costs/#funeral">what it costs</a>.</p>` },
      { id: 'first-month', h: 'The first month', html: `<ul><li>Find the will, and contact the executor named in it.</li>
<li>Notify the government pension or social security agency (in the US, Social Security; the funeral home often does this), other pension plans, insurers and banks.</li>
<li>Claim life insurance and any benefits; ask about survivor benefits.</li>
<li>Cancel or transfer utilities, subscriptions and accounts. Keep paying essential bills.</li>
<li>Forward mail, secure the home and car, and look after pets.</li></ul>` },
      { id: 'probate', h: 'Probate and the estate', html: `<p>Probate is the legal process for settling an estate; its name and steps differ by country. Accounts with a named beneficiary and jointly owned property often pass outside it, and many places, including every US state, have a simpler process for small estates. If the estate is large or complicated, talk to a probate lawyer.</p>
<p>To make things easier for your own family, see <a href="/plan-ahead/wills-and-trusts/#probate">passing things on without probate</a>.</p>
<p>If they owned property in another country, see <a href="/plan-ahead/property-abroad/#after">property abroad</a>.</p>` },
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
      { id: 'witnessed', h: 'If you watched a hard death', html: `<p>Watching someone you love waste away, suffer or lose themselves can leave lasting images: intrusive memories, nightmares, or guilt about what you couldn't stop. That isn't a weakness, and it is worth talking to someone about, especially a grief counselor who understands trauma.</p>
<p>Many people find that watching a death changes what they want for their own. If it has for you, write it down while it's clear: what you would want, what you would refuse, and who should speak for you. Our <a href="/plan-ahead/">plan-ahead guide</a> and <a href="/checklists/plan-ahead/">worksheet</a> can help.</p>` },
      { id: 'children', h: 'Helping children', html: `<ul><li>Use clear words: "died," not "went to sleep" or "we lost her," which can confuse or frighten.</li>
<li>Answer questions honestly and simply; it's fine to say you don't know.</li>
<li>Let children choose whether to take part in goodbyes and funerals.</li>
<li>Expect grief to come and go in play and questions over months and years.</li>
<li>Tell their school and their other caregivers.</li></ul>
<p>Free printable remembering books: <a href="/checklists/remembering-someone/">someone I love</a>, <a href="/checklists/remembering-grandparent/">my grandparent</a> and <a href="/checklists/remembering-pet/">my pet</a>.</p>` },
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
      ['/checklists/after-a-death/', 'First-24-hours checklist', 'Printable, for the practical steps.'],
    ],
  }),
];

/* ---------- checklists ---------- */

export const checklists = [
  checklist({
    path: '/checklists/plan-ahead/',
    title: 'Plan-ahead worksheet',
    description: 'A thorough printable worksheet: your people, professionals, health and legal documents, money, property, digital life and wishes, and where everything is kept.',
    lead: 'Fill in what applies and skip the rest. Give a copy to your health care proxy or executor, and keep one with your important papers. Never write full passwords here; say where to find them.',
    groups: [
      { h: 'About me', items: ['Full legal name: <span class="blank" aria-hidden="true"></span>', 'Date of birth: <span class="blank" aria-hidden="true"></span>', 'Where my ID, passport and birth certificate are: <span class="blank" aria-hidden="true"></span>', 'Marriage, divorce or partnership papers: <span class="blank" aria-hidden="true"></span>', 'Military service papers (if any): <span class="blank" aria-hidden="true"></span>'] },
      { h: 'My people', items: ['My health care proxy: <span class="blank" aria-hidden="true"></span> Phone: <span class="blank" aria-hidden="true"></span>', 'Backup proxy: <span class="blank" aria-hidden="true"></span>', 'Executor named in my will: <span class="blank" aria-hidden="true"></span>', 'Financial power of attorney: <span class="blank" aria-hidden="true"></span>', 'The one person who knows where everything is: <span class="blank" aria-hidden="true"></span>', 'People to call first: <span class="blank" aria-hidden="true"></span>', 'Guardian for my children: <span class="blank" aria-hidden="true"></span>', 'Who cares for my pets: <span class="blank" aria-hidden="true"></span>', 'People who depend on me, and how: <span class="blank" aria-hidden="true"></span>'] },
      { h: 'My professionals', items: ['Doctor(s): <span class="blank" aria-hidden="true"></span>', 'Lawyer: <span class="blank" aria-hidden="true"></span>', 'Accountant or tax preparer: <span class="blank" aria-hidden="true"></span>', 'Financial adviser or bank contact: <span class="blank" aria-hidden="true"></span>', 'Insurance agent: <span class="blank" aria-hidden="true"></span>', 'Faith leader or other support: <span class="blank" aria-hidden="true"></span>', 'Employer or HR contact (for benefits): <span class="blank" aria-hidden="true"></span>'] },
      { h: 'Health care documents', items: ['Advance directive (living will). Kept: <span class="blank" aria-hidden="true"></span>', 'Health care power of attorney. Kept: <span class="blank" aria-hidden="true"></span>', 'POLST or similar medical order (if seriously ill). Kept: <span class="blank" aria-hidden="true"></span>', 'Organ and tissue donation: yes / no / registered with: <span class="blank" aria-hidden="true"></span>', 'My doctor and my proxy have copies.'] },
      { h: 'Legal documents', items: ['Will. Original kept: <span class="blank" aria-hidden="true"></span>', 'Trust (if any). Trustee: <span class="blank" aria-hidden="true"></span> Kept: <span class="blank" aria-hidden="true"></span>', 'Durable financial power of attorney. Kept: <span class="blank" aria-hidden="true"></span>', 'Wills or documents for property in another state or country: <span class="blank" aria-hidden="true"></span>', 'Prepaid funeral or burial plot papers: <span class="blank" aria-hidden="true"></span>'] },
      { h: 'Money and accounts', items: ['Bank and credit union accounts: <span class="blank" aria-hidden="true"></span>', 'Retirement and pension accounts: <span class="blank" aria-hidden="true"></span>', 'Investments: <span class="blank" aria-hidden="true"></span>', 'Life insurance policies: <span class="blank" aria-hidden="true"></span>', 'Accounts with a named beneficiary, and who it is: <span class="blank" aria-hidden="true"></span>', 'Debts, loans and credit cards: <span class="blank" aria-hidden="true"></span>', 'Regular bills and automatic payments: <span class="blank" aria-hidden="true"></span>', 'Where my recent tax returns are: <span class="blank" aria-hidden="true"></span>', 'Safe deposit box, and where the key is: <span class="blank" aria-hidden="true"></span>'] },
      { h: 'Property', items: ['Home: deed, lease or mortgage. Kept: <span class="blank" aria-hidden="true"></span>', 'Vehicles and titles: <span class="blank" aria-hidden="true"></span>', 'Property in another state or country, and how it is held: <span class="blank" aria-hidden="true"></span>', 'Valuables, and who should have them: <span class="blank" aria-hidden="true"></span>'] },
      { h: 'Digital life', items: ['Phone and computer passcodes, or where to find them: <span class="blank" aria-hidden="true"></span>', 'Password manager and its emergency access: <span class="blank" aria-hidden="true"></span>', 'Email accounts: <span class="blank" aria-hidden="true"></span>', 'Apple, Google or Facebook legacy contact set up: <span class="blank" aria-hidden="true"></span>', 'Subscriptions to cancel: <span class="blank" aria-hidden="true"></span>', 'Photos and files to keep: <span class="blank" aria-hidden="true"></span>'] },
      { h: 'My wishes', items: ['What matters most to me at the end of life: <span class="blank" aria-hidden="true"></span>', 'Where I would like to be: <span class="blank" aria-hidden="true"></span>', 'Burial / cremation / green burial / body donation / other: <span class="blank" aria-hidden="true"></span>', 'Service or gathering I would like (see the funeral planner): <span class="blank" aria-hidden="true"></span>', 'Letters or messages to deliver (see letters to leave): <span class="blank" aria-hidden="true"></span>', 'My life story or obituary notes (see my life story): <span class="blank" aria-hidden="true"></span>'] },
      { h: 'Review', items: ['Date I filled this in: <span class="blank" aria-hidden="true"></span>', 'Next review (every 2–3 years, or after a big change): <span class="blank" aria-hidden="true"></span>', 'Copies given to: <span class="blank" aria-hidden="true"></span>'] },
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
      { h: 'Right away', items: ['Expected death with hospice: call the hospice. Unexpected death: call your local emergency number (911 in the US and Canada, 999 in the UK, 112 in the EU).', 'Take a moment. There is usually no rush to move the body.', 'Call one person to be with you.'] },
      { h: 'Within the day', items: ['Tell close family and friends, or ask someone to do it.', 'Choose a funeral home or cremation provider. Ask for the itemized price list.', 'Look for written wishes about the body and the funeral.', 'Arrange care for children and pets, and secure the home.'] },
      { h: 'This can wait a few days', items: ['Order certified copies of the death certificate.', 'Find the will and contact the executor.', 'Notify the social security or pension agency, employers, banks and insurers.', 'Plan the service. It can happen weeks later.'] },
    ],
    note: 'If you are struggling, you do not have to do this alone. Ask a friend, a family member or the hospice team for help.',
  }),
];


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
<p class="small muted" style="margin:0">Laws last checked ${fmtDate(site.lastScan)} · We cover legal processes only.</p>
</div>
</section>
<section class="section"><div class="wrap">
<div class="prose" style="margin-bottom:48px">
<h2>Why people ask</h2>
<p>Oregon has published data on every person who has used its law since 1998. In 2025, the concerns people gave were:</p>
<ul>
<li>Losing their autonomy: 89%</li>
<li>Being less able to do the things that made life enjoyable: 89%</li>
<li>Losing their dignity: 65%</li>
<li>Losing control of bodily functions: 53%</li>
<li>Being a burden on family, friends or caregivers: 40%</li>
<li>Inadequate pain control, or worry about it: 37%</li>
</ul>
<p>For most people, it is about how they would have to live their last weeks, not only about pain.</p>
<p class="small muted">Source: <a href="https://www.oregon.gov/oha/ph/providerpartnerresources/evaluationresearch/deathwithdignityact/Documents/year28.pdf">Oregon Health Authority, 2025 Death with Dignity Act Data Summary (PDF)</a></p>
</div>
<div style="margin-bottom:56px">${linkCards([[`${MAID}/process/`, 'How the process works', 'The steps, and why starting early matters.'], [`${MAID}/families/`, 'For families', 'Talking about it, the day itself, insurance and grief.'], [`${MAID}/switzerland/`, 'Going to Switzerland', 'For people whose country has no law, and the legal risks.'], ['/serious-illness/', 'Hospice and palliative care', 'Available whatever you decide.']])}</div>
<h2>United States</h2>
<p class="sub">Legal in ${us.length - 1} states and the District of Columbia. Only Oregon and Vermont accept people who live elsewhere.</p>
${placeTable(us, 'United States')}
<h2 style="margin-top:56px">Around the world</h2>
${placeTable(world, 'Around the world')}
<div id="elsewhere" class="card" style="margin-top:40px">
<h3>Don't see your country?</h3>
<p>We're researching: ${data.researching.map(esc).join(', ')}.</p>
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
${linkCards([[`${MAID}/process/`, 'How the process works', 'The usual steps.'], ['/serious-illness/', 'Hospice and palliative care', 'Comfort care, whatever you decide.'], [`${MAID}/families/`, 'A guide for families', 'What to expect, and grief.'], ['/ask/', 'Ask a question', 'Answers from this site.']])}
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
      { id: 'steps', h: 'The usual steps', html: `<ol class="trail">
<li class="stop"><span class="stop-n" aria-hidden="true">1</span><div class="stop-card"><h3>First request</h3><p>Tell your doctor you want to ask. Not every doctor, hospital or hospice takes part.</p></div></li>
<li class="stop"><span class="stop-n" aria-hidden="true">2</span><div class="stop-card"><h3>Second opinion</h3><p>A second clinician confirms the diagnosis, prognosis and your ability to decide.</p></div></li>
<li class="stop"><span class="stop-n" aria-hidden="true">3</span><div class="stop-card"><h3>Waiting period</h3><p>Most states require time between requests. Some shorten it for people near death.</p></div></li>
<li class="stop"><span class="stop-n" aria-hidden="true">4</span><div class="stop-card"><h3>Written request</h3><p>A signed form, usually with witnesses, then the prescription.</p></div></li>
<li class="stop"><span class="stop-n" aria-hidden="true">5</span><div class="stop-card"><h3>Decide if and when</h3><p>Having the prescription doesn't mean you must use it.</p></div></li>
</ol>` },
      { id: 'early', h: 'Why starting early matters', html: `<p>Everyone who asks must be able to make and communicate their own decision at every step. If illness takes that ability away, the process stops. Starting the conversation early keeps the option open, even if you never use it.</p>` },
      { id: 'decline', h: "If your doctor won't take part", html: `<p>Doctors and hospices can decline. Ask for a referral to one who does. Hospice teams and local aid-in-dying advocacy groups often know which clinicians take part where you live.</p>` },
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
      [`${MAID}/process/`, 'How the process works', 'The usual steps.'],
      [`${MAID}/`, 'Where it is legal', 'Every place we cover.'],
    ],
  }),
];

/* ---------- service and policy pages ---------- */

export const staticPages = [
  {
    path: '/finding-help/',
    title: 'Finding help near you',
    description: 'Independent directories for finding hospice, palliative care, funeral consumer groups, green burial, end-of-life doulas and grief support, in the US and other countries.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Finding help near you</h1>
<p class="lead" style="margin:20px 0">Independent directories, mostly run by nonprofits and governments. We don't list businesses, take payment for listings, or vet the providers in these directories, so ask questions before you choose.</p>
<h2>Hospice and palliative care</h2>
<div class="cards cards-tight">
${dirCard('https://www.medicare.gov/care-compare/?providerType=Hospice', 'Medicare Care Compare', 'US', 'Find hospices, with quality ratings.')}
${dirCard('https://www.hospiceuk.org/', 'Hospice UK', 'UK', 'Hospices and support across the UK.')}
${dirCard('https://www.virtualhospice.ca/', 'Canadian Virtual Hospice', 'Canada', 'Information and support from palliative care experts.')}
${dirCard('https://www.ehospice.com/', 'ehospice', 'International', 'News and services in palliative care worldwide.')}
</div>
<h2>Funerals and burial</h2>
<div class="cards cards-tight">
${dirCard('https://www.funerals.org/', 'Funeral Consumers Alliance', 'US', 'Nonprofit consumer groups; some survey local funeral prices.')}
${dirCard('https://www.greenburialcouncil.org/', 'Green Burial Council', 'US and beyond', 'Certified green burial providers and grounds.')}
</div>
<h2>End-of-life doulas</h2>
<div class="cards cards-tight">
${dirCard('https://www.nedalliance.org/', 'National End-of-Life Doula Alliance', 'US', 'A directory of end-of-life doulas.')}
${dirCard('https://www.inelda.org/', 'INELDA', 'International', 'International End of Life Doula Association directory.')}
</div>
<h2>Grief support</h2>
<div class="cards cards-tight">
${dirCard('https://www.dougy.org/', 'The Dougy Center', 'US', 'Support for grieving children, with a program directory.')}
${dirCard('https://www.compassionatefriends.org/', 'The Compassionate Friends', 'US and beyond', 'For families after the death of a child.')}
</div>
<p>Your local hospice is another good start: most offer free bereavement support, even if the person who died wasn't in their care.</p>
<h2>Medical aid in dying</h2>
<div class="cards cards-tight">
${dirCard('https://wfrtds.org/', 'World Federation of Right to Die Societies', 'International', 'Member organizations by country.')}
<a class="ocard" href="/medical-aid-in-dying/">${iconFor('/medical-aid-in-dying/')}<strong>Our medical aid in dying section</strong><span class="muted small">Where it is legal, with official sources for each place.</span></a>
</div>
<h2>In a crisis</h2>
<p>If you are thinking about suicide, call or text 988 in the US, or <a href="https://findahelpline.com">find a helpline in your country</a>.</p>
</div></section>`,
  },
  {
    path: '/about/',
    title: 'About End of Life Atlas',
    description: 'How End of Life Atlas is funded, how we check facts, and who reviews our guides.',
    body: `
<section class="section"><div class="wrap prose">
<h1>About End of Life Atlas</h1>
<p class="lead" style="margin:20px 0">A single place for everything about the end of life: plain, international, without judgment, and respectful of each person's right to die with dignity.</p>
<section class="founder-note" aria-labelledby="founder-h">
<h2 id="founder-h">A note from the founder</h2>
<p>I built End of Life Atlas because I couldn't find one place that told the whole truth about the end of life.</p>
<p>Anyone who has watched someone they love wither and die knows that most guides don't tell you what it's really like. They tell you what to do, or what to choose. I wanted something different: one place, for anyone in any country, that explains every option plainly, doesn't judge, and respects each person's right to die with dignity.</p>
<p>I'm an expat, and I worry about my mom back in the United States. When you live far from the people you love, you can't just drive over and work things out. You need clear information about the rules where they are, and where you are. That's why this atlas covers more than one country, and why it will keep adding more.</p>
<p>Whatever you're facing, and wherever you are, I hope you find what you need here, and that you feel respected while you look.</p>
<p class="signature">KW</p>
</section>
<h2 id="why">Why this atlas exists</h2>
<p>Planning for the end of life usually means piecing things together from doctors, lawyers, funeral homes, governments and advocacy groups. Each covers one part, often for one country, and some have something to sell or a position to promote. End of Life Atlas brings it together in one place.</p>
<h2 id="principles">What we believe</h2>
<div class="cards cards-tight">
${infoCard('plan', 'One place for all of it', 'From advance directives to grief, including the topics other sites avoid.')}
${infoCard('scale', 'Without judgment', "We explain every legal option and don't steer you toward any of them. The choice belongs to the person whose life it is.")}
${infoCard('globe', 'International', 'People live, own homes and die across borders. We say which country a rule applies to.')}
${infoCard('loved', 'Dignity', 'Every person deserves to die on their own terms, and every family deserves clear, honest information.')}
</div>
<h2 id="funding">How we're funded</h2>
<p><strong>End of Life Atlas is a voluntary site, made only to share information.</strong> It has no business model and needs no funding, so there is no one to please except the people reading it, and no reason to favor any option, provider or point of view.</p>
<p>There is no advertising, no sponsorship, no referral fees and nothing for sale. The guides and checklists are free.</p>
<h2 id="editorial">Editorial and review policy</h2>
<ul>
<li>Facts come from official sources or named reports, linked on the page.</li>
<li>Anything we haven't confirmed is marked "to be verified."</li>
<li>Every month we check the whole site: every outside link, the status of every law we cover, and the key figures (costs, thresholds and fees). We correct anything out of date and record the date. Last check: ${fmtDate(site.lastScan)}.</li>
<li>Each guide also shows when it was written or last revised, and each place page shows when its law was last verified.</li>
<li>We cover legal options only.</li>
</ul>
<p>Spotted an error or something out of date? <a href="/suggestions/">Send a suggestion</a>; you can stay anonymous.</p>
<h2 id="reviewers">Our reviewers</h2>
<p>We're appointing a physician experienced in end-of-life care and an attorney to review our guides. Their names will appear here and on each page they review.</p>
</div></section>`,
  },
  {
    path: '/suggestions/',
    title: 'Send a suggestion',
    description: 'Send a suggestion, correction or question to the person who runs End of Life Atlas. Anonymous if you like: your name and email are optional.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Send a suggestion</h1>
<p class="lead" style="margin:20px 0">Spotted an error, missing something, or have an idea? Tell us here. You can stay anonymous: only the message is required.</p>
<p class="small muted">Your message goes privately to the person who runs this site. Add your email only if you would like a reply. Please don't include medical details or anything you wouldn't want stored. This form isn't monitored for emergencies: if you are in crisis, call or text 988 in the US, or <a href="https://findahelpline.com">find a helpline</a>.</p>
${onNetlify ? `<form class="form suggest-form" name="suggestions" method="POST" action="/suggestions/thanks/" data-netlify="true" netlify-honeypot="company">
<input type="hidden" name="form-name" value="suggestions">
<p hidden><label>Leave this empty <input name="company" tabindex="-1" autocomplete="off"></label></p>
<div class="field" style="flex-basis:100%"><label for="s-topic">What is it about?</label>
<select id="s-topic" name="topic">
<option>A suggestion or idea</option>
<option>A correction or out-of-date information</option>
<option>Something hard to use (accessibility)</option>
<option>A privacy question</option>
<option>Something else</option>
</select></div>
<div class="field" style="flex-basis:100%"><label for="s-message">Your message (required)</label><textarea id="s-message" name="message" rows="7" required></textarea></div>
<div class="field" style="flex-basis:100%"><label for="s-page">Which page? (optional)</label><input id="s-page" name="page" type="text"></div>
<div class="field"><label for="s-name">Your name (optional)</label><input id="s-name" name="name" type="text" autocomplete="name"></div>
<div class="field"><label for="s-email">Your email (optional, only if you want a reply)</label><input id="s-email" name="email" type="email" autocomplete="email"></div>
<button class="btn" type="submit">Send</button>
</form>` : `<div class="notice"><strong>Note:</strong> the suggestions form works on the live site.</div>`}
</div></section>`,
  },
  {
    path: '/suggestions/thanks/',
    title: 'Thank you',
    description: 'Your suggestion was sent.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Thank you</h1>
<p class="lead" style="margin:20px 0">Your message was sent. Every suggestion is read.</p>
<p><a href="/">Back to the home page</a></p>
</div></section>`,
  },
  {
    path: '/privacy/',
    title: 'Privacy',
    description: 'End of Life Atlas collects no personal information: no accounts, forms, email lists or tracking.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Privacy</h1>
<p class="lead" style="margin:20px 0">This is a sensitive subject, so we don't collect anything about you.</p>
<ul>
<li>There are no accounts and no email lists. We use no advertising or tracking cookies.</li>
${analyticsOn ? '<li><strong>Visitor statistics:</strong> we count page views with <a href="https://www.goatcounter.com/">GoatCounter</a>, which uses no cookies, does not collect personal information and does not track you across other sites. It tells us things like which pages are read and roughly which countries visitors come from.</li>' : ''}
<li><strong>Suggestions:</strong> if you use the <a href="/suggestions/">suggestions form</a>, what you write is stored by our host, Netlify, and sent privately to the person who runs the site. Your name and email are optional.</li>
<li>Checklists, the place picker and the Ask assistant run in your browser and save nothing. Questions you type into Ask are not stored or sent anywhere.</li>
<li>Like any website, the site's host (Netlify) keeps standard technical logs, such as IP addresses, to run and protect the site, and the fonts are loaded from Google Fonts, which also sees your IP address. We don't use these to identify or track you.</li>
</ul>
<p>Questions about privacy? <a href="/suggestions/">Send us a message</a>.</p>
</div></section>`,
  },
  {
    path: '/accessibility/',
    title: 'Accessibility',
    description: 'Accessibility statement for End of Life Atlas: our WCAG 2.2 AA and Section 508 goals, how we test, and how to report a problem.',
    body: `
<section class="section"><div class="wrap prose">
<h1>Accessibility</h1>
<p class="lead" style="margin:20px 0">End of Life Atlas should be usable by everyone, including people using screen readers, keyboards, magnification or voice control.</p>
<h2>Our standard</h2>
<p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. That also covers the Section 508 standards, which adopt WCAG Level AA.</p>
<h2>What we do</h2>
<ul>
<li>Every page can be used with a keyboard alone, with a visible focus outline and a "skip to main content" link.</li>
<li>Pages use real headings, landmarks, labeled form fields and table headers, so screen readers can navigate them.</li>
<li>Text and controls meet WCAG color-contrast ratios, and nothing relies on color alone.</li>
<li>Pages work at 400% zoom and on screens 320 pixels wide without sideways scrolling.</li>
<li>Words in other languages are marked, so screen readers pronounce them correctly.</li>
<li>There are no videos, animations, time limits or pop-ups.</li>
<li>Checklists print cleanly for people who prefer paper.</li>
</ul>
<h2>How we test</h2>
<p>Before each update, every page is checked automatically against the WCAG 2.2 A and AA rules (using axe-core) at desktop and phone widths, and for keyboard focus. Automated tests can't catch everything, so we also check pages by hand. Last tested: ${fmtDate(site.lastVerified)}.</p>
<h2>Known limitations</h2>
<p>Some pages link to other organizations' websites and documents, which we can't make accessible ourselves.</p>
<h2>Report a problem</h2>
<p>If something on this site is hard to use, <a href="/suggestions/">send a message</a> and tell us the page and what happened. Where we can, we'll give you the information in another way.</p>
</div></section>`,
  },
  {
    path: '/ask/',
    title: 'Ask a question',
    description: 'Ask a question about the end of life and get answers drawn only from End of Life Atlas pages, with links to read more. Private: nothing is stored or sent.',
    body: `
<section class="section"><div class="wrap prose">
<p class="eyebrow">Ask the Atlas</p>
<h1>Ask a question</h1>
<p class="lead" style="margin:20px 0">Type a question in your own words. Answers come only from this site's guides, with a link to read more.</p>
<p class="small muted">Private: your questions stay in your browser and are not stored or sent anywhere. This is information, not medical or legal advice. If you are in crisis, call or text 988 in the US, or <a href="https://findahelpline.com">find a helpline</a>.</p>
<form id="ask-form" class="form ask-form" role="search" aria-label="Ask the Atlas">
<div class="field"><label for="ask-input">Your question</label><input id="ask-input" name="q" type="text" autocomplete="off" required></div>
<button class="btn" type="submit">Ask</button>
</form>
<div class="ask-try"><span class="small muted">Try:</span>
<button type="button" class="chip" data-ask="What should I do in the first 24 hours after someone dies?">First 24 hours after a death</button>
<button type="button" class="chip" data-ask="How much does a funeral cost?">Funeral costs</button>
<button type="button" class="chip" data-ask="Is euthanasia legal in Canada?">Euthanasia in Canada</button>
<button type="button" class="chip" data-ask="What is a lasting power of attorney?">Lasting power of attorney</button>
<button type="button" class="chip" data-ask="How do I help a child who is grieving?">Helping a grieving child</button>
</div>
<ol id="ask-log" class="ask-log" aria-live="polite" aria-label="Answers"></ol>
<p class="no-print"><button id="ask-clear" type="button" class="btn btn-quiet">Clear answers</button></p>
<noscript><p>The assistant needs JavaScript. You can still browse <a href="/#where">where to start</a>.</p></noscript>
</div></section>
<script src="/assistant.js" defer></script>`,
  },
];

export const notFound = {
  path: '/404.html',
  title: 'Page not found',
  description: 'This page does not exist.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Page not found</h1>
<p class="lead" style="margin:20px 0">That page doesn't exist, or it has moved. These may help:</p>
</div>
<div class="wrap" style="margin-top:8px">${journeyCards()}
<div style="margin-top:24px">${linkCards([['/ask/', 'Ask a question', 'Answers from this site, in your own words.'], ['/checklists/', 'Free printables', 'Worksheets, checklists and remembering books.'], ['/', 'Home page', 'Every part of the end of life.', 'maid']])}</div>
</div></section>`,
};
