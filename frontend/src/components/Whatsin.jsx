import React from 'react';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown } from 'lucide-react';

function Whatsin() {
    return ( 
        <section id="campaign" className=" w-full lg:ms-12 relative py-20 px-4 sm:px-6 lg:px-20 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
            What's in Developers: The Explorers?
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Experience Card */}
            <div className=" rounded-3xl shadow-xl p-8 lg:p-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                More than an event, an experience
              </h3>
              <div className="space-y-6">
                {[
                  { icon: "💡", text: "Speaker sessions with industry experts sharing real-world insights", color: "blue" },
                  { icon: "⚡", text: "Jamming sessions where participants learn by doing and building", color: "yellow" },
                  { icon: "🤝", text: "Interactive networking for mentorship and collaboration", color: "green" },
                  { icon: "🚀", text: "Exposure to cutting-edge technology trends in AI, cybersecurity, and more", color: "red" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      item.color === 'blue' ? 'bg-blue-100' :
                      item.color === 'yellow' ? 'bg-yellow-100' :
                      item.color === 'green' ? 'bg-green-100' :
                      'bg-red-100'
                    }`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <p className="text-gray-600 pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Card */}
            <div className=" rounded-3xl shadow-xl p-8 lg:p-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                How participants grow
              </h3>
              <div className="space-y-6">
                {[
                  { icon: "📚", text: "Stronger technical foundations in AI, Cloud, Web, and Mobile", color: "blue" },
                  { icon: "🗣️", text: "Improved communication, teamwork, and leadership skills", color: "green" },
                  { icon: "🛠️", text: "Real-world project building and problem-solving experience", color: "yellow" },
                  { icon: "❤️", text: "Sense of belonging in the global developer community", color: "red" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      item.color === 'blue' ? 'bg-blue-100' :
                      item.color === 'yellow' ? 'bg-yellow-100' :
                      item.color === 'green' ? 'bg-green-100' :
                      'bg-red-100'
                    }`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <p className="text-gray-600 pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 bg-blue-100 text-blue-600 rounded-full font-medium">AI</span>
            <span className="px-6 py-3 bg-yellow-100 text-yellow-700 rounded-full font-medium">Cloud</span>
            <span className="px-6 py-3 bg-green-100 text-green-600 rounded-full font-medium">Web</span>
            <span className="px-6 py-3 bg-red-100 text-red-600 rounded-full font-medium">Mobile</span>
          </div>
        </div>
      </section>
     );
}

export default Whatsin;