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
      
      <div className="max-w-7xl mx-auto px-3 py-2 md:px-4 md:py-4">
        <div className="flex flex-col gap-2 md:gap-2">
          {/* Top Row: Message Info and Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Message Thumbnail - Smaller on mobile for more control space */}
            <div className="relative w-11 h-11 md:w-16 md:h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
              <Image
                src={currentMessage.image}
                alt={`${currentMessage.title} thumbnail`}
                fill
                sizes="(max-width: 768px) 44px, 64px"
                className="object-cover"
              />
            </div>

            {/* Message Information */}
            <div className="flex-1 min-w-0" aria-label="Now playing">
              <h3 className="font-anton text-sm md:text-base text-black truncate" id="player-title">
                {currentMessage.title}
              </h3>
              <p className="font-satoshi text-xs md:text-sm text-gray-600 truncate" id="player-preacher">
                {isLoading ? 'Loading...' : error ? error : currentMessage.preacher}
              </p>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-0.5 md:gap-2 flex-shrink-0">
              {/* Skip Backward Button - Minimum 44x44px touch target */}
              <button
                onClick={skipBackward}
                disabled={isLoading || !!error}
                className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                aria-label="Skip backward 10 seconds"
                title="Skip backward 10 seconds"
              >
                <SkipBack className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
              </button>

              {/* Play/Pause Button - Larger touch target on mobile */}
              <button
                onClick={togglePlayPause}
                disabled={isLoading || !!error}
                className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-white bg-black hover:bg-gray-800 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                aria-pressed={isPlaying}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isLoading ? (
                  <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" aria-label="Loading" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" aria-hidden="true" />
                ) : (
                  <Play className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" aria-hidden="true" />
                )}
              </button>

              {/* Skip Forward Button - Minimum 44x44px touch target */}
              <button
                onClick={skipForward}
                disabled={isLoading || !!error}
                className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                aria-label="Skip forward 10 seconds"
                title="Skip forward 10 seconds"
              >
                <SkipForward className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
              </button>

              {/* Download Button - Minimum 44x44px touch target */}
              <a
                href={currentMessage.audioUrl}
                download={`${currentMessage.title} - ${currentMessage.preacher}.mp3`}
                className="w-11 h-11 md:w-10 md:h-10 flex items-center justify-center text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                aria-label={`Download ${currentMessage.title}`}
                title="Download message"
                onClick={(e) => {
                  // Prevent default behavior that might interfere with playback
                  e.stopPropagation();
                }}
              >
                <Download className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
              </a>
            </div>

            {/* Close Button - Minimum 44x44px touch target */}
            <button
              onClick={closePlayer}
              className="flex-shrink-0 w-11 h-11 md:w-10 md:h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Close player"
              title="Close player"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Bottom Row: Progress Bar and Time Display */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Current Time */}
            <span 
              className="font-satoshi text-xs text-gray-600 flex-shrink-0 w-9 md:w-10 text-right"
              aria-label="Current time"
              role="timer"
            >
              {formatTime(currentTime)}
            </span>

            {/* Progress Bar - Larger touch target on mobile */}
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                disabled={isLoading || !!error}
                className="w-full h-2 md:h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer progress-bar disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                aria-label="Seek audio position"
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-valuenow={currentTime}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                role="slider"
                tabIndex={0}
                title="Seek audio position"
                style={{
                  background: `linear-gradient(to right, #000 0%, #000 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #e5e7eb ${duration > 0 ? (currentTime / duration) * 100 : 0}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Total Duration */}
            <span 
              className="font-satoshi text-xs text-gray-600 flex-shrink-0 w-9 md:w-10"
              aria-label="Total duration"
            >
              {formatTime(duration)}
            </span>

            {/* Volume Control - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0 ml-2">
              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                aria-pressed={isMuted}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-5 h-5" aria-hidden="true" />
                )}
              </button>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeSliderChange}
                className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer volume-slider"
                aria-label="Adjust volume"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={volume}
                aria-valuetext={`Volume ${Math.round(volume * 100)}%`}
                role="slider"
                tabIndex={0}
                title="Adjust volume"
                style={{
                  background: `linear-gradient(to right, #000 0%, #000 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
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

        /* Progress bar thumb - Larger on mobile for better touch interaction */
        .progress-bar::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          transition: transform 0.2s;
        }

        @media (min-width: 768px) {
          .progress-bar::-webkit-slider-thumb {
            width: 12px;
            height: 12px;
          }
        }

        .progress-bar::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .progress-bar::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: none;
          transition: transform 0.2s;
        }

        @media (min-width: 768px) {
          .progress-bar::-moz-range-thumb {
            width: 12px;
            height: 12px;
          }
        }

        .progress-bar::-moz-range-thumb:hover {
          transform: scale(1.2);
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
