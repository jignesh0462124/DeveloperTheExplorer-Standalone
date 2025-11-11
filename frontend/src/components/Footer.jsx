import React from 'react';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
function Footer() {
    return ( 
        <footer className="w-full relative   py-16 px-4 sm:px-6 lg:px-20">
          {/* <AnimatedBackground variant="waves" /> */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Developers: The Explorers
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                A flagship tech campaign by GDGOC GHRCE celebrating innovation and collaboration.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#about" className="text-sm text-gray-600 hover:text-blue-500">About</a></li>
                <li><a href="#highlights" className="text-sm text-gray-600 hover:text-blue-500">Highlights</a></li>
                <li><a href="#campaign" className="text-sm text-gray-600 hover:text-blue-500">Campaign Modules</a></li>
                <li><a href="#sponsors" className="text-sm text-gray-600 hover:text-blue-500">Sponsors</a></li>
                <li><a href="#contact" className="text-sm text-gray-600 hover:text-blue-500">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">GDGOC GHRCE</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">GitHub</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">LinkedIn</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">YouTube</a></li>
              </ul>
              <div className="flex space-x-4 mt-6">
                <div className="w-7 h-7 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                  <span className="text-white text-xs">📷</span>
                </div>
                <div className="w-7 h-7 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                  <span className="text-white text-xs">🐦</span>
                </div>
                <div className="w-7 h-7 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                  <span className="text-white text-xs">💼</span>
                </div>
                <div className="w-7 h-7 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                  <span className="text-white text-xs">▶️</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-500">Code of Conduct</a></li>
              </ul>
            </div>
          </div>

          {/* <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              © 2025 Developers: The Explorers · Google Developer Group on Campus – GHRCE
            </p>
          </div> */}
        </div>
      </footer>
     );
}

export default Footer;
