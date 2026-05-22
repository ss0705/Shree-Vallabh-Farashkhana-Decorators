import About from '../components/About'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import IntroSplash from '../components/IntroSplash'
import Marquee from '../components/Marquee'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import WhyUs from '../components/WhyUs'

function Home() {
  return (
    <>
      <IntroSplash />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Gallery />
        <WhyUs />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}

export default Home
