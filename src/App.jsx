// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./i18n";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import GalleryPage from "./pages/Gallery";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WhatsAppButtonAdvanced from "./components/WhatsAppButtonAdvanced";
import contentData from "./data/content.json";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
      {/* Global WhatsApp Button - Appears on all pages */}
      <WhatsAppButtonAdvanced 
        phoneNumber={contentData.mobile}
        businessName={contentData.businessName}
        position="bottom-right"
        theme="dark"
        showQuickReplies={true}
        showAvailability={true}
        autoGreeting={true}
        offlineMessage={`We're currently closed. Our business hours are ${contentData.hours}. Please send a message and we'll respond tomorrow!`}
        businessHours={{ start: 7, end: 22 }}
      />
    </BrowserRouter>
  );
}

export default App;