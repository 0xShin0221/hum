'use client'

interface FeaturesProps {
  t: (key: string) => string
}

export default function Features({ t }: FeaturesProps) {
  return (
    <section className="section" id="features" data-screen-label="Features">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow" data-i18n="feat.eyebrow">{t('feat.eyebrow')}</span>
          <h2 className="section-title" data-i18n="feat.title">{t('feat.title')}</h2>
        </div>
        <div className="features__grid reveal">
          <div className="feature">
            <div className="feature__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M8 11a4 4 0 1 1 8 0c0 2.5-2 3-2 5a2 2 0 0 1-4 0"/>
                <path d="M5 11a7 7 0 0 1 14 0"/>
                <circle cx="12" cy="11" r="1.3" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <h3 className="feature__title" data-i18n="feat1.title">{t('feat1.title')}</h3>
            <p className="feature__body" data-i18n="feat1.body">{t('feat1.body')}</p>
            <div className="feature__num">01</div>
          </div>
          <div className="feature">
            <div className="feature__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M9 18.5a3 3 0 0 1-3-3 3 3 0 0 1-1.3-5.6A3 3 0 0 1 6.5 5 3 3 0 0 1 12 4.2 3 3 0 0 1 17.5 5a3 3 0 0 1 1.8 4.9A3 3 0 0 1 18 15.5a3 3 0 0 1-3 3"/>
                <path d="M12 4.2v14.3"/>
              </svg>
            </div>
            <h3 className="feature__title" data-i18n="feat2.title">{t('feat2.title')}</h3>
            <p className="feature__body" data-i18n="feat2.body">{t('feat2.body')}</p>
            <div className="feature__num">02</div>
          </div>
          <div className="feature">
            <div className="feature__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="5" y="3.5" width="14" height="17" rx="2.5"/>
                <path d="M9 8.5h6M9 12h6M9 15.5h3.5"/>
              </svg>
            </div>
            <h3 className="feature__title" data-i18n="feat3.title">{t('feat3.title')}</h3>
            <p className="feature__body" data-i18n="feat3.body">{t('feat3.body')}</p>
            <div className="feature__num">03</div>
          </div>
          <div className="feature">
            <div className="feature__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
                <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z"/>
              </svg>
            </div>
            <h3 className="feature__title" data-i18n="feat4.title">{t('feat4.title')}</h3>
            <p className="feature__body" data-i18n="feat4.body">{t('feat4.body')}</p>
            <div className="feature__num">04</div>
          </div>
        </div>
      </div>
    </section>
  )
}
