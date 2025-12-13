import { useState } from "react";
import "./App.css";
import EventPoster from "./EventPoster";
import Checkout from "./Checkout";
import LandingPage from "./components/LandingPage";
import Signup from "./dashboard/signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Event from "./dashboard/Event";
import Bookslot from "./dashboard/Bookslot";

import TermsAndConditions from "./components/TermsAndConditions";
import CancellationsAndRefund from "./components/CancellationsAndRefund";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";

import { supabase } from "../supabase/supabase.js";
import { useEffect } from "react";

function App() {
  const [isAuthProcessing, setIsAuthProcessing] = useState(
    window.location.hash.includes("access_token") ||
      window.location.hash.includes("type=recovery")
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (
        event === "SIGNED_IN" ||
        event === "INITIAL_SESSION" ||
        event === "PASSWORD_RECOVERY" ||
        event === "SIGNED_OUT"
      ) {
        // If we have a hash with token, clear it now that Supabase has likely processed it
        if (
          window.location.hash.includes("access_token") ||
          window.location.hash.includes("type=recovery")
        ) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
        }
        // Small delay to ensure UI doesn't flash
        setTimeout(() => setIsAuthProcessing(false), 100);
      }
    });

    // Safety fallback: if no event fires within 2s, stop loading
    const timer = setTimeout(() => setIsAuthProcessing(false), 2000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  if (isAuthProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F7FB]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285F4]"></div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/event" element={<Event />} />
          <Route path="/bookslot" element={<Bookslot />} />

          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cancellations" element={<CancellationsAndRefund />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
