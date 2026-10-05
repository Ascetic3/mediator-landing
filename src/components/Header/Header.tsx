import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import mediatorMark from '../../assets/brand/mediator-mark.png'
import styles from './Header.module.scss'

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#process', label: 'Как мы работаем' },
  { href: '#about', label: 'О нас' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#contact', label: 'Контакты' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#main-content" onClick={closeMenu} aria-label="Медиатор — главная">
          <img className={styles.brandMark} src={mediatorMark} alt="" aria-hidden="true" />
          <span className={styles.brandText}>
            <span className={styles.brandName}>МЕДИАТОР</span>
            <span className={styles.brandCaption}>агентство правовой помощи</span>
          </span>
        </a>

        <nav id="site-navigation" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Основная навигация">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a className={`button ${styles.navCta}`} href="#contact" onClick={closeMenu}>
            Оставить заявку
          </a>
        </nav>

        <button
          className={styles.menuToggle}
          type="button"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}

export default Header
