export type ConsultationPayload = {
  name: string
  phone: string
  source: string
  form: string
  page: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

export function getRussianPhoneDigits(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('7') || digits.startsWith('8')) digits = digits.slice(1)
  return digits.slice(0, 10)
}

export function formatRussianPhone(value: string) {
  const digits = getRussianPhoneDigits(value)
  if (!digits) return ''

  const area = digits.slice(0, 3)
  const first = digits.slice(3, 6)
  const second = digits.slice(6, 8)
  const third = digits.slice(8, 10)
  let formatted = `+7 (${area}`
  if (area.length === 3) formatted += ')'
  if (first) formatted += ` ${first}`
  if (second) formatted += `-${second}`
  if (third) formatted += `-${third}`
  return formatted
}

export function buildConsultationPayload(name: string, phone: string, href = window.location.href): ConsultationPayload {
  const url = new URL(href)
  const params = url.searchParams

  return {
    name: name.trim(),
    phone,
    source: 'mediator_landing',
    form: 'consultation',
    page: url.pathname,
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
    utm_term: params.get('utm_term') ?? '',
  }
}
