import React, { memo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '@/i18n';

/**
 * Composant de sélection de langue avec i18next
 * Pattern: Strategy + Presentation Component
 */
export const LanguageSelector = memo(({ 
  variant = 'dropdown', 
  size = 'md',
  className = '',
  showLabel = false
}) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = availableLanguages.find(lang => lang.code === i18n.language) || availableLanguages[0];

  const sizes = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-3',
    lg: 'text-lg py-3 px-4'
  };

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Fermer le dropdown sur click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Fermer sur Échap
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  if (variant === 'button') {
    const otherLanguage = availableLanguages.find(lang => lang.code !== i18n.language);
    
    return (
      <motion.button
        onClick={() => otherLanguage && changeLanguage(otherLanguage.code)}
        className={`
          ${sizes[size]}
          flex items-center space-x-2
          bg-gray-100 hover:bg-gray-200 
          dark:bg-gray-800 dark:hover:bg-gray-700
          border border-gray-200 dark:border-gray-700
          rounded-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`${t('language.switchTo', 'Changer vers')} ${otherLanguage?.name}`}
      >
        <span className="text-lg">{otherLanguage?.flag}</span>
        <span className="font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
          {otherLanguage?.name}
        </span>
      </motion.button>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${sizes[size]}
          w-full flex items-center space-x-2
          bg-gray-100 hover:bg-gray-200 
          dark:bg-gray-800 dark:hover:bg-gray-700
          border border-gray-200 dark:border-gray-600
          rounded-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          dark:focus:ring-offset-gray-900
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-label={t('language.select', 'Sélectionner la langue')}
      >
        <span className="text-lg flex-shrink-0">{currentLanguage.flag}</span>
        {showLabel && (
          <span className="font-medium text-gray-700 dark:text-gray-300 flex-1 text-left">
            {currentLanguage.name}
          </span>
        )}
        <motion.svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full mt-2 left-0 right-0
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-600
              rounded-lg shadow-lg
              z-[60]
              overflow-hidden
              max-h-[200px] overflow-y-auto
            "
            role="listbox"
            aria-label={t('language.options', 'Options de langue')}
          >
            {availableLanguages.map((language) => (
              <motion.button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3
                  text-left transition-all duration-200
                  ${language.code === i18n.language 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                  ${language.code === i18n.language ? 'font-medium' : 'font-normal'}
                `}
                whileHover={{ x: 4 }}
                role="option"
                aria-selected={language.code === i18n.language}
              >
                <span className="text-lg flex-shrink-0">{language.flag}</span>
                <span className="flex-1">{language.name}</span>
                {language.code === i18n.language && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-primary-500 dark:text-primary-400"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';