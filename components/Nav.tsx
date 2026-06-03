'use client'

import { useEffect, useRef, useState } from 'react'
import type { Lang } from '../lib/i18n'

interface NavProps {
  lang: Lang
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onChangeLang: (lang: Lang) => void
  t: (key: string) => string
}

export default function Nav({ lang, theme, onToggleTheme, onChangeLang, t }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onDocClick() {
      setLangOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const LANGS: { code: Lang; name: string; sub: string }[] = [
    { code: 'ja', name: '日本語', sub: 'JA' },
    { code: 'en', name: 'English', sub: 'EN' },
    { code: 'zh', name: '中文', sub: 'ZH' },
    { code: 'ko', name: '한국어', sub: 'KO' },
  ]

  const currentLangSub = LANGS.find((l) => l.code === lang)?.sub ?? 'JA'

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="nav__inner">
        <a className="brand" href="#top" aria-label="Hum">
          <span className="wave" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </span>
          <span>Hum</span>
        </a>
        <nav className="nav__links">
          <a href="#features" data-i18n="nav.features">{t('nav.features')}</a>
          <a href="#cases" data-i18n="nav.how">{t('nav.how')}</a>
        </nav>

        <div className="nav__right">
          {/* language */}
          <div
            className={`lang${langOpen ? ' open' : ''}`}
            id="lang"
            ref={langRef}
          >
            <button
              className="lang__btn"
              id="langBtn"
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation()
                setLangOpen((v) => !v)
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9"/>
                <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/>
              </svg>
              <span id="langCurrent">{currentLangSub}</span>
            </button>
            <div className="lang__menu" role="menu">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  data-lang={l.code}
                  role="menuitem"
                  aria-current={l.code === lang ? 'true' : 'false'}
                  onClick={() => {
                    onChangeLang(l.code)
                    setLangOpen(false)
                  }}
                >
                  {l.name} <span className="sub">{l.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* theme */}
          <button
            className="icon-btn"
            id="themeToggle"
            aria-label="Toggle theme"
            aria-pressed={theme === 'dark'}
            onClick={onToggleTheme}
          >
            <svg className="ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="4.2"/>
              <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>
            </svg>
          </button>

          <a className="btn btn--primary btn--sm nav__cta" href="#download">
            <span data-i18n="nav.download">{t('nav.download')}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
