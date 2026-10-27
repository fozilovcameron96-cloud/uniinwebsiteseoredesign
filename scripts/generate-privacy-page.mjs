// Runs after `vite build`, alongside generate-destination-pages.mjs, and for
// the same reason: the app is a single-page React build, so /privacy served
// nothing but the empty shell to anything that does not execute JavaScript.
//
// That matters more here than for a marketing page. Meta requires a privacy
// policy URL on every lead form and may fetch it to check; a crawler that
// sees the homepage with no policy on it can get the form rejected. And a
// privacy policy that only exists once JavaScript has run is one some people
// simply cannot read, which is a poor answer for the document that explains
// what you do with their data.
//
// React still takes over for a real visitor and renders the same content from
// the same src/data/privacy.ts, so this is progressive enhancement rather than
// a crawler-only copy saying something different.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

if (!existsSync(distDir)) {
  console.error('dist/ not found - run `vite build` first');
  process.exit(1);
}

const indexHtml = readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const cssTags = [...indexHtml.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)].map((m) => m[0]);
const scriptTags = [...indexHtml.matchAll(/<script[^>]*type="module"[^>]*><\/script>/g)].map((m) => m[0]);

// The policy is a plain data file with no logic, so the object literal is read
// straight out of the TS source rather than building a second copy of it.
const tsSource = readFileSync(path.join(root, 'src/data/privacy.ts'), 'utf-8');
const match = tsSource.match(/export const PRIVACY: Record<Lang, PrivacyDoc> = (\{[\s\S]*\n\});/);
if (!match) {
  console.error('Could not find PRIVACY object in privacy.ts');
  process.exit(1);
}
// The literal references two consts declared above it, so they are pulled in
// the same way rather than hardcoded here - one source of truth either way.
const consts = [...tsSource.matchAll(/^const (UPDATED_[A-Z]{2}|COMPANY_LINE)\s*=\s*([\s\S]*?);$/gm)]
  .map((m) => `const ${m[1]} = ${m[2]};`).join('\n');
// eslint-disable-next-line no-eval
const PRIVACY = eval(`${consts}\n(${match[1]})`);

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderPage(lang, doc) {
  const sections = doc.sections.map((s) => `
        <section class="pv-section">
          <h2>${escapeHtml(s.heading)}</h2>
          ${(s.body ?? []).map((p) => `<p>${escapeHtml(p)}</p>`).join('\n          ')}
          ${s.list ? `<ul>${s.list.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>` : ''}
          ${s.processors ? `<div class="pv-table-wrap"><table class="pv-table"><tbody>${
            s.processors.map(([who, what]) =>
              `<tr><th scope="row">${escapeHtml(who)}</th><td>${escapeHtml(what)}</td></tr>`).join('')
          }</tbody></table></div>` : ''}
          ${(s.body2 ?? []).map((p) => `<p>${escapeHtml(p)}</p>`).join('\n          ')}
        </section>`).join('\n');

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(doc.title)} — Universe In</title>
    <meta name="description" content="${escapeHtml(doc.title)} — Universe In" />
    <meta name="robots" content="noindex,follow" />
    <link rel="icon" type="image/png" href="/logo.png" />
    ${cssTags.join('\n    ')}
  </head>
  <body>
    <div id="root">
      <main class="pv">
        <a class="pv-back" href="/">${escapeHtml(doc.backToSite)}</a>
        <h1 class="pv-title">${escapeHtml(doc.title)}</h1>
        <p class="pv-updated">${escapeHtml(doc.updated)}</p>
${sections}
      </main>
    </div>
    ${scriptTags.join('\n    ')}
  </body>
</html>
`;
}

// ru has no URL prefix, matching resolvePath in App.tsx.
let count = 0;
for (const [lang, doc] of Object.entries(PRIVACY)) {
  const dir = lang === 'ru'
    ? path.join(distDir, 'privacy')
    : path.join(distDir, lang, 'privacy');
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), renderPage(lang, doc));
  count++;
}

console.log(`Generated ${count} static privacy pages into dist/`);
