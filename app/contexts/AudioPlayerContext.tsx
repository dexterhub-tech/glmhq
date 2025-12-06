'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { StaticImageData } from 'next/image';

// Message interface matching the existing structure
export interface Message {
  driveLink: string | undefined;

  id: number;
  title: string;
  preacher: string;
  date: string;
  thumbnail: string | StaticImageData | { src: string; height: number; width: number; blurDataURL?: string; };
  audioUrl: string;
}

interface ApiAudio {
  title?: string;
  createdAt: string;
  thumbnail?: string;
  fileId?: string;
  driveLink?: string;
}

// Context type definition
export interface AudioPlayerContextType {
  messages: Message[];
  currentMessage: Message | null;
  isPlaying: boolean;
  isPlayerVisible: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  playMessage: (message: Message) => void;
  togglePlayPause: () => void;
  skipBackward: () => void;
  skipForward: () => void;
  closePlayer: () => void;
  handleSeek: (time: number) => void;
  handleVolumeChange: (volume: number) => void;
  toggleMute: () => void;
}

// Create context with undefined default
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// Provider props
interface AudioPlayerProviderProps {
  children: ReactNode;
}

const API_BASE = 'https://messagefetcher-script.onrender.com';
// const API_BASE = 'http://localhost:2000';

// Provider component
export function AudioPlayerProvider({ children }: AudioPlayerProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousVolumeRef = useRef<number>(1);

  // Fetch messages
  useEffect(() => {
    async function fetchAudios() {
      try {
        const res = await fetch(`${API_BASE}/audios`);
        const audios = await res.json();

        if (audios.length > 0) {
          const mappedMessages: Message[] = audios.map((audio: ApiAudio, index: number) => ({
            id: index + 1, // Generate a numeric ID
            title: audio.title || 'Untitled',
            preacher: 'Apostle Joseph Ibrahim', // Default preacher as it's not in API
            date: new Date(audio.createdAt).toLocaleDateString(),
            thumbnail: audio.thumbnail || 'https://via.placeholder.com/400', // Fallback image
            audioUrl: audio.fileId ? `${API_BASE}/stream/${audio.fileId}` : '',
            driveLink: audio.driveLink || '',
          }));
          setMessages(mappedMessages);
        }
      } catch (err) {
        console.error('Failed to load audios:', err);
      }
    }

    fetchAudios();
  }, []);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();

    const audio = audioRef.current;

    // Set initial volume
    audio.volume = volume;

    // Event handlers
    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => setIsPlaying(false);

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
      setError(null);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError('Unable to load audio. Please try again.');
      console.error('Audio loading error:', audio.error);
    };

    // Attach event listeners
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    // Cleanup
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play a new message
  const playMessage = (message: Message) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // If switching to a different message, reset and load new audio
    if (currentMessage?.id !== message.id) {
      // Cancel any previous audio load in progress
      // Pausing and changing src will abort any pending load operations
      audio.pause();

      // Reset current time before changing source to ensure clean state
      audio.currentTime = 0;

      // Change the audio source - this cancels any pending load
      audio.src = message.audioUrl;

      // Load the new audio explicitly to start the loading process
      audio.load();

      // Update state to reflect the new message
      setCurrentMessage(message);
      setCurrentTime(0);
      setDuration(0);
      setError(null);
      setIsLoading(true);
    }

    // Play the audio (works for both new messages and resuming current message)
    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
      setError('Unable to play audio. Please try again.');
      setIsLoading(false);
    });

    // Show the player (maintains visibility during message switches)
    setIsPlayerVisible(true);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setError('Unable to play audio. Please try again.');
        setIsLoading(false);
      });
    }
  };

  // Skip backward 10 seconds
  const skipBackward = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  // Skip forward 10 seconds
  const skipForward = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
  };

  // Close the player
  const closePlayer = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Stop playback
    audio.pause();
    audio.currentTime = 0;

    // Reset state
    setIsPlayerVisible(false);
    setIsPlaying(false);
    setCurrentMessage(null);
    setCurrentTime(0);
    setDuration(0);
    setError(null);
    setIsLoading(false);
  };

  // Handle seeking to a specific time
  const handleSeek = (time: number) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));

    audio.volume = clampedVolume;
    setVolume(clampedVolume);

    // If volume is set to 0, consider it muted
    if (clampedVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isMuted) {
      // Unmute: restore previous volume
      const volumeToRestore = previousVolumeRef.current > 0 ? previousVolumeRef.current : 1;
      audio.volume = volumeToRestore;
      setVolume(volumeToRestore);
      setIsMuted(false);
    } else {
      // Mute: save current volume and set to 0
      previousVolumeRef.current = volume;
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const value: AudioPlayerContextType = {
    messages,
    currentMessage,
    isPlaying,
    isPlayerVisible,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    error,
    playMessage,
    togglePlayPause,
    skipBackward,
    skipForward,
    closePlayer,
    handleSeek,
    handleVolumeChange,
    toggleMute,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

// Custom hook to use the audio player context
export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);

  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }

  return context;
}
