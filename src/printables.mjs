import { readFileSync } from 'node:fs';

const META = JSON.parse(readFileSync(new URL('./data/printables-meta.json', import.meta.url), 'utf8'));
const CARD = {
  'plan-ahead': ['Planning ahead', 'Your people, documents, money, digital life and wishes, all in one place.'],
  'funeral-planner': ['Planning ahead', 'For your own funeral or gathering, or one for someone who has died.'],
  'talking-with-a-parent': ['Planning ahead', 'Gentle questions to ask, with space to write the answers.'],
  'letters-to-leave': ['Planning ahead', 'Prompts for letters to be read later, and how to make sure they arrive.'],
  'life-story': ['Planning ahead', 'Tell your story in your own words, so your family can tell it your way.'],
  'questions-for-the-doctor': ['Serious illness', 'What to ask after a diagnosis, about comfort care and hospice.'],
  'after-a-death': ['After a death', 'Who to call first, what to do within the day, and what can wait.'],
  'eulogy': ['After a death', 'Prompts, a simple three-part shape, and space to draft.'],
  'remembering-someone': ['For children', 'Drawing and writing pages about someone they love who died.'],
  'remembering-grandparent': ['For children', 'Family stories, memories and recipes from a grandparent.'],
  'remembering-pet': ['For children', 'Favorite moments, feelings and drawings for a pet who died.'],
};

// A card for one printable: a picture of its first page, what it is, and download links.
export function printCard(slug, title) {
  const [tag, short] = CARD[slug] || ['Printable', ''];
  const m = META[slug] || { pages: 1, kb: 100 };
  return `<article class="pcard">
<div class="pcard-thumb"><img src="/thumbs/${slug}.png" alt="" width="367" height="475" loading="lazy"></div>
<div class="pcard-body">
<p class="tag">Free printable · ${tag}</p>
<h3><a href="/checklists/${slug}/">${title}</a></h3>
<p class="muted small">${short}</p>
<p class="pcard-actions"><a class="btn btn-small" href="/printables/${slug}.pdf" download>Download PDF<span class="sr-only">: ${title}</span></a> <a class="small" href="/checklists/${slug}/">Open and print<span class="sr-only">: ${title}</span></a></p>
<p class="small muted pcard-meta">${m.pages} ${m.pages === 1 ? 'page' : 'pages'} · ${m.kb} KB PDF</p>
</div>
</article>`;
}

// Search-friendly titles for the printables.
export const PRINT_SEO = {
  'plan-ahead': 'End-of-life planning worksheet (free printable)',
  'funeral-planner': 'Funeral and celebration of life planning checklist (free printable)',
  'talking-with-a-parent': 'Questions to ask aging parents about end-of-life wishes (free printable)',
  'letters-to-leave': 'Letters to leave for loved ones: prompts (free printable)',
  'life-story': 'Write your own obituary and life story (free printable)',
  'questions-for-the-doctor': 'Questions to ask the doctor after a serious diagnosis (free printable)',
  'after-a-death': 'What to do when someone dies: first 24 hours checklist (free printable)',
  'eulogy': 'How to write a eulogy: prompts and template (free printable)',
  'remembering-someone': "Children's grief workbook: a remembering book (free printable)",
  'remembering-grandparent': "Children's grief workbook for the death of a grandparent (free printable)",
  'remembering-pet': "Children's pet loss workbook (free printable)",
};

// The panel at the top of each printable: a picture of the page and download buttons.
export function dlPanel(slug) {
  const m = META[slug];
  if (!m) return `<p class="no-print"><button class="btn" type="button" onclick="window.print()">Print this</button></p>`;
  return `<div class="dl-panel no-print">
<img src="/thumbs/${slug}.png" alt="" width="367" height="475">
<div>
<p class="tag">Free printable · ${(CARD[slug] || ['Printable'])[0]}</p>
<p class="dl-meta">${m.pages} ${m.pages === 1 ? 'page' : 'pages'} · ${m.kb} KB PDF · No sign-up</p>
<div class="actions"><a class="btn" href="/printables/${slug}.pdf" download>Download PDF</a><button class="btn btn-quiet" type="button" onclick="window.print()">Print this page</button></div>
<p class="small muted" style="margin:12px 0 0">Fill it in by hand, and keep it where your family can find it.</p>
</div>
</div>`;
}

