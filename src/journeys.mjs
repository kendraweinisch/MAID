// Two guided journeys: planning for yourself, and planning for someone you love.
// Each is a trail of numbered stops, grouped into phases. Visitors can tick a
// stop as done; that is saved only in their own browser (public/journey.js).
import { icons } from './icons.mjs';

const MAID = '/medical-aid-in-dying';

const myself = {
  slug: 'myself',
  path: '/for-myself/',
  title: "I'm planning for myself",
  icon: icons.self,
  description: 'A step-by-step path for planning your own end of life: your wishes, your people, your documents, your body, your words and your family.',
  lead: "Twelve stops, in a sensible order. You don't have to do them all at once, and you can skip any that don't apply. Tick each one as you go.",
  phases: [
    {
      h: 'Decide what you want',
      stops: [
        { id: 'matters', t: 'Think about what matters to you', d: 'What would make life not worth living, what you would go through for more time, and where you would want to be at the end.', links: [['/plan-ahead/#talk', 'Questions to think about']] },
        { id: 'people', t: 'Choose your people', d: 'A health care proxy, a backup, an executor, and one person who knows where everything is.', links: [['/plan-ahead/#proxy', 'Choosing a proxy'], ['/plan-ahead/#steward', 'The one trusted person']] },
        { id: 'body', t: 'Decide what happens to your body', d: 'Burial, cremation, green burial, under a tree, at sea, composting, donation, and more.', links: [['/plan-ahead/choices-for-the-body/', 'Every choice for the body']] },
        { id: 'gathering', t: 'Plan the gathering', d: 'A funeral, a celebration of life, a party, or nothing at all. Music, words and people.', links: [['/checklists/funeral-planner/', 'Funeral or celebration of life planner']] },
      ],
    },
    {
      h: 'Put it in writing',
      stops: [
        { id: 'medical', t: 'Write down your medical wishes', d: "An advance directive and health care power of attorney, on your state's or country's form.", links: [['/plan-ahead/advance-directives/', 'Your state\'s form'], ['/plan-ahead/#directive', 'Advance directives']] },
        { id: 'will', t: 'Make a will and the money documents', d: 'A will, a financial power of attorney, and up-to-date beneficiaries. Rules differ by state and country.', links: [['/plan-ahead/wills-and-trusts/', 'Wills, trusts and the paperwork'], ['/plan-ahead/property-abroad/', 'Property abroad']] },
        { id: 'words', t: 'Leave your words', d: 'Letters for the people you love, and your life story in your own words.', links: [['/checklists/letters-to-leave/', 'Letters to leave'], ['/checklists/life-story/', 'My life story']] },
        { id: 'one-place', t: 'Put everything in one place', d: 'Where your documents are, your accounts, your digital life, and who to call.', links: [['/checklists/plan-ahead/', 'Plan-ahead worksheet'], ['/plan-ahead/wills-and-trusts/#digital', 'Your digital life']] },
      ],
    },
    {
      h: 'Share it and keep it current',
      stops: [
        { id: 'costs', t: 'Know what it may cost', d: 'Care, funerals and the choices that cost less.', links: [['/what-it-costs/', 'What it costs']] },
        { id: 'tell', t: 'Tell your family', d: 'Give copies to your proxy and executor, and talk through what you decided.', links: [['/plan-ahead/#talk', 'Having the conversation']] },
        { id: 'ill', t: 'If you become seriously ill', d: 'Palliative care, hospice, medical orders, questions for your doctor, and every choice near the end.', links: [['/serious-illness/', 'Serious illness'], ['/serious-illness/choices-near-the-end/', 'Choices near the end'], ['/checklists/questions-for-the-doctor/', 'Questions for the doctor']] },
        { id: 'review', t: 'Review it every few years', d: 'And after a marriage, divorce, birth, death, move or diagnosis.', links: [['/plan-ahead/#review', 'Keeping it current']] },
      ],
    },
  ],
};

