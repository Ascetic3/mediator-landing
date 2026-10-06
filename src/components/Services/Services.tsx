import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { services, type ServiceItem } from '../../data/siteContent'
import SafeImage from '../SafeImage/SafeImage'
import ServiceDetailsModal from './ServiceDetailsModal'
import styles from './Services.module.scss'

const serviceImages: Record<string, { src: string; srcSet: string }> = {
  'service-procedure-temp.webp': {
    src: '/images/service-procedure-640.webp',
    srcSet: '/images/service-procedure-360.webp 360w, /images/service-procedure-640.webp 640w, /images/service-procedure-960.webp 960w, /images/service-procedure-1280.webp 1280w',
  },
  'service-managers-temp.webp': {
    src: '/images/service-managers-640.webp',
    srcSet: '/images/service-managers-360.webp 360w, /images/service-managers-640.webp 640w, /images/service-managers-960.webp 960w, /images/service-managers-1280.webp 1280w',
  },
  'service-settlement-temp.webp': {
    src: '/images/service-settlement-640.webp',
    srcSet: '/images/service-settlement-360.webp 360w, /images/service-settlement-640.webp 640w, /images/service-settlement-960.webp 960w, /images/service-settlement-1280.webp 1280w',
  },
  'service-installments-temp.webp': {
    src: '/images/service-installments-640.webp',
    srcSet: '/images/service-installments-360.webp 360w, /images/service-installments-640.webp 640w, /images/service-installments-960.webp 960w, /images/service-installments-1280.webp 1280w',
  },
}

function Services() {
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
          const image = serviceImages[service.image]

          return (
            <article className={styles.card} key={service.title} data-motion="service-card">
              <SafeImage
                className={styles.image}
                src={image.src}
                srcSet={image.srcSet}
                sizes="(max-width: 520px) calc(100vw - 2.5rem), (max-width: 900px) calc(50vw - 2.5rem), (max-width: 1400px) calc((100vw - 5rem) / 4), 320px"
                width={1448}
                height={1086}
                alt={service.alt}
                loading="lazy"
                decoding="async"
                frameClassName={styles.imageFrame}
              />
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
