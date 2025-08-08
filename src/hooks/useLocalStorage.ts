import { useState, useCallback, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer le localStorage de manière type-safe
 * Pattern: Observer Pattern + Strategy Pattern
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void, () => void] {
  
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = useCallback((value: T | ((prevValue: T) => T)) => {
    try {
      // Permet d'utiliser une fonction callback comme avec useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch custom event pour synchroniser entre onglets
        window.dispatchEvent(new CustomEvent('localStorage', {
          detail: { key, newValue: valueToStore }
        }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Fonction pour supprimer la valeur
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('localStorage', {
          detail: { key, newValue: null }
        }));
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Écoute les changements dans les autres onglets
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.newValue ?? initialValue);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('localStorage', handleCustomStorageChange as EventListener);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('localStorage', handleCustomStorageChange as EventListener);
      };
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook pour gérer les préférences utilisateur
 */
export function useUserPreferences() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [language, setLanguage] = useLocalStorage<'fr' | 'en'>('language', 'fr');
  const [cookiesAccepted, setCookiesAccepted] = useLocalStorage<boolean>('cookiesAccepted', false);

  return {
    theme,
    setTheme,
    language,
    setLanguage,
    cookiesAccepted,
    setCookiesAccepted
  };
}