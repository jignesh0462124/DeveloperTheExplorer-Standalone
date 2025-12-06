import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabase.js";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error" | ""
  const [loading, setLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a valid recovery session
    async function checkSession() {
      // Wait a bit for Supabase to process the hash fragment (App.jsx handles this)
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      // If we have a session, it means Supabase processed the recovery link
      if (session && session.user) {
        setIsValidSession(true);
      } else {
        // If no valid recovery session, redirect to signup
        setMessage("Invalid or expired reset link. Please request a new one.");
        setMessageType("error");
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      }
    }

    checkSession();
  }, [navigate]);

  const pwOk = (v) => v.length >= 8;
  const passwordsMatch = password === confirmPassword;

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!pwOk(password)) {
      setMessage("Password must be at least 8 characters long.");
      setMessageType("error");
      return;
    }

    if (!passwordsMatch) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setMessage(error.message);
        setMessageType("error");
      } else {
        setMessage("Password updated successfully! Redirecting to login...");
        setMessageType("success");
        setTimeout(() => {
          navigate("/signup");
        }, 2000);
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-gray-900 antialiased">
      <Curves />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 p-6 sm:p-8">
          {/* Header */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-[12px] font-medium text-gray-700 mb-4">
            <span className="block h-2 w-2 rounded-full bg-[#4285F4]" />
            Reset your password
          </div>

          <h1 className="text-3xl sm:text-[34px] font-semibold leading-tight">
            Create a new password
          </h1>
          <p className="mt-2 text-[15px] text-gray-600">
            Enter your new password below. Make sure it's at least 8 characters long.
          </p>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            {/* New Password */}
            <Field label="New Password" htmlFor="password">
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls("pr-12")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:bg-gray-100"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <StrengthBar value={Math.min(4, Math.floor(password.length / 3))} />
                <span className="text-xs text-gray-500">
                  {password.length < 8 ? "Use 8+ characters" : "Looks good"}
                </span>
              </div>
            </Field>

            {/* Confirm Password */}
            <Field
              label="Confirm Password"
              htmlFor="confirmPassword"
              error={confirmPassword && !passwordsMatch}
              errorText="Passwords do not match"
            >
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputCls("pr-12")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:bg-gray-100"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </Field>

            {/* Message */}
            {message && (
              <div
                className={`mt-3 rounded-lg p-3 text-sm ${
                  messageType === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : messageType === "error"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValidSession || loading || !password || !confirmPassword}
              className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[15px] font-semibold text-white transition
                ${
                  isValidSession && !loading && password && confirmPassword
                    ? "bg-[#4285F4] hover:bg-[#3367D6]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {loading ? "Updating password..." : "Update password"}
            </button>

            {/* Back to login */}
            <div className="text-center mt-4">
              <a
                href="/signup"
                className="text-sm text-[#1A73E8] hover:underline"
              >
                Back to login
              </a>
            </div>
          </form>
        </div>
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

function StrengthBar({ value = 0 }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`block h-1.5 w-10 rounded-full ${
            i < value ? "bg-[#34A853]" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

/* ---------- Icons ---------- */
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

