import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './i18n'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import GalleryPage from './pages/Gallery'
import Home from './pages/Home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
