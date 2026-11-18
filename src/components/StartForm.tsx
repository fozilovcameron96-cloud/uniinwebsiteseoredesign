import { useEffect, useMemo, useState } from 'react'
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js/mobile'
import type { CountryCode } from 'libphonenumber-js'
import { adAnswers } from '../data/adParams'

// ─── THE ROUND 3 AD LANDING PAGE (/start, /en/start) ──────────────────────────
// Built 18 Nov 2026 after Round 2's instant-form leads couldn't be reached:
// Facebook pre-fills old numbers and an instant form takes no thought. This
// looks and moves like an instant form (one question per screen, big tap
// targets, no navigation), but it's our page, and the lead types their own
// number. The questions were locked with the founder, see
// Projects/uni-in/ads/campaign-1/round-3/LANDING_PAGE.md.
//
// The founder's rule: university programmes need £10,000 a year (POUNDS) or it
// isn't a lead. Language courses are the exception (cheap, easy conversions),
// so study level is asked first and the language path skips the £10k question
// and gets its own budget bands. Anyone filtered out never becomes a lead.
//
// Answer values are sent in English whatever language the page is shown in,
// so the scorer (silk-leads-dashboard lib/agents/lead-qual.ts) has one fixed
// set of strings to match. Change an option's `value` there too, or it scores 0.

const API = 'https://silk-leads-dashboard.vercel.app/api/leads/submit'
const CID = '00000000-0000-0000-0000-000000000002'
const FORM_VERSION = 'landing_v1'

// The thank-you screen's "Text us now" buttons, each with the message already
// typed, including the lead's reference (UI-XXXXXX).
//
// WhatsApp goes to the WhatsApp BOT's number (founder's idea, 18 Nov): if they
// send it, the bot recognises them (by number, or by the reference), answers,
// and cancels its own opener; if they don't, the bot writes to them first after
// 5 minutes. So the bot only chases people who didn't write, and dad's alert
// says "wrote to us first" for those who did.
//
// Telegram goes to DAD's own Telegram (there's no Telegram bot, by choice), so
// nothing can see whether they wrote there; the WhatsApp bot still follows up.
// TELEGRAM_USERNAME is the account without the @; the button hides while empty.
// @UNIVERSITY_IN ("Uni.In") is Uni In's own Telegram account, the one the
// website already lists (user, 18 Nov; checked: a person account, not a channel).
const WHATSAPP_NUMBER = '447476973866'
const TELEGRAM_USERNAME = 'UNIVERSITY_IN'

const OR = '#F97316'
const OR2 = '#D95F00'

type L = 'ru' | 'en'
type Key = 'study_level' | 'affords_10k' | 'english_level' | 'budget' | 'funding'
interface Opt { value: string; ru: string; en: string; end?: boolean }
interface Question { key: Key; ru: string; en: string; options: Opt[] }

const Q_STUDY: Question = {
  key: 'study_level',
  en: 'What do you want to study?',
  ru: 'Что вы хотите изучать?',
  options: [
    { value: 'Foundation year', en: 'Foundation year', ru: 'Foundation (подготовительный год)' },
    { value: 'Undergraduate', en: 'Undergraduate', ru: 'Бакалавриат' },
    { value: 'Postgraduate (MA/MSc)', en: 'Postgraduate (MA/MSc)', ru: 'Магистратура (MA/MSc)' },
    { value: 'PhD', en: 'PhD', ru: 'PhD (докторантура)' },
    { value: 'Language courses', en: 'Language courses', ru: 'Языковые курсы' },
    { value: 'Other', en: 'Other', ru: 'Другое' },
  ],
}

const Q_AFFORD: Question = {
  key: 'affords_10k',
  en: "University programmes in the UK (foundation, undergraduate, master's, PhD) cost a minimum of £10,000 a year, plus living costs. Is that within your budget?",
  ru: 'Обучение в университетах Великобритании (foundation, бакалавриат, магистратура, PhD) стоит минимум £10 000 в год, плюс расходы на проживание. Это в рамках вашего бюджета?',
  options: [
    { value: 'Yes', en: 'Yes', ru: 'Да' },
    { value: 'No', en: 'No, not right now', ru: 'Нет, пока нет', end: true },
  ],
}

