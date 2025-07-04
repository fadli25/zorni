import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { FeaturedDestinations } from "./FeaturedDestinations"; // si c'est un export nommé



const NewsletterSection = () => {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Inscrivez-vous à la newsletter</h2>
      <p className="text-gray-600 mb-6">Recevez nos meilleures offres directement dans votre boîte mail.</p>
      <form className="max-w-md mx-auto">
        <input
          type="email"
          placeholder="Votre email"
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          S’inscrire
        </button>
      </form>
    </section>
  );
};

export default NewsletterSection;

// --- Experiences Section ---
const ExperiencesSection = () => {
  const experiences = [
    {
      name: "Desert Camping",
      count: "25+ tours",
      image: "https://cdn-icons-png.freepik.com/512/2714/2714077.png",
      alt: "Desert camping tent",
    },
    {
      name: "Atlas Mountains",
      count: "15+ hikes",
      image: "https://cdn-icons-png.freepik.com/512/2714/2714056.png",
      alt: "Mountain landscape",
    },
    {
      name: "Moroccan Cuisine",
      count: "30+ experiences",
      image: "https://cdn-icons-png.freepik.com/512/2714/2714078.png",
      alt: "Moroccan tagine dish",
    },
    {
      name: "Traditional Crafts",
      count: "20+ workshops",
      image: "https://cdn-icons-png.freepik.com/512/2714/2714083.png",
      alt: "Traditional pottery",
    },
    {
      name: "Beach Resorts",
      count: "18+ locations",
      image: "https://cdn-icons-png.freepik.com/512/2714/2714095.png",
      alt: "Tropical beach",
    },
    {
      name: "Cultural Tours",
      count: "35+ guided tours",
      image: "https://cdn-icons-png.freepik.com/512/2714/2714094.png",
      alt: "Moroccan architecture",
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
            Discover authentic Moroccan experiences that will create lasting memories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-100 hover:border-blue-200 transform hover:-translate-y-1"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-2">
                <img
                  src={experience.image}
                  alt={experience.alt}
                  className="w-full h-full object-cover rounded-xl"
                />
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

// --- Contact Us Section ---
const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Veuillez entrer une adresse email valide");
      return;
    }

    console.log("Message envoyé:", formData);
    alert(`Merci ${formData.name}! Votre message a été envoyé avec succès.`);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-blue-100 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-red-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h2>
            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
              Avez-vous des questions sur votre voyage au Maroc ? Nous sommes là pour vous aider !
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Sujet de votre message"
                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Écrivez votre message ici..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 resize-vertical"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 min-w-[200px]"
              >
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- Main Content ---
export const MainContent = () => {
  return (
    <>
      <FeaturedDestinations />
      <ExperiencesSection />
      <ContactUsSection />
      <NewsletterSection />
    </>
  );
};