const lovedOne = {
  slug: 'loved-one',
  path: '/for-someone-i-love/',
  title: "I'm planning for someone I love",
  icon: icons.loved,
  description: 'A step-by-step path for helping a parent, partner or friend: while they are well, through serious illness and the last weeks, after they die, and in grief.',
  lead: 'Start wherever you are. Each stage has a few stops; tick them as you go. If you live far away, there is help for that too.',
  phases: [
    {
      h: 'While they are well',
      stops: [
        { id: 'talk', t: 'Start the conversation', d: 'Gentle ways to ask what they want, with space to write down their answers.', links: [['/plan-ahead/talking-with-a-parent/', 'Talking with a parent'], ['/checklists/talking-with-a-parent/', 'Conversation sheet']] },
        { id: 'documents', t: 'Help them get their documents in order', d: 'An advance directive, a will, powers of attorney, and a list of where everything is.', links: [['/plan-ahead/advance-directives/', 'Advance directive forms by state'], ['/plan-ahead/wills-and-trusts/', 'Wills, trusts and the paperwork'], ['/checklists/plan-ahead/', 'Plan-ahead worksheet']] },
        { id: 'far', t: 'If you live far away', d: 'Video calls, local helpers, copies of key papers, and being their proxy across time zones.', links: [['/plan-ahead/talking-with-a-parent/#far', 'When you live far away']] },
      ],
    },
    {
      h: 'If they are seriously ill',
      stops: [
        { id: 'comfort-care', t: 'Ask about comfort care early', d: 'Palliative care can start at any stage. Many families wish they had known about hospice sooner.', links: [['/serious-illness/#palliative', 'Palliative care'], ['/serious-illness/#hospice', 'Hospice']] },
        { id: 'appointments', t: 'Go to appointments prepared', d: 'What to ask, and someone to take notes.', links: [['/checklists/questions-for-the-doctor/', 'Questions for the doctor']] },
        { id: 'caregiver', t: 'Look after yourself as a caregiver', d: 'Ask for specific help, and for respite care.', links: [['/serious-illness/#caregivers', 'If you are the caregiver']] },
        { id: 'choices', t: 'Respect their choices', d: 'Every treatment, comfort care only, or medical aid in dying where it is legal: the choice is theirs.', links: [['/serious-illness/choices-near-the-end/', 'Choices near the end'], [`${MAID}/families/`, 'Medical aid in dying: for families']] },
      ],
    },
    {
      h: 'In the last weeks',
      stops: [
        { id: 'expect', t: 'Know what to expect', d: 'An honest account of what dying can be like, so it does not come as a shock.', links: [['/last-weeks/#honest', 'What dying can really be like']] },
        { id: 'suffering', t: 'Ease suffering and protect their dignity', d: 'Push the care team about pain and distress, and ask them what dignity means to them.', links: [['/last-weeks/#comfort', 'Easing suffering'], ['/last-weeks/#dignity', 'Dignity, in their terms']] },
        { id: 'moment', t: 'Prepare for the moment of death', d: 'Who to call, and the checklist close at hand.', links: [['/last-weeks/#prepare', 'Preparing'], ['/checklists/after-a-death/', 'First 24 hours checklist']] },
      ],
    },
    {
      h: 'After they die',
      stops: [
        { id: 'first-day', t: 'The first 24 hours', d: 'Very little is urgent. Who to call first, and what can wait.', links: [['/after-a-death/#first-hours', 'The first hours'], ['/checklists/after-a-death/', 'Printable checklist']] },
        { id: 'funeral', t: 'Arrange the funeral or gathering', d: 'Every option for the body, your rights with funeral homes, and what it costs.', links: [['/plan-ahead/choices-for-the-body/', 'Every choice for the body'], ['/checklists/funeral-planner/', 'Funeral planner'], ['/what-it-costs/#funeral', 'Funeral costs']] },
        { id: 'eulogy', t: 'Write the eulogy', d: 'One true story beats a list of qualities.', links: [['/checklists/eulogy/', 'Writing a eulogy']] },
        { id: 'estate', t: 'Handle the paperwork and the estate', d: 'Death certificates, notifying agencies and banks, and probate.', links: [['/after-a-death/#first-month', 'The first month'], ['/after-a-death/#probate', 'Probate and the estate']] },
      ],
    },
    {
      h: 'Grief',
      stops: [
        { id: 'your-grief', t: 'Your own grief', d: "What's normal, grief before a death, and after watching a hard death.", links: [['/grief/', 'Grief']] },
        { id: 'children', t: 'Helping children', d: 'Plain words, honest answers, and remembering books to fill in together.', links: [['/grief/#children', 'Helping children'], ['/checklists/remembering-someone/', 'Remembering books']] },
        { id: 'support', t: 'Find support', d: 'Hospice bereavement services, grief groups and counselors.', links: [['/finding-help/', 'Finding help near you']] },
      ],
    },
  ],
};

const EN = {
  eyebrow: 'A step-by-step path',
  start: (n) => `${n} stops. Your ticks are saved only in this browser.`,
  progress: '{done} of {total} stops done. Your ticks are saved only in this browser.',
  done: 'Done',
  also: 'Also',
  others: { myself: ['/for-someone-i-love/', "I'm planning for someone I love"], 'loved-one': ['/for-myself/', "I'm planning for myself"] },
  extra: '<a href="/ask/">Ask a question</a> · <a href="/checklists/">All printables</a>',
};

export function journeyPage(j, t = EN) {
  let n = 0;
  const total = j.phases.reduce((s, p) => s + p.stops.length, 0);
  const phases = j.phases
    .map(
      (ph) => `<h2>${ph.h}</h2>
<ol class="trail" start="${n + 1}">
${ph.stops
  .map((st) => {
    n += 1;
    const id = `${j.slug}-${st.id}`; // the same key in every language, so ticks carry over
    return `<li class="stop" id="${st.id}">
<span class="stop-n" aria-hidden="true">${n}</span>
<div class="stop-card">
<h3>${st.t}</h3>
<p>${st.d}</p>
<p class="stop-links">${st.links.map(([href, label]) => `<a class="chip-link" href="${href}">${label}</a>`).join(' ')}</p>
<p class="stop-done"><input type="checkbox" id="done-${id}" data-step="${id}"> <label for="done-${id}">${t.done}<span class="sr-only">: ${st.t}</span></label></p>
</div>
</li>`;
  })
  .join('\n')}
</ol>`
    )
    .join('\n');
  const other = t.others[j.slug];
  return {
    path: j.path,
    title: j.title,
    description: j.description,
    body: `
<section class="page-hero">
<div class="wrap prose">
<div class="journey-icon">${j.icon}</div>
<p class="eyebrow">${t.eyebrow}</p>
<h1>${j.title}</h1>
<p class="lead" style="margin-top:20px">${j.lead}</p>
<p class="journey-progress small" data-journey="${j.slug}" data-total="${total}" data-template="${t.progress}" aria-live="polite">${t.start(total)}</p>
</div>
</section>
<section class="section">
<div class="wrap prose">
${phases}
<div class="notice" style="margin-top:48px"><strong>${t.also}:</strong> <a href="${other[0]}">${other[1]}</a> · ${t.extra}</div>
</div>
</section>
<script src="/journey.js" defer></script>`,
  };
}

export const journeys = [journeyPage(myself), journeyPage(lovedOne)];
export const journeyMeta = [myself, lovedOne];
