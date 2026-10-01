import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Handle selected service from services card -> scroll to contact section
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-200 via-zinc-100 to-zinc-200 text-slate-800 flex flex-col font-sans select-none antialiased relative">
      
      {/* SVG Pattern Background (Mechanical Texture adapted for metallic grey theme) */}
      <div className="absolute inset-0 opacity-[0.025] text-zinc-900 pointer-events-none z-0 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="gear-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 10l5 10h10l5-10 10 5-5 10 10 5 5-10 10 10-10 5 5 10-10 5 5 10-10 10-5-10-10 5-5-10-10 5-5-10-10-5 5-10-10-5 5-10-10-10 10-5-5-10 10-5-5-10 10-10z" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#gear-pattern)" />
        </svg>
      </div>

      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-grow">
        <Hero
          onBookClick={() => handleSelectService('entretien_auto')}
          onExploreServicesClick={() => {
            const srvSection = document.getElementById('services');
            if (srvSection) {
              srvSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        />

        <ServicesSection onSelectService={handleSelectService} />

        <GallerySection />

        <TestimonialsSection onBookClick={() => handleSelectService('diagnostic_electronique')} />

        <ContactSection
          selectedServiceId={selectedServiceId}
          onClearSelectedService={() => setSelectedServiceId(null)}
        />
      </main>

      <Footer
        setActiveSection={setActiveSection}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
