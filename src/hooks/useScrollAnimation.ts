import { useEffect, useState, useCallback, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook personnalisé pour les animations au scroll
 * Utilise l'Intersection Observer API pour de meilleures performances
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const elementRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true);
          setHasTriggered(true);
        } else if (!triggerOnce && !isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    elementRef,
    isVisible,
    hasTriggered
  };
}

/**
 * Hook pour animer une liste d'éléments avec délai progressif
 */
export function useStaggeredAnimation(itemCount: number, delay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { elementRef, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (isVisible && visibleItems.size === 0) {
      // Anime les éléments un par un avec délai
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems(prev => new Set(prev).add(i));
        }, i * delay);
      }
    }
  }, [isVisible, itemCount, delay, visibleItems.size]);

  const isItemVisible = useCallback((index: number) => {
    return visibleItems.has(index);
  }, [visibleItems]);

  return {
    containerRef: elementRef,
    isItemVisible,
    allVisible: visibleItems.size === itemCount
  };
}