const Q_ENGLISH: Question = {
  key: 'english_level',
  en: "What's your English level?",
  ru: 'Какой у вас уровень английского?',
  options: [
    { value: 'No certificate yet', en: 'No certificate yet', ru: 'Пока нет сертификата' },
    { value: 'B1', en: 'B1', ru: 'B1' },
    { value: 'B2', en: 'B2', ru: 'B2' },
    { value: 'IELTS below 6', en: 'IELTS below 6', ru: 'IELTS ниже 6' },
    { value: 'IELTS 6+', en: 'IELTS 6+', ru: 'IELTS 6+' },
  ],
}

const Q_BUDGET_UNI: Question = {
  key: 'budget',
  en: "What's your yearly budget?",
  ru: 'Какой у вас бюджет в год?',
  options: [
    { value: 'Under £10,000', en: 'Under £10,000 / No budget', ru: 'Меньше £10 000 / нет бюджета', end: true },
    { value: '£10,000 – £15,000', en: '£10,000 – £15,000', ru: '£10 000 – £15 000' },
    { value: '£15,000 – £20,000', en: '£15,000 – £20,000', ru: '£15 000 – £20 000' },
    { value: '£20,000 – £30,000', en: '£20,000 – £30,000', ru: '£20 000 – £30 000' },
    { value: 'Over £30,000', en: 'Over £30,000', ru: 'Больше £30 000' },
    { value: 'Only a full scholarship', en: 'Only a full scholarship', ru: 'Только полная стипендия', end: true },
  ],
}

const Q_BUDGET_LANG: Question = {
  key: 'budget',
  en: "What's your budget for the course?",
  ru: 'Какой у вас бюджет на курс?',
  options: [
    { value: 'No budget / Under £2,000', en: 'No budget / Under £2,000', ru: 'Нет бюджета / меньше £2 000' },
    { value: '£2,000 – £5,000', en: '£2,000 – £5,000', ru: '£2 000 – £5 000' },
    { value: '£5,000 – £10,000', en: '£5,000 – £10,000', ru: '£5 000 – £10 000' },
    { value: 'Over £10,000', en: 'Over £10,000', ru: 'Больше £10 000' },
  ],
}

const Q_FUNDING: Question = {
  key: 'funding',
  en: 'Who will pay for your studies?',
  ru: 'Кто будет оплачивать обучение?',
  options: [
    { value: 'Me', en: 'Me', ru: 'Я сам(а)' },
    { value: 'My parents / family', en: 'My parents / family', ru: 'Родители / семья' },
    { value: 'Someone else (sponsor, company)', en: 'Someone else (sponsor, company)', ru: 'Кто-то другой (спонсор, компания)' },
  ],
}

const isLanguagePath = (a: Partial<Record<Key, string>>) => a.study_level === 'Language courses'
const flowFor = (a: Partial<Record<Key, string>>): Question[] =>
  isLanguagePath(a)
    ? [Q_STUDY, Q_ENGLISH, Q_BUDGET_LANG, Q_FUNDING]
    : [Q_STUDY, Q_AFFORD, Q_ENGLISH, Q_BUDGET_UNI, Q_FUNDING]

// ─── PHONE ────────────────────────────────────────────────────────────────────
// Checked against Google's libphonenumber data (the mobile-only build): the
// right length and a real mobile prefix for the chosen country, so a typo or a
// made-up number can't be submitted. Sent as +E.164, so the lead system never
// has to guess the country code again.

// Georgia added 18 Nov: Round 3 targets Tbilisi alongside Almaty, Baku and Yerevan.
const TOP: CountryCode[] = ['KZ', 'UZ', 'AZ', 'AM', 'GE', 'TJ', 'KG', 'TM', 'GB']
const PLACEHOLDER: Partial<Record<CountryCode, string>> = {
  UZ: '90 123 45 67', KZ: '701 123 4567', AZ: '50 123 45 67', AM: '77 123456', GE: '555 12 34 56',
  TJ: '93 123 4567', KG: '700 123 456', TM: '65 123456', GB: '7400 123456',
}
// The ad's country isn't in the URL, so the visitor's own time zone picks the
// starting flag. Almost always right, and one tap to change when it isn't.
const TZ_COUNTRY: Record<string, CountryCode> = {
  'Asia/Tashkent': 'UZ', 'Asia/Samarkand': 'UZ',
  'Asia/Almaty': 'KZ', 'Asia/Qostanay': 'KZ', 'Asia/Qyzylorda': 'KZ', 'Asia/Aqtobe': 'KZ',
  'Asia/Aqtau': 'KZ', 'Asia/Atyrau': 'KZ', 'Asia/Oral': 'KZ',
  'Asia/Baku': 'AZ', 'Asia/Yerevan': 'AM', 'Asia/Tbilisi': 'GE', 'Asia/Dushanbe': 'TJ', 'Asia/Bishkek': 'KG',
  'Asia/Ashgabat': 'TM',
  // No Europe/London on purpose: the ads run in Central Asia and the Caucasus,
  // so anyone else (including the founder testing from London) starts on
  // Uzbekistan, the biggest market, and changes the flag if they need to.
}

