import { FeaturedDestinations } from "./FeaturedDestinations";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { MainContent } from "./MainContent";
import { Navbar } from "./Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedDestinations />
      <MainContent />
      <Footer />
    </div>
  );
}
