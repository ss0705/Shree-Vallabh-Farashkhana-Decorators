// src/components/Services.jsx - Simple Clean Version
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useTranslation } from 'react-i18next'
import services from '../data/services.json'

function Services() {
  const { t, i18n } = useTranslation()
  const gu = i18n.language === 'gu'

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-white" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-2">
            One Stop Farashkhana Service
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
            {t('sections.services') || 'Our Services'}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = Icons[service.icon] || Icons.Sparkles
            return (
              <motion.div
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={gu ? service.title_gu : service.title_en}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {gu ? service.title_gu : service.title_en}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {gu ? service.desc_gu : service.desc_en}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services