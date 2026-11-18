// Simple line icons, drawn for this site. Decorative: always aria-hidden.
const svg = (body) =>
  `<svg class="icon" aria-hidden="true" focusable="false" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const icons = {
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
