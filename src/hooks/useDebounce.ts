import { useState, useEffect, useMemo } from 'react';

/**
 * Hook personnalisé pour débouncer une valeur
 * Utile pour optimiser les performances lors de la saisie
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook pour débouncer une fonction de callback
 */
export function useDebouncedCallback<Args extends any[]>(
  callback: (...args: Args) => void,
  delay: number
) {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  const debouncedCallback = useMemo(
    () =>
      (...args: Args) => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        const newTimer = setTimeout(() => {
          callback(...args);
        }, delay);

        setDebounceTimer(newTimer);
      },
    [callback, delay, debounceTimer]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}