import leaderImage from '../../assets/images/hero-counselor-temp.webp'
import styles from './Leader.module.scss'

function Leader() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="leader-title">
      <figure className={styles.portrait}>
        <img src={leaderImage} alt="Временный портрет; заменить на утверждённое фото Любови Кузнецовой" loading="lazy" />
        <figcaption>Временное фото — заменить перед публикацией</figcaption>
      </figure>
      <div className={styles.copy}>
        <p className="eyebrow">Руководитель агентства</p>
        <h2 className="section-title" id="leader-title">Любовь Кузнецова</h2>
        <p>
          Команда «Медиатор» помогает разобраться в ситуации, оценить перспективы и пройти согласованные этапы процедуры.
        </p>
        <a className="button button--outline" href="#contact">Задать вопрос</a>
      </div>
      <div className={styles.note}>
        <span aria-hidden="true">“</span>
        <p>Сначала — внимательно разобраться в обстоятельствах. Затем — обсудить понятные и законные шаги.</p>
      </div>
    </section>
  )
}

export default Leader
