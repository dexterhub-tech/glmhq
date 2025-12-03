import MessagesPageHero from '../components/MessagesPageHero';
import RecentMessagesSection from '../components/RecentMessagesSection';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="pt-[72px] flex-grow">
        <MessagesPageHero />
        <RecentMessagesSection />
      </main>
    </div>
  );
}
