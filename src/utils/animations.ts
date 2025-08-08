import { MotionVariants, AnimationDirection } from '@/types/common';

/**
 * Factory pour créer des variants d'animation réutilisables
 * Pattern: Factory Pattern + Configuration Object
 */
export class AnimationFactory {
  
  /**
   * Crée une animation de fade in
   */
  static fadeIn(delay: number = 0, duration: number = 0.6): MotionVariants {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, delay }
      }
    };
  }

  /**
   * Crée une animation de slide
   */
  static slide(
    direction: AnimationDirection,
    distance: number = 50,
    delay: number = 0,
    duration: number = 0.6
  ): MotionVariants {
    const getInitialPosition = () => {
      switch (direction) {
        case 'left': return { x: -distance, opacity: 0 };
        case 'right': return { x: distance, opacity: 0 };
        case 'up': return { y: -distance, opacity: 0 };
        case 'down': return { y: distance, opacity: 0 };
      }
    };

    return {
      hidden: getInitialPosition(),
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { duration, delay }
      }
    };
  }

  /**
   * Crée une animation de scale
   */
  static scale(
    initialScale: number = 0.8,
    delay: number = 0,
    duration: number = 0.6
  ): MotionVariants {
    return {
      hidden: { scale: initialScale, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { duration, delay }
      }
    };
  }

  /**
   * Crée une animation staggered pour des listes
   */
  static stagger(
    childDelay: number = 0.1,
    direction: AnimationDirection = 'up',
    distance: number = 30
  ): MotionVariants {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: childDelay
        }
      }
    };
  }

  /**
   * Crée une animation d'item pour les listes staggered
   */
  static staggerItem(direction: AnimationDirection = 'up', distance: number = 30): MotionVariants {
    return this.slide(direction, distance, 0, 0.4);
  }

  /**
   * Animation de hover pour les boutons
   */
  static buttonHover() {
    return {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    };
  }

  /**
   * Animation de tap pour les boutons
   */
  static buttonTap() {
    return {
      scale: 0.95,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    };
  }

  /**
   * Animation complexe pour les cards
   */
  static cardHover() {
    return {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    };
  }
}

/**
 * Variants prédéfinis pour les cas d'usage courants
 */
export const commonVariants = {
  // Page transitions
  pageTransition: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  },

  // Container pour stagger children
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },

  // Item pour container staggered
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  },

  // Animation de modal
  modal: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },

  // Animation de notification
  notification: {
    hidden: { 
      opacity: 0, 
      x: 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }
};