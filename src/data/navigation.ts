export const navigationLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#process', label: 'Как мы работаем' },
  { href: '#about', label: 'О нас' },
  { href: '#faq', label: 'Вопросы' },
] as const

export const headerNavigationLinks = [
  { href: '#main-content', label: 'Главная' },
  ...navigationLinks,
] as const
