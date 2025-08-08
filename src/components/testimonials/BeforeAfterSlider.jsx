import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

/**
 * Slider interactif pour comparer images avant/après
 * Pattern: Controlled Component + Event Handling
 */
export const BeforeAfterSlider = memo(({
  beforeAfter,
  className = '',
  autoSlide = false,
  slideInterval = 3000
}) => {
  const { t } = useI18n();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  // Auto-slide effect
  React.useEffect(() => {
    if (!autoSlide || isDragging) return;

    const interval = setInterval(() => {
      setSliderPosition(prev => {
        if (prev >= 95) return 5;
        if (prev <= 5) return 95;
        return prev > 50 ? 5 : 95;
      });
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, slideInterval, isDragging]);

  if (!beforeAfter?.before?.url || !beforeAfter?.after?.url) {
    return null;
  }

  return (
    <motion.div
      className={`relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden cursor-ew-resize select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image "Après" (arrière-plan) */}
      <div className="absolute inset-0">
        <img
          src={beforeAfter.after.url}
          alt={beforeAfter.after.alt || t('testimonials.beforeAfter.after', 'Après')}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {t('testimonials.beforeAfter.after', 'APRÈS')}
        </div>
      </div>

      {/* Image "Avant" (premier plan avec masque) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeAfter.before.url}
          alt={beforeAfter.before.alt || t('testimonials.beforeAfter.before', 'Avant')}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {t('testimonials.beforeAfter.before', 'AVANT')}
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12.707 14.707a1 1 0 010-1.414L16 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
        {t('testimonials.beforeAfter.instruction', '👆 Glissez pour comparer')}
      </div>

      {/* Informations optionnelles */}
      {beforeAfter.description && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-2 rounded text-sm">
          {beforeAfter.description}
        </div>
      )}
    </motion.div>
  );
});

BeforeAfterSlider.displayName = 'BeforeAfterSlider';