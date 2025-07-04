import { Compass, Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-white-600 rounded-lg">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <img
                src="https://i.imgur.com/0Ui1Eec.png"
                alt="Morocco Explorer Logo"
                className="w-30 h-30"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted guide to discovering the magic of Morocco. From the
              Atlas Mountains to the Atlantic coast, we'll help you create
              unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-bold mb-6 text-white text-lg">
              Top Destinations
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Marrakech
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Casablanca
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Fez
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Chefchaouen
                </a>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-bold mb-6 text-white text-lg">Experiences</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Desert Tours
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Atlas Mountains
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Cooking Classes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Cultural Tours
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-6 text-white text-lg">Support</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Travel Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Safety Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Morocco Explorer. All rights reserved. Made with ❤️ for
            travelers exploring Morocco.
          </p>
        </div>
      </div>
    </footer>
  );
};
