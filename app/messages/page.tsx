'use client';

import MessagesPageHero from '../components/MessagesPageHero';
import RecentMessagesSection from '../components/RecentMessagesSection';
import StickyAudioPlayer from '../components/StickyAudioPlayer';
import { AudioPlayerProvider, useAudioPlayer } from '../contexts/AudioPlayerContext';

function MessagesPageContent() {
  const { isPlayerVisible } = useAudioPlayer();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main 
        className="pt-[72px] flex-grow transition-all duration-300"
        style={{
          // Responsive padding: smaller on mobile (110px), larger on desktop (140px)
          paddingBottom: isPlayerVisible ? 'clamp(110px, 15vw, 140px)' : '0px'
        }}
      >
        <MessagesPageHero />
        <RecentMessagesSection />
      </main>
      <StickyAudioPlayer />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <AudioPlayerProvider>
      <MessagesPageContent />
    </AudioPlayerProvider>
  );
}
