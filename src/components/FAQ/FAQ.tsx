import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '../../data/siteContent'
import styles from './FAQ.module.scss'

function FAQ() {
  const idPrefix = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Отвечаем на вопросы</p>
          <h2 className="section-title" id="faq-title">Частые вопросы</h2>
        </div>
        <div className={styles.list} data-motion="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            const questionId = `${idPrefix}-question-${index}`
            const answerId = `${idPrefix}-answer-${index}`

            return (
              <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`} key={item.question}>
                <button
                  className={styles.question}
                  id={questionId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </button>
                <div
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className={styles.answerInner}><p>{item.answer}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
