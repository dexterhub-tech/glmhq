'use client';

import React from 'react';
import Image from 'next/image';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download } from 'lucide-react';
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext';

export default function StickyAudioPlayer() {
  const { 
    currentMessage, 
    isPlaying, 
    isPlayerVisible, 
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    error,
    togglePlayPause, 
    skipBackward, 
    skipForward, 
    closePlayer,
    handleSeek,
    handleVolumeChange,
    toggleMute
  } = useAudioPlayer();

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds) || isNaN(seconds)) {
      return '0:00';
    }
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle progress bar change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    handleSeek(newTime);
  };

  // Handle volume slider change
  const handleVolumeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    handleVolumeChange(newVolume);
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts when player is visible
      if (!isPlayerVisible || !currentMessage) return;

      // Don't interfere with input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ':
        case 'k':
          // Space or K to toggle play/pause
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          // Left arrow to skip backward
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowRight':
          // Right arrow to skip forward
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowUp':
          // Up arrow to increase volume
          e.preventDefault();
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          // Down arrow to decrease volume
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
        case 'm':
          // M to toggle mute
          e.preventDefault();
          toggleMute();
          break;
        case 'Escape':
          // Escape to close player
          e.preventDefault();
          closePlayer();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayerVisible, currentMessage, volume, togglePlayPause, skipBackward, skipForward, handleVolumeChange, toggleMute, closePlayer]);

  // Only render when player is visible and there's a current message
  if (!isPlayerVisible || !currentMessage) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      role="region"
      aria-label="Audio player"
      aria-live="polite"
    >
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isPlaying ? `Playing ${currentMessage.title}` : `Paused ${currentMessage.title}`}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Top Section: Thumbnail and Message Info */}
          <div className="flex items-start gap-4">
            {/* Message Thumbnail */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={currentMessage.image}
                alt={`${currentMessage.title} thumbnail`}
                fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-cover"
              />
            </div>

            {/* Message Information */}
            <div className="flex-1 min-w-0" aria-label="Now playing">
              <h3 className="font-anton text-xl md:text-2xl text-black leading-tight" id="player-title">
                {currentMessage.title}
              </h3>
              <p className="font-satoshi text-base md:text-lg text-gray-600 mt-1" id="player-preacher">
                {isLoading ? 'Loading...' : error ? error : currentMessage.preacher}
              </p>
            </div>

            {/* Close Button - Top right */}
            <button
              onClick={closePlayer}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Close player"
              title="Close player"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Progress Bar - Full width */}
          <div className="w-full">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              disabled={isLoading || !!error}
              className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer progress-bar disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              aria-label="Seek audio position"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={currentTime}
              aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
              role="slider"
              tabIndex={0}
              title="Seek audio position"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #d1d5db ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #d1d5db 100%)`
              }}
            />
          </div>

          {/* Bottom Section: Playback Controls */}
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {/* Skip Backward Button */}
            <button
              onClick={skipBackward}
              disabled={isLoading || !!error}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-gray-600 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label="Skip backward 10 seconds"
              title="Skip backward 10 seconds"
            >
              <SkipBack className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              disabled={isLoading || !!error}
              className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-black hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              aria-pressed={isPlaying}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isLoading ? (
                <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black border-t-transparent rounded-full animate-spin" aria-label="Loading" />
              ) : isPlaying ? (
                <Pause className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" aria-hidden="true" />
              ) : (
                <Play className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" aria-hidden="true" />
              )}
            </button>

            {/* Skip Forward Button */}
            <button
              onClick={skipForward}
              disabled={isLoading || !!error}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-gray-600 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label="Skip forward 10 seconds"
              title="Skip forward 10 seconds"
            >
              <SkipForward className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
            </button>

            {/* Download Button */}
            <a
              href={currentMessage.audioUrl}
              download={`${currentMessage.title} - ${currentMessage.preacher}.mp3`}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-gray-600 hover:text-black transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label={`Download ${currentMessage.title}`}
              title="Download message"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Download className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Screen reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* Progress bar thumb - Blue to match the design */
        .progress-bar::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          transition: transform 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .progress-bar::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .progress-bar::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          transition: transform 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .progress-bar::-moz-range-thumb:hover {
          transform: scale(1.15);
        }

        /* Volume slider thumb */
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: none;
          transition: transform 0.2s;
        }

        .volume-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }

        /* Focus styles for sliders */
        .progress-bar:focus,
        .volume-slider:focus {
          outline: none;
        }

        .progress-bar:focus-visible,
        .volume-slider:focus-visible {
          outline: 2px solid #000;
          outline-offset: 2px;
          border-radius: 8px;
        }

        .progress-bar:focus-visible::-webkit-slider-thumb,
        .volume-slider:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
          transform: scale(1.2);
        }

        .progress-bar:focus-visible::-moz-range-thumb,
        .volume-slider:focus-visible::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
          transform: scale(1.2);
        }

        /* Touch manipulation for better mobile performance */
        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
}
