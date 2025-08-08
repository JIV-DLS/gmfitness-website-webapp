import { ContactFormData, ValidationResult } from '@/types/forms';

/**
 * Service de validation utilisant le pattern Singleton
 * Centralise toute la logique de validation
 */
export class ValidationService {
  private static instance: ValidationService;

  private constructor() {}

  public static getInstance(): ValidationService {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService();
    }
    return ValidationService.instance;
  }

  /**
   * Valide un email avec regex robuste
   */
  public validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    
    if (!email.trim()) {
      errors.push('L\'email est requis');
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        errors.push('Format d\'email invalide');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Valide un numéro de téléphone français
   */
  public validatePhone(phone: string): ValidationResult {
    const errors: string[] = [];
    
    if (!phone.trim()) {
      errors.push('Le téléphone est requis');
    } else {
      // Regex pour numéros français (06, 07, 01-05, +33)
      const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
      const cleanPhone = phone.replace(/[\s.-]/g, '');
      
      if (!phoneRegex.test(cleanPhone)) {
        errors.push('Format de téléphone invalide (ex: 06 12 34 56 78)');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Valide un nom (pas vide, longueur min/max)
   */
  public validateName(name: string): ValidationResult {
    const errors: string[] = [];
    
    if (!name.trim()) {
      errors.push('Le nom est requis');
    } else if (name.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    } else if (name.trim().length > 50) {
      errors.push('Le nom ne peut pas dépasser 50 caractères');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Valide un message (longueur max)
   */
  public validateMessage(message: string): ValidationResult {
    const errors: string[] = [];
    
    if (message.length > 1000) {
      errors.push('Le message ne peut pas dépasser 1000 caractères');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Valide le formulaire de contact complet
   */
  public validateContactForm(data: ContactFormData): ValidationResult {
    const allErrors: string[] = [];

    const nameValidation = this.validateName(data.name);
    const emailValidation = this.validateEmail(data.email);
    const phoneValidation = this.validatePhone(data.phone);
    const messageValidation = this.validateMessage(data.message);

    allErrors.push(...nameValidation.errors);
    allErrors.push(...emailValidation.errors);
    allErrors.push(...phoneValidation.errors);
    allErrors.push(...messageValidation.errors);

    if (!data.service) {
      allErrors.push('Veuillez sélectionner un service');
    }

    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }

  /**
   * Sanitize une chaîne pour éviter les attaques XSS
   */
  public sanitizeString(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  }

  /**
   * Valide et sanitize toutes les données du formulaire
   */
  public validateAndSanitizeContactForm(data: ContactFormData): {
    isValid: boolean;
    errors: string[];
    sanitizedData: ContactFormData;
  } {
    const validation = this.validateContactForm(data);
    
    const sanitizedData: ContactFormData = {
      name: this.sanitizeString(data.name),
      email: this.sanitizeString(data.email),
      phone: this.sanitizeString(data.phone),
      service: data.service,
      message: this.sanitizeString(data.message)
    };

    return {
      isValid: validation.isValid,
      errors: validation.errors,
      sanitizedData
    };
  }
}