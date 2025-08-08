// Types spécifiques à Firebase

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  goals: string[];
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  medicalConditions?: string;
  preferredServices: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  coachId: string;
  scheduledDate: Date;
  duration: number; // minutes
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  bookingId: string;
  userId: string;
  coachId: string;
  actualDate: Date;
  duration: number;
  exercises: Exercise[];
  notes: string;
  rating?: number;
  feedback?: string;
  createdAt: Date;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // for cardio
  notes?: string;
}

export interface Progress {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
  };
  photos?: string[]; // Firebase Storage URLs
  notes?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'reminder' | 'update' | 'promotion';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Collections Firestore
export interface FirestoreCollections {
  users: UserProfile;
  bookings: Booking;
  sessions: Session;
  progress: Progress;
  notifications: Notification;
}

// Query types
export interface FirestoreQuery<T> {
  collection: keyof FirestoreCollections;
  where?: Array<{
    field: keyof T;
    operator: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
    value: any;
  }>;
  orderBy?: Array<{
    field: keyof T;
    direction: 'asc' | 'desc';
  }>;
  limit?: number;
  startAfter?: any;
}

export interface FirestoreResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  hasMore?: boolean;
  lastDoc?: any;
}