import { MapPin, Star, Users, Clock, ArrowRight } from "lucide-react";

const DestinationCard = ({ destination, featured = false }: any) => {
  return (
    <article
      className={`bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300 group ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`${
          featured ? "aspect-[2/1]" : "aspect-video"
        } overflow-hidden relative`}
      >
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
            {destination.category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              <span>Most Popular</span>
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-2 text-white">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{destination.rating}</span>
            </div>
            <span className="text-sm">•</span>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{destination.visitors}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="w-4 h-4 text-orange-600" />
          <span className="text-sm text-gray-600">{destination.location}</span>
        </div>

        <h3
          className={`${
            featured ? "text-2xl" : "text-xl"
          } font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors cursor-pointer leading-tight`}
        >
          {destination.name}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {destination.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{destination.duration}</span>
            </div>
            <div className="text-lg font-bold text-orange-600">
              {destination.price}
            </div>
          </div>

          <button className="flex items-center space-x-1 text-orange-600 hover:text-orange-800 font-medium transition-colors group">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};

export const FeaturedDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Marrakech - The Red City",
      description:
        "Immerse yourself in the vibrant colors and sounds of Marrakech's historic medina, bustling souks, and stunning palaces.",
      location: "Marrakech, Morocco",
      duration: "3-4 days",
      price: "From $89/day",
      category: "Historic City",
      rating: 4.8,
      visitors: "2.5M+ visitors",
      image:
        "https://www.visitmorocco.com/sites/default/files/styles/thumbnail_destination_background_top5/public/thumbnails/image/koutoubia-mosque-minaret-located-at-medina-quarter-of-marrakesh-morocco-balate-dorin.jpg?itok=08hAHERp",
      featured: true,
    },
    {
      id: 2,
      name: "Sahara Desert Adventure",
      description:
        "Experience the magic of the Sahara with camel trekking, desert camping, and unforgettable stargazing.",
      location: "Merzouga, Morocco",
      duration: "2-3 days",
      price: "From $120/day",
      category: "Desert Adventure",
      rating: 4.9,
      visitors: "500K+ visitors",
      image:
        "https://www.maroc24.com/fr/wp-content/uploads/2025/02/Merzouga.jpg",
      featured: true,
    },
    {
      id: 3,
      name: "Chefchaouen - Blue Pearl",
      description:
        "Wander through the enchanting blue-painted streets of Morocco's most photogenic mountain town.",
      location: "Chefchaouen, Morocco",
      duration: "2-3 days",
      price: "From $65/day",
      category: "Mountain Town",
      rating: 4.7,
      visitors: "800K+ visitors",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/70/Chefchaouen_the_blue_pearl_kd.jpg",
    },
    {
      id: 4,
      name: "Fez - Cultural Capital",
      description:
        "Discover Morocco's spiritual and cultural heart with ancient medinas, traditional crafts, and historic universities.",
      location: "Fez, Morocco",
      duration: "2-3 days",
      price: "From $75/day",
      category: "Cultural Heritage",
      rating: 4.6,
      visitors: "1.2M+ visitors",
      image:
        "https://i.natgeofe.com/n/1761d5b7-e073-44a9-80e1-2441c5684fee/wst_insideguide_fcr-458888_hr.jpg",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore Morocco's most captivating destinations, from ancient cities
            to desert adventures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
