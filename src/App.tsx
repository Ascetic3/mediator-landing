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
import MobileInquiryCTA from './components/MobileInquiryCTA/MobileInquiryCTA'

function App() {
  useEffect(() => {
    const main = document.getElementById('main-content')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!main || reduceMotion || !('IntersectionObserver' in window)) return

    const motionTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-motion]'))
    if (!motionTargets.length) return
    document.documentElement.classList.add('has-motion')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const target = entry.target as HTMLElement
        target.dataset.motionState = 'visible'
        observer.unobserve(target)
      })
    }, { threshold: 0.12 })

    motionTargets.forEach((target) => {
      target.dataset.motionState = 'pending'
      observer.observe(target)
    })

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('has-motion')
      motionTargets.forEach((target) => delete target.dataset.motionState)
    }
  }, [])

  return (
    <>
      <Header />
      <main id="main-content">
        <div className="container heroComposition">
          <Hero />
          <TrustBar />
        </div>
        <Services />
        <Process />
        <About />
        <Leader />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileInquiryCTA />
    </>
  )
}

export default App
import { useEffect } from 'react'
