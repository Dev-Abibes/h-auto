import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'garage' | 'mechanical' | 'office'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory || (selectedCategory === 'garage' && item.category === 'office'));

  const categoriesList = [
    { id: 'all', label: 'Toutes les photos' },
    { id: 'garage', label: 'Notre Garage' },
    { id: 'mechanical', label: 'Mécanique & Pièces' }
  ];

  const handleOpenLightbox = (item: GalleryItem) => {
    // Find index of the item in the current filtered list
    const index = filteredItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1));
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1));
    }
  };

  const activeImage = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-100 text-slate-800 relative overflow-hidden" id="galerie">
      {/* Background gear watermark element as requested by the user */}
      <div className="absolute left-0 bottom-0 top-0 w-1/4 opacity-[0.01] bg-contain bg-left bg-no-repeat pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600')" }}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-zinc-650 font-mono text-sm font-bold tracking-widest uppercase">Galerie de l’Atelier</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Notre Atelier & Notre Savoir-Faire en Images
          </h2>
          <div className="flex justify-center items-center space-x-1 mt-4">
            <span className="w-6 h-1 bg-sky-500 rounded-full"></span>
            <span className="w-3.5 h-1 bg-zinc-300 rounded-full"></span>
            <span className="w-6 h-1 bg-red-600 rounded-full"></span>
          </div>
          <p className="text-slate-600 mt-4 text-base">
            Découvrez nos infrastructures à Cormontreuil, notre bureau d’accueil rénové et des aperçus de nos interventions mécaniques rigoureuses.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12" id="gallery-categories">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setLightboxIndex(null); // Clear lightbox state on category change
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                (selectedCategory === cat.id || (cat.id === 'garage' && selectedCategory === 'office'))
                  ? 'bg-gradient-to-r from-sky-500 to-sky-700 text-white shadow-md shadow-sky-500/10 border border-sky-500'
                  : 'bg-white text-slate-600 hover:text-sky-500 hover:bg-sky-50/30 border border-zinc-200 hover:border-sky-400'
              }`}
              id={`gallery-cat-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="gallery-grid">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="group cursor-pointer relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300"
              id={`gallery-item-${item.id}`}
              whileHover={{ y: -4 }}
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-8 h-8 bg-white text-zinc-900 rounded flex items-center justify-center mb-2 shadow-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-300 tracking-wider uppercase font-mono mb-1">
                    {item.category === 'garage' || item.category === 'office' ? 'Notre Atelier' : 'Pièce Mécanique'}
                  </p>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
            id="gallery-lightbox"
          >
            {/* Lightbox Header Controls */}
            <div className="flex justify-between items-center max-w-7xl mx-auto w-full text-slate-400">
              <span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase">
                {activeImage.category === 'garage' || activeImage.category === 'office' ? 'Notre Garage' : 'MÉCANIQUE GÉNÉRALE'} ({lightboxIndex + 1} / {filteredItems.length})
              </span>
              <button
                onClick={handleCloseLightbox}
                className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Stage */}
            <div className="relative flex items-center justify-center flex-grow max-w-7xl mx-auto w-full my-4">
              {/* Previous Image Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-0 p-3 bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors shrink-0 z-10"
                title="Précédent"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Expanded Image */}
              <motion.img
                key={activeImage.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={activeImage.url}
                alt={activeImage.caption}
                className="max-h-[70vh] max-w-[85vw] object-contain rounded-2xl border border-slate-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next Image Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-0 p-3 bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors shrink-0 z-10"
                title="Suivant"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Caption Footer */}
            <div className="max-w-4xl mx-auto w-full text-center pb-4">
              <p className="text-base font-semibold text-white leading-relaxed">
                {activeImage.caption}
              </p>
              <p className="text-xs text-zinc-400 mt-2 font-mono">
                Garage H-AUTO • 5 Rue des Remouleurs, Cormontreuil
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
