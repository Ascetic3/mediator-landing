import { useCallback, useRef, useState } from 'react'
import officeImage from '../../assets/images/office-interior-temp.webp'
import { aboutContent } from '../../data/siteContent'
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
        <div className={styles.copy}>
          <p className="eyebrow">{aboutContent.eyebrow}</p>
          <h2 className="section-title" id="about-title">{aboutContent.title}</h2>
          {aboutContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul className={styles.directions} aria-label="Направления агентства">
            {aboutContent.focusAreas.map((area) => <li key={area}>{area}</li>)}
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
        <figure className={styles.imageWrap}>
          <img src={officeImage} alt="Временное фото интерьера; заменить на фотографию офиса агентства" loading="lazy" />
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
