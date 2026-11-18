// Builds the knowledge base for the "Ask" assistant from the site's own pages.
// Each page is split into sections at its <h2> headings; each section becomes
// one searchable record with a link straight to that part of the page.

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const toText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<span class="h-num"[^>]*>[^<]*<\/span>/g, '')
      .replace(/<(nav|form|button)[\s\S]*?<\/\1>/g, ' ')
      .replace(/<[^>]+aria-hidden="true"[^>]*><\/[a-z]+>/g, ' ')
      .replace(/<\/(p|li|h[1-6]|dt|dd|tr)>/g, '. ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .replace(/(\.\s*){2,}/g, '. ')
    .replace(/:\s*\./g, ':')
    .trim();

const SKIP = new Set(['/', '/es/', '/es/preguntar/', '/ask/', '/suggestions/', '/suggestions/thanks/', '/what-it-costs/database/thanks/', '/404.html']);

export function buildSearchIndex(pages, renderBody) {
  const records = [];
  for (const page of pages) {
    if (SKIP.has(page.path)) continue;
    const html = renderBody(page);
    const parts = html.split(/(?=<h2\b)/);
    for (const part of parts) {
      const m = part.match(/^<h2\b([^>]*)>([\s\S]*?)<\/h2>/);
      const heading = m ? toText(m[2]).replace(/\.$/, '') : 'Overview';
      const idMatch = m && m[1].match(/id="([^"]+)"/);
      const body = toText(m ? part.slice(m[0].length) : part.replace(/<h1[\s\S]*?<\/h1>/, ''));
      if (body.length < 40) continue;
      if (/^(Sources|Related|On this page|Next steps|Fuentes|Relacionado|En esta página)$/i.test(heading)) continue;
      // State advance directive pages share most of their text: index only what is unique to each state.
      if (page.stateForm && !(idMatch && ['forms', 'registry'].includes(idMatch[1]))) continue;
      records.push({
        u: page.path + (idMatch ? '#' + idMatch[1] : ''),
        t: page.title,
        h: heading,
        x: body.slice(0, 6000),
        ...(page.stateForm ? { s: 1 } : {}),
      });
    }
  }
  return records;
}
