import { useState, useRef, useEffect } from 'react'

const API = 'https://silk-leads-dashboard.vercel.app/api/leads/submit'
const CID = '00000000-0000-0000-0000-000000000002'
const OR  = '#F97316'
const OR2 = '#D95F00'
const WA  = '447459639803'

const ANIM = `
@keyframes uq-modal { from{opacity:0;transform:scale(.93) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes uq-step  { from{opacity:0;transform:translateX(22px)}            to{opacity:1;transform:translateX(0)} }
@keyframes uq-opt   { from{opacity:0;transform:translateY(8px)}              to{opacity:1;transform:translateY(0)} }
@keyframes uq-done  { from{opacity:0;transform:scale(.88)}                   to{opacity:1;transform:scale(1)} }
.uq-modal{animation:uq-modal .32s cubic-bezier(.16,1,.3,1) both}
.uq-step {animation:uq-step  .26s cubic-bezier(.16,1,.3,1) both}
.uq-done {animation:uq-done  .45s cubic-bezier(.34,1.4,.64,1) both}
@media (max-width:640px){
  .uq-modal{border-radius:14px;max-height:100vh;max-width:100%}
  .uq-header{padding:1rem 1.1rem .8rem!important}
  .uq-body{max-width:100%!important}
  .uq-body{padding:1.5rem 1.1rem!important;justify-content:flex-start!important}
  .uq-q{font-size:1.2rem!important;margin-bottom:1.25rem!important}
  .uq-grid{grid-template-columns:1fr!important;gap:.55rem!important}
  .uq-opt{padding:.85rem 1rem!important;font-size:.95rem!important}
  .uq-contact-q{font-size:1.2rem!important}
  .uq-field{padding:.85rem 1rem!important;font-size:.95rem!important}
  .uq-btn{padding:.9rem!important;font-size:.95rem!important}
  .uq-done-title{font-size:1.05rem!important}
  .uq-done-body{font-size:.85rem!important}
}
`

function useAnimStyles() {
  useEffect(() => {
    if (document.getElementById('uq-anim')) return
    const el = document.createElement('style')
    el.id = 'uq-anim'
    el.textContent = ANIM
    document.head.appendChild(el)
  }, [])
}

const FLAGS = {
  'Узбекистан':'uz','Таджикистан':'tj','Казахстан':'kz','Кыргызстан':'kg','Азербайджан':'az',
  'Великобритания':'gb','США':'us','Канада':'ca','Австралия':'au','Новая Зеландия':'nz',
  'Германия':'de','Франция':'fr','Нидерланды':'nl','ОАЭ':'ae',
}

function FlagImg({ ruLabel }) {
  const code = FLAGS[ruLabel]
  if (!code) return null
  return (
    <img src={`https://flagcdn.com/w20/${code}.png`} srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
      width="20" height="15" alt={ruLabel} style={{ borderRadius:2, flexShrink:0, objectFit:'cover' }} />
  )
}

const Icon = {
  Globe: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  GradCap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  Book: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Plane: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>,
  Language: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Wallet: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>,
}

