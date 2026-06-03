'use client'

import { useCallback, useEffect, useState } from 'react'
import { HUM_I18N, type Lang } from '../lib/i18n'

const LS_KEY = 'hum.lang'

export function useLang() {
  const [lang, setLangState] = useState<Lang>('ja')

  const applyLang = useCallback((next: Lang) => {
    if (!HUM_I18N[next]) return
    document.documentElement.setAttribute('lang', next)
    try { localStorage.setItem(LS_KEY, next) } catch {}
    setLangState(next)
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
