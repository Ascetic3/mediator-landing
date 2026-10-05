import { ChevronDown } from 'lucide-react'
import { faqItems } from '../../data/siteContent'
import styles from './FAQ.module.scss'

function FAQ() {
  return (
    <section className={`container ${styles.section}`} id="faq" aria-labelledby="faq-title">
      <div className={styles.intro}>
        <p className="eyebrow">Отвечаем на вопросы</p>
        <h2 className="section-title" id="faq-title">Частые вопросы</h2>
      </div>
      <div className={styles.list}>
        {faqItems.map((item, index) => (
          <details className={styles.item} key={item.question} open={index === 0}>
            <summary>
              <span>{item.question}</span>
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FAQ
