import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 to 100)
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Show button after scrolling down 350px
      if (scrollTop > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center group"
        >
          {/* Tooltip on hover */}
          <span className="absolute bottom-full mb-2 hidden sm:group-hover:block px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900/90 backdrop-blur-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-all duration-200">
            Haut de page
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Retourner en haut de la page"
            className="relative w-12 h-12 rounded-full bg-slate-900/90 hover:bg-red-600 text-white backdrop-blur-md shadow-xl shadow-slate-950/25 border border-white/20 hover:border-red-400 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {/* SVG Circular Progress Ring */}
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5" 
              viewBox="0 0 48 48"
            >
              {/* Background circle track */}
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-white/10"
              />
              {/* Animated Progress circle */}
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={132}
                strokeDashoffset={132 - (132 * scrollProgress) / 100}
                strokeLinecap="round"
                className="text-red-500 group-hover:text-white transition-all duration-150"
              />
            </svg>

            {/* Icon with slight bounce on hover */}
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
