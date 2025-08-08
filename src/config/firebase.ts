import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { FirebaseConfig } from '@/types/firebase';

/**
 * Configuration Firebase sécurisée avec variables d'environnement
 * Pattern: Singleton + Configuration centralisée
 */

// Configuration Firebase à partir des variables d'environnement
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validation de la configuration
const validateFirebaseConfig = () => {
  const requiredKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_APP_ID'
  ];

  const missingKeys = requiredKeys.filter(key => !import.meta.env[key]);
  
  if (missingKeys.length > 0) {
    console.error('❌ Variables d\'environnement Firebase manquantes:', missingKeys);
    console.error('📝 Créez un fichier .env.local avec vos credentials Firebase');
    throw new Error(`Configuration Firebase incomplète: ${missingKeys.join(', ')}`);
  }

  console.log('✅ Configuration Firebase validée');
};

/**
 * Service Firebase avec pattern Singleton et gestion sécurisée
 */
class FirebaseService {
  private static instance: FirebaseService;
  private app: any;
  private _auth: any;
  private _firestore: any;
  private _storage: any;
  private _functions: any;
  private _analytics: any;
  private isEmulatorConnected = false;

  private constructor() {
    this.initializeFirebase();
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  private initializeFirebase() {
    // Configuration Firebase (à remplacer par vos vraies valeurs)
    const firebaseConfig: FirebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gmfitness-demo.firebaseapp.com",
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gmfitness-demo",
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gmfitness-demo.appspot.com",
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
      appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    };

    // Initialise Firebase seulement si pas déjà fait
    if (!getApps().length) {
      this.app = initializeApp(firebaseConfig);
    } else {
      this.app = getApps()[0];
    }

    // Initialise les services
    this._auth = getAuth(this.app);
    this._firestore = getFirestore(this.app);
    this._storage = getStorage(this.app);
    this._functions = getFunctions(this.app);

    // Analytics seulement en production
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      this._analytics = getAnalytics(this.app);
    }

    // Connexion aux émulateurs en développement
    if (import.meta.env.DEV && !this.isEmulatorConnected) {
      this.connectEmulators();
    }
  }

  private connectEmulators() {
    try {
      // Auth Emulator
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
        connectAuthEmulator(this._auth, 'http://localhost:9099', { disableWarnings: true });
        connectFirestoreEmulator(this._firestore, 'localhost', 8080);
        connectStorageEmulator(this._storage, 'localhost', 9199);
        connectFunctionsEmulator(this._functions, 'localhost', 5001);
        
        console.log('🔥 Firebase emulators connected');
        this.isEmulatorConnected = true;
      }
    } catch (error) {
      console.warn('Emulators already connected or not available:', error);
    }
  }

  // Getters pour les services Firebase
  get auth() {
    return this._auth;
  }

  get firestore() {
    return this._firestore;
  }

  get storage() {
    return this._storage;
  }

  get functions() {
    return this._functions;
  }

  get analytics() {
    return this._analytics;
  }

  // Méthode pour obtenir la configuration
  getConfig(): FirebaseConfig {
    return this.app.options;
  }

  // Méthode pour vérifier si Firebase est initialisé
  isInitialized(): boolean {
    return !!this.app;
  }
}

// Export des instances pour utilisation dans l'app
const firebaseService = FirebaseService.getInstance();

export const auth = firebaseService.auth;
export const firestore = firebaseService.firestore;
export const storage = firebaseService.storage;
export const functions = firebaseService.functions;
export const analytics = firebaseService.analytics;

export default firebaseService;