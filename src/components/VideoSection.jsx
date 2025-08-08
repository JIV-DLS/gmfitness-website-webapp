import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Section vidéos avec présentation du coach et exemples de séances
 * Pattern: Grid Layout + YouTube Embeds
 */
export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  // Vidéo de présentation du coach
  const presentationVideo = {
    id: 'presentation',
    title: 'Découvrez Gilson Mendes',
    description: 'Présentation de votre coach sportif sur la Côte d\'Azur',
    youtubeId: 'NdcT_AjbnGM', // YouTube Short de présentation
    thumbnail: '/api/placeholder/400/225',
    category: 'Présentation'
  };

  // Vidéos d'exemple de séances
  const sessionVideos = [
    {
      id: 'session1',
      title: '20 minutes de Pilates pour un ventre plat',
      description: 'Pilates 100% abdo - Séance complète pour renforcer votre core',
      youtubeId: '02ic0w-QWfs',
      thumbnail: '/api/placeholder/400/225',
      category: 'Exemples de séances',
      duration: '20 min'
    },
    {
      id: 'session2', 
      title: 'YOGA FLOW - Routine parfaite',
      description: 'Séance de yoga flow de 25 minutes pour détente et flexibilité',
      youtubeId: '_hlpJcbWl48',
      thumbnail: '/api/placeholder/400/225',
      category: 'Exemples de séances',
      duration: '25 min'
    },
    {
      id: 'session3',
      title: '20 Minutes Stretching corps complet',
      description: 'Séance d\'étirement complète pour assouplir tout le corps',
      youtubeId: 'BBqzBUFQRKg',
      thumbnail: '/api/placeholder/400/225', 
      category: 'Exemples de séances',
      duration: '20 min'
    }
  ];

  const allVideos = [presentationVideo, ...sessionVideos];

  const getYouTubeEmbedUrl = (youtubeId) => {
    return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&showinfo=0`;
  };

  const getYouTubePreviewUrl = (youtubeId) => {
    return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&showinfo=0&autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}`;
  };

  const getYouTubeThumbnail = (youtubeId) => {
    // Essayer plusieurs qualités de thumbnail YouTube
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  const getYouTubeThumbnailFallback = (youtubeId) => {
    // Fallback si maxresdefault ne fonctionne pas
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  };

  return (
    <section
      id="videos"
      className="min-h-screen bg-gradient-to-br from-azure-50 via-ocean-50 to-mediterranean-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            🎥 Découvrez mon{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-600 to-ocean-600">
              Approche
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez ma chaîne YouTube et mes séances : Pilates, Yoga, Stretching et plus encore !
          </p>
        </motion.div>

        {/* Vidéo de présentation principale */}
        {presentationVideo.youtubeId && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-azure-500 to-ocean-500 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  🎯 {presentationVideo.title}
                </h3>
                <p className="text-azure-100">
                  {presentationVideo.description}
                </p>
              </div>
              
              <div className="p-6">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={getYouTubeEmbedUrl(presentationVideo.youtubeId)}
                    title={presentationVideo.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Exemples de séances */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            💪 Exemples de Séances
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Pilates, Yoga Flow et Stretching - Séances complètes directement depuis ma chaîne YouTube
          </p>
        </motion.div>

        {/* Grid des vidéos d'exemple */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {sessionVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Thumbnail avec preview au hover */}
              <div 
                className="relative aspect-video bg-gray-200 dark:bg-gray-700 cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
                onMouseEnter={() => setPreviewVideo(video.id)}
                onMouseLeave={() => setPreviewVideo(null)}
              >
                {video.youtubeId ? (
                  <>
                    {/* Preview iframe au hover */}
                    {previewVideo === video.id ? (
                      <iframe
                        src={getYouTubePreviewUrl(video.youtubeId)}
                        className="w-full h-full object-cover"
                        frameBorder="0"
                        allow="autoplay; muted"
                        title={`Preview ${video.title}`}
                      />
                    ) : (
                      /* Thumbnail normal */
                      <>
                        <img
                          src={getYouTubeThumbnail(video.youtubeId)}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback vers une qualité inférieure si maxres ne marche pas
                            e.target.src = getYouTubeThumbnailFallback(video.youtubeId);
                          }}
                        />
                        
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-azure-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 5v10l7-5z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Survolez pour un aperçu
                          </div>
                        </div>

                        {/* Duration badge */}
                        {video.duration && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                            {video.duration}
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl">🎥</span>
                  </div>
                )}
              </div>

              {/* Video info */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {video.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-azure-600 dark:text-azure-400 font-medium">
                    {video.category}
                  </span>
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="text-azure-600 hover:text-azure-700 dark:text-azure-400 dark:hover:text-azure-300 text-sm font-medium transition-colors"
                  >
                    Regarder →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal pour vidéo sélectionnée */}
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-azure-500 to-ocean-500 p-4 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {selectedVideo.youtubeId ? (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={getYouTubeEmbedUrl(selectedVideo.youtubeId)}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <p className="text-gray-600 dark:text-gray-300">
                      Vidéo à ajouter - ID YouTube manquant
                    </p>
                  </div>
                )}
                
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Envie de plus de contenu ? Découvrez ma chaîne YouTube complète !
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.youtube.com/@Gilson.Mendes-Fitness/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Ma chaîne YouTube
            </a>
            <a
              href="#booking"
              className="bg-azure-600 hover:bg-azure-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Réserver une séance
            </a>
            <a
              href="#contact"
              className="border border-azure-600 text-azure-600 hover:bg-azure-50 dark:hover:bg-azure-900 px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Me contacter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}