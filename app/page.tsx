'use client'

import { useEffect } from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero/Hero'
import UseCases from '../components/UseCases'
import Features from '../components/Features'
import Closing from '../components/Closing'
import Footer from '../components/Footer'
import { useTheme } from '../hooks/useTheme'
import { useLang } from '../hooks/useLang'
import { useTranscript } from '../hooks/useTranscript'
import { useReveal } from '../hooks/useReveal'
import type { TranscriptPattern } from '../lib/transcripts'

export default function HumPage() {
  const { theme, toggleTheme } = useTheme()
  const { lang, applyLang, t } = useLang()
  const { state: transcriptState, setPattern, setPaused } = useTranscript(lang, 'A' as TranscriptPattern)

  // Expose setPattern via HumApp for Tweaks panel
  useEffect(() => {
    if (typeof window === 'undefined') return
    const win = window as Window & { HumApp?: Record<string, unknown> }
    if (win.HumApp) {
      win.HumApp.setTranscriptPattern = (p: unknown) => setPattern(p as TranscriptPattern)
    }
  }, [setPattern])

  useReveal()

  return (
    <>
      <Nav
        lang={lang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onChangeLang={applyLang}
        t={t}
      />
      <main id="top">
        <Hero
          t={t}
          transcriptState={transcriptState}
          onTogglePause={setPaused}
        />
        <UseCases t={t} />
        <Features t={t} />
        <Closing t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
