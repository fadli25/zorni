import { useState } from "react";
import { Mail } from "lucide-react";

const ExperiencesSection = () => {
  const experiences = [
    {
      name: "Desert Camping",
      count: "25+ tours",
      color: "from-yellow-400 to-blue-500",
      icon: "🏕️",
    },
    {
      name: "Atlas Mountains",
      count: "15+ hikes",
      color: "from-green-400 to-blue-500",
      icon: "🏔️",
    },
    {
      name: "Moroccan Cuisine",
      count: "30+ experiences",
      color: "from-red-400 to-pink-500",
      icon: "🍽️",
    },
    {
      name: "Traditional Crafts",
      count: "20+ workshops",
      color: "from-purple-400 to-indigo-500",
      icon: "🎨",
    },
    {
      name: "Beach Resorts",
      count: "18+ locations",
      color: "from-cyan-400 to-blue-500",
      icon: "🏖️",
    },
    {
      name: "Cultural Tours",
      count: "35+ guided tours",
      color: "from-blue-400 to-red-500",
      icon: "🕌",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unique Experiences
          </h2>
          <p className="text-xl text-gray-600">
            Discover authentic Moroccan experiences that will create lasting
            memories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-100 hover:border-blue-200 transform hover:-translate-y-1"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${experience.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}
              >
                {experience.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                {experience.name}
              </h3>
              <span className="text-sm text-gray-500 bg-blue-100 px-3 py-1 rounded-full">
                {experience.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-blue-100 shadow-lg">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-red-600 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Newsletter
          </h2>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Get the latest travel guides, insider tips, and exclusive offers for
            your Morocco adventure delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const MainContent = () => {
  return (
    <>
      <ExperiencesSection />
      <NewsletterSection />
    </>
  );
};
