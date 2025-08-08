import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

/**
 * Composant d'upload de vidéos pour les témoignages
 * Pattern: File Upload + Progress Tracking
 */
export const VideoUpload = memo(({
  onUploadComplete,
  onUploadError,
  maxFileSize = 50 * 1024 * 1024, // 50MB
  acceptedFormats = ['video/mp4', 'video/webm', 'video/ogg'],
  className = ''
}) => {
  const { t } = useI18n();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('firebase');

  const platforms = [
    {
      id: 'firebase',
      name: 'Firebase Storage',
      icon: '🔥',
      description: t('videoUpload.platforms.firebase', 'Stockage sécurisé et rapide')
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '📺',
      description: t('videoUpload.platforms.youtube', 'Hébergement gratuit et optimisé')
    },
    {
      id: 'vimeo',
      name: 'Vimeo',
      icon: '🎬',
      description: t('videoUpload.platforms.vimeo', 'Qualité premium et sans publicité')
    }
  ];

  const validateFile = useCallback((file) => {
    if (!file) return false;

    if (!acceptedFormats.includes(file.type)) {
      onUploadError?.(t('videoUpload.errors.format', 'Format de fichier non supporté'));
      return false;
    }

    if (file.size > maxFileSize) {
      onUploadError?.(t('videoUpload.errors.size', 'Fichier trop volumineux'));
      return false;
    }

    return true;
  }, [acceptedFormats, maxFileSize, onUploadError, t]);

  const handleFileSelect = useCallback((file) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    
    // Créer une preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [validateFile]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const simulateUpload = useCallback(async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulation d'upload avec progression
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    // Simulation du résultat final
    const mockVideoData = {
      id: Date.now().toString(),
      url: previewUrl,
      title: selectedFile.name,
      duration: 120, // secondes
      thumbnail: previewUrl,
      platform: selectedPlatform,
      uploadedAt: new Date().toISOString()
    };

    setUploading(false);
    onUploadComplete?.(mockVideoData);
  }, [selectedFile, previewUrl, selectedPlatform, onUploadComplete]);

  const resetUpload = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploading(false);
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Sélection de plateforme */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('videoUpload.platform.title', 'Choisir la plateforme d\'hébergement')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedPlatform === platform.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
              }`}
            >
              <div className="text-2xl mb-2">{platform.icon}</div>
              <div className="font-medium text-gray-900 dark:text-white">{platform.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{platform.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Zone de drop */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!selectedFile ? (
          <>
            <div className="text-4xl mb-4">🎥</div>
            <div className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('videoUpload.dropzone.title', 'Glissez votre vidéo ici')}
            </div>
            <div className="text-gray-600 dark:text-gray-400 mb-4">
              {t('videoUpload.dropzone.subtitle', 'ou cliquez pour sélectionner un fichier')}
            </div>
            <input
              type="file"
              accept={acceptedFormats.join(',')}
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('videoUpload.dropzone.formats', 'Formats acceptés: MP4, WebM, OGG')}
              <br />
              {t('videoUpload.dropzone.maxSize', 'Taille maximum: 50MB')}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {/* Preview vidéo */}
            <div className="max-w-md mx-auto">
              <video
                src={previewUrl}
                controls
                className="w-full rounded-lg"
                style={{ maxHeight: '200px' }}
              >
                {t('videoUpload.preview.unsupported', 'Votre navigateur ne supporte pas les vidéos HTML5.')}
              </video>
            </div>

            {/* Informations du fichier */}
            <div className="text-left max-w-md mx-auto">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div><strong>{t('videoUpload.file.name', 'Nom')}:</strong> {selectedFile.name}</div>
                <div><strong>{t('videoUpload.file.size', 'Taille')}:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</div>
                <div><strong>{t('videoUpload.file.type', 'Type')}:</strong> {selectedFile.type}</div>
              </div>
            </div>

            {/* Progression d'upload */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('videoUpload.progress.uploading', 'Upload en cours...')}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-4 justify-center">
              {!uploading && (
                <>
                  <button
                    onClick={simulateUpload}
                    className="btn-primary"
                  >
                    {t('videoUpload.actions.upload', 'Uploader la vidéo')}
                  </button>
                  <button
                    onClick={resetUpload}
                    className="btn-secondary"
                  >
                    {t('videoUpload.actions.cancel', 'Annuler')}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Conseils d'optimisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <span className="text-blue-500 text-xl">💡</span>
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              {t('videoUpload.tips.title', 'Conseils pour une vidéo optimale')}
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• {t('videoUpload.tips.duration', 'Durée idéale: 30 secondes à 2 minutes')}</li>
              <li>• {t('videoUpload.tips.quality', 'Qualité recommandée: 1080p (Full HD)')}</li>
              <li>• {t('videoUpload.tips.lighting', 'Éclairage naturel de préférence')}</li>
              <li>• {t('videoUpload.tips.audio', 'Audio clair et sans bruit de fond')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

VideoUpload.displayName = 'VideoUpload';