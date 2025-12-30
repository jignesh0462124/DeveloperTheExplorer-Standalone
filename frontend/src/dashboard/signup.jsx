import React, { useMemo, useState } from "react";
import { supabase } from "../../supabase/supabase.js";

export default function Login() {
  // ----- form state -----
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  // ----- ui state -----
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ----- validators -----
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);

  const validLogin = useMemo(
    () => isEmail(email) && pw.length > 0,
    [email, pw]
  );

  // ----- actions -----
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!validLogin) return;
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pw,
    });

    setLoading(false);
    if (error) setMessage(error.message);
    else {
      setMessage("Welcome back! Redirecting…");
      // go straight to the event hub
      window.location.href = "/event";
    }
  }

  async function handleGoogle() {
    setMessage("");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo: `${window.location.origin}/event`,
        // Use PKCE flow instead of implicit flow for better security
        // This prevents tokens from appearing in the URL
        skipBrowserRedirect: false,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      },
    });
  }

  // ----- right-card meta -----
  const meta = {
    dates: "Feb 6-8, 2025",
    venue: "Jungle Retreat (GDGoC-GHRCE)",
    community: "Developer The Explorer Camp",
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-gray-900 antialiased">
      <Curves />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        
        {/* Back Link */}
        <div className="mb-6">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5"/>
                    <path d="M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
            </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* LEFT: Auth card */}
          <div className="relative">
            <div className="rounded-xl sm:rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 p-6 sm:p-8">
              
              <h1 className="mt-4 text-3xl sm:text-[34px] font-semibold leading-tight">
                Log in to your account
              </h1>

              <p className="mt-2 text-[15px] text-gray-600">
                Access your ticket, manage your booking, and see updates.
              </p>

              {/* Google OAuth */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogle}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <GoogleIcon className="h-5 w-5" />
                  Log in with Google
                </button>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs text-gray-500">or</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
              </div>

              {/* FORM */}
              <form
                className="mt-4 space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Email */}
                <Field
                  label="Email"
                  htmlFor="email"
                  error={email ? !isEmail(email) : false}
                  errorText="Enter a valid email."
                >
                  <input
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls()}
                    required
                  />
                </Field>

                {/* Password */}
                <Field label="Password" htmlFor="pw">
                  <div className="relative">
                    <input
                      id="pw"
                      type={showPw ? "text" : "password"}
                      placeholder="Your password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      className={inputCls("pr-12")}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:bg-gray-100"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!validLogin || loading}
                  className={`mt-2 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[15px] font-semibold text-white transition
                    ${
                      validLogin && !loading
                        ? "bg-[#4285F4] hover:bg-[#3367D6]"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  {loading
                    ? "Signing in…"
                    : "Log in"}
                </button>

                {message && (
                  <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 text-sm ${
                      message.toLowerCase().includes("success") || message.toLowerCase().includes("sent") || message.includes("Welcome")
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                      : "bg-red-50 text-red-600 border border-red-100"
                  }`}>
                    {message.toLowerCase().includes("success") || message.toLowerCase().includes("sent") || message.includes("Welcome") ? (
                         <div className="mt-0.5 shrink-0">✅</div>
                    ) : (
                         <div className="mt-0.5 shrink-0">⚠️</div>
                    )}
                    <span>{message}</span>
                  </div>
                )}

              </form>
            </div>
          </div>

          {/* RIGHT: Highlights */}
          <aside className="lg:block">
            <div className="sticky top-8 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 p-6 sm:p-7">
              <h3 className="text-lg font-semibold">Event Highlights</h3>

              <ul className="mt-4 space-y-4 text-[15px]">
                <li className="flex items-start gap-3">
                  <Badge color="#4285F4">
                    <CalendarIcon />
                  </Badge>
                  <div>
                    <div className="font-medium">{meta.dates}</div>
                    <div className="text-gray-600 text-sm">
                      3-Day Adventure Camp
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Badge color="#EA4335">
                    <PinIcon />
                  </Badge>
                  <div>
                    <div className="font-medium">{meta.venue}</div>
                    <div className="text-gray-600 text-sm">Wild Tech Retreat</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Badge color="#34A853">
                    <UsersIcon />
                  </Badge>
                  <div>
                    <div className="font-medium">{meta.community}</div>
                    <div className="text-gray-600 text-sm">
                      Exclusive Cohort
                    </div>
                  </div>
                </li>
              </ul>

              <hr className="my-5 border-gray-200" />

              <p className="text-sm font-medium text-gray-700 mb-2">
                Event Benefits
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-[#34A853]" /> Save your ticket
                  securely
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-[#34A853]" /> Quick check-in at the
                  venue
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-[#34A853]" /> Get schedule
                  reminders
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-[#34A853]" /> Access exclusive
                  content
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <footer className="mx-auto mt-10 flex items-center justify-center gap-6 text-sm text-gray-500">
          <a href="/privacy" className="hover:text-gray-700">
            Privacy
          </a>
          <span>·</span>
          <a href="/terms" className="hover:text-gray-700">
            Terms
          </a>
          <span>·</span>
          <a href="mailto:support@developertheexplorer.com" className="hover:text-gray-700">
            Help
          </a>
        </footer>
      </div>
    </div>
  );
}

/* ---------- helpers / small components ---------- */

const inputCls = (extra = "") =>
  `h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-[15px] placeholder:text-gray-400
   focus:outline-none focus:ring-4 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] ${extra}`;

function Field({ label, htmlFor, helper, error, errorText, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[13px] font-medium text-gray-800"
      >
        {label}
      </label>
      {children}
      {helper && !error && (
        <p className="mt-1 text-xs text-gray-500">{helper}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-[#D93025]">
          {errorText || "Invalid value"}
        </p>
      )}
    </div>
  );
}

function Badge({ color = "#4285F4", children }) {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      <div className="scale-90">{children}</div>
    </div>
  );
}

/* ---------- Icons ---------- */
function GoogleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.766 12.277c0-.851-.075-1.67-.213-2.456H12v4.651h6.652a5.692 5.692 0 0 1-2.466 3.73v3.102h3.982c2.332-2.149 3.598-5.312 3.598-9.027z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.956-1.075 7.941-2.917l-3.982-3.102c-1.108.747-2.526 1.183-3.959 1.183-3.041 0-5.613-2.053-6.53-4.807H1.356v3.183C3.333 21.082 7.333 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.47 14.357a7.213 7.213 0 0 1-.38-2.357c0-.817.14-1.614.38-2.357V6.46H1.356A11.99 11.99 0 0 0 0 12c0 1.973.492 3.82 1.356 5.541l4.114-3.184z"
      />
      <path
        fill="#EA4335"
        d="M12 4.782c1.764 0 3.347.606 4.596 1.794l3.44-3.44C17.951 1.263 15.235 0 12 0 7.333 0 3.333 2.918 1.356 6.459L5.47 9.643C6.391 6.835 8.959 4.782 12 4.782z"
      />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 20a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function CheckIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M7.629 13.233 3.9 9.504l1.414-1.415 2.315 2.315 6.06-6.06 1.415 1.414-7.475 7.475z" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3l18 18M9.9 9.9A3 3 0 0 0 12 15a3 3 0 0 0 2.1-.9M7.5 7.9C4 9.6 2 12 2 12s4 7 10 7c2.1 0 3.9-.6 5.4-1.5M14.2 5.3C13.5 5.1 12.8 5 12 5 6 5 2 12 2 12a22.5 22.5 0 0 0 3.6 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/* ---------- Background decoration ---------- */
function Curves() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
    >
      <rect width="1200" height="800" fill="#F6F7FB" />
      <g opacity="0.18" fill="none" strokeLinecap="round" strokeWidth="10">
        <path d="M900 -50C800 140 720 210 540 250" stroke="#4285F4" />
        <path d="M1150 150C980 280 860 330 680 360" stroke="#FBBC05" />
        <path d="M1100 320C960 420 820 470 640 500" stroke="#34A853" />
      </g>
    </svg>
  );
}
