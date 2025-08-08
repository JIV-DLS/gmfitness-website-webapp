import { Coach } from '@/types/coach';

/**
 * Données du coach - Pattern Singleton/Configuration
 * Centralise toutes les informations du coach
 */
export const COACH_DATA: Coach = {
  id: 'gilson-mendes-coach',
  personalInfo: {
    firstName: 'Gilson',
    lastName: 'Mendes',
    displayName: 'Gilson Mendes',
    bio: 'Coach sportif diplômé, passionné par la transformation physique et le bien-être. Ancien sportif de haut niveau, formé en psychologie, yoga et Pilates. Approche holistique corps-esprit.',
    philosophy: 'Chaque personne est unique et mérite un accompagnement sur-mesure. Mon approche holistique combine exercice, nutrition et bien-être mental pour des transformations durables.'
  },
  professionalInfo: {
    experience: 8,
    certifications: [
      {
        name: 'BPJEPS AGFF',
        issuedBy: 'Ministère des Sports',
        issuedDate: new Date('2016-06-15'),
        credentialId: 'BPJEPS-2016-GM'
      },
      {
        name: 'CrossFit Level 1',
        issuedBy: 'CrossFit Inc.',
        issuedDate: new Date('2018-03-20'),
        expirationDate: new Date('2026-03-20'),
        credentialId: 'CF-L1-2018-GM'
      },
      {
        name: 'Nutrition Sportive',
        issuedBy: 'CNAM',
        issuedDate: new Date('2019-09-10'),
        credentialId: 'NS-2019-GM'
      }
    ],
    specializations: [
      {
        name: 'Perte de poids',
        description: 'Programmes personnalisés pour une perte de poids saine et durable',
        icon: '⚖️'
      },
      {
        name: 'Prise de masse',
        description: 'Développement musculaire ciblé avec nutrition adaptée',
        icon: '💪'
      },
      {
        name: 'Préparation physique',
        description: 'Entraînement spécialisé pour athlètes et compétiteurs',
        icon: '🏃‍♂️'
      },
      {
        name: 'Rééducation',
        description: 'Accompagnement post-blessure et renforcement préventif',
        icon: '🏥'
      }
    ],
    achievements: [
      {
        title: 'Formations multiples',
        description: 'Licence psychologie, certifications yoga et Pilates',
        date: new Date('2024-01-01'),
        category: 'milestone'
      },
      {
        title: 'Ancien sportif haut niveau',
        description: 'Expérience compétition, discipline et performance',
        date: new Date('2023-12-31'),
        category: 'milestone'
      },
      {
        title: 'Approche holistique',
        description: 'Renforcement, mobilité, yoga, méditation, coaching mental',
        date: new Date('2023-12-15'),
        category: 'award'
      }
    ]
  },
  contact: {
    phone: '06 17 04 35 99',
    email: 'gilson.mendes-landim@hotmail.com',
    location: 'Mouans-Sartoux (06370) - Côte d\'Azur',
    availability: 'Sur rendez-vous - Flexibilité horaire'
  },
  socialMedia: {
    instagram: 'https://instagram.com/gilsonmendes_coach',
    facebook: 'https://facebook.com/gilsonmendes',
    youtube: 'https://youtube.com/@gilsonmendes'
  },
  statistics: {
    clientsTransformed: 200,
    yearsExperience: 8,
    successRate: 95,
    sessionsCompleted: 2500
  }
};