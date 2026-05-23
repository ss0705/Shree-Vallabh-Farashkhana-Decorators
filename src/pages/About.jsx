// src/pages/AboutPage.jsx
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import About from '../components/About'

function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <About />
      </main>
      <Footer />
    </>
  )
}

export default AboutPage