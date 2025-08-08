import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des traductions
import fr from './locales/fr.json';
import en from './locales/en.json';

/**
 * Configuration i18next pour la traduction automatique
 * Pattern: Strategy + Observer
 */
i18n
  .use(LanguageDetector) // Détecte automatiquement la langue du navigateur
  .use(initReactI18next) // Intégration React
  .init({
    // Configuration des langues
    resources: {
      fr: {
        translation: fr
      },
      en: {
        translation: en
      }
    },
    
    // Langue par défaut
    fallbackLng: 'fr',
    
    // Debug en développement
    debug: import.meta.env.DEV,
    
    // Configuration du détecteur de langue
    detection: {
      order: [
        'localStorage',     // 1. Préférence sauvegardée
        'navigator',        // 2. Langue du navigateur
        'htmlTag',          // 3. Attribut lang de <html>
        'path',             // 4. URL path
        'subdomain'         // 5. Sous-domaine
      ],
      caches: ['localStorage'], // Sauvegarde dans localStorage
      lookupLocalStorage: 'language', // Clé utilisée dans localStorage
    },

    // Configuration de l'interpolation
    interpolation: {
      escapeValue: false, // React s'occupe déjà de l'échappement XSS
      formatSeparator: ','
    },

    // Namespace par défaut
    defaultNS: 'translation',
    
    // Configuration du chargement des traductions
    load: 'languageOnly', // Charge seulement 'fr' au lieu de 'fr-FR'
    
    // Gestion des clés manquantes
    saveMissing: import.meta.env.DEV, // Log les clés manquantes en dev
    missingKeyHandler: (lng, ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    },

    // Gestion du pluriel
    pluralSeparator: '_',
    contextSeparator: '_',

    // Performance
    cleanCode: true, // Nettoie les codes de langue (fr-FR -> fr)
    
    // Callbacks
    initImmediate: false, // Initialisation synchrone
  });

// Export pour utilisation dans l'app
export default i18n;

// Helper pour obtenir les langues disponibles
export const availableLanguages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];