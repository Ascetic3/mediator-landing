import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const indexPath = resolve('dist/index.html')
const serverEntryPath = pathToFileURL(resolve('dist-ssr/entry-server.js')).href
const { render } = await import(serverEntryPath)
const html = await readFile(indexPath, 'utf8')
const rootPlaceholder = '<div id="root"></div>'

if (typeof render !== 'function') throw new Error('SSR entry does not export render()')
if (html.split(rootPlaceholder).length !== 2) throw new Error('Expected exactly one empty #root in dist/index.html')

const markup = render()
if (!markup || markup.includes('id="root"')) throw new Error('SSR output is empty or contains a duplicate root')

const requiredContent = [
  'Банкротство физических лиц',
  'Наши услуги',
  'Как проходит работа',
  '«Медиатор» помогает решать сложные финансовые ситуации',
  'Любовь Кузнецова',
  'С чего начинается работа?',
  'Как понять, подходит ли мне банкротство?',
  'Какие этапы проходит процедура?',
  'Что будет с имуществом?',
  'Как банкротство повлияет на кредитную историю?',
  'Можно ли рассмотреть реструктуризацию или мировое соглашение?',
  'Сколько времени занимает процедура?',
  'От чего зависит стоимость сопровождения?',
  'Нужна помощь?',
  'Информация на сайте не является гарантией результата.',
]
const missingContent = requiredContent.filter((text) => !markup.includes(text))
if (missingContent.length) throw new Error('Missing rendered page content: ' + missingContent.join(' | '))
if (markup.includes('aria-modal="true"')) throw new Error('A dialog unexpectedly rendered open')
if ((markup.match(/<h1(?:\s|>)/g) || []).length !== 1) throw new Error('Expected exactly one prerendered H1')
if (!markup.includes('aria-label="Открыть меню" aria-expanded="false"')) {
  throw new Error('The mobile menu should be closed in prerendered HTML')
}

const faqStart = markup.indexOf('id="faq"')
const faqEnd = markup.indexOf('</section>', faqStart)
const faqMarkup = faqStart >= 0 && faqEnd > faqStart ? markup.slice(faqStart, faqEnd) : ''
const closedQuestions = (faqMarkup.match(/aria-expanded="false"/g) || []).length
const hiddenAnswers = (faqMarkup.match(/aria-hidden="true" inert=""/g) || []).length
if (closedQuestions !== 8 || hiddenAnswers !== 8) {
  throw new Error('Expected all 8 FAQ answers to start closed in prerendered HTML')
}

const prerenderedHtml = html.replace(rootPlaceholder, '<div id="root">' + markup + '</div>')
await writeFile(indexPath, prerenderedHtml, 'utf8')
console.log('Prerendered dist/index.html with ' + requiredContent.length + ' content assertions passed.')
