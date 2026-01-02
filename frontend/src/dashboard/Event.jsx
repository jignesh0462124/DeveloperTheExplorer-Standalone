import React, { useMemo, useState, useEffect } from "react";
import { useAuthGuard } from "./useAuthGuard";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase.js";
import Navbar from "./Navbar";
import { ChevronRight, Users, Zap, Presentation } from "lucide-react";

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
    title: "Developer-The-Explorer",
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

            <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 drop-shadow-sm">
              {event.title}
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed space-y-4">
              <span className="block font-semibold text-slate-800">
                Get ready for Developer-The-Explorer : Explore Beyond What You Already Know
              </span>
              <span className="block mt-2">
                Join us this February 6 - 8, 2025 in a tech-adventure retreat: 3-days, 2-nights of pure innovation.
              </span>
              <span className="block mt-2">
                At a stunning campsite near Nagpur, India, hosted by Google Developer Group on Campus – GHRCE.
              </span>
              <span className="block mt-2">
                Ignite breakthroughs under open skies with industrial sessions, networking, and epic collaborations!
              </span>
            </p>

            {/* Metadata List */}
            {/* <ul className="mt-8 space-y-3">
              <MetaItem icon={<CalendarIcon />} label={event.dateLabel} />
              <MetaItem icon={<PinIcon />} label={event.venue} />
              <MetaItem icon={<StackIcon />} label={event.tracks.join(" · ")} />
            </ul> */}

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
                      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-100 p-6 shadow-xl shadow-emerald-100/50 w-full animate-in fade-in slide-in-from-top-2 relative overflow-hidden group">
                        {/* Decorative bg element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100 to-transparent -mr-8 -mt-8 rounded-bl-full opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

                        <div className="flex items-center justify-between mb-4 relative z-10">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">YOUR PASS</div>
                          <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm ring-1 ring-emerald-200">
                            <CheckIcon size={12} strokeWidth={4} /> CONFIRMED
                          </div>
                        </div>

                        <div className="relative z-10">
                          <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">{ticketDetails.ticket_type || "Standard Pass"}</h3>
                          <p className="text-sm text-slate-500 font-medium mb-5">Developer-The-Explorer Summit '25</p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-100 relative z-10">
                          <div className="text-sm text-slate-600 flex items-center gap-3">
                            <div className="p-1 rounded-full bg-emerald-100 text-emerald-600"><CheckIcon size={12} /></div>
                            <span className="font-medium">Entry to all 3-day sessions & labs</span>
                          </div>
                          <div className="text-sm text-slate-600 flex items-center gap-3">
                            <div className="p-1 rounded-full bg-emerald-100 text-emerald-600"><CheckIcon size={12} /></div>
                            <span className="font-medium">{ticketDetails.ticket_type === 'VIP Pass' ? 'Priority Seating, Premium Swag & Lunch' : 'Standard Swag Kit, Lunch & Refreshments'}</span>
                          </div>
                          <div className="text-sm text-slate-600 flex items-center gap-3">
                            <div className="p-1 rounded-full bg-emerald-100 text-emerald-600"><CheckIcon size={12} /></div>
                            <span className="font-medium">Certificate of Participation</span>
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
            theme="blue"
            icon={<InfoIcon className="text-blue-600" />}
            title="About the event"
            body="Developer-The-Explorer is not your normal tech event—it's a 3-day, 2-night immersive experience blending tech and adventure under the open sky, harmonizing with nature. Designed to unite professionals and students in an environment where ideas flourish naturally. Forget speaker stages and slide decks—ideas exchange dynamically via interactive workshops, outdoor challenges, and campfire chats."
          />
          <InfoCard
            theme="emerald"
            icon={<StarIcon className="text-emerald-600" />}
            title="Why Attend Developer-The-Explorer?"
            list={[
              "Adventure Tech Challenges – Blend coding with outdoor excitement",
              "Industry Mentor Sessions – Insights from pros and sponsors",
              "Bonfires & Jamming Nights – Unwind, connect, and spark ideas",
              "Rare High-Energy Vibe – Immersive escape like no other tech event"
            ]}
          />
          <InfoCard
            theme="amber"
            icon={<LockerIcon className="text-amber-600" />}
            title="What to bring"
            list={[
              "Laptop + Charger (Mandatory)",
              "Student ID",
              "Water Bottle",
              "Comfortable outdoor clothing",
              "Essentials for 2-night stay (toiletries, sleeping bag, torch)",
              "Most Important: Your Energy - Bring your enthusiasm to explore!",
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
              <div className="relative pl-8 sm:pl-10 space-y-12">
                {/* Daily Track Line */}
                <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent"></div>

                <div>
                  <div className="relative flex items-center gap-4 mb-8">
                    <div className="absolute -left-[35px] sm:-left-[43px] w-8 h-8 rounded-full border-4 border-white bg-blue-600 shadow-md z-10 grid place-items-center">
                      <span className="text-[10px] font-bold text-white">D1</span>
                    </div>
                    <div className="bg-blue-50/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
                      <h3 className="text-lg font-bold text-blue-900">Day 1 — Feb 6</h3>
                    </div>
                  </div>
                  <div className="space-y-0">
                    <RailwayItem time="01:00 PM" title="Reporting" desc="Gear Up & Check-in" color="bg-blue-500" />
                    <RailwayItem time="02:00 PM" title="Departure" desc="Leaving for Ramtek" color="bg-indigo-500" />
                    <RailwayItem time="03:30 PM" title="Arrival" desc="Reaching Basecamp" color="bg-violet-500" />
                    <RailwayItem time="05:00 PM" title="Accommodation" desc="High Tea & Settlement" color="bg-fuchsia-500" />
                    <RailwayItem time="05:30 PM" title="Kickoff" desc="Activity & Introduction" color="bg-pink-500" />
                    <RailwayItem time="08:00 PM" title="Dinner" desc="Community Feast" color="bg-rose-500" />
                    <RailwayItem time="09:00 PM" title="Rest" desc="Networking / Night Prep" color="bg-slate-500" />
                    <RailwayItem time="10:00 PM" title="Product Designing" desc="Technical Workshop 01" color="bg-indigo-600" isLast={true} />
                  </div>
                </div>
              </div>

              {/* DAY 2 */}
              <div className="relative pl-8 sm:pl-10 space-y-12 mt-16 text-left">
                <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent"></div>

                <div>
                  <div className="relative flex items-center gap-4 mb-8">
                    <div className="absolute -left-[35px] sm:-left-[43px] w-8 h-8 rounded-full border-4 border-white bg-emerald-600 shadow-md z-10 grid place-items-center">
                      <span className="text-[10px] font-bold text-white">D2</span>
                    </div>
                    <div className="bg-emerald-50/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-emerald-100 shadow-sm">
                      <h3 className="text-lg font-bold text-emerald-900">Day 2 — Feb 7</h3>
                    </div>
                  </div>
                  <div className="space-y-0">
                    <RailwayItem time="12:00 AM" title="Rest" desc="Recharge for the day ahead" color="bg-slate-400" />
                    <RailwayItem time="06:30 AM" title="Fresh" desc="Morning routine" color="bg-cyan-500" />
                    <RailwayItem time="07:00 AM" title="Breakfast" desc="Morning Fuel" color="bg-orange-500" />
                    <RailwayItem time="08:00 AM" title="App Security" desc="Technical Workshop 02" color="bg-red-500" />
                    <RailwayItem time="11:00 AM" title="Among Us" desc="Strategic Game Session" color="bg-purple-500" />
                    <RailwayItem time="01:00 PM" title="Lunch" desc="Mid-day Break" color="bg-orange-500" />
                    <RailwayItem time="02:00 PM" title="Rest" desc="Industry Connections" color="bg-slate-500" />
                    <RailwayItem time="04:00 PM" title="Fintech" desc="Technical Workshop 03" color="bg-green-600" />
                    <RailwayItem time="07:00 PM" title="Product/Sponsor" desc="Unplugged & Social" color="bg-pink-600" />
                    <RailwayItem time="08:00 PM" title="Dinner" desc="Evening Fuel" color="bg-rose-500" />
                    <RailwayItem time="09:00 PM" title="Jamming" desc="Late Night Huddle" color="bg-violet-600" isLast={true} />
                    <RailwayItem time="10:00 PM" title="Buffer Time" desc="Session Activity" color="bg-indigo-400" />
                  </div>
                </div>
              </div>

              {/* DAY 3 */}
              <div className="relative pl-8 sm:pl-10 space-y-12 mt-16 text-left">
                <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-orange-500 to-transparent"></div>

                <div>
                  <div className="relative flex items-center gap-4 mb-8">
                    <div className="absolute -left-[35px] sm:-left-[43px] w-8 h-8 rounded-full border-4 border-white bg-amber-600 shadow-md z-10 grid place-items-center">
                      <span className="text-[10px] font-bold text-white">D3</span>
                    </div>
                    <div className="bg-amber-50/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-amber-100 shadow-sm">
                      <h3 className="text-lg font-bold text-amber-900">Day 3 — Feb 8</h3>
                    </div>
                  </div>
                  <div className="space-y-0">

                    <RailwayItem time="12:00 AM" title="Bon Fire" desc="Night Watch & Stories" color="bg-orange-600" />
                    <RailwayItem time="02:00 AM" title="Rest" desc="Sleep" color="bg-slate-400" />
                    <RailwayItem time="07:00 AM" title="Breakfast" desc="Morning Fuel" color="bg-orange-500" />
                    <RailwayItem time="08:00 AM" title="Final Showdown" desc="The Grand Conclusion" color="bg-emerald-600" />
                    <RailwayItem time="10:00 AM" title="Packup" desc="Leaving for Home" color="bg-blue-500" />
                    <RailwayItem time="12:00 PM" title="Departure" desc="End of the expedition" color="bg-red-500" isLast={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        {!isBooked && (
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
        )}
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

function InfoCard({ icon, title, body, list, theme = "slate" }) {
  const themeStyles = {
    blue: "bg-blue-50/50 border-blue-100 hover:border-blue-200",
    emerald: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-200",
    amber: "bg-amber-50/50 border-amber-100 hover:border-amber-200",
    slate: "bg-white border-slate-100 hover:border-slate-200"
  };

  const currentTheme = themeStyles[theme] || themeStyles.slate;

  return (
    <div className={`group rounded-3xl ${currentTheme} border shadow-sm hover:shadow-lg transition-all duration-300 p-8 flex flex-col h-full`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 grid place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>

      {body && (
        <p className="text-base leading-7 text-slate-600 font-medium opacity-90 mb-4">
          {body}
        </p>
      )}

      {list && (
        <ul className="space-y-4">
          {list.map((item, i) => {
            // Check for "Most Important" highlight
            const isImportant = item.toLowerCase().includes("most important");

            // Check for Title - Description pattern (using en-dash or hyphen)
            // We look for the first occurrence of a dash that looks like a separator
            const separatorRegex = / [–-] /;
            const parts = item.split(separatorRegex);
            const hasTitleDescription = parts.length > 1 && !isImportant;

            if (isImportant) {
              return (
                <li key={i} className="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-amber-200 shadow-sm text-amber-900 relative overflow-hidden group/item">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <div className="flex gap-3 relative z-10">
                    <StarIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 fill-amber-500" />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Most Important</span>
                      <span className="font-bold text-base block leading-tight">{item.replace(/Most Important:?/i, "").trim()}</span>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={i} className="flex items-start gap-3 text-[15px] text-slate-700 font-medium">
                <CheckIcon className={`mt-1 shrink-0 ${theme === 'blue' ? 'text-blue-500' :
                  theme === 'emerald' ? 'text-emerald-500' :
                    theme === 'amber' ? 'text-amber-500' : 'text-slate-500'
                  }`} />

                <div className="leading-snug">
                  {hasTitleDescription ? (
                    <>
                      <span className={`block font-bold text-base mb-0.5 ${theme === 'blue' ? 'text-blue-900' :
                        theme === 'emerald' ? 'text-emerald-900' :
                          theme === 'amber' ? 'text-amber-900' : 'text-slate-900'
                        }`}>
                        {parts[0].trim()}
                      </span>
                      <span className="text-slate-600 text-[14px] leading-relaxed block">
                        {parts.slice(1).join(" - ").trim()}
                      </span>
                    </>
                  ) : (
                    <span>{item}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function RailwayItem({ time, title, desc, color, isLast }) {
  return (
    <div className={`relative pl-8 py-4 ${!isLast ? 'border-l-0' : ''}`}>
      {/* Connector Line Cover for spacing (optional tuning) */}

      {/* Station Dot */}
      <div className={`absolute -left-[11px] top-6 w-5 h-5 rounded-full border-[3px] border-white shadow-sm z-10 ${color}`}></div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 group">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-md w-fit ${color.replace('bg-', 'text-').replace('500', '600').replace('600', '700')} bg-opacity-10 bg-slate-100`}>
          {time}
        </span>
        <div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h4>
          <p className="text-sm text-slate-500 font-medium">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroDashboardCard() {
  return (
    <div className="rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl shadow-indigo-100/50 p-6 sm:p-8 transform transition-transform hover:-translate-y-2 duration-700 relative overflow-hidden">
      {/* Glossy gradient behind */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>

      {/* Search Header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="flex-1">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Event Activities</h3>
          <p className="text-[15px] text-slate-500 font-medium mt-1 leading-relaxed">Explore the core experiences fueling innovation at camp.</p>
        </div>
        <div className="hidden sm:grid h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/30 place-items-center text-white ring-4 ring-white">
          <CalendarIcon />
        </div>
      </div>

      {/* Grid Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Tile
          color="from-blue-50 to-blue-100/50"
          borderColor="border-blue-100"
          icon={<CompassIcon className="text-blue-600" />}
          label="Discover"
          desc="Uncover emerging tech trends and tools."
        />
        <Tile
          color="from-indigo-50 to-indigo-100/50"
          borderColor="border-indigo-100"
          icon={<Users className="text-indigo-600" size={20} />}
          label="Network"
          desc="Connect with curated professionals and students for lasting collaborations."
        />
        <Tile
          color="from-amber-50 to-amber-100/50"
          borderColor="border-amber-100"
          icon={<Zap className="text-amber-600" size={20} />}
          label="Brainstorm"
          desc="Ignite ideas in dynamic group sessions turning concepts into actionable plans."
        />
        <Tile
          color="from-emerald-50 to-emerald-100/50"
          borderColor="border-emerald-100"
          icon={<Presentation className="text-emerald-600" size={20} />}
          label="Industry Sessions"
          desc="Dive into real-world insights from industry mentors on high-demand skills."
        />
      </div>
    </div>
  );
}

function Tile({ color, borderColor, icon, label, desc }) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col items-start gap-4 border bg-gradient-to-br ${color} ${borderColor} transition-all hover:shadow-md cursor-default group h-full`}
    >
      <div className="bg-white p-2.5 rounded-xl shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-left">
        <div className="text-[16px] font-bold text-slate-900 mb-1.5">{label}</div>
        <div className="text-[13px] font-medium text-slate-600 leading-snug">{desc}</div>
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
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SearchIcon({ className }) {
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