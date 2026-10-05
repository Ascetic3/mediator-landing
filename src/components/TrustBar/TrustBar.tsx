import { trustItems } from '../../data/siteContent'
import styles from './TrustBar.module.scss'

function TrustBar() {
  return (
    <section className={styles.bar} aria-label="Принципы работы агентства">
      <div className={`container ${styles.grid}`}>
        {trustItems.map(({ title, description, icon: Icon }) => (
          <article className={styles.item} key={title}>
            <span className={styles.icon}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrustBar
