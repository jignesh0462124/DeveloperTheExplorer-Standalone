import React from 'react';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown, BookOpen, Users, Wrench, Globe } from 'lucide-react';

function Whatsin() {
    return ( 
        <section id="campaign" className=" w-full lg:ms-12 relative py-20 px-4 sm:px-6 lg:px-20 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6">
          What Participants Gain
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Developer-The-Explorer is for anyone who believes that growth begins when we step outside our comfort zone. You don't need to know everything. You just need the curiosity to explore.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {[
                { 
                    icon: BookOpen, 
                    text: "Stronger technical foundations", 
                    sub: "Deeper technical mastery in emerging technologies.",
                    color: "blue" 
                },
                { 
                    icon: Users, 
                    text: "Communication & Leadership", 
                    sub: "Enhanced teamwork, public speaking, and leadership skills through live collaboration.",
                    color: "green" 
                },
                { 
                    icon: Globe, 
                    text: "Global Community", 
                    sub: "A sense of belonging to a global developer ecosystem and lasting connections.",
                    color: "red" 
                }
            ].map((item, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                        item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        item.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                        item.color === 'green' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                    }`}>
                        <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.text}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.sub}</p>
                </div>
            ))}
        </div>
      </div>
      </section>
     );
}

export default Whatsin;