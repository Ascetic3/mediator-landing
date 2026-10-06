import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { services, type ServiceItem } from '../../data/siteContent'
import ServiceDetailsModal from './ServiceDetailsModal'
import styles from './Services.module.scss'

const assetUrls = Object.values(import.meta.glob('../../assets/images/service-*-temp.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})) as string[]

function Services() {
  const images = Object.keys(import.meta.glob('../../assets/images/service-*-temp.webp')).sort()
  const [activeService, setActiveService] = useState<ServiceItem | null>(null)
  const returnFocusRef = useRef<HTMLButtonElement | null>(null)

  function discussSituation() {
    setActiveService(null)
    requestAnimationFrame(() => {
      document.querySelector('#contact form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      document.getElementById('contact-name')?.focus({ preventScroll: true })
    })
  }

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
              </div>
              <button
                className={styles.cardAction}
                type="button"
                aria-haspopup="dialog"
                aria-label={`Подробнее об услуге: ${service.title}`}
                onClick={(event) => {
                  returnFocusRef.current = event.currentTarget
                  setActiveService(service)
                }}
              >
                <span className={styles.cardLink}>
                  Подробнее <ArrowRight size={15} aria-hidden="true" />
                </span>
              </button>
            </article>
          )
        })}
      </div>
      <ServiceDetailsModal
        service={activeService}
        returnFocusRef={returnFocusRef}
        onClose={() => setActiveService(null)}
        onDiscuss={discussSituation}
      />
    </section>
  )
}

export default Services
