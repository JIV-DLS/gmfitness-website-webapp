import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  User,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '@/config/firebase';
import { FirebaseUser, UserProfile } from '@/types/firebase';
import { ApiResponse } from '@/types/common';

/**
 * Service d'authentification Firebase
 * Pattern: Repository + Observer + Strategy
 */
export class FirebaseAuthService {
  private static instance: FirebaseAuthService;
  private authStateListeners: Array<(user: FirebaseUser | null) => void> = [];

  private constructor() {
    this.initializeAuthListener();
  }

  public static getInstance(): FirebaseAuthService {
    if (!FirebaseAuthService.instance) {
      FirebaseAuthService.instance = new FirebaseAuthService();
    }
    return FirebaseAuthService.instance;
  }

  /**
   * Initialise l'écoute des changements d'état d'authentification
   */
  private initializeAuthListener(): void {
    onAuthStateChanged(auth, async (firebaseUser) => {
      let user: FirebaseUser | null = null;

      if (firebaseUser) {
        user = await this.mapFirebaseUserToCustomUser(firebaseUser);
      }

      // Notifie tous les listeners
      this.authStateListeners.forEach(listener => listener(user));
    });
  }

  /**
   * Convertit un User Firebase en FirebaseUser custom
   */
  private async mapFirebaseUserToCustomUser(firebaseUser: User): Promise<FirebaseUser> {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      phoneNumber: firebaseUser.phoneNumber,
      createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
      lastLoginAt: new Date(firebaseUser.metadata.lastSignInTime || Date.now())
    };
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  async signUp(
    email: string,
    password: string,
    profileData: Omit<UserProfile, 'uid' | 'email' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<FirebaseUser>> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Met à jour le profil Firebase
      await updateProfile(firebaseUser, {
        displayName: `${profileData.firstName} ${profileData.lastName}`
      });

      // Crée le profil utilisateur dans Firestore
      const userProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: email,
        ...profileData,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(firestore, 'users', firebaseUser.uid), userProfile);

      // Envoie l'email de vérification
      await sendEmailVerification(firebaseUser);

      const customUser = await this.mapFirebaseUserToCustomUser(firebaseUser);

      return {
        success: true,
        data: customUser,
        message: 'Compte créé avec succès. Vérifiez votre email.'
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  /**
   * Connexion d'un utilisateur
   */
  async signIn(email: string, password: string): Promise<ApiResponse<FirebaseUser>> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const customUser = await this.mapFirebaseUserToCustomUser(userCredential.user);

      return {
        success: true,
        data: customUser,
        message: 'Connexion réussie'
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  /**
   * Déconnexion
   */
  async signOut(): Promise<ApiResponse<null>> {
    try {
      await signOut(auth);
      return {
        success: true,
        message: 'Déconnexion réussie'
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la déconnexion'
      };
    }
  }

  /**
   * Réinitialisation du mot de passe
   */
  async resetPassword(email: string): Promise<ApiResponse<null>> {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Email de réinitialisation envoyé'
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  /**
   * Obtient le profil utilisateur complet depuis Firestore
   */
  async getUserProfile(uid: string): Promise<ApiResponse<UserProfile>> {
    try {
      const docRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        return {
          success: true,
          data: {
            ...data,
            createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
            updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt)
          }
        };
      } else {
        return {
          success: false,
          error: 'Profil utilisateur non trouvé'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la récupération du profil'
      };
    }
  }

  /**
   * Met à jour le profil utilisateur
   */
  async updateUserProfile(
    uid: string,
    updates: Partial<Omit<UserProfile, 'uid' | 'email' | 'createdAt'>>
  ): Promise<ApiResponse<UserProfile>> {
    try {
      const docRef = doc(firestore, 'users', uid);
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };

      await updateDoc(docRef, updateData);

      // Récupère le profil mis à jour
      const updatedProfile = await this.getUserProfile(uid);
      return updatedProfile;
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la mise à jour du profil'
      };
    }
  }

  /**
   * Obtient l'utilisateur actuellement connecté
   */
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Vérifie si un utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return !!auth.currentUser;
  }

  /**
   * Ajoute un listener pour les changements d'état d'authentification
   */
  addAuthStateListener(callback: (user: FirebaseUser | null) => void): () => void {
    this.authStateListeners.push(callback);
    
    // Retourne une fonction pour supprimer le listener
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  /**
   * Convertit les codes d'erreur Firebase en messages lisibles
   */
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cet email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères';
      case 'auth/invalid-email':
        return 'Email invalide';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Réessayez plus tard';
      case 'auth/network-request-failed':
        return 'Erreur de connexion réseau';
      default:
        return 'Une erreur inattendue s\'est produite';
    }
  }
}