import { Service, ServiceCategory } from '@/types/services';

/**
 * Catégories de services
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'individual',
    name: 'Coaching Individuel',
    color: 'bg-red-500',
    description: 'Accompagnement personnalisé one-to-one'
  },
  {
    id: 'group',
    name: 'Coaching Collectif',
    color: 'bg-blue-500',
    description: 'Entraînements en petits groupes'
  },
  {
    id: 'online',
    name: 'Coaching Digital',
    color: 'bg-green-500',
    description: 'Solutions en ligne et à distance'
  },
  {
    id: 'nutrition',
    name: 'Nutrition & Bien-être',
    color: 'bg-purple-500',
    description: 'Accompagnement nutritionnel complet'
  }
];

/**
 * Services proposés - Pattern Repository
 */
export const SERVICES_DATA: Service[] = [
  {
    id: 'coaching-personnel',
    title: 'Coaching Personnel',
    description: 'Séances individuelles adaptées à vos objectifs et votre niveau. Suivi personnalisé et progression garantie.',
    icon: '💪',
    features: [
      'Programmes sur-mesure',
      'Suivi nutritionnel',
      'Motivation constante',
      'Résultats rapides'
    ],
    price: '120€/séance',
    duration: '60 minutes',
    category: SERVICE_CATEGORIES[0],
    isPopular: true,
    maxParticipants: 1
  },
  {
    id: 'coaching-collectif',
    title: 'Coaching Collectif',
    description: 'Entraînements en petits groupes pour partager la motivation et réduire les coûts.',
    icon: '👥',
    features: [
      'Groupes de 3-5 personnes',
      'Ambiance conviviale',
      'Prix réduit',
      'Émulation de groupe'
    ],
    price: '25€/séance',
    duration: '45 minutes',
    category: SERVICE_CATEGORIES[1],
    maxParticipants: 5
  },
  {
    id: 'coaching-online',
    title: 'Coaching en Ligne',
    description: 'Programmes d\'entraînement personnalisés à faire chez vous avec suivi vidéo.',
    icon: '🏠',
    features: [
      'Flexibilité horaire',
      'Suivi vidéo',
      'Plans nutrition',
      'Support 7j/7'
    ],
    price: '35€/mois',
    category: SERVICE_CATEGORIES[2],
    isPopular: true
  },
  {
    id: 'coaching-nutrition',
    title: 'Coaching Nutrition',
    description: 'Plans alimentaires personnalisés pour optimiser vos résultats et votre santé.',
    icon: '🥗',
    features: [
      'Bilan nutritionnel',
      'Menus personnalisés',
      'Recettes adaptées',
      'Suivi hebdomadaire'
    ],
    price: '80€/mois',
    category: SERVICE_CATEGORIES[3]
  }
];

/**
 * Options pour les formulaires
 */
export const SERVICE_OPTIONS = SERVICES_DATA.map(service => ({
  value: service.id,
  label: service.title
}));