// The ways people really type a number that the plain parse misses:
//   "00998 90…"  international with 00 instead of +
//   "8 90 123…"  the old Soviet trunk prefix, still a habit in Uzbekistan
function parseSmart(raw: string, country: CountryCode) {
  const p = parsePhoneNumberFromString(raw, country)
  if (p?.isValid()) return p
  const digits = raw.replace(/\D/g, '')
  if (raw.trim().startsWith('00')) {
    const q = parsePhoneNumberFromString('+' + digits.slice(2))
    if (q?.isValid()) return q
  }
  if (digits.startsWith('8') && !raw.trim().startsWith('+')) {
    const q = parsePhoneNumberFromString(digits.slice(1), country)
    if (q?.isValid()) return q
  }
  return p ?? null
}

function startingCountry(): CountryCode {
  const all = getCountries()
  try {
    const c = new URLSearchParams(window.location.search).get('c')?.toUpperCase()
    if (c && all.includes(c as CountryCode)) return c as CountryCode
  } catch { /* ignore */ }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (TZ_COUNTRY[tz]) return TZ_COUNTRY[tz]
  } catch { /* ignore */ }
  return 'UZ'
}

const flag = (c: string) => String.fromCodePoint(...[...c].map(ch => 0x1f1e6 + ch.charCodeAt(0) - 65))

type DisplayNamesCtor = new (locales: string[], opts: { type: 'region' }) => { of(code: string): string | undefined }
function regionNamer(lang: L): (c: string) => string {
  try {
    const DN = (Intl as unknown as { DisplayNames?: DisplayNamesCtor }).DisplayNames
    if (DN) {
      const dn = new DN([lang], { type: 'region' })
      return c => dn.of(c) ?? c
    }
  } catch { /* old browser */ }
  return c => c
}

