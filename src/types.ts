export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Service {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  priceEstimate: string;
  duration: string;
  iconName: string;
  specialOffer?: string;
  isOfferHighlight?: boolean;
}

export interface Appointment {
  id: string;
  ref: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  licensePlate: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'garage' | 'mechanical' | 'office';
}

export interface OpeningHour {
  day: string;
  hours: string;
  isClosed: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  location?: string;
  vehicle: string;
  service: string;
  category: 'diagnostic' | 'moteur' | 'freinage' | 'entretien' | 'general';
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  source: 'Google' | 'Atelier';
  highlight?: string;
  likes?: number;
}