// Printable worksheets and workbooks: free, no account, made to be printed
// and filled in by hand. All writing space is decorative (aria-hidden) so
// screen readers hear only the prompts.

const lines = (n) => `<div class="write-lines" style="--lines:${n}" aria-hidden="true"></div>`;
const drawBox = (h = 260) => `<div class="draw-box" style="height:${h}px" aria-hidden="true"></div>`;
const blank = '<span class="blank" aria-hidden="true"></span>';

const printButton = `<p class="no-print"><button class="btn" type="button" onclick="window.print()">Print this</button></p>`;
const footer = `<p class="muted small print-only">From End of Life Atlas · eolatlas.com · Free to print and share.</p>`;

function page({ path, title, description, kind, lead, intro = '', body }) {
  return {
    path,
    title,
    seoTitle: PRINT_SEO[path.split('/')[2]],
    description,
    body: `
<section class="section">
<div class="wrap prose">
<p class="small no-print"><a href="/checklists/">All printables</a></p>
<p class="eyebrow">${kind}</p>
<h1>${title}</h1>
<p class="lead" style="margin:20px 0">${lead}</p>
${dlPanel(path.split('/')[2])}
${intro}
${body}
${footer}
</div>
</section>`,
  };
}

// A workbook: sections of prompts, each followed by lines or a drawing box.
function workbook({ path, title, description, kind = 'Printable workbook', lead, intro, sections }) {
  const body = sections
    .map(
      (s) => `<div class="wb-page">
<h2>${s.h}</h2>
${s.note ? `<p class="muted">${s.note}</p>` : ''}
${s.prompts
  .map((p) => `<div class="prompt"><p><strong>${p.q}</strong></p>${p.draw ? drawBox(p.draw) : lines(p.lines || 3)}</div>`)
  .join('\n')}
</div>`
    )
    .join('\n');
  return page({ path, title, description, kind, lead, intro, body });
}

