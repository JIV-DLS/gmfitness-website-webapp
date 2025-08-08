import React, { memo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

/**
 * Lecteur vidéo universel pour les témoignages
 * Pattern: Adapter + Strategy + State Management
 */
export const VideoPlayer = memo(({
  video,
  autoplay = false,
  controls = true,
  className = '',
  onPlay,
  onPause,
  onEnded
}) => {
  const { t } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause?.();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    if (isPlaying) {
      resetTimeout();
    }

    return () => clearTimeout(timeout);
  }, [isPlaying]);

  if (!video) {
    return null;
  }

  // Rendu pour vidéos locales/Firebase
  if (video.platform === 'firebase' || video.url.includes('blob:') || video.url.includes('.mp4')) {
    return (
      <motion.div
        ref={containerRef}
        className={`relative bg-black rounded-lg overflow-hidden ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(isPlaying ? false : true)}
      >
        <video
          ref={videoRef}
          src={video.url}
          poster={video.thumbnail}
          autoPlay={autoplay}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full"
          style={{ maxHeight: '500px' }}
        >
          {t('videoPlayer.unsupported', 'Votre navigateur ne supporte pas les vidéos HTML5.')}
        </video>

        {/* Overlay de lecture */}
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={togglePlayPause}
          >
            <motion.button
              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-2xl text-gray-900 hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ▶️
            </motion.button>
          </motion.div>
        )}

        {/* Contrôles personnalisés */}
        {controls && (
          <motion.div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
            animate={{ opacity: showControls ? 1 : 0 }}
          >
            {/* Barre de progression */}
            <div
              className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-200"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>

            {/* Contrôles */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlayPause}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                
                <div className="text-sm">
                  {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      setVolume(newVolume);
                      if (videoRef.current) {
                        videoRef.current.volume = newVolume;
                      }
                    }}
                    className="w-16"
                  />
                </div>
                
                <button
                  onClick={toggleFullscreen}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
                >
                  {isFullscreen ? '🗗' : '⛶'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Informations vidéo */}
        {video.title && (
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm max-w-xs">
            {video.title}
          </div>
        )}
      </motion.div>
    );
  }

  // Rendu pour YouTube
  if (video.platform === 'youtube' || video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
    const videoId = video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    
    return (
      <motion.div
        className={`relative aspect-video rounded-lg overflow-hidden ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}`}
          title={video.title || 'Témoignage vidéo'}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    );
  }

  // Rendu pour Vimeo
  if (video.platform === 'vimeo' || video.url.includes('vimeo.com')) {
    const videoId = video.url.match(/vimeo\.com\/(\d+)/)?.[1];
    
    return (
      <motion.div
        className={`relative aspect-video rounded-lg overflow-hidden ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}`}
          title={video.title || 'Témoignage vidéo'}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    );
  }

  // Fallback pour URLs directes
  return (
    <motion.div
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <video
        src={video.url}
        poster={video.thumbnail}
        controls={controls}
        autoPlay={autoplay}
        className="w-full h-full"
        style={{ maxHeight: '500px' }}
      >
        {t('videoPlayer.unsupported', 'Votre navigateur ne supporte pas les vidéos HTML5.')}
      </video>
    </motion.div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';