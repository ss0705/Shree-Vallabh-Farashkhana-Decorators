// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Award, CalendarCheck, MapPin, Phone, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import useSiteData from "../hooks/useSiteData";

const badges = [
  { icon: Award, textEn: "10+ Years Experience", textGu: "10+ વર્ષનો અનુભવ" },
  { icon: CalendarCheck, textEn: "500+ Events", textGu: "500+ ઇવેન્ટ્સ" },
  { icon: MapPin, textEn: "Vadodara #1", textGu: "વડોદરા #1" },
];

const heroImg =
  "https://res.cloudinary.com/djovuw5dq/image/upload/v1779563675/Gemini_Generated_Image_atlancatlancatla_yr03mx.png";

function Hero() {
  const { t, i18n } = useTranslation();
  const { content } = useSiteData();
  const isGujarati = i18n.language === "gu";

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const elementPosition = section.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Gujarati Headline */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {content.hero.headlineGu || "શ્રી વલ્લભ ફરાસખાના એન્ડ ડેકોરેટર્સ"}
          </motion.h1>

          {/* English Headline */}
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {content.hero.headlineEn || " Vallabh Farashkhana & Decorators"}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {content.hero.subline ||
              "Vadodara's Most Trusted Wedding Decoration & Rental Service"}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
            >
              <span>{t("hero.quote") || "Get Free Quote"}</span>
              <Sparkles
                size={18}
                className="group-hover:rotate-12 transition-transform"
              />
            </button>

            <button
              onClick={() => scrollToSection("gallery")}
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              {t("hero.work") || "View Our Work"}
            </button>
          </motion.div>

          {/* Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {badges.map(({ icon: Icon, textEn, textGu }, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon size={16} className="text-amber-400 sm:w-5 sm:h-5" />
                <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap">
                  {isGujarati ? textGu : textEn}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Emergency Call */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href={`tel:+91${content.mobile}`}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <Phone size={14} />
              <span>Emergency: {content.mobile}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-white/50 text-xs hidden sm:block">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full mt-1"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
