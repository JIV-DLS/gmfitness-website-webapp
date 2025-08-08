import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { LanguageCode, availableLanguages } from '@/i18n';

/**
 * Hook personnalisé pour la traduction avec utilities
 * Pattern: Facade + Adapter
 */
export function useI18n() {
  const { t, i18n } = useTranslation();

  /**
   * Change la langue de l'application
   */
  const changeLanguage = useCallback(async (languageCode: LanguageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      
      // Met à jour l'attribut lang du document
      if (typeof document !== 'undefined') {
        document.documentElement.lang = languageCode;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to change language:', error);
      return false;
    }
  }, [i18n]);

  /**
   * Toggle entre les langues disponibles
   */
  const toggleLanguage = useCallback(() => {
    const currentIndex = availableLanguages.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLanguage = availableLanguages[nextIndex];
    
    return changeLanguage(nextLanguage.code);
  }, [i18n.language, changeLanguage]);

  /**
   * Obtient la langue suivante dans la liste
   */
  const getNextLanguage = useCallback(() => {
    const currentIndex = availableLanguages.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    return availableLanguages[nextIndex];
  }, [i18n.language]);

  /**
   * Obtient les informations de la langue actuelle
   */
  const getCurrentLanguage = useCallback(() => {
    return availableLanguages.find(lang => lang.code === i18n.language) || availableLanguages[0];
  }, [i18n.language]);

  /**
   * Vérifie si une langue est supportée
   */
  const isLanguageSupported = useCallback((languageCode: string): languageCode is LanguageCode => {
    return availableLanguages.some(lang => lang.code === languageCode);
  }, []);

  /**
   * Traduction avec fallback et interpolation safe
   */
  const translate = useCallback((
    key: string, 
    options?: { 
      defaultValue?: string;
      count?: number;
      context?: string;
      [key: string]: any;
    }
  ) => {
    try {
      return t(key, options);
    } catch (error) {
      console.warn(`Translation failed for key: ${key}`, error);
      return options?.defaultValue || key;
    }
  }, [t]);

  /**
   * Traduction avec support des arrays pour les listes
   */
  const translateArray = useCallback((
    keys: string[], 
    options?: { defaultValues?: string[] }
  ): string[] => {
    return keys.map((key, index) => 
      translate(key, { defaultValue: options?.defaultValues?.[index] })
    );
  }, [translate]);

  /**
   * Format de date selon la locale
   */
  const formatDate = useCallback((
    date: Date | string | number,
    options?: Intl.DateTimeFormatOptions
  ) => {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    
    try {
      return new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
      }).format(dateObj);
    } catch (error) {
      console.warn('Date formatting failed:', error);
      return dateObj.toLocaleDateString();
    }
  }, [i18n.language]);

  /**
   * Format de nombre selon la locale
   */
  const formatNumber = useCallback((
    number: number,
    options?: Intl.NumberFormatOptions
  ) => {
    try {
      return new Intl.NumberFormat(i18n.language, options).format(number);
    } catch (error) {
      console.warn('Number formatting failed:', error);
      return number.toString();
    }
  }, [i18n.language]);

  /**
   * Format de prix selon la locale
   */
  const formatPrice = useCallback((
    amount: number,
    currency: string = 'EUR'
  ) => {
    return formatNumber(amount, {
      style: 'currency',
      currency: currency.toUpperCase()
    });
  }, [formatNumber]);

  /**
   * Direction du texte (pour les langues RTL)
   */
  const getTextDirection = useCallback((): 'ltr' | 'rtl' => {
    // Pour l'instant seulement LTR, mais extensible pour Arabic, Hebrew, etc.
    return 'ltr';
  }, []);

  /**
   * Vérifie si le chargement des traductions est terminé
   */
  const isReady = i18n.isInitialized;

  return {
    // Fonctions de base
    t: translate,
    changeLanguage,
    toggleLanguage,
    
    // Informations sur la langue
    currentLanguage: i18n.language as LanguageCode,
    getCurrentLanguage,
    getNextLanguage,
    isLanguageSupported,
    availableLanguages,
    
    // Utilitaires de traduction
    translateArray,
    
    // Formatage selon la locale
    formatDate,
    formatNumber,
    formatPrice,
    
    // Propriétés du layout
    textDirection: getTextDirection(),
    isRTL: getTextDirection() === 'rtl',
    
    // État
    isReady,
    isLoading: !isReady,
    
    // Instance i18n brute si nécessaire
    i18n
  };
}

/**
 * Hook pour obtenir les traductions d'une section spécifique
 */
export function useSectionTranslation(section: string) {
  const { t } = useI18n();
  
  const getSectionKey = useCallback((key: string) => `${section}.${key}`, [section]);
  
  const translateSection = useCallback((key: string, options?: any) => 
    t(getSectionKey(key), options), [t, getSectionKey]);

  return {
    t: translateSection,
    getSectionKey
  };
}

/**
 * Hook pour la traduction des erreurs et messages système
 */
export function useErrorTranslation() {
  const { t } = useI18n();
  
  const translateError = useCallback((
    errorCode: string, 
    fallback: string = 'Une erreur inattendue s\'est produite'
  ) => {
    const errorKey = `errors.${errorCode}`;
    const translated = t(errorKey);
    
    // Si la traduction retourne la clé, utilise le fallback
    return translated === errorKey ? fallback : translated;
  }, [t]);

  const translateValidation = useCallback((
    validationType: string,
    field?: string,
    options?: any
  ) => {
    const key = field ? `validation.${validationType}.${field}` : `validation.${validationType}`;
    return t(key, options);
  }, [t]);

  return {
    translateError,
    translateValidation
  };
}