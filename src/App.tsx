import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import TrustBar from './components/TrustBar/TrustBar'
import Services from './components/Services/Services'
import Process from './components/Process/Process'
import About from './components/About/About'
import Leader from './components/Leader/Leader'
import FAQ from './components/FAQ/FAQ'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  useEffect(() => {
    const main = document.getElementById('main-content')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!main || reduceMotion || !('IntersectionObserver' in window)) return

    const sections = Array.from(main.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element.tagName === 'SECTION')
      .slice(1)

    if (!sections.length) return
    document.documentElement.classList.add('has-scroll-reveal')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const section = entry.target as HTMLElement
        section.dataset.scrollReveal = 'visible'
        observer.unobserve(section)
      })
    }, { threshold: 0.08 })

    sections.forEach((section) => {
      section.dataset.scrollReveal = 'pending'
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('has-scroll-reveal')
      sections.forEach((section) => delete section.dataset.scrollReveal)
    }
  }, [])

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <About />
        <Leader />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
import { useEffect } from 'react'
