// src/components/ContactForm.jsx
import emailjs from '@emailjs/browser'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Clock, Calendar, Map, User, Smartphone, MessageCircle, Sparkles } from 'lucide-react'
import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Snackbar from './Snackbar'
import useSnackbar from '../hooks/useSnackbar'
import useSiteData from '../hooks/useSiteData'

const eventTypes = ['Wedding', 'Mehendi', 'Haldi', 'Birthday', 'Engagement', 'Corporate', 'Other']

function ContactForm() {
  const { t, i18n } = useTranslation()
  const { content } = useSiteData()
  const [sending, setSending] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState('')
  const formRef = useRef()
  const { closeSnackbar, showSnackbar, snackbar } = useSnackbar()
  const isGujarati = i18n.language === 'gu'

  const EMAILJS_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    ownerTemplateId: import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID,
    customerTemplateId: import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  }

  const isEmailJSConfigured = () => {
    return Object.values(EMAILJS_CONFIG).every(value => value && value.trim() !== '')
  }

  const showMessage = (message, type = 'info') => {
    setStatusMessage(message)
    setStatusType(type)
    showSnackbar(message, type)
    
    if (type !== 'info') {
      setTimeout(() => {
        setStatusMessage('')
        setStatusType('')
      }, 5000)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    
    if (!isEmailJSConfigured()) {
      showMessage('Email service not configured. Please contact support.', 'error')
      return
    }

    setSending(true)
    showMessage('Sending your inquiry...', 'info')

    try {
      const form = formRef.current
      const formData = new FormData(form)
      
      const templateData = {
        to_name: content.ownerName || 'Owner',
        owner_name: content.ownerName,
        owner_email: content.email,
        owner_mobile: content.mobile,
        business_name: content.businessName || 'Shree Vallabh Farashkhana & Decorators',
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        from_mobile: formData.get('mobile'),
        event_type: formData.get('event_type') || 'Not specified',
        event_date: formData.get('event_date') || 'Not specified',
        location: formData.get('location') || 'Not specified',
        message: formData.get('message') || 'No message provided',
        reply_to: formData.get('email'),
        customer_name: formData.get('name'),
        customer_email: formData.get('email'),
        inquiry_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        contact_deadline: '24 hours'
      }

      await Promise.all([
        emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.ownerTemplateId,
          templateData,
          EMAILJS_CONFIG.publicKey
        ),
        emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.customerTemplateId,
          templateData,
          EMAILJS_CONFIG.publicKey
        )
      ])
      
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4A373', '#FAEDCD', '#2C1810', '#F59E0B']
      })
      
      showMessage('✓ Inquiry sent successfully! Owner will contact you within 24 hours.', 'success')
      form.reset()
      
    } catch (error) {
      console.error('EmailJS Error:', error)
      showMessage('Failed to send inquiry. Please call +91 ' + content.mobile + ' for urgent bookings.', 'error')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-white to-amber-50" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-2">
            {isGujarati ? "ઝડપી પૂછપરછ" : "FAST INQUIRY"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            {t('sections.contact') || (isGujarati ? "સંપર્ક કરો" : "Book Your Event / Get Free Quote")}
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Form */}
          <motion.form 
            ref={formRef}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-5 md:p-8"
            onSubmit={onSubmit} 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              {isGujarati ? "તમારી વિગતો મોકલો" : "Send Your Details"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  {isGujarati ? "પૂરું નામ" : "Full Name"} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    name="name" 
                    required 
                    placeholder={isGujarati ? "તમારું પૂરું નામ દાખલ કરો" : "Enter your full name"}
                    disabled={sending}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition outline-none bg-white"
                  />
                </div>
              </div>
              
              {/* Mobile Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  {isGujarati ? "મોબાઇલ નંબર" : "Mobile Number"} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    name="mobile" 
                    required 
                    inputMode="tel" 
                    placeholder="9876543210"
                    pattern="[0-9]{10}"
                    title="Please enter 10 digit mobile number"
                    disabled={sending}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition outline-none bg-white"
                  />
                </div>
              </div>
              
              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  {isGujarati ? "ઇમેઇલ સરનામું" : "Email Address"} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  
                  <input 
                    name="email" 
                    required 
                    type="email" 
                    placeholder="your@email.com"
                    disabled={sending}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition outline-none bg-white"
                  />
                </div>
              </div>
              
              {/* Event Type */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  {isGujarati ? "ઇવેન્ટ પ્રકાર" : "Event Type"}
                </label>
                <div className="relative">
                  <select 
                    name="event_type" 
                    disabled={sending} 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition appearance-none bg-white cursor-pointer"
                  >
                    <option value="">{isGujarati ? "ઇવેન્ટ પ્રકાર પસંદ કરો" : "Select event type"}</option>
                    {eventTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Event Date */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  {isGujarati ? "ઇવેન્ટ તારીખ" : "Event Date"}
                </label>
                <div className="relative">
                  <input 
                    name="event_date" 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    disabled={sending}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition outline-none bg-white"
                  />
                </div>
              </div>
              
              {/* Event Location */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  {isGujarati ? "ઇવેન્ટ સ્થાન" : "Event Location"}
                </label>
                <div className="relative">
                  <input 
                    name="location" 
                    placeholder={isGujarati ? "શહેર / સ્થળ નું નામ" : "City / Venue name"}
                    disabled={sending}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition outline-none bg-white"
                  />
                </div>
              </div>
            </div>
            
            {/* Message */}
            <div className="mt-5 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                {isGujarati ? "સંદેશ / જરૂરિયાતો" : "Message / Requirements"}
              </label>
              <textarea 
                name="message" 
                rows="4" 
                placeholder={isGujarati ? "તમારી જરૂરિયાતો અમને જણાવો..." : "Tell us about your requirements..."}
                disabled={sending}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none outline-none bg-white"
              />
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit"
              disabled={sending}
              className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isGujarati ? "મોકલાઈ રહ્યું છે..." : "Sending..."}
                </>
              ) : (
                <>
                  <Send size={18} />
                  {isGujarati ? "પૂછપરછ મોકલો" : "Send Inquiry"}
                </>
              )}
            </button>
            
            {/* Status Message */}
            {statusMessage && (
              <div className={`mt-4 p-3 rounded-xl flex items-center gap-2 ${
                statusType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                statusType === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {statusType === 'success' && <CheckCircle size={18} />}
                {statusType === 'error' && <AlertCircle size={18} />}
                <span className="text-sm">{statusMessage}</span>
              </div>
            )}
          </motion.form>

          {/* Contact Info Card */}
          <motion.aside 
            className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl shadow-xl p-6 md:p-8 text-white h-fit"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} className="text-amber-200" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">{isGujarati ? "સીધી બુકિંગ" : "Direct Booking"}</h3>
              <p className="text-amber-100 text-sm mt-2">
                {isGujarati ? "24 કલાકમાં જવાબ" : "24 Hour Response"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition group">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-200 text-xs">{isGujarati ? "ફોન નંબર" : "Phone Number"}</p>
                  <a href={`tel:+91${content.mobile}`} className="font-semibold hover:underline break-all">
                    {content.mobile}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition group">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-200 text-xs">{isGujarati ? "ઇમેઇલ" : "Email"}</p>
                  <a href={`mailto:${content.email}`} className="font-semibold hover:underline break-all">
                    {content.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition group">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-200 text-xs">{isGujarati ? "સરનામું" : "Address"}</p>
                  <p className="font-semibold break-all">{content.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition group">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-200 text-xs">{isGujarati ? "કામ કરવાનો સમય" : "Business Hours"}</p>
                  <p className="font-semibold">{content.hours || "7 AM - 10 PM"}</p>
                </div>
              </div>
            </div>

            <a
              href={content.whatsapp || `https://wa.me/91${content.mobile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
            >
              <MessageCircle size={18} />
              {isGujarati ? "વોટ્સએપ પર સંપર્ક કરો" : "Contact on WhatsApp"}
            </a>

            <div className="mt-6 pt-6 border-t border-white/20 text-center">
              <p className="text-amber-200 text-xs">
                ✨ {isGujarati ? "500+ ખુશ ગ્રાહકો" : "500+ Happy Customers"} ✨
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
      
      <Snackbar 
        message={snackbar.message} 
        type={snackbar.type} 
        onClose={closeSnackbar} 
      />
    </section>
  )
}

export default ContactForm