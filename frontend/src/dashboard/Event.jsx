import React, { useMemo, useState, useEffect } from "react";
import { useAuthGuard } from "./useAuthGuard";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase.js";
import Navbar from "./Navbar";
import { ChevronRight } from "lucide-react";

export default function Event() {
  // --- State ---
  const [isBooked, setIsBooked] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [isCheckingBooking, setIsCheckingBooking] = useState(true);
  const [totalBookings, setTotalBookings] = useState(0);

  // useUserProfile removed, handled in Navbar
  const { isLoading: authLoading } = useAuthGuard("/login");

  // Event Details (Static for now, could be passed as props)
  const event = {
    slug: "developer-explorer-2025", 
    title: "Developer The Explorer",
    summary:
      "A 3-day tech adventure camp where learning meets exploration. Build, jam, discover, and innovate under the open sky.",
    dateLabel: "6-8 Feb 2025 | Multi-day immersive camp",
    venue: "Jungle Retreat (GDGoC-GHRCE)",
    tracks: ["Cloud", "Web", "Android", "AI/ML"],
    availability: "available",
  };

  // --- Effects ---

  useEffect(() => {
    async function fetchData() {
      setIsCheckingBooking(true);
      
      // 0. Check total bookings count
      const { count } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("payment_status", "success");
      
      if (count !== null) setTotalBookings(count);

      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        setIsCheckingBooking(false);
        return;
      }

      try {
        // 1. Check Booking Status
        const { data: bookingData } = await supabase
          .from("bookings")
          .select("payment_status, ticket_type, amount, id") // fetch more details
          .eq("user_id", user.id)
          .eq("payment_status", "success")
          .maybeSingle();

        if (bookingData) {
            setIsBooked(true);
            setTicketDetails(bookingData);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setIsCheckingBooking(false);
      }
    }

    fetchData();
  }, [event.slug]);



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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
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

            <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
              {event.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl leading-relaxed">
              Hands-on Google-tech sessions, jamming labs & community networking.
              <br className="hidden sm:block"/>
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
              


              <div className="flex items-center gap-3 w-full sm:w-auto">
                {isCheckingBooking ? (
                  <button
                    disabled
                    className="flex-1 sm:flex-none rounded-full bg-blue-600/80 text-white font-medium px-6 py-3 shadow-lg shadow-blue-200 cursor-wait flex items-center justify-center gap-2"
                  >
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Checking...
                  </button>
                ) : isBooked ? (
                  <div className="w-full sm:max-w-md">
                    {ticketDetails && (
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md w-full animate-in fade-in slide-in-from-top-2 relative overflow-hidden">
                             {/* Decorative bg element */}
                             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent -mr-6 -mt-6 rounded-bl-full opacity-50 pointer-events-none"></div>

                             <div className="flex items-center justify-between mb-4 relative z-10">
                                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">YOUR PASS</div>
                                 <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm ring-1 ring-emerald-100">
                                    <CheckIcon size={12} /> CONFIRMED
                                 </div>
                             </div>
                             
                             <div className="relative z-10">
                                <h3 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">{ticketDetails.ticket_type || "Standard Pass"}</h3>
                                <p className="text-sm text-slate-500 font-medium mb-5">Developer The Explorer Summit '25</p>
                             </div>
                             
                             <div className="space-y-3 pt-4 border-t border-slate-100 relative z-10">
                                <div className="text-sm text-slate-600 flex items-center gap-3">
                                    <div className="p-1 rounded bg-emerald-100 text-emerald-600"><CheckIcon size={14} /></div>
                                    <span>Entry to all 3-day sessions & labs</span>
                                </div>
                                <div className="text-sm text-slate-600 flex items-center gap-3">
                                    <div className="p-1 rounded bg-emerald-100 text-emerald-600"><CheckIcon size={14} /></div>
                                    <span>{ticketDetails.ticket_type === 'VIP Pass' ? 'Priority Seating, Premium Swag & Lunch' : 'Standard Swag Kit, Lunch & Refreshments'}</span>
                                </div>
                                <div className="text-sm text-slate-600 flex items-center gap-3">
                                    <div className="p-1 rounded bg-emerald-100 text-emerald-600"><CheckIcon size={14} /></div>
                                    <span>Certificate of Participation</span>
                                </div>
                             </div>
                        </div>
                    )}
                  </div>
                ) : totalBookings > 120 ? (
                   <button disabled className="flex-1 sm:flex-none rounded-full bg-slate-100 text-slate-400 font-medium px-6 py-3 cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200">
                     Registrations Closed
                   </button>
                ) : (
                  <Link
                    to="/bookslot"
                    className="flex-1 sm:flex-none text-center rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 shadow-lg shadow-blue-200 transition-all active:scale-95"
                  >
                    Book your slot
                  </Link>
                )}
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
            body="Developer The Explorer is a 3-day immersive tech retreat designed to pull students out of classrooms and into an environment where ideas grow naturally. Across adventure challenges, workshops, bonfire talks, and jamming labs — you learn by doing."
          />
          <InfoCard
            icon={<StarIcon className="text-emerald-500" />}
            title="Why attend?"
            list={[
              "Hands-on labs with real projects & mentorship",
              "Adventure-based tech challenges",
              "Sessions by industry mentors & sponsors",
              "Bonfires, talks, jamming nights",
              "Certificate from GDGoC GHRCE",
              "A rare, high-energy environment"
            ]}
          />
          <InfoCard
            icon={<LockerIcon className="text-amber-500" />}
            title="What to bring"
            list={[
                "Laptop + Charger (Mandatory)", 
                "Student ID", 
                "Water Bottle",
                "Comfortable outdoor clothing",
                "Essentials for 2-night stay"
            ]}
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

            <div className="space-y-12 relative">
                {/* Vertical Line for timeline effect */}
                <div className="absolute left-[39px] sm:left-[43px] top-4 bottom-4 w-0.5 bg-slate-100 -z-10 hidden sm:block"></div>
                
                {/* DAY 1 */}
                <div>
                     <div className="flex items-center gap-3 mb-6 bg-slate-50 p-2 rounded-lg w-fit pr-4">
                        <span className="bg-sky-100 text-sky-700 font-bold px-3 py-1 rounded-md text-sm">Day 1</span>
                        <span className="text-sm font-semibold text-slate-600">6 Feb 2025</span>
                     </div>
                     <ul className="space-y-8">
                        <AgendaItem time="07:00" color="#3B82F6" title="Pickup & Reporting" desc="Arrival at pickup points, attendance, and seating coordination." />
                        <AgendaItem time="09:30" color="#6366F1" title="Venue Arrival & Check-in" desc="Welcome kits, room/tent allocation, and orientation." />
                        <AgendaItem time="10:00" color="#F59E0B" title="Treasure Hunt (Tech + Cultural)" desc="A high-energy exploration challenge to spark collaboration." />
                        <AgendaItem time="02:30" color="#10B981" title="Session 1: Workshop" desc="Hands-on workshop with expert guidance." />
                        <AgendaItem time="09:30" color="#8B5CF6" title="Talks & Stand-up Night" desc="Engaging speaker insights + open-mic comedy night." />
                     </ul>
                </div>

                {/* DAY 2 */}
                <div>
                     <div className="flex items-center gap-3 mb-6 bg-slate-50 p-2 rounded-lg w-fit pr-4 mt-8">
                        <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-md text-sm">Day 2</span>
                        <span className="text-sm font-semibold text-slate-600">7 Feb 2025</span>
                     </div>
                     <ul className="space-y-8">
                        <AgendaItem time="05:30" color="#F43F5E" title="Yoga & Warm-up" desc="Guided relaxation and stretching to start the day right." />
                        <AgendaItem time="10:00" color="#F59E0B" title="Challenge Activity" desc="Challenge-based outdoor activity." />
                        <AgendaItem time="02:00" color="#3B82F6" title="Session 2: Deep Dive" desc="Deep-dive tech workshop across tracks." />
                        <AgendaItem time="09:30" color="#8B5CF6" title="Jamming Sessions" desc="Team improvisations, open coding, music jam, networking." />
                     </ul>
                </div>

                {/* DAY 3 */}
                <div>
                     <div className="flex items-center gap-3 mb-6 bg-slate-50 p-2 rounded-lg w-fit pr-4 mt-8">
                        <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-md text-sm">Day 3</span>
                        <span className="text-sm font-semibold text-slate-600">8 Feb 2025</span>
                     </div>
                     <ul className="space-y-8">
                        <AgendaItem time="09:30" color="#10B981" title="Closing Talks + RSVP" desc="Final address, reflection circle, and closing ceremony." />
                        <AgendaItem time="12:00" color="#EF4444" title="Departure" desc="Heading back with memories and new skills." />
                     </ul>
                </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16 mb-8 text-center bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-blue-300/40 relative overflow-hidden">
             
             {/* Decorative circles */}
             <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
             <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-400 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

             <h2 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10">Ready to explore, build, and innovate?</h2>
             <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
                Book your slot and be part of the most immersive tech experience of the year.
             </p>
             <Link
                to="/bookslot"
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 relative z-10"
              >
                Book your slot <ChevronRight size={18} />
              </Link>
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
    <div className="rounded-3xl bg-white shadow-2xl shadow-slate-200/60 ring-1 ring-slate-900/5 p-6 sm:p-8 transform transition-transform hover:-translate-y-1 duration-500">
      {/* Search Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1">
           <h3 className="text-xl font-bold text-slate-900">Event Activities</h3>
           <p className="text-sm text-slate-500 font-medium">Explore everything happening at the camp</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-indigo-600 shadow-lg shadow-indigo-200 grid place-items-center text-white">
            <CalendarIcon />
        </div>
      </div>

      {/* Grid Tiles */}
      <div className="grid grid-cols-2 gap-5">
        <Tile color="from-blue-50 to-blue-100/50" borderColor="border-blue-100" icon={<CompassIcon className="text-blue-600"/>} label="Discover" desc="Explore Tracks"/>
        <Tile color="from-indigo-50 to-indigo-100/50" borderColor="border-indigo-100" icon={<PinBulbIcon className="text-indigo-600"/>} label="Jam" desc="Code Labs"/>
        <Tile color="from-emerald-50 to-emerald-100/50" borderColor="border-emerald-100" icon={<HammerIcon className="text-emerald-600"/>} label="Build" desc="Create Projects"/>
        <Tile color="from-amber-50 to-amber-100/50" borderColor="border-amber-100" icon={<TrophyIcon className="text-amber-600"/>} label="Showcase" desc="Win Prizes"/>
      </div>
    </div>
  );
}

function Tile({ color, borderColor, icon, label, desc }) {
  return (
    <div
      className={`rounded-2xl h-36 flex flex-col items-center justify-center gap-3 border bg-gradient-to-br ${color} ${borderColor} transition-all hover:shadow-md cursor-default group`}
    >
      <div className="bg-white p-3 rounded-full shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-center">
          <div className="text-[15px] font-bold text-slate-800">{label}</div>
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide mt-0.5">{desc}</div>
      </div>
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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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