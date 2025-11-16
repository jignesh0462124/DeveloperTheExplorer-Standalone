import React from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Community from "../components/Community";
import Whatis from "../components/Whatis";
import HighLights from "../components/HighLights";
import Whatsin from "../components/Whatsin";
import Sponser from "../components/Sponser";
import Campeign from "../components/Campeign";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";

const LandingPage = () => (
    <>
    <AnimatedBackground variant="geometric" />
    <Navigation />
    <Hero />
    <Community />
    <Whatis />
    <HighLights />
    <Whatsin />
    <Sponser />
    <Campeign />
    <FAQ />
    <CTA />
    <Footer />
    </>
);

export default LandingPage;