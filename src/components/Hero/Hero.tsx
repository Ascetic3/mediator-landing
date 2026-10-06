import { ArrowRight } from 'lucide-react'
import styles from './Hero.module.scss'

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Агентство правовой помощи «Медиатор»</p>
          <h1 id="hero-title">Банкротство физических лиц</h1>
          <p className={styles.description}>
            Помогаем разобраться в финансовой ситуации и сопровождаем процедуру на всех этапах.
          </p>
          <div className={styles.actions}>
            <a className="button" href="#contact">
              Оставить заявку <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="button button--outline" href="#contact">Бесплатная консультация</a>
          </div>
        </div>
        <figure className={styles.imageWrap}>
          <img src="/hero-agency-consultation.png" alt="Переговорное пространство с рабочим столом для консультаций" />
        </figure>
      </div>
    </section>
  )
}

export default Hero
