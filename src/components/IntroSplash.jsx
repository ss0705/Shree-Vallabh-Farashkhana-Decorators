// src/components/IntroSplash.jsx
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useSiteData from '../hooks/useSiteData'

function IntroSplash() {
  const [visible, setVisible] = useState(true)
  const { content } = useSiteData()
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 3000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          aria-label="Welcome to Vallabh Farashkhana and Decorators"
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-4">
            {/* Logo Section - ENLARGED */}
            <motion.div
              className="mb-8 md:mb-10 flex items-center justify-center"
              initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.75, type: 'spring', stiffness: 140 }}
            >
              {content.logoUrl && !logoError ? (
                <img 
                  src={content.logoUrl}
                  alt={content.logoAlt || " Vallabh Logo"}
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                  style={{ animation: 'float 3s ease-in-out infinite' }}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span 
                  className="text-8xl md:text-9xl lg:text-[8rem] text-amber-600 inline-block"
                  style={{ animation: 'float 3s ease-in-out infinite' }}
                  aria-hidden="true"
                >
                  {'\u2726'}
                </span>
              )}
            </motion.div>

            {/* Business Name */}
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 mb-3 md:mb-4 max-w-[90%] mx-auto leading-tight"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6, ease: 'easeOut' }}
            >
              {content.businessNameGu || content.businessName}
            </motion.h1>

            {/* Owner Info */}
            <motion.p
              className="text-sm md:text-base text-amber-700/80 mb-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.55, ease: 'easeOut' }}
            >
              {content.ownerName || 'Ankit Shah'} {'\u2022'} +91 {content.mobile || '8905346254'}
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="text-xs md:text-sm text-amber-600 font-medium tracking-wide uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62, duration: 0.55, ease: 'easeOut' }}
            >
              {content.hero?.subline || "Vadodara's Most Trusted Wedding Decoration & Rental Service"}
            </motion.p>

            {/* Loading Dots */}
            <motion.div 
              className="flex gap-2 justify-center mt-8 md:mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
              <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-r-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroSplash