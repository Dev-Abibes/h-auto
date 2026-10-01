import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck, AlertCircle, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';

interface ContactSectionProps {
  selectedServiceId?: string | null;
  onClearSelectedService?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceId?: string;
}

export default function ContactSection({ selectedServiceId, onClearSelectedService }: ContactSectionProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If a service was pre-selected from another section, update form
  useEffect(() => {
    if (selectedServiceId) {
      setFormData(prev => ({
        ...prev,
        serviceId: selectedServiceId,
        message: prev.message || `Bonjour, je souhaite des informations et un devis pour la prestation : ${
          SERVICES.find(s => s.id === selectedServiceId)?.name || selectedServiceId
        }.`
      }));
    }
  }, [selectedServiceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!formData.name.trim()) {
      setErrorMessage('Veuillez renseigner votre nom.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Veuillez renseigner une adresse email valide.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Veuillez renseigner votre numéro de téléphone.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Veuillez écrire votre message.');
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onClearSelectedService) {
        onClearSelectedService();
      }
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      serviceId: ''
    });
    setIsSuccess(false);
    setErrorMessage(null);
  };

  const selectedServiceObj = SERVICES.find(s => s.id === formData.serviceId);

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-300 text-slate-800 relative overflow-hidden" id="contact">
      {/* Background gear watermark element */}
      <div 
        className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.015] bg-contain bg-right bg-no-repeat pointer-events-none" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600')" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-zinc-650 font-mono text-sm font-bold tracking-widest uppercase">Contact & Devis</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Contactez Notre Atelier
          </h2>
          <div className="flex justify-center items-center space-x-1 mt-4">
            <span className="w-6 h-1 bg-sky-500 rounded-full"></span>
            <span className="w-3.5 h-1 bg-zinc-300 rounded-full"></span>
            <span className="w-6 h-1 bg-red-600 rounded-full"></span>
          </div>
          <p className="text-slate-600 mt-4 text-base">
            Une question, une prise de rendez-vous ou une demande de devis personnalisé ? Remplissez le formulaire ci-dessous ou contactez notre atelier directement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Garage Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-zinc-300 shadow-sm space-y-6">
              <div className="border-b border-zinc-200 pb-5">
                <span className="inline-block px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 mb-2">
                  Atelier H-AUTO Cormontreuil
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Services Auto Horizon
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Mécanique générale, entretien courant, révision & vitrage fumé pour toutes marques automobiles.
                </p>
              </div>

              {/* Coordinates */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-red-50 text-red-600 shrink-0 mt-0.5 border border-red-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Adresse</h4>
                    <p className="text-slate-700 font-medium mt-0.5">5 rue des remouleurs</p>
                    <p className="text-slate-500 text-xs">51350 Cormontreuil (Zone Artisanale)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 shrink-0 mt-0.5 border border-sky-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Téléphone</h4>
                    <a 
                      href="tel:0749309940" 
                      className="text-sky-600 hover:text-sky-500 font-extrabold text-base block mt-0.5 transition-colors"
                    >
                      07 49 30 99 40
                    </a>
                    <p className="text-slate-500 text-xs">Appel direct pour urgence ou conseil mécanique</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700 shrink-0 mt-0.5 border border-zinc-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Courriel</h4>
                    <a 
                      href="mailto:contact@h-auto.fr" 
                      className="text-slate-800 hover:text-sky-600 font-semibold block mt-0.5 transition-colors"
                    >
                      contact@h-auto.fr
                    </a>
                    <p className="text-slate-500 text-xs">Devis sous 24h ouvrées</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0 mt-0.5 border border-amber-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Horaires de l'atelier</h4>
                    <p className="text-slate-800 font-semibold mt-0.5">Lundi au Samedi : 09h00 - 18h00</p>
                    <p className="text-slate-500 text-xs">Fermé le dimanche et les jours fériés</p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-zinc-200 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2 text-slate-700 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">Garantie Pièces & M.O.</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-bold">Devis Gratuit</span>
                </div>
              </div>
            </div>

            {/* Direct phone CTA card */}
            <div className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 rounded-2xl p-6 text-white shadow-md flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-100">Besoin d'un diagnostic urgent ?</p>
                <h4 className="text-lg font-black mt-0.5">Appelez-nous directement</h4>
              </div>
              <a
                href="tel:0749309940"
                className="bg-white text-sky-700 hover:bg-sky-50 font-extrabold px-4 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-sm flex items-center space-x-2 shrink-0 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>07 49 30 99 40</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-zinc-300 shadow-md relative">
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-10 text-center space-y-5"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-slate-900">
                        Message Envoyé avec Succès !
                      </h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                        Merci <strong className="text-slate-800">{formData.name}</strong>. Notre équipe à Cormontreuil a bien reçu votre demande et vous recontactera très rapidement au <strong className="text-slate-800">{formData.phone}</strong> ou par email.
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-600">
                      <p><strong>Email :</strong> {formData.email}</p>
                      <p><strong>Téléphone :</strong> {formData.phone}</p>
                      {selectedServiceObj && (
                        <p><strong>Prestation :</strong> {selectedServiceObj.name}</p>
                      )}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-sm active:scale-95"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                  >
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        Formulaire de Contact & Devis
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Tous les champs marqués d’un astérisque (*) sont obligatoires.
                      </p>
                    </div>

                    {/* Preselected service pill if applicable */}
                    {selectedServiceObj && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs">
                            <Wrench className="w-4 h-4 text-red-600 shrink-0" />
                            <span className="text-slate-700">Prestation sélectionnée :</span>
                            <span className="font-extrabold text-red-700">{selectedServiceObj.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, serviceId: '' }));
                              if (onClearSelectedService) onClearSelectedService();
                            }}
                            className="text-xs text-red-600 hover:text-red-800 font-bold underline cursor-pointer ml-2"
                          >
                            Changer
                          </button>
                        </div>
                        {selectedServiceObj.specialOffer && (
                          <p className="text-[11px] text-emerald-700 font-bold pl-6">
                            🎁 Avantage atelier : {selectedServiceObj.specialOffer}
                          </p>
                        )}
                        <p className="text-[10px] text-slate-500 pl-6 italic">
                          Tarif indicatif : {selectedServiceObj.priceEstimate} (varie selon pièces, marque et véhicule)
                        </p>
                      </div>
                    )}

                    {/* Error banner */}
                    {errorMessage && (
                      <div className="p-3.5 bg-red-50 border border-red-300 rounded-xl flex items-center space-x-2.5 text-xs text-red-700 font-semibold animate-shake">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name Field */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Nom & Prénom *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ex: Jean Dupont"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Adresse Email *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ex: jean.dupont@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone Field */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Numéro de Téléphone *
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Ex: 06 12 34 56 78"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all"
                        />
                      </div>

                      {/* Optional Prestation dropdown */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-service" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Prestation Souhaitée
                        </label>
                        <select
                          id="contact-service"
                          name="serviceId"
                          value={formData.serviceId}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all"
                        >
                          <option value="">Sélectionnez une prestation (optionnel)</option>
                          {SERVICES.map(srv => (
                            <option key={srv.id} value={srv.id}>
                              {srv.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Votre Message ou Demande de Devis *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Précisez votre véhicule (marque, modèle, immatriculation ou année) ainsi que l'intervention souhaitée ou vos disponibilités..."
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-red-650 to-red-750 hover:from-red-500 hover:to-red-700 text-white font-extrabold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Envoi de votre demande...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Envoyer Ma Demande</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      En soumettant ce formulaire, vous acceptez que les informations saisies soient utilisées par le garage H-AUTO exclusivement pour vous recontacter dans le cadre de votre demande, conformément à notre politique de confidentialité.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
