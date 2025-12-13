import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Bell,
  User,
  LogOut,
  Code2 // fallback if used, though Bookslot used a custom div for logo
} from "lucide-react";
import { supabase } from "../../supabase/supabase.js";
import { useUserProfile } from "./useUserProfile";

export default function Navbar({ breadcrumbs }) {
  const navigate = useNavigate();
  const { profile, loadingProfile } = useUserProfile();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    try {
      setIsSigningOut(true);
      await supabase.auth.signOut();
      navigate("/signup");
    } catch (error) {
      console.error("Failed to sign out:", error);
      setIsSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
      <div className="mx-auto max-w-6xl h-16 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
           <div className="h-8 w-8 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-sky-200">
              DT
           </div>
           <a href="/" className="font-bold text-lg tracking-tight text-slate-800 hover:text-sky-700 transition-colors">
             Developer<span className="hidden xs:inline"> The Explorer</span>
           </a>
        </div>

        {/* Desktop Breadcrumbs */}
        {breadcrumbs && (
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            {breadcrumbs}
          </div>
        )}

        {/* User Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification Bell (Desktop) */}
          <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
            <Bell size={20} />
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>

          {/* Profile Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                {loadingProfile ? "Syncing..." : "Logged in as"}
              </span>
              <span className="text-sm font-semibold text-slate-800 leading-none">
                {loadingProfile ? "Loading..." : profile.name || "Guest"}
              </span>
            </div>
            
            {/* Avatar */}
            <div className="relative group cursor-pointer">
              <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-sky-200 ring-2 ring-white">
                  {profile.initials || <User size={18} />}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isSigningOut}
              className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-2 hover:bg-slate-50 hover:text-red-600 hover:border-red-100 transition-all disabled:opacity-60 shadow-sm"
            >
              {isSigningOut ? "..." : <LogOut size={14} />}
              <span className="hidden lg:inline">{isSigningOut ? "Exiting" : "Logout"}</span>
            </button>
            
             {/* Mobile Logout Icon Only */}
             <button
              onClick={handleLogout}
              disabled={isSigningOut}
              className="sm:hidden flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
               <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
