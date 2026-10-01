import React from 'react';
import { Calendar, Phone, MapPin, ShieldCheck, Award, ThumbsUp, Car } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from './Logo';

// @ts-ignore
import imgSuspensionBg from '../assets/images/mechanical_suspension_1784464145906.jpg';

interface HeroProps {
  onBookClick: () => void;
  onExploreServicesClick: () => void;
}

export default function Hero({ onBookClick, onExploreServicesClick }: HeroProps) {
  return (
    <section 
      className="relative bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 text-slate-900 overflow-hidden py-20 lg:py-28 animate-fade-in"
      id="accueil-hero"
    >
      {/* Absolute background image with the mechanical suspension photo - styled in light gray for a professional look */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={imgSuspensionBg} 
          alt="Suspension Mécanique H-AUTO" 
          className="w-full h-full object-cover object-center opacity-30 transition-all duration-300 filter grayscale contrast-125 brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Modern bright metallic gradient overlays for seamless integration and perfect readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 via-zinc-200/95 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-200 via-transparent to-zinc-200/30 z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text contents */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="shadow-xl rounded-[16px] overflow-hidden bg-white p-1.5 border border-slate-200"
              >
                <Logo size="lg" className="rounded-[11px]" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-sky-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight font-mono shadow-md"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span>Atelier de Confiance à Cormontreuil</span>
              </motion.div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 uppercase"
            >
              Garage <span className="text-sky-500 font-black">H-AUTO</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl"
            >
              Entretien & Réparation mécanique générale toutes marques. Diagnostic de précision, freinage, distribution, pneus et vidange au meilleur prix à Cormontreuil.
            </motion.p>

            {/* Quick action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <a
                href="tel:0749309940"
                className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-300 hover:to-sky-500 hover:-translate-y-1 hover:scale-[1.04] text-white font-black px-7 py-4 rounded-xl text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-sky-400/35 flex items-center justify-center space-x-2 active:scale-95 uppercase border-b-4 border-sky-300"
                id="hero-book-btn"
              >
                <Phone className="w-5 h-5 text-white animate-bounce" />
                <span>Appeler le garage</span>
              </a>
              <button
                onClick={onExploreServicesClick}
                className="bg-white hover:bg-slate-55 text-slate-800 font-bold px-6 py-4 rounded-xl text-base transition-all duration-300 border border-slate-300 shadow-sm hover:shadow-md hover:scale-[1.04] hover:-translate-y-1 hover:border-sky-400 hover:text-sky-500 flex items-center justify-center space-x-2 active:scale-95"
                id="hero-explore-btn"
              >
                <span>Nos prestations</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('occasions-pieces');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl text-base transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.04] hover:-translate-y-1 flex items-center justify-center space-x-2 active:scale-95"
                id="hero-occasions-btn"
              >
                <Car className="w-4 h-4 text-sky-400" />
                <span>Occasions & Pièces</span>
              </button>
            </motion.div>

            {/* Address & contact horizontal info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200 max-w-xl text-slate-700 text-sm"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white border border-slate-200 rounded-lg text-slate-700 shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Notre Adresse</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">5 rue des remouleurs, Cormontreuil</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white border border-slate-200 rounded-lg text-slate-700 shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Contact Direct</h4>
                  <a href="tel:0749309940" className="text-xs text-slate-600 hover:text-blue-600 font-bold leading-relaxed transition-colors">07 49 30 99 40</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side teaser box / key features cards */}
          <div className="lg:col-span-5 relative z-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md border border-slate-200 p-8 rounded-3xl shadow-xl relative"
            >
              {/* Corner abstract gear watermark */}
              <div className="absolute top-4 right-4 text-slate-200 opacity-60 select-none pointer-events-none">
                <svg className="w-24 h-24 rotate-45 animate-[spin_40s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-2.5 h-6 bg-gradient-to-b from-blue-600 to-red-600 rounded-full mr-3 animate-pulse"></span>
                <span>Pourquoi choisir H-AUTO ?</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50/80 rounded-xl text-blue-600 border border-blue-200/60 shadow-sm shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Savoir-faire Professionnel</h4>
                    <p className="text-sm text-slate-600 mt-1 font-medium">Interventions soignées conformes aux normes et fiches techniques des constructeurs.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-50/80 rounded-xl text-red-600 border border-red-200/60 shadow-sm shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Transparence & Garantie</h4>
                    <p className="text-sm text-slate-600 mt-1 font-medium">Aucun frais caché. Devis clair et détaillé avant chaque début de travaux sur votre auto.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50/80 rounded-xl text-emerald-600 border border-emerald-200/60 shadow-sm shrink-0">
                    <ThumbsUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Meilleur Rapport Qualité/Prix</h4>
                    <p className="text-sm text-slate-600 mt-1 font-medium">Pièces d'origine et main-d'œuvre transparente avec un tarif horaire à partir de 62,50 € HT.</p>
                  </div>
                </div>
              </div>

              {/* Small banner representing business hours */}
              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-650 font-medium">
                  <span className="font-bold text-slate-800">Rappel :</span> Nous sommes situés près de la brasserie artisanale à Cormontreuil.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
