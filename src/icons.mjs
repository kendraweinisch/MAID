// Simple line icons, drawn for this site. Decorative: always aria-hidden.
const svg = (body) =>
  `<svg class="icon" aria-hidden="true" focusable="false" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const icons = {
  // Guides and sections
  plan: svg('<path d="M12 6h20l6 6v30H12z"/><path d="M32 6v6h6"/><path d="M18 20h14M18 26h14M18 32h9"/>'),
  illness: svg('<path d="M24 40S8 30 8 19a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 11-16 21-16 21z"/><path d="M12 24h7l3-5 4 9 3-4h7"/>'),
  lastweeks: svg('<path d="M20 22h8v20h-8z"/><path d="M24 22v-3"/><path d="M24 17c3-3 3-6 0-10-3 4-3 7 0 10z"/><path d="M14 42h20"/>'),
  afterdeath: svg('<path d="M24 42V24"/><path d="M24 24c-6-1-10-6-10-12 6 0 10 5 10 12z"/><path d="M24 24c6-1 10-6 10-12-6 0-10 5-10 12z"/><path d="M24 24c-2-6 0-12 0-16 0 4 2 10 0 16z"/><path d="M24 34c-4 0-7-2-8-5M24 34c4 0 7-2 8-5"/>'),
  grief: svg('<path d="M24 8c6 8 12 14 12 21a12 12 0 0 1-24 0c0-7 6-13 12-21z"/><path d="M24 24v14M24 30l-5-4M24 33l5-4"/>'),
  maid: svg('<circle cx="24" cy="24" r="17"/><path d="M30 18l-4 10-10 4 4-10z"/><circle cx="24" cy="24" r="1.5"/>'),
  costs: svg('<ellipse cx="24" cy="12" rx="13" ry="5"/><path d="M11 12v8c0 3 6 5 13 5s13-2 13-5v-8"/><path d="M11 20v8c0 3 6 5 13 5s13-2 13-5v-8"/><path d="M11 28v8c0 3 6 5 13 5s13-2 13-5v-8"/>'),
  wills: svg('<path d="M14 6h16l8 8v28H14z"/><path d="M30 6v8h8"/><path d="M19 22h14M19 27h14"/><path d="M19 35c2-2 4-2 5 0s3 2 5 0"/>'),
  globe: svg('<circle cx="24" cy="24" r="17"/><path d="M7 24h34M24 7c5 5 7 11 7 17s-2 12-7 17c-5-5-7-11-7-17s2-12 7-17z"/>'),
  talk: svg('<path d="M6 10h24v15H16l-6 5v-5H6z"/><path d="M34 18h8v15h-4v5l-6-5H20v-4"/>'),
  help: svg('<path d="M24 42V6"/><path d="M24 10h14l4 4-4 4H24"/><path d="M24 22H10l-4 4 4 4h14"/><path d="M18 42h12"/>'),
  ask: svg('<path d="M8 10h32v22H22l-8 7v-7H8z"/><path d="M20 17a4 4 0 1 1 6 3.5c-1.5 1-2 2-2 3.5M24 28v.5"/>'),
  printer: svg('<path d="M14 18V6h20v12"/><path d="M10 18h28a4 4 0 0 1 4 4v12h-8M14 34H6V22a4 4 0 0 1 4-4"/><path d="M14 28h20v14H14z"/><path d="M18 33h12M18 37h8"/>'),
  steps: svg('<circle cx="10" cy="36" r="4"/><circle cx="24" cy="24" r="4"/><circle cx="38" cy="12" r="4"/><path d="M13 33l8-6M27 21l8-6"/>'),
  people: svg('<circle cx="16" cy="16" r="6"/><circle cx="32" cy="16" r="6"/><path d="M4 40c0-7 5-12 12-12s12 5 12 12M28 28c7 0 16 4 16 12"/>'),
  scale: svg('<path d="M24 8v34M14 42h20M10 14h28"/><path d="M10 14l-6 12a6 6 0 0 0 12 0zM38 14l-6 12a6 6 0 0 0 12 0z"/>'),
  // People
  self: svg('<circle cx="24" cy="15" r="7"/><path d="M10 41c0-8 6-14 14-14s14 6 14 14"/><path d="M33 9l3-3M36 13h4"/>'),
  loved: svg('<circle cx="17" cy="16" r="6"/><circle cx="32" cy="18" r="5"/><path d="M5 41c0-7 5-12 12-12 4 0 7 1.5 9 4"/><path d="M25 41c0-5 3-9 7-9s7 4 7 9"/><path d="M24 7c1.5-2 4-2 5 0s-1 4-5 6c-4-2-6-4-5-6s3.5-2 5 0z"/>'),
  // Choices for the body
  burial: svg('<path d="M6 40h36"/><path d="M14 40V20a10 10 0 0 1 20 0v20"/><path d="M24 22v10M20 26h8"/>'),
  mausoleum: svg('<path d="M8 40h32M10 40V20M38 40V20M6 20l18-11 18 11z"/><path d="M18 40V27h12v13M16 20v0M32 20v0"/>'),
  green: svg('<path d="M6 40h36"/><path d="M24 40V24"/><path d="M24 30c-7 0-11-5-11-12 7 0 11 5 11 12z"/><path d="M24 26c6 0 10-4 10-10-6 0-10 4-10 10z"/>'),
  tree: svg('<path d="M24 42V28"/><path d="M24 30c-9 0-14-6-14-12a9 9 0 0 1 9-9 8 8 0 0 1 10 0 9 9 0 0 1 9 9c0 6-5 12-14 12z"/><path d="M16 42h16"/>'),
  cremation: svg('<path d="M24 6c5 6 10 11 10 19a10 10 0 0 1-20 0c0-5 3-8 5-11 1 4 3 6 5 6-2-5-2-9 0-14z"/><path d="M14 42h20"/>'),
  water: svg('<path d="M24 6c6 9 12 15 12 22a12 12 0 0 1-24 0c0-7 6-13 12-22z"/><path d="M18 30a6 6 0 0 0 6 6"/>'),
  compost: svg('<path d="M8 22h32l-4 20H12z"/><path d="M14 22c2-6 6-9 10-9s8 3 10 9"/><path d="M24 13V7M24 7c3-2 6-1 7 1M24 7c-3-2-6-1-7 1"/>'),
  sea: svg('<path d="M4 30c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3"/><path d="M4 38c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3"/><path d="M16 22l8-14 8 14z"/><path d="M24 8v14"/>'),
  ashes: svg('<path d="M16 14h16M18 14c-4 4-6 9-6 14a12 12 0 0 0 24 0c0-5-2-10-6-14"/><path d="M20 8h8v6h-8z"/>'),
  donation: svg('<path d="M24 40S8 30 8 19a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 11-16 21-16 21z"/><path d="M24 22v10M19 27h10"/>'),
  home: svg('<path d="M8 22L24 9l16 13"/><path d="M12 19v21h24V19"/><path d="M21 40V30h6v10"/>'),
};
