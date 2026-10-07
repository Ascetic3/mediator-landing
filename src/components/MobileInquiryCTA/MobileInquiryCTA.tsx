import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import styles from './MobileInquiryCTA.module.scss'

function MobileInquiryCTA() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const nearSections = new Set<Element>()
    const syncVisibility = () => {
      setHidden(nearSections.size > 0 || Boolean(document.querySelector('[role="dialog"][aria-modal="true"]')))
    }

    const contact = document.getElementById('contact')
    const footer = document.getElementById('site-footer')
    const hero = document.querySelector('.heroComposition')
    const leader = document.querySelector('#leader-title')?.closest('section')
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) nearSections.add(entry.target)
            else nearSections.delete(entry.target)
          })
          syncVisibility()
        }, { rootMargin: '0px 0px 96px 0px', threshold: 0.01 })
      : null

    if (hero) observer?.observe(hero)
    if (leader) observer?.observe(leader)
    if (contact) observer?.observe(contact)
    if (footer) observer?.observe(footer)

    const mutationObserver = new MutationObserver(syncVisibility)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    syncVisibility()

    return () => {
      observer?.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  function goToForm() {
    const nameField = document.getElementById('contact-name')
    if (!nameField) return

    nameField.scrollIntoView({ behavior: 'smooth', block: 'center' })
    let attempts = 0
    const focusWhenVisible = () => {
      const bounds = nameField.getBoundingClientRect()
      if (bounds.top >= 0 && bounds.bottom <= window.innerHeight) {
        nameField.focus({ preventScroll: true })
      } else if (attempts < 120) {
        attempts += 1
        if (attempts % 20 === 0) nameField.scrollIntoView({ behavior: 'smooth', block: 'center' })
        requestAnimationFrame(focusWhenVisible)
      }
    }
    requestAnimationFrame(focusWhenVisible)
  }

  return (
    <button className={styles.button} type="button" onClick={goToForm} aria-hidden={hidden} tabIndex={hidden ? -1 : 0}>
      Заявка <ArrowRight size={17} aria-hidden="true" />
    </button>
  )
}

export default MobileInquiryCTA
