import { useState } from "react";
import "./App.css";
import EventPoster from "./EventPoster";
import Checkout from "./Checkout";
import LandingPage from "./components/LandingPage";
import Signup from "./dashboard/signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Event from "./dashboard/Event";
import Admin from "./dashboard/Admin";
import Bookslot from "./dashboard/Bookslot";
import ContactUs from "./components/ContactUs";
import TermsAndConditions from "./components/TermsAndConditions";
import CancellationsAndRefund from "./components/CancellationsAndRefund";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/event" element={<Event />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/bookslot" element={<Bookslot />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cancellations" element={<CancellationsAndRefund />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
