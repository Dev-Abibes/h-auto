import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Menu, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({
  activeSection,
  setActiveSection
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Nos Services' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'avis', label: 'Avis Clients' },
    { id: 'contact', label: 'Contact & Horaires' }
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top bar with quick contacts - Styled for elegant Light Theme */}
      <div className="bg-slate-100 text-slate-600 text-xs py-2.5 px-4 border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span>5 rue des remouleurs, 51350 Cormontreuil</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>Lun-Sam: 09h00-18h00 | Dim & Jours Fériés: Fermé</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:0749309940" className="flex items-center space-x-1.5 hover:text-zinc-900 text-slate-700 transition-colors font-semibold">
              <Phone className="w-3.5 h-3.5 text-zinc-500" />
              <span>07 49 30 99 40</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar - Styled for Light Theme */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3' 
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-4'
        }`}
        id="main-header"
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Brand Logo - Official red badge with H-AUTO branding */}
          <div 
            onClick={() => handleNavClick('accueil')}
            className="flex items-center cursor-pointer"
            id="brand-logo"
          >
            <Logo size="sm" showText={true} textColor="text-slate-900" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                  activeSection === item.id
                    ? 'text-sky-500 bg-sky-50/80 border border-sky-200/60 shadow-sm'
                    : 'text-slate-650 hover:text-sky-500 hover:bg-slate-50'
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <a
              href="tel:0749309940"
              className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-300 hover:to-sky-500 hover:-translate-y-0.5 hover:scale-[1.04] text-white font-extrabold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/30 active:scale-95 ml-2 inline-flex items-center space-x-1.5 border-b-2 border-sky-300"
              id="cta-booking-header"
            >
              <Phone className="w-4 h-4 text-white animate-bounce" />
              <span>07 49 30 99 40</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <a 
              href="tel:0749309940" 
              className="p-2.5 bg-sky-500 hover:bg-sky-400 border border-sky-400 rounded-lg text-white transition-colors shadow-sm"
              title="Appeler le garage"
            >
              <Phone className="w-5 h-5 text-white" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-slate-200 fixed top-[72px] left-0 w-full z-30 shadow-2xl overflow-hidden"
            id="mobile-nav-panel"
          >
            <div className="px-4 py-5 space-y-3 text-left">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors block ${
                    activeSection === item.id
                      ? 'text-zinc-900 bg-zinc-100 font-bold border border-zinc-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-slate-100 pt-3 flex flex-col space-y-3">
                <a
                  href="tel:0749309940"
                  className="w-full bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-white font-bold py-3.5 rounded-lg text-center text-sm transition-colors shadow-md block flex items-center justify-center space-x-2"
                  id="mobile-cta-booking"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Appeler le 07 49 30 99 40</span>
                </a>
                <div className="flex justify-center items-center px-4 pt-2 text-[11px] text-slate-500">
                  <span>5 rue des remouleurs, Cormontreuil</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
