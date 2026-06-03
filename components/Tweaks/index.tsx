'use client'

import { useEffect } from 'react'
import {
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakToggle,
  TweakColor,
  useTweaks,
} from './TweaksPanel'

const TWEAK_DEFAULTS = {
  accent: '#12B76A',
  conversation: 'A',
  transcriptPos: 'right',
  heroMode: 'full',
  readPanel: false,
  motion: true,
}

const ACCENT_NAME: Record<string, string> = {
  '#12B76A': 'emerald',
  '#2A6FDB': 'blue',
  '#7C5CFC': 'violet',
}

function HumTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const A = () => (typeof window !== 'undefined' ? (window as Window & { HumApp?: Record<string, (arg: string | boolean) => void> }).HumApp : null)

  useEffect(() => { A()?.setAccent?.(ACCENT_NAME[t.accent as string] || 'emerald') }, [t.accent])
  useEffect(() => { A()?.setTranscriptPattern?.(t.conversation as string) }, [t.conversation])
  useEffect(() => { A()?.setTranscriptPos?.(t.transcriptPos as string) }, [t.transcriptPos])
  useEffect(() => { A()?.setHeroMode?.(t.heroMode as string) }, [t.heroMode])
  useEffect(() => { A()?.setTranscriptPanel?.(t.readPanel as unknown as string) }, [t.readPanel])
  useEffect(() => {
    document.documentElement.classList.toggle('no-motion', !t.motion)
  }, [t.motion])

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Live transcript" />
      <TweakRadio label="Conversation" value={t.conversation as string} options={['A', 'B', 'C']}
        onChange={(v) => setTweak('conversation', v)} />
      <TweakRadio label="Position" value={t.transcriptPos as string} options={['right', 'left']}
        onChange={(v) => setTweak('transcriptPos', v)} />
      <TweakToggle label="Readability panel" value={t.readPanel as boolean}
        onChange={(v) => setTweak('readPanel', v)} />

      <TweakSection label="Hero" />
      <TweakRadio label="Style" value={t.heroMode as string} options={['full', 'cinematic']}
        onChange={(v) => setTweak('heroMode', v)} />
      <TweakToggle label="Motion" value={t.motion as boolean}
        onChange={(v) => setTweak('motion', v)} />

      <TweakSection label="Brand" />
      <TweakColor label="Accent" value={t.accent as string}
        options={['#12B76A', '#2A6FDB', '#7C5CFC']}
        onChange={(v) => setTweak('accent', v)} />
    </TweaksPanel>
  )
}

export default function TweaksPanelWrapper() {
  return <HumTweaks />
}
