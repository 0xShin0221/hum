'use client'

interface UseCasesProps {
  t: (key: string) => string
}

const cases = [
  { num: '01', tag: 'case1.tag', title: 'case1.title', body: 'case1.body', video: '/assets/case-commute.mp4' },
  { num: '02', tag: 'case2.tag', title: 'case2.title', body: 'case2.body', video: '/assets/case-after-meeting.mp4' },
  { num: '03', tag: 'case3.tag', title: 'case3.title', body: 'case3.body', video: '/assets/case-kitchen.mp4' },
  { num: '04', tag: 'case4.tag', title: 'case4.title', body: 'case4.body', video: '/assets/case-on-the-move.mp4' },
]

export default function UseCases({ t }: UseCasesProps) {
  return (
    <section className="section" id="cases" data-screen-label="Use cases">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow" data-i18n="cases.eyebrow">{t('cases.eyebrow')}</span>
          <h2 className="section-title" data-i18n="cases.title">{t('cases.title')}</h2>
          <p className="section-sub" data-i18n="cases.sub">{t('cases.sub')}</p>
        </div>

        <div className="cases">
          {cases.map((c) => (
            <article key={c.num} className="case reveal">
              <div className="case__media" style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                >
                  <source src={c.video} type="video/mp4" />
                </video>
              </div>
              <div className="case__text">
                <div className="case__num">{c.num}</div>
                <h3 className="case__title" data-i18n={c.title}>{t(c.title)}</h3>
                <p className="case__body" data-i18n={c.body}>{t(c.body)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
