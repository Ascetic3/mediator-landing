import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import styles from './Contact.module.scss'

function Contact() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('Форма пока не подключена: данные не отправлены.')
  }

  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Первый шаг — разговор</p>
          <h2 className="section-title" id="contact-title">Нужна помощь?</h2>
          <p>Оставьте контакты, чтобы обсудить вашу ситуацию и возможные варианты решения.</p>
          <p className={styles.todo}>Контактные данные агентства будут добавлены после подтверждения.</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Ваше имя</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Как к вам обращаться" required />
          <label htmlFor="contact-phone">Телефон</label>
          <input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Номер для связи" required />
          <button className="button" type="submit">
            Оставить заявку <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className={styles.formNotice} aria-live="polite">{notice}</p>
        </form>
      </div>
    </section>
  )
}

export default Contact
