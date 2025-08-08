import { useState, useEffect, useCallback } from 'react';
import { SAMPLE_TESTIMONIALS } from '@/constants/testimonials';

/**
 * Hook personnalisé pour la gestion des témoignages
 * Version JavaScript simplifiée avec données d'exemple
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Simule le chargement des témoignages
   */
  const loadTestimonials = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Utiliser les données d'exemple pour l'instant
      const mockTestimonials = SAMPLE_TESTIMONIALS.map((testimonial, index) => ({
        ...testimonial,
        id: `testimonial-${index + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        date: testimonial.testimonialDate || new Date()
      }));

      setTestimonials(mockTestimonials);
      
      // Calculer les témoignages featured
      const featured = mockTestimonials.filter(t => t.featured);
      setFeaturedTestimonials(featured);

      // Calculer les stats
      const totalRating = mockTestimonials.reduce((sum, t) => sum + t.rating, 0);
      const avgRating = mockTestimonials.length > 0 ? totalRating / mockTestimonials.length : 0;
      
      setStats({
        totalTestimonials: mockTestimonials.length,
        averageRating: avgRating,
        videoTestimonials: mockTestimonials.filter(t => t.type === 'video').length,
        beforeAfterTestimonials: mockTestimonials.filter(t => t.type === 'before_after').length,
        clientsSatisfied: mockTestimonials.length,
        averageWeightLoss: 8.5,
        averageImprovement: 92
      });

    } catch (error) {
      setError('Erreur lors du chargement des témoignages');
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filtre les témoignages par type
   */
  const getTestimonialsByType = useCallback((type) => {
    return testimonials.filter(testimonial => testimonial.type === type);
  }, [testimonials]);

  /**
   * Récupère les témoignages avec une note minimum
   */
  const getTestimonialsByRating = useCallback((minRating) => {
    return testimonials.filter(testimonial => testimonial.rating >= minRating);
  }, [testimonials]);

  /**
   * Récupère les témoignages avec vidéo
   */
  const getVideoTestimonials = useCallback(() => {
    return testimonials.filter(testimonial => testimonial.type === 'video' || testimonial.video);
  }, [testimonials]);

  /**
   * Récupère les témoignages avec avant/après
   */
  const getBeforeAfterTestimonials = useCallback(() => {
    return testimonials.filter(testimonial => testimonial.type === 'before_after' || testimonial.beforeAfter || testimonial.beforeAfterImages);
  }, [testimonials]);

  /**
   * Récupère les tags les plus populaires
   */
  const getPopularTags = useCallback((limit = 10) => {
    const tagCounts = {};
    
    testimonials.forEach(testimonial => {
      if (testimonial.tags) {
        testimonial.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));
  }, [testimonials]);

  /**
   * Clear l'erreur actuelle
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Rafraîchit toutes les données
   */
  const refresh = useCallback(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  // Charge les données au montage
  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  return {
    // État
    testimonials,
    featuredTestimonials,
    stats,
    loading,
    error,

    // Actions
    loadTestimonials,
    clearError,
    refresh,

    // Getters
    getTestimonialsByType,
    getTestimonialsByRating,
    getVideoTestimonials,
    getBeforeAfterTestimonials,
    getPopularTags,

    // Stats rapides
    totalTestimonials: testimonials.length,
    averageRating: stats?.averageRating || 0,
    videoTestimonialsCount: getVideoTestimonials().length,
    beforeAfterCount: getBeforeAfterTestimonials().length
  };
}