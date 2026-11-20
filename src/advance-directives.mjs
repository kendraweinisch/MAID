// Advance directive pages: a hub with every US state, and one page per state
// linking to the official form (or the law that sets it out) and a free
// state-specific form from CaringInfo. Data: src/data/advance-directives.json.
import { readFileSync } from 'node:fs';
import { esc, fmtDate, site, sourcesNote } from './layout.mjs';
import { icons } from './icons.mjs';
import { linkCards } from './ui.mjs';

const data = JSON.parse(readFileSync(new URL('./data/advance-directives.json', import.meta.url), 'utf8'));
export const AD = '/plan-ahead/advance-directives';

const KIND = {
  form: 'Official state form',
  law: 'Form or rules set out in state law',
  info: 'Official state information',
  partner: 'State-recognized source',
};

const CARINGINFO_LINE = 'CaringInfo is the consumer program of the National Alliance for Care at Home, the US hospice and home care association.';

const hero = (eyebrow, title, lead, extra = '') => `
<section class="page-hero">
<div class="wrap prose">
<div class="hero-icon">${icons.plan}</div>
<p class="eyebrow">${eyebrow}</p>
<h1>${title}</h1>
<p class="lead" style="margin-top:20px">${lead}</p>
<p class="small muted" style="margin:0">Links checked ${fmtDate(data.verified)} · Whole site checked for accuracy ${fmtDate(site.lastScan)} · <a href="/about/#editorial">How we check facts</a></p>
${extra}
</div>
</section>`;

const formCard = (kind, label, url, text = '') =>
  `<a class="ocard dcard" href="${esc(url)}"><span class="tag">${esc(kind)}</span><strong>${esc(label)}</strong>${text ? `<span class="muted small">${esc(text)}</span>` : ''}<span class="dcard-host small">${new URL(url).hostname.replace(/^www\./, '')}</span></a>`;

const stepsHtml = `<ol>
<li><strong>Choose your person.</strong> Pick a health care agent (also called a proxy or surrogate) and a backup. Ask them first.</li>
<li><strong>Talk it through.</strong> Tell them what matters to you: what you would go through for more time, and what you would not want.</li>
<li><strong>Fill in the form.</strong> You usually don't need a lawyer. You can skip parts you don't want to answer.</li>
<li><strong>Sign it the way the form says.</strong> Most states require witnesses, a notary, or either one, and limit who can be a witness (often not your agent or a relative). Follow the instructions on the form itself; we don't summarize them here because they are easy to get wrong.</li>
<li><strong>Give copies</strong> to your agent, your backup, your doctor and your hospital. Keep the original where it can be found, not in a safe deposit box.</li>
<li><strong>Review it</strong> after a new diagnosis, a divorce, a death in the family, or a move to another state.</li>
</ol>`;

