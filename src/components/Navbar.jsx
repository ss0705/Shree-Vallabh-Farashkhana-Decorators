// src/components/Navbar.jsx
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSiteData from "../hooks/useSiteData";

const navItems = [
  ["home", "/#home", "home"],
  ["services", "/#services", "services"],
  ["gallery", "/gallery", "gallery"],
  ["about", "/#about", "about"],
  ["contact", "/contact", "contact"],
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const { content } = useSiteData();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Close mobile navbar when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Detect active section for highlighting
      const sections = ["home", "services", "about"];
      let current = "home";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === "gu" ? "en" : "gu");
  };

  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const offset = 80;
          const elementPosition = section.offsetTop - offset;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
        setActiveSection(sectionId);
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = 80;
        const elementPosition = section.offsetTop - offset;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
        setActiveSection(sectionId);
      }
    }
    setOpen(false);
  };

  // Handle navigation click
  const handleNavigation = (key, href, sectionId) => {
    if (href.includes("#")) {
      scrollToSection(sectionId);
    } else {
      navigate(href);
      setOpen(false);
    }
  };

  // Check if link is active
  const isActive = (key, href, sectionId) => {
    if (href.includes("#")) {
      return location.pathname === "/" && activeSection === sectionId;
    } else {
      return location.pathname === href;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-[9999] w-full transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg border-b border-gray-100"
            : "bg-white shadow-md"
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          {/* LOGO */}
          <button
            onClick={() => {
              if (location.pathname !== "/") {
                navigate("/");
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setOpen(false);
            }}
            className="flex items-center gap-3 transition-all duration-300 hover:opacity-80"
            aria-label="Shree Vallabh Home"
          >
            {content.logoUrl && !logoError ? (
              <img
                src={content.logoUrl}
                alt={content.logoAlt || "Logo"}
                className="h-10 md:h-12 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md">
                  <span className="text-lg md:text-xl">✦</span>
                </div>
                <div className="hidden sm:block">
                  <h2 className="text-base md:text-lg font-bold text-gray-800">
                    Shree Vallabh
                  </h2>
                  <p className="text-[10px] md:text-xs text-gray-500">
                    Farashkhana & Decorators
                  </p>
                </div>
              </div>
            )}
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(([key, href, sectionId]) => (
              <button
                key={key}
                onClick={() => handleNavigation(key, href, sectionId)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(key, href, sectionId)
                    ? "bg-amber-50 text-amber-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                }`}
              >
                {t(`nav.${key}`)}
                {isActive(key, href, sectionId) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-amber-500"></span>
                )}
              </button>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* LANGUAGE BUTTON */}
            <button
              onClick={switchLanguage}
              className="hidden md:flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
            >
              <span>EN</span>
              <span className="text-amber-500">|</span>
              <span>ગુ</span>
            </button>

            {/* CALL BUTTON */}
            <a
              href={`tel:+91${content.mobile}`}
              className="hidden md:flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Phone size={16} />
              <span>{content.mobile}</span>
            </a>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:text-amber-600 lg:hidden"
              aria-label="Toggle Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU SLIDEOUT */}
      <div
        className={`fixed top-0 right-0 z-[9999] h-screen w-[85%] max-w-sm transform bg-white shadow-2xl transition-all duration-500 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-5">
          <div className="flex items-center gap-3">
            {content.logoUrl && !logoError ? (
              <img
                src={content.logoUrl}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white">
                ✦
              </div>
            )}
            <div>
              <h2 className="text-sm font-bold text-gray-800">
                Shree Vallabh
              </h2>
              <p className="text-[9px] text-gray-500">Menu</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 transition-all hover:bg-gray-100 hover:text-amber-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map(([key, href, sectionId]) => (
            <button
              key={key}
              onClick={() => handleNavigation(key, href, sectionId)}
              className={`rounded-lg px-4 py-3 text-left text-base font-medium transition-all duration-300 ${
                isActive(key, href, sectionId)
                  ? "bg-amber-50 text-amber-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
              }`}
            >
              {t(`nav.${key}`)}
            </button>
          ))}
        </nav>

        {/* Mobile Actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4">
          <button
            onClick={switchLanguage}
            className="mb-3 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-center font-semibold text-gray-700 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
          >
            🌐 English | ગુજરાતી
          </button>

          <a
            href={`tel:+91${content.mobile}`}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <Phone size={18} />
            <span>Call: {content.mobile}</span>
          </a>
        </div>
      </div>

      {/* BACKDROP OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[9998] bg-black/50 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
}

export default Navbar;