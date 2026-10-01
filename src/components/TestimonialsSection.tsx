import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ThumbsUp, 
  Car, 
  Wrench, 
  Phone, 
  ShieldCheck, 
  MessageSquarePlus, 
  Grid, 
  SlidersHorizontal,
  Play,
  Pause,
  Award,
  Sparkles,
  X,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  onBookClick?: () => void;
}

export default function TestimonialsSection({ onBookClick }: TestimonialsSectionProps) {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  
  // Modal for leaving a new review
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newVehicle, setNewVehicle] = useState('');
  const [newService, setNewService] = useState('Diagnostic avec Valise');
  const [newComment, setNewComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const categories = [
    { id: 'all', label: 'Tous les avis' },
    { id: 'diagnostic', label: 'Diagnostic Valise' },
    { id: 'moteur', label: 'Moteur & Distribution' },
    { id: 'freinage', label: 'Freinage' },
    { id: 'entretien', label: 'Entretien & Révision' }
  ];

  const filteredTestimonials = selectedCategory === 'all'
    ? testimonialsList
    : testimonialsList.filter((item) => item.category === selectedCategory);

  // Reset or adjust carousel index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, viewMode]);

  // Autoplay carousel
  useEffect(() => {
    if (viewMode !== 'carousel' || !isAutoPlay || filteredTestimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [viewMode, isAutoPlay, filteredTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));

    setTestimonialsList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          const isCurrentlyLiked = likedMap[id];
          return {
            ...item,
            likes: (item.likes || 0) + (isCurrentlyLiked ? -1 : 1)
          };
        }
        return item;
      })
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newReviewItem: Testimonial = {
      id: `custom_${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || 'Cormontreuil',
      vehicle: newVehicle.trim() || 'Véhicule particulier',
      service: newService,
      category: newService.toLowerCase().includes('diagnostic') 
        ? 'diagnostic' 
        : newService.toLowerCase().includes('frein') 
          ? 'freinage' 
          : 'entretien',
      rating: newRating,
      date: 'À l’instant',
      comment: newComment.trim(),
      verified: true,
      source: 'Atelier',
      highlight: 'Avis client récent',
      likes: 1
    };

    setTestimonialsList([newReviewItem, ...testimonialsList]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewLocation('');
      setNewVehicle('');
      setNewComment('');
      setNewRating(5);
    }, 2000);
  };

  // Helper for visible items in carousel
  // Show 1 item on mobile, up to 3 on desktop
  const getVisibleCards = () => {
    if (filteredTestimonials.length === 0) return [];
    if (filteredTestimonials.length === 1) return [filteredTestimonials[0]];

    const count = Math.min(3, filteredTestimonials.length);
    const cards: Testimonial[] = [];
    for (let i = 0; i < count; i++) {
      const idx = (currentIndex + i) % filteredTestimonials.length;
      cards.push(filteredTestimonials[idx]);
    }
    return cards;
  };

  return (
    <section 
      className="py-20 bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-100 text-slate-800 relative overflow-hidden border-t border-zinc-300/70" 
      id="avis"
    >
      {/* Background Subtle Gear Watermark */}
      <div 
        className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.02] bg-contain bg-right bg-no-repeat pointer-events-none" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600')" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 border border-red-200 text-red-650 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-red-600" />
            <span>Témoignages & Confiance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            La Satisfaction de nos Clients, Notre Meilleure Réputation
          </h2>

          <div className="flex justify-center items-center space-x-1 mt-4">
            <span className="w-6 h-1 bg-sky-500 rounded-full"></span>
            <span className="w-3.5 h-1 bg-zinc-300 rounded-full"></span>
            <span className="w-6 h-1 bg-red-600 rounded-full"></span>
          </div>

          <p className="text-slate-600 mt-4 text-base">
            Découvrez les retours authentiques des automobilistes de Cormontreuil, Reims et sa région ayant confié leur véhicule à l’atelier <strong className="font-bold text-slate-800">H-AUTO</strong>.
          </p>
        </div>

        {/* Global Rating & Trust Banner */}
        <div className="bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-2xl p-6 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            
            {/* Note globale */}
            <div className="flex items-center justify-center md:justify-start space-x-4 pb-4 md:pb-0 md:pr-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex flex-col items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
                <span className="text-2xl font-black leading-none">4.9</span>
                <span className="text-[10px] font-bold opacity-90">/ 5.0</span>
              </div>
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-sm font-extrabold text-slate-900">Excellente réputation</div>
                <div className="text-xs text-slate-500">Basé sur +130 avis vérifiés</div>
              </div>
            </div>

            {/* Diagnostic offert si réparation */}
            <div className="flex items-center justify-center md:justify-start space-x-3.5 py-4 md:py-0 md:px-6">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">Diagnostic Offert (0 €)</div>
                <div className="text-xs text-slate-500">Déduit sur facture si réparation effectuée</div>
              </div>
            </div>

            {/* Transparence & Devis */}
            <div className="flex items-center justify-center md:justify-start space-x-3.5 py-4 md:py-0 md:px-6">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-xl border border-sky-200 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">Tarifs & Devis Transparents</div>
                <div className="text-xs text-slate-500">Pas de mauvaises surprises ni de survente</div>
              </div>
            </div>

            {/* Action bouton laisser un avis */}
            <div className="flex flex-col items-center justify-center pt-4 md:pt-0 md:pl-6 space-y-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquarePlus className="w-4 h-4 text-sky-400" />
                <span>Déposer un avis client</span>
              </button>
              <span className="text-[11px] text-slate-500">Rejoignez nos clients satisfaits</span>
            </div>

          </div>
        </div>

        {/* Controls: Categories Filter & View Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15'
                    : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-zinc-200'
                }`}
              >
                <span>{cat.label}</span>
                {cat.id === 'diagnostic' && (
                  <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] rounded-full font-black">
                    0 €
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* View mode toggle & carousel controls */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
            
            {/* Toggle Grid / Carousel */}
            <div className="bg-white/80 border border-zinc-200 p-1 rounded-xl flex items-center space-x-1">
              <button
                onClick={() => setViewMode('carousel')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'carousel'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Mode Carrousel défilant"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Carrousel</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Mode Grille complète"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grille</span>
              </button>
            </div>

            {/* Carousel navigation buttons (only active in carousel mode) */}
            {viewMode === 'carousel' && filteredTestimonials.length > 1 && (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="p-2 rounded-lg bg-white/80 hover:bg-white border border-zinc-200 text-slate-700 transition-all text-xs"
                  title={isAutoPlay ? 'Mettre en pause le défilement automatique' : 'Activer le défilement automatique'}
                >
                  {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-slate-700" /> : <Play className="w-3.5 h-3.5 text-slate-700" />}
                </button>
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-white/80 hover:bg-white border border-zinc-200 text-slate-700 hover:text-slate-900 transition-all active:scale-95"
                  title="Avis précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-white/80 hover:bg-white border border-zinc-200 text-slate-700 hover:text-slate-900 transition-all active:scale-95"
                  title="Avis suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Content Area */}
        {viewMode === 'carousel' ? (
          /* CAROUSEL VIEW */
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {getVisibleCards().map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <ReviewCard 
                      testimonial={item} 
                      isLiked={!!likedMap[item.id]} 
                      onToggleLike={() => handleToggleLike(item.id)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Indicators */}
            {filteredTestimonials.length > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                {filteredTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === i 
                        ? 'w-8 bg-sky-500' 
                        : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                    }`}
                    aria-label={`Aller à l'avis ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((item) => (
              <div key={item.id} className="h-full">
                <ReviewCard 
                  testimonial={item} 
                  isLiked={!!likedMap[item.id]} 
                  onToggleLike={() => handleToggleLike(item.id)} 
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Social Proof & CTA Bar with Light Blue Call Button */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 text-sky-400 shrink-0">
              <Quote className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Besoin d’un diagnostic ou d’un devis immédiat ?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Diagnostic valise à partir de 30 € (30 min) / 60 € (1h) — <strong className="text-white font-extrabold underline decoration-red-500">100% OFFERT</strong> si les travaux sont réalisés chez H-AUTO.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Call button in Light Blue (bleu clair) as mandated by user styling rules */}
            <a
              href="tel:0749309940"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-300 hover:to-sky-500 hover:-translate-y-0.5 hover:scale-[1.04] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 transition-all text-sm shrink-0"
            >
              <Phone className="w-4 h-4 text-white animate-pulse" />
              <span>Appeler le 07 49 30 99 40</span>
            </a>

            {onBookClick && (
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 py-3.5 rounded-xl transition-all text-sm shrink-0"
              >
                <Wrench className="w-4 h-4 text-slate-300" />
                <span>Demander un devis en ligne</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* MODAL: Laisser un avis */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border border-zinc-200"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>

              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Merci pour votre avis !</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Votre témoignage a bien été enregistré et valorise le travail de notre équipe chez H-AUTO à Cormontreuil.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-red-650 tracking-wider uppercase font-mono">Partage d’expérience</span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Donnez votre avis sur l’Atelier H-AUTO</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Votre avis aide les automobilistes de Reims et Cormontreuil à choisir en toute sérénité.</p>
                  </div>

                  {/* Note étoiles */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Note globale</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star 
                            className={`w-7 h-7 ${
                              star <= newRating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-zinc-300'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-sm font-extrabold text-slate-800 ml-2">{newRating} / 5 étoiles</span>
                    </div>
                  </div>

                  {/* Nom & Ville */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Votre Nom / Prénom *</label>
                      <input
                        type="text"
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="Ex: Michel D."
                        className="w-full px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ville</label>
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Ex: Cormontreuil, Reims..."
                        className="w-full px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  {/* Véhicule & Prestation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Modèle de votre véhicule</label>
                      <input
                        type="text"
                        value={newVehicle}
                        onChange={(e) => setNewVehicle(e.target.value)}
                        placeholder="Ex: Peugeot 208, Clio 4..."
                        className="w-full px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Prestation réalisée</label>
                      <select
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Diagnostic avec Valise (0 € si réparé)">Diagnostic avec Valise (0 € si réparé)</option>
                        <option value="Révision & Vidange">Révision & Vidange</option>
                        <option value="Courroie de Distribution">Courroie de Distribution</option>
                        <option value="Disques & Plaquettes de Frein">Disques & Plaquettes de Frein</option>
                        <option value="Alternateur / Batterie">Alternateur / Batterie</option>
                        <option value="Autre prestation mécanique">Autre prestation mécanique</option>
                      </select>
                    </div>
                  </div>

                  {/* Commentaire */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Votre commentaire *</label>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Partagez vos impressions sur la rapidité, l'honnêteté des devis et la qualité des travaux..."
                      className="w-full px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5 text-sky-400" />
                      <span>Publier mon avis</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Sub-component: Individual Review Card
function ReviewCard({
  testimonial,
  isLiked,
  onToggleLike
}: {
  testimonial: Testimonial;
  isLiked: boolean;
  onToggleLike: () => void;
}) {
  return (
    <div className="h-full flex flex-col justify-between bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-200 relative group">
      
      {/* Top row: stars & quote watermark */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-zinc-200'
                }`}
              />
            ))}
            <span className="text-xs font-extrabold text-slate-700 ml-1.5">
              {testimonial.rating}.0
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Avis vérifié {testimonial.source}</span>
          </div>
        </div>

        {/* Highlight pill if present */}
        {testimonial.highlight && (
          <div className="inline-block px-2.5 py-0.5 bg-sky-50 border border-sky-200 text-sky-700 rounded-md text-[11px] font-extrabold mb-3">
            ★ {testimonial.highlight}
          </div>
        )}

        {/* Review body text */}
        <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
          « {testimonial.comment} »
        </p>
      </div>

      {/* Bottom row: author info, vehicle & helpful button */}
      <div className="pt-4 border-t border-zinc-100 mt-2 space-y-3">
        
        {/* Vehicle & service tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="inline-flex items-center space-x-1 bg-zinc-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
            <Car className="w-3 h-3 text-zinc-500" />
            <span>{testimonial.vehicle}</span>
          </span>
          <span className="inline-flex items-center space-x-1 bg-red-50 text-red-700 px-2 py-0.5 rounded-md font-semibold">
            <Wrench className="w-3 h-3 text-red-500" />
            <span>{testimonial.service}</span>
          </span>
        </div>

        {/* Author name, location, date & like */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
              {testimonial.author.slice(0, 2)}
            </div>
            <div>
              <div className="font-extrabold text-slate-900 leading-tight">
                {testimonial.author}
              </div>
              <div className="text-[11px] text-slate-500">
                {testimonial.location || 'Cormontreuil'} • {testimonial.date}
              </div>
            </div>
          </div>

          <button
            onClick={onToggleLike}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              isLiked 
                ? 'bg-sky-100 text-sky-700 font-bold border border-sky-200' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-zinc-100'
            }`}
            title="Avis utile"
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-sky-600 text-sky-600' : ''}`} />
            <span>{testimonial.likes || 0}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
