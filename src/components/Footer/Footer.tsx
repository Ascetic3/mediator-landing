import { ArrowUpRight } from 'lucide-react'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#main-content">МЕДИАТОР</a>
        <p>Юридическое агентство. Банкротство физических лиц.</p>
        <a className={styles.topLink} href="#main-content">
          Наверх <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className={`container ${styles.legal}`}>
        <span>© Медиатор</span>
        <span>Информация на сайте не является гарантией результата.</span>
      </div>
    </footer>
  )
}

export default Footer
