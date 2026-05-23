// src/pages/ServicePage.jsx (or ServicesPage.jsx)
import Footer from '../components/Footer'
import Services from '../components/Services' // You'll need to create this component
import Navbar from '../components/Navbar'

function ServicePage() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Services />
      </main>
      <Footer />
    </>
  )
}

export default ServicePage