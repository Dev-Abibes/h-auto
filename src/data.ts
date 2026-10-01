import { Service, GalleryItem, OpeningHour, Appointment, Testimonial } from './types';

// @ts-ignore
import imgFacadeSign from './assets/images/garage_facade_sign_1784092510715.jpg';
// @ts-ignore
import imgOfficeInterior from './assets/images/garage_office_interior_1784092527945.jpg';
// @ts-ignore
import imgExteriorView from './assets/images/garage_exterior_view_1784092540844.jpg';
// @ts-ignore
import imgMeganeGrey from './assets/images/garage_megane_grey_1784092551181.jpg';

export const SERVICES: Service[] = [
  {
    id: 'entretien_auto',
    name: 'Entretien Auto : Révision et Vidange',
    description: 'Vidange moteur et remplacement des filtres pour maintenir les performances optimales de votre auto.',
    detailedDescription: 'La révision et la vidange régulières sont les clés de la longévité de votre moteur. Nous réalisons la vidange avec l\'huile recommandée par le constructeur, remplaçons le filtre à huile et effectuons un contrôle systématique des points de sécurité clés (niveaux, freins, pneus).',
    priceEstimate: 'À partir de 79 €',
    duration: '1h',
    iconName: 'Droplet'
  },
  {
    id: 'courroie_distribution',
    name: 'Changement Courroie de Distribution',
    description: 'Remplacement préventif de la courroie de distribution, galets tendeurs et pompe à eau.',
    detailedDescription: 'Le kit de distribution est un organe vital du moteur. Son remplacement préventif selon le carnet d\'entretien constructeur évite des casses moteur et des réparations extrêmement coûteuses. Nous remplaçons la courroie, les galets et la pompe à eau.',
    priceEstimate: 'À partir de 349 €',
    duration: '3h - 5h',
    iconName: 'Activity'
  },
  {
    id: 'disques_plaquettes',
    name: 'Changement Disques et Plaquettes de Frein',
    description: 'Contrôle de l’usure et remplacement des plaquettes et disques de frein pour un freinage sûr.',
    detailedDescription: 'Indispensable pour votre sécurité sur la route, le système de freinage doit être inspecté régulièrement. Nous installons des pièces de qualité d’origine pour assurer puissance de freinage et longévité à votre système.',
    priceEstimate: 'À partir de 65 €',
    duration: '1h 15 min',
    iconName: 'Disc'
  },
  {
    id: 'amortisseur',
    name: 'Changement Amortisseur',
    description: 'Remplacement des amortisseurs avant ou arrière et des coupelles de suspension.',
    detailedDescription: 'Des amortisseurs usés augmentent les distances de freinage et dégradent le confort de conduite. Notre équipe remplace vos amortisseurs en paire pour conserver l\'équilibre dynamique du véhicule.',
    priceEstimate: 'À partir de 120 €',
    duration: '1h 30 min',
    iconName: 'ArrowUpDown'
  },
  {
    id: 'embrayage',
    name: 'Changement d\'Embrayage',
    description: 'Remplacement du kit d\'embrayage complet (disque, mécanisme, butée) et du volant moteur.',
    detailedDescription: 'Si les vitesses passent difficilement ou si le moteur monte dans les tours sans transmettre la puissance, votre embrayage est fatigué. Nous effectuons le remplacement complet pour vous redonner une transmission fluide.',
    priceEstimate: 'Sur devis',
    duration: '4h - 6h',
    iconName: 'Gauge'
  },
  {
    id: 'liquide_refroidissement',
    name: 'Purge Liquide de Refroidissement',
    description: 'Vidange, nettoyage complet du circuit et remplacement du liquide de refroidissement.',
    detailedDescription: 'Le liquide de refroidissement perd ses propriétés protectrices anti-corrosion avec le temps. Nous vidangeons entièrement le circuit et l\'approvisionnons avec un liquide neuf conforme aux normes constructeurs pour éviter la surchauffe.',
    priceEstimate: 'À partir de 59 €',
    duration: '45 min',
    iconName: 'Thermometer'
  },
  {
    id: 'diagnostic_electronique',
    name: 'Diagnostic avec Valise (Électronique)',
    description: 'Lecture et effacement des codes défauts moteur ou habitacle via une valise de diagnostic multimarque de pointe.',
    detailedDescription: 'Un voyant s’allume sur votre tableau de bord ou vous constatez une anomalie mécanique ? Grâce à notre valise de diagnostic connectée de dernière génération, nous analysons en temps réel les calculateurs électroniques de votre voiture pour localiser précisément l\'origine de la panne.\n\n• Diagnostic 30 minutes : 30 €\n• Diagnostic 1 heure : 60 €\n\n★ OFFRE SPÉCIALE ATELIER : Si la prestation ou la réparation nécessaire est réalisée dans notre garage, le coût du diagnostic est 100% OFFERT (0 € déduit sur votre facture finale) !',
    priceEstimate: '30 € (30 min) / 60 € (1h)',
    duration: '30 min ou 1h',
    iconName: 'Cpu',
    specialOffer: 'OFFERT (0 €) si la prestation est réalisée chez nous',
    isOfferHighlight: true
  },
  {
    id: 'liquide_frein',
    name: 'Purge Liquide de Frein',
    description: 'Vidange et remplacement complet du fluide hydraulique pour maintenir une pédale ferme.',
    detailedDescription: 'Le liquide de frein absorbe l\'humidité ambiante, ce qui réduit son point d\'ébullition et l\'efficacité du freinage lors d\'arrêts répétés. Une purge complète est recommandée tous les 2 ans pour préserver l\'efficacité.',
    priceEstimate: 'À partir de 45 €',
    duration: '45 min',
    iconName: 'Droplet'
  },
  {
    id: 'vitrage_fume',
    name: 'Pose de Vitres Teintées (Vitrage Fumé)',
    description: 'Pose de films solaires teintés haut de gamme pour une protection thermique et une intimité préservée.',
    detailedDescription: 'Nous appliquons des films solaires fumés homologués sur vos vitrages. Cette prestation protège efficacement l\'habitacle de la chaleur et des rayons UV, préserve votre intimité contre les regards indiscrets et renforce la sécurité des vitres en cas de bris.',
    priceEstimate: 'À partir de 149 €',
    duration: '2h - 3h',
    iconName: 'Sparkles'
  },
  {
    id: 'batterie',
    name: 'Changer Batterie Voiture',
    description: 'Test de charge, remplacement par une batterie de haute qualité et configuration électronique.',
    detailedDescription: 'Une batterie défaillante est la première cause de panne. Nous testons votre alternateur et la batterie, puis installons une batterie neuve de grande marque adaptée à votre modèle (compatible Start & Stop).',
    priceEstimate: 'À partir de 89 €',
    duration: '20 min',
    iconName: 'Battery'
  },
  {
    id: 'bougies',
    name: 'Changement Bougies d\'Allumage',
    description: 'Remplacement des bougies d\'allumage (essence) ou de préchauffage (diesel).',
    detailedDescription: 'Des bougies usées provoquent des ratés d\'allumage, une hausse de consommation de carburant et encrassent le moteur. Nous installons des bougies adaptées de marques réputées (Bosch, NGK) pour un démarrage parfait.',
    priceEstimate: 'À partir de 49 €',
    duration: '30 min',
    iconName: 'Zap'
  },
  {
    id: 'pot_echappement',
    name: 'Changer de Pot d\'Échappement',
    description: 'Remplacement du silencieux arrière, intermédiaire ou de la ligne complète d\'échappement.',
    detailedDescription: 'Un pot d\'échappement percé engendre des bruits anormaux et fausse les mesures de pollution. Nous inspectons la ligne et remplaçons uniquement les éléments usés pour un coût maîtrisé.',
    priceEstimate: 'À partir de 99 €',
    duration: '1h',
    iconName: 'Wind'
  },
  {
    id: 'diagnostic_securite',
    name: 'Diagnostic Sécurité',
    description: 'Contrôle visuel rigoureux de 50 points essentiels de votre auto avant de prendre la route.',
    detailedDescription: 'Pour prendre la route des vacances en toute sérénité ou simplement faire le point, notre diagnostic sécurité inspecte rigoureusement tous les éléments critiques : freinage, pneumatiques, direction, éclairage et niveaux.',
    priceEstimate: '39 €',
    duration: '45 min',
    iconName: 'ShieldCheck'
  },
  {
    id: 'controle_technique',
    name: 'Pré Contrôle Technique',
    description: 'Examen de votre voiture avant le passage officiel pour vous éviter une contre-visite payante.',
    detailedDescription: 'Nous anticipons les points de contrôle majeurs soumis à contre-visite lors du contrôle technique officiel. Si des anomalies sont détectées, nous vous proposons un devis de mise en conformité immédiat.',
    priceEstimate: '49 €',
    duration: '1h',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'alternateur',
    name: 'Changer Alternateur',
    description: 'Remplacement de l’alternateur défectueux pour restaurer la recharge de votre batterie.',
    detailedDescription: 'L\'alternateur fournit l\'électricité au véhicule et recharge la batterie lorsque le moteur tourne. Si le voyant batterie s\'allume ou si les phares faiblissent, l\'alternateur doit généralement être remplacé.',
    priceEstimate: 'À partir de 189 €',
    duration: '1h 30 min',
    iconName: 'RefreshCw'
  },
  {
    id: 'injecteur',
    name: 'Injecteur',
    description: 'Diagnostic de débit, nettoyage ou remplacement des injecteurs pour un moteur performant.',
    detailedDescription: 'Les injecteurs pulvérisent le carburant sous haute pression. Un injecteur encrassé provoque des à-coups moteur, de la fumée d\'échappement noire et d\'importantes pertes de puissance. Nous les remplaçons ou nettoyons.',
    priceEstimate: 'Sur devis',
    duration: '1h 30 min - 3h',
    iconName: 'Filter'
  },
  {
    id: 'cardan',
    name: 'Changer Cardan',
    description: 'Remplacement du cardan de transmission ou du soufflet de protection étanche.',
    detailedDescription: 'Les cardans transmettent l\'énergie du moteur aux roues. Un claquement régulier en virage serré indique un cardan usé qui doit être remplacé au plus vite pour éviter de rompre la transmission.',
    priceEstimate: 'À partir de 119 €',
    duration: '1h 15 min',
    iconName: 'Wrench'
  },
  {
    id: 'filtre_habitacle',
    name: 'Changer Filtre Habitacle',
    description: 'Remplacement du filtre à pollen et charbon actif pour purifier l’air de la climatisation.',
    detailedDescription: 'Le filtre d’habitacle retient le pollen, la poussière et les particules fines à l’extérieur de votre véhicule. Un filtre propre prévient les mauvaises odeurs dans l\'habitacle et la formation de buée.',
    priceEstimate: 'À partir de 29 €',
    duration: '15 min',
    iconName: 'Wind'
  },
  {
    id: 'eco_diagnostic',
    name: 'Eco diagnostic auto',
    description: 'Mesure de vos gaz d’échappement pour déceler l’encrassement moteur et moins polluer.',
    detailedDescription: 'Grâce à notre équipement d\'analyse de gaz connecté de pointe, nous déterminons si votre moteur est calaminé. Cela vous permet d\'agir pour baisser votre consommation et réussir l\'analyse pollution.',
    priceEstimate: '39 €',
    duration: '30 min',
    iconName: 'Leaf'
  },
  {
    id: 'rotule_direction',
    name: 'Changer Rotule de Direction',
    description: 'Remplacement des rotules de direction pour une tenue de cap précise et sécurisante.',
    detailedDescription: 'Une rotule usée entraîne un jeu anormal dans la direction et dégrade la précision de votre conduite. Nous remplaçons la rotule défectueuse pour un comportement routier sain et rigoureux.',
    priceEstimate: 'À partir de 49 €',
    duration: '45 min',
    iconName: 'Sliders'
  },
  {
    id: 'voiture_electrique',
    name: 'Entretien voiture électrique',
    description: 'Prestations d\'entretien spécifiques pour véhicules hybrides et 100% électriques.',
    detailedDescription: 'Les véhicules électriques et hybrides nécessitent une habilitation spécifique. Nos techniciens qualifiés interviennent en toute sécurité pour le contrôle des circuits haute tension, la climatisation et les consommables.',
    priceEstimate: 'Sur devis',
    duration: '1h',
    iconName: 'Sparkles'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // Notre Garage Category (matching the uploaded pictures structure)
  {
    id: 'garage_ext_1',
    url: imgExteriorView,
    caption: 'Vue générale de notre atelier H-AUTO au 5 rue des remouleurs à Cormontreuil',
    category: 'garage'
  },
  {
    id: 'garage_office_interior',
    url: imgOfficeInterior,
    caption: 'Notre bureau d’accueil chaleureux et moderne aux couleurs marine et blanche pour vous recevoir',
    category: 'office'
  },
  {
    id: 'garage_facade_sign',
    url: imgFacadeSign,
    caption: 'Notre enseigne officielle H-AUTO répertoriant nos prestations de mécanique générale',
    category: 'garage'
  },
  {
    id: 'garage_megane_grey',
    url: imgMeganeGrey,
    caption: 'Véhicule client (Renault Mégane 5 grise) stationné devant notre atelier',
    category: 'garage'
  },
  // Pièces Mécaniques Category
  {
    id: 'part_engine',
    url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=1200',
    caption: 'Bloc moteur et composants mécaniques haute performance',
    category: 'mechanical'
  },
  {
    id: 'part_brake',
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200',
    caption: 'Système de freinage : remplacement de disque et plaquette de frein ventilé',
    category: 'mechanical'
  },
  {
    id: 'part_gears',
    url: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=1200',
    caption: 'Engrenages mécaniques internes d’une transmission',
    category: 'mechanical'
  }
];

export const OPENING_HOURS: OpeningHour[] = [
  { day: 'Lundi', hours: '09:00 - 18:00', isClosed: false },
  { day: 'Mardi', hours: '09:00 - 18:00', isClosed: false },
  { day: 'Mercredi', hours: '09:00 - 18:00', isClosed: false },
  { day: 'Jeudi', hours: '09:00 - 18:00', isClosed: false },
  { day: 'Vendredi', hours: '09:00 - 18:00', isClosed: false },
  { day: 'Samedi', hours: '09:00 - 18:00', isClosed: false },
  { day: 'Dimanche', hours: 'Fermé et jours fériés', isClosed: true }
];

export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_1',
    ref: 'AD-2026-8941',
    clientName: 'Marc Dubois',
    clientEmail: 'marc.dubois@email.com',
    clientPhone: '06 12 34 56 78',
    carBrand: 'Peugeot',
    carModel: '208',
    carYear: '2019',
    licensePlate: 'AA-123-BB',
    serviceId: 'entretien_auto',
    date: '2026-07-16',
    timeSlot: '10:00',
    status: 'confirmed',
    notes: 'Révision annuelle complète avec changement du filtre d’habitacle s’il vous plaît.',
    createdAt: '2026-07-14T10:30:00Z'
  },
  {
    id: 'apt_2',
    ref: 'AD-2026-4512',
    clientName: 'Sophie Lambert',
    clientEmail: 'sophie.l@email.com',
    clientPhone: '07 89 45 12 36',
    carBrand: 'Renault',
    carModel: 'Clio IV',
    carYear: '2016',
    licensePlate: 'EK-458-MZ',
    serviceId: 'disques_plaquettes',
    date: '2026-07-17',
    timeSlot: '14:30',
    status: 'pending',
    notes: 'Sifflement au freinage à l’avant gauche. À contrôler.',
    createdAt: '2026-07-14T14:15:00Z'
  },
  {
    id: 'apt_3',
    ref: 'AD-2026-7821',
    clientName: 'Jean-Pierre Martin',
    clientEmail: 'jp.martin@email.com',
    clientPhone: '06 55 99 88 77',
    carBrand: 'Citroën',
    carModel: 'C4 Spacetourer',
    carYear: '2018',
    licensePlate: 'FR-987-AA',
    serviceId: 'courroie_distribution',
    date: '2026-07-20',
    timeSlot: '09:00',
    status: 'confirmed',
    notes: 'Changement kit de distribution + pompe à eau suite à échéance constructeur (120 000 km).',
    createdAt: '2026-07-13T09:00:00Z'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi_1',
    author: 'Karim B.',
    location: 'Reims (51100)',
    vehicle: 'Volkswagen Golf VII 2.0 TDI',
    service: 'Diagnostic Valise (Offert) & Sonde Lambda',
    category: 'diagnostic',
    rating: 5,
    date: 'Il y a 3 jours',
    comment: 'Voyant moteur allumé soudainement. Diagnostic valise réalisé en 30 minutes avec explications complètes sur écran. Et comme annoncé, le diagnostic était 100% OFFERT (0 € déduit sur la facture) car j’ai fait effectuer le remplacement de la sonde sur place ! Transparence exemplaire et accueil irréprochable.',
    verified: true,
    source: 'Google',
    highlight: 'Diagnostic 0 € si réparation',
    likes: 24
  },
  {
    id: 'testi_2',
    author: 'Valérie M.',
    location: 'Cormontreuil (51350)',
    vehicle: 'Peugeot 3008 BlueHDi',
    service: 'Kit Courroie de Distribution & Pompe à Eau',
    category: 'moteur',
    rating: 5,
    date: 'Il y a 1 semaine',
    comment: 'Kit de distribution fait chez H-AUTO suite à préconisation constructeur. Devis clair et respecté à l’euro près, aucune mauvaise surprise. Véhicule récupéré le jour même dans un état impeccable. C’est rare de trouver des mécaniciens aussi honnêtes et pro.',
    verified: true,
    source: 'Google',
    highlight: 'Devis respecté à l’euro près',
    likes: 19
  },
  {
    id: 'testi_3',
    author: 'Thomas D.',
    location: 'Taissy (51500)',
    vehicle: 'Renault Clio V TCe',
    service: 'Disques & Plaquettes de Frein avant',
    category: 'freinage',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Prise en charge très rapide pour un contrôle de freinage. Disques et plaquettes remplacés avec des pièces d’origine de qualité. Tarif bien plus juste qu’en concession officielle. Le bureau d’accueil est moderne et l’équipe prend le temps d’expliquer.',
    verified: true,
    source: 'Google',
    highlight: 'Rapidité & pièces d’origine',
    likes: 15
  },
  {
    id: 'testi_4',
    author: 'Philippe & Sylvie L.',
    location: 'Épernay (51200)',
    vehicle: 'Citroën C4 Grand Picasso',
    service: 'Changement Alternateur en urgence',
    category: 'moteur',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment: 'Panne de batterie/alternateur sur la route des vacances. Pris en charge dès 9h le matin, alternateur neuf monté l’après-midi. Sauvetage express de notre weekend en famille ! Un grand merci pour votre réactivité et votre grande gentillesse.',
    verified: true,
    source: 'Google',
    highlight: 'Prise en charge d’urgence',
    likes: 31
  },
  {
    id: 'testi_5',
    author: 'Nadia A.',
    location: 'Cormontreuil (51350)',
    vehicle: 'Audi A3 Sportback',
    service: 'Révision Complète & Vidange 50 points',
    category: 'entretien',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Entretien annuel complet : vidange, filtres et contrôle des 50 points de sécurité. Rapport d’intervention détaillé et transparent, sans forcer la main pour changer des pièces encore bonnes. Confiance totale envers ce garage !',
    verified: true,
    source: 'Atelier',
    highlight: 'Conseils honnêtes sans survente',
    likes: 18
  },
  {
    id: 'testi_6',
    author: 'Sébastien R.',
    location: 'Bétheny (51450)',
    vehicle: 'Ford Focus EcoBoost',
    service: 'Diagnostic Valise & Recharge Climatisation',
    category: 'diagnostic',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Recharge clim et passage à la valise suite à une petite perte de puissance. Tout a été résolu en un temps record. Les explications du mécanicien étaient très pédagogiques. Je reviendrai les yeux fermés pour mes prochains entretiens.',
    verified: true,
    source: 'Google',
    highlight: 'Pédagogie & efficacité',
    likes: 12
  }
];
