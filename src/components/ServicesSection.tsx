import React, { useState, useMemo } from 'react';
import { 
  Droplet, 
  Disc, 
  CircleDot, 
  Activity, 
  ArrowUpDown, 
  Wind, 
  Wrench, 
  Cpu, 
  Clock, 
  Coins, 
  ChevronDown, 
  ChevronUp, 
  Phone,
  Search,
  Sliders,
  Gauge,
  Thermometer,
  Battery,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  RefreshCw,
  Filter,
  Leaf,
  Flame,
  Sparkles,
  Info,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { motion, AnimatePresence } from 'motion/react';

// Map icon string names to Lucide icons
const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Droplet':
      return <Droplet className={className} />;
    case 'Disc':
      return <Disc className={className} />;
    case 'CircleDot':
      return <CircleDot className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'ArrowUpDown':
      return <ArrowUpDown className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Sliders':
      return <Sliders className={className} />;
    case 'Gauge':
      return <Gauge className={className} />;
    case 'Thermometer':
      return <Thermometer className={className} />;
    case 'Battery':
      return <Battery className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'ClipboardCheck':
      return <ClipboardCheck className={className} />;
    case 'RefreshCw':
      return <RefreshCw className={className} />;
    case 'Filter':
      return <Filter className={className} />;
    case 'Leaf':
      return <Leaf className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    default:
      return <Wrench className={className} />;
  }
};

const CATEGORIES = [
  { id: 'all', label: 'Toutes les prestations' },
  { id: 'entretien', label: 'Entretien & Vidange' },
  { id: 'mecanique', label: 'Mécanique & Trains' },
  { id: 'tech', label: 'Électronique & Moteur' }
];

// Helper to assign categories to services for the chips filter
const getServiceCategory = (id: string): string => {
  const entretienIds = [
    'entretien_auto', 'liquide_refroidissement', 
    'liquide_frein', 'batterie', 'bougies', 'filtre_habitacle', 
    'diagnostic_securite', 'controle_technique', 'vitrage_fume'
  ];
  const mecaniqueIds = [
    'courroie_distribution', 'disques_plaquettes', 'amortisseur', 
    'embrayage', 'cardan', 'rotule_direction'
  ];
  
  if (entretienIds.includes(id)) return 'entretien';
  if (mecaniqueIds.includes(id)) return 'mecanique';
  return 'tech'; // e.g. diagnostic_electronique, alternateur, injecteur, eco_diagnostic, voiture_electrique, pot_echappement
};

interface ServicesSectionProps {
  onSelectService?: (serviceId: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllPrestations, setShowAllPrestations] = useState(false);

  const toggleExpand = (id: string) => {
    if (expandedServiceId === id) {
      setExpandedServiceId(null);
    } else {
      setExpandedServiceId(id);
    }
  };

