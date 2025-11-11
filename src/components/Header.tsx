import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "/logo.png";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[999] w-full px-4 sm:px-6 py-3 sm:py-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Minimal header bar */}
        <motion.div
          className="relative backdrop-blur-[8px] bg-black/10 rounded-full border border-white/10 px-4 sm:px-6 py-3"
          animate={{
            boxShadow: isScrolled
              ? "0 2px 10px rgba(0, 0, 0, 0.3)"
              : "0 0 0 rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-24 h-9 sm:w-32 sm:h-12 transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                <ImageWithFallback
                  src={logo}
                  alt="Privia AI Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>

            {/* CTA Button */}
            <a
              href="mailto:support@priviaai.com"
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm bg-[#112C3F]/80 hover:bg-[#112C3F] text-white rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(17,44,63,0.4)] whitespace-nowrap"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
