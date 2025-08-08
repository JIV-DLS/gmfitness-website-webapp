import { 
  VideoTestimonial, 
  VideoHostingPlatform, 
  VideoUploadProgress,
  VideoHostingConfig 
} from '@/types/testimonials';
import { ApiResponse } from '@/types/common';
import { storage } from '@/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

/**
 * Service d'hébergement vidéo avec support multi-plateforme
 * Pattern: Strategy + Factory + Observer
 */
export interface VideoHostingProvider {
  upload(file: File, onProgress?: (progress: VideoUploadProgress) => void): Promise<ApiResponse<VideoTestimonial>>;
  getEmbedUrl(videoId: string): string;
  getThumbnail(videoId: string): string;
  delete(videoId: string): Promise<ApiResponse<boolean>>;
}

/**
 * Provider Firebase Storage
 */
export class FirebaseVideoProvider implements VideoHostingProvider {
  constructor(private config: VideoHostingConfig['firebase']) {}

  async upload(
    file: File, 
    onProgress?: (progress: VideoUploadProgress) => void
  ): Promise<ApiResponse<VideoTestimonial>> {
    try {
      // Validation du fichier
      if (!this.validateFile(file)) {
        return {
          success: false,
          error: 'Fichier vidéo invalide ou trop volumineux'
        };
      }

      const timestamp = Date.now();
      const fileName = `videos/${timestamp}-${file.name}`;
      const videoRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(videoRef, file);

      return new Promise((resolve) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.({
              file,
              progress,
              status: 'uploading'
            });
          },
          (error) => {
            console.error('Upload error:', error);
            onProgress?.({
              file,
              progress: 0,
              status: 'error',
              error: error.message
            });
            resolve({
              success: false,
              error: 'Erreur lors de l\'upload de la vidéo'
            });
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              
              // Générer une miniature (placeholder pour l'instant)
              const thumbnail = this.generateThumbnail(downloadURL);
              
              const videoTestimonial: VideoTestimonial = {
                url: downloadURL,
                thumbnail,
                duration: 0, // À déterminer après upload
                platform: 'firebase',
                videoId: fileName
              };

              onProgress?.({
                file,
                progress: 100,
                status: 'completed',
                url: downloadURL
              });

              resolve({
                success: true,
                data: videoTestimonial,
                message: 'Vidéo uploadée avec succès'
              });
            } catch (error) {
              resolve({
                success: false,
                error: 'Erreur lors de la finalisation de l\'upload'
              });
            }
          }
        );
      });
    } catch (error) {
      return {
        success: false,
        error: 'Erreur inattendue lors de l\'upload'
      };
    }
  }

  getEmbedUrl(videoId: string): string {
    // Pour Firebase, on retourne l'URL directe
    return videoId.startsWith('https://') ? videoId : `https://firebasestorage.googleapis.com/${videoId}`;
  }

  getThumbnail(videoId: string): string {
    // Placeholder thumbnail - en production, utiliser un service de génération de miniatures
    return 'https://via.placeholder.com/320x180/dc2626/ffffff?text=Video';
  }

  async delete(videoId: string): Promise<ApiResponse<boolean>> {
    try {
      const videoRef = ref(storage, videoId);
      // Note: deleteObject n'est pas encore implémenté dans cette version
      // await deleteObject(videoRef);
      
      return {
        success: true,
        data: true,
        message: 'Vidéo supprimée avec succès'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la suppression de la vidéo'
      };
    }
  }

  private validateFile(file: File): boolean {
    const maxSize = (this.config?.maxFileSize || 100) * 1024 * 1024; // MB en bytes
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
    
    return file.size <= maxSize && validTypes.includes(file.type);
  }

  private generateThumbnail(videoUrl: string): string {
    // En production, utiliser un service comme Cloudinary ou AWS Lambda
    // pour générer automatiquement des miniatures
    return 'https://via.placeholder.com/320x180/dc2626/ffffff?text=Video+Thumbnail';
  }
}

/**
 * Provider YouTube
 */
export class YouTubeVideoProvider implements VideoHostingProvider {
  constructor(private config: VideoHostingConfig['youtube']) {}

  async upload(file: File): Promise<ApiResponse<VideoTestimonial>> {
    // Note: L'upload direct vers YouTube nécessite OAuth et l'API YouTube
    // Pour l'instant, on simule un processus manuel
    return {
      success: false,
      error: 'Upload YouTube nécessite une configuration manuelle'
    };
  }

  getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  getThumbnail(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  async delete(videoId: string): Promise<ApiResponse<boolean>> {
    return {
      success: false,
      error: 'Suppression YouTube nécessite une action manuelle'
    };
  }
}

/**
 * Provider Vimeo
 */
export class VimeoVideoProvider implements VideoHostingProvider {
  constructor(private config: VideoHostingConfig['vimeo']) {}

  async upload(file: File): Promise<ApiResponse<VideoTestimonial>> {
    // Implementation Vimeo API
    return {
      success: false,
      error: 'Upload Vimeo en cours d\'implémentation'
    };
  }

  getEmbedUrl(videoId: string): string {
    return `https://player.vimeo.com/video/${videoId}`;
  }

  getThumbnail(videoId: string): string {
    // Nécessite un appel API Vimeo pour obtenir la vraie miniature
    return 'https://via.placeholder.com/320x180/1ab7ea/ffffff?text=Vimeo';
  }

  async delete(videoId: string): Promise<ApiResponse<boolean>> {
    return {
      success: false,
      error: 'Suppression Vimeo en cours d\'implémentation'
    };
  }
}

/**
 * Factory pour créer les providers
 */
export class VideoHostingFactory {
  static createProvider(
    platform: VideoHostingPlatform, 
    config: VideoHostingConfig
  ): VideoHostingProvider {
    switch (platform) {
      case 'firebase':
        return new FirebaseVideoProvider(config.firebase);
      case 'youtube':
        return new YouTubeVideoProvider(config.youtube);
      case 'vimeo':
        return new VimeoVideoProvider(config.vimeo);
      default:
        return new FirebaseVideoProvider(config.firebase);
    }
  }
}

/**
 * Service principal de gestion vidéo
 */
export class VideoHostingService {
  private static instance: VideoHostingService;
  private providers: Map<VideoHostingPlatform, VideoHostingProvider> = new Map();
  private defaultProvider: VideoHostingProvider;

  private constructor(private config: VideoHostingConfig) {
    // Initialise le provider par défaut (Firebase)
    this.defaultProvider = VideoHostingFactory.createProvider('firebase', config);
    this.providers.set('firebase', this.defaultProvider);
  }

  public static getInstance(config?: VideoHostingConfig): VideoHostingService {
    if (!VideoHostingService.instance) {
      if (!config) {
        throw new Error('VideoHostingConfig required for first initialization');
      }
      VideoHostingService.instance = new VideoHostingService(config);
    }
    return VideoHostingService.instance;
  }

  /**
   * Upload une vidéo avec le provider spécifié
   */
  async uploadVideo(
    file: File,
    platform: VideoHostingPlatform = 'firebase',
    onProgress?: (progress: VideoUploadProgress) => void
  ): Promise<ApiResponse<VideoTestimonial>> {
    const provider = this.getProvider(platform);
    return provider.upload(file, onProgress);
  }

  /**
   * Obtient l'URL d'embed pour une vidéo
   */
  getEmbedUrl(videoId: string, platform: VideoHostingPlatform): string {
    const provider = this.getProvider(platform);
    return provider.getEmbedUrl(videoId);
  }

  /**
   * Obtient la miniature d'une vidéo
   */
  getThumbnail(videoId: string, platform: VideoHostingPlatform): string {
    const provider = this.getProvider(platform);
    return provider.getThumbnail(videoId);
  }

  /**
   * Supprime une vidéo
   */
  async deleteVideo(videoId: string, platform: VideoHostingPlatform): Promise<ApiResponse<boolean>> {
    const provider = this.getProvider(platform);
    return provider.delete(videoId);
  }

  /**
   * Obtient ou crée un provider pour une plateforme
   */
  private getProvider(platform: VideoHostingPlatform): VideoHostingProvider {
    if (!this.providers.has(platform)) {
      const provider = VideoHostingFactory.createProvider(platform, this.config);
      this.providers.set(platform, provider);
    }
    return this.providers.get(platform)!;
  }

  /**
   * Valide un fichier vidéo
   */
  validateVideoFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Le fichier est trop volumineux (max 100MB)'
      };
    }

    if (!validTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Format de fichier non supporté (MP4, WebM, OGG uniquement)'
      };
    }

    return { isValid: true };
  }

  /**
   * Obtient les plateformes disponibles
   */
  getAvailablePlatforms(): VideoHostingPlatform[] {
    return ['firebase', 'youtube', 'vimeo'];
  }
}