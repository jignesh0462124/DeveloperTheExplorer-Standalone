import React from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Community from "../components/Community";
import Whatis from "../components/Whatis";
import HighLights from "../components/HighLights";
import Whatsin from "../components/Whatsin";
import Campeign from "../components/Campeign";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";


const LandingPage = () => (
  <>
    <AnimatedBackground variant="geometric" />
    <Navigation />
    <Hero />
    <Whatis />    {/* Why This */}
    <Community /> {/* Who it's for */}
    <Campeign />  {/* Unveiling + Highlights */}
    <HighLights /> {/* Who Are We + Journey */}
    <Whatsin />   {/* What Participants Gain */}
    <FAQ />

    <Footer />
  </>
);

export default LandingPage;
