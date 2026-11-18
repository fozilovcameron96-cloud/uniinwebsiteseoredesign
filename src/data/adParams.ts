// ─── WHICH AD BROUGHT THIS VISITOR ────────────────────────────────────────────
// Meta ads link here with URL parameters (set in Ads Manager → the ad → URL
// parameters):
//   utm_source=meta&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&ad_id={{ad.id}}
// Meta also adds fbclid on its own.
//
// Captured once, on the first page load, because they don't survive the trip:
// switching language pushes a new path without the query string, and the
// landing page opens the quiz as a modal long after the URL was read. Kept in
// sessionStorage, so a visitor who arrives from an ad and applies ten minutes
// later still credits that ad.
//
// The quiz sends these inside `answers`, where the lead system already reads
// ad_name / ad_id / platform for the Sheet's Ad column (the same keys the
// instant-form leads use).

const KEY = 'uni_in_ad'
const FIELDS = ['utm_source', 'utm_campaign', 'utm_content', 'ad_id', 'fbclid'] as const
type Captured = Partial<Record<(typeof FIELDS)[number], string>>

export function captureAdParams(): void {
  try {
    const q = new URLSearchParams(window.location.search)
    const found: Captured = {}
    for (const f of FIELDS) {
      const v = q.get(f)
      if (v) found[f] = v.slice(0, 200)
    }
    // Only overwrite on a visit that actually came from a link with parameters,
    // so browsing to another page doesn't wipe the ad that brought them.
    if (Object.keys(found).length) sessionStorage.setItem(KEY, JSON.stringify(found))
  } catch {
    // Storage blocked (private mode, in-app browser settings). The lead still
    // goes through; it just won't say which ad.
  }
}

function read(): Captured {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '{}') as Captured
  } catch {
    return {}
  }
}

/** Extra `answers` keys for the lead, or none for a visitor not from an ad. */
export function adAnswers(): Record<string, string> {
  const c = read()
  const out: Record<string, string> = {}
  const src = (c.utm_source ?? '').toLowerCase()
  if (src) out.platform = /^(meta|facebook|fb|instagram|ig)$/.test(src) ? 'meta' : src
  else if (c.fbclid) out.platform = 'meta'
  if (c.ad_id) out.ad_id = c.ad_id
  if (c.utm_content) out.ad_name = c.utm_content
  if (c.utm_campaign) out.campaign = c.utm_campaign
  if (c.fbclid) out.fbclid = c.fbclid
  return out
}
