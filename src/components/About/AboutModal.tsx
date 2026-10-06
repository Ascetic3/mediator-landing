import { useEffect, useRef, type MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, X } from 'lucide-react'
import { aboutContent } from '../../data/siteContent'
import styles from './AboutModal.module.scss'

type AboutModalProps = {
  isOpen: boolean
  returnFocusRef: MutableRefObject<HTMLButtonElement | null>
  onClose: () => void
  onDiscuss: () => void
}

function AboutModal({ isOpen, returnFocusRef, onClose, onDiscuss }: AboutModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const rootWasInert = appRoot?.hasAttribute('inert') ?? false
    const returnFocusTarget = returnFocusRef.current

    document.body.style.overflow = 'hidden'
    appRoot?.setAttribute('inert', '')
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!firstElement || !lastElement) {
        event.preventDefault()
        dialogRef.current.focus()
      } else if (event.shiftKey && document.activeElement === firstElement) {
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
      returnFocusTarget?.focus()
    }
  }, [isOpen, onClose, returnFocusRef])

  if (!isOpen) return null

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="agency-about-modal-title"
        aria-describedby="agency-about-modal-introduction"
        tabIndex={-1}
      >
        <header className={styles.header}>
          <div>
            <p className="eyebrow">Об агентстве</p>
            <h2 id="agency-about-modal-title">{aboutContent.modal.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            className={styles.close}
            type="button"
            onClick={onClose}
            aria-label="Закрыть информацию об агентстве"
          >
            <X size={20} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.content}>
          <p className={styles.introduction} id="agency-about-modal-introduction">
            {aboutContent.modal.introduction}
          </p>
          <div className={styles.directions}>
            {aboutContent.modal.directions.map((direction) => (
              <section className={styles.direction} key={direction.title}>
                <h3>{direction.title}</h3>
                <p>{direction.description}</p>
              </section>
            ))}
          </div>
          <section className={styles.work}>
            <h3>{aboutContent.modal.workTitle}</h3>
            <p>{aboutContent.modal.workDescription}</p>
          </section>
        </div>

        <footer className={styles.footer}>
          <a
            className="button"
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              onDiscuss()
            }}
          >
            {aboutContent.modal.action} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </div>,
    document.body,
  )
}

export default AboutModal
