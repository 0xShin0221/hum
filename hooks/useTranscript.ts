'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { HUM_TRANSCRIPTS, type TranscriptLine, type TranscriptPattern } from '../lib/transcripts'
import type { Lang } from '../lib/i18n'

const DURATION = 2400

interface TranscriptState {
  prev: TranscriptLine | null
  cur: TranscriptLine | null
  enterKey: number
}

export function useTranscript(lang: Lang, pattern: TranscriptPattern = 'A') {
  const [state, setState] = useState<TranscriptState>({ prev: null, cur: null, enterKey: 0 })
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pausedRef = useRef(false)
  const patternRef = useRef(pattern)
  const langRef = useRef(lang)

  const getSeq = useCallback(() => {
    const langSets = HUM_TRANSCRIPTS[langRef.current] || HUM_TRANSCRIPTS.ja
    return (langSets[patternRef.current] || langSets.A || HUM_TRANSCRIPTS.ja.A)!
  }, [])

  const render = useCallback((idx: number) => {
    const seq = getSeq()
    const cur = seq[idx % seq.length]
    const prev = seq[(idx - 1 + seq.length) % seq.length]
    setState((s) => ({ prev, cur, enterKey: s.enterKey + 1 }))
  }, [getSeq])

  const schedule = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (pausedRef.current) return
    timerRef.current = setTimeout(() => {
      indexRef.current++
      render(indexRef.current)
      schedule()
    }, DURATION)
  }, [render])

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    indexRef.current = 0
    render(0)
    schedule()
  }, [render, schedule])

  useEffect(() => {
    langRef.current = lang
    patternRef.current = pattern
    reset()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, pattern])

  const setPattern = useCallback((p: TranscriptPattern) => {
    patternRef.current = p
    reset()
  }, [reset])

  const setPaused = useCallback((p: boolean) => {
    pausedRef.current = p
    if (p) {
      if (timerRef.current) clearTimeout(timerRef.current)
    } else {
      schedule()
    }
  }, [schedule])

  return { state, setPattern, setPaused, reset }
}
