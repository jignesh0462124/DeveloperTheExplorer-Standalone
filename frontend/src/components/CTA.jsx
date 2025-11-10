import React from 'react';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown } from 'lucide-react';
function CTA() {
    return ( 
        <section className="py-20 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-0 w-full h-12 border-t-4 border-blue-500"></div>
          <div className="absolute top-32 left-0 w-full h-12 border-t-4 border-yellow-500"></div>
          <div className="absolute top-44 left-0 w-full h-12 border-t-4 border-green-500"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to explore, build, and collaborate?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join Developers: The Explorers and experience a tech campaign where curiosity meets execution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-blue-500 text-white text-lg font-medium rounded-full hover:bg-blue-600 shadow-lg hover:shadow-xl transition">
              Coming Soon
            </button>
            <button className="px-10 py-4 bg-white text-blue-500 text-lg font-medium rounded-full hover:bg-gray-50 shadow-lg hover:shadow-xl transition border-2 border-blue-500">
              Talk to the Team
            </button>
          </div>
        </div>
      </section>
     );
}

export default CTA;