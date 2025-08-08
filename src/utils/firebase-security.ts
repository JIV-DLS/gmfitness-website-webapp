/**
 * Utilitaires de sécurité Firebase
 * Gestion des règles de sécurité et validation côté client
 */

/**
 * Validation côté client avant d'envoyer à Firebase
 * Pattern: Guard Clauses + Validation
 */
export class FirebaseSecurityUtils {
  
  /**
   * Valide qu'un utilisateur peut créer un témoignage
   */
  static validateTestimonialCreation(userId: string, testimonialData: any): { isValid: boolean; error?: string } {
    // Vérification de base
    if (!userId) {
      return { isValid: false, error: 'Utilisateur non authentifié' };
    }

    // Validation des champs obligatoires
    const requiredFields = ['clientName', 'rating', 'content', 'serviceType'];
    const missingFields = requiredFields.filter(field => !testimonialData[field]);
    
    if (missingFields.length > 0) {
      return { 
        isValid: false, 
        error: `Champs manquants: ${missingFields.join(', ')}` 
      };
    }

    // Validation du rating
    if (testimonialData.rating < 1 || testimonialData.rating > 5) {
      return { isValid: false, error: 'La note doit être entre 1 et 5' };
    }

    // Validation de la longueur du contenu
    if (testimonialData.content.length < 10 || testimonialData.content.length > 1000) {
      return { 
        isValid: false, 
        error: 'Le contenu doit faire entre 10 et 1000 caractères' 
      };
    }

    return { isValid: true };
  }

  /**
   * Valide qu'un utilisateur peut uploader un fichier
   */
  static validateFileUpload(file: File, userId: string): { isValid: boolean; error?: string } {
    if (!userId) {
      return { isValid: false, error: 'Utilisateur non authentifié' };
    }

    // Taille maximale: 100MB
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return { isValid: false, error: 'Fichier trop volumineux (max 100MB)' };
    }

    // Types de fichiers autorisés
    const allowedTypes = [
      'video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov',
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'Type de fichier non autorisé' 
      };
    }

    return { isValid: true };
  }

  /**
   * Nettoie les données avant envoi à Firebase
   */
  static sanitizeData(data: any): any {
    if (typeof data === 'string') {
      // Supprime les scripts et balises dangereuses
      return data
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .trim();
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }

    if (data && typeof data === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = this.sanitizeData(value);
      }
      return sanitized;
    }

    return data;
  }

  /**
   * Génère un nom de fichier sécurisé
   */
  static generateSecureFileName(originalName: string, userId: string): string {
    // Supprime les caractères dangereux
    const safeName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .replace(/^_|_$/g, '');

    // Ajoute timestamp et userId pour éviter les collisions
    const timestamp = Date.now();
    const userPrefix = userId.substring(0, 8);
    
    return `${userPrefix}_${timestamp}_${safeName}`;
  }

  /**
   * Vérifie si l'environnement est sécurisé
   */
  static isSecureEnvironment(): boolean {
    return typeof window !== 'undefined' && 
           (window.location.protocol === 'https:' || 
            window.location.hostname === 'localhost');
  }

  /**
   * Log sécurisé qui masque les informations sensibles
   */
  static secureLog(message: string, data?: any) {
    if (import.meta.env.DEV) {
      if (data) {
        // Masque les champs sensibles
        const sanitizedData = { ...data };
        const sensitiveFields = ['password', 'email', 'phone', 'apiKey', 'token'];
        
        sensitiveFields.forEach(field => {
          if (sanitizedData[field]) {
            sanitizedData[field] = '***MASKED***';
          }
        });
        
        console.log(`🔐 ${message}`, sanitizedData);
      } else {
        console.log(`🔐 ${message}`);
      }
    }
  }
}

/**
 * Hook pour vérifier l'état de sécurité
 */
export const useFirebaseSecurity = () => {
  const isSecure = FirebaseSecurityUtils.isSecureEnvironment();
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';
  
  const logSecureOperation = (operation: string, data?: any) => {
    FirebaseSecurityUtils.secureLog(`Firebase ${operation}`, data);
  };

  return {
    isSecure,
    environment,
    validateTestimonialCreation: FirebaseSecurityUtils.validateTestimonialCreation,
    validateFileUpload: FirebaseSecurityUtils.validateFileUpload,
    sanitizeData: FirebaseSecurityUtils.sanitizeData,
    generateSecureFileName: FirebaseSecurityUtils.generateSecureFileName,
    logSecureOperation
  };
};