const STEPS = [
  {
    key: 'country_from', icon: 'Globe',
    question: 'Из какой вы страны?', questionEn: 'Which country are you from?',
    sub: 'Страна', subEn: 'Country',
    cols: 2,
    options:   ['Узбекистан','Таджикистан','Казахстан','Кыргызстан','Азербайджан','Другая страна'],
    optionsEn: ['Uzbekistan','Tajikistan','Kazakhstan','Kyrgyzstan','Azerbaijan','Other country'],
    other: 'Другая страна', otherPlaceholder: 'Напишите вашу страну...', otherPlaceholderEn: 'Type your country...',
  },
  {
    key: 'destination', icon: 'Plane',
    question: 'В какую страну хотите поехать учиться?', questionEn: 'Which country do you want to study in?',
    sub: 'Страна назначения', subEn: 'Study destination',
    cols: 2,
    options:   ['Великобритания','США','Канада','Австралия','Новая Зеландия','Германия','Франция','Нидерланды','ОАЭ','Другая страна'],
    optionsEn: ['United Kingdom','USA','Canada','Australia','New Zealand','Germany','France','Netherlands','UAE','Other country'],
    other: 'Другая страна', otherPlaceholder: 'Какая страна?', otherPlaceholderEn: 'Which country?',
  },
  {
    key: 'study_level', icon: 'GradCap',
    question: 'Какой уровень обучения вас интересует?', questionEn: 'What level of study are you looking for?',
    sub: 'Уровень образования', subEn: 'Level of study',
    cols: 2,
    options:   ['Бакалавриат','Магистратура','Докторантура (PhD)','Языковые курсы','Короткие программы','Foundation','Другое'],
    optionsEn: ['Undergraduate','Postgraduate (MA/MSc)','PhD','Language courses','Short programmes','Foundation year','Other'],
    other: 'Другое', otherPlaceholder: 'Какой уровень обучения?', otherPlaceholderEn: 'Which level of study?',
  },
  {
    key: 'specialization', icon: 'Book',
    question: 'Какая специальность вас интересует?', questionEn: 'What will you study?',
    sub: 'Специальность', subEn: 'Field of study',
    cols: 2,
    options:   ['Бизнес и менеджмент','Финансы и экономика','IT и компьютерные науки','Инженерия и технологии','Медицина и здравоохранение','Право','Искусство и дизайн','Другое'],
    optionsEn: ['Business & Management','Finance & Economics','IT & Computer Science','Engineering & Technology','Medicine & Healthcare','Law','Art & Design','Other'],
    other: 'Другое', otherPlaceholder: 'Какая специальность?', otherPlaceholderEn: 'Which field?',
  },
  {
    key: 'english_level', icon: 'Language',
    question: 'Какой у вас уровень английского?', questionEn: 'What is your current English level?',
    sub: 'Уровень английского', subEn: 'English level',
    cols: 2,
    options:   ['Нет сертификата','IELTS ниже 5.0','IELTS 5.0 – 6.0','IELTS 6.5+','Cambridge B1/B2','Native / Родной','Другое'],
    optionsEn: ['No certificate yet','IELTS below 5.0','IELTS 5.0 – 6.0','IELTS 6.5+','Cambridge B1/B2','Native speaker','Other'],
    other: 'Другое', otherPlaceholder: 'Опишите ваш уровень английского', otherPlaceholderEn: 'Describe your English level',
  },
  {
    key: 'timeline', icon: 'Calendar',
    question: 'Когда планируете начать учёбу?', questionEn: 'When do you plan to start studying?',
    sub: 'Дата начала', subEn: 'Planned intake',
    cols: 1,
    options:   ['Сентябрь 2026','Январь 2027','Сентябрь 2027','Январь 2028','Позже или не уверен','Другое'],
    optionsEn: ['September 2026','January 2027','September 2027','January 2028','Later / not sure yet','Other'],
    other: 'Другое', otherPlaceholder: 'Когда примерно?', otherPlaceholderEn: 'Roughly when?',
  },
  {
    key: 'budget', icon: 'Wallet',
    question: 'Какой у вас примерный бюджет в год?', questionEn: 'What is your approximate annual budget?',
    sub: 'Годовой бюджет', subEn: 'Annual budget',
    cols: 1,
    options:   ['До $5,000 в год','$5,000 – $15,000 в год','$15,000 – $30,000 в год','Свыше $30,000 в год','Ищу стипендии и гранты','Другое'],
    optionsEn: ['Under $5,000/year','$5,000 – $15,000/year','$15,000 – $30,000/year','Over $30,000/year','Looking for scholarships','Other'],
    other: 'Другое', otherPlaceholder: 'Ваш бюджет', otherPlaceholderEn: 'Your budget',
  },
  {
    key: 'concern', icon: 'Shield',
    question: 'Что беспокоит вас больше всего?', questionEn: 'What is your biggest concern right now?',
    sub: 'Главный вопрос', subEn: 'Main concern',
    cols: 2,
    options:   ['Виза и документы','Стоимость / стипендии','Выбор университета','Подготовка к IELTS','Языковой барьер','Другое'],
    optionsEn: ['Visa & documents','Cost / scholarships','Choosing a university','IELTS preparation','Language barrier','Other'],
    other: 'Другое', otherPlaceholder: 'Опишите подробнее...', otherPlaceholderEn: 'Tell us more...',
  },
]

function Opt({ displayLabel, ruLabel, selected, onClick, delay = 0, wide }) {
  const [hov, setHov] = useState(false)
  const on = selected || hov
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{
        display:'flex', alignItems:'center', gap:'.5rem',
        padding: wide ? '1.15rem 1.35rem' : '1rem 1.15rem',
        border:`2px solid ${on ? OR : '#E5E7EB'}`, borderRadius:'12px',
        background: selected ? 'rgba(249,115,22,.08)' : hov ? 'rgba(249,115,22,.04)' : '#fff',
        color: on ? OR2 : '#374151', fontSize:'1rem', fontWeight: selected ? 600 : 400,
        className:'uq-opt',
        cursor:'pointer', textAlign:'left', width:'100%',
        transition:'border-color .13s, background .13s, color .13s',
        animationName:'uq-opt', animationDuration:'.22s',
        animationTimingFunction:'cubic-bezier(.16,1,.3,1)', animationFillMode:'both',
        animationDelay:`${delay}s`,
      }}>
      <FlagImg ruLabel={ruLabel} />
      <span style={{ flex:1 }}>{displayLabel}</span>
      <span style={{
        width:20, height:20, borderRadius:'50%', flexShrink:0,
        border:`2px solid ${selected ? OR : '#E5E7EB'}`,
        background: selected ? OR : 'transparent',
        display:'flex', alignItems:'center', justifyContent:'center',
        transition:'background .13s, border-color .13s',
      }}>
        {selected && <span style={{ color:'#fff', fontSize:'.6rem', fontWeight:800, lineHeight:1 }}>✓</span>}
      </span>
    </button>
  )
}

function Btn({ children, onClick, disabled }) {
  const [hov, setHov] = useState(false)
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick} disabled={disabled}
      style={{
        width:'100%', padding:'1.1rem',
        background: disabled ? '#E5E7EB' : hov ? OR2 : OR,
        color: disabled ? '#9CA3AF' : '#fff', border:'none', borderRadius:'12px',
        fontSize:'1rem', fontWeight:700, className:'uq-btn', cursor: disabled ? 'not-allowed' : 'pointer',
        transition:'background .15s, transform .12s',
        transform: !disabled && hov ? 'translateY(-1px)' : 'none', letterSpacing:'.01em',
      }}>
      {children}
    </button>
  )
}

function StepPane({ children, id }) {
  const [key, setKey] = useState(id)
  const [cls, setCls] = useState('uq-step')
  useEffect(() => {
    setCls('')
    const t = setTimeout(() => { setKey(id); setCls('uq-step') }, 30)
    return () => clearTimeout(t)
  }, [id])
  return <div key={key} className={cls}>{children}</div>
}

function IconBadge({ name }) {
  const C = Icon[name]
  if (!C) return null
  return (
    <div style={{
      width:36, height:36, borderRadius:'10px', background:'rgba(249,115,22,.1)',
      display:'flex', alignItems:'center', justifyContent:'center', color:OR, flexShrink:0,
    }}>
      <C />
    </div>
  )
}

export function UniverseQuiz({ onClose, variant = 'modal' }: { onClose?: () => void; variant?: 'modal' | 'page' }) {
  const page = variant === 'page'
  useAnimStyles()
  const [lang, setLang]             = useState('ru')
  const [step, setStep]             = useState(0)
  const [answers, setAnswers]       = useState({})
  const [otherText, setOtherText]   = useState({})
  const [contact, setContact]       = useState({ name:'', whatsapp:'', email:'', notes:'' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]             = useState(false)
  const [priority, setPriority]     = useState('cold')
  const [error, setError]           = useState('')
  const otherRef = useRef(null)

  const isContact = step === STEPS.length
  const pct       = Math.round((step / (STEPS.length + 1)) * 100)
  const cur       = !isContact ? STEPS[step] : null
  const selVal    = cur ? answers[cur.key] : null
  // A custom ("Other") answer typed on a previous visit to this step won't match any
  // option label - detect that case so navigating back re-shows it instead of looking unanswered.
  const isCustomAnswer = !!(cur?.other && selVal && !cur.options.includes(selVal))
  const showOther = !!(cur?.other && (selVal === '' || isCustomAnswer))

  useEffect(() => { if (showOther) otherRef.current?.focus() }, [showOther])
  useEffect(() => {
    if (isCustomAnswer && cur && otherText[cur.key] === undefined) {
      setOtherText(p => ({ ...p, [cur.key]: selVal }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  function goBack() {
    setStep(s => Math.max(0, s - 1))
  }

  function pick(opt) {
    const isOther = !!(cur.other && opt === cur.other)
    setAnswers(p => ({ ...p, [cur.key]: isOther ? '' : opt }))
    if (!isOther) setTimeout(() => setStep(s => s + 1), 220)
  }

  function confirmOther() {
    const val = (otherText[cur.key] || '').trim()
    if (!val) return
    setAnswers(p => ({ ...p, [cur.key]: val }))
    setTimeout(() => setStep(s => s + 1), 80)
  }

  async function submit() {
    if (!contact.name.trim() || !contact.whatsapp.trim() || !contact.email.trim()) {
      setError(lang === 'en' ? 'Please enter your name, WhatsApp number, and email' : 'Пожалуйста, заполните имя, WhatsApp и email')
      return
    }
    setSubmitting(true); setError('')
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: CID,
          name: contact.name.trim(),
          whatsapp: contact.whatsapp.trim(),
          email: contact.email.trim(),
          source: 'quiz',
          answers: { ...answers, notes: contact.notes.trim() },
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPriority(data.lead?.priority ?? 'cold')
      setDone(true)
    } catch {
      setError(lang === 'en' ? 'Something went wrong. Please try again.' : 'Ошибка. Попробуйте ещё раз.')
    } finally {
      setSubmitting(false)
    }
  }

  const field = {
    width:'100%', padding:'.95rem 1.15rem',
    border:'2px solid #E5E7EB', borderRadius:'12px',
    fontSize:'1rem', color:'#111', background:'#fff',
    boxSizing:'border-box', outline:'none', cursor:'text',
    transition:'border-color .13s, box-shadow .13s',
  } as React.CSSProperties
  const fieldCls = 'uq-field'

  const waMsg = encodeURIComponent(
    lang === 'en'
      ? `Hello! I just submitted my application to Uni In. My name is ${contact.name}.`
      : `Здравствуйте! Я только что заполнил заявку в Uni In. Меня зовут ${contact.name}.`
  )

  const shellStyle = page
    ? { minHeight:'100vh', background:'#F9FAFB', display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', width:'100%', padding:'0' }
    : { position:'fixed' as const, inset:0, zIndex:9999, background:'rgba(0,0,0,.55)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', cursor:'default' }
  const cardStyle = page
    ? { background:'#fff', width:'100%', maxWidth:'760px', overflow:'hidden', display:'flex', flexDirection:'column' as const, margin:'0 auto', boxShadow:'0 1px 3px rgba(0,0,0,.04)', borderRadius:'16px', border:'1px solid #F3F4F6' }
    : { background:'#F9FAFB', borderRadius:'20px', width:'100%', maxWidth:'960px', boxShadow:'0 24px 72px rgba(0,0,0,.22)', overflow:'hidden', maxHeight:'96vh', display:'flex', flexDirection:'column' as const, cursor:'default' }
  const headerPad = page ? '1.4rem max(1.8rem, 5vw) 1.1rem' : '1.4rem 1.8rem 1.1rem'
  const bodyPad = page ? '2.5rem max(2rem, 6vw)' : '2.25rem 2rem'

  return (
    <div
      onClick={page ? undefined : (e => e.target === e.currentTarget && onClose?.())}
      style={shellStyle}>
      <div className={page ? undefined : 'uq-modal'} style={cardStyle}>

        {/* Header */}
        <div className="uq-header" style={{ background:'#fff', flexShrink:0, padding:headerPad, borderBottom:'1px solid #F3F4F6' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.7rem' }}>
            <img src="https://images2.imgbox.com/26/e7/4aGfmDdL_o.jpg" alt="Uni In"
              style={{ height:36, display:'block', borderRadius:6 }} />
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              {['ru','en'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding:'3px 9px', fontSize:'.68rem', fontWeight:700,
                  border:`1px solid ${lang === l ? OR : '#E5E7EB'}`, borderRadius:'5px',
                  background: lang === l ? 'rgba(249,115,22,.1)' : 'transparent',
                  color: lang === l ? OR : '#9CA3AF', cursor:'pointer',
                  textTransform:'uppercase', letterSpacing:'.06em',
                }}>{l}</button>
              ))}
              {!page && onClose && (
                <button onClick={onClose} style={{
                  background:'none', border:'1px solid #E5E7EB', color:'#9CA3AF',
                  width:28, height:28, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', fontSize:'.75rem',
                }}>✕</button>
              )}
              {page && (
                <a href="/" style={{
                  display:'flex', alignItems:'center', gap:'.35rem',
                  padding:'.4rem .8rem', fontSize:'.78rem', fontWeight:600,
                  border:`1px solid ${OR}`, borderRadius:'6px',
                  background:'rgba(249,115,22,.08)', color:OR,
                  textDecoration:'none', cursor:'pointer',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                  {lang === 'en' ? 'Home' : 'Главная'}
                </a>
              )}
            </div>
          </div>
          <div style={{ height:5, background:'#F3F4F6', borderRadius:99, overflow:'hidden' }}>
            <div style={{
              height:'100%', width:`${pct}%`,
              background:`linear-gradient(90deg, ${OR}, #FBBF24)`,
              borderRadius:99, transition:'width .4s cubic-bezier(.16,1,.3,1)',
            }} />
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'.4rem', fontSize:'.68rem', color:'#9CA3AF' }}>
            <span>
              {done
                ? (lang === 'en' ? 'Done' : 'Готово')
                : isContact
                  ? (lang === 'en' ? 'Last step' : 'Последний шаг')
                  : (lang === 'en' ? `Step ${step + 1} of ${STEPS.length}` : `Шаг ${step + 1} из ${STEPS.length}`)
              }
            </span>
            <span style={{ color: pct > 75 ? OR : '#9CA3AF', fontWeight: pct > 75 ? 600 : 400 }}>{pct}%</span>
          </div>
        </div>

        {/* Body */}
        <div className="uq-body" style={{ padding:bodyPad, overflowY:'auto', display:'flex', flexDirection:'column', justifyContent:'flex-start', maxWidth:'100%', margin:'0 auto', width:'100%' }}>

          {done ? (
            <div className="uq-done" style={{ textAlign:'center', padding:'1.5rem 0 .5rem' }}>
              <div style={{
                width:64, height:64, borderRadius:'50%',
                background: priority === 'cold' ? 'rgba(156,163,175,.12)' : 'rgba(249,115,22,.1)',
                margin:'0 auto 1.25rem',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke={priority === 'cold' ? '#9CA3AF' : OR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {priority === 'hot' ? (<>
                <div className="uq-done-title" style={{ fontSize:'1.2rem', fontWeight:700, color:'#111', marginBottom:'.5rem' }}>
                  {lang === 'en' ? 'Application received!' : 'Заявка принята!'}
                </div>
                <div className="uq-done-body" style={{ fontSize:'.875rem', color:'#6B7280', lineHeight:1.75 }}>
                  {lang === 'en'
                    ? <><b>Your profile looks great.</b> Our consultant will contact you on WhatsApp within <strong style={{ color:'#111' }}>1 hour</strong>.</>
                    : <>Ваш профиль выглядит отлично. Консультант свяжется с вами в WhatsApp в течение <strong style={{ color:'#111' }}>1 часа</strong>.</>}
                </div>
                <a href={`https://wa.me/${WA}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem',
                    marginTop:'1.25rem', padding:'.85rem 1.5rem',
                    background:'#25D366', color:'#fff', borderRadius:'10px',
                    textDecoration:'none', fontSize:'.9rem', fontWeight:700,
                  }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {lang === 'en' ? 'Message us on WhatsApp now' : 'Написать в WhatsApp сейчас'}
                </a>
              </>) : priority === 'warm' ? (<>
                <div className="uq-done-title" style={{ fontSize:'1.2rem', fontWeight:700, color:'#111', marginBottom:'.5rem' }}>
                  {lang === 'en' ? 'Application received!' : 'Заявка принята!'}
                </div>
                <div className="uq-done-body" style={{ fontSize:'.875rem', color:'#6B7280', lineHeight:1.75 }}>
                  {lang === 'en'
                    ? <>Our consultant will review your profile and contact you within <strong style={{ color:'#111' }}>24 hours</strong>.</>
                    : <>Консультант рассмотрит вашу заявку и свяжется с вами в течение <strong style={{ color:'#111' }}>24 часов</strong>.</>}
                </div>
              </>) : (<>
                <div className="uq-done-title" style={{ fontSize:'1.2rem', fontWeight:700, color:'#111', marginBottom:'.5rem' }}>
                  {lang === 'en' ? 'Thank you for applying!' : 'Спасибо за заявку!'}
                </div>
                <div className="uq-done-body" style={{ fontSize:'.875rem', color:'#6B7280', lineHeight:1.75 }}>
                  {lang === 'en'
                    ? <>We have received your application and will be in touch.</>
                    : <>Мы получили вашу заявку и рассмотрим её в ближайшее время.</>}
                </div>
              </>)}

              <div style={{
                marginTop:'1.5rem', padding:'.6rem 1.25rem',
                background:'rgba(249,115,22,.08)', borderRadius:99,
                display:'inline-block', fontSize:'.8rem', color:OR, fontWeight:600,
              }}>
                Uni In — {lang === 'en' ? 'your path to international education' : 'ваш путь к образованию за рубежом'}
              </div>
            </div>

          ) : !isContact ? (
            <StepPane id={step}>
              {step > 0 && (
                <button onClick={goBack} style={{
                  display:'flex', alignItems:'center', gap:'.3rem', marginBottom:'1rem',
                  background:'none', border:'none', color:'#9CA3AF', fontSize:'.8rem', fontWeight:600,
                  cursor:'pointer', padding:0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {lang === 'en' ? 'Back' : 'Назад'}
                </button>
              )}
              <div style={{ display:'flex', alignItems:'center', gap:'.85rem', marginBottom:'1.25rem' }}>
                <IconBadge name={cur.icon} />
                <span style={{ fontSize:'.85rem', color:'#9CA3AF', letterSpacing:'.03em' }}>
                  {lang === 'en' ? cur.subEn : cur.sub}
                </span>
              </div>
              <div className="uq-q" style={{ fontSize:'1.5rem', fontWeight:700, color:'#111', lineHeight:1.35, marginBottom:'1.75rem' }}>
                {lang === 'en' ? cur.questionEn : cur.question}
              </div>
              <div className="uq-grid" style={{ display:'grid', gridTemplateColumns: cur.cols === 2 ? '1fr 1fr' : '1fr', gap:'.7rem' }}>
                {cur.options.map((opt, i) => {
                  const displayLabel = lang === 'en' ? (cur.optionsEn?.[i] ?? opt) : opt
                  const isOtherOpt = !!(cur.other && opt === cur.other)
                  const isSelected = selVal === opt || (isOtherOpt && selVal === '')
                  return (
                    <Opt key={opt} displayLabel={displayLabel} ruLabel={opt}
                      selected={isSelected} onClick={() => pick(opt)}
                      delay={i * 0.035} wide={cur.cols === 1} />
                  )
                })}
              </div>
              {showOther && (
                <div className="uq-step" style={{ marginTop:'.75rem' }}>
                  <input ref={otherRef} className={fieldCls} style={field}
                    placeholder={lang === 'en' ? (cur.otherPlaceholderEn ?? cur.otherPlaceholder) : cur.otherPlaceholder}
                    value={otherText[cur.key] || ''}
                    onChange={e => setOtherText(p => ({ ...p, [cur.key]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && confirmOther()}
                    onFocus={e => { e.target.style.borderColor = OR; e.target.style.boxShadow = `0 0 0 3px rgba(249,115,22,.12)` }}
                    onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
                  />
                  <div style={{ marginTop:'.6rem' }}>
                    <Btn onClick={confirmOther} disabled={!(otherText[cur.key]?.trim())}>
                      {lang === 'en' ? 'Next' : 'Далее'}
                    </Btn>
                  </div>
                </div>
              )}
            </StepPane>

          ) : (
            <StepPane id={step}>
              <button onClick={goBack} style={{
                display:'flex', alignItems:'center', gap:'.3rem', marginBottom:'1rem',
                background:'none', border:'none', color:'#9CA3AF', fontSize:'.8rem', fontWeight:600,
                cursor:'pointer', padding:0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                {lang === 'en' ? 'Back' : 'Назад'}
              </button>
              <div style={{ display:'flex', alignItems:'center', gap:'.85rem', marginBottom:'1.25rem' }}>
                <div style={{
                  width:44, height:44, borderRadius:'12px', background:'rgba(249,115,22,.1)',
                  display:'flex', alignItems:'center', justifyContent:'center', color:OR,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <span style={{ fontSize:'.85rem', color:'#9CA3AF' }}>
                  {lang === 'en' ? 'Almost done' : 'Почти готово'}
                </span>
              </div>
              <div className="uq-contact-q" style={{ fontSize:'1.5rem', fontWeight:700, color:'#111', marginBottom:'.5rem' }}>
                {lang === 'en' ? 'How can we reach you?' : 'Как с вами связаться?'}
              </div>
              <div style={{ fontSize:'.95rem', color:'#6B7280', marginBottom:'1.75rem', lineHeight:1.65 }}>
                {lang === 'en'
                  ? 'Our consultant will message you on WhatsApp — no cold calls, no spam.'
                  : 'Консультант напишет вам в WhatsApp — без звонков, без спама.'}
              </div>
              <div style={{ marginBottom:'.65rem' }}>
                <label style={{ display:'block', fontSize:'.75rem', fontWeight:600, color:'#9CA3AF', letterSpacing:'.07em', marginBottom:'.4rem' }}>
                  {lang === 'en' ? 'NAME' : 'ИМЯ'}
                </label>
                <input className={fieldCls} style={field} placeholder={lang === 'en' ? 'Your name' : 'Ваше имя'}
                  value={contact.name} onChange={e => setContact(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => { e.target.style.borderColor = OR; e.target.style.boxShadow = `0 0 0 3px rgba(249,115,22,.12)` }}
                  onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }} />
              </div>
              <div style={{ marginBottom:'.65rem' }}>
                <label style={{ display:'block', fontSize:'.75rem', fontWeight:600, color:'#9CA3AF', letterSpacing:'.07em', marginBottom:'.4rem' }}>WHATSAPP</label>
                <input className={fieldCls} style={field} placeholder="+998 90 123 45 67" type="tel"
                  value={contact.whatsapp} onChange={e => setContact(p => ({ ...p, whatsapp: e.target.value }))}
                  onFocus={e => { e.target.style.borderColor = OR; e.target.style.boxShadow = `0 0 0 3px rgba(249,115,22,.12)` }}
                  onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }} />
              </div>
              <div style={{ marginBottom:'1.25rem' }}>
                <label style={{ display:'block', fontSize:'.75rem', fontWeight:600, color:'#9CA3AF', letterSpacing:'.07em', marginBottom:'.4rem' }}>
                  EMAIL
                </label>
                <input className={fieldCls} style={field} placeholder="your@email.com" type="email" required
                  value={contact.email} onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => { e.target.style.borderColor = OR; e.target.style.boxShadow = `0 0 0 3px rgba(249,115,22,.12)` }}
                  onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }} />
              </div>
              <div style={{ marginBottom:'1.25rem' }}>
                <label style={{ display:'block', fontSize:'.75rem', fontWeight:600, color:'#9CA3AF', letterSpacing:'.07em', marginBottom:'.4rem' }}>
                  {lang === 'en' ? 'ACADEMIC BACKGROUND / NOTES (OPTIONAL)' : 'ОБРАЗОВАНИЕ / ЗАМЕТКИ (НЕОБЯЗАТЕЛЬНО)'}
                </label>
                <textarea className={fieldCls} style={{ ...field, minHeight:'88px', resize:'vertical', fontFamily:'inherit', lineHeight:1.5 }}
                  placeholder={lang === 'en'
                    ? 'e.g. current school/university, grades, anything else worth knowing'
                    : 'напр. текущая школа/университет, оценки, что-то ещё важное'}
                  value={contact.notes} onChange={e => setContact(p => ({ ...p, notes: e.target.value }))}
                  onFocus={e => { e.target.style.borderColor = OR; e.target.style.boxShadow = `0 0 0 3px rgba(249,115,22,.12)` }}
                  onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }} />
              </div>
              {error && <div style={{ color:'#EF4444', fontSize:'.78rem', marginBottom:'.75rem' }}>{error}</div>}
              <Btn onClick={submit} disabled={submitting}>
                {submitting
                  ? (lang === 'en' ? 'Sending...' : 'Отправка...')
                  : (lang === 'en' ? 'Get free consultation' : 'Получить бесплатную консультацию')}
              </Btn>
              <div style={{ textAlign:'center', marginTop:'.75rem', fontSize:'.7rem', color:'#C0C7D0' }}>
                {lang === 'en' ? 'Your data is protected · No spam' : 'Ваши данные защищены · Без спама'}
              </div>
            </StepPane>
          )}

        </div>
      </div>
    </div>
  )
}