function statePage(s) {
  const path = `${AD}/${s.slug}/`;
  const official = s.links.length
    ? s.links.map((l) => formCard(KIND[l.kind], l.label, l.url)).join('')
    : '';
  const missing = s.links.length
    ? ''
    : `<p>We could not find a form hosted by the state government of ${esc(s.name)}. The state's law sets out a form you may use; the CaringInfo form below follows it.</p>`;
  const called = s.called ? `<p>In ${esc(s.name)}, the documents are usually called: <strong>${esc(s.called)}</strong>. People often call any of these a living will.</p>` : '';
  const registry = s.registry ? `<h2 id="registry">Registering it</h2><p>${esc(s.registry)} A directive is valid without being registered; registering just helps hospitals find it.</p>` : '';
  const title = `${s.name} advance directive`;
  return {
    path,
    title,
    stateForm: true,
    seoTitle: `${s.name} advance directive and living will forms (free, official)`,
    description: `Free ${s.name} advance directive forms: the official state form or the law that sets it out, a free state-specific form, and how to make it valid.`,
    article: { modified: data.verified },
    body: `${hero('Advance directives by state', esc(title), `Where to get a free ${esc(s.name)} form for your medical wishes and the person who speaks for you, and what to do once it's filled in.`)}
<section class="section">
<div class="wrap prose">
<h2 id="forms">The forms</h2>
${called}
${missing}
<div class="cards" style="margin-top:20px">
${official}
${formCard('Free state form', `${s.name} advance directive from CaringInfo`, s.caringinfo, CARINGINFO_LINE)}
</div>
<p class="small muted">Each state lets you use its form, and most also accept another form that meets the state's rules. If you already have a valid directive, you don't need a new one.</p>
${registry}
<h2 id="steps">Making it count</h2>
${stepsHtml}
<h2 id="elsewhere">If you split your time between places</h2>
<p>Most states honor a directive made in another state if it was valid where it was signed, but hospitals are most comfortable with their own state's form. If you live in two states, or abroad, consider making one for each place. See <a href="/plan-ahead/property-abroad/">property abroad</a> for planning across countries.</p>
<h2 id="polst">Not the same as a POLST</h2>
<p>An advance directive is for the future. If you are seriously ill now, ask your clinician about a POLST (also called MOLST, POST or MOST), a medical order that emergency crews follow. See <a href="/serious-illness/#polst">serious illness</a>.</p>
<h2 id="related">Related</h2>
${linkCards([
      [`${AD}/`, 'Every state', 'Advance directive forms for all 50 states and DC.', 'plan'],
      ['/plan-ahead/', 'Plan ahead', 'Choosing your proxy and having the conversation.', 'plan'],
      ['/checklists/plan-ahead/', 'Plan-ahead worksheet', 'Write down where your directive is kept.', 'printer'],
    ])}
<p class="small muted" style="margin-top:24px">Information, not legal advice. Forms and rules change; the form's own instructions are the final word. Spot a broken link? <a href="/suggestions/">Tell us</a>.</p>
</div>
</section>`,
  };
}

function hub() {
  const cards = data.states
    .map((s) => `<a class="ocard state-card" href="${AD}/${s.slug}/"><strong>${esc(s.name)}</strong><span class="muted small">${s.links.some((l) => l.kind === 'form') ? 'Official form' : 'Form in state law'} + free form</span></a>`)
    .join('');
  return {
    path: `${AD}/`,
    title: 'Advance directive forms by state',
    seoTitle: 'Free advance directive and living will forms for every US state',
    description: 'Free advance directive and living will forms for all 50 US states and DC: the official state form or the law that sets it out, plus a free state-specific form.',
    article: { modified: data.verified },
    faq: [
      ['Do I need a lawyer to make an advance directive?', 'Usually not. Every US state has a form you can fill in yourself for free. You do need to sign it the way the form says, usually with witnesses or a notary.'],
      ['Is a living will the same as an advance directive?', 'A living will is one part of an advance directive: the treatments you would or would not want. The other part names the person who decides for you, called a health care power of attorney, proxy, agent or surrogate depending on the state.'],
      ['Is my advance directive valid in another state?', 'Most states honor a directive that was valid where it was signed, but hospitals are most comfortable with their own state form. If you live in more than one state, consider making one for each.'],
    ],
    body: `${hero('Plan ahead', 'Advance directive forms by state', 'Every US state has a free form for your medical wishes and the person who speaks for you. Choose your state for the official form and a free state-specific one.')}
<section class="section">
<div class="wrap prose">
<h2 id="what">What an advance directive is</h2>
<p>An advance directive is a legal document that says what medical care you want if you can't speak for yourself. It usually has two parts: <strong>instructions</strong> (often called a living will) and <strong>the person who decides for you</strong> (a health care power of attorney, proxy, agent or surrogate). States use different names and forms, but the idea is the same everywhere. More in <a href="/plan-ahead/#directive">plan ahead</a>.</p>
<h2 id="states">Choose your state</h2>
<p>For each state we link the official form where the state government publishes one, or the law that sets the form out, plus a free state-specific form from CaringInfo.</p>
</div>
<div class="wrap">
<div class="cards cards-tight state-grid" style="margin-top:20px">${cards}</div>
</div>
<div class="wrap prose">
<h2 id="steps">Making it count, in any state</h2>
${stepsHtml}
<h2 id="outside-us">Outside the US</h2>
<p>Other countries have their own versions: an advance decision and a lasting power of attorney for health and welfare in England and Wales, an advance care directive and enduring guardian or attorney in Australia, and personal directives or powers of attorney for personal care in Canada, varying by province. See <a href="/plan-ahead/wills-and-trusts/">wills, trusts and the paperwork</a> for those countries.</p>
<h2 id="related">Related</h2>
${linkCards([
      ['/plan-ahead/', 'Plan ahead', 'Choosing your proxy and having the conversation.', 'plan'],
      ['/plan-ahead/talking-with-a-parent/', 'Talking with a parent', 'Including from far away.', 'talk'],
      ['/serious-illness/', 'Serious illness', 'Palliative care, hospice and POLST.', 'illness'],
    ])}
<h2 id="sources">Sources</h2>
${sourcesNote()}
<ul>
<li><a href="https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care">National Institute on Aging: advance care planning</a></li>
<li><a href="https://www.caringinfo.org/planning/advance-directives/by-state/">CaringInfo: advance directive forms by state</a></li>
<li>Each state's official form or law, linked on its page.</li>
</ul>
<p class="small muted">Information, not legal advice. The form's own instructions are the final word.</p>
</div>
</section>`,
  };
}

export const adPages = [hub(), ...data.states.map(statePage)];
