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
