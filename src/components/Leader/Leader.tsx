import styles from './Leader.module.scss'
import CredentialsGallery from './CredentialsGallery'
import SafeImage from '../SafeImage/SafeImage'

const confirmedFacts = [
  'Повышение квалификации арбитражных управляющих — 2019 и 2021',
  'Профильный семинар по изменениям законодательства — 2018',
  'Участие в профессиональных и образовательных мероприятиях',
]

function Leader() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="leader-title">
      <figure className={styles.portrait} data-motion="leader-portrait">
        <SafeImage
          frameClassName={styles.portraitImage}
          src="/images/leader-portrait-768.webp"
          srcSet="/images/leader-portrait-480.webp 480w, /images/leader-portrait-768.webp 768w, /images/leader-portrait-960.webp 960w, /images/leader-portrait-1280.webp 1280w"
          sizes="(max-width: 600px) calc(100vw - 2.5rem), (max-width: 900px) 40vw, 44vw"
          width={3072}
          height={4608}
          alt="Любовь Кузнецова"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className={styles.copy} data-motion="leader-copy">
        <p className="eyebrow">Ведущий специалист агентства «Медиатор»</p>
        <h2 className="section-title" id="leader-title">Любовь Кузнецова</h2>
        <p className={styles.summary}>
          Сопровождает сложные финансовые и банкротные вопросы. Регулярно проходит профильное повышение квалификации и участвует в профессиональных мероприятиях.
        </p>
        <ul className={styles.facts}>
          {confirmedFacts.map((fact, index) => (
            <li key={fact} data-motion="leader-fact">
              <span aria-hidden="true">0{index + 1}</span>
              <p>{fact}</p>
            </li>
          ))}
        </ul>
        <div data-motion="leader-gallery"><CredentialsGallery /></div>
      </div>
    </section>
  )
}

export default Leader
