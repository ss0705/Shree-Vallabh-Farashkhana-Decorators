// src/components/Testimonials.jsx — Premium Edition
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import testimonials from "../data/testimonials.json";

function Testimonials() {
  const { t, i18n } = useTranslation();
  const gu = i18n.language === "gu";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .testi-section {
          position: relative;
          padding: 96px 0;
          background: linear-gradient(160deg, #1a0a00 0%, #2d1200 50%, #1a0800 100%);
          overflow: hidden;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        /* ── Background decoration ── */
        .testi-bg-orb1 {
          position: absolute; top: -100px; left: -100px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .testi-bg-orb2 {
          position: absolute; bottom: -80px; right: -80px;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .testi-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            repeating-linear-gradient(0deg,  rgba(245,158,11,0.04) 0, rgba(245,158,11,0.04) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(245,158,11,0.04) 0, rgba(245,158,11,0.04) 1px, transparent 1px, transparent 60px);
        }
        /* large faint quote mark watermark */
        .testi-watermark {
          position: absolute; top: 40px; right: 60px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 280px; line-height: 1; color: rgba(245,158,11,0.04);
          pointer-events: none; user-select: none; font-weight: 700;
        }

        .testi-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Header ── */
        .testi-header { text-align: center; margin-bottom: 60px; }

        .testi-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: #f59e0b; margin-bottom: 14px;
        }
        .testi-eyebrow::before, .testi-eyebrow::after {
          content: ''; display: block;
          width: 32px; height: 1px; background: #f59e0b; opacity: 0.6;
        }

        /* Star row in header */
        .testi-header-stars {
          display: flex; align-items: center; justify-content: center;
          gap: 4px; margin-bottom: 14px;
        }
        .testi-header-stars svg { color: #f59e0b; }

        .testi-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.1rem, 5vw, 3.4rem);
          font-weight: 700; color: #fef3c7;
          line-height: 1.15; letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .testi-subtitle {
          font-size: 1rem; color: rgba(254,243,199,0.5);
          max-width: 460px; margin: 0 auto; line-height: 1.65;
        }

        /* ── Grid ── */
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── Card ── */
        .testi-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(245,158,11,0.15);
          border-radius: 20px;
          padding: 28px 24px 24px;
          display: flex; flex-direction: column; gap: 14px;
          backdrop-filter: blur(8px);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease;
          overflow: hidden;
        }
        .testi-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(135deg, rgba(245,158,11,0.06) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.28s ease;
          pointer-events: none;
        }
        .testi-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.3);
          border-color: rgba(245,158,11,0.35);
          background: rgba(255,255,255,0.07);
        }
        .testi-card:hover::before { opacity: 1; }

        /* Featured (first) card — slightly larger */
        .testi-card.featured {
          background: rgba(245,158,11,0.08);
          border-color: rgba(245,158,11,0.3);
        }

        /* Quote icon top-right */
        .testi-quote-icon {
          position: absolute; top: 20px; right: 20px;
          color: rgba(245,158,11,0.2);
        }

        /* Stars */
        .testi-stars {
          display: flex; gap: 3px; flex-shrink: 0;
        }
        .testi-stars svg { color: #f59e0b; flex-shrink: 0; }

        /* Review text */
        .testi-review {
          font-size: 14px; color: rgba(254,243,199,0.75);
          line-height: 1.7; flex: 1;
          font-style: italic;
        }

        /* Divider */
        .testi-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(245,158,11,0.3) 0%, transparent 80%);
        }

        /* Author row */
        .testi-author { display: flex; align-items: center; gap: 12px; }
        .testi-avatar {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #f59e0b, #b45309);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: #fff;
          border: 2px solid rgba(245,158,11,0.35);
        }
        .testi-author-info {}
        .testi-author-name {
          font-size: 14px; font-weight: 700; color: #fde68a;
          line-height: 1.25;
        }
        .testi-author-event {
          font-size: 11.5px; color: rgba(245,158,11,0.6);
          font-weight: 500; margin-top: 2px;
        }

        /* ── Bottom trust row ── */
        .testi-trust {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-top: 48px;
          font-size: 13px; color: rgba(254,243,199,0.45); font-weight: 500;
        }
        .testi-trust-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(245,158,11,0.4);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .testi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .testi-section { padding: 64px 0; }
          .testi-header  { margin-bottom: 36px; }
          .testi-grid    { grid-template-columns: 1fr; gap: 14px; }
          .testi-card    { padding: 22px 18px 20px; }
          .testi-watermark { display: none; }
          .testi-trust   { flex-wrap: wrap; justify-content: center; gap: 6px; }
        }
      `}</style>

      <section className="testi-section">
        <div className="testi-bg-orb1" />
        <div className="testi-bg-orb2" />
        <div className="testi-bg-grid" />
        <div className="testi-watermark">"</div>

        <div className="testi-container">
          {/* ── Header ── */}
          <motion.div
            className="testi-header"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="testi-eyebrow">5-Star Reviews</div>

            <div className="testi-header-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>

            <h2 className="testi-title">
              {t("sections.testimonials") || "What Our Clients Say"}
            </h2>
            <p className="testi-subtitle">
              Real words from real families who trusted us with their most
              cherished moments.
            </p>
          </motion.div>

          {/* ── Cards grid ── */}
          <div className="testi-grid">
            {testimonials.map((item, index) => (
              <motion.article
                className={`testi-card${index === 0 ? " featured" : ""}`}
                key={item.name}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: Math.min(index * 0.08, 0.4),
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Decorative quote icon */}
                <Quote className="testi-quote-icon" size={28} />

                {/* Stars */}
                <div
                  className="testi-stars"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: item.rating }).map((_, si) => (
                    <Star key={si} size={15} fill="currentColor" />
                  ))}
                  {Array.from({ length: 5 - item.rating }).map((_, si) => (
                    <Star
                      key={`e-${si}`}
                      size={15}
                      style={{ color: "rgba(245,158,11,0.25)" }}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="testi-review">
                  "{gu ? item.review_gu : item.review_en}"
                </p>

                {/* Divider */}
                <div className="testi-divider" />

                {/* Author */}
                <div className="testi-author">
                  <div className="testi-avatar">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="testi-author-info">
                    <div className="testi-author-name">{item.name}</div>
                    <div className="testi-author-event">{item.event}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ── Bottom trust note ── */}
          <motion.div
            className="testi-trust"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span>Verified reviews from our customers</span>
            <span className="testi-trust-dot" />
            <span>No paid promotions</span>
            <span className="testi-trust-dot" />
            <span>100% genuine feedback</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
