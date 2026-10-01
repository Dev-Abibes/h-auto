import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ExternalLink, CalendarDays, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OPENING_HOURS } from '../data';
import Logo from './Logo';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

export default function Footer({ setActiveSection }: FooterProps) {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  
  const handleNavClick = (id: string) => {
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
    <footer className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white relative border-t border-red-800" id="footer">
      
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-1/4 h-full opacity-[0.015] bg-contain bg-right bg-no-repeat pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600')" }}></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand presentation */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex flex-col space-y-1">
              <Logo size="md" showText={true} textColor="text-white" />
              <span className="text-[11px] font-bold text-red-200/90 uppercase tracking-wider pl-1.5 mt-1 block">Par Services Auto Horizon</span>
            </div>
            
            <p className="text-xs text-white/85 leading-relaxed">
              Atelier d’entretien et réparation mécanique générale toutes marques à Cormontreuil. Profitez d’un service professionnel, rapide et de pièces de haute qualité pour votre voiture au juste prix.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="text-white/95">5 rue des remouleurs, 51350 Cormontreuil</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <a href="tel:0749309940" className="text-white hover:text-red-200 transition-colors font-extrabold">07 49 30 99 40</a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <a href="mailto:contact@h-auto.fr" className="text-white hover:text-red-200 transition-colors font-semibold">contact@h-auto.fr</a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono border-b border-white/20 pb-2">Plan du site</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => handleNavClick('accueil')} className="hover:text-white hover:translate-x-1 transition-all text-white/80 text-left block">Accueil</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-white hover:translate-x-1 transition-all text-white/80 text-left block">Prestations</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('galerie')} className="hover:text-white hover:translate-x-1 transition-all text-white/80 text-left block">Galerie Photos</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('avis')} className="hover:text-white hover:translate-x-1 transition-all text-white/80 text-left block">Avis Clients</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-white hover:translate-x-1 transition-all text-white/80 text-left block">Nous Contacter</button>
              </li>
              <li className="pt-1">
                <a 
                  href="tel:0749309940" 
                  className="inline-flex items-center space-x-1.5 bg-sky-500 hover:bg-sky-400 text-white font-extrabold px-3 py-1.5 rounded-lg shadow-sm transition-all hover:scale-105 active:scale-95 text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>Appeler l’Atelier</span>
                </a>
              </li>
              <li className="pt-1">
                <button onClick={() => setIsPolicyOpen(true)} className="hover:text-white hover:translate-x-1 transition-all text-white/85 text-left font-bold block">Protection des Données</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours of Operation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono border-b border-white/20 pb-2">Horaires d’Ouverture</h4>
            <div className="space-y-2 text-xs">
              {OPENING_HOURS.map((oh) => (
                <div key={oh.day} className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-white/80 font-medium">{oh.day}</span>
                  <span className={`font-mono text-[11px] ${oh.isClosed ? 'text-zinc-300 font-extrabold uppercase opacity-85' : 'text-white font-semibold'}`}>{oh.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Maps Embed card */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono border-b border-white/20 pb-2">Notre Localisation</h4>
            <div className="bg-white border border-red-700/30 p-2 rounded-2xl aspect-16/10 flex flex-col justify-between overflow-hidden relative group shadow-sm">
              {/* Custom Vector map simulation with light background */}
              <div className="absolute inset-0 bg-slate-50 opacity-90 z-0 flex items-center justify-center p-3">
                <svg className="w-full h-full text-slate-200" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M 10 10 L 90 10 L 90 50 L 10 50 Z" strokeWidth="0.2" fill="#f8fafc" />
                  {/* Streets */}
                  <path d="M 20 10 L 20 50 M 50 10 L 50 50 M 80 10 L 80 50" strokeWidth="1" />
                  <path d="M 10 30 L 90 30" strokeWidth="1.5" />
                  {/* Cormontreuil Marker Pin */}
                  <circle cx="50" cy="30" r="3.5" fill="#ef4444" className="animate-pulse" />
                  <path d="M 50 30 L 50 25" stroke="#ef4444" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Map pin info overlay */}
              <div className="relative z-10 p-3 space-y-1 bg-white/95 rounded-xl border border-slate-200/80 shadow-md text-left">
                <p className="text-[11px] font-bold text-slate-800">H-AUTO Cormontreuil</p>
                <p className="text-[10px] text-slate-500">5 rue des remouleurs, 51350 Cormontreuil</p>
                <p className="text-[9px] text-zinc-650 font-mono font-semibold">Zone Artisanale - Proche brasserie</p>
              </div>

              {/* Open external map */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=H-AUTO+5+rue+des+remouleurs+51350+Cormontreuil" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative z-10 self-end m-1.5 py-1 px-3 bg-white hover:bg-sky-500 border border-slate-200 hover:border-sky-500 text-slate-600 hover:text-white text-[10px] font-extrabold rounded-lg flex items-center space-x-1.5 transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] shadow-sm hover:shadow-sky-500/10"
              >
                <span>Ouvrir sur Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom footer copyright row */}
        <div className="mt-16 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center text-xs text-white/75 gap-4">
          <div className="flex flex-col space-y-1">
            <span>© {new Date().getFullYear()} <strong>Services Auto Horizon</strong>. Tous droits réservés.</span>
            <span className="text-[11px] text-white/60">La société <strong>Services Auto Horizon</strong> exploite le garage <strong>H-AUTO</strong>.</span>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsPolicyOpen(true)} 
              className="text-[10px] text-white/70 hover:text-white font-bold transition-colors underline cursor-pointer"
            >
              Politique de Confidentialité & RGPD
            </button>
            <span className="text-[10px] text-white/30">|</span>
            <span className="text-[10px] text-white/60 font-mono">Cormontreuil • Services Auto Horizon</span>
          </div>
        </div>
      </div>

      {/* Complete Data Retention & Privacy Policy Modal */}
      <AnimatePresence>
        {isPolicyOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPolicyOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 relative z-10 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-sky-500 to-red-600 text-white rounded-t-2xl relative">
                <button 
                  onClick={() => setIsPolicyOpen(false)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">PROTECTION DES DONNÉES</h3>
                    <p className="text-xs text-sky-100 font-medium">Gestion & Conservation des Fichiers Clients • H-AUTO</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6 text-slate-700 text-sm overflow-y-auto text-left">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  Chez <strong>H-AUTO</strong> (Services Auto Horizon), nous accordons une importance primordiale à la protection de la vie privée de nos clients. Conformément au Règlement Général sur la Protection des Données (RGPD) et à la réglementation française, cette charte vous explique en toute transparence comment sont gérées et conservées vos données.
                </p>

                {/* Section 1 */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 flex items-center text-xs uppercase tracking-wider text-sky-500">
                    <span className="w-1.5 h-3 bg-sky-500 rounded-full mr-2"></span>
                    1. Quelles données collectons-nous ?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3.5">
                    Dans le cadre de l'entretien et des réparations de votre véhicule, nous collectons uniquement les informations nécessaires :
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-600 pl-6 space-y-1">
                    <li><strong>Identité & Contact</strong> : Nom, prénom, numéro de téléphone, adresse email et adresse postale.</li>
                    <li><strong>Informations Véhicule</strong> : Numéro d'immatriculation, numéro de châssis (VIN), modèle, motorisation, kilométrage et diagnostic électronique.</li>
                    <li><strong>Prestations</strong> : Historique des devis, factures, pièces remplacées et réparations mécaniques effectuées.</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 flex items-center text-xs uppercase tracking-wider text-red-600">
                    <span className="w-1.5 h-3 bg-red-600 rounded-full mr-2"></span>
                    2. Pourquoi et comment utilisons-nous vos données ?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3.5">
                    Le traitement de vos données répond à des finalités claires et légitimes :
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-600 pl-6 space-y-1">
                    <li><strong>Suivi technique</strong> : Assurer la continuité de vos entretiens et le suivi rigoureux de l'historique de votre voiture.</li>
                    <li><strong>Sécurité des véhicules</strong> : Pouvoir vous contacter d'urgence en cas d'alerte de sécurité ou de rappel constructeur.</li>
                    <li><strong>Gestion des garanties</strong> : Valider et appliquer les garanties sur les pièces détachées neuves et sur notre main-d'œuvre.</li>
                    <li><strong>Comptabilité légale</strong> : Émettre des factures et devis conformes aux obligations fiscales françaises.</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 flex items-center text-xs uppercase tracking-wider text-sky-500">
                    <span className="w-1.5 h-3 bg-sky-500 rounded-full mr-2"></span>
                    3. Durées de conservation de vos données
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3.5">
                    H-AUTO conserve vos informations de manière proportionnée, sécurisée et selon les délais légaux requis en France :
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-3.5 mt-2">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Données Prospects / Devis</p>
                      <p className="text-base font-black text-sky-500 my-1">3 Ans</p>
                      <p className="text-[10px] text-slate-500 leading-snug">À compter du dernier contact ou de l'envoi du devis non suivi d'effet.</p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fiche Technique Véhicule</p>
                      <p className="text-base font-black text-slate-800 my-1">5 Ans</p>
                      <p className="text-[10px] text-slate-500 leading-snug">Après la dernière intervention à l'atelier (responsabilité civile professionnelle).</p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Facturation & Comptabilité</p>
                      <p className="text-base font-black text-red-600 my-1">10 Ans</p>
                      <p className="text-[10px] text-slate-500 leading-snug">Durée d'archivage fiscal légalement obligatoire (Code de commerce art. L123-22).</p>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 flex items-center text-xs uppercase tracking-wider text-slate-800">
                    <span className="w-1.5 h-3 bg-slate-800 rounded-full mr-2"></span>
                    4. Confidentialité absolue & Sécurisation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3.5">
                    Toutes vos données clients sont stockées sur des serveurs sécurisés et au sein de notre logiciel d'atelier fermé. <strong>H-AUTO ne vend, n'échange et ne loue jamais vos données personnelles à des tiers.</strong> Seul notre personnel qualifié est habilité à les consulter pour la réalisation de vos réparations.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 flex items-center text-xs uppercase tracking-wider text-slate-800">
                    <span className="w-1.5 h-3 bg-slate-800 rounded-full mr-2"></span>
                    5. Vos Droits d'Accès, de Modification et de Suppression
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3.5">
                    Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles (hors pièces comptables obligatoires). Pour exercer ce droit, contactez-nous par e-mail à <strong>contact@h-auto.fr</strong> ou venez nous rencontrer à l'accueil du garage au 5 rue des remouleurs, 51350 Cormontreuil.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-150 flex justify-end rounded-b-2xl">
                <button 
                  onClick={() => setIsPolicyOpen(false)}
                  className="bg-slate-900 hover:bg-red-600 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.03] active:scale-[0.97]"
                >
                  J'ai compris & Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
