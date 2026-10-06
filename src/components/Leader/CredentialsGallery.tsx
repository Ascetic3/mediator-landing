import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { credentialDocuments } from '../../data/credentials'
import styles from './CredentialsGallery.module.scss'

function CredentialsGallery() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const rootWasInert = appRoot?.hasAttribute('inert') ?? false
    const closeButton = closeButtonRef.current
    const triggerButton = triggerRef.current

    document.body.style.overflow = 'hidden'
    appRoot?.setAttribute('inert', '')
    closeButton?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsOpen(false)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveIndex((index) => (index + 1) % credentialDocuments.length)
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveIndex((index) => (index - 1 + credentialDocuments.length) % credentialDocuments.length)
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true')

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      if (!rootWasInert) appRoot?.removeAttribute('inert')
      document.removeEventListener('keydown', handleKeyDown)
      triggerButton?.focus()
    }
  }, [isOpen])

  function openGallery() {
    setActiveIndex(0)
    setIsOpen(true)
  }

  function closeGallery() {
    setIsOpen(false)
  }

  return (
    <>
      <button
        ref={triggerRef}
        className={`button button--secondary ${styles.trigger}`}
        type="button"
        onClick={openGallery}
        aria-haspopup="dialog"
      >
        Дипломы и сертификаты
      </button>

      {isOpen && createPortal(
        <div
          className={styles.overlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeGallery()
          }}
        >
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="credentials-title"
            tabIndex={-1}
          >
            <header className={styles.header}>
              <div>
                <p className="eyebrow">Документы специалиста</p>
                <h2 id="credentials-title">Дипломы и сертификаты</h2>
              </div>
              <button
                ref={closeButtonRef}
                className={styles.close}
                type="button"
                onClick={closeGallery}
                aria-label="Закрыть галерею документов"
              >
                <X aria-hidden="true" size={20} strokeWidth={1.7} />
              </button>
            </header>

            <div className={styles.documentFrame}>
              <img
                className={styles.document}
                src={credentialDocuments[activeIndex]}
                alt={`Документ ${activeIndex + 1}`}
              />
            </div>

            <footer className={styles.controls}>
              <button
                className={styles.navButton}
                type="button"
                onClick={() => setActiveIndex((index) => (index - 1 + credentialDocuments.length) % credentialDocuments.length)}
                aria-label="Предыдущий документ"
              >
                <ChevronLeft aria-hidden="true" size={18} />
                <span>Назад</span>
              </button>
              <p aria-live="polite">Документ {activeIndex + 1} из {credentialDocuments.length}</p>
              <button
                className={styles.navButton}
                type="button"
                onClick={() => setActiveIndex((index) => (index + 1) % credentialDocuments.length)}
                aria-label="Следующий документ"
              >
                <span>Далее</span>
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            </footer>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

export default CredentialsGallery
