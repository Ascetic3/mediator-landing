import { ArrowRight } from 'lucide-react'
import heroImage from '../../assets/images/hero-counselor-temp.webp'
import styles from './Hero.module.scss'

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Законно. Понятно. Надёжно.</p>
          <h1 id="hero-title">Банкротство физических лиц</h1>
          <p className={styles.description}>
            Помогаем разобраться в финансовой ситуации и пройти процедуру с последовательным сопровождением.
          </p>
          <div className={styles.actions}>
            <a className="button" href="#contact">
              Оставить заявку <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="button button--outline" href="#contact">Бесплатная консультация</a>
          </div>
        </div>
        <figure className={styles.imageWrap}>
          <img src={heroImage} alt="Временный фотопортрет специалиста; заменить на утверждённое фото" />
        </figure>
      </div>
    </section>
  )
}

export default Hero
