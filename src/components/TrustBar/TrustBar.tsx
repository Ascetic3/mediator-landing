import { trustItems } from '../../data/siteContent'
import styles from './TrustBar.module.scss'

function TrustBar() {
  return (
    <section className={styles.bar} aria-label="Принципы работы агентства">
      <div className={styles.grid} data-motion="trust-card">
        {trustItems.map(({ title, description, icon: Icon }) => (
          <article className={styles.item} key={title} data-motion="trust-item">
            <span className={styles.icon}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
            <div>
              <h2>
                <span className={styles.fullTitle}>{title}</span>
                <span className={styles.mobileTitle}>
                  {title === 'Работаем по закону' ? 'Закон' : title === 'Разбираемся в ситуации' ? 'Разбор ситуации' : title === 'Сопровождаем процедуру' ? 'Сопровождение' : 'На связи'}
                </span>
              </h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrustBar
