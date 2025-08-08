import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { VideoPlayer } from './VideoPlayer';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { useI18n } from '@/hooks/useI18n';

// Props for TestimonialCard component

/**
 * Carte de témoignage avec support multi-média
 * Pattern: Composite + Strategy + Presentation
 */
export const TestimonialCard = memo(({
  testimonial,
  variant = 'default',
  showFullContent = false,
  className = ''
}) => {
  const { t, formatDate } = useI18n();
  const [expanded, setExpanded] = useState(showFullContent);
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, duration: 0.3 }}
      >
        ⭐
      </motion.span>
    ));
  };

  const renderContent = () => {
    if (!expanded && testimonial.content.length > 150) {
      return (
        <>
          {testimonial.content.substring(0, 150)}...
          <button
            onClick={() => setExpanded(true)}
            className="text-primary-600 dark:text-primary-400 hover:underline ml-2 font-medium"
          >
            {t('testimonials.readMore', 'Lire plus')}
          </button>
        </>
      );
    }
    
    return (
      <>
        {testimonial.content}
        {expanded && testimonial.content.length > 150 && (
          <button
            onClick={() => setExpanded(false)}
            className="text-primary-600 dark:text-primary-400 hover:underline ml-2 font-medium"
          >
            {t('testimonials.readLess', 'Lire moins')}
          </button>
        )}
      </>
    );
  };

  const cardVariants = {
    default: "bg-white dark:bg-gray-800 shadow-md hover:shadow-lg",
    featured: "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-700 shadow-lg hover:shadow-xl",
    compact: "bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"
  };

  const sizeVariants = {
    default: "p-6",
    featured: "p-8",
    compact: "p-4"
  };

  return (
    <motion.div
      className={`rounded-xl transition-all duration-300 ${cardVariants[variant]} ${sizeVariants[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Header avec photo et infos client */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          {testimonial.client.photo && !imageError ? (
            <img
              src={testimonial.client.photo}
              alt={testimonial.client.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
              <span className="text-primary-600 dark:text-primary-400 font-semibold text-lg">
                {testimonial.client.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {testimonial.client.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.client.age ? `${testimonial.client.age} ans • ` : ''}
            {testimonial.client.location}
          </p>
          <div className="flex items-center mt-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>

        {variant === 'featured' && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200">
              ⭐ {t('testimonials.featured', 'Coup de cœur')}
            </span>
          </div>
        )}
      </div>

      {/* Contenu du témoignage */}
      <blockquote className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        "{renderContent()}"
      </blockquote>

      {/* Médias (vidéo ou avant/après) */}
      {testimonial.video && (
        <div className="mb-4">
          <VideoPlayer
            video={testimonial.video}
            className="w-full max-h-64"
            controls={true}
          />
        </div>
      )}

      {testimonial.beforeAfter && (
        <div className="mb-4">
          <BeforeAfterSlider
            beforeAfter={testimonial.beforeAfter}
            className="w-full"
          />
        </div>
      )}

      {/* Tags et résultats */}
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

      {/* Résultats quantifiés */}
      {testimonial.results && Object.keys(testimonial.results).length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            📊 {t('testimonials.results.title', 'Résultats obtenus')}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(testimonial.results).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {t(`testimonials.results.${key}`, key)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer avec date et programme */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-4">
        <div className="flex items-center space-x-4">
          {testimonial.program && (
            <span className="flex items-center">
              🏋️‍♀️ {testimonial.program}
            </span>
          )}
          {testimonial.duration && (
            <span className="flex items-center">
              ⏱️ {testimonial.duration}
            </span>
          )}
        </div>
        
        <time dateTime={testimonial.date}>
          {formatDate ? formatDate(testimonial.date) : new Date(testimonial.date).toLocaleDateString()}
        </time>
      </div>

      {/* Boutons d'action (si featured) */}
      {variant === 'featured' && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button className="w-full btn-primary text-sm">
            {t('testimonials.contactMe', 'Obtenir les mêmes résultats')}
          </button>
        </div>
      )}
    </motion.div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';