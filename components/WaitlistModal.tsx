'use client'

import { useEffect, useRef, useState } from 'react'

interface WaitlistModalProps {
  open: boolean
  onClose: () => void
  t: (key: string) => string
}

export default function WaitlistModal({ open, onClose, t }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setEmail('')
      setStatus('idle')
      const id = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close icon-btn" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {status === 'done' ? (
          <div className="modal__done">
            <span className="dot" style={{ width: 20, height: 20 }} aria-hidden="true" />
            <h2 className="modal__title">{t('waitlist.done')}</h2>
            <p className="modal__sub">{t('waitlist.done.sub')}</p>
            <button className="btn btn--ghost btn--sm" onClick={onClose}>OK</button>
          </div>
        ) : (
          <>
            <span className="badge">
              <span className="dot" aria-hidden="true" />
              <span>Coming Soon</span>
            </span>
            <h2 className="modal__title">{t('waitlist.title')}</h2>
            <p className="modal__sub">{t('waitlist.sub')}</p>
            <form className="modal__form" onSubmit={handleSubmit} noValidate>
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
                placeholder={t('waitlist.placeholder')}
                className="modal__input"
                autoComplete="email"
              />
              {status === 'error' && (
                <p className="modal__error" role="alert">{t('waitlist.err')}</p>
              )}
              <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'loading'}>
                {status === 'loading' ? '…' : t('waitlist.submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
