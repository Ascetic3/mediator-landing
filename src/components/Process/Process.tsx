import { processSteps } from '../../data/siteContent'
import styles from './Process.module.scss'

function Process() {
  return (
    <section className={styles.section} id="process" aria-labelledby="process-title">
      <div className="container">
        <p className="eyebrow">Понятные этапы</p>
        <h2 className={`section-title ${styles.title}`} id="process-title">Как проходит работа</h2>
        <ol className={styles.steps}>
          {processSteps.map((step) => (
            <li className={styles.step} key={step.number}>
              <span className={styles.number}>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
