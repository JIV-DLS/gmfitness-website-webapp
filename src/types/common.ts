// Base types et interfaces communes

export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  availability: string;
}

export type ServiceType = 'personal' | 'group' | 'online' | 'nutrition';
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
export type AnimationDirection = 'left' | 'right' | 'up' | 'down';

export interface MotionVariants {
  hidden: {
    opacity: number;
    x?: number;
    y?: number;
  };
  visible: {
    opacity: number;
    x?: number;
    y?: number;
    transition?: {
      duration: number;
      delay?: number;
      staggerChildren?: number;
    };
  };
}