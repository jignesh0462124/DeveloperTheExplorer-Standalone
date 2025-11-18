import React, { useMemo, useState ,useEffect} from "react";
import { useAuthGuard } from "./useAuthGuard";

export default function Event() {
  // example data (edit as needed)
      const {isLoading}=useAuthGuard("/signup");
  const event = {
    title: "DeveloperTheExplore",
    summary:
      "Hands-on Google-tech sessions, jamming labs & community networking.",
    dateLabel: "27 Nov · 10:00 AM–5:00 PM IST",
    venue: "Auditorium, GHRCE Campus",
    tracks: ["Cloud", "Web", "Android", "AI/ML"],
    availability: "available", // "available" | "few" | "waitlist"
  };

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

  function goBook() {
    // change to your route
    window.location.href = "/book";
  }
  function goAgenda() {
    // change to your route or scroll
    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-900 antialiased">
      <BgCurves />

      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-semibold tracking-tight">
            <span className="text-slate-900">Developer</span>
            <span className="text-[#4285F4]">The</span>
            <span className="text-[#FBBC05]">Explore</span>
            <span className="text-[#34A853]">r</span>
          </a>

          <div className="hidden sm:flex items-center text-sm text-slate-600 gap-2">
            <a href="/" className="hover:text-slate-900">
              Home
            </a>
            <span>›</span>
            <span className="font-medium text-slate-900">Event</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
              <span className="rounded bg-slate-100 px-2 py-0.5">
                IMO 23:22
              </span>
              <span className="font-medium">Rahul Kumar</span>
            </div>
            <Avatar />
          </div>
        </div>
      </header>

      {/* Page */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 lg:py-10">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Text & Meta */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <Dot color="#6366F1" /> Upcoming event
            </span>

            <h1 className="mt-3 text-[32px] sm:text-[40px] font-bold leading-tight">
              {event.title}
            </h1>
            <p className="mt-1 text-[15px] text-slate-600 max-w-xl">
              {event.summary}
            </p>

            {/* Meta */}
            <ul className="mt-5 space-y-2 text-sm">
              <MetaItem icon={<CalendarIcon />} label={event.dateLabel} />
              <MetaItem icon={<PinIcon />} label={event.venue} />
              <MetaItem icon={<StackIcon />} label={event.tracks.join(" · ")} />
            </ul>

            {/* Availability + CTAs */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${availabilityPill.className}`}
              >
                <Dot /> {availabilityPill.text}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={goBook}
                  className="rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-5 py-2.5 shadow-sm"
                >
                  Book your slot
                </button>
                <button
                  onClick={goAgenda}
                  className="rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium px-5 py-2.5 shadow-sm"
                >
                  View agenda
                </button>
              </div>
            </div>
          </div>

          {/* Right: Dashboard-style card */}
          <div className="order-first lg:order-none">
            <HeroDashboardCard />
          </div>
        </section>

        {/* Info Cards */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <InfoCard
            icon={<InfoIcon className="text-sky-500" />}
            title="About"
            body="DeveloperTheExplore is a full-day immersive event bringing together students, developers, and tech enthusiasts. Dive into hands-on workshops, explore cutting-edge Google technologies, and connect with industry mentors in a collaborative environment."
          />
          <InfoCard
            icon={<StarIcon className="text-emerald-500" />}
            title="Why attend"
            list={[
              "Hands-on labs with real-world projects",
              "Meet mentors from leading tech companies",
              "Get certificate of participation",
            ]}
          />
          <InfoCard
            icon={<LockerIcon className="text-amber-500" />}
            title="What to bring"
            list={["Laptop + charger", "Student ID", "Water bottle"]}
          />
        </section>

        {/* Agenda */}
        <section id="agenda" className="mt-8">
          <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Event Agenda</h2>
              <a className="text-sm text-[#2563EB] hover:underline" href="#">
                See full Agenda →
              </a>
            </div>

            <ul className="mt-5 space-y-5">
              <AgendaItem
                time="10:00"
                color="#3B82F6"
                title="Opening Keynote"
                desc="Welcome address and introduction to the day's tracks and activities"
              />
              <AgendaItem
                time="11:30"
                color="#22C55E"
                title="Track Briefings"
                desc="Overview of Cloud, Web, Android, and AI/ML tracks with expert speakers"
              />
              <AgendaItem
                time="13:30"
                color="#F59E0B"
                title="Hands-on Labs (parallel)"
                desc="Interactive coding sessions across all four tracks with mentor support"
              />
              <AgendaItem
                time="16:30"
                color="#EF4444"
                title="Project Showcase & Closing"
                desc="Present your work, networking session, and certificate distribution"
              />
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

/* -------------------- Reusable pieces -------------------- */

function MetaItem({ icon, label }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <span className="text-[15px]">{label}</span>
    </li>
  );
}

function InfoCard({ icon, title, body, list }) {
  return (
    <div className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,.06)] p-5">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 grid place-items-center rounded-full bg-slate-50">
          {icon}
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      {body && <p className="mt-3 text-sm text-slate-700">{body}</p>}
      {list && (
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {list.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckIcon className="text-emerald-600" /> {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AgendaItem({ time, color, title, desc }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-start gap-4">
      <span
        className="inline-flex h-8 items-center rounded-full px-3 text-sm font-medium text-white"
        style={{ background: color }}
      >
        {time}
      </span>
      <div className="flex-1">
        <div className="text-[15px] font-semibold">{title}</div>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </li>
  );
}

function HeroDashboardCard() {
  return (
    <div className="rounded-2xl bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5 p-4 sm:p-5">
      {/* App bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            placeholder="Search sessions..."
            className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </div>
        </div>
        <button
          className="h-8 w-8 rounded-full bg-sky-500"
          aria-label="Toggle"
          title="Toggle"
        />
      </div>

      {/* 2x2 tiles */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Tile color="#E8F1FF" icon={<CompassIcon />} label="Discover" />
        <Tile color="#FEF6DC" icon={<PinBulbIcon />} label="Jam" />
        <Tile color="#EAF7F0" icon={<HammerIcon />} label="Build" />
        <Tile color="#FDECEC" icon={<TrophyIcon />} label="Showcase" />
      </div>
    </div>
  );
}

function Tile({ color, icon, label }) {
  return (
    <div
      className="rounded-xl h-28 sm:h-32 grid place-items-center border border-slate-100"
      style={{ background: color }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="text-sky-600">{icon}</div>
        <div className="text-sm font-medium text-slate-800">{label}</div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-200 to-violet-200 ring-1 ring-black/10 grid place-items-center text-[11px] font-semibold text-slate-700">
      RK
    </div>
  );
}

/* -------------------- Icons (inline SVGs) -------------------- */

function Dot({ color = "currentColor" }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{ background: color }}
    />
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
function StackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l10 5-10 5L2 8l10-5z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M22 13l-10 5L2 13" stroke="currentColor" strokeWidth="1.6" />
      <path d="M22 18l-10 5-10-5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M15.5 8.5l-2 5-5 2 2-5 5-2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function PinBulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a7 7 0 0 1 7 7c0 3-2 4.5-3 6H10c-1-1.5-3-3-3-6a7 7 0 0 1 7-7z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10 19h4M11 22h2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function HammerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M2 21l7-7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13 3l4 4-3 3-4-4 3-3z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M7 13l4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 4h8v4a4 4 0 0 1-8 0V4z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M6 4H4a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 4h2a3 3 0 0 1-3 3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 14h4v3H10zM7 21h10"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function InfoIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 8h.01M11 11h2v5h-2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function StarIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3l3 6 7 .9-5 4.8 1.4 6.3L12 17l-6.4 4 1.4-6.3-5-4.8L9 9l3-6z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function LockerIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="4"
        y="10"
        width="16"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
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

/* Background decoration */
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
