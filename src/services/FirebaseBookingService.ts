import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { Booking, FirestoreQuery, FirestoreResponse } from '@/types/firebase';
import { ApiResponse } from '@/types/common';

/**
 * Service de gestion des réservations avec Firestore
 * Pattern: Repository + Query Builder
 */
export class FirebaseBookingService {
  private static instance: FirebaseBookingService;
  private readonly collectionName = 'bookings';

  private constructor() {}

  public static getInstance(): FirebaseBookingService {
    if (!FirebaseBookingService.instance) {
      FirebaseBookingService.instance = new FirebaseBookingService();
    }
    return FirebaseBookingService.instance;
  }

  /**
   * Crée une nouvelle réservation
   */
  async createBooking(
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Booking>> {
    try {
      // Vérifications métier
      const validation = await this.validateBooking(bookingData);
      if (!validation.success) {
        return validation;
      }

      const newBooking: Omit<Booking, 'id'> = {
        ...bookingData,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(collection(firestore, this.collectionName), {
        ...newBooking,
        scheduledDate: Timestamp.fromDate(newBooking.scheduledDate),
        createdAt: Timestamp.fromDate(newBooking.createdAt),
        updatedAt: Timestamp.fromDate(newBooking.updatedAt)
      });

      const createdBooking: Booking = {
        id: docRef.id,
        ...newBooking
      };

      return {
        success: true,
        data: createdBooking,
        message: 'Réservation créée avec succès'
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la création de la réservation'
      };
    }
  }

  /**
   * Récupère une réservation par ID
   */
  async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    try {
      const docRef = doc(firestore, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const booking: Booking = {
          id: docSnap.id,
          ...data,
          scheduledDate: data.scheduledDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Booking;

        return {
          success: true,
          data: booking
        };
      } else {
        return {
          success: false,
          error: 'Réservation non trouvée'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la récupération de la réservation'
      };
    }
  }

  /**
   * Récupère les réservations d'un utilisateur
   */
  async getUserBookings(
    userId: string,
    options: {
      status?: Booking['status'];
      limit?: number;
      orderBy?: 'scheduledDate' | 'createdAt';
      orderDirection?: 'asc' | 'desc';
    } = {}
  ): Promise<FirestoreResponse<Booking[]>> {
    try {
      const {
        status,
        limit: queryLimit = 20,
        orderBy: orderField = 'scheduledDate',
        orderDirection = 'desc'
      } = options;

      let q = query(
        collection(firestore, this.collectionName),
        where('userId', '==', userId),
        orderBy(orderField, orderDirection),
        limit(queryLimit)
      );

      if (status) {
        q = query(
          collection(firestore, this.collectionName),
          where('userId', '==', userId),
          where('status', '==', status),
          orderBy(orderField, orderDirection),
          limit(queryLimit)
        );
      }

      const querySnapshot = await getDocs(q);
      
      const bookings: Booking[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          scheduledDate: data.scheduledDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Booking;
      });

      return {
        success: true,
        data: bookings,
        hasMore: querySnapshot.docs.length === queryLimit,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la récupération des réservations'
      };
    }
  }

  /**
   * Met à jour une réservation
   */
  async updateBooking(
    id: string,
    updates: Partial<Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ApiResponse<Booking>> {
    try {
      const docRef = doc(firestore, this.collectionName, id);
      
      // Vérification que la réservation existe
      const existingBooking = await this.getBookingById(id);
      if (!existingBooking.success) {
        return existingBooking;
      }

      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date())
      };

      // Convertit les dates en Timestamp si nécessaire
      if (updates.scheduledDate) {
        updateData.scheduledDate = Timestamp.fromDate(updates.scheduledDate);
      }

      await updateDoc(docRef, updateData);

      // Récupère la réservation mise à jour
      const updatedBooking = await this.getBookingById(id);
      return updatedBooking;
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la mise à jour de la réservation'
      };
    }
  }

  /**
   * Annule une réservation
   */
  async cancelBooking(id: string, reason?: string): Promise<ApiResponse<Booking>> {
    try {
      const result = await this.updateBooking(id, {
        status: 'cancelled',
        notes: reason ? `Annulée: ${reason}` : 'Annulée'
      });

      if (result.success) {
        return {
          ...result,
          message: 'Réservation annulée avec succès'
        };
      }

      return result;
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de l\'annulation de la réservation'
      };
    }
  }

  /**
   * Confirme une réservation
   */
  async confirmBooking(id: string): Promise<ApiResponse<Booking>> {
    try {
      const result = await this.updateBooking(id, {
        status: 'confirmed'
      });

      if (result.success) {
        return {
          ...result,
          message: 'Réservation confirmée avec succès'
        };
      }

      return result;
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la confirmation de la réservation'
      };
    }
  }

  /**
   * Récupère les créneaux disponibles pour une date donnée
   */
  async getAvailableSlots(
    coachId: string,
    date: Date,
    serviceDuration: number = 60
  ): Promise<ApiResponse<Date[]>> {
    try {
      // Récupère les réservations existantes pour cette date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const q = query(
        collection(firestore, this.collectionName),
        where('coachId', '==', coachId),
        where('scheduledDate', '>=', Timestamp.fromDate(startOfDay)),
        where('scheduledDate', '<=', Timestamp.fromDate(endOfDay)),
        where('status', 'in', ['pending', 'confirmed'])
      );

      const querySnapshot = await getDocs(q);
      const bookedSlots = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          start: data.scheduledDate.toDate(),
          duration: data.duration
        };
      });

      // Génère les créneaux disponibles (9h-18h par défaut)
      const availableSlots: Date[] = [];
      const workStart = new Date(date);
      workStart.setHours(9, 0, 0, 0);
      
      const workEnd = new Date(date);
      workEnd.setHours(18, 0, 0, 0);

      let currentSlot = new Date(workStart);
      
      while (currentSlot < workEnd) {
        const slotEnd = new Date(currentSlot.getTime() + serviceDuration * 60000);
        
        // Vérifie si le créneau est libre
        const isAvailable = !bookedSlots.some(bookedSlot => {
          const bookedEnd = new Date(bookedSlot.start.getTime() + bookedSlot.duration * 60000);
          return (currentSlot < bookedEnd && slotEnd > bookedSlot.start);
        });

        if (isAvailable) {
          availableSlots.push(new Date(currentSlot));
        }

        // Passe au créneau suivant (par tranches de 30 minutes)
        currentSlot = new Date(currentSlot.getTime() + 30 * 60000);
      }

      return {
        success: true,
        data: availableSlots
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la récupération des créneaux disponibles'
      };
    }
  }

  /**
   * Valide une réservation avant création
   */
  private async validateBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<null>> {
    // Vérifie que la date n'est pas dans le passé
    if (bookingData.scheduledDate < new Date()) {
      return {
        success: false,
        error: 'Impossible de réserver dans le passé'
      };
    }

    // Vérifie la disponibilité du créneau
    const availableSlots = await this.getAvailableSlots(
      bookingData.coachId,
      bookingData.scheduledDate,
      bookingData.duration
    );

    if (!availableSlots.success) {
      return availableSlots;
    }

    const requestedSlot = bookingData.scheduledDate;
    const isSlotAvailable = availableSlots.data!.some(slot => 
      Math.abs(slot.getTime() - requestedSlot.getTime()) < 60000 // 1 minute de tolérance
    );

    if (!isSlotAvailable) {
      return {
        success: false,
        error: 'Ce créneau n\'est pas disponible'
      };
    }

    return {
      success: true
    };
  }
}