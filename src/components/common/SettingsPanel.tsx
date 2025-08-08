import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle, ThemeSelector } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { useI18n } from '@/hooks/useI18n';

interface SettingsPanelProps {
  variant?: 'dropdown' | 'inline';
  className?: string;
}

/**
 * Panneau de paramètres regroupant thème et langue
 * Pattern: Composite + Strategy
 */
export const SettingsPanel = memo<SettingsPanelProps>(({ 
  variant = 'dropdown',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  // Prévenir le scroll du body quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup quand le composant se démonte
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fermer la modal sur Échap
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
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

  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <ThemeToggle variant="button" size="sm" />
        <LanguageSelector variant="button" size="sm" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          p-2 rounded-lg
          bg-gray-100 hover:bg-gray-200 
          dark:bg-gray-800 dark:hover:bg-gray-700
          border border-gray-200 dark:border-gray-700
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t('common.settings', 'Paramètres')}
        aria-label={t('common.settings', 'Paramètres')}
        aria-expanded={isOpen}
      >
        <motion.svg
          className="w-5 h-5 text-gray-600 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" 
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay - z-index le plus élevé */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
            />

            {/* Modal de paramètres */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="
                absolute top-full mt-2 right-0 
                bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700
                rounded-lg shadow-xl
                w-[320px] max-w-[90vw] z-[9999]
                overflow-hidden
                max-h-[80vh] overflow-y-auto
              "
              role="dialog"
              aria-modal="true"
              aria-labelledby="settings-title"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 id="settings-title" className="font-semibold text-gray-900 dark:text-white">
                    {t('common.settings', 'Paramètres')}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Fermer"
                  >
                    <svg className="w-4 h-4 text-gray-500 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-6">
                {/* Sélection du thème */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t('theme.title', 'Thème')}
                  </label>
                  <ThemeSelector />
                </div>

                {/* Sélection de la langue */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t('language.title', 'Langue')}
                  </label>
                  <LanguageSelector variant="dropdown" showLabel />
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {t('settings.note', 'Les préférences sont sauvegardées automatiquement')}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});

SettingsPanel.displayName = 'SettingsPanel';

/**
 * Version compacte pour mobile
 */
export const CompactSettings = memo(() => {
  return (
    <div className="flex items-center space-x-2">
      <ThemeToggle variant="button" size="sm" />
      <LanguageSelector variant="button" size="sm" />
    </div>
  );
});

CompactSettings.displayName = 'CompactSettings';