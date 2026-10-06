import { useCallback, useRef, useState } from 'react'
import { aboutContent } from '../../data/siteContent'
import SafeImage from '../SafeImage/SafeImage'
import AboutModal from './AboutModal'
import styles from './About.module.scss'

function About() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const returnFocusRef = useRef<HTMLButtonElement | null>(null)

  const closeModal = useCallback(() => setIsModalOpen(false), [])

  const discussSituation = useCallback(() => {
    setIsModalOpen(false)
    requestAnimationFrame(() => {
      const form = document.querySelector('#contact form')
      const nameField = document.getElementById('contact-name')
      if (!form || !nameField) return

      form.scrollIntoView({ behavior: 'smooth', block: 'center' })

      let frames = 0
      const focusWhenVisible = () => {
        const bounds = nameField.getBoundingClientRect()
        if (bounds.top >= 0 && bounds.bottom <= window.innerHeight) {
          nameField.focus({ preventScroll: true })
        } else if (frames < 120) {
          frames += 1
          requestAnimationFrame(focusWhenVisible)
        } else {
          nameField.focus({ preventScroll: true })
        }
      }

      requestAnimationFrame(focusWhenVisible)
    })
  }, [])

  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy} data-motion="about-copy">
          <p className="eyebrow">{aboutContent.eyebrow}</p>
          <h2 className="section-title" id="about-title">{aboutContent.title}</h2>
          {aboutContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul className={styles.directions} aria-label="Направления агентства">
            {aboutContent.focusAreas.map((area) => <li key={area} data-motion="about-marker">{area}</li>)}
          </ul>
          <button
            ref={returnFocusRef}
            className="button button--outline"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            {aboutContent.action}
          </button>
        </div>
        <figure className={styles.imageWrap} data-motion="about-image">
          <SafeImage
            frameClassName={styles.imageFrame}
            src="/images/office-interior-960.webp"
            srcSet="/images/office-interior-480.webp 480w, /images/office-interior-768.webp 768w, /images/office-interior-960.webp 960w, /images/office-interior-1280.webp 1280w, /images/office-interior-1440.webp 1440w"
            sizes="(max-width: 700px) 100vw, (max-width: 1320px) 50vw, 660px"
            width={1672}
            height={941}
            alt="Временное фото интерьера; заменить на фотографию офиса агентства"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
      <AboutModal
        isOpen={isModalOpen}
        returnFocusRef={returnFocusRef}
        onClose={closeModal}
        onDiscuss={discussSituation}
      />
    </section>
  )
}

export default About
