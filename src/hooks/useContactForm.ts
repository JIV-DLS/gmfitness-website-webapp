import { useCallback, useEffect } from 'react';
import { useContactForm as useContactFormContext } from '@/context/AppContext';
import { ContactFormData } from '@/types/forms';
import { ValidationService } from '@/services/ValidationService';
import { EmailService } from '@/services/EmailService';

/**
 * Hook personnalisé pour la gestion du formulaire de contact
 * Encapsule toute la logique métier du formulaire
 * Pattern: Custom Hook + Command Pattern
 */
export function useContactForm() {
  const {
    formState,
    updateForm,
    setStatus,
    setErrors,
    touchField,
    resetForm
  } = useContactFormContext();

  const validationService = ValidationService.getInstance();
  const emailService = EmailService.getInstance();

  /**
   * Met à jour un champ du formulaire avec validation en temps réel
   */
  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    updateForm({ [field]: value });
    
    // Validation en temps réel si le champ a été touché
    if (formState.touchedFields.has(field)) {
      validateField(field, value);
    }
  }, [updateForm, formState.touchedFields]);

  /**
   * Marque un champ comme touché et valide
   */
  const handleFieldBlur = useCallback((field: keyof ContactFormData) => {
    touchField(field);
    validateField(field, formState.data[field]);
  }, [touchField, formState.data]);

  /**
   * Valide un champ spécifique
   */
  const validateField = useCallback((field: keyof ContactFormData, value: string) => {
    let fieldErrors: string[] = [];

    switch (field) {
      case 'name':
        fieldErrors = validationService.validateName(value).errors;
        break;
      case 'email':
        fieldErrors = validationService.validateEmail(value).errors;
        break;
      case 'phone':
        fieldErrors = validationService.validatePhone(value).errors;
        break;
      case 'message':
        fieldErrors = validationService.validateMessage(value).errors;
        break;
      case 'service':
        if (!value) fieldErrors = ['Veuillez sélectionner un service'];
        break;
    }

    // Met à jour les erreurs pour ce champ
    setErrors({
      ...formState.errors,
      [field]: fieldErrors.length > 0 ? fieldErrors[0] : undefined
    });
  }, [validationService, formState.errors, setErrors]);

  /**
   * Valide tout le formulaire
   */
  const validateForm = useCallback((): boolean => {
    const validation = validationService.validateContactForm(formState.data);
    
    if (!validation.isValid) {
      // Convertit les erreurs en format pour le state
      const fieldErrors: Partial<ContactFormData> = {};
      validation.errors.forEach(error => {
        if (error.includes('nom')) fieldErrors.name = error;
        else if (error.includes('email')) fieldErrors.email = error;
        else if (error.includes('téléphone')) fieldErrors.phone = error;
        else if (error.includes('message')) fieldErrors.message = error;
        else if (error.includes('service')) fieldErrors.service = error;
      });
      
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  }, [validationService, formState.data, setErrors]);

  /**
   * Soumet le formulaire
   */
  const submitForm = useCallback(async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setStatus('submitting');

    try {
      const { sanitizedData } = validationService.validateAndSanitizeContactForm(formState.data);
      const result = await emailService.sendContactEmail(sanitizedData);

      if (result.success) {
        setStatus('success');
        resetForm();
        return true;
      } else {
        setStatus('error');
        setErrors({ message: result.error || 'Erreur lors de l\'envoi' });
        return false;
      }
    } catch (error) {
      setStatus('error');
      setErrors({ 
        message: error instanceof Error ? error.message : 'Erreur inattendue' 
      });
      return false;
    }
  }, [validateForm, setStatus, validationService, emailService, formState.data, resetForm, setErrors]);

  /**
   * Reset le formulaire et les erreurs
   */
  const handleReset = useCallback(() => {
    resetForm();
    setErrors({});
  }, [resetForm, setErrors]);

  /**
   * Vérifie si un champ a une erreur
   */
  const hasFieldError = useCallback((field: keyof ContactFormData): boolean => {
    return !!formState.errors[field] && formState.touchedFields.has(field);
  }, [formState.errors, formState.touchedFields]);

  /**
   * Récupère l'erreur d'un champ
   */
  const getFieldError = useCallback((field: keyof ContactFormData): string | undefined => {
    return hasFieldError(field) ? formState.errors[field] : undefined;
  }, [hasFieldError, formState.errors]);

  /**
   * Vérifie si le formulaire peut être soumis
   */
  const canSubmit = useCallback((): boolean => {
    const hasData = formState.data.name && formState.data.email && formState.data.phone && formState.data.service;
    const hasNoErrors = Object.keys(formState.errors).length === 0;
    const isNotSubmitting = formState.status !== 'submitting';
    
    return !!(hasData && hasNoErrors && isNotSubmitting);
  }, [formState]);

  return {
    // État
    formData: formState.data,
    status: formState.status,
    errors: formState.errors,
    touchedFields: formState.touchedFields,
    
    // Actions
    updateField,
    handleFieldBlur,
    submitForm,
    handleReset,
    
    // Utilitaires
    hasFieldError,
    getFieldError,
    canSubmit,
    isSubmitting: formState.status === 'submitting',
    isSuccess: formState.status === 'success',
    isError: formState.status === 'error'
  };
}