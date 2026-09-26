// Real offer letters from the agency, redacted before they were handed over:
// student names, IDs, dates of birth, fees and email addresses are all blurred
// out in the source images. Nothing here needs further masking in code.
//
// Captions are taken straight off each document, so they stay factual and are
// checkable against the image itself. University and course names are proper
// nouns and read the same in all three languages, which is why this file has
// no translations.
export interface Offer {
  /** file in /public/images/offers */
  src: string;
  uni: string;
  course: string;
}

export const OFFERS: Offer[] = [
  // Names Universe.in LTD as the agent on the document itself - the single
  // strongest asset on the page, so it leads.
  { src: 'royal-holloway', uni: 'Royal Holloway, London', course: 'Business & Management BSc' },
  { src: 'york',           uni: 'University of York',     course: 'MSc Data Science · Sep 2026' },
  { src: 'cardiff',        uni: 'Cardiff University',     course: 'BSc Computer Science · Sep 2026' },
  { src: 'manchester',     uni: 'University of Manchester', course: 'INTO Manchester pathway' },
  { src: 'liverpool',      uni: 'University of Liverpool', course: 'Artificial Intelligence' },
  { src: 'stirling-software', uni: 'University of Stirling', course: 'BSc Software Engineering · unconditional' },
  { src: 'reading',        uni: 'University of Reading',  course: 'BSc Computer Science' },
  { src: 'greenwich',      uni: 'University of Greenwich', course: 'BSc Computer Science (AI)' },
  { src: 'coventry',       uni: 'Coventry University',    course: 'BSc Informatics (Top-up)' },
  { src: 'derby',          uni: 'University of Derby',    course: 'BSc Information Technology' },
  { src: 'adelphi',        uni: 'Adelphi University, New York', course: 'Management · Academic Accelerator' },
  { src: 'stirling-politics', uni: 'University of Stirling', course: 'BA Politics & Social Policy' },
];

export const offerSrc = (o: Offer) => `/images/offers/${o.src}.webp`;
