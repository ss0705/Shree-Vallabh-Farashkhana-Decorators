import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Contact() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}

export default Contact
