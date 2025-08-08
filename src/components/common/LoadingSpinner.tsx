import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  message?: string;
  className?: string;
}

/**
 * Composant Loading Spinner optimisé avec React.memo
 * Pattern: Presentation Component + Memoization
 */
export const LoadingSpinner = memo<LoadingSpinnerProps>(({
  size = 'md',
  color = 'primary',
  message,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`
          ${sizeClasses[size]} 
          border-2 border-t-transparent 
          ${colorClasses[color]} 
          rounded-full
        `}
        variants={spinVariants}
        animate="animate"
      />
      
      {message && (
        <motion.p
          className={`mt-2 text-sm ${
            color === 'white' ? 'text-white' : 'text-gray-600'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';