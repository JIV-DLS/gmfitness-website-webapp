import { BaseEntity, ContactInfo } from './common';

export interface Coach extends BaseEntity {
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  contact: ContactInfo;
  socialMedia: SocialMediaLinks;
  statistics: CoachStatistics;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  displayName: string;
  bio: string;
  profileImage?: string;
  philosophy: string;
}

export interface ProfessionalInfo {
  experience: number; // years
  certifications: Certification[];
  specializations: Specialization[];
  achievements: Achievement[];
}

export interface Certification {
  name: string;
  issuedBy: string;
  issuedDate: Date;
  expirationDate?: Date;
  credentialId?: string;
}

export interface Specialization {
  name: string;
  description: string;
  icon: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: Date;
  category: 'certification' | 'award' | 'milestone';
}

export interface SocialMediaLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
}

export interface CoachStatistics {
  clientsTransformed: number;
  yearsExperience: number;
  successRate: number;
  sessionsCompleted: number;
}