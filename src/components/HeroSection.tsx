 import { Heart, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white-50 to-yellow-50 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Experience the Magic of Morocco
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover{" "}
            <span className="bg-gradient-to-r from-blue-600 to-white-600 bg-clip-text text-transparent">
              Morocco
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            From the bustling souks of Marrakech to the golden dunes of the
            Sahara, explore Morocco's incwhiteible landscapes, rich culture, and
            warm hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-white-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-blue-200 text-gray-700 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
              View Destinations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
