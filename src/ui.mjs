// Shared card pieces used across the site.
import { icons } from './icons.mjs';

// Which icon goes with which part of the site (longest matching path wins).
const ICON_FOR_PATH = [
  ['/plan-ahead/wills-and-trusts/', 'wills'],
  ['/plan-ahead/property-abroad/', 'globe'],
  ['/plan-ahead/talking-with-a-parent/', 'talk'],
  ['/plan-ahead/choices-for-the-body/', 'tree'],
  ['/plan-ahead/', 'plan'],
  ['/serious-illness/', 'illness'],
  ['/last-weeks/', 'lastweeks'],
  ['/after-a-death/', 'afterdeath'],
  ['/grief/', 'grief'],
  ['/medical-aid-in-dying/process/', 'steps'],
  ['/medical-aid-in-dying/families/', 'loved'],
  ['/medical-aid-in-dying/switzerland/', 'globe'],
  ['/medical-aid-in-dying/', 'maid'],
  ['/what-it-costs/', 'costs'],
  ['/finding-help/', 'help'],
  ['/ask/', 'ask'],
  ['/checklists/', 'printer'],
  ['/for-myself/', 'self'],
  ['/for-someone-i-love/', 'loved'],
  ['/about/', 'scale'],
];

export function iconFor(href) {
  const path = href.split('#')[0];
  const hit = ICON_FOR_PATH.find(([p]) => path.startsWith(p));
  return hit ? icons[hit[1]] : '';
}

// One linked card: icon, title, one line.
export const linkCard = (href, title, text, icon = iconFor(href)) =>
  `<a class="ocard" href="${href}">${icon}<strong>${title}</strong>${text ? `<span class="muted small">${text}</span>` : ''}</a>`;

export const linkCards = (items, cls = 'cards cards-tight') =>
  `<div class="${cls}">${items.map(([href, title, text, icon]) => linkCard(href, title, text, icon ? icons[icon] : undefined)).join('')}</div>`;

// A card for an outside directory or source: name, where it covers, what it is.
export const dirCard = (url, name, region, text) =>
  `<a class="ocard dcard" href="${url}"><span class="tag">${region}</span><strong>${name}</strong><span class="muted small">${text}</span><span class="dcard-host small">${new URL(url).hostname.replace(/^www\./, '')}</span></a>`;

// A card that isn't a link (for principles and facts).
export const infoCard = (icon, title, text) =>
  `<div class="ocard ocard-static">${icons[icon] || ''}<strong>${title}</strong><span class="muted small">${text}</span></div>`;
