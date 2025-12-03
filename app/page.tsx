import HeroSection from "./components/HeroSection";
import UpcomingPgSection from "./components/UpcomingPgSection";
import MessagesSection from "./components/MessagesSection";
import SeasonWordSection from "./components/SeasonWordSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <UpcomingPgSection />
      <MessagesSection />
      <SeasonWordSection />
    </div>
  );
}
