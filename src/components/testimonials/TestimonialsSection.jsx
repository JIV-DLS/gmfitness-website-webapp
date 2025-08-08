import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

/**
 * Section simplifiée des témoignages
 */
const TestimonialsSection = memo(({
  className = '',
  showStats = true,
  maxTestimonials = 12
}) => {
  const { t } = useI18n();

  // Données de témoignages avec avis Google authentiques
  const testimonials = [
    // AVIS GOOGLE AUTHENTIQUES - VRAIS TÉMOIGNAGES
    {
      id: 1,
      type: 'google_review',
      client: {
        name: 'Pierre A.',
        location: 'Côte d\'Azur',
        photo: '💪',
        initials: 'PA'
      },
      rating: 5,
      content: 'Gilson est un super coach en plus d\'être quelqu\'un de très sympathique et attentionné. Très bon suivi et grande disponibilité, il m\'a fait progresser et dépasser mes objectifs. Je le recommande à 100 %.',
      date: '2024-10-15',
      verified: true,
      source: 'google',
      tags: ['sympathique', 'suivi', 'objectifs', 'recommande'],
      featured: true
    },
    {
      id: 2,
      type: 'google_review', 
      client: {
        name: 'Martine P.',
        location: 'Côte d\'Azur',
        photo: '🌟',
        initials: 'MP'
      },
      rating: 5,
      content: 'Gilson est très sympathique et sérieux. Prend bien son temps pour expliquer les mouvements et les adapte aux personnes.',
      date: '2024-11-15',
      verified: true,
      source: 'google',
      tags: ['sympathique', 'adaptation', 'explication'],
      featured: true
    },
    {
      id: 3,
      type: 'google_review',
      client: {
        name: 'Laetitia S.',
        location: 'Côte d\'Azur',
        photo: '🏃‍♀️',
        initials: 'LS'
      },
      rating: 5,
      content: 'Gilson est un coach très professionnel, sympathique, à l\'écoute. Ses cours sont dynamiques. Il s\'adapte aux personnes présentes. Il explique bien les exercices et corrige bien les postures. Je recommande.',
      date: '2023-11-15',
      verified: true,
      source: 'google',
      tags: ['professionnel', 'dynamique', 'adaptation', 'postures'],
      featured: true
    },
    {
      id: 4,
      type: 'google_review',
      client: {
        name: 'Karim C.',
        location: 'Côte d\'Azur',
        photo: '🎯',
        initials: 'KC'
      },
      rating: 5,
      content: 'Gilson est un coach très à l\'écoute de tes envies, de tes ressentis, qui adapte ses programmes en fonction de ce que tu recherches, un suivi régulier et complet.',
      date: '2023-08-15',
      verified: true,
      source: 'google',
      tags: ['écoute', 'adaptation', 'programmes', 'suivi'],
      featured: true
    },
    {
      id: 5,
      type: 'google_review',
      client: {
        name: 'Coralie J.',
        location: 'Côte d\'Azur',
        photo: '⭐',
        initials: 'CJ'
      },
      rating: 5,
      content: 'Gilson est un coach en or. Il est très professionnel, patient et à l\'écoute. Il surveille la bonne exécution des mouvements.',
      date: '2023-09-15',
      verified: true,
      source: 'google',
      tags: ['coach en or', 'patient', 'professionnel', 'technique'],
      featured: true
    },
    {
      id: 6,
      type: 'google_review',
      client: {
        name: 'Antoine T.',
        location: 'Côte d\'Azur',
        photo: '🚀',
        initials: 'AT'
      },
      rating: 5,
      content: 'Coach au top, compétent et serviable qui s\'adapte aux besoins de chacun. Grosse évolution pour ma part sur 6 mois d\'entraînement. Vous pouvez y aller les yeux fermés, c\'est du PRO !!',
      date: '2023-09-15',
      verified: true,
      source: 'google',
      tags: ['compétent', 'évolution', '6 mois', 'professionnel'],
      featured: true
    },
    {
      id: 7,
      type: 'google_review',
      client: {
        name: 'Carla A.',
        location: 'Côte d\'Azur',
        photo: '💖',
        initials: 'CA'
      },
      rating: 5,
      content: 'Coach à l\'écoute et toujours positif. Il s\'adapte à tout type de situation. Il me suit depuis 5 mois et je remarque de réels changements au niveau de mon corps.',
      date: '2023-12-15',
      verified: true,
      source: 'google',
      tags: ['positif', 'adaptation', '5 mois', 'changements'],
      featured: true
    },
    {
      id: 8,
      type: 'google_review',
      client: {
        name: 'Darel P.',
        location: 'Côte d\'Azur',
        photo: '🔥',
        initials: 'DP'
      },
      rating: 5,
      content: 'Très bon coach à l\'écoute, m\'a transformé en l\'espace de 6 mois. Je vous le conseille fortement !! 💪',
      date: '2023-12-15',
      verified: true,
      source: 'google',
      tags: ['transformation', '6 mois', 'écoute', 'conseille'],
      featured: true
    },
    // TÉMOIGNAGES DÉTAILLÉS  
    {
      id: 10,
      client: {
        name: 'Sarah Martin',
        age: 28,
        location: 'Paris',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=100&h=100&fit=crop&crop=face'
      },
      rating: 5,
      content: 'Guillaume a transformé ma vie ! En 3 mois, j\'ai perdu 12kg et retrouvé ma confiance en moi. Son approche personnalisée et ses conseils nutrition ont fait toute la différence.',
      program: 'Perte de poids',
      duration: '3 mois',
      date: '2024-01-15',
      tags: ['perte de poids', 'nutrition', 'confiance'],
      featured: false
    },
    {
      id: 5,
      client: {
        name: 'Thomas Dubois',
        age: 35,
        location: 'Lyon',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      rating: 5,
      content: 'Après une blessure au dos, Guillaume m\'a accompagné dans ma rééducation. Aujourd\'hui je suis plus fort qu\'avant ! Un vrai professionnel.',
      program: 'Rééducation',
      duration: '6 mois', 
      date: '2024-02-20',
      tags: ['rééducation', 'blessure', 'force'],
      featured: false
    },
    {
      id: 6,
      client: {
        name: 'Marie Leroy',
        age: 42,
        location: 'Mouans-Sartoux',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      rating: 5,
      content: 'Grâce au programme de Guillaume, j\'ai terminé mon premier marathon ! Un rêve devenu réalité grâce à ses conseils experts.',
      program: 'Préparation marathon',
      duration: '4 mois',
      date: '2024-03-10',
      tags: ['marathon', 'endurance', 'objectif'],
      featured: false
    }
  ];

  const featuredTestimonials = testimonials.filter(t => t.featured);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
      >
        ⭐
      </span>
    ));
  };

  const TestimonialCard = ({ testimonial, variant = 'default' }) => (
    <motion.div
      className={`rounded-xl p-6 transition-all duration-300 ${
        variant === 'featured' 
          ? 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-700 shadow-lg' 
          : 'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Header avec photo et infos client */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          <img
            src={testimonial.client.photo}
            alt={testimonial.client.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-800 items-center justify-center border-2 border-gray-200 dark:border-gray-600 hidden">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-lg">
              {testimonial.client.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {testimonial.client.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.client.age} ans • {testimonial.client.location}
          </p>
          <div className="flex items-center mt-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>

        {variant === 'featured' && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200">
              ⭐ Coup de cœur
            </span>
          </div>
        )}
      </div>

      {/* Contenu du témoignage */}
      <blockquote className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        "{testimonial.content}"
      </blockquote>

      {/* Tags */}
      {testimonial.tags && testimonial.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {testimonial.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer avec date et programme */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            🏋️‍♀️ {testimonial.program}
          </span>
          <span className="flex items-center">
            ⏱️ {testimonial.duration}
          </span>
        </div>
        
        <time>{new Date(testimonial.date).toLocaleDateString()}</time>
      </div>
    </motion.div>
  );

  return (
    <section id="testimonials" className={`section-padding bg-gray-50 dark:bg-gray-800 ${className}`}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Témoignages <span className="text-primary-600 dark:text-primary-400">Clients</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Découvrez les transformations inspirantes de mes clients et leurs retours sur mon accompagnement.
          </p>

          {/* Statistiques */}
          {showStats && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">4.9</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Objectifs atteints</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">8+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Années d'expérience</div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Témoignages en vedette */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            ⭐ Témoignages en vedette
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                variant="featured" 
              />
            ))}
          </div>
        </motion.div>

        {/* Tous les témoignages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            📝 Tous les témoignages
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, maxTestimonials).map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                variant="default" 
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-primary-600 dark:bg-primary-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Prêt à commencer votre transformation ?</h3>
            <p className="text-lg mb-6 opacity-90">
              Rejoignez plus de 200 clients satisfaits et atteignez vos objectifs de forme !
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réserver ma séance gratuite
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;