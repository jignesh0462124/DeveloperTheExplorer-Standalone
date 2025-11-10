import React, { useState } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import { Menu, X, MapPin, Target, Calendar, Rocket, Heart, ChevronDown } from 'lucide-react';
import Community from './Community';
import Whatis from './Whatis';
import HighLights from './HighLights';
import Whatsin from './Whatsin';
import Sponser from './Sponser';
import Campeign from './Campeign';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';
import BackgroundAnimation from './BackgroundAnimation';

const LandingPage = () => {

   

  return (
    <div className="min-h-screen bg-white">
      <Navigation  />
      <Hero></Hero>
      <Community />

      <Whatis />
      <HighLights />
      <Whatsin/>
      <Sponser />
      <Campeign />
      <FAQ />
      <CTA />

      <Footer />
      {/* <BackgroundAnimation /> */}
    </div>
  );
};

export default LandingPage;