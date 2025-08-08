import { useState, useEffect, useCallback } from 'react';
import { FirebaseAuthService } from '@/services/FirebaseAuthService';
import { FirebaseUser, UserProfile } from '@/types/firebase';
import { ApiResponse } from '@/types/common';

/**
 * Hook personnalisé pour l'authentification Firebase
 * Pattern: Custom Hook + Observer + Repository
 */
export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authService = FirebaseAuthService.getInstance();

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = authService.addAuthStateListener(async (firebaseUser) => {
      setUser(firebaseUser);
      setError(null);

      if (firebaseUser) {
        // Charge le profil utilisateur complet
        const profileResult = await authService.getUserProfile(firebaseUser.uid);
        if (profileResult.success && profileResult.data) {
          setUserProfile(profileResult.data);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [authService]);

  /**
   * Inscription d'un nouvel utilisateur
   */
  const signUp = useCallback(async (
    email: string,
    password: string,
    profileData: Omit<UserProfile, 'uid' | 'email' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<FirebaseUser>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.signUp(email, password, profileData);
      
      if (!result.success) {
        setError(result.error || 'Erreur lors de l\'inscription');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de l\'inscription';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [authService]);

  /**
   * Connexion d'un utilisateur
   */
  const signIn = useCallback(async (
    email: string,
    password: string
  ): Promise<ApiResponse<FirebaseUser>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.signIn(email, password);
      
      if (!result.success) {
        setError(result.error || 'Erreur lors de la connexion');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de la connexion';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [authService]);

  /**
   * Déconnexion
   */
  const signOut = useCallback(async (): Promise<ApiResponse<null>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.signOut();
      
      if (!result.success) {
        setError(result.error || 'Erreur lors de la déconnexion');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de la déconnexion';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [authService]);

  /**
   * Réinitialisation du mot de passe
   */
  const resetPassword = useCallback(async (
    email: string
  ): Promise<ApiResponse<null>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.resetPassword(email);
      
      if (!result.success) {
        setError(result.error || 'Erreur lors de la réinitialisation');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de la réinitialisation';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [authService]);

  /**
   * Met à jour le profil utilisateur
   */
  const updateProfile = useCallback(async (
    updates: Partial<Omit<UserProfile, 'uid' | 'email' | 'createdAt'>>
  ): Promise<ApiResponse<UserProfile>> => {
    if (!user) {
      return {
        success: false,
        error: 'Utilisateur non connecté'
      };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authService.updateUserProfile(user.uid, updates);
      
      if (result.success && result.data) {
        setUserProfile(result.data);
      } else {
        setError(result.error || 'Erreur lors de la mise à jour');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de la mise à jour';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [user, authService]);

  /**
   * Force le rechargement du profil utilisateur
   */
  const refreshProfile = useCallback(async (): Promise<void> => {
    if (!user) return;

    setLoading(true);
    const profileResult = await authService.getUserProfile(user.uid);
    
    if (profileResult.success && profileResult.data) {
      setUserProfile(profileResult.data);
    }
    
    setLoading(false);
  }, [user, authService]);

  /**
   * Clear l'erreur actuelle
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // État
    user,
    userProfile,
    loading,
    error,
    isAuthenticated: !!user,
    isEmailVerified: user?.emailVerified || false,

    // Actions
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile,
    clearError
  };
}

/**
 * Hook pour vérifier les permissions d'un utilisateur
 */
export function useUserPermissions() {
  const { user, userProfile } = useAuth();

  const isAdmin = useCallback((): boolean => {
    // Logique pour déterminer si l'utilisateur est admin
    return userProfile?.email === 'admin@gmfitness.fr';
  }, [userProfile]);

  const isCoach = useCallback((): boolean => {
    // Logique pour déterminer si l'utilisateur est coach
    return userProfile?.email === 'coach@gmfitness.fr' || isAdmin();
  }, [userProfile, isAdmin]);

  const canBookService = useCallback((): boolean => {
    return !!user && user.emailVerified;
  }, [user]);

  const canAccessBookings = useCallback((): boolean => {
    return !!user;
  }, [user]);

  return {
    isAdmin: isAdmin(),
    isCoach: isCoach(),
    canBookService: canBookService(),
    canAccessBookings: canAccessBookings()
  };
}