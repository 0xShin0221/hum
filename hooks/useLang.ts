'use client'

import { useCallback, useEffect, useState } from 'react'
import { HUM_I18N, type Lang } from '../lib/i18n'

const LS_KEY = 'hum.lang'

export function useLang() {
  const [lang, setLangState] = useState<Lang>('ja')

  const applyLang = useCallback((next: Lang) => {
    const dict = HUM_I18N[next] || HUM_I18N.ja
    document.documentElement.setAttribute('lang', next)
    try { localStorage.setItem(LS_KEY, next) } catch {}
    setLangState(next)

    // Apply data-i18n to all elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n')!
      const val = dict[key] || HUM_I18N.ja[key] || key
      el.textContent = val
    })

    // Update language menu current state
    document.querySelectorAll('.lang__menu button').forEach((b) => {
      const btnLang = (b as HTMLElement).getAttribute('data-lang')
      b.setAttribute('aria-current', String(btnLang === next))
    })

    const cur = document.getElementById('langCurrent')
    if (cur) cur.textContent = dict._sub
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY) as Lang | null
      if (saved && HUM_I18N[saved]) {
        applyLang(saved)
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const t = useCallback((key: string): string => {
    const dict = HUM_I18N[lang] || HUM_I18N.ja
    return dict[key] || HUM_I18N.ja[key] || key
  }, [lang])

  return { lang, applyLang, t }
}
