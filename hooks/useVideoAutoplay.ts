'use client'

import { useEffect, useRef, useState } from 'react'

export function useVideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    function tryPlay() {
      const p = video!.play()
      if (p && p.catch) p.catch(() => {})
    }

    function setPaused(p: boolean) {
      setUserPaused(p)
      if (p) {
        video!.pause()
      } else {
        tryPlay()
      }
    }

    const onPause = () => { if (!userPaused) tryPlay() }
    const onCanPlay = () => { if (!userPaused) tryPlay() }
    const onLoaded = () => { if (!userPaused) tryPlay() }
    const onVisibility = () => { if (!document.hidden && !userPaused) tryPlay() }

    video.addEventListener('pause', onPause)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('loadeddata', onLoaded)
    document.addEventListener('visibilitychange', onVisibility)

    const onUserGesture = () => { if (!userPaused) tryPlay() }
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
    events.forEach((ev) => window.addEventListener(ev, onUserGesture, { once: true, passive: true }))

    tryPlay()

    return () => {
      video.removeEventListener('pause', onPause)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('loadeddata', onLoaded)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    const next = !userPaused
    setUserPaused(next)
    if (next) {
      video.pause()
    } else {
      const p = video.play()
      if (p && p.catch) p.catch(() => {})
    }
  }

  return { videoRef, userPaused, togglePlay }
}
