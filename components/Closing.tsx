'use client'

interface ClosingProps {
  t: (key: string) => string
  onOpenWaitlist: () => void
}

export default function Closing({ t, onOpenWaitlist }: ClosingProps) {
  return (
    <section className="closing" id="download" data-screen-label="Download">
      <div className="orb" aria-hidden="true" />
      <div className="closing__inner reveal">
        <h2 data-i18n="closing.title">{t('closing.title')}</h2>
        <p className="closing__sub" data-i18n="closing.sub">{t('closing.sub')}</p>
        <div className="closing__cta">
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
        <p className="closing__note" data-i18n="closing.note">{t('closing.note')}</p>
      </div>
    </section>
  )
}
