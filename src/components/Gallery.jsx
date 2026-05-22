// src/components/Gallery.jsx - CSS Grid Version
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSiteData from '../hooks/useSiteData'

const categories = ['All', 'Mehendi', 'Haldi', 'Mandap', 'Gate Entry', 'Lighting']

function Gallery() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)
  const gu = i18n.language === 'gu'
  const { gallery } = useSiteData()
  const filtered = useMemo(() => (active === 'All' ? gallery : gallery.filter((item) => item.category === active)), [active, gallery])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-white to-amber-50" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-2">
            {t('sections.gallerySub') || 'Our Work'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            {t('sections.gallery') || 'Event Gallery'}
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {categories.map((category) => (
            <button
              className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                active === category 
                  ? 'bg-amber-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 hover:bg-amber-100 border border-gray-200'
              }`}
              key={category}
              type="button"
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* CSS Grid - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, index) => (
            <motion.button
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              key={item.id}
              type="button"
              onClick={() => setSelected(item)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <div className="aspect-square overflow-hidden rounded-xl">
                <img 
                  src={item.url} 
                  alt={gu ? item.alt_gu : item.alt_en} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm md:text-base line-clamp-2">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* No results message */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          role="dialog" 
          aria-modal="true" 
          onClick={() => setSelected(null)}
        >
          <button 
            className="absolute top-4 right-4 z-10 text-white hover:text-amber-400 transition-colors"
            type="button" 
            aria-label="Close gallery image"
            onClick={() => setSelected(null)}
          >
            <X size={32} />
          </button>
          
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <img 
              src={selected.url} 
              alt={gu ? selected.alt_gu : selected.alt_en}
              className="w-full h-full object-contain rounded-2xl"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
              <p className="text-white text-center font-medium">
                {selected.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery