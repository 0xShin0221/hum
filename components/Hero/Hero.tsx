'use client'

import { useEffect, useRef } from 'react'
import Transcript from './Transcript'
import type { TranscriptLine } from '../../lib/transcripts'

interface HeroProps {
  t: (key: string) => string
  transcriptState: {
    prev: TranscriptLine | null
    cur: TranscriptLine | null
    enterKey: number
  }
  onTogglePause: (paused: boolean) => void
  onOpenWaitlist: () => void
}

export default function Hero({ t, transcriptState, onTogglePause, onOpenWaitlist }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const userPausedRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    function tryPlay() {
      const p = video!.play()
      if (p && p.catch) p.catch(() => {})
    }

    const onPause = () => { if (!userPausedRef.current) tryPlay() }
    const onCanPlay = () => { if (!userPausedRef.current) tryPlay() }
    const onLoaded = () => { if (!userPausedRef.current) tryPlay() }
    const onVisibility = () => {
      if (!document.hidden && !userPausedRef.current) tryPlay()
    }

    video.addEventListener('pause', onPause)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('loadeddata', onLoaded)
    document.addEventListener('visibilitychange', onVisibility)

    const onUserGesture = () => { if (!userPausedRef.current) tryPlay() }
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
    events.forEach((ev) =>
      window.addEventListener(ev, onUserGesture, { once: true, passive: true })
    )

    tryPlay()

    return () => {
      video.removeEventListener('pause', onPause)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('loadeddata', onLoaded)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Parallax on scroll
  useEffect(() => {
    function onScroll() {
      const media = mediaRef.current
      if (!media) return
      const y = Math.min(window.scrollY, window.innerHeight)
      media.style.transform = `scale(${(1 + y / window.innerHeight * 0.08).toFixed(4)}) translateY(${(y * 0.06).toFixed(1)}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleToggle() {
    const video = videoRef.current
    const toggle = toggleRef.current
    if (!video) return
    const next = !userPausedRef.current
    userPausedRef.current = next
    if (next) {
      video.pause()
      toggle?.classList.add('paused')
      toggle?.setAttribute('aria-label', 'Play video')
    } else {
      const p = video.play()
      if (p && p.catch) p.catch(() => {})
      toggle?.classList.remove('paused')
      toggle?.setAttribute('aria-label', 'Pause video')
    }
    onTogglePause(next)
  }

  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero__media" id="heroMedia" ref={mediaRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/poster.jpg" alt="" aria-hidden="true" />
        <video
          ref={videoRef}
          id="heroVideo"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/poster.jpg"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__scrim hero__scrim--v" />
      <div className="hero__scrim hero__scrim--h" />

      <button
        className="media-toggle"
        id="mediaToggle"
        ref={toggleRef}
        aria-label="Pause video"
        onClick={handleToggle}
      >
        <svg className="ico-pause" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1"/>
          <rect x="14" y="5" width="4" height="14" rx="1"/>
        </svg>
        <svg className="ico-play" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.5v13l11-6.5z"/>
        </svg>
      </button>

      <div className="hero__content">
        <div className="hero__grid">
          <div className="hero__copy">
            <span className="badge">
              <span className="dot" aria-hidden="true" />
              <span data-i18n="hero.badge">{t('hero.badge')}</span>
            </span>
            <h1 data-i18n="hero.h1">{t('hero.h1')}</h1>
            <p className="hero__sub" data-i18n="hero.sub">{t('hero.sub')}</p>
            <div className="hero__cta">
              <button className="btn btn--primary" onClick={onOpenWaitlist}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.4 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.5-.7.8-1.5 1.1-2.3-2.9-1.1-2.9-4.1-2.9-4.1zM14.3 5.9c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1 1.6-.9 2.6 1 .1 2-.5 2.6-1.2z"/>
                </svg>
                <span data-i18n="waitlist.btn">{t('waitlist.btn')}</span>
              </button>
              <button className="btn btn--ghost" onClick={onOpenWaitlist}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 5.4l7.3-1v7.1H3zM10.3 12.2v7.1L3 18.3v-6.1zM11.3 4.3L21 3v8.5h-9.7zM21 12.5V21l-9.7-1.3v-7.2z"/>
                </svg>
                <span data-i18n="hero.win">{t('hero.win')}</span>
              </button>
            </div>
            <div className="hero__scrollcue">
              <span className="line" aria-hidden="true" />
              <span data-i18n="hero.scroll">{t('hero.scroll')}</span>
            </div>
          </div>

          {/* live transcript */}
          <Transcript
            prev={transcriptState.prev}
            cur={transcriptState.cur}
            enterKey={transcriptState.enterKey}
          />
        </div>
      </div>
    </section>
  )
}
