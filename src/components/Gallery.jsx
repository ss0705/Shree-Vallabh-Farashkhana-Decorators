// src/components/Gallery.jsx - Premium Edition v2 (Fixed Layout)
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { useMemo, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import useSiteData from '../hooks/useSiteData'

const categories = ['All', 'Mehendi', 'Haldi', 'Mandap', 'Gate Entry', 'Lighting']

const categoryIcons = {
  All: '✦',
  Mehendi: '🌿',
  Haldi: '🌼',
  Mandap: '🏛️',
  'Gate Entry': '🚪',
  Lighting: '✨',
}

/**
 * Premium 3-column desktop layout pattern (repeats every 8 cards):
 *
 *  [  BIG 2x2  ] [ tall ]  ← row 0,1: index 0 = col-span-2 row-span-2, index 1,2 = normal
 *  [  BIG 2x2  ] [ tall ]
 *  [ n ] [ n ] [ n ]       ← row 2: index 3,4,5 = normal
 *  [ wide 2x1 ] [ n ]      ← row 3: index 6 = col-span-2, index 7 = normal
 *
 * This creates a tight, gap-free premium grid on desktop.
 */
function getDesktopSpan(index) {
  const p = index % 8
  if (p === 0) return 'xl:col-span-2 xl:row-span-2'
  if (p === 6) return 'xl:col-span-2'
  return ''
}

function Gallery() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredId, setHoveredId] = useState(null)
  const gu = i18n.language === 'gu'
  const { gallery } = useSiteData()

  const filtered = useMemo(
    () => (active === 'All' ? gallery : gallery.filter((item) => item.category === active)),
    [active, gallery]
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (!selected) return
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowRight') {
        const next = (selectedIndex + 1) % filtered.length
        setSelectedIndex(next)
        setSelected(filtered[next])
      }
      if (e.key === 'ArrowLeft') {
        const prev = (selectedIndex - 1 + filtered.length) % filtered.length
        setSelectedIndex(prev)
        setSelected(filtered[prev])
      }
    },
    [selected, selectedIndex, filtered]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  const openLightbox = (item, index) => {
    setSelected(item)
    setSelectedIndex(index)
  }

  const goPrev = (e) => {
    e.stopPropagation()
    const prev = (selectedIndex - 1 + filtered.length) % filtered.length
    setSelectedIndex(prev)
    setSelected(filtered[prev])
  }

  const goNext = (e) => {
    e.stopPropagation()
    const next = (selectedIndex + 1) % filtered.length
    setSelectedIndex(next)
    setSelected(filtered[next])
  }

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      id="gallery"
      style={{ background: 'linear-gradient(135deg, #fffbf0 0%, #fff9f0 40%, #fdf6e8 100%)' }}
    >
      {/* ── Decorative BG ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.15]"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 65%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #d97706 0%, transparent 65%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#92400e 0,#92400e 1px,transparent 1px,transparent 64px),repeating-linear-gradient(90deg,#92400e 0,#92400e 1px,transparent 1px,transparent 64px)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-10 bg-amber-400 block" />
            <p className="text-amber-600 font-semibold text-xs uppercase tracking-[0.22em]">
              {t('sections.gallerySub') || 'Our Work'}
            </p>
            <span className="h-px w-10 bg-amber-400 block" />
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-amber-950 mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.02em' }}
          >
            {t('sections.gallery') || 'Event Gallery'}
          </h2>

          <p className="text-amber-700/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Every frame tells a story — explore the moments we've crafted with love &amp; artistry.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400 block" />
            <span className="text-amber-400 text-xl">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400 block" />
          </div>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-semibold
                transition-colors duration-200 flex items-center gap-1.5 select-none
                ${active === category
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-white/80 text-amber-900 hover:bg-amber-50 border border-amber-200/60 backdrop-blur-sm'
                }
              `}
            >
              <span className="text-sm leading-none">{categoryIcons[category]}</span>
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════
             GALLERY GRID
             Mobile  : 2 cols, fixed aspect-[4/3]
             Tablet  : 3 cols, fixed aspect-[4/3]
             Desktop : 3 cols with xl:4 col-span tricks, fixed row heights
        ══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="
              grid gap-3 md:gap-4
              grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              xl:auto-rows-[240px]
            "
          >
            {filtered.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => openLightbox(item, index)}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`
                  relative group cursor-pointer overflow-hidden rounded-2xl
                  shadow-sm hover:shadow-xl hover:shadow-amber-900/15
                  transition-shadow duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                  /* Mobile/tablet: fixed aspect ratio so every card is equal height */
                  aspect-[4/3]
                  /* Desktop: override aspect-ratio, let grid rows control height */
                  xl:aspect-auto xl:h-auto
                  ${getDesktopSpan(index)}
                `}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.045, 0.35),
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.015 }}
              >
                {/* Image — always fills the box perfectly */}
                <img
                  src={item.url}
                  alt={gu ? item.alt_gu : item.alt_en}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Base gradient — always visible for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-amber-900/25 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Zoom icon — center on hover */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: hoveredId === item.id ? 1 : 0,
                    scale: hoveredId === item.id ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg">
                    <ZoomIn className="text-white" size={18} />
                  </div>
                </motion.div>

                {/* Category pill — top left */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/90 text-white backdrop-blur-sm shadow">
                    {item.category}
                  </span>
                </div>

                {/* Title — bottom */}
                <div className="absolute bottom-0 inset-x-0 px-3 py-2.5 z-10">
                  <p className="text-white font-semibold text-xs md:text-sm line-clamp-1 drop-shadow-md text-left">
                    {item.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No results */}
        {filtered.length === 0 && (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="text-5xl mb-4 block">🌸</span>
            <p className="text-amber-800/60 text-lg font-medium">No images in this category yet.</p>
          </motion.div>
        )}

        {/* Count badge */}
        {filtered.length > 0 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {filtered.length} beautiful moment{filtered.length !== 1 ? 's' : ''}
            </span>
          </motion.div>
        )}
      </div>

      {/* ══════════════════════════════════════════
           LIGHTBOX
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

            {/* ── Top bar ── */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
              {/* Category + title */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex-shrink-0 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-white">
                  {selected.category}
                </span>
                <span className="text-white/80 text-sm font-medium truncate hidden sm:block">
                  {selected.title}
                </span>
              </div>
              {/* Counter + close */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-white/50 text-sm tabular-nums">
                  {selectedIndex + 1} / {filtered.length}
                </span>
                <button
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors"
                  type="button"
                  aria-label="Close"
                  onClick={(e) => { e.stopPropagation(); setSelected(null) }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Prev / Next ── */}
            <motion.button
              className="absolute left-3 md:left-5 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-amber-500 border border-white/20 flex items-center justify-center text-white transition-colors duration-200"
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              className="absolute right-3 md:right-5 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-amber-500 border border-white/20 flex items-center justify-center text-white transition-colors duration-200"
              type="button"
              aria-label="Next image"
              onClick={goNext}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
            >
              <ChevronRight size={20} />
            </motion.button>

            {/* ── Main image ── */}
            <motion.div
              className="relative z-10 w-full h-full flex flex-col items-center justify-center px-14 md:px-20 py-16"
              onClick={(e) => e.stopPropagation()}
              key={selected.id}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image — centered, max size, never cropped */}
              <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
                <img
                  src={selected.url}
                  alt={gu ? selected.alt_gu : selected.alt_en}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                  style={{ maxHeight: 'calc(100vh - 180px)' }}
                />
              </div>

              {/* ── Thumbnail strip ── */}
              {filtered.length > 1 && (
                <div className="flex-shrink-0 flex items-center gap-2 mt-4 overflow-x-auto pb-1 max-w-full px-2"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {filtered.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelected(item)
                        setSelectedIndex(i)
                      }}
                      className={`
                        flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200
                        w-12 h-12 md:w-14 md:h-14
                        ${i === selectedIndex
                          ? 'border-amber-400 scale-110 shadow-md shadow-amber-500/40 opacity-100'
                          : 'border-white/15 opacity-45 hover:opacity-80 hover:border-white/40'
                        }
                      `}
                    >
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Keyboard hints */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-4">
              {[['←', '→', 'Navigate'], ['Esc', '', 'Close']].map(([k1, k2, label]) => (
                <span key={label} className="text-white/30 text-xs flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-xs font-mono">{k1}</kbd>
                  {k2 && <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-xs font-mono">{k2}</kbd>}
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery