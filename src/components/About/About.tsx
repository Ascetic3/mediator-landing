import officeImage from '../../assets/images/office-interior-temp.webp'
import styles from './About.module.scss'

function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Юридическая помощь</p>
          <h2 className="section-title" id="about-title">О компании «Медиатор»</h2>
          <p>
            «Медиатор» — юридическое агентство, которое помогает людям и бизнесу разобраться в сложных финансовых ситуациях и рассмотреть законные варианты решения.
          </p>
          <p>
            В работе важно сначала понять обстоятельства, объяснить возможные шаги и сопровождать выбранную процедуру.
          </p>
          <a className="button button--outline" href="#contact">Подробнее о нас</a>
        </div>
        <figure className={styles.imageWrap}>
          <img src={officeImage} alt="Временное фото интерьера; заменить на фотографию офиса агентства" loading="lazy" />
        </figure>
      </div>
    </section>
  )
}

export default About
