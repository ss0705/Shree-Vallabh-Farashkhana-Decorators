import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const reasons = [
  'Original & Artificial Flower Experts',
  'All Items Available on Rent - One Stop Shop',
  'On-Time Setup - Guaranteed',
  'Affordable Pricing - No Hidden Charges',
  'Experienced Team - 10+ Years',
  'Available 24/7 for Queries',
  'Serving Vadodara & Surrounding Areas',
]

function WhyUs() {
  const { t } = useTranslation()

  return (
    <section className="section why-grid">
      <div>
        <p className="eyebrow">Trusted Local Decorator</p>
        <h2>{t('sections.why')}</h2>
        <div className="why-list">
          {reasons.map((reason, index) => (
            <motion.div
              className="why-item"
              key={reason}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <CheckCircle2 size={22} />
              <span>{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div className="comparison-panel" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div>
          <span>Fresh Flowers</span>
          <strong>Original</strong>
        </div>
        <div>
          <span>Reusable Decor</span>
          <strong>Artificial</strong>
        </div>
      </motion.div>
    </section>
  )
}

export default WhyUs
