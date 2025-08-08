import { useState, useEffect, useCallback } from 'react';
import { FirebaseBookingService } from '@/services/FirebaseBookingService';
import { Booking } from '@/types/firebase';
import { ApiResponse } from '@/types/common';
import { useAuth } from './useAuth';

/**
 * Hook personnalisé pour la gestion des réservations
 * Pattern: Custom Hook + Repository + Cache
 */
export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const bookingService = FirebaseBookingService.getInstance();

  /**
   * Charge les réservations de l'utilisateur
   */
  const loadUserBookings = useCallback(async (
    options: {
      status?: Booking['status'];
      limit?: number;
      orderBy?: 'scheduledDate' | 'createdAt';
      orderDirection?: 'asc' | 'desc';
    } = {}
  ) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const result = await bookingService.getUserBookings(user.uid, options);
      
      if (result.success && result.data) {
        setBookings(result.data);
      } else {
        setError(result.error || 'Erreur lors du chargement des réservations');
      }
    } catch (error: any) {
      setError('Erreur inattendue lors du chargement');
    } finally {
      setLoading(false);
    }
  }, [user, bookingService]);

  /**
   * Crée une nouvelle réservation
   */
  const createBooking = useCallback(async (
    bookingData: Omit<Booking, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Booking>> => {
    if (!user) {
      return {
        success: false,
        error: 'Utilisateur non connecté'
      };
    }

    setLoading(true);
    setError(null);

    try {
      const result = await bookingService.createBooking({
        ...bookingData,
        userId: user.uid
      });

      if (result.success && result.data) {
        // Ajoute la nouvelle réservation à la liste
        setBookings(prev => [result.data!, ...prev]);
      } else {
        setError(result.error || 'Erreur lors de la création de la réservation');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de la création';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [user, bookingService]);

  /**
   * Met à jour une réservation
   */
  const updateBooking = useCallback(async (
    id: string,
    updates: Partial<Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ApiResponse<Booking>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await bookingService.updateBooking(id, updates);

      if (result.success && result.data) {
        // Met à jour la réservation dans la liste
        setBookings(prev => 
          prev.map(booking => 
            booking.id === id ? result.data! : booking
          )
        );
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
  }, [bookingService]);

  /**
   * Annule une réservation
   */
  const cancelBooking = useCallback(async (
    id: string,
    reason?: string
  ): Promise<ApiResponse<Booking>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await bookingService.cancelBooking(id, reason);

      if (result.success && result.data) {
        // Met à jour le statut dans la liste
        setBookings(prev => 
          prev.map(booking => 
            booking.id === id ? { ...booking, status: 'cancelled' } : booking
          )
        );
      } else {
        setError(result.error || 'Erreur lors de l\'annulation');
      }

      return result;
    } catch (error: any) {
      const errorMessage = 'Erreur inattendue lors de l\'annulation';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [bookingService]);

  /**
   * Charge les créneaux disponibles pour une date
   */
  const loadAvailableSlots = useCallback(async (
    coachId: string,
    date: Date,
    serviceDuration: number = 60
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await bookingService.getAvailableSlots(coachId, date, serviceDuration);
      
      if (result.success && result.data) {
        setAvailableSlots(result.data);
      } else {
        setError(result.error || 'Erreur lors du chargement des créneaux');
        setAvailableSlots([]);
      }
    } catch (error: any) {
      setError('Erreur inattendue lors du chargement des créneaux');
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  }, [bookingService]);

  /**
   * Filtre les réservations par statut
   */
  const getBookingsByStatus = useCallback((status: Booking['status']) => {
    return bookings.filter(booking => booking.status === status);
  }, [bookings]);

  /**
   * Récupère les prochaines réservations
   */
  const getUpcomingBookings = useCallback(() => {
    const now = new Date();
    return bookings
      .filter(booking => 
        booking.scheduledDate > now && 
        (booking.status === 'pending' || booking.status === 'confirmed')
      )
      .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
  }, [bookings]);

  /**
   * Récupère l'historique des réservations
   */
  const getBookingHistory = useCallback(() => {
    const now = new Date();
    return bookings
      .filter(booking => 
        booking.scheduledDate < now || 
        booking.status === 'completed' || 
        booking.status === 'cancelled'
      )
      .sort((a, b) => b.scheduledDate.getTime() - a.scheduledDate.getTime());
  }, [bookings]);

  /**
   * Clear l'erreur actuelle
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Rafraîchit les données
   */
  const refresh = useCallback(() => {
    loadUserBookings();
  }, [loadUserBookings]);

  // Charge les réservations au montage si l'utilisateur est connecté
  useEffect(() => {
    if (user) {
      loadUserBookings();
    } else {
      setBookings([]);
      setAvailableSlots([]);
    }
  }, [user, loadUserBookings]);

  return {
    // État
    bookings,
    availableSlots,
    loading,
    error,

    // Actions
    loadUserBookings,
    createBooking,
    updateBooking,
    cancelBooking,
    loadAvailableSlots,
    clearError,
    refresh,

    // Getters
    getBookingsByStatus,
    getUpcomingBookings,
    getBookingHistory,

    // Stats
    totalBookings: bookings.length,
    pendingBookings: getBookingsByStatus('pending').length,
    confirmedBookings: getBookingsByStatus('confirmed').length,
    upcomingBookings: getUpcomingBookings().length
  };
}