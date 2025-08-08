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
import { 
  Testimonial, 
  TestimonialFilters, 
  TestimonialStats,
  CoachingVideo 
} from '@/types/testimonials';
import { ApiResponse, FirestoreResponse } from '@/types/common';

/**
 * Service de gestion des témoignages avec Firestore
 * Pattern: Repository + Query Builder
 */
export class TestimonialService {
  private static instance: TestimonialService;
  private readonly testimonialsCollection = 'testimonials';
  private readonly videosCollection = 'coaching_videos';

  private constructor() {}

  public static getInstance(): TestimonialService {
    if (!TestimonialService.instance) {
      TestimonialService.instance = new TestimonialService();
    }
    return TestimonialService.instance;
  }

  /**
   * Crée un nouveau témoignage
   */
  async createTestimonial(
    testimonialData: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Testimonial>> {
    try {
      const newTestimonial: Omit<Testimonial, 'id'> = {
        ...testimonialData,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(collection(firestore, this.testimonialsCollection), {
        ...newTestimonial,
        testimonialDate: Timestamp.fromDate(newTestimonial.testimonialDate),
        createdAt: Timestamp.fromDate(newTestimonial.createdAt),
        updatedAt: Timestamp.fromDate(newTestimonial.updatedAt),
        publishedAt: newTestimonial.publishedAt ? Timestamp.fromDate(newTestimonial.publishedAt) : null
      });

      const createdTestimonial: Testimonial = {
        id: docRef.id,
        ...newTestimonial
      };

      return {
        success: true,
        data: createdTestimonial,
        message: 'Témoignage créé avec succès'
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la création du témoignage'
      };
    }
  }

  /**
   * Récupère les témoignages avec filtres
   */
  async getTestimonials(
    filters: TestimonialFilters = {},
    options: {
      limit?: number;
      orderBy?: 'rating' | 'testimonialDate' | 'createdAt';
      orderDirection?: 'asc' | 'desc';
      publicOnly?: boolean;
    } = {}
  ): Promise<FirestoreResponse<Testimonial[]>> {
    try {
      const {
        limit: queryLimit = 20,
        orderBy: orderField = 'createdAt',
        orderDirection = 'desc',
        publicOnly = true
      } = options;

      let q = query(
        collection(firestore, this.testimonialsCollection),
        orderBy(orderField, orderDirection),
        limit(queryLimit)
      );

      // Filtre pour témoignages publics seulement
      if (publicOnly) {
        q = query(q, where('isPublic', '==', true));
      }

      // Filtres supplémentaires
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }

      if (filters.rating) {
        q = query(q, where('rating', '>=', filters.rating));
      }

      if (filters.serviceType) {
        q = query(q, where('serviceType', '==', filters.serviceType));
      }

      if (filters.featured !== undefined) {
        q = query(q, where('featured', '==', filters.featured));
      }

      const querySnapshot = await getDocs(q);
      
      const testimonials: Testimonial[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          testimonialDate: data.testimonialDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          publishedAt: data.publishedAt ? data.publishedAt.toDate() : undefined
        } as Testimonial;
      });

      // Filtre côté client pour les critères complexes
      let filteredTestimonials = testimonials;

      if (filters.tags && filters.tags.length > 0) {
        filteredTestimonials = filteredTestimonials.filter(testimonial =>
          filters.tags!.some(tag => testimonial.tags.includes(tag))
        );
      }

      if (filters.hasVideo) {
        filteredTestimonials = filteredTestimonials.filter(testimonial =>
          !!testimonial.videoTestimonial
        );
      }

      if (filters.hasBeforeAfter) {
        filteredTestimonials = filteredTestimonials.filter(testimonial =>
          !!testimonial.beforeAfterImages
        );
      }

      return {
        success: true,
        data: filteredTestimonials,
        hasMore: querySnapshot.docs.length === queryLimit,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la récupération des témoignages'
      };
    }
  }

  /**
   * Récupère les témoignages mis en avant
   */
  async getFeaturedTestimonials(): Promise<ApiResponse<Testimonial[]>> {
    const result = await this.getTestimonials(
      { featured: true },
      { limit: 6, orderBy: 'rating', orderDirection: 'desc' }
    );

    return {
      success: result.success,
      data: result.data,
      error: result.error
    };
  }

  /**
   * Récupère les témoignages par type
   */
  async getTestimonialsByType(type: Testimonial['type']): Promise<ApiResponse<Testimonial[]>> {
    const result = await this.getTestimonials(
      { type },
      { limit: 10, orderBy: 'rating', orderDirection: 'desc' }
    );

    return {
      success: result.success,
      data: result.data,
      error: result.error
    };
  }

  /**
   * Met à jour un témoignage
   */
  async updateTestimonial(
    id: string,
    updates: Partial<Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ApiResponse<Testimonial>> {
    try {
      const docRef = doc(firestore, this.testimonialsCollection, id);
      
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date())
      };

      // Convertit les dates en Timestamp si nécessaire
      if (updates.testimonialDate) {
        updateData.testimonialDate = Timestamp.fromDate(updates.testimonialDate);
      }

      if (updates.publishedAt) {
        updateData.publishedAt = Timestamp.fromDate(updates.publishedAt);
      }

      await updateDoc(docRef, updateData);

      // Récupère le témoignage mis à jour
      const updatedTestimonial = await this.getTestimonialById(id);
      return updatedTestimonial;
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la mise à jour du témoignage'
      };
    }
  }

  /**
   * Récupère un témoignage par ID
   */
  async getTestimonialById(id: string): Promise<ApiResponse<Testimonial>> {
    try {
      const docRef = doc(firestore, this.testimonialsCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const testimonial: Testimonial = {
          id: docSnap.id,
          ...data,
          testimonialDate: data.testimonialDate.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          publishedAt: data.publishedAt ? data.publishedAt.toDate() : undefined
        } as Testimonial;

        return {
          success: true,
          data: testimonial
        };
      } else {
        return {
          success: false,
          error: 'Témoignage non trouvé'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la récupération du témoignage'
      };
    }
  }

  /**
   * Supprime un témoignage
   */
  async deleteTestimonial(id: string): Promise<ApiResponse<boolean>> {
    try {
      const docRef = doc(firestore, this.testimonialsCollection, id);
      await deleteDoc(docRef);

      return {
        success: true,
        data: true,
        message: 'Témoignage supprimé avec succès'
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la suppression du témoignage'
      };
    }
  }

  /**
   * Calcule les statistiques des témoignages
   */
  async getTestimonialStats(): Promise<ApiResponse<TestimonialStats>> {
    try {
      const result = await this.getTestimonials({}, { limit: 1000, publicOnly: false });
      
      if (!result.success || !result.data) {
        return {
          success: false,
          error: 'Erreur lors du calcul des statistiques'
        };
      }

      const testimonials = result.data;
      
      const stats: TestimonialStats = {
        total: testimonials.length,
        averageRating: testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length || 0,
        byRating: {},
        byServiceType: {},
        byTags: {},
        featuredCount: testimonials.filter(t => t.featured).length,
        videoCount: testimonials.filter(t => !!t.videoTestimonial).length,
        beforeAfterCount: testimonials.filter(t => !!t.beforeAfterImages).length
      };

      // Répartition par note
      for (let i = 1; i <= 5; i++) {
        stats.byRating[i] = testimonials.filter(t => t.rating === i).length;
      }

      // Répartition par type de service
      testimonials.forEach(testimonial => {
        stats.byServiceType[testimonial.serviceType] = 
          (stats.byServiceType[testimonial.serviceType] || 0) + 1;
      });

      // Répartition par tags
      testimonials.forEach(testimonial => {
        testimonial.tags.forEach(tag => {
          stats.byTags[tag] = (stats.byTags[tag] || 0) + 1;
        });
      });

      return {
        success: true,
        data: stats
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors du calcul des statistiques'
      };
    }
  }

  /**
   * Gestion des vidéos de coaching
   */
  async createCoachingVideo(
    videoData: Omit<CoachingVideo, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>
  ): Promise<ApiResponse<CoachingVideo>> {
    try {
      const newVideo: Omit<CoachingVideo, 'id'> = {
        ...videoData,
        views: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(collection(firestore, this.videosCollection), {
        ...newVideo,
        createdAt: Timestamp.fromDate(newVideo.createdAt),
        updatedAt: Timestamp.fromDate(newVideo.updatedAt),
        publishedAt: newVideo.publishedAt ? Timestamp.fromDate(newVideo.publishedAt) : null
      });

      const createdVideo: CoachingVideo = {
        id: docRef.id,
        ...newVideo
      };

      return {
        success: true,
        data: createdVideo,
        message: 'Vidéo créée avec succès'
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la création de la vidéo'
      };
    }
  }

  /**
   * Récupère les vidéos de coaching
   */
  async getCoachingVideos(
    category?: CoachingVideo['category'],
    isPublic: boolean = true
  ): Promise<ApiResponse<CoachingVideo[]>> {
    try {
      let q = query(
        collection(firestore, this.videosCollection),
        where('isPublic', '==', isPublic),
        orderBy('createdAt', 'desc'),
        limit(20)
      );

      if (category) {
        q = query(q, where('category', '==', category));
      }

      const querySnapshot = await getDocs(q);
      
      const videos: CoachingVideo[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          publishedAt: data.publishedAt ? data.publishedAt.toDate() : undefined
        } as CoachingVideo;
      });

      return {
        success: true,
        data: videos
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Erreur lors de la récupération des vidéos'
      };
    }
  }
}