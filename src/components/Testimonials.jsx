import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import testimonials from '../data/testimonials.json'

function Testimonials() {
  const { t, i18n } = useTranslation()
  const gu = i18n.language === 'gu'

  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">5 Star Reviews</p>
        <h2>{t('sections.testimonials')}</h2>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <motion.article
            className="testimonial-card"
            key={item.name}
            initial={{ opacity: 0, rotateX: 22, y: 28 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: 'spring' }}
          >
            <div className="stars" aria-label={`${item.rating} stars`}>
              {Array.from({ length: item.rating }).map((_, starIndex) => <Star key={starIndex} fill="currentColor" size={18} />)}
            </div>
            <p>{gu ? item.review_gu : item.review_en}</p>
            <strong>{item.name}</strong>
            <span>{item.event}</span>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
