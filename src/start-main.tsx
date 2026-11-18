import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './start.css'
import StartForm from './components/StartForm'
import { captureAdParams } from './data/adParams'

// Entry point for start.html, the standalone ad landing page. Deliberately
// imports nothing from the main site (no App, no LangContext, which pulls in
// every page's translations) so a phone on mobile data downloads only React
// and the form.

captureAdParams()

type L = 'ru' | 'en'
const langFromPath = (): L => (/^\/en(\/|$)/.test(window.location.pathname) ? 'en' : 'ru')
const pathFor = (l: L) => (l === 'en' ? '/en/start' : '/start')

function StartPage() {
  const [lang, setLang] = useState<L>(langFromPath)

  useEffect(() => {
    const onPop = () => setLang(langFromPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const switchLang = (l: L) => {
    // The query string goes too: the ad parameters are already saved by
    // captureAdParams, but a ?c= country hint is kept for a reload.
    window.history.pushState({}, '', pathFor(l) + window.location.search)
    setLang(l)
  }

  return <StartForm lang={lang} setLang={switchLang} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StartPage />
  </StrictMode>,
)
