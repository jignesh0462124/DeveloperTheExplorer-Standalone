import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/404.jsx";

import { supabase } from "../supabase/supabase.js";

const LandingPage = lazy(() => import("./components/LandingPage"));
const Login = lazy(() => import("./dashboard/signup"));
const Event = lazy(() => import("./dashboard/Event"));
const Bookslot = lazy(() => import("./dashboard/Bookslot"));
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions"));
const CancellationsAndRefund = lazy(() => import("./components/CancellationsAndRefund"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const UpdatePassword = lazy(() => import("./dashboard/UpdatePassword"));

function App() {
  const [isAuthProcessing, setIsAuthProcessing] = useState(
    window.location.hash.includes("access_token") ||
      window.location.hash.includes("type=recovery") ||
      window.location.search.includes("code=") // PKCE flow uses query params
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
        // If we have a hash with token or query params with code, clear it now that Supabase has processed it
        if (
          window.location.hash.includes("access_token") ||
          window.location.hash.includes("type=recovery") ||
          window.location.search.includes("code=")
        ) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname
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
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen bg-[#F6F7FB]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4285F4]"></div>
            </div>
          }
        />
        
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/event" element={<Event />} />
            <Route path="/bookslot" element={<Bookslot />} />

          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cancellations" element={<CancellationsAndRefund />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
