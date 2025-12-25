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
      <div className="mx-auto max-w-6xl h-18 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
           <a href="/" className="font-bold text-lg tracking-tight text-slate-800 hover:text-sky-700 transition-colors">
             <img src="images/logo.png" className="w-45 h-35 mt-4"></img>
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
            <div className="hidden sm:flex flex-col text-right justify-center">
              <span className="text-sm font-semibold text-slate-800 leading-tight">
                {loadingProfile ? "Loading..." : profile.name || "Guest"}
              </span>
            </div>
            
            {/* Avatar */}
            <div className="relative group cursor-pointer">
              <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-800 text-sm font-bold text-white shadow-sm ring-2 ring-white">
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
