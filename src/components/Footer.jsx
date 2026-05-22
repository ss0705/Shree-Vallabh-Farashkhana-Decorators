// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'
import { Phone, MapPin, Mail, Sparkles } from 'lucide-react'
import services from '../data/services.json'
import useSiteData from '../hooks/useSiteData'

function Footer() {
  const { content } = useSiteData()

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-12 md:pt-16 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center sm:text-left">
          
          {/* Column 1 - Brand & About */}
          <div className="space-y-4">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center sm:justify-start gap-3">
              {content.logoUrl ? (
                <img 
                  src={content.logoUrl} 
                  alt={content.logoAlt || "Logo"} 
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white">
                  <span className="text-lg">✦</span>
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">શ્રી વલ્લભ</h2>
                <p className="text-xs text-gray-400">Farashkhana & Decorators</p>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              Wedding decoration, farashkhana rentals, flowers, furniture, lighting and cooling for Vadodara events.
            </p>
            
            {/* Social Links with React Icons */}
            <div className="flex gap-3 justify-center sm:justify-start">
              <a 
                href={content.whatsapp || "https://wa.me/918905346254"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#home" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center gap-2 justify-center sm:justify-start group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center gap-2 justify-center sm:justify-start group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center gap-2 justify-center sm:justify-start group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center gap-2 justify-center sm:justify-start group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center gap-2 justify-center sm:justify-start group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center gap-2 justify-center sm:justify-start group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services && services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link 
                    to="/services" 
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm flex items-center gap-2 justify-center sm:justify-start"
                  >
                    <Sparkles size={12} className="text-amber-500" />
                    {service.title_en || service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <Phone size={16} className="text-amber-400" />
                </div>
                <a 
                  href={`tel:+91${content.mobile}`} 
                  className="text-gray-300 hover:text-amber-400 transition text-sm"
                >
                  {content.mobile}
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <Mail size={16} className="text-amber-400" />
                </div>
                <a 
                  href={`mailto:${content.email}`} 
                  className="text-gray-300 hover:text-amber-400 transition text-sm"
                >
                  {content.email}
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <MapPin size={16} className="text-amber-400" />
                </div>
                <span className="text-gray-300 text-sm">{content.address}</span>
              </li>
            </ul>
            
            {/* Business Hours */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center sm:text-left">
                <span className="font-semibold text-amber-400">Hours:</span> {content.hours || "7 AM - 10 PM"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-xs md:text-sm">
            © 2026 Shree Vallabh Farashkhana & Decorators. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Created with ❤️ by{' '}
            <a 
              href="https://shreyshah0705.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Shrey Shah
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;