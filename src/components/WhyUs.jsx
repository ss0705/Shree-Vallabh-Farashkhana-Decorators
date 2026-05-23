// src/components/WhyUs.jsx — Premium Edition
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Flower2,
  Recycle,
  Clock,
  MapPin,
  Phone,
  Star,
  Shield,
  IndianRupee,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const reasons = [
  {
    icon: Flower2,
    text: "Original & Artificial Flower Experts",
    desc: "We handle both fresh and long-lasting artificial arrangements",
  },
  {
    icon: Recycle,
    text: "All Items Available on Rent",
    desc: "One-stop shop — chairs, mandap, lighting & more",
  },
  {
    icon: Clock,
    text: "On-Time Setup — Guaranteed",
    desc: "We arrive early so your event starts perfectly",
  },
  {
    icon: IndianRupee,
    text: "Affordable Pricing — No Hidden Charges",
    desc: "Transparent quotes with zero surprises",
  },
  {
    icon: Star,
    text: "Experienced Team — 10+ Years",
    desc: "Hundreds of events decorated with pride",
  },
  {
    icon: Phone,
    text: "Available 24/7 for Queries",
    desc: "Always reachable — call or WhatsApp anytime",
  },
  {
    icon: MapPin,
    text: "Serving Vadodara & Surrounding Areas",
    desc: "Local expertise, trusted across the region",
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Events Decorated" },
  { value: "24/7", label: "Support Available" },
  { value: "100%", label: "Client Satisfaction" },
];

const comparisons = [
  {
    type: "Original Flowers",
    emoji: "🌸",
    color: "#e84393",
    bg: "rgba(232,67,147,0.08)",
    border: "rgba(232,67,147,0.2)",
    points: [
      "Natural fragrance",
      "Fresh vibrant look",
      "Best for ceremonies",
      "Sourced daily fresh",
    ],
  },
  {
    type: "Artificial Flowers",
    emoji: "🌺",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    points: [
      "Long lasting",
      "Reusable & eco-friendly",
      "Cost effective",
      "No wilting ever",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function WhyUs() {
  const { t } = useTranslation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        .why-section {
          position: relative;
          padding: 96px 0;
          background: linear-gradient(160deg, #fdf8f0 0%, #fffaf3 50%, #fdf3e7 100%);
          overflow: hidden;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        /* ── Decorative background ── */
        .why-bg-orb-1 {
          position: absolute; top: -80px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 68%);
          pointer-events: none;
        }
        .why-bg-orb-2 {
          position: absolute; bottom: -60px; left: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 68%);
          pointer-events: none;
        }
        .why-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            repeating-linear-gradient(0deg,   rgba(146,64,14,0.025) 0, rgba(146,64,14,0.025) 1px, transparent 1px, transparent 56px),
            repeating-linear-gradient(90deg,  rgba(146,64,14,0.025) 0, rgba(146,64,14,0.025) 1px, transparent 1px, transparent 56px);
        }

        .why-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Header ── */
        .why-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .why-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #b45309;
          margin-bottom: 14px;
        }
        .why-eyebrow::before,
        .why-eyebrow::after {
          content: ''; display: block;
          width: 32px; height: 1px; background: #d97706;
        }
        .why-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 700; color: #431407;
          line-height: 1.15; margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .why-subtitle {
          font-size: 1rem; color: #92400e; opacity: 0.7;
          max-width: 480px; margin: 0 auto; line-height: 1.65;
        }

        /* ── Stats row ── */
        .why-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 64px;
        }
        .why-stat-card {
          background: #fff;
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 16px;
          padding: 20px 16px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(180,83,9,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .why-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(180,83,9,0.12);
        }
        .why-stat-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem; font-weight: 700; color: #b45309;
          line-height: 1;
        }
        .why-stat-label {
          font-size: 11.5px; color: #78350f; opacity: 0.7;
          margin-top: 4px; font-weight: 500; letter-spacing: 0.03em;
        }

        /* ── Main grid ── */
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* ── Reason list ── */
        .why-list-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #b45309; margin-bottom: 20px;
        }
        .why-list {
          display: flex; flex-direction: column; gap: 10px;
        }
        .why-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 16px;
          background: #fff;
          border: 1px solid rgba(245,158,11,0.15);
          border-radius: 14px;
          box-shadow: 0 1px 6px rgba(180,83,9,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          cursor: default;
        }
        .why-item:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 18px rgba(180,83,9,0.1);
          border-color: rgba(245,158,11,0.35);
        }
        .why-item-icon {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          display: flex; align-items: center; justify-content: center;
          color: #b45309;
        }
        .why-item-body {}
        .why-item-title {
          font-size: 14px; font-weight: 600; color: #431407;
          line-height: 1.3; margin-bottom: 2px;
        }
        .why-item-desc {
          font-size: 12px; color: #92400e; opacity: 0.65; line-height: 1.45;
        }

        /* ── Right panel ── */
        .why-right { display: flex; flex-direction: column; gap: 20px; }

        /* Comparison cards */
        .why-compare-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #b45309; margin-bottom: 4px;
        }
        .why-compare-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .why-compare-card {
          border-radius: 18px; padding: 20px 18px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .why-compare-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .why-compare-emoji { font-size: 2rem; margin-bottom: 10px; display: block; }
        .why-compare-type {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem; font-weight: 700; margin-bottom: 12px;
          line-height: 1.2;
        }
        .why-compare-point {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; color: #431407; margin-bottom: 7px;
          font-weight: 500;
        }
        .why-compare-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        /* Trust badge */
        .why-trust {
          background: linear-gradient(135deg, #431407, #7c2d12);
          border-radius: 18px; padding: 22px 24px;
          display: flex; align-items: center; gap: 16px;
          box-shadow: 0 8px 32px rgba(67,20,7,0.25);
        }
        .why-trust-icon {
          width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
          background: rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
        }
        .why-trust-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; color: #fde68a;
          margin-bottom: 4px;
        }
        .why-trust-sub { font-size: 12.5px; color: rgba(255,255,255,0.65); line-height: 1.5; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .why-stats { grid-template-columns: repeat(2, 1fr); }
          .why-grid  { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 520px) {
          .why-section { padding: 64px 0; }
          .why-header   { margin-bottom: 40px; }
          .why-stats    { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 40px; }
          .why-stat-card { padding: 16px 12px; }
          .why-stat-value { font-size: 1.6rem; }
          .why-compare-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .why-compare-card { padding: 16px 14px; }
          .why-item { padding: 12px 14px; gap: 11px; }
          .why-item-icon { width: 34px; height: 34px; border-radius: 9px; }
          .why-item-title { font-size: 13px; }
          .why-trust { flex-direction: column; text-align: center; padding: 20px 18px; }
        }
      `}</style>

      <section className="why-section">
        <div className="why-bg-orb-1" />
        <div className="why-bg-orb-2" />
        <div className="why-bg-grid" />

        <div className="why-container">
          {/* ── Header ── */}
          <motion.div
            className="why-header"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="why-eyebrow">Trusted Local Decorator</div>
            <h2 className="why-title">
              {t("sections.why") || "Why Choose Us?"}
            </h2>
            <p className="why-subtitle">
              We bring your dream events to life — with quality, care, and
              craftsmanship built over a decade.
            </p>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            className="why-stats"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                className="why-stat-card"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <div className="why-stat-value">{s.value}</div>
                <div className="why-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Main two-column grid ── */}
          <div className="why-grid">
            {/* LEFT — reason list */}
            <div>
              <div className="why-list-label">What sets us apart</div>
              <motion.div
                className="why-list"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {reasons.map(({ icon: Icon, text, desc }) => (
                  <motion.div
                    className="why-item"
                    key={text}
                    variants={itemVariants}
                  >
                    <div className="why-item-icon">
                      <Icon size={17} />
                    </div>
                    <div className="why-item-body">
                      <div className="why-item-title">{text}</div>
                      <div className="why-item-desc">{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — comparison + trust badge */}
            <motion.div
              className="why-right"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            >
              <div className="why-compare-label">Our flower expertise</div>
              <div className="why-compare-grid">
                {comparisons.map((c) => (
                  <div
                    key={c.type}
                    className="why-compare-card"
                    style={{
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    <span className="why-compare-emoji">{c.emoji}</span>
                    <div
                      className="why-compare-type"
                      style={{ color: c.color }}
                    >
                      {c.type}
                    </div>
                    {c.points.map((p) => (
                      <div className="why-compare-point" key={p}>
                        <span
                          className="why-compare-dot"
                          style={{ background: c.color }}
                        />
                        {p}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Trust badge */}
              <motion.div
                className="why-trust"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="why-trust-icon">
                  <Shield size={26} color="#fde68a" />
                </div>
                <div>
                  <div className="why-trust-title">Our Promise to You</div>
                  <div className="why-trust-sub">
                    No compromise on quality. On-time delivery. 100%
                    satisfaction — or we make it right.
                  </div>
                </div>
              </motion.div>

              {/* Decorative quote */}
              <motion.div
                style={{
                  borderLeft: "3px solid #f59e0b",
                  paddingLeft: "16px",
                  marginTop: "4px",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.05rem",
                    color: "#78350f",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  "Every event is unique. We treat it that way — with full
                  dedication from planning to final setup."
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#b45309",
                    marginTop: "6px",
                    fontWeight: 600,
                  }}
                >
                  — Vallabh Farashkhana &amp; Decorators
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyUs;
