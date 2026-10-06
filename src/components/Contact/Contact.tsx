import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { buildConsultationPayload, getRussianPhoneDigits, formatRussianPhone } from '../../utils/consultationPayload'
import { legalUrls } from '../../config/legal'
import styles from './Contact.module.scss'

function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [notice, setNotice] = useState('')
  const preparedPayload = useRef<ReturnType<typeof buildConsultationPayload> | null>(null)

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatRussianPhone(event.target.value))
    setPhoneError(false)
    setNotice('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const digits = getRussianPhoneDigits(phone)

    if (digits.length !== 10) {
      setPhoneError(true)
      setNotice('')
      document.getElementById('contact-phone')?.focus()
      return
    }

    preparedPayload.current = buildConsultationPayload(name, `+7${digits}`)
    setPhoneError(false)
    setNotice('Форма подготовлена. Отправка пока не подключена.')
  }

  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Первый шаг — разговор</p>
          <h2 className="section-title" id="contact-title">Нужна помощь?</h2>
          <p>Оставьте контакты, чтобы обсудить вашу ситуацию и возможные варианты решения.</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="contact-name">Ваше имя</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Как к вам обращаться"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="contact-phone">Телефон</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (999) 123-45-67"
            value={phone}
            onChange={handlePhoneChange}
            aria-required="true"
            aria-invalid={phoneError}
            aria-describedby={phoneError ? 'contact-phone-error' : undefined}
          />
          {phoneError && <p className={styles.fieldError} id="contact-phone-error">Проверьте номер телефона</p>}
          <button className="button" type="submit">
            Получить консультацию <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className={styles.consent}>
            Нажимая кнопку, вы соглашаетесь на{' '}
            {legalUrls.personalDataConsentUrl
              ? <a href={legalUrls.personalDataConsentUrl}>обработку персональных данных</a>
              : <span>обработку персональных данных</span>}.
          </p>
          <p className={styles.formNotice} aria-live="polite" role="status">{notice}</p>
        </form>
      </div>
    </section>
  )
}

export default Contact
