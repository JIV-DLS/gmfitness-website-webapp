import React, { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

/**
 * Provider qui force l'application du thème au chargement
 * Pattern: Provider + Effect
 */
export const ThemeProvider = ({ children }) => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Force l'application du thème au DOM
    const applyTheme = () => {
      const root = document.documentElement;
      
      // Supprime toutes les classes de thème existantes
      root.classList.remove('light', 'dark');
      
      // Applique le thème résolu
      root.classList.add(resolvedTheme);
      
      // Met à jour l'attribut data-theme
      root.setAttribute('data-theme', resolvedTheme);
      
      // Met à jour la couleur de la barre d'état mobile
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content', 
          resolvedTheme === 'dark' ? '#111827' : '#ffffff'
        );
      }

      console.log(`🎨 Thème appliqué: ${resolvedTheme}`);
    };

    // Applique immédiatement
    applyTheme();
    
    // Applique après un court délai pour s'assurer que React a terminé le rendu
    const timer = setTimeout(applyTheme, 100);
    
    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  // Observer les changements de classe sur le body pour debug
  useEffect(() => {
    if (import.meta.env.DEV) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            console.log('🔍 Classes HTML:', document.documentElement.className);
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => observer.disconnect();
    }
  }, []);

  return <>{children}</>;
};