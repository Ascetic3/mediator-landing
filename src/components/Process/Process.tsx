import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { processSteps } from '../../data/siteContent'
import ProcessStepModal from './ProcessStepModal'
import styles from './Process.module.scss'

function Process() {
  const [activeStep, setActiveStep] = useState<(typeof processSteps)[number] | null>(null)
  const returnFocusRef = useRef<HTMLButtonElement | null>(null)

  function discussSituation() {
    setActiveStep(null)
    requestAnimationFrame(() => {
      document.querySelector('#contact form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      document.getElementById('contact-name')?.focus({ preventScroll: true })
    })
  }

  return (
    <section className={styles.section} id="process" aria-labelledby="process-title">
      <div className="container">
        <div className={styles.heading} data-motion="process-heading">
          <p className="eyebrow">Понятные этапы</p>
          <h2 className={`section-title ${styles.title}`} id="process-title">Как проходит работа</h2>
        </div>
        <ol className={styles.steps}>
          {processSteps.map((step) => (
            <li className={styles.step} key={step.number} data-motion="process-step">
              <button
                className={styles.card}
                type="button"
                aria-haspopup="dialog"
                aria-label={`Этап ${step.number}: ${step.title}. Подробнее`}
                onClick={(event) => {
                  returnFocusRef.current = event.currentTarget
                  setActiveStep(step)
                }}
              >
                <span className={styles.number}>{step.number}</span>
                <span className={styles.cardTitle}>{step.title}</span>
                <span className={styles.description}>{step.description}</span>
                <span className={styles.more}>Подробнее <ArrowRight size={15} aria-hidden="true" /></span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <ProcessStepModal
        step={activeStep}
        returnFocusRef={returnFocusRef}
        onClose={() => setActiveStep(null)}
        onDiscuss={discussSituation}
      />
    </section>
  )
}

export default Process