// Meta Pixel, loaded in index.html. Optional: an ad blocker or a failed load
// leaves it undefined, and the form must work the same either way.
function pixel(...args: unknown[]) {
  try { (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(...args) } catch { /* never block a lead */ }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Once filtered out (no to £10k, under £10k, or scholarship only), the same
// browser sees the "not right now" screen for 30 days, so reloading and
// tapping "Yes" this time doesn't turn them into a lead. Easy to get around on
// purpose (another browser), but it stops the one-tap retry, which is what
// actually happens. Storage can be blocked, so every access is guarded.
const FILTER_KEY = 'uni_in_start_filtered'
const FILTER_DAYS = 30
function wasFilteredOut(): boolean {
  try {
    const at = Number(localStorage.getItem(FILTER_KEY))
    return !!at && Date.now() - at < FILTER_DAYS * 86400000
  } catch { return false }
}
function rememberFilteredOut() {
  try { localStorage.setItem(FILTER_KEY, String(Date.now())) } catch { /* blocked storage: nothing to remember */ }
}

type Screen = 'intro' | number | 'details' | 'notNow' | 'thanks'

// Language comes in as props, not from the site's LangContext: that context
// imports every page's translations, and this page must stay small (start.html).
export default function StartForm({ lang: pageLang, setLang }: { lang: string; setLang: (l: L) => void }) {
  const lang: L = pageLang === 'en' ? 'en' : 'ru'
  const t = (en: string, ru: string) => (lang === 'en' ? en : ru)

  // start.html draws the intro before React loads; if they already tapped its
  // Start button, open straight on the first question.
  const [screen, setScreen] = useState<Screen>(() =>
    wasFilteredOut() ? 'notNow' : (window as unknown as { __uiStartTapped?: number }).__uiStartTapped ? 0 : 'intro')
  const [answers, setAnswers] = useState<Partial<Record<Key, string>>>({})

  const [name, setName] = useState('')
  const [country, setCountry] = useState<CountryCode>(startingCountry)
  const [phone, setPhone] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [channel, setChannel] = useState<'' | 'whatsapp' | 'telegram'>('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [leadId, setLeadId] = useState('')

  const flow = flowFor(answers)

  useEffect(() => {
    document.title = t('Apply in 1 minute | Universe In', 'Заявка за 1 минуту | Universe In')
    document.documentElement.lang = lang
    // An ad landing page, not something to rank: keep it out of search.
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex,follow'
    document.head.appendChild(robots)
    return () => robots.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => { window.scrollTo(0, 0) }, [screen])

  const parsed = useMemo(() => {
    const raw = phone.trim()
    return raw ? parseSmart(raw, country) : null
  }, [phone, country])

  // A number that's wrong for the chosen flag but right for exactly one of our
  // countries (say an Uzbek "90 123 45 67" with Kazakhstan selected): switch
  // the flag for them when they leave the field. Two or more matches is
  // genuinely ambiguous, so then they're asked to check the flag instead.
  function onPhoneBlur() {
    setPhoneTouched(true)
    const raw = phone.trim()
    if (!raw || raw.startsWith('+') || phoneValid) return
    const matches = TOP.filter(c => c !== country && parseSmart(raw, c)?.isValid())
    if (matches.length === 1) setCountry(matches[0])
  }
  const phoneValid = !!parsed?.isValid()

  // Someone who types the full number with "+" gets the right flag picked for
  // them, so the two can't disagree.
  useEffect(() => {
    if (phone.trim().startsWith('+') && parsed?.country && parsed.country !== country) setCountry(parsed.country)
  }, [parsed, phone, country])

  const names = useMemo(() => regionNamer(lang), [lang])
  const others = useMemo(() => getCountries()
    .filter(c => !TOP.includes(c))
    .map(c => ({ c, n: names(c) }))
    .sort((a, b) => a.n.localeCompare(b.n, lang)), [names, lang])

  function pick(q: Question, idx: number, opt: Opt) {
    // Changing the study level resets everything after it: the two paths ask
    // different questions with different budget options.
    const next: Partial<Record<Key, string>> =
      q.key === 'study_level' && answers.study_level !== opt.value ? { study_level: opt.value } : { ...answers, [q.key]: opt.value }
    setAnswers(next)
    if (opt.end) {
      rememberFilteredOut()
      setTimeout(() => setScreen('notNow'), 180)
      return
    }
    const nextFlow = flowFor(next)
    setTimeout(() => setScreen(idx + 1 < nextFlow.length ? idx + 1 : 'details'), 180)
  }

  function back() {
    if (screen === 'details') setScreen(flow.length - 1)
    else if (typeof screen === 'number') setScreen(screen === 0 ? 'intro' : screen - 1)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = t('Please enter your name', 'Пожалуйста, введите ваше имя')
    if (!phoneValid) errs.phone = 'invalid'
    if (!channel) errs.channel = t('Please choose WhatsApp or Telegram', 'Пожалуйста, выберите WhatsApp или Telegram')
    if (!EMAIL.test(email.trim())) errs.email = t('Please enter a valid email', 'Пожалуйста, введите правильный email')
    setPhoneTouched(true)
    setErrors(errs)
    if (Object.keys(errs).length || !parsed) return

    setSubmitting(true)
    try {
      // Local testing (npm run dev) never creates a real lead: the lead API is
      // production, and a test row would reach dad's Sheet and the WhatsApp bot.
      if (import.meta.env.DEV) {
        console.info('StartForm (dev): not sent. Would have posted:', { whatsapp: parsed.number, answers: { ...answers, contact_channel: channel, form: FORM_VERSION, ...adAnswers() } })
        await new Promise(r => setTimeout(r, 400))
        setLeadId('00000000-dev0-test-0000-000000000000')
        setScreen('thanks')
        return
      }
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: CID,
          name: name.trim(),
          whatsapp: parsed.number,
          email: email.trim(),
          source: 'landing_page',
          answers: { ...answers, contact_channel: channel, form: FORM_VERSION, ...adAnswers() },
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      const id: string = data.lead?.id ?? ''
      const pr: string = data.lead?.priority ?? 'cold'
      setLeadId(id)
      setScreen('thanks')
      // Only after the lead is saved, so Meta never counts a submit that failed.
      pixel('track', 'Lead', { content_name: FORM_VERSION }, id ? { eventID: `lead_${id}` } : undefined)
      if (pr === 'hot' || pr === 'warm') {
        pixel('trackCustom', 'QualifiedLead', { priority: pr }, id ? { eventID: `qual_${id}` } : undefined)
      }
    } catch {
      setErrors({ form: t('Something went wrong. Please try again.', 'Что-то пошло не так. Попробуйте ещё раз.') })
    } finally {
      setSubmitting(false)
    }
  }

  const progress =
    screen === 'intro' ? 0
      : typeof screen === 'number' ? (screen + 1) / (flow.length + 1)
        : screen === 'details' ? flow.length / (flow.length + 1)
          : 1

  const ref = leadId ? 'UI-' + leadId.slice(0, 6).toUpperCase() : ''
  const waText = t(
    `Hi! I've just applied on the Universe In website. My name is ${name.trim()}.${ref ? ` Ref: ${ref}` : ''}`,
    `Здравствуйте! Я только что оставил(а) заявку на сайте Universe In. Меня зовут ${name.trim()}.${ref ? ` Номер заявки: ${ref}` : ''}`,
  )
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`
  // t.me/<username>?text= opens the chat with the message typed in, ready to send.
  const tgUrl = TELEGRAM_USERNAME ? `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(waText)}` : ''
  const lang_ = isLanguagePath(answers)

  const optionBtn = (selected: boolean) =>
    `w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border-2 transition-colors ${
      selected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white active:bg-gray-50'}`

  const backLink = (
    <button type="button" onClick={back} className="flex items-center gap-1 text-sm font-semibold text-gray-400 mb-4">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      {t('Back', 'Назад')}
    </button>
  )

  const primaryBtn = 'w-full py-4 rounded-xl text-white text-base font-bold disabled:opacity-60'

  return (
    <div className="min-h-screen bg-[#F0F2F5] sm:py-8">
      <div className="mx-auto w-full max-w-[440px] bg-white sm:rounded-2xl sm:shadow-sm overflow-hidden min-h-screen sm:min-h-0">

        {/* Header: like an instant form's cover and page name */}
        <div className="relative h-24" style={{ background: `linear-gradient(135deg, ${OR}, ${OR2})` }}>
          <div className="absolute top-3 right-3 flex gap-1">
            {(['ru', 'en'] as const).map(l => (
              <button key={l} type="button" onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${lang === l ? 'bg-white text-orange-600' : 'bg-white/20 text-white'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {/* Round, like a Facebook page's profile picture. logo-round.png is the
              640px WhatsApp profile logo (ads/assets/whatsapp-profile-uniin.png),
              made to sit inside a circle crop, scaled to 192px. */}
          <img src="/logo-round.png" alt="Universe In" width={56} height={56}
            className="absolute -bottom-7 left-5 w-14 h-14 rounded-full object-cover bg-black ring-4 ring-white shadow" />
        </div>
        <div className="pl-[88px] pr-5 pt-2 pb-3">
          <div className="font-bold text-gray-900 leading-tight">Universe In</div>
          <div className="text-xs text-gray-500">{t('Study abroad consultancy · London', 'Консультанты по учёбе за рубежом · Лондон')}</div>
        </div>
        <div className="h-1 bg-gray-100">
          <div className="h-1 transition-all duration-300" style={{ width: `${progress * 100}%`, background: OR }} />
        </div>

        <div className="px-5 pt-6 pb-10">

          {screen === 'intro' && (
            <div>
              <h1 className="text-[22px] font-bold text-gray-900 leading-snug">
                {t('Study at a top UK university from £18,000 a year', 'Учёба в топовом университете Великобритании от £18 000 в год')}
              </h1>
              <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">
                {t("Answer a few quick questions and we'll send you the universities that fit your budget.",
                  'Ответьте на несколько коротких вопросов, и мы пришлём вам университеты, которые подходят под ваш бюджет.')}
              </p>
              {/* No "free" here on purpose (founder, 18 Nov): it pulls in people
                  who read it as "studying is free", the dead leads this page
                  exists to keep out. */}
              <p className="mt-2 text-sm text-gray-400">{t('Takes about 1 minute.', 'Около 1 минуты.')}</p>
              <button type="button" onClick={() => setScreen(0)} className={`${primaryBtn} mt-7`} style={{ background: OR }}>
                {t('Start', 'Начать')}
              </button>
            </div>
          )}

          {typeof screen === 'number' && flow[screen] && (() => {
            const q = flow[screen]
            return (
              <div key={`${q.key}-${screen}`}>
                {backLink}
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {t(`Question ${screen + 1} of ${flow.length}`, `Вопрос ${screen + 1} из ${flow.length}`)}
                </div>
                <h2 className="mt-1.5 text-lg font-bold text-gray-900 leading-snug">{lang === 'en' ? q.en : q.ru}</h2>
                <div className="mt-5 flex flex-col gap-2.5">
                  {q.options.map(o => {
                    const selected = answers[q.key] === o.value
                    return (
                      <button key={o.value} type="button" onClick={() => pick(q, screen, o)} aria-pressed={selected} className={optionBtn(selected)}>
                        <span className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-orange-500' : 'border-gray-300'}`}>
                          {selected && <span className="w-2.5 h-2.5 rounded-full" style={{ background: OR }} />}
                        </span>
                        <span className="text-[15px] font-medium text-gray-800">{lang === 'en' ? o.en : o.ru}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          {screen === 'details' && (
            <form onSubmit={submit} noValidate>
              {backLink}
              <h2 className="text-lg font-bold text-gray-900">{t('Where should we send your options?', 'Куда отправить ваши варианты?')}</h2>
              <p className="mt-1 text-sm text-gray-500">{t('A consultant will message you. No cold calls, no spam.', 'Консультант напишет вам. Без звонков и спама.')}</p>

              <label className="block mt-5 text-xs font-bold text-gray-500 uppercase tracking-wide" htmlFor="sf-name">{t('Full name', 'Имя и фамилия')}</label>
              <input id="sf-name" autoComplete="name" value={name} onChange={e => setName(e.target.value)}
                className="mt-1.5 w-full h-12 px-3.5 rounded-xl border-2 border-gray-200 text-base focus:border-orange-500 outline-none" />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}

              <label className="block mt-4 text-xs font-bold text-gray-500 uppercase tracking-wide" htmlFor="sf-phone">{t('Phone number', 'Номер телефона')}</label>
              <div className="mt-1.5 flex">
                <div className="relative shrink-0">
                  <div className="h-12 pl-3 pr-2 flex items-center gap-1.5 rounded-l-xl border-2 border-r-0 border-gray-200 bg-gray-50 text-base">
                    <span className="text-xl leading-none">{flag(country)}</span>
                    <span className="font-semibold text-gray-700">+{getCountryCallingCode(country)}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                  <select aria-label={t('Country code', 'Код страны')} value={country}
                    onChange={e => { setCountry(e.target.value as CountryCode); if (phone.trim().startsWith('+')) setPhone('') }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                    <optgroup label={t('Popular', 'Популярные')}>
                      {TOP.map(c => <option key={c} value={c}>{`${flag(c)} ${names(c)} (+${getCountryCallingCode(c)})`}</option>)}
                    </optgroup>
                    <optgroup label={t('All countries', 'Все страны')}>
                      {others.map(({ c, n }) => <option key={c} value={c}>{`${flag(c)} ${n} (+${getCountryCallingCode(c)})`}</option>)}
                    </optgroup>
                  </select>
                </div>
                <input id="sf-phone" type="tel" inputMode="tel" autoComplete="tel-national" value={phone}
                  placeholder={PLACEHOLDER[country] ?? ''}
                  onChange={e => setPhone(e.target.value)} onBlur={onPhoneBlur}
                  className={`min-w-0 flex-1 h-12 px-3.5 rounded-r-xl border-2 text-base outline-none focus:border-orange-500 ${
                    phoneTouched && phone.trim() && !phoneValid ? 'border-red-400' : phoneValid ? 'border-green-500' : 'border-gray-200'}`} />
              </div>
              {!phoneValid && (errors.phone || (phoneTouched && phone.trim())) && (
                <p className="mt-1 text-sm text-red-500">{t('Please check your number and the country flag', 'Пожалуйста, проверьте номер и флажок страны')}</p>
              )}

              <div className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-wide">{t('Where should we message you?', 'Куда вам написать?')}</div>
              <div className="mt-1.5 flex gap-2">
                {(['whatsapp', 'telegram'] as const).map(c => (
                  <button key={c} type="button" aria-pressed={channel === c}
                    onClick={() => { setChannel(c); setErrors(p => ({ ...p, channel: '' })) }}
                    className={`flex-1 h-12 rounded-xl border-2 text-[15px] font-semibold ${
                      channel === c ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-700'}`}>
                    {c === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
                  </button>
                ))}
              </div>
              {errors.channel && <p className="mt-1 text-sm text-red-500">{errors.channel}</p>}

              <label className="block mt-4 text-xs font-bold text-gray-500 uppercase tracking-wide" htmlFor="sf-email">Email</label>
              <input id="sf-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
                className="mt-1.5 w-full h-12 px-3.5 rounded-xl border-2 border-gray-200 text-base focus:border-orange-500 outline-none" />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}

              {errors.form && <p className="mt-4 text-sm text-red-500">{errors.form}</p>}
              <button type="submit" disabled={submitting} className={`${primaryBtn} mt-6`} style={{ background: OR }}>
                {submitting ? t('Sending…', 'Отправка…') : t('Submit', 'Отправить')}
              </button>
              <p className="mt-3 text-xs text-gray-400 text-center leading-relaxed">
                {t('By submitting, you agree to our ', 'Отправляя заявку, вы соглашаетесь с нашей ')}
                <a href={lang === 'en' ? '/en/privacy' : '/privacy'} target="_blank" rel="noopener noreferrer" className="underline">
                  {t('Privacy Policy', 'Политикой конфиденциальности')}
                </a>.
              </p>
            </form>
          )}

          {screen === 'notNow' && (
            <div className="text-center pt-4">
              <h2 className="text-xl font-bold text-gray-900">{t('Thanks for your interest', 'Спасибо за интерес')}</h2>
              <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">
                {t('Right now our university programmes start from £10,000 a year. If your plans change, we’re here to help.',
                  'Сейчас наши университетские программы начинаются от £10 000 в год. Если ваши планы изменятся, мы будем рады помочь.')}
              </p>
              {/* No "change my answer" and no link onward (founder, 18 Nov): one
                  tap back to "Yes" turned a filtered-out visitor into a fake lead,
                  and the main site's older quiz only asks for $5k. */}
            </div>
          )}

          {screen === 'thanks' && (
            <div className="text-center pt-2">
              <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,115,22,.12)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={OR} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {lang_ ? t('Your course options are ready', 'Варианты курсов для вас готовы') : t('Your university list is ready', 'Ваш список университетов готов')}
              </h2>
              <p className="mt-2 text-[15px] text-gray-600">
                {t("Text us now and we'll send it to you straight away.", 'Напишите нам сейчас, и мы сразу отправим его вам.')}
              </p>

              {/* The app they picked comes first, in the page itself (not just
                  visually), so screen readers and keyboards get the same order. */}
              <div className="mt-6 flex flex-col gap-3">
                {(channel === 'telegram' ? ['telegram', 'whatsapp'] : ['whatsapp', 'telegram']).map(c =>
                  c === 'telegram'
                    ? tgUrl && (
                      <a key="tg" href={tgUrl} target="_blank" rel="noopener noreferrer" onClick={() => pixel('trackCustom', 'MessageTap', { channel: 'telegram' })}
                        className="w-full py-4 rounded-xl text-white text-base font-bold" style={{ background: '#229ED9' }}>
                        {t('Text us on Telegram', 'Написать нам в Telegram')}
                      </a>
                    )
                    : (
                      <a key="wa" href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => pixel('trackCustom', 'MessageTap', { channel: 'whatsapp' })}
                        className="w-full py-4 rounded-xl text-white text-base font-bold" style={{ background: '#25D366' }}>
                        {t('Text us on WhatsApp', 'Написать нам в WhatsApp')}
                      </a>
                    ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {t('The message is already written for you. Just press send.', 'Сообщение уже написано за вас. Просто нажмите «Отправить».')}
              </p>
              {ref && <p className="mt-5 text-xs text-gray-400">{t('Your reference', 'Номер заявки')}: {ref}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
