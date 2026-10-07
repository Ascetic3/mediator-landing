import { ArrowUp, ArrowUpRight } from 'lucide-react'
import mediatorMark from '../../assets/brand/mediator-mark.png'
import { navigationLinks } from '../../data/navigation'
import { legalUrls } from '../../config/legal'
import styles from './Footer.module.scss'

const legalDocuments = [
  { label: 'Политика обработки персональных данных', href: legalUrls.privacyPolicyUrl },
  { label: 'Согласие на обработку персональных данных', href: legalUrls.personalDataConsentUrl },
  { label: 'Юридическая информация', href: legalUrls.legalInfoUrl },
  { label: 'Публичная оферта', href: legalUrls.publicOfferUrl },
]
const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className={styles.footer} id="site-footer" data-motion="footer">
      <div className={`container ${styles.grid}`}>
        <div className={styles.identity}>
          <a className={styles.brand} href="#main-content" aria-label="Медиатор — наверх">
            <img src={mediatorMark} alt="" aria-hidden="true" />
            <span>МЕДИАТОР</span>
          </a>
          <p>Агентство правовой помощи</p>
        </div>

        <nav className={`${styles.column} ${styles.navigation}`} aria-label="Навигация в подвале">
          <h2>Навигация</h2>
          {navigationLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>

        <div className={styles.column}>
          <h2>Контакты</h2>
          <a href="#contact">Форма консультации</a>
        </div>

        <div className={`${styles.column} ${styles.legalColumn}`}>
          <h2>Документы</h2>
          {legalDocuments.map(({ label, href }) => href
            ? <a key={label} href={href}>{label}</a>
            : <span className={styles.unavailable} key={label} aria-disabled="true" title="Документ будет добавлен позже">{label}</span>)}
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© «Медиатор», {currentYear}</span>
        <span className={styles.disclaimer}>Информация на сайте не является гарантией результата.</span>
        <a className={styles.topLink} href="#main-content">
          Наверх
          <span className={styles.topArrowDesktop}><ArrowUpRight size={15} aria-hidden="true" /></span>
          <span className={styles.topArrowMobile}><ArrowUp size={15} aria-hidden="true" /></span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
