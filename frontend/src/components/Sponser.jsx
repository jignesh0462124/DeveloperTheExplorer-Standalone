import React from 'react';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown } from 'lucide-react';


function Sponser() {
    return ( <section id="sponsors" className="w-full  relative py-20 px-4 sm:px-6 lg:px-20 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-5 py-2 bg-white rounded-full shadow-sm mb-6">
              <span className="text-xs font-medium text-gray-600">For Sponsors</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Why Partner with Developer The Explorer?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 ms-4 gap-12">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with 250+ passionate developers, innovators, tech enthusiasts, and emerging technocrats who are shaping the future of technology. Developer The Explorer is more than just an event—it's a celebration of innovation, learning, and collaboration.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Your sponsorship helps empower aspiring technologists and bridges the gap between academia and industry. Partner with us to make a lasting impact on the next generation of developers.
              </p>
            </div>

            {/* Benefits Card */}
            <div className=" rounded-3xl shadow-xl p-8 lg:p-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                Sponsorship Benefits
              </h3>
              <div className="space-y-5">
                {[
                  { text: "Brand visibility among engaged student developers and tech community", color: "blue" },
                  { text: "Association with a flagship community initiative and innovation platform", color: "green" },
                  { text: "Hiring and networking opportunities with top talent", color: "yellow" },
                  { text: "Logo placements on banners, digital assets, and event materials", color: "red" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      benefit.color === 'blue' ? 'bg-blue-500' :
                      benefit.color === 'green' ? 'bg-green-500' :
                      benefit.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-600 pt-1">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> );
}

export default Sponser;