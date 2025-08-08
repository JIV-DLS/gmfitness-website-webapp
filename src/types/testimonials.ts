import { BaseEntity } from './common';

export interface Testimonial extends BaseEntity {
  clientName: string;
  clientAge?: number;
  clientLocation?: string;
  rating: number; // 1-5 stars
  title: string;
  content: string;
  type: TestimonialType;
  isVerified: boolean;
  isPublic: boolean;
  featured: boolean; // Pour mettre en avant certains témoignages
  tags: string[]; // Ex: ["perte de poids", "motivation", "résultats"]
  
  // Médias
  beforeAfterImages?: BeforeAfterImages;
  videoTestimonial?: VideoTestimonial;
  clientPhoto?: string; // URL de la photo du client
  
  // Métadonnées
  serviceType: string; // Type de service utilisé
  duration: string; // Durée d'accompagnement (ex: "3 mois")
  results?: ClientResults;
  
  // Dates
  testimonialDate: Date;
  publishedAt?: Date;
}

export type TestimonialType = 'text' | 'video' | 'before_after' | 'mixed';

export interface BeforeAfterImages {
  before: string; // URL de l'image avant
  after: string; // URL de l'image après
  caption?: string;
  timeBetween: string; // Ex: "3 mois d'écart"
}

export interface VideoTestimonial {
  url: string;
  thumbnail: string;
  duration: number; // en secondes
  platform: VideoHostingPlatform;
  videoId: string; // ID spécifique à la plateforme
  transcript?: string; // Transcription optionnelle
}

export type VideoHostingPlatform = 'youtube' | 'vimeo' | 'firebase' | 'cloudinary' | 'custom';

export interface ClientResults {
  weightLoss?: number; // kg perdus
  muscleGain?: number; // kg de muscle gagnés
  bodyFatReduction?: number; // % de graisse perdue
  measurements?: {
    waist?: { before: number; after: number };
    chest?: { before: number; after: number };
    hips?: { before: number; after: number };
    arms?: { before: number; after: number };
  };
  fitnessGoals: string[]; // Objectifs atteints
  personalAchievements: string[]; // Réussites personnelles
}

export interface CoachingVideo extends BaseEntity {
  title: string;
  description: string;
  category: VideoCategory;
  tags: string[];
  
  // Vidéo
  video: VideoTestimonial;
  thumbnail: string;
  
  // Métadonnées
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // durée en minutes
  equipment?: string[]; // Matériel nécessaire
  targetMuscles?: string[]; // Groupes musculaires ciblés
  
  // Engagement
  views: number;
  likes: number;
  
  // Visibilité
  isPublic: boolean;
  isPremium: boolean; // Pour clients premium seulement
  
  publishedAt?: Date;
}

export type VideoCategory = 
  | 'workout' // Séances d'entraînement
  | 'nutrition' // Conseils nutrition
  | 'motivation' // Vidéos motivation
  | 'technique' // Techniques d'exercices
  | 'testimonial' // Témoignages
  | 'behind_scenes' // Coulisses
  | 'q_and_a'; // Questions/Réponses

export interface TestimonialFilters {
  type?: TestimonialType;
  rating?: number; // Minimum rating
  serviceType?: string;
  tags?: string[];
  featured?: boolean;
  hasVideo?: boolean;
  hasBeforeAfter?: boolean;
}

export interface TestimonialStats {
  total: number;
  averageRating: number;
  byRating: Record<number, number>; // Nombre de témoignages par note
  byServiceType: Record<string, number>;
  byTags: Record<string, number>;
  featuredCount: number;
  videoCount: number;
  beforeAfterCount: number;
}

// Configuration pour l'hébergement vidéo
export interface VideoHostingConfig {
  firebase?: {
    storageBucket: string;
    maxFileSize: number; // en MB
  };
  youtube?: {
    apiKey: string;
    channelId: string;
  };
  vimeo?: {
    accessToken: string;
    clientId: string;
  };
  cloudinary?: {
    cloudName: string;
    apiKey: string;
    uploadPreset: string;
  };
}

// Pour l'upload de vidéos
export interface VideoUploadProgress {
  file: File;
  progress: number; // 0-100
  status: 'uploading' | 'processing' | 'completed' | 'error';
  url?: string;
  error?: string;
}