import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Hook personnalisé pour la gestion des thèmes avec détection système
 * Pattern: Observer + Strategy + State Machine
 */
export function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage<ThemeMode>('theme', 'system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  /**
   * Détecte le thème système
   */
  const detectSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  /**
   * Met à jour le thème résolu basé sur la préférence et le thème système
   */
  const updateResolvedTheme = useCallback(() => {
    const systemPreference = detectSystemTheme();
    setSystemTheme(systemPreference);

    const resolved = storedTheme === 'system' ? systemPreference : storedTheme;
    setResolvedTheme(resolved);

    // Applique le thème au DOM
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      
      if (resolved === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }

      // Met à jour la meta theme-color pour les navigateurs mobiles
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', resolved === 'dark' ? '#1f2937' : '#ffffff');
      }
    }
  }, [storedTheme, detectSystemTheme]);

  /**
   * Change le mode de thème
   */
  const setTheme = useCallback((mode: ThemeMode) => {
    setStoredTheme(mode);
  }, [setStoredTheme]);

  /**
   * Toggle entre light et dark (ignore system)
   */
  const toggleTheme = useCallback(() => {
    if (storedTheme === 'system') {
      // Si en mode système, bascule vers l'opposé du thème système actuel
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      // Sinon, bascule simplement
      setTheme(storedTheme === 'dark' ? 'light' : 'dark');
    }
  }, [storedTheme, systemTheme, setTheme]);

  /**
   * Force l'utilisation du thème système
   */
  const useSystemTheme = useCallback(() => {
    setTheme('system');
  }, [setTheme]);

  // Écoute les changements de préférence système
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      updateResolvedTheme();
    };

    // Écoute les changements
    mediaQuery.addEventListener('change', handleChange);
    
    // Initialise le thème
    updateResolvedTheme();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [updateResolvedTheme]);

  // Met à jour quand storedTheme change
  useEffect(() => {
    updateResolvedTheme();
  }, [storedTheme, updateResolvedTheme]);

  // Force l'application du thème au chargement initial
  useEffect(() => {
    // Petite temporisation pour s'assurer que React a fini de render
    const timer = setTimeout(() => {
      updateResolvedTheme();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    // État actuel
    theme: storedTheme,           // Mode sélectionné (light/dark/system)
    resolvedTheme,                // Thème réellement appliqué (light/dark)
    systemTheme,                  // Thème préféré du système
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystemMode: storedTheme === 'system',

    // Actions
    setTheme,
    toggleTheme,
    useSystemTheme,

    // Helpers
    getThemeIcon: () => {
      switch (storedTheme) {
        case 'light': return '☀️';
        case 'dark': return '🌙';
        case 'system': return '🖥️';
        default: return '🖥️';
      }
    },

    // Utilitaires CSS
    getThemeClasses: (lightClass: string, darkClass: string) => {
      return resolvedTheme === 'dark' ? darkClass : lightClass;
    }
  };
}

/**
 * Hook pour obtenir les classes CSS basées sur le thème
 */
export function useThemeClasses() {
  const { resolvedTheme } = useTheme();

  const getClasses = useCallback((lightClasses: string, darkClasses: string) => {
    return resolvedTheme === 'dark' ? darkClasses : lightClasses;
  }, [resolvedTheme]);

  const getBgClass = useCallback((base: string = '') => {
    const bgClasses = {
      light: `bg-white ${base}`,
      dark: `bg-gray-900 ${base}`
    };
    return bgClasses[resolvedTheme];
  }, [resolvedTheme]);

  const getTextClass = useCallback((base: string = '') => {
    const textClasses = {
      light: `text-gray-900 ${base}`,
      dark: `text-white ${base}`
    };
    return textClasses[resolvedTheme];
  }, [resolvedTheme]);

  const getBorderClass = useCallback((base: string = '') => {
    const borderClasses = {
      light: `border-gray-200 ${base}`,
      dark: `border-gray-700 ${base}`
    };
    return borderClasses[resolvedTheme];
  }, [resolvedTheme]);

  return {
    getClasses,
    getBgClass,
    getTextClass,
    getBorderClass,
    isDark: resolvedTheme === 'dark'
  };
}