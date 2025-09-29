"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const targetY = aboutSection.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const duration = 1500;
      const startTime = performance.now();

      const easeOutQuad = (t: number) => t * (2 - t);

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        window.scrollTo(0, startY + (targetY - startY) * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };
  
  const scrollToProject = () => {
    const aboutSection = document.getElementById("project");
    if (aboutSection) {
      const offset = 800;
      const targetY = aboutSection.getBoundingClientRect().top + window.scrollY - offset;
      const startY = window.scrollY;
      const duration = 1500;
      const startTime = performance.now();

      const easeOutQuad = (t: number) => t * (2 - t);

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        window.scrollTo(0, startY + (targetY - startY) * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); scrollToAbout(); } },
    { href: "#project", label: "Project", onClick: (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); scrollToProject(); } },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-3 left-[5%] z-50 w-[90%] md:w-[90%]"
    >
      {/* <div className="p-1 border rounded-full shadow-lg md:p-2 backdrop-blur-md bg-white/10 border-white/50"> */}
      <div className="p-1 md:p-2">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-white transition-all bg-clip-text bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-white"
          >
            <h1 className={montserrat.className}>AchmadGG</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 md:flex">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={link.onClick}
                  className="relative font-semibold text-gray-300 transition-colors duration-300 hover:text-white group"
                >
                  {link.label}
                  {/* Underline hover effect */}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Hamburger Button for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-3 border shadow-lg md:hidden bg-black/10 backdrop-blur-sm rounded-2xl border-white/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2 font-medium text-gray-300 transition-colors duration-300 rounded-lg hover:text-white"
                    onClick={(e) => {
                      if (link.onClick) link.onClick(e);
                      setIsMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;