  // Filter and search logic
  const filteredServices = useMemo(() => {
    return SERVICES.filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.detailedDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      const categoryOfService = getServiceCategory(service.id);
      const matchesCategory = activeCategory === 'all' || categoryOfService === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Pagination / Limit logic: 
  // - If user has typed a search query or filtered by a specific category, show all results.
  // - Otherwise, show 8 items by default, and expand to all when "showAllPrestations" is true.
  const displayedServices = useMemo(() => {
    const isFiltered = searchQuery.trim() !== '' || activeCategory !== 'all';
    if (isFiltered || showAllPrestations) {
      return filteredServices;
    }
    return filteredServices.slice(0, 8);
  }, [filteredServices, searchQuery, activeCategory, showAllPrestations]);

  const hasMoreToReveal = filteredServices.length > 8 && !showAllPrestations && searchQuery.trim() === '' && activeCategory === 'all';

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-200 via-zinc-100 to-zinc-200 text-slate-800 relative border-t border-b border-zinc-300/80 overflow-hidden" id="services">
      {/* Background decoration: light blueprint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4d4d8_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-zinc-600 font-mono text-sm font-bold tracking-widest uppercase">Prestations de l’Atelier</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Découvrez les prestations mécaniques disponibles dans nos garages
          </h2>
          <div className="flex justify-center items-center space-x-1 mt-4">
            <span className="w-6 h-1 bg-sky-500 rounded-full"></span>
            <span className="w-3.5 h-1 bg-slate-300 rounded-full"></span>
            <span className="w-6 h-1 bg-red-600 rounded-full"></span>
          </div>
          <p className="text-slate-600 mt-4 text-base font-normal leading-relaxed">
            De l'entretien courant aux réparations mécaniques ou électroniques complexes, nous intervenons sur tous types de véhicules avec rigueur et transparence.
          </p>
          <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-sky-50 border border-sky-200 text-sky-700 rounded-full text-xs font-extrabold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span>Tarif horaire de main-d'œuvre à partir de 62,50 € HT</span>
          </div>
        </div>

        {/* Top Information Cards: Diagnostic Valise Offer & Tarifs Indicatifs */}
        <div className="max-w-5xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          
          {/* Card 1: Diagnostic Valise Offer */}
          <div className="bg-gradient-to-br from-red-600 via-red-650 to-red-800 text-white rounded-2xl p-6 shadow-md border border-red-500/30 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Valise Multimarque Pro</span>
                </span>
                <span className="bg-emerald-400 text-slate-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center space-x-1">
                  <span>Offre Atelier</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black tracking-tight">Diagnostic avec Valise</h3>
                <p className="text-xs text-red-100 mt-1 leading-relaxed">
                  Contrôle approfondi des calculateurs, lecture et effacement des voyants & codes défauts.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 rounded-xl p-3 text-center border border-white/15">
                  <p className="text-[10px] uppercase font-bold text-red-100 tracking-wider">Formule 30 minutes</p>
                  <p className="text-2xl font-black mt-0.5">30 €</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center border border-white/15">
                  <p className="text-[10px] uppercase font-bold text-red-100 tracking-wider">Formule 1 heure</p>
                  <p className="text-2xl font-black mt-0.5">60 €</p>
                </div>
              </div>

              {/* Crucial requirement: Diagnostic offert (0 €) si prestation faite */}
              <div className="bg-emerald-500 text-white p-3.5 rounded-xl flex items-center space-x-2.5 shadow-sm border border-emerald-400/80">
                <Gift className="w-5 h-5 shrink-0 animate-bounce" />
                <p className="text-xs font-black leading-snug">
                  Si la prestation / réparation est faite chez nous : le diagnostic est 100% OFFERT (0 €) !
                </p>
              </div>
            </div>

            {onSelectService && (
              <div className="mt-4 pt-3 border-t border-white/15 relative z-10 flex items-center justify-between">
                <span className="text-[11px] text-red-100 font-medium">Prise en charge rapide</span>
                <button
                  type="button"
                  onClick={() => onSelectService('diagnostic_electronique')}
                  className="bg-white hover:bg-zinc-100 text-red-700 font-extrabold text-xs px-4 py-2 rounded-lg transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Demander ce diagnostic
                </button>
              </div>
            )}
          </div>

          {/* Card 2: Tarifs indicatifs & Heures de prestations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-zinc-700">
                <div className="p-2 bg-sky-50 rounded-lg text-sky-600 border border-sky-100">
                  <Info className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Transparence & Tarifs Indicatifs
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900">
                Nos tarifs et heures de prestations
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Les heures de prestations et nos tarifs sont donnés à <strong>titre indicatif</strong>. Ils dépendent des <strong>pièces</strong>, des <strong>marques</strong> et sont <strong>différents pour chaque véhicule</strong> selon sa motorisation et sa complexité technique.
              </p>

              <div className="space-y-2 pt-1 text-xs text-slate-600">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Devis personnalisé et gratuit</strong> remis avant chaque réparation.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tarifs transparents</strong> : pièces d'origine certifiées ou de qualité équivalente constructeur.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Temps barémé</strong> selon les préconisations du constructeur automobile.</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-150 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Un renseignement pour votre modèle ?</span>
              <a
                href="tel:0749309940"
                className="text-sky-600 hover:text-sky-500 font-extrabold flex items-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>07 49 30 99 40</span>
              </a>
            </div>
          </div>

        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une prestation (ex: vidange, frein, courroie, batterie...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/20 focus:border-zinc-800 shadow-sm transition-all text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold font-mono bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedServiceId(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-sky-500 to-sky-700 text-white shadow-md shadow-sky-500/10 border border-sky-500'
                    : 'bg-white text-slate-650 border border-slate-200 hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {displayedServices.length > 0 ? (
          <motion.div 
            layout="position"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            id="services-grid"
          >
            <AnimatePresence mode="popLayout">
              {displayedServices.map((service) => {
                const isExpanded = expandedServiceId === service.id;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={service.id}
                    className={`bg-white border rounded-2xl transform transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden shadow-sm group cursor-pointer ${
                      isExpanded 
                        ? 'border-zinc-800 ring-1 ring-zinc-800/10 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 shadow-xl scale-[1.01]' 
                        : 'border-slate-200/80 hover:border-zinc-400 hover:shadow-xl hover:scale-[1.025] hover:-translate-y-1'
                    }`}
                    id={`service-card-${service.id}`}
                  >
                    <div className="p-6 space-y-4 text-left">
                      {/* Icon & Title row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="p-3 bg-sky-50/80 text-sky-500 rounded-xl shadow-sm border border-sky-200/50 shrink-0 transform group-hover:scale-105 group-hover:bg-sky-100 transition-all duration-300">
                          <IconMapper name={service.iconName} className="w-6 h-6" />
                        </div>
                        {/* Price Tag with Indicatif label */}
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-mono font-bold bg-red-50/70 text-red-700 px-3 py-1.5 rounded-full flex items-center space-x-1 border border-red-200/40 shadow-sm text-right">
                            <Coins className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{service.priceEstimate}</span>
                          </span>
                          <span className="text-[10px] text-slate-650 font-medium italic">
                            *Tarif indicatif
                          </span>
                        </div>
                      </div>

                      {/* Special offer banner on card if available */}
                      {service.specialOffer && (
                        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5">
                          <Gift className="w-4 h-4 text-emerald-600 shrink-0 animate-bounce" />
                          <span>{service.specialOffer}</span>
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center">{service.name}</h3>
                        <p className="text-slate-500 text-sm mt-2 leading-relaxed font-normal">{service.description}</p>
                      </div>

                      {/* Expandable detailed content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-slate-100 pt-4 mt-2 overflow-hidden text-slate-600 text-sm"
                          >
                            <p className="leading-relaxed whitespace-pre-line text-slate-500 font-normal">
                              {service.detailedDescription}
                            </p>

                            {service.specialOffer && (
                              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
                                <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Avantage Atelier : {service.specialOffer}</span>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 bg-slate-50 p-3 rounded-lg text-xs">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                                <div>
                                  <p className="text-slate-400">Durée indicative</p>
                                  <p className="font-semibold text-slate-800">{service.duration}</p>
                                  <p className="text-[10px] text-slate-650">selon véhicule</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Coins className="w-4 h-4 text-slate-400 shrink-0" />
                                <div>
                                  <p className="text-slate-400">Tarification indicative</p>
                                  <p className="font-semibold text-slate-800">{service.priceEstimate}</p>
                                  <p className="text-[10px] text-slate-650">selon pièces & marque</p>
                                </div>
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-650 italic mt-3">
                              * Les heures d'intervention et nos tarifs indicatifs dépendent des pièces détachées, des marques et diffèrent pour chaque véhicule.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Footer buttons on Card */}
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between space-x-3 mt-auto">
                      <button
                        onClick={() => toggleExpand(service.id)}
                        className="text-slate-500 hover:text-red-600 font-bold text-xs flex items-center space-x-1 py-2 px-3 rounded-lg hover:bg-red-50/40 hover:scale-[1.04] active:scale-95 transition-all duration-200"
                        id={`service-toggle-${service.id}`}
                      >
                        <span>{isExpanded ? 'Moins d’infos' : 'Plus de détails'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <a
                        href="tel:0749309940"
                        className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-white font-black text-xs px-4 py-2.5 rounded-lg flex items-center space-x-1.5 shadow-sm hover:shadow-md hover:shadow-sky-400/25 hover:scale-[1.05] active:scale-[0.95] transition-all duration-300 border-b-2 border-sky-300"
                        id={`service-book-btn-${service.id}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-white animate-pulse" />
                        <span>Nous appeler</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto shadow-sm">
            <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Aucune prestation trouvée</h3>
            <p className="text-slate-500 text-sm mt-1">Essayez d'ajuster votre recherche ou filtrez par catégorie.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 bg-zinc-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* 'Voir toutes les prestations' toggle button */}
        {hasMoreToReveal && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllPrestations(true)}
              className="inline-flex items-center space-x-2 bg-white hover:bg-sky-50/40 text-slate-800 hover:text-sky-500 font-extrabold px-8 py-4 rounded-xl border border-slate-300 hover:border-sky-400 hover:shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              id="services-show-all-btn"
            >
              <span>Voir toutes les prestations</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}

        {showAllPrestations && searchQuery.trim() === '' && activeCategory === 'all' && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setShowAllPrestations(false);
                setExpandedServiceId(null);
                // Scroll back to top of services smoothly
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 bg-white hover:bg-sky-50/40 text-slate-800 hover:text-sky-500 font-extrabold px-8 py-4 rounded-xl border border-slate-300 hover:border-sky-400 hover:shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              id="services-show-less-btn"
            >
              <span>Voir moins de prestations</span>
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Custom request callout */}
        <div className="mt-16 bg-white rounded-2xl p-8 border-y border-r border-slate-200/80 border-l-4 border-l-sky-500 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden text-left hover:border-sky-300 transition-colors duration-300">
          {/* Subtle design element */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.02] bg-cover pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600')" }}></div>
          
          <div className="relative z-10 space-y-2 max-w-xl">
            <h3 className="text-xl font-bold text-slate-900">Besoin d’un diagnostic ou d’un service sur mesure ?</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-normal">
              Votre véhicule présente un bruit anormal, un voyant d’alerte ou a besoin d’une réparation non listée ? Contactez-nous directement pour un devis gratuit et personnalisé.
            </p>
          </div>
          <div className="mt-6 md:mt-0 relative z-10 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 shrink-0">
            {onSelectService && (
              <button
                type="button"
                onClick={() => onSelectService('diagnostic_securite')}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow hover:scale-[1.03] active:scale-95 text-center flex items-center justify-center space-x-2"
                id="services-quote-btn"
              >
                <span>Demander un devis en ligne</span>
              </button>
            )}
            <a
              href="tel:0749309940"
              className="w-full sm:w-auto bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-white font-black px-6 py-3.5 rounded-xl text-sm hover:scale-[1.04] hover:shadow-lg hover:shadow-sky-400/35 active:scale-95 transition-all duration-300 text-center inline-flex items-center justify-center space-x-2 shadow-md border-b-2 border-sky-300"
              id="services-call-btn"
            >
              <Phone className="w-4 h-4 text-white animate-bounce" />
              <span>Appeler le 07 49 30 99 40</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
