import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturedDestinations } from "./components/FeaturedDestinations";
import { MainContent } from "./components/MainContent";
import { Footer } from "./components/Footer";

const MoroccoTourismApp = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedDestinations />
      <MainContent />
      <Footer />
    </div>
  );
};

export default MoroccoTourismApp;
