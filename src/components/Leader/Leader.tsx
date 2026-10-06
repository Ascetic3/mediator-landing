import styles from './Leader.module.scss'
import CredentialsGallery from './CredentialsGallery'

const confirmedFacts = [
  'Повышение квалификации арбитражных управляющих — 2019 и 2021',
  'Профильный семинар по изменениям законодательства — 2018',
  'Участие в профессиональных и образовательных мероприятиях',
]

function Leader() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="leader-title">
      <figure className={styles.portrait}>
        <img
          src="/legacy-assets/IMG_0816.jpeg"
          alt="Любовь Кузнецова"
          loading="lazy"
        />
      </figure>
      <div className={styles.copy}>
        <p className="eyebrow">Ведущий специалист агентства «Медиатор»</p>
        <h2 className="section-title" id="leader-title">Любовь Кузнецова</h2>
        <p className={styles.summary}>
          Сопровождает сложные финансовые и банкротные вопросы. Регулярно проходит профильное повышение квалификации и участвует в профессиональных мероприятиях.
        </p>
        <ul className={styles.facts}>
          {confirmedFacts.map((fact, index) => (
            <li key={fact}>
              <span aria-hidden="true">0{index + 1}</span>
              <p>{fact}</p>
            </li>
          ))}
        </ul>
        <CredentialsGallery />
      </div>
    </section>
  )
}

export default Leader
