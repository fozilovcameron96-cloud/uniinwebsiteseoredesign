export interface DestinationFaq {
  q: string;
  a: string;
}

export interface Destination {
  slug: string;
  code: string; // flagcdn 2-letter code
  name: string;
  flag: string;
  heroImage: string;
  heroImageAlt: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  visaName: string;
  visaNote: string;
  costRange: string;
  costNote: string;
  popularFields: string[];
  timeline: string;
  whyThisCountry: string[];
  faqs: DestinationFaq[];
}

// Real, distinct content per destination - not a template with swapped variables.
// Feeds both the React DestinationPage component and the static-page generator
// (scripts/generate-destination-pages.mjs), so the prerendered HTML crawlers see
// and the hydrated React page real visitors see are always the same content.
export const DESTINATIONS: Destination[] = [
  {
    slug: 'uk',
    code: 'gb',
    name: 'United Kingdom',
    flag: '🇬🇧',
    heroImage: '/images/destinations/uk.webp',
    heroImageAlt: 'Christ Church College, Oxford University',
    metaTitle: 'Study in the UK from Uzbekistan/Tajikistan | Universe In',
    metaDescription: 'Apply to UK universities from Uzbekistan or Tajikistan: Student visa (CAS) process, UCAS timelines, real costs, and a free consultation with Universe In.',
    h1: 'Study in the UK: From Tashkent or Dushanbe to a UK Campus in One Year',
    intro: "Studying in the UK from Uzbekistan or Tajikistan means applying through UCAS (undergraduate) or directly to universities (master's), securing a CAS from a licensed sponsor, then applying for a Student visa. Most master's programs take just one year, making the UK one of the fastest routes to a globally recognised degree.",
    visaName: 'Student visa (formerly Tier 4), under the UK\'s points-based immigration system',
    visaNote: 'You cannot apply for this visa until your university issues a CAS (Confirmation of Acceptance for Studies) number, which only happens after you accept an unconditional offer and pay a deposit — so the visa timeline is entirely dependent on how fast your application and documents move first.',
    costRange: 'approximately $15,000–$35,000',
    costNote: 'London adds a significant premium to living costs compared to cities like Manchester, Leeds, or Glasgow, and tuition varies heavily by subject — lab-based and business degrees usually cost more than humanities.',
    popularFields: ['Business & Management', 'Computer Science', 'Engineering', 'Finance & Economics'],
    timeline: 'typically 4–6 months from application submission to visa approval, longer if starting from scratch on English test prep',
    whyThisCountry: [
      "One-year master's degrees mean you spend one year of tuition and living costs instead of two, which materially changes the total budget compared to the US or Canada",
      "The Graduate visa lets you stay and work in the UK for 2 years after a bachelor's or master's (3 years after a PhD) with no employer sponsorship required to start",
      "UK degrees carry strong, consistent name recognition across Uzbekistan and Tajikistan's job markets, which matters if you plan to return home for work",
    ],
    faqs: [
      { q: 'Can I work while studying in the UK?', a: "Yes — most Student visa holders can work up to 20 hours per week during term time and full-time during official holidays, as long as your CAS confirms this permission. This is enough to cover part of your living costs but shouldn't be relied on to fund your studies." },
      { q: 'What happens after I graduate — can I stay and work?', a: "The Graduate visa allows you to stay in the UK for 2 years after completing a bachelor's or master's degree (3 years after a PhD) with no job offer needed to apply. After that, you'd need to switch to a Skilled Worker visa with an employer sponsor to stay longer." },
      { q: 'Is a scholarship realistic for students from Uzbekistan or Tajikistan?', a: "Partial scholarships (often 20–50% tuition reductions) from individual universities are realistic if your grades and English scores are strong, especially for master's programs. Full-ride scholarships like Chevening exist but are highly competitive nationally, so we recommend applying with a funded budget in mind rather than counting on one." },
      { q: 'What English test do I need, and is Duolingo accepted?', a: 'Most universities require IELTS Academic (typically 6.0–7.0 overall) for admission, and IELTS for UKVI specifically for the visa application at many institutions. A growing number of universities now accept Duolingo English Test for admission, but you should confirm with each specific university since visa-related English requirements are stricter and school-specific.' },
    ],
  },
  {
    slug: 'usa',
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    heroImage: '/images/destinations/usa.webp',
    heroImageAlt: 'Aerial view of Manhattan, New York City',
    metaTitle: 'Study in the USA from Uzbekistan/Tajikistan | Universe In',
    metaDescription: 'Apply to US universities from Uzbekistan or Tajikistan: F-1 visa steps, SEVIS/I-20, real costs, OPT work rights, and a free consultation with Universe In.',
    h1: 'Study in the USA: Building a Competitive F-1 Application from Central Asia',
    intro: "Studying in the USA from Uzbekistan or Tajikistan means applying directly to universities, receiving an I-20 form once accepted, paying the SEVIS fee, and passing an F-1 visa interview at the US embassy. It's a longer, more document-heavy process than the UK or Canada, but it opens access to funded graduate programs and strong post-study work options.",
    visaName: 'F-1 Student Visa (nonimmigrant visa for academic study)',
    visaNote: 'The F-1 visa requires an in-person interview at the US Embassy, where the officer\'s main concern is "immigrant intent" — you need to convincingly demonstrate ties to Uzbekistan or Tajikistan and a genuine plan to return, not just financial ability to pay.',
    costRange: 'approximately $20,000–$60,000+',
    costNote: 'This is the widest cost range of any major destination — a public state university can cost a third of a private research university, and graduate students often reduce costs significantly through teaching or research assistantships that waive tuition and pay a stipend.',
    popularFields: ['Computer Science', 'Business Administration (MBA)', 'Engineering', 'Data Science & Analytics'],
    timeline: 'typically 9–12 months from starting applications to visa approval, given standardized testing, essays, and embassy interview wait times',
    whyThisCountry: [
      'Graduate programs commonly offer assistantships (teaching or research positions) that cover tuition and pay a monthly stipend — a genuine path to a US master\'s or PhD without paying full price out of pocket',
      'Optional Practical Training (OPT) gives graduates 12 months of US work authorization automatically, extended to 3 years total for STEM-designated degrees like most engineering and CS programs',
      "The sheer size and diversity of the US higher education system means there's a realistic option at nearly every budget level, from affordable state universities to elite private research institutions",
    ],
    faqs: [
      { q: 'Can I work while studying in the US?', a: 'F-1 students can work up to 20 hours per week on-campus during the semester and full-time during official breaks, but off-campus work generally isn\'t allowed in the first academic year except in specific hardship or curricular-training cases. Graduate assistantships (TA/RA positions) count as on-campus work and are the most common way students earn income.' },
      { q: 'What happens after graduation — can I work in the US?', a: 'Most graduates are eligible for OPT (Optional Practical Training), 12 months of work authorization in your field of study, with a 24-month extension available for STEM-designated degrees, giving up to 3 years total. After OPT, staying longer requires an employer to sponsor an H-1B visa, which is allocated by an annual lottery and not guaranteed.' },
      { q: 'Is a full scholarship realistic for undergraduate study?', a: 'Full-ride undergraduate scholarships at top-name US universities are extremely competitive and rare for international applicants, since need-blind, full-need-met admission is limited to a small number of elite schools. Merit scholarships covering 20–50% of tuition are more realistic at a wider range of universities, and graduate assistantship funding is generally a more achievable path to a low-cost degree than undergraduate scholarships.' },
      { q: 'Do I need the SAT/ACT or GRE, and what English test is required?', a: "A growing number of US universities are test-optional for the SAT/ACT and increasingly for the GRE at the graduate level, but competitive programs and scholarship applications still benefit from strong scores, so check each program's current policy. TOEFL iBT and IELTS Academic are both widely accepted; Duolingo English Test is accepted by a large and growing number of universities as a faster, cheaper alternative." },
    ],
  },
  {
    slug: 'canada',
    code: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    heroImage: '/images/destinations/canada.webp',
    heroImageAlt: 'Toronto skyline with the CN Tower at dusk',
    metaTitle: 'Study in Canada from Uzbekistan/Tajikistan | Universe In',
    metaDescription: 'Apply to Canadian colleges and universities from Uzbekistan or Tajikistan: Study Permit process, costs, PGWP work rights, free consultation with Uni In.',
    h1: 'Study in Canada: A Study Permit Route with a Real Path to Staying',
    intro: 'Studying in Canada from Uzbekistan or Tajikistan means getting accepted by a Designated Learning Institution (DLI), then applying for a Study Permit — Canada\'s official term for a student visa — which requires proof of funds and a clean application. Canada stands out among major destinations for how directly study can lead into permanent residence.',
    visaName: 'Study Permit (issued by Immigration, Refugees and Citizenship Canada — IRCC)',
    visaNote: 'Canada tightened international student policy significantly from 2024 onward, including a national cap on new study permits and stricter proof-of-funds requirements, so processing times and approval odds can shift — always check current IRCC rules before committing to a program rather than relying on older advice.',
    costRange: 'approximately $18,000–$30,000',
    costNote: 'Costs differ meaningfully by province — Ontario and British Columbia are generally pricier than Atlantic Canada or the Prairies — and college diploma programs are usually cheaper than university bachelor\'s or master\'s degrees.',
    popularFields: ['Business Administration', 'Computer Science & IT', 'Engineering', 'Health Sciences & Nursing'],
    timeline: 'typically 3–5 months from acceptance to Study Permit decision, though this varies by visa office workload',
    whyThisCountry: [
      'Canada offers one of the clearest study-to-immigration pathways of any destination — the Post-Graduation Work Permit combined with Express Entry and provincial nominee programs gives graduates a realistic, structured route to permanent residence',
      'College diploma and diploma-to-degree "pathway" programs offer a genuinely lower-cost entry point than a full university bachelor\'s degree, useful for budget-conscious applicants',
      'A large, established Central Asian and Russian-speaking community exists in cities like Toronto and Vancouver, easing the cultural adjustment compared to less-connected destinations',
    ],
    faqs: [
      { q: 'Can I work while studying in Canada?', a: 'Study Permit holders at eligible DLIs can generally work off-campus without a separate work permit, up to a weekly hours cap set by IRCC (this cap has changed more than once in recent years, so confirm the current limit before you rely on it). Co-op and internship programs built into your course also count separately and often allow full-time work during the work term.' },
      { q: 'What happens after graduation — can I stay and work?', a: "The Post-Graduation Work Permit (PGWP) lets eligible graduates work in Canada for up to 3 years, with the exact length tied to your program's duration. Since 2024, PGWP eligibility has tightened for certain program types and institutions (particularly some private college partnerships), so it's essential to confirm a specific program is PGWP-eligible before enrolling, not after." },
      { q: 'Is a scholarship realistic for international students?', a: "Large scholarships specifically for international undergraduates are limited and competitive at most Canadian universities, since Canada's system relies more on relatively lower base tuition than on scholarship discounting. Graduate programs, especially research-based master's and PhDs, more commonly offer funding through research assistantships or departmental awards." },
      { q: 'What English test do I need, and is proof of funds required?', a: 'IELTS Academic and TOEFL iBT are both widely accepted, and Duolingo is accepted by a growing number of institutions — requirements vary by school and program level. Yes, Canada requires proof of funds to cover tuition and living costs as part of the Study Permit application, and the required amount is set and periodically updated by IRCC, so check the current figure directly on the IRCC website before applying.' },
    ],
  },
  {
    slug: 'australia',
    code: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    heroImage: '/images/destinations/australia.webp',
    heroImageAlt: 'Sydney Opera House illuminated at night',
    metaTitle: 'Study in Australia from Uzbekistan/Tajikistan | Uni In',
    metaDescription: 'Apply to Australian universities from Uzbekistan or Tajikistan: Subclass 500 visa process, costs, post-study work rights, free consultation with Uni In.',
    h1: 'Study in Australia: What the Subclass 500 Visa Actually Requires',
    intro: 'Studying in Australia from Uzbekistan or Tajikistan means getting a Confirmation of Enrolment (CoE) from an Australian institution, then applying for the Subclass 500 Student visa, which requires proving you meet the Genuine Student requirement. Australia offers flexible entry points across the year and strong post-study work options tied to your qualification level.',
    visaName: 'Student visa (Subclass 500)',
    visaNote: 'Since late 2024, Australia replaced the older "Genuine Temporary Entrant" test with a "Genuine Student" (GS) requirement — you now need to clearly explain your study and career motivations in writing as part of the application, and immigration officers scrutinize this closely, so a generic or vague statement is a common reason for refusal.',
    costRange: 'approximately $22,000–$40,000',
    costNote: 'Sydney and Melbourne are noticeably more expensive to live in than cities like Adelaide, Perth, or regional campuses, and the Australian government sets and periodically updates a minimum living-cost figure you must prove you can meet for the visa.',
    popularFields: ['Business & Management', 'Engineering', 'Information Technology', 'Nursing & Health Sciences'],
    timeline: 'typically 2–4 months from CoE issuance to visa decision, though this varies by visa office and time of year',
    whyThisCountry: [
      'Australia has multiple intake periods across the year (not just one main autumn start), giving more flexibility if you miss a deadline elsewhere or need extra time to prepare documents',
      'Studying at a regional campus (outside Sydney, Melbourne, and Brisbane) often comes with lower living costs and, in many cases, additional post-study work visa duration as a regional incentive',
      "Australia's points-based skilled migration system gives international graduates in in-demand fields (like nursing, IT, and engineering) a realistic longer-term pathway beyond just the post-study work visa",
    ],
    faqs: [
      { q: 'Can I work while studying in Australia?', a: 'Student visa holders can generally work up to a capped number of hours per fortnight during term time and unlimited hours during scheduled course breaks, with the exact cap set by the Department of Home Affairs and subject to change, so confirm the current limit before relying on it for your budget.' },
      { q: 'What happens after graduation — can I stay and work?', a: 'The Temporary Graduate visa (Subclass 485) lets eligible graduates stay and work in Australia after finishing their course, with the length depending on your qualification level and whether you studied at a regional campus (which can add bonus years). Rules and durations have been adjusted in recent policy changes, so verify current settings for your specific qualification before choosing a program based on this benefit.' },
      { q: 'Is a scholarship realistic for students from Uzbekistan or Tajikistan?', a: 'Partial merit scholarships (commonly 10–30% tuition reductions) from individual Australian universities are realistic for strong applicants, and many universities specifically list Central Asia within scholarship-eligible regions. Fully-funded government scholarships like the Australia Awards exist but are highly competitive and limited in number, so plan your budget assuming self-funding with a partial scholarship as a bonus, not a guarantee.' },
      { q: 'What English test do I need, and is Duolingo accepted?', a: 'IELTS Academic is the most commonly required test (typically 6.0–6.5 overall for undergraduate, higher for competitive postgraduate programs), with PTE Academic also widely accepted and popular for its faster results. Duolingo English Test is accepted by a growing list of Australian universities, but confirm with your specific institution since not all programs accept it yet.' },
    ],
  },
  {
    slug: 'new-zealand',
    code: 'nz',
    name: 'New Zealand',
    flag: '🇳🇿',
    heroImage: '/images/destinations/new-zealand.webp',
    heroImageAlt: 'Lake Pukaki and Aoraki/Mount Cook, New Zealand',
    metaTitle: 'Study in New Zealand from Uzbekistan/Tajikistan | Uni In',
    metaDescription: 'Apply to New Zealand institutions from Uzbekistan or Tajikistan: student visa process, real costs, post-study work rights, and a free consultation with Uni In.',
    h1: 'Study in New Zealand: A Less Crowded Path to a Western Degree',
    intro: 'Studying in New Zealand from Uzbekistan or Tajikistan means getting an Offer of Place from an NZQA-recognised institution, then applying for a student visa through Immigration New Zealand, which checks your funds, health, and character requirements. It\'s a far less common route for Central Asian students than the UK or USA, which can mean less competition for places and scholarships.',
    visaName: 'Fee Paying Student Visa (issued by Immigration New Zealand)',
    visaNote: 'New Zealand requires evidence of sufficient funds for the full length of your stay (not just one year at a time for shorter courses), plus a medical exam and police certificate for longer programs — these supporting documents take real time to arrange from Uzbekistan or Tajikistan, so start them well before your intended visa application date.',
    costRange: 'approximately $18,000–$30,000',
    costNote: 'Auckland is meaningfully more expensive to live in than smaller cities like Dunedin, Hamilton, or Palmerston North, and Immigration New Zealand sets a minimum living-cost figure you must prove you can meet, which is reviewed periodically.',
    popularFields: ['Business & Management', 'Agriculture & Agribusiness', 'Hospitality & Tourism Management', 'Engineering'],
    timeline: 'typically 2–4 months from offer of place to visa decision, though this can extend if medical or police certificate appointments are delayed',
    whyThisCountry: [
      'New Zealand receives far fewer applicants from Central Asia than the UK, USA, or Australia, which in practice means less competition for scholarships and university places relative to your qualifications',
      "Its strength in agriculture, agribusiness, and food science is genuinely distinctive among major English-speaking destinations and directly relevant given the importance of agriculture to both Uzbekistan's and Tajikistan's economies",
      'New Zealand consistently ranks as one of the safer, lower-stress environments to live and study, which matters for a first time living abroad far from family',
    ],
    faqs: [
      { q: 'Can I work while studying in New Zealand?', a: 'Most student visa holders on courses of a sufficient level and duration can work up to a capped number of hours per week during term time and full-time during scheduled holiday periods, though the exact cap and eligibility depend on your course level, so confirm this is included in your specific visa conditions before assuming it applies.' },
      { q: 'What happens after graduation — can I stay and work?', a: 'Eligible graduates can apply for a Post-Study Work Visa, generally allowing you to live and work in New Zealand for up to 3 years depending on your qualification level, with this route sometimes leading toward residence for graduates in skill-shortage occupations. Requirements and durations are set by Immigration New Zealand and have shifted in recent years, so confirm current settings for your specific qualification before relying on this as your plan.' },
      { q: 'Is a scholarship realistic for students from Uzbekistan or Tajikistan?', a: 'Individual New Zealand universities offer partial merit scholarships for international students, and because application volume from Central Asia is lower here than in the UK or Australia, a strong academic profile can be genuinely competitive. Fully-funded scholarships exist but are limited, so budget primarily for self-funding with a partial scholarship as a realistic upside, not the plan itself.' },
      { q: 'What English test do I need, and is Duolingo accepted?', a: 'IELTS Academic is the most widely required and recognized test across New Zealand institutions and for visa purposes, typically in the 6.0–6.5 range for undergraduate study and higher for competitive postgraduate programs. Duolingo English Test acceptance is growing but still less universal here than in the UK, USA, or Australia, so verify directly with your target institution before relying on it.' },
    ],
  },
  {
    slug: 'netherlands',
    code: 'nl',
    name: 'Netherlands',
    flag: '🇳🇱',
    heroImage: '/images/destinations/netherlands.webp',
    heroImageAlt: 'Canal houses along an Amsterdam canal',
    metaTitle: 'Study in Netherlands from Uzbekistan/Tajikistan | Universe In',
    metaDescription: "Learn how Uzbek and Tajik students get the MVV visa, choose English-taught programs, and apply to Dutch universities. Book a free consultation with Universe In.",
    h1: 'Study in the Netherlands: English-Taught Degrees and MVV Visa Support for Uzbek & Tajik Students',
    intro: "To study in the Netherlands from Uzbekistan or Tajikistan, you apply directly to a Dutch university (often via Studielink), get accepted onto an English-taught bachelor's or master's program, then apply for an MVV entry visa and residence permit through your university's sponsor status, typically a 4-6 month process before enrollment starts in September.",
    visaName: 'MVV (Machtiging tot Voorlopig Verblijf) entry visa + Verblijfsvergunning (residence permit)',
    visaNote: "Most Dutch universities are recognized sponsors with the Dutch immigration service (IND), so they submit the MVV/residence permit application on your behalf once you accept an offer — this makes the process faster and more predictable than in countries without a sponsor system, though you still need to show proof of funds.",
    costRange: 'approximately $14,000–$24,000',
    costNote: 'Non-EU tuition (typically €8,000–€20,000/year) is significantly higher than what EU students pay, and costs vary a lot between a research university, a university of applied sciences, and the city (Amsterdam runs well above smaller student cities like Groningen or Enschede).',
    popularFields: ['International Business & Management', 'Computer Science & Data Science', 'Water Management & Environmental Engineering', 'Logistics & Supply Chain Management'],
    timeline: 'approximately 4–6 months from application to arrival, aligned with the September intake',
    whyThisCountry: [
      "One of the largest offerings of English-taught bachelor's and master's programs in continental Europe, so a lower IELTS/TOEFL barrier than French- or German-medium alternatives",
      'Universities act as recognized IND sponsors, which keeps the MVV/residence permit process comparatively fast and predictable versus countries that require a separate national visa office application',
      "A one-year 'zoekjaar' (orientation year) residence permit is available after graduation, letting you stay and search for a job without needing an offer in hand first",
    ],
    faqs: [
      { q: 'Can I work while studying in the Netherlands?', a: "Yes — students with a valid residence permit can generally work up to 16 hours a week during term time, or full-time during the summer holiday period, though in most cases your employer (not you) needs to arrange a separate work permit (TWV) unless the work is a required internship." },
      { q: 'What are my options after graduation?', a: "Graduates can apply for the zoekjaar (orientation year) residence permit, valid up to one year, which lets you stay in the Netherlands to look for a job or start a business with no employer sponsor required upfront. Once you find qualifying work, you can switch to a Highly Skilled Migrant permit." },
      { q: 'Is a scholarship realistic?', a: "Partial scholarships exist (such as the Holland Scholarship or Orange Tulip Scholarship, often a one-time amount like €5,000) but they're competitive and rarely cover full costs. Most Central Asian students plan to self-fund the bulk of tuition and living costs, treating a scholarship as a bonus rather than the plan." },
      { q: 'Do I need to speak Dutch?', a: "No — the large majority of bachelor's and master's programs marketed to international students are taught entirely in English, and you'll typically need IELTS 6.0–6.5 or an equivalent score. Dutch isn't required for your MVV application either, though a little helps with part-time jobs and daily life." },
    ],
  },
  {
    slug: 'uae',
    code: 'ae',
    name: 'UAE',
    flag: '🇦🇪',
    heroImage: '/images/destinations/uae.webp',
    heroImageAlt: 'Burj Khalifa and the Dubai skyline',
    metaTitle: 'Study in the UAE from Uzbekistan/Tajikistan | Universe In',
    metaDescription: 'See how Uzbek and Tajik students get a UAE student visa, pick affordable English-medium universities, and apply fast. Book a free consultation with Universe In.',
    h1: 'Study in the UAE: Fast Visas and English-Medium Degrees Close to Home for Uzbek & Tajik Students',
    intro: "To study in the UAE from Uzbekistan or Tajikistan, you apply to a local or branch-campus university, receive an offer, and let the institution sponsor your Student Residence Visa, usually the fastest visa process of any major destination, often ready within 6-10 weeks, with intakes available in both September and January.",
    visaName: 'Student Residence Visa (sponsored directly by the university)',
    visaNote: "Unlike most Western destinations, there's no separate national student-visa office — the university itself sponsors your residence visa, which is usually why UAE processing is markedly faster (often weeks, not months). Exact steps can vary slightly by emirate and by whether you're at a local university or a foreign branch campus.",
    costRange: 'approximately $8,000–$20,000+',
    costNote: "Cost depends heavily on which emirate and type of institution: branch campuses in free zones like Sharjah or Ajman tend to be cheaper, while well-known Western branch campuses (in Dubai or Abu Dhabi) can approach fees closer to their home-country campus.",
    popularFields: ['Business & Hospitality Management', 'Aviation & Logistics', 'Engineering', 'Computer Science & IT'],
    timeline: 'approximately 6–10 weeks from acceptance to visa readiness, notably faster than most European destinations',
    whyThisCountry: [
      'Culturally comfortable for many Muslim-majority Central Asian families — halal food, mosques, and Islamic holidays are part of everyday life, reducing the culture shock common in Western destinations',
      'Short direct flights from Tashkent and Dushanbe (roughly 3.5–4.5 hours to Dubai/Sharjah), making family visits and going home for breaks genuinely practical',
      'A large number of branch campuses of UK, US, Australian, and Indian universities operate in the UAE, offering internationally recognized degrees without leaving the region — often at a lower cost than studying at the home campus abroad',
    ],
    faqs: [
      { q: 'Can I work while studying in the UAE?', a: "Work rights for students have historically been tightly restricted. Some free zones (like Dubai International Academic City) now allow limited part-time work with the right permits, but rules are less standardized than in Europe, so this shouldn't be counted on as reliable income — confirm current rules directly with your specific university." },
      { q: 'What happens after I graduate — can I stay and work?', a: "Outstanding graduates from recognized UAE universities can qualify for the UAE Golden Visa (a long-term, typically 10-year residence visa) without needing an employer sponsor. Otherwise, the standard path is finding an employer willing to sponsor your work visa, the same route any expat professional in the UAE takes." },
      { q: 'Is a scholarship realistic?', a: "Some government-backed universities, particularly in Abu Dhabi and Sharjah, offer merit scholarships covering anywhere from 25% to 100% of tuition for strong applicants. Full-ride scholarships exist but are competitive; partial scholarships at branch campuses are more commonly attainable." },
      { q: 'Do I need IELTS or another English test?', a: "Most programs are English-medium and ask for IELTS or TOEFL, though some universities use their own English placement test or accept somewhat lower thresholds than Western institutions. If your score is below requirement, several universities offer a foundation/pathway year to bridge the gap." },
    ],
  },
  {
    slug: 'germany',
    code: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    heroImage: '/images/destinations/germany.webp',
    heroImageAlt: 'The Brandenburg Gate and TV Tower, Berlin',
    metaTitle: 'Study in Germany from Uzbekistan/Tajikistan | Universe In',
    metaDescription: "Learn how Uzbek and Tajik students get Germany's student visa, apply to tuition-free universities, and prove funds. Free consultation with Universe In.",
    h1: 'Study in Germany: Tuition-Free Public Universities and an 18-Month Job Search Visa for Uzbek & Tajik Students',
    intro: "To study in Germany from Uzbekistan or Tajikistan, you apply to a public or private university, open a blocked account proving roughly a year's living costs, then apply for a national Type D study visa that converts into a residence permit after arrival, a process that typically takes 6-9 months given consulate wait times.",
    visaName: "National (Type D) student visa, converted into a residence permit for study purposes (Aufenthaltserlaubnis zum Studium)",
    visaNote: "Germany requires proof of funds through a blocked account (Sperrkonto), where a set amount (recently around €990–1,000/month, subject to periodic revision by German authorities) is deposited and released to you monthly — this financial-proof requirement is strict and non-negotiable, even alongside a partial scholarship.",
    costRange: 'approximately $8,000–$14,000',
    costNote: 'Public university tuition is typically free for all nationalities outside Baden-Württemberg (which charges non-EU students around €1,500/semester); your main cost to plan for is living expenses and the blocked-account deposit, not tuition.',
    popularFields: ['Mechanical & Automotive Engineering', 'Computer Science', 'Electrical Engineering', 'Business & Industrial Engineering'],
    timeline: 'approximately 6–9 months, longer than most destinations due to consulate appointment wait times and, for some applicants, language preparation',
    whyThisCountry: [
      'Tuition-free or near-free public universities regardless of nationality — one of the very few remaining systems like this in the world, and the main draw for budget-conscious families',
      'An 18-month residence permit to search for a job after graduating is granted with no need for a job offer in hand — among the more generous post-study windows in Europe',
      "A genuinely active engineering and manufacturing job market (Germany's Mittelstand companies) that hires international STEM graduates, not just a theoretical pathway on paper",
    ],
    faqs: [
      { q: 'Can I work while studying in Germany?', a: "Yes — non-EU students can work up to 140 full days or 280 half days per year without needing a separate work permit, giving meaningful flexibility to cover part of your living costs while studying." },
      { q: 'What happens after graduation?', a: "Graduates are granted an 18-month residence permit to search for employment matching their qualification, automatically upon finishing a German degree, with no job offer required to get it. Once you secure qualifying work, you switch to a work-based residence permit." },
      { q: 'Do I need to speak German?', a: "It depends on the program. Many master's degrees, especially in engineering and business at technical universities, are taught fully in English. Most public bachelor's programs, however, are taught in German and typically require at least B2/C1 level (often shown via TestDaF or DSH), so bachelor's applicants should plan for German language study first." },
      { q: 'Is a scholarship realistic?', a: "DAAD scholarships are prestigious but highly competitive and mostly aimed at master's/PhD applicants or specific programs. Because public university tuition is already free or near-free, most students don't need a scholarship to cover fees — the real cost to plan and save for is the living-cost blocked account." },
    ],
  },
  {
    slug: 'france',
    code: 'fr',
    name: 'France',
    flag: '🇫🇷',
    heroImage: '/images/destinations/france.webp',
    heroImageAlt: 'The Eiffel Tower, Paris',
    metaTitle: 'Study in France from Uzbekistan/Tajikistan | Universe In',
    metaDescription: 'See how Uzbek and Tajik students apply via Campus France, get the VLS-TS visa, and choose universities or Grandes Ecoles. Free consultation with Universe In.',
    h1: "Study in France: Low-Cost Public Universities and the Grande Ecole System for Uzbek & Tajik Students",
    intro: "To study in France from Uzbekistan or Tajikistan, you typically apply through the Etudes en France or Campus France platform, or directly to a university or Grande Ecole, then apply for the VLS-TS student visa, which functions as your residence permit once validated online shortly after you arrive in the country.",
    visaName: "VLS-TS 'étudiant' (long-stay visa valid as a residence permit)",
    visaNote: "Depending on your nationality's specific agreement with France, your application may need to go through the Etudes en France (Campus France) platform before you can apply for the visa itself. After arrival, the VLS-TS must be validated online (and sometimes requires an OFII medical appointment) within your first few months in France — skipping this step can jeopardize your legal status.",
    costRange: 'approximately $3,000–$25,000+',
    costNote: 'France has a genuinely two-tier cost structure: regulated public-university tuition (roughly $3,000-5,000/year) is among the cheapest in Western Europe, while the private Grande Ecole and business-school route ($12,000-25,000+/year) is priced closer to UK or US programs — living costs also swing heavily by city, with Paris well above regional cities.',
    popularFields: ["Engineering (Grandes Ecoles d'ingénieurs)", 'International Business & Management', 'Fashion & Luxury Management', 'Culinary Arts & Hospitality'],
    timeline: 'approximately 5–8 months, longer for applicants whose country requires the Campus France procedure before visa application',
    whyThisCountry: [
      "The Grande Ecole system is a distinct, globally respected model that sits outside the standard university ranking system most international applicants are used to checking — several of Europe's top-regarded business and engineering schools are Grandes Ecoles, not universities",
      "A post-study APS residence permit lets graduates stay and job-search, typically for around 12 months, and can be extended; some master's graduates in in-demand fields get a simplified path to a work permit once employed",
      'Regulated tuition at public universities means a full non-EU degree can, in some cases, cost close to what other students pay for a single year in the UK or US',
    ],
    faqs: [
      { q: 'Do I need to speak French?', a: "It depends on the track. Most public university bachelor's and master's programs are taught in French and typically require DELF/DALF B2 or an equivalent test. A growing number of master's programs, and most Grande Ecole/business school programs, are taught in English with IELTS or TOEFL only — so your language requirement really depends on which route you choose." },
      { q: 'Can I work while studying?', a: "Yes — student visa holders can work up to 964 hours per year, roughly equivalent to 20 hours a week on average, one of the more generous part-time work allowances among major study destinations." },
      { q: 'What are my options after graduation?', a: "Graduates can apply for the APS residence permit (autorisation provisoire de séjour), generally valid around 12 months, to search for a job or start a business without needing an offer in advance. Once you find qualifying work, you switch to a 'salarié' work permit." },
      { q: 'Is a scholarship realistic?', a: "French government scholarships (such as Eiffel) and Campus France-linked funding exist but are competitive and mostly aimed at master's, PhD, or high-achieving applicants. Most students, especially undergraduates, should plan to self-fund — France's comparatively low public-university tuition makes this more achievable than in many other Western countries." },
    ],
  },
  {
    slug: 'ireland',
    code: 'ie',
    name: 'Ireland',
    flag: '🇮🇪',
    heroImage: '/images/destinations/ireland.webp',
    heroImageAlt: "Trinity College Dublin's campanile",
    metaTitle: 'Study in Ireland from Uzbekistan/Tajikistan | Universe In',
    metaDescription: "Learn how Uzbek and Tajik students get Ireland's study visa, apply to English-taught universities, and budget for Dublin. Free consultation with Universe In.",
    h1: "Study in Ireland: An English-Speaking Gateway to Europe's Tech Hub for Uzbek & Tajik Students",
    intro: "To study in Ireland from Uzbekistan or Tajikistan, you apply directly to an Irish university, secure an offer plus proof of tuition payment and medical insurance, then apply for the 'D' study visa and register for an Irish Residence Permit on arrival, a process that typically takes 4-7 months given standard processing times.",
    visaName: "Irish Study Visa ('D' long-stay visa) + Irish Residence Permit (IRP, Stamp 2)",
    visaNote: "Ireland requires proof of private medical insurance and evidence of paid tuition fees (or a firm offer) before the visa is approved, and registering for the IRP with the local immigration office after arrival is a mandatory separate step from the entry visa itself — missing this registration window can affect your legal status.",
    costRange: 'approximately $14,000–$28,000+',
    costNote: 'Non-EU tuition typically runs €10,000–€25,000+ depending on the program (business and tech sit in the mid-range; medicine is much higher), and Dublin is one of the most expensive cities in Western Europe for student housing — choosing a regional city like Cork, Galway, or Limerick can meaningfully lower your living costs.',
    popularFields: ['Computer Science & Data Analytics', 'Business & International Finance', 'Pharmaceutical Science & Biotech', 'Hospitality & Tourism Management'],
    timeline: 'approximately 4–7 months; apply early since Irish visa decisions can take 8–12 weeks on their own',
    whyThisCountry: [
      'An English-speaking country by default, meaning no second foreign language on top of English to manage, which simplifies both your studies and daily life compared to continental Europe',
      'A direct pipeline into the European tech industry — Dublin hosts the European headquarters of most major US tech companies, giving computer science and business graduates unusually direct access to that job market',
      "The Third Level Graduate Programme lets master's graduates stay and work for up to 2 years after graduation (1 year for bachelor's), with no job offer required to get it — one of the more generous post-study stay periods among English-speaking destinations",
    ],
    faqs: [
      { q: 'Can I work while studying in Ireland?', a: "Yes — non-EU students with valid Stamp 2 permission can work up to 20 hours a week during term time, and up to 40 hours a week during official college holidays." },
      { q: 'What happens after graduation?', a: "Graduates qualify for the Third Level Graduate Programme (Stamp 1G), which grants up to 12 months for bachelor's graduates and up to 24 months for master's or PhD graduates to remain in Ireland and seek employment, with no job offer required upfront." },
      { q: 'Is a scholarship realistic?', a: "Government-funded scholarships for students outside specific partner-country lists are limited. Some universities offer partial merit scholarships, often a few thousand euros off tuition, but full-ride funding is rare — most applicants from Uzbekistan and Tajikistan should budget to self-fund and treat any scholarship as a bonus, not the plan." },
      { q: 'Do I need IELTS, or can I use Duolingo?', a: "Most Irish universities require IELTS (commonly 6.0–6.5 overall) or an equivalent test, and a growing number now also accept the Duolingo English Test — but acceptance varies by university and program, so confirm directly with your chosen school rather than assuming." },
    ],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}
