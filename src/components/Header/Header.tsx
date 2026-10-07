import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import mediatorMark from '../../assets/brand/mediator-mark.png'
import { headerNavigationLinks } from '../../data/navigation'
import styles from './Header.module.scss'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    function updateCompact() {
      setIsCompact(window.scrollY > 24)
      if (window.scrollY <= 80) setActiveLink('')
    }

    updateCompact()
    window.addEventListener('scroll', updateCompact, { passive: true })
    return () => window.removeEventListener('scroll', updateCompact)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') closeMenu()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const sections = headerNavigationLinks
      .filter(({ href }) => href !== '#main-content')
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting)
      if (current) setActiveLink(`#${current.target.id}`)
    }, { rootMargin: '-20% 0px -70% 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`${styles.header} ${isCompact ? styles.compact : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#main-content" onClick={closeMenu} aria-label="Медиатор — главная">
          <img className={styles.brandMark} src={mediatorMark} alt="" aria-hidden="true" />
          <span className={styles.brandText}>
            <span className={styles.brandName}>МЕДИАТОР</span>
            <span className={styles.brandCaption}>агентство правовой помощи</span>
          </span>
        </a>

        <nav id="site-navigation" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Основная навигация">
          {headerNavigationLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} aria-current={activeLink === link.href ? 'location' : undefined}>
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
