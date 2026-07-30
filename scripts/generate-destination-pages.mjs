// Runs after `vite build`. Generates a real, static, fully-rendered HTML page
// per destination directly into dist/ - this is what solves crawlability for
// AI answer engines and any crawler that doesn't execute JavaScript. Once the
// JS bundle loads for a real visitor, React takes over and renders the exact
// same content (from the same src/data/destinations.ts) via DestinationPage.tsx,
// with added interactivity - so this is progressive enhancement, not a
// crawler-only shadow page serving different content than real visitors see.
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

// Pull the real hashed CSS/JS tags Vite generated so these static pages share
// the exact same compiled assets as the main app (always in sync, never stale).
const indexHtml = readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const cssTags = [...indexHtml.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)].map((m) => m[0]);
const scriptTags = [...indexHtml.matchAll(/<script[^>]*type="module"[^>]*><\/script>/g)].map((m) => m[0]);

// Load the destination data directly from the TS source. Since this script
// runs as plain Node (not through Vite), we do a minimal extraction rather
// than a full TS import - parse the array via dynamic import of a small
// pre-built copy written by this same script's caller... simplest reliable
// path: require the already-transpiled data from the built JS bundle isn't
// straightforward either, so this script reads the TS file and evaluates the
// array literal directly (it's a plain data file, no logic).
const tsSource = readFileSync(path.join(root, 'src/data/destinations.ts'), 'utf-8');
const arrayMatch = tsSource.match(/export const DESTINATIONS: Destination\[\] = (\[[\s\S]*?\n\]);/);
if (!arrayMatch) {
  console.error('Could not find DESTINATIONS array in destinations.ts');
  process.exit(1);
}
// eslint-disable-next-line no-eval
const DESTINATIONS = eval(arrayMatch[1]);

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderFaqSchema(d) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });
}

function renderPage(d) {
  const canonical = `https://uni-in.co.uk/study-in-${d.slug}`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(d.metaTitle)}</title>
    <meta name="description" content="${escapeHtml(d.metaDescription)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(d.metaTitle)}" />
    <meta property="og:description" content="${escapeHtml(d.metaDescription)}" />
    <meta property="og:image" content="https://uni-in.co.uk/logo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${renderFaqSchema(d)}</script>
    ${cssTags.join('\n    ')}
  </head>
  <body>
    <div id="root">
      <header style="position:sticky;top:0;z-index:100;padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);">
        <a href="/en/" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
          <img src="/logo.png" alt="Universe In" width="40" height="40" style="border-radius:10px;object-fit:cover;" />
          <span style="font-weight:800;font-size:16px;color:var(--text);">Universe<em style="color:var(--o);font-style:normal;">.in</em></span>
        </a>
      </header>

      <main>
        <section class="dest-hero">
          <img src="${d.heroImage}" alt="${escapeHtml(d.heroImageAlt)}" class="dest-hero-img" />
          <div class="dest-hero-overlay"></div>
          <div class="dest-hero-content">
            <img class="dest-hero-flag" src="https://flagcdn.com/48x36/${d.code}.png" srcset="https://flagcdn.com/96x72/${d.code}.png 2x" width="48" height="36" alt="${escapeHtml(d.name)} flag" />
            <h1 class="dest-hero-title">${escapeHtml(d.h1)}</h1>
            <p class="dest-hero-intro">${escapeHtml(d.intro)}</p>
            <div class="cta-group" style="align-items:center;">
              <a class="btn-primary" href="/en/apply" style="text-decoration:none;">
                <span>Check My Eligibility</span>
              </a>
              <span class="dest-hero-note">Free &middot; 2 minutes &middot; No commitment</span>
            </div>
          </div>
        </section>

        <section class="obj-section">
          <div class="obj-inner" style="max-width:760px;">
            <div class="section-label"><div class="dot"></div><span>Visa &amp; Cost</span></div>
            <h2 class="section-h2">What it actually takes</h2>
            <div class="obj-grid" style="grid-template-columns:1fr 1fr;margin-top:32px;">
              <div class="obj-card">
                <div class="obj-answer">${escapeHtml(d.visaName)}</div>
                <div class="obj-desc">${escapeHtml(d.visaNote)}</div>
              </div>
              <div class="obj-card">
                <div class="obj-answer">${escapeHtml(d.costRange)}/year</div>
                <div class="obj-desc">${escapeHtml(d.costNote)}</div>
              </div>
            </div>
          </div>
        </section>

        <section class="how-section">
          <div class="how-inner" style="max-width:760px;">
            <div class="section-label"><div class="dot"></div><span>Why ${escapeHtml(d.name)}</span></div>
            <h2 class="section-h2">What makes it different</h2>
            <div class="how-steps" style="margin-top:32px;">
              ${d.whyThisCountry.map((reason, i) => `<div class="how-card">
                <div class="how-num">${String(i + 1).padStart(2, '0')}</div>
                <p style="font-size:14px;color:var(--sub);line-height:1.7;">${escapeHtml(reason)}</p>
              </div>`).join('\n              ')}
            </div>
            <div style="margin-top:56px;">
              <div class="section-label"><div class="dot"></div><span>Popular fields</span></div>
              <div class="dest-grid" style="margin-top:20px;">
                ${d.popularFields.map((f) => `<div class="dest-chip"><span class="dname">${escapeHtml(f)}</span></div>`).join('\n                ')}
              </div>
            </div>
            <div style="margin-top:40px;padding:16px 20px;background:var(--bg2);border-radius:12px;border-left:3px solid var(--o);">
              <strong style="font-size:13px;color:var(--text);">Typical timeline: </strong>
              <span style="font-size:13px;color:var(--sub);">${escapeHtml(d.timeline)}</span>
            </div>
          </div>
        </section>

        <section class="faq-section">
          <div class="faq-inner">
            <div class="section-label"><div class="dot"></div><span>FAQ</span></div>
            <h2 class="section-h2">Questions about studying in ${escapeHtml(d.name)}</h2>
            <div class="faq-list">
              ${d.faqs.map((f) => `<div class="faq-item open">
                <div class="faq-q">${escapeHtml(f.q)}</div>
                <div class="faq-a" style="max-height:none;padding:0 4px 22px;"><p>${escapeHtml(f.a)}</p></div>
              </div>`).join('\n              ')}
            </div>
          </div>
        </section>

        <section class="final-section">
          <div class="final-inner">
            <div class="section-label" style="justify-content:center;"><div class="dot"></div><span>Ready to find out?</span></div>
            <h2 class="final-title">See if ${escapeHtml(d.name)} is right for you.</h2>
            <p class="final-sub">Free 2-minute quiz &mdash; get matched with universities that actually fit your budget and level.</p>
            <a class="btn-final" href="/en/apply" style="margin:0 auto;text-decoration:none;">
              <span>Check My Eligibility</span>
            </a>
          </div>
        </section>
      </main>

      <footer class="footer-root">
        <div class="footer-wrap" style="grid-template-columns:1fr;text-align:center;padding-bottom:32px;">
          <p style="color:rgba(255,255,255,.55);font-size:13px;">Universe In &bull; <a href="/en/" style="color:var(--o);">uni-in.co.uk</a></p>
        </div>
      </footer>
    </div>
    ${scriptTags.join('\n    ')}
  </body>
</html>
`;
}

let count = 0;
for (const d of DESTINATIONS) {
  const dir = path.join(distDir, `study-in-${d.slug}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), renderPage(d));
  count++;
}

console.log(`Generated ${count} static destination pages into dist/`);
