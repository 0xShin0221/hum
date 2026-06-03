'use client'

import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!nodes.length) return

    root.classList.add('js-reveal')

    function inView(el: HTMLElement) {
      const r = el.getBoundingClientRect()
      return r.top < (window.innerHeight || 0) * 0.92 && r.bottom > 0
    }

    function showAll() {
      nodes.forEach((el) => el.classList.add('in'))
    }

    // Immediately reveal elements already in view
    nodes.forEach((el) => { if (inView(el)) el.classList.add('in') })

    if (!('IntersectionObserver' in window)) {
      showAll()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    nodes.forEach((el) => {
      if (!el.classList.contains('in')) io.observe(el)
    })

    // Safety net: never leave content hidden
    const fallback = setTimeout(showAll, 2200)

    return () => {
      io.disconnect()
      clearTimeout(fallback)
      root.classList.remove('js-reveal')
    }
  }, [])
}
