import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, X } from 'lucide-react'
import type { MutableRefObject } from 'react'
import type { ServiceItem } from '../../data/siteContent'
import styles from './ServiceDetailsModal.module.scss'

type ServiceDetailsModalProps = {
  service: ServiceItem | null
  returnFocusRef: MutableRefObject<HTMLButtonElement | null>
  onClose: () => void
  onDiscuss: () => void
}

function ServiceDetailsModal({ service, returnFocusRef, onClose, onDiscuss }: ServiceDetailsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!service) return

    const previousOverflow = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const rootWasInert = appRoot?.hasAttribute('inert') ?? false
    const closeButton = closeButtonRef.current
    const returnFocusTarget = returnFocusRef.current

    document.body.style.overflow = 'hidden'
    appRoot?.setAttribute('inert', '')
    closeButton?.focus()

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
  }, [service, onClose, returnFocusRef])

  if (!service) return null

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
        aria-labelledby="service-dialog-title"
        aria-describedby="service-dialog-description"
        tabIndex={-1}
      >
        <header className={styles.header}>
          <div>
            <p className="eyebrow">Услуги агентства</p>
            <h2 id="service-dialog-title">{service.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            className={styles.close}
            type="button"
            onClick={onClose}
            aria-label="Закрыть подробности об услуге"
          >
            <X size={20} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.content}>
          <p className={styles.description} id="service-dialog-description">{service.details}</p>
          <div className={styles.includes}>
            <h3>Что входит</h3>
            <ul>
              {service.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <p className={styles.disclaimer}>
            Конкретный порядок работы зависит от обстоятельств вашей ситуации и определяется после первичного анализа.
          </p>
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
            Обсудить ситуацию <ArrowRight size={16} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </div>,
    document.body,
  )
}

export default ServiceDetailsModal
