/**
 * Données d'exemple pour les témoignages
 * Version JavaScript - À remplacer par les vraies données Firebase
 */
export const SAMPLE_TESTIMONIALS = [
  {
    clientName: 'Sarah Martin',
    clientAge: 28,
    clientLocation: 'Paris',
    rating: 5,
    title: 'Une transformation incroyable en 3 mois !',
    content: 'J\'ai toujours eu du mal avec le sport, mais Guillaume a su adapter son approche à ma personnalité. Ses conseils en nutrition ont été un game-changer. Je me sens enfin bien dans mon corps et j\'ai retrouvé confiance en moi. Les séances sont variées et jamais ennuyeuses !',
    type: 'before_after',
    isVerified: true,
    isPublic: true,
    featured: true,
    tags: ['perte de poids', 'confiance en soi', 'nutrition', 'motivation'],
    serviceType: 'Coaching Personnel',
    duration: '3 mois',
    program: 'Perte de poids',
    testimonialDate: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-20'),
    client: {
      name: 'Sarah Martin',
      age: 28,
      location: 'Paris',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=100&h=100&fit=crop&crop=face'
    },
    beforeAfter: {
      before: {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
        alt: 'Sarah avant transformation'
      },
      after: {
        url: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=600&fit=crop',
        alt: 'Sarah après transformation'
      },
      description: 'Transformation impressionnante de Sarah en 3 mois'
    },
    results: {
      'poids_perdu': '-12 kg',
      'masse_grasse': '-8%',
      'tour_taille': '-10 cm',
      'endurance': '+150%'
    }
  },
  
  {
    clientName: 'Thomas Dubois',
    clientAge: 35,
    clientLocation: 'Lyon',
    rating: 5,
    title: 'Remise en forme après blessure - Un accompagnement parfait',
    content: 'Après une blessure au dos, j\'avais perdu toute motivation pour le sport. Guillaume m\'a accompagné pas à pas dans ma rééducation et ma remise en forme. Aujourd\'hui, je suis plus fort qu\'avant ma blessure ! Son professionnalisme et sa patience ont fait toute la différence.',
    type: 'video',
    isVerified: true,
    isPublic: true,
    featured: true,
    tags: ['rééducation', 'blessure', 'remise en forme', 'force'],
    serviceType: 'Coaching Personnel',
    duration: '6 mois',
    program: 'Rééducation',
    testimonialDate: new Date('2024-02-20'),
    publishedAt: new Date('2024-02-25'),
    client: {
      name: 'Thomas Dubois',
      age: 35,
      location: 'Lyon',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    video: {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      title: 'Témoignage de Thomas - Retour au sport après blessure',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      duration: 180
    },
    results: {
      'force': '+40%',
      'flexibilite': '+60%',
      'douleur': '-90%',
      'moral': '+200%'
    }
  },

  {
    clientName: 'Marie Leroy',
    clientAge: 42,
    clientLocation: 'Mouans-Sartoux',
    rating: 5,
    title: 'Préparation marathon réussie !',
    content: 'Guillaume m\'a aidée à préparer mon premier marathon. Grâce à son programme d\'entraînement personnalisé et ses conseils nutritionnels, j\'ai non seulement terminé la course, mais j\'ai aussi amélioré mon temps de 30 minutes par rapport à mes attentes ! Un coach exceptionnel.',
    type: 'standard',
    isVerified: true,
    isPublic: true,
    featured: false,
    tags: ['marathon', 'endurance', 'objectif', 'performance'],
    serviceType: 'Coaching en Ligne',
    duration: '4 mois',
    program: 'Préparation marathon',
    testimonialDate: new Date('2024-03-10'),
    publishedAt: new Date('2024-03-15'),
    client: {
      name: 'Marie Leroy',
      age: 42,
      location: 'Mouans-Sartoux',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    results: {
      'temps_marathon': '4h15',
      'VMA': '+25%',
      'endurance': '+80%',
      'poids': '-5 kg'
    }
  },

  {
    clientName: 'Antoine Moreau',
    clientAge: 29,
    clientLocation: 'Toulouse',
    rating: 5,
    title: 'Prise de masse réussie - Enfin des résultats !',
    content: 'Ectomorphe depuis toujours, j\'avais du mal à prendre du muscle malgré mes efforts. Le programme de Guillaume et ses conseils en nutrition ont révolutionné ma approche. +10kg de muscle en 6 mois, je n\'en revenais pas ! Merci pour cette transformation.',
    type: 'before_after',
    isVerified: true,
    isPublic: true,
    featured: true,
    tags: ['prise de masse', 'ectomorphe', 'muscle', 'nutrition'],
    serviceType: 'Coaching Personnel',
    duration: '6 mois',
    program: 'Prise de masse',
    testimonialDate: new Date('2024-04-05'),
    publishedAt: new Date('2024-04-10'),
    client: {
      name: 'Antoine Moreau',
      age: 29,
      location: 'Toulouse',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    beforeAfter: {
      before: {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
        alt: 'Antoine avant prise de masse'
      },
      after: {
        url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=600&fit=crop',
        alt: 'Antoine après prise de masse'
      },
      description: 'Transformation remarquable d\'Antoine en 6 mois'
    },
    results: {
      'poids': '+10 kg',
      'masse_musculaire': '+15%',
      'force': '+60%',
      'confiance': '+300%'
    }
  },

  {
    clientName: 'Julie Petit',
    clientAge: 26,
    clientLocation: 'Nice',
    rating: 4,
    title: 'Reprise du sport en douceur',
    content: 'Après 3 ans sans sport, Guillaume m\'a aidée à retrouver le goût de l\'effort en douceur. Ses séances sont parfaitement adaptées et progressives. Je recommande vivement pour toutes celles qui veulent reprendre une activité physique sans se brusquer.',
    type: 'standard',
    isVerified: true,
    isPublic: true,
    featured: false,
    tags: ['reprise sport', 'douceur', 'progression', 'motivation'],
    serviceType: 'Coaching Collectif',
    duration: '2 mois',
    program: 'Remise en forme',
    testimonialDate: new Date('2024-05-15'),
    publishedAt: new Date('2024-05-20'),
    client: {
      name: 'Julie Petit',
      age: 26,
      location: 'Nice',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face'
    },
    results: {
      'endurance': '+50%',
      'flexibilite': '+40%',
      'motivation': '+100%',
      'bien_etre': '+80%'
    }
  }
];