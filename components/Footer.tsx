'use client'

interface FooterProps {
  t: (key: string) => string
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brandcol">
          <a className="brand" href="#top">
            <span className="wave" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </span>
            <span>Hum</span>
          </a>
          <p className="footer__tag" data-i18n="footer.tag">{t('footer.tag')}</p>
        </div>
        <div className="footer__col">
          <h4 data-i18n="footer.product">{t('footer.product')}</h4>
          <a href="#features" data-i18n="footer.f.features">{t('footer.f.features')}</a>
          <a href="#cases" data-i18n="footer.f.how">{t('footer.f.how')}</a>
          <a href="#download" data-i18n="footer.f.download">{t('footer.f.download')}</a>
        </div>
        <div className="footer__col">
          <h4 data-i18n="footer.company">{t('footer.company')}</h4>
          <a href="#" data-i18n="footer.f.about">{t('footer.f.about')}</a>
          <a href="#" data-i18n="footer.f.blog">{t('footer.f.blog')}</a>
          <a href="#" data-i18n="footer.f.careers">{t('footer.f.careers')}</a>
        </div>
        <div className="footer__col">
          <h4 data-i18n="footer.legal">{t('footer.legal')}</h4>
          <a href="#" data-i18n="footer.f.privacy">{t('footer.f.privacy')}</a>
          <a href="#" data-i18n="footer.f.terms">{t('footer.f.terms')}</a>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span data-i18n="footer.copy">{t('footer.copy')}</span>
        <span className="brand" style={{ fontSize: '14px', opacity: .7 }}>
          <span className="dot" aria-hidden="true" />&nbsp;Listening
        </span>
      </div>
    </footer>
  )
}
