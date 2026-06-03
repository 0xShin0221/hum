'use client'

import { useEffect } from 'react'

/**
 * Bootstraps the HumApp global API that Tweaks panel calls into.
 * Also restores localStorage-persisted accent color.
 */
export default function ClientBootstrap() {
  useEffect(() => {
    const root = document.documentElement

    function applyAccent(a: string) {
      if (a === 'emerald') root.removeAttribute('data-accent')
      else root.setAttribute('data-accent', a)
      try { localStorage.setItem('hum.accent', a) } catch {}
    }

    function setTranscriptPos(pos: string) {
      if (pos === 'left') root.setAttribute('data-tpos', 'left')
      else root.removeAttribute('data-tpos')
    }

    function setHeroMode(mode: string) {
      if (mode === 'cinematic') root.setAttribute('data-hero', 'cinematic')
      else root.removeAttribute('data-hero')
    }

    function setTranscriptVisible(v: boolean) {
      if (v) root.removeAttribute('data-transcript')
      else root.setAttribute('data-transcript', 'off')
    }

    function setTranscriptPanel(on: boolean) {
      const w = document.getElementById('transcript')
      if (w) w.classList.toggle('transcript--panel', !!on)
    }

    // Restore saved accent
    try {
      const savedAccent = localStorage.getItem('hum.accent')
      if (savedAccent) applyAccent(savedAccent)
    } catch {}

    // Expose global HumApp API for Tweaks panel
    ;(window as Window & { HumApp?: unknown }).HumApp = {
      setAccent: applyAccent,
      setTranscriptPattern: () => {}, // handled by React state via HumPage
      setTranscriptPos: setTranscriptPos,
      setHeroMode: setHeroMode,
      setTranscriptVisible: setTranscriptVisible,
      setTranscriptPanel: setTranscriptPanel,
    }
  }, [])

  return null
}
