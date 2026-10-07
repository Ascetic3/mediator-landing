import { ArrowRight } from 'lucide-react'
import { publicAsset, publicAssetSrcSet } from '../../utils/publicAssets'
import SafeImage from '../SafeImage/SafeImage'
import styles from './Hero.module.scss'

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className="eyebrow" data-hero-reveal="1">Агентство правовой помощи «Медиатор»</p>
          <h1 id="hero-title" data-hero-reveal="2">Банкротство физических лиц</h1>
          <p className={styles.description} data-hero-reveal="3">
            Помогаем разобраться в финансовой ситуации и сопровождаем процедуру на всех этапах.
          </p>
          <div className={styles.actions} data-hero-reveal="4">
            <a className="button" href="#contact">
              Оставить заявку <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="button button--secondary" href="#contact">Бесплатная консультация</a>
          </div>
        </div>
        <figure className={styles.imageWrap}>
          <SafeImage
            src={publicAsset('images/hero-consultation-960.webp')}
            srcSet={publicAssetSrcSet('images/hero-consultation-480.webp 480w, images/hero-consultation-768.webp 768w, images/hero-consultation-960.webp 960w, images/hero-consultation-1280.webp 1280w')}
            sizes="(max-width: 700px) 100vw, (max-width: 1320px) 50vw, 660px"
            width={1448}
            height={1086}
            alt="Переговорное пространство с рабочим столом для консультаций"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={styles.heroImage}
            frameClassName={styles.imageFrame}
          />
        </figure>
      </div>
    </section>
  )
}

export default Hero
