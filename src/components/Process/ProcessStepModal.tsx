import { useEffect, useRef, type MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, X } from 'lucide-react'
import type { processSteps } from '../../data/siteContent'
import styles from './ProcessStepModal.module.scss'

type ProcessStep = (typeof processSteps)[number]

type ProcessStepModalProps = {
  step: ProcessStep | null
  returnFocusRef: MutableRefObject<HTMLButtonElement | null>
  onClose: () => void
  onDiscuss: () => void
}

function ProcessStepModal({ step, returnFocusRef, onClose, onDiscuss }: ProcessStepModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!step) return

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
  }, [step, onClose, returnFocusRef])

  if (!step) return null

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
        aria-labelledby="process-step-dialog-title"
        aria-describedby="process-step-dialog-description"
        tabIndex={-1}
      >
        <header className={styles.header}>
          <div>
            <p className="eyebrow">Этап {step.number}</p>
            <h2 id="process-step-dialog-title">{step.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            className={styles.close}
            type="button"
            onClick={onClose}
            aria-label="Закрыть описание этапа"
          >
            <X size={20} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.content}>
          <p className={styles.description} id="process-step-dialog-description">{step.description}</p>
          <div className={styles.details}>
            <h3>Что происходит на этом этапе</h3>
            <ul>
              {step.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </div>
          <p className={styles.disclaimer}>
            Конкретный порядок работы зависит от обстоятельств вашей ситуации и уточняется после первичного анализа.
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

export default ProcessStepModal
