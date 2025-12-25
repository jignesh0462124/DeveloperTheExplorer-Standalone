import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
function Footer() {
    return ( 
    <footer className="w-full relative bg-white py-12 px-4 sm:px-6 lg:px-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
             <div className="flex items-center space-x-3 mb-4">
               <div className="w-9 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-blue-200 shadow-lg">
                 <MapPin className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-bold text-slate-900 tracking-tight">
                 Developer The Explorer
               </span>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
               A flagship tech campaign by GDGoC GHRCE celebrating innovation, learning, and collaboration.
             </p>
             
             <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 text-sm">Contact Us</h4>
                 <p className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">contact@developertheexplorer.com</p>
                 {/* <p className="text-sm text-slate-500">+91 000 000 0000</p> */}
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><a href="#about" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#highlights" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Highlights</a></li>
              <li><a href="#campaign" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Campaign Modules</a></li>
              <li><a href="#sponsors" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Sponsors</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Community</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">GDGoC GHRCE</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Instagram</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><Link to="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cancellations" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Cancellations & Refund</Link></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Code of Conduct</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center md:text-left">
            © 2025 Developer The Explorer · Google Developer Group on Campus – GHRCE
          </p>
          <div className="flex items-center gap-4">
             {/* Simple social icons if really needed, else empty or small text links */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
