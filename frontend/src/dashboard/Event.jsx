import React, { useMemo, useState, useEffect } from "react";
import { useAuthGuard } from "./useAuthGuard";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase.js";
import Navbar from "./Navbar";
import { ChevronRight } from "lucide-react";

export default function Event() {
  // --- State ---
  const [isBooked, setIsBooked] = useState(false);
  
  // Like Feature State
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(124); // Starting dummy count
  const [isLiking, setIsLiking] = useState(false);

  // Custom Hooks
  // useUserProfile removed, handled in Navbar
  const { isLoading: authLoading } = useAuthGuard("/signup");

  // Event Details (Static for now, could be passed as props)
  const event = {
    slug: "developer-explorer-2024", // Unique ID for database
    title: "Developer The Explorer",
    summary:
      "Hands-on Google-tech sessions, jamming labs & community networking.",
    dateLabel: "27 Nov · 10:00 AM–5:00 PM IST",
    venue: "Auditorium, GHRCE Campus",
    tracks: ["Cloud", "Web", "Android", "AI/ML"],
    availability: "available", // "available" | "few" | "waitlist"
  };

  // --- Effects ---

  useEffect(() => {
    async function fetchData() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) return;

      // 1. Check Booking Status
      const { data: bookingData } = await supabase
        .from("bookings")
        .select("payment_status")
        .eq("user_id", user.id)
        .eq("payment_status", "success")
        .maybeSingle();

      if (bookingData) setIsBooked(true);

      // 2. Check Like Status
      const { data: likeData } = await supabase
        .from("event_likes")
        .select("id")
        .eq("user_id", user.id)
        .eq("event_slug", event.slug)
        .maybeSingle();

      if (likeData) setHasLiked(true);
      
      // Optional: Fetch real total count from DB here if you want real-time counts
      // const { count } = await supabase.from('event_likes').select('*', { count: 'exact' }).eq('event_slug', event.slug);
      // if(count) setLikeCount(count);
    }

    fetchData();
  }, [event.slug]);

  async function handleToggleLike() {
    if (isLiking) return;
    
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      alert("Please sign in to like this event!");
      return;
    }

    // Optimistic Update (Update UI immediately before API finishes)
    const previousLikedState = hasLiked;
    const previousCount = likeCount;

    setHasLiked(!previousLikedState);
    setLikeCount(previousLikedState ? previousCount - 1 : previousCount + 1);
    setIsLiking(true);

    try {
      if (previousLikedState) {
        // Unlike: Remove from DB
        const { error } = await supabase
          .from("event_likes")
          .delete()
          .eq("user_id", user.id)
          .eq("event_slug", event.slug);
        
        if (error) throw error;
      } else {
        // Like: Add to DB
        const { error } = await supabase
          .from("event_likes")
          .insert([{ user_id: user.id, event_slug: event.slug }]);
        
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert optimistic update on error
      setHasLiked(previousLikedState);
      setLikeCount(previousCount);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLiking(false);
    }
  }

  // --- Memos ---

  const availabilityPill = useMemo(() => {
    switch (event.availability) {
      case "few":
        return {
          text: "Few seats left",
          className: "bg-amber-50 text-amber-700",
        };
      case "waitlist":
        return { text: "Waitlist only", className: "bg-rose-50 text-rose-700" };
      default:
        return {
          text: "Seats available",
          className: "bg-emerald-50 text-emerald-700",
        };
    }
  }, [event.availability]);

  // --- Render ---

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  const breadcrumbs = (
    <>
      <a className="hover:text-slate-900 transition-colors" href="/">Home</a>
      <ChevronRight size={14} className="text-slate-400" />
      <span className="font-semibold text-slate-700">Event</span>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-900 antialiased font-sans">
      <BgCurves />

      {/* Top Bar using Unified Navbar */}
      <Navbar breadcrumbs={breadcrumbs} />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 lg:py-12">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left: Event Details */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
              <Dot color="#6366F1" /> Upcoming Event
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
              {event.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl leading-relaxed">
              {event.summary}
            </p>

            {/* Metadata List */}
            <ul className="mt-8 space-y-3">
              <MetaItem icon={<CalendarIcon />} label={event.dateLabel} />
              <MetaItem icon={<PinIcon />} label={event.venue} />
              <MetaItem icon={<StackIcon />} label={event.tracks.join(" · ")} />
            </ul>

            {/* Action Buttons & Like */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              
              {/* Availability Status */}
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${availabilityPill.className}`}
              >
                <Dot /> {availabilityPill.text}
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {isBooked ? (
                  <button className="flex-1 sm:flex-none rounded-full bg-emerald-600 text-white font-medium px-6 py-3 shadow-lg shadow-emerald-200 cursor-default flex items-center justify-center gap-2">
                    <CheckIcon className="text-white" /> Slot Booked
                  </button>
                ) : (
                  <Link
                    to="/bookslot"
                    className="flex-1 sm:flex-none text-center rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 shadow-lg shadow-blue-200 transition-all active:scale-95"
                  >
                    Book your slot
                  </Link>
                )}

                {/* LIKE BUTTON */}
                <button
                    onClick={handleToggleLike}
                    disabled={isLiking}
                    className={`group relative flex items-center justify-center gap-2 rounded-full border px-5 py-3 font-medium transition-all active:scale-95
                        ${hasLiked 
                            ? "border-rose-200 bg-rose-50 text-rose-600" 
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                        }
                    `}
                    title="Like this event"
                >
                    <HeartIcon filled={hasLiked} className={`transition-transform duration-300 ${hasLiked ? "scale-110" : "group-hover:scale-110"}`} />
                    <span>{likeCount}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Card */}
          <div className="order-first lg:order-none w-full">
            <HeroDashboardCard />
          </div>
        </section>

        {/* Info Grid */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<InfoIcon className="text-sky-500" />}
            title="About the event"
            body="Developer The Explorer is a full-day immersive event bringing together students, developers, and tech enthusiasts. Dive into hands-on workshops, explore cutting-edge Google technologies, and connect with industry mentors."
          />
          <InfoCard
            icon={<StarIcon className="text-emerald-500" />}
            title="Why attend?"
            list={[
              "Hands-on labs with real-world projects",
              "Meet mentors from leading tech companies",
              "Exclusive swag & digital certificates",
            ]}
          />
          <InfoCard
            icon={<LockerIcon className="text-amber-500" />}
            title="Essentials to bring"
            list={["Laptop + Charger (Mandatory)", "Student ID Card", "Water bottle & enthusiasm"]}
          />
        </section>

        {/* Agenda Section */}
        <section id="agenda" className="mt-12 scroll-mt-20">
          <div className="rounded-2xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Event Agenda</h2>
              <a className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline" href="#">
                Download PDF →
              </a>
            </div>

            <ul className="space-y-8 relative">
                {/* Vertical Line for timeline effect */}
                <div className="absolute left-[39px] sm:left-[43px] top-2 bottom-2 w-0.5 bg-slate-100 -z-10 hidden sm:block"></div>
                
              <AgendaItem
                time="10:00"
                color="#3B82F6"
                title="Opening Keynote"
                desc="Welcome address and introduction to the day's tracks and activities."
              />
              <AgendaItem
                time="11:30"
                color="#22C55E"
                title="Track Briefings"
                desc="Overview of Cloud, Web, Android, and AI/ML tracks with expert speakers."
              />
              <AgendaItem
                time="13:30"
                color="#F59E0B"
                title="Hands-on Labs (Parallel)"
                desc="Interactive coding sessions across all four tracks with mentor support."
              />
              <AgendaItem
                time="16:30"
                color="#EF4444"
                title="Project Showcase & Closing"
                desc="Present your work, networking session, and certificate distribution."
              />
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

/* -------------------- Sub-Components -------------------- */

function MetaItem({ icon, label }) {
  return (
    <li className="flex items-center gap-3 text-slate-600">
      <div className="flex-shrink-0 text-slate-400">{icon}</div>
      <span className="text-[15px] font-medium">{label}</span>
    </li>
  );
}

function InfoCard({ icon, title, body, list }) {
  return (
    <div className="group rounded-2xl bg-white ring-1 ring-slate-900/5 shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 grid place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-900/5 group-hover:bg-white group-hover:scale-110 transition-all">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      {body && <p className="text-sm leading-relaxed text-slate-600">{body}</p>}
      {list && (
        <ul className="space-y-2.5">
          {list.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckIcon className="mt-0.5 text-emerald-500 shrink-0" /> 
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AgendaItem({ time, color, title, desc }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 bg-white sm:bg-transparent p-4 sm:p-0 rounded-xl border sm:border-0 border-slate-100">
      <span
        className="flex-shrink-0 inline-flex h-9 items-center justify-center rounded-full px-3 text-sm font-bold text-white shadow-sm w-fit"
        style={{ backgroundColor: color }}
      >
        {time}
      </span>
      <div className="flex-1 pt-1">
        <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function HeroDashboardCard() {
  return (
    <div className="rounded-2xl bg-white shadow-2xl shadow-slate-200/60 ring-1 ring-slate-900/5 p-5 transform transition-transform hover:-translate-y-1 duration-500">
      {/* Fake Search Bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <div className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 flex items-center px-3 text-slate-400 text-sm">
            <SearchIcon className="mr-2 h-4 w-4" />
            <span>Search sessions...</span>
          </div>
        </div>
        <div className="h-9 w-9 rounded-full bg-sky-500 shadow-lg shadow-sky-200" />
      </div>

      {/* Grid Tiles */}
      <div className="grid grid-cols-2 gap-4">
        <Tile color="#eff6ff" borderColor="#dbeafe" icon={<CompassIcon />} label="Discover" />
        <Tile color="#fefce8" borderColor="#fef9c3" icon={<PinBulbIcon />} label="Jam Labs" />
        <Tile color="#f0fdf4" borderColor="#dcfce7" icon={<HammerIcon />} label="Build" />
        <Tile color="#fef2f2" borderColor="#fee2e2" icon={<TrophyIcon />} label="Showcase" />
      </div>
    </div>
  );
}

function Tile({ color, borderColor, icon, label }) {
  return (
    <div
      className="rounded-xl h-28 sm:h-32 flex flex-col items-center justify-center gap-3 border transition-colors hover:brightness-95 cursor-default"
      style={{ backgroundColor: color, borderColor: borderColor }}
    >
      <div className="text-slate-700">{icon}</div>
      <div className="text-sm font-semibold text-slate-800">{label}</div>
    </div>
  );
}

function Avatar({ initials }) {
  return (
    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md ring-2 ring-white grid place-items-center text-xs font-bold text-white tracking-wider cursor-pointer">
      {initials || "U"}
    </div>
  );
}

/* -------------------- Icons -------------------- */

function Dot({ color = "currentColor" }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

// New Heart Icon for Like Feature
function HeartIcon({ filled, className = "" }) {
  return (
    <svg 
        width="20" height="20" viewBox="0 0 24 24" 
        fill={filled ? "currentColor" : "none"}
        className={className}
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function StackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SearchIcon({className}) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function PinBulbIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 15a6 6 0 0 0 6-6c0-2.8-1.8-5.3-4.4-6" stroke="currentColor" strokeWidth="2" />
        <path d="M6.4 9A6 6 0 0 0 12 15" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function HammerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 21h8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 17v4" stroke="currentColor" strokeWidth="2" />
      <path d="M7 4h10" stroke="currentColor" strokeWidth="2" />
      <path d="M17 4v8a5 5 0 0 1-10 0V4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 9v-.2A3 3 0 0 1 8 4" stroke="currentColor" strokeWidth="2" />
      <path d="M19 9v-.2A3 3 0 0 0 16 4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function InfoIcon({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function StarIcon({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function LockerIcon({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function CheckIcon({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function BgCurves() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      viewBox="0 0 1200 900"
      preserveAspectRatio="none"
    >
      <rect width="1200" height="900" fill="#F5F7FB" />
      <g opacity="0.12" fill="none" strokeLinecap="round" strokeWidth="14">
        <path d="M1000 -40C880 160 730 240 520 280" stroke="#3B82F6" />
        <path d="M1170 200C980 330 860 380 680 420" stroke="#F59E0B" />
        <path d="M1100 380C960 480 820 540 640 570" stroke="#22C55E" />
      </g>
    </svg>
  );
}