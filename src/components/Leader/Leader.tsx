import { useEffect, useRef } from 'react'
import styles from './Leader.module.scss'
import CredentialsGallery from './CredentialsGallery'
import SafeImage from '../SafeImage/SafeImage'
import { publicAsset, publicAssetSrcSet } from '../../utils/publicAssets'
import { credentialDocuments } from '../../data/credentials'

function useCredentialPrefetch() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }).connection

    if (connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType ?? '')) return

    const section = sectionRef.current
    if (!section) return

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    let cancelled = false
    let observer: IntersectionObserver | undefined
    let idleHandle: number | undefined
    let timeoutHandle: number | undefined
    let documentIndex = 0

    function scheduleIdle(callback: () => void) {
      if (cancelled) return

      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(() => {
          idleHandle = undefined
          if (!cancelled) callback()
        }, { timeout: 2000 })
        return
      }

      timeoutHandle = window.setTimeout(() => {
        timeoutHandle = undefined
        if (!cancelled) callback()
      }, 250)
    }

    function prefetchNextDocument() {
      if (cancelled || documentIndex >= credentialDocuments.length) return

      const image = new Image()
      image.decoding = 'async'
      image.fetchPriority = 'low'
      image.onload = image.onerror = () => {
        documentIndex += 1
        scheduleIdle(prefetchNextDocument)
      }
      image.src = publicAsset(credentialDocuments[documentIndex])
    }

    function observeLeader() {
      if (cancelled) return

      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return

        observer?.disconnect()
        observer = undefined
        scheduleIdle(prefetchNextDocument)
      }, { rootMargin: '125% 0px 125% 0px' })

      observer.observe(section as HTMLElement)
    }

    function afterInitialLoad() {
      window.removeEventListener('load', afterInitialLoad)
      scheduleIdle(observeLeader)
    }

    if (document.readyState === 'complete') {
      scheduleIdle(observeLeader)
    } else {
      window.addEventListener('load', afterInitialLoad, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', afterInitialLoad)
      observer?.disconnect()
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle)
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle)
    }
  }, [])

  return sectionRef
}

const confirmedFacts = [
  'Повышение квалификации арбитражных управляющих — 2019 и 2021',
  'Профильный семинар по изменениям законодательства — 2018',
  'Участие в профессиональных и образовательных мероприятиях',
]

function Leader() {
  const leaderSectionRef = useCredentialPrefetch()

  return (
    <section ref={leaderSectionRef} className={`container ${styles.section}`} aria-labelledby="leader-title">
      <figure className={styles.portrait} data-motion="leader-portrait">
        <SafeImage
          frameClassName={styles.portraitImage}
          src={publicAsset('images/leader-portrait-768.webp')}
          srcSet={publicAssetSrcSet('images/leader-portrait-480.webp 480w, images/leader-portrait-768.webp 768w, images/leader-portrait-960.webp 960w, images/leader-portrait-1280.webp 1280w')}
          sizes="(max-width: 600px) calc(100vw - 2.5rem), (max-width: 900px) 40vw, 44vw"
          width={3072}
          height={4608}
          alt="Любовь Кузнецова"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className={styles.copy} data-motion="leader-copy">
        <p className="eyebrow">
          <span className={styles.fullRole}>Ведущий специалист агентства «Медиатор»</span>
          <span className={styles.mobileRole}>Ведущий специалист</span>
        </p>
        <h2 className="section-title" id="leader-title">Любовь Кузнецова</h2>
        <p className={styles.summary}>
          <span className={styles.fullSummary}>Сопровождает сложные финансовые и банкротные вопросы. Регулярно проходит профильное повышение квалификации и участвует в профессиональных мероприятиях.</span>
          <span className={styles.mobileSummary}>Сопровождает сложные финансовые и банкротные вопросы.</span>
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
