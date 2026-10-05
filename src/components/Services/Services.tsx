import { ArrowRight, ChevronRight } from 'lucide-react'
import { services } from '../../data/siteContent'
import styles from './Services.module.scss'

const assetUrls = Object.values(import.meta.glob('../../assets/images/service-*-temp.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})) as string[]

function Services() {
  const images = Object.keys(import.meta.glob('../../assets/images/service-*-temp.webp')).sort()

  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">Направления помощи</p>
          <h2 className="section-title" id="services-title">Наши услуги</h2>
        </div>
        <a className={styles.allServices} href="#contact">Обсудить ситуацию <ArrowRight size={15} aria-hidden="true" /></a>
      </div>
      <div className={styles.grid}>
        {services.map((service) => {
          const assetIndex = images.findIndex((path) => path.endsWith(service.image))
          const image = assetUrls[assetIndex] ?? assetUrls[0]

          return (
            <article className={styles.card} key={service.title}>
              <img className={styles.image} src={image} alt={service.alt} loading="lazy" />
              <div className={styles.cardBody}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className={styles.cardLink} href="#contact" aria-label={`Обсудить услугу: ${service.title}`}>
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Services
