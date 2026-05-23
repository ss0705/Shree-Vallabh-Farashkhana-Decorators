// src/components/About.jsx
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Award,
  Calendar,
  Users,
  Headphones,
  Map,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useSiteData from "../hooks/useSiteData";

const parseStat = (value) => {
  const match = String(value).match(/^([\d,]+)(.*)$/);
  if (!match)
    return { target: 0, suffix: "", finalText: String(value), canCount: false };

  return {
    target: Number(match[1].replaceAll(",", "")),
    suffix: match[2],
    finalText: String(value),
    canCount: true,
  };
};

function CountUpStat({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const { target, suffix, finalText, canCount } = useMemo(
    () => parseStat(value),
    [value],
  );
  const [count, setCount] = useState(() =>
    shouldReduceMotion || !canCount ? target : 0,
  );

  useEffect(() => {
    if (!inView) return undefined;

    if (shouldReduceMotion || !canCount || !target) {
      return undefined;
    }

    let frameId;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [canCount, inView, shouldReduceMotion, target]);

  const formattedCount = new Intl.NumberFormat("en-IN").format(count);
  const displayValue =
    !canCount || count >= target ? finalText : `${formattedCount}${suffix}`;

  return (
    <strong ref={ref} aria-hidden="true">
      {displayValue}
    </strong>
  );
}

function About() {
  const { t, i18n } = useTranslation();
  const isGujarati = i18n.language === "gu";
  const { content } = useSiteData();

  // Your image URL
  const ownerImageUrl =
    "https://res.cloudinary.com/djovuw5dq/image/upload/v1779563896/Gemini_Generated_Image_aa6ru4aa6ru4aa6r_g4ncvr.png";

  // Get icon for each stat based on label
  const getStatIcon = (label, index) => {
    const labelLower = (label || "").toLowerCase();
    if (labelLower.includes("event") || labelLower.includes("decorated"))
      return Calendar;
    if (labelLower.includes("year") || labelLower.includes("experience"))
      return Award;
    if (labelLower.includes("support")) return Headphones;
    if (labelLower.includes("service") || labelLower.includes("vadodara"))
      return Map;
    return Users;
  };

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-white to-amber-50 overflow-hidden"
      id="about"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-2">
            Owner: {content.ownerName}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            {t("sections.about") || "About Us"}
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-16">
          {/* Left Column - About Text with Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Owner Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={ownerImageUrl}
                alt={content.ownerName}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold">
                  {content.ownerName}
                </h3>
                <p className="text-amber-300 text-sm">
                  Founder & Lead Decorator
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {isGujarati ? content.about?.gu : content.about?.en}
            </p>

            {/* Owner Contact Strip */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-amber-100 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Phone size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mobile Number</p>
                  <a
                    href={`tel:+91${content.mobile}`}
                    className="font-semibold hover:text-amber-600 transition"
                  >
                    {content.mobile}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <MapPin size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold">{content.address}</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Sparkles size={18} />
              Get Free Consultation
            </a>
          </motion.div>

          {/* Right Column - Stats Grid with 3D Flip Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 content-start">
            {content.stats?.map((stat, index) => {
              const Icon = getStatIcon(stat.labelEn || stat.label, index);
              const labelText = isGujarati
                ? stat.labelGu || stat.label
                : stat.labelEn || stat.label;

              return (
                <motion.article
                  className="group relative"
                  key={stat.label}
                  role="group"
                  aria-label={`${stat.value} ${labelText}`}
                  initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                  whileHover={{
                    rotateY: 10,
                    rotateX: 5,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-2xl transition-all duration-300 border border-amber-100 h-full">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon size={22} className="text-amber-600" />
                    </div>

                    {/* Value with Counter */}
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-700 mb-1">
                      <CountUpStat value={stat.value} />
                    </div>

                    {/* Label - This shows the name clearly */}
                    <div className="text-xs md:text-sm text-gray-600 font-medium">
                      {labelText}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <p className="text-amber-800 font-medium text-sm md:text-base">
              ✨ Trusted by over 500+ families in Vadodara for memorable wedding
              decorations ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
