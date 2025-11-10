import React from 'react';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown } from 'lucide-react';

function Community() {

    return ( 
        <section id="community" className="py-20 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 ms-8">
              
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Who We Are
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>
                  GDGOC GHRCE is a vibrant student developer community that bridges the gap between theory and practice. We empower aspiring technologists through workshops, hackathons, speaker sessions, and real-world projects.
                </p>
                <p>
                  Our mission is to create an inclusive learning environment where students can explore cutting-edge technologies, collaborate with peers, and build solutions that matter. From AI to Cloud, Web to Mobile, we cover the full spectrum of modern development.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">Learn</span>
                <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium">Build</span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Grow</span>
              </div>
            </div>
            <div className=" ms-8 bg-white rounded-3xl shadow-xl  h-100">
              <div className="space-y-8">
                {/* <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Campus</h3>
                    <p className="text-sm text-gray-600">GHRCE, Nagpur</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Focus Areas</h3>
                    <p className="text-sm text-gray-600">Web, App, AI, Cloud</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Event Formats</h3>
                    <p className="text-sm text-gray-600">Workshops, Games, Speaker Sessions</p>
                  </div>
                </div> */}
                <img src='images/Community.png' className=' md:ms-40 lg:ms-8 lg:ms-0 h-100 w-120'></img>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>
     );
}

export default Community;