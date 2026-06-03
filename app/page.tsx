'use client'

import { useCallback, useState } from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero/Hero'
import UseCases from '../components/UseCases'
import Features from '../components/Features'
import Closing from '../components/Closing'
import Footer from '../components/Footer'
import WaitlistModal from '../components/WaitlistModal'
import { useTheme } from '../hooks/useTheme'
import { useLang } from '../hooks/useLang'
import { useTranscript } from '../hooks/useTranscript'
import { useReveal } from '../hooks/useReveal'
import type { TranscriptPattern } from '../lib/transcripts'

export default function HumPage() {
  const { theme, toggleTheme } = useTheme()
  const { lang, applyLang, t } = useLang()
  const { state: transcriptState, setPattern, setPaused } = useTranscript(lang, 'A' as TranscriptPattern)
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  const openWaitlist = useCallback(() => setWaitlistOpen(true), [])
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), [])

  useReveal()

  return (
    <>
      <Nav
        lang={lang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onChangeLang={applyLang}
        onOpenWaitlist={openWaitlist}
        t={t}
      />
      <main id="top">
        <Hero
          t={t}
          transcriptState={transcriptState}
          onTogglePause={setPaused}
          onOpenWaitlist={openWaitlist}
        />
        <UseCases t={t} />
        <Features t={t} />
        <Closing t={t} onOpenWaitlist={openWaitlist} />
      </main>
      <Footer t={t} />
      <WaitlistModal open={waitlistOpen} onClose={closeWaitlist} t={t} />
    </>
  )
}