// A checklist with tick boxes; items may contain fill-in blanks.
function checklist({ path, title, description, lead, intro, groups, note }) {
  const body =
    groups.map((g) => `<h2>${g.h}</h2>\n<ul class="check">${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('\n') +
    (note ? `<p class="muted small">${note}</p>` : '');
  return page({ path, title, description, kind: 'Printable checklist', lead, intro, body });
}

/* ---------- for planning ---------- */

export const funeralPlanner = checklist({
  path: '/checklists/funeral-planner/',
  title: 'Funeral or celebration of life planner',
  description: 'A printable planner for a funeral, memorial or celebration of life: the body, the gathering, the people, music, words and the get-together afterward.',
  lead: "Use it to plan your own, so no one has to guess, or to plan one for someone who has died. Skip anything that doesn't fit.",
  groups: [
    { h: 'The body', items: [`Burial / mausoleum / green or woodland burial / cremation / water cremation / human composting / burial at sea / body donation / other: ${blank}`, `If ashes: keep / bury / scatter (where) / plant with a tree / divide: ${blank}`, `Where the body or ashes should rest: ${blank}`, `Clothing, jewelry or objects to include: ${blank}`, `Viewing or no viewing: ${blank}`] },
    { h: 'The gathering', items: [`Kind of gathering: funeral, memorial, celebration of life, religious service, nothing formal: ${blank}`, `Where: ${blank}`, `When (it can be weeks later): ${blank}`, `Who leads it: ${blank}`, `Mood: quiet, joyful, a mix: ${blank}`] },
    { h: 'Words and music', items: [`Music to play: ${blank}`, `Readings, poems or prayers: ${blank}`, `Who should speak: ${blank}`, `Anything that must not be said or played: ${blank}`] },
    { h: 'People', items: [`People who must be told personally: ${blank}`, `People to invite: ${blank}`, `Who handles the guest list and messages: ${blank}`] },
    { h: 'Afterward', items: [`A meal, drinks or a party: where and who hosts: ${blank}`, `Food, songs or traditions to include: ${blank}`, `Flowers, or donations to: ${blank}`, `Photos, a slideshow or a memory table: ${blank}`] },
    { h: 'Practical', items: [`Budget: ${blank}`, 'Ask funeral providers for written, itemized prices.', `Obituary or death notice: who writes it, where it runs: ${blank}`] },
  ],
  note: 'Planning your own? Keep this with your plan-ahead worksheet and tell someone where it is.',
});

export const parentConversation = workbook({
  path: '/checklists/talking-with-a-parent/',
  title: 'Talking with a parent about the end of life',
  kind: 'Printable conversation sheet',
  description: 'A printable sheet of gentle questions to ask a parent about their wishes, with space to write their answers, including when you live far away.',
  lead: "One conversation won't cover everything. Pick two or three questions, and come back to the rest another time.",
  intro: `<p>Read the full guide first: <a href="/plan-ahead/talking-with-a-parent/">talking with a parent, near or far</a>.</p>`,
  sections: [
    { h: 'What matters to them', prompts: [{ q: 'What makes a good day for you now?' }, { q: "If you got very sick, what would matter most to you? What would you not want?" }, { q: 'Where would you want to be at the end?' }] },
    { h: 'Who decides', prompts: [{ q: "If you couldn't speak for yourself, who should make decisions about your care?" }, { q: 'Have you written that down anywhere? Where is it?' }] },
    { h: 'Where things are', prompts: [{ q: 'Where do you keep your will, insurance and bank details?' }, { q: 'Who is your doctor, lawyer or financial adviser?' }] },
    { h: 'Afterward', prompts: [{ q: 'What would you want for your body and for a funeral or gathering?' }, { q: 'Is there music, a reading, or a story you want shared?' }] },
    { h: 'Notes for me', prompts: [{ q: 'What I want to remember from this conversation:', lines: 5 }, { q: 'What we still need to talk about:', lines: 3 }] },
  ],
});

export const eulogyGuide = workbook({
  path: '/checklists/eulogy/',
  title: 'Writing a eulogy',
  kind: 'Printable guide',
  description: 'A printable guide to writing a eulogy: prompts to gather memories, a simple three-part shape, and space to draft.',
  lead: "A eulogy doesn't need to sum up a whole life. It needs to sound like them, and like you.",
  intro: `<ul>
<li><strong>Aim for three to five minutes,</strong> about 400 to 700 words, unless you've been asked for more.</li>
<li><strong>One true story beats a list of qualities.</strong> Instead of "she was generous," tell the time she gave away her coat.</li>
<li><strong>It's fine to be funny,</strong> and fine to cry. Print it in large type and bring water.</li>
</ul>`,
  sections: [
    { h: 'Gather', note: 'Jot quick notes. You will not use all of them.', prompts: [{ q: 'Three words people would use to describe them:' , lines: 2 }, { q: 'A story that shows who they were:', lines: 5 }, { q: 'Something they always said or did:', lines: 2 }, { q: 'What they cared about most:', lines: 3 }, { q: 'What you learned from them:', lines: 3 }] },
    { h: 'Shape it in three parts', prompts: [{ q: '1. Who they were: an opening line or image that sounds like them.', lines: 4 }, { q: '2. A story or two that shows it.', lines: 6 }, { q: '3. What they leave us, and your goodbye.', lines: 4 }] },
    { h: 'Draft', prompts: [{ q: 'Write it straight through. Fix it later.', lines: 18 }] },
  ],
});

export const lettersToLeave = workbook({
  path: '/checklists/letters-to-leave/',
  title: 'Letters to leave',
  kind: 'Printable worksheet',
  description: 'A printable worksheet for writing letters to be read after you die: who to write to, prompts, and how to make sure they are delivered.',
  lead: 'A letter can say what is hard to say aloud. Many families say a letter was the thing they treasured most.',
  intro: `<h2>Making sure they arrive</h2>
<ul>
<li>Seal each letter and write on the envelope who it is for and when to open it.</li>
<li>Keep them with your will or plan-ahead worksheet, and tell your executor or one trusted person where they are.</li>
<li>For a child, you can write letters for later milestones: a graduation, a wedding, the birth of a child.</li>
</ul>`,
  sections: [
    { h: 'Who I want to write to', prompts: [{ q: 'Names, and anything special about when each letter should be read:', lines: 5 }] },
    { h: 'Prompts', note: 'Use any that help. Skip the rest.', prompts: [{ q: 'What I want you to know about how I feel about you:', lines: 4 }, { q: 'A memory of us I treasure:', lines: 4 }, { q: 'What I hope for you:', lines: 4 }, { q: "Something I want to say sorry for, or that I forgive:", lines: 3 }, { q: "What I'd want you to do when you miss me:", lines: 3 }] },
  ],
});

export const lifeStory = workbook({
  path: '/checklists/life-story/',
  title: 'My life story',
  kind: 'Printable worksheet',
  description: 'A printable worksheet to write your own life story in your own words, to help your family write an obituary or memorial page you would approve of.',
  lead: 'Your family will want to tell your story. Help them tell it the way you would.',
  sections: [
    { h: 'The facts', prompts: [{ q: 'Full name, and any names you were known by:', lines: 2 }, { q: 'Where and when you were born, and where you have lived:', lines: 3 }, { q: 'Family: the people you would want named:', lines: 3 }, { q: 'Work, study, service:', lines: 3 }] },
    { h: 'The story', prompts: [{ q: 'What you are proudest of:', lines: 3 }, { q: 'What you loved doing:', lines: 3 }, { q: 'A turning point in your life:', lines: 3 }, { q: 'How you would like to be remembered:', lines: 3 }] },
    { h: 'Preferences', prompts: [{ q: 'A photo you would like used (describe where it is):', lines: 2 }, { q: 'Anything you do not want mentioned:', lines: 2 }, { q: 'Where an obituary or notice should run, if anywhere:', lines: 2 }] },
  ],
});

/* ---------- for children ---------- */

const forGrownups = (extra) => `<div class="notice"><strong>For the grown-up:</strong> Go at the child's pace. Let them choose which pages to do, draw instead of write, or stop. Use plain words like "died." ${extra} More help: <a href="/grief/#children">helping children grieve</a>.</div>`;

export const rememberingSomeone = workbook({
  path: '/checklists/remembering-someone/',
  title: 'Someone I love: a remembering book',
  kind: 'Printable workbook for children',
  description: 'A free printable remembering book for a child after someone they love has died: drawing and writing pages about the person, memories and feelings.',
  lead: 'A book to fill in about someone special who died.',
  intro: forGrownups('Younger children may want you to write while they talk.'),
  sections: [
    { h: 'This is my book', prompts: [{ q: 'My name is:', lines: 1 }, { q: 'This book is about:', lines: 1 }, { q: 'Draw a picture of them, or stick in a photo.', draw: 300 }] },
    { h: 'All about them', prompts: [{ q: 'They were my:', lines: 1 }, { q: 'Their favorite things were:', lines: 3 }, { q: 'Something funny they did:', lines: 3 }] },
    { h: 'Our memories', prompts: [{ q: 'My favorite time with them:', lines: 3 }, { q: 'Draw a place we went together.', draw: 260 }] },
    { h: 'My feelings', note: 'All feelings are OK. Sad, angry, confused, even happy.', prompts: [{ q: 'Today I feel:', lines: 2 }, { q: 'When I miss them, I can:', lines: 3 }, { q: 'Draw how your feelings look today.', draw: 220 }] },
    { h: 'What I want to say', prompts: [{ q: 'If I could tell them one thing, I would say:', lines: 4 }] },
  ],
});

export const rememberingGrandparent = workbook({
  path: '/checklists/remembering-grandparent/',
  title: 'My grandparent: a remembering book',
  kind: 'Printable workbook for children',
  description: 'A free printable remembering book for a child whose grandparent has died: family history, stories, recipes and memories.',
  lead: 'A book to fill in about your grandparent, and the family stories you want to keep.',
  intro: forGrownups('This book is a good one to fill in together with other relatives, who can add stories the child never heard.'),
  sections: [
    { h: 'My grandparent', prompts: [{ q: 'I called them:', lines: 1 }, { q: 'Draw them, or stick in a photo.', draw: 300 }] },
    { h: 'Where we come from', prompts: [{ q: 'Where they grew up:', lines: 2 }, { q: 'A story from when they were young (ask a grown-up!):', lines: 4 }, { q: 'Draw our family tree.', draw: 300 }] },
    { h: 'Things they taught me', prompts: [{ q: 'Something they showed me how to do:', lines: 3 }, { q: 'A saying or a word they always used:', lines: 2 }, { q: 'A food or recipe I remember:', lines: 3 }] },
    { h: 'Our time together', prompts: [{ q: 'My favorite memory:', lines: 4 }, { q: 'Today I feel:', lines: 2 }, { q: 'What I want to keep doing to remember them:', lines: 3 }] },
  ],
});

export const rememberingPet = workbook({
  path: '/checklists/remembering-pet/',
  title: 'My pet: a remembering book',
  kind: 'Printable workbook for children',
  description: 'A free printable remembering book for a child after a pet has died: drawings, favorite moments and feelings.',
  lead: 'A book to fill in about your pet.',
  intro: forGrownups('For many children, a pet is their first experience of death. Honest, simple answers help.'),
  sections: [
    { h: 'My pet', prompts: [{ q: "My pet's name:", lines: 1 }, { q: 'What kind of animal they were:', lines: 1 }, { q: 'Draw your pet.', draw: 300 }] },
    { h: 'All about them', prompts: [{ q: 'Their favorite things to do:', lines: 3 }, { q: 'Their favorite food or toy:', lines: 2 }, { q: 'Something silly they did:', lines: 3 }] },
    { h: 'Remembering', prompts: [{ q: 'My favorite moment with them:', lines: 3 }, { q: 'How I feel now:', lines: 2 }, { q: 'Draw a picture for your pet.', draw: 260 }] },
  ],
});

/* ---------- index ---------- */

export function printablesIndex(existing) {
  const groups = [
    ['Planning ahead', [existing.planAhead, funeralPlanner, parentConversation, lettersToLeave, lifeStory]],
    ['Serious illness and after a death', [existing.doctor, existing.afterDeath, eulogyGuide]],
    ['For children who are grieving', [rememberingSomeone, rememberingGrandparent, rememberingPet]],
  ];
  const cards = (list) =>
    `<div class="cards" style="margin:20px 0 56px">${list.map((c) => printCard(c.path.split('/')[2], c.title)).join('')}</div>`;
  return {
    path: '/checklists/',
    title: 'Free printables',
    description: 'Free printable end-of-life worksheets, checklists and children\'s remembering books. No account, no email.',
    body: `
<section class="section"><div class="wrap">
<h1>Free printables</h1>
<p class="lead" style="margin:20px 0 40px">Worksheets, checklists and remembering books. Free, no account, no email. Print them, fill them in by hand, and keep them where your family can find them.</p>
<div class="card binder-promo"><p class="tag">Everything at once</p><h2 style="margin-top:4px"><a href="/checklists/binder/">The End of Life Atlas binder</a></h2><p class="muted">All eleven printables in one PDF, with a cover and contents page. Print it once and keep it in a binder.</p><p><a class="btn btn-small" href="/printables/binder.pdf" download>Download the binder (PDF)</a> <a class="small" href="/checklists/binder/">What's in it</a></p></div>
${groups.map(([h, list]) => `<h2>${h}</h2>${cards(list)}`).join('\n')}
</div></section>`,
  };
}

/* ---------- the whole binder ---------- */

// Every printable in one PDF, in this order, after a cover and contents page.
// scripts/make-binder.py joins the PDFs; page numbers come from printables-meta.json.
export const BINDER = [
  ['Planning ahead', [['plan-ahead', 'Plan-ahead worksheet'], ['funeral-planner', 'Funeral or celebration of life planner'], ['talking-with-a-parent', 'Talking with a parent about the end of life'], ['letters-to-leave', 'Letters to leave'], ['life-story', 'My life story']]],
  ['Serious illness and after a death', [['questions-for-the-doctor', 'Questions for the doctor'], ['after-a-death', 'After a death: the first 24 hours'], ['eulogy', 'Writing a eulogy']]],
  ['For children who are grieving', [['remembering-someone', 'Someone I love: a remembering book'], ['remembering-grandparent', 'My grandparent: a remembering book'], ['remembering-pet', 'My pet: a remembering book']]],
];
const BINDER_FRONT_PAGES = 2; // the cover and the contents page

export function binderPage() {
  let n = BINDER_FRONT_PAGES + 1;
  const total = BINDER.flatMap(([, l]) => l).reduce((t, [slug]) => t + ((META[slug] || {}).pages || 1), 0) + BINDER_FRONT_PAGES;
  const m = META.binder;
  const rows = BINDER.map(([h, list]) => `<h3>${h}</h3><ul class="binder-toc">${list
    .map(([slug, title]) => {
      const row = `<li><a href="/checklists/${slug}/">${title}</a><span class="pg"><span class="sr-only">page </span>${n}</span></li>`;
      n += (META[slug] || {}).pages || 1;
      return row;
    })
    .join('')}</ul>`).join('\n');
  return {
    path: '/checklists/binder/',
    title: 'The End of Life Atlas binder',
    seoTitle: 'Free end-of-life planning binder: every worksheet in one printable PDF',
    description: 'Every End of Life Atlas worksheet, checklist and remembering book in one free printable PDF, with a cover and contents page. No account, no email.',
    body: `
<section class="section">
<div class="wrap prose">
<p class="small no-print"><a href="/checklists/">All printables</a></p>
<div class="binder-cover">
<p class="eyebrow">Free printable binder</p>
<h1>The End of Life Atlas binder</h1>
<p class="lead" style="margin:20px 0">Every worksheet, checklist and remembering book in one PDF. Print it, put it in a binder, fill in what you can, and tell someone where it is.</p>
<div class="binder-for print-only">
<p>This binder belongs to: <span class="blank" aria-hidden="true"></span></p>
<p>If you are reading this because I can't speak for myself or have died, start with the plan-ahead worksheet. My advance directive is kept: <span class="blank" aria-hidden="true"></span></p>
<p>Started on: <span class="blank" aria-hidden="true"></span> Last updated: <span class="blank" aria-hidden="true"></span></p>
</div>
</div>
${m ? `<div class="dl-panel no-print"><img src="/thumbs/binder.png" alt="" width="367" height="475"><div><p class="tag">Free printable · Everything</p><p class="dl-meta">${m.pages} pages · ${(m.kb / 1024).toFixed(1)} MB PDF · No sign-up</p><div class="actions"><a class="btn" href="/printables/binder.pdf" download>Download the binder (PDF)</a></div><p class="small muted" style="margin:12px 0 0">Or print only the parts you need from the <a href="/checklists/">printables page</a>.</p></div></div>` : ''}
<div class="binder-contents">
<h2>Contents</h2>
<p class="muted small">${total} pages. Fill in by hand. Skip anything that doesn't fit.</p>
${rows}
<p class="muted small">Your state's advance directive form is not included, because each state has its own: find yours at eolatlas.com/plan-ahead/advance-directives/ and keep it in this binder.</p>
</div>
${footer}
</div>
</section>`,
  };
}

export const printables = [funeralPlanner, parentConversation, eulogyGuide, lettersToLeave, lifeStory, rememberingSomeone, rememberingGrandparent, rememberingPet];
