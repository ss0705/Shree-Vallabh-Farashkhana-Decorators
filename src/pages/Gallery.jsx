import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import Navbar from '../components/Navbar'

function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Gallery />
      </main>
      <Footer />
    </>
  )
}

export default GalleryPage
