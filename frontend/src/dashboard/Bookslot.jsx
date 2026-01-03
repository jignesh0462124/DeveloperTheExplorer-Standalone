import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  Lock,
  AlertCircle,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Building2,
  Ticket,
  ShieldCheck,
  Zap,
} from "lucide-react";

// --- REAL IMPORTS (Uncomment these in your project) ---
import { useNavigate } from "react-router-dom";
import { useAuthGuard } from "./useAuthGuard";
import { useUserProfile } from "./useUserProfile";
import { supabase } from "../../supabase/supabase.js";
import Navbar from "./Navbar";

const inr = (v) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v);

export default function Bookslot() {
  const navigate = useNavigate();
  const { isLoading } = useAuthGuard("/login");
  const { profile } = useUserProfile();

  // Loading state for booking check
  const [isCheckingBooking, setIsCheckingBooking] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cc, setCc] = useState("+91");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [gender, setGender] = useState("Male");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    college: false,
  });

  // Ticket Types State
  // Types: 'early', 'regular', 'late', 'vip'
  const [ticketType, setTicketType] = useState('early');
  const [bookingCount, setBookingCount] = useState(0);
  const [vipCount, setVipCount] = useState(0);

  // Derived Counts
  const gaCount = bookingCount - vipCount;

  // Determine Logic Tier
  // Early Bird: < 15 GA
  // Regular: >= 15 GA && < 85 GA
  // Late: >= 85 GA
  let currentGATier = 'early';
  if (gaCount >= 85) currentGATier = 'late';
  else if (gaCount >= 15) currentGATier = 'regular';

  // Sync ticketType with reality once counts load
  useEffect(() => {
    // If currently selected is a GA type but not the VALID one, switch it.
    // e.g. User defaults to 'early', but we are in 'regular'.
    if (['early', 'regular', 'late'].includes(ticketType)) {
      if (ticketType !== currentGATier) {
        setTicketType(currentGATier);
      }
    }
  }, [currentGATier, ticketType]);


  useEffect(() => {
    async function checkExistingBooking() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // 1. Check if User already booked
        const { data } = await supabase
          .from('bookings')
          .select('id')
          .eq('user_id', user.id)
          .eq('payment_status', 'success')
          .maybeSingle();

        if (data) {
          navigate('/event');
          return;
        }
      }

      // 2. Check Global Cap (Double check)
      const { count } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'success');

      if (count >= 120) {
        alert("Registrations are closed!");
        navigate('/event');
      }
    }

    const fetchBookingCount = async () => {
      await checkExistingBooking(); // Check first

      const { count: total, error: totalError } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'success');

      if (!totalError && total !== null) {
        setBookingCount(total);
      }

      // Fetch VIP Count
      const { count: vip, error: vipError } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'success')
        .eq('ticket_type', 'VIP Pass');

      if (!vipError && vip !== null) {
        setVipCount(vip);
      }

      setIsCheckingBooking(false);
    };
    fetchBookingCount();
  }, [navigate]);

  // Prefill data if profile loads
  useEffect(() => {
    if (profile?.name && !name) setName(profile.name);
    if (profile?.email && !email) setEmail(profile.email);
  }, [profile]);

  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    const cleanPhone = phone.replace(/\s|-/g, "");
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(cleanPhone)) {
      errors.phone = "Invalid Phone Number";
    }

    if (!college.trim()) errors.college = "College/Organization is required";

    return errors;
  };

  const errors = validate();
  const formValid = Object.keys(errors).length === 0;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };


  const getTicketDetails = (type) => {
    switch (type) {
      case 'vip':
        return { price: 1999, label: 'VIP Pass' };
      case 'late':
        return { price: 1799, label: 'Late Comers Pass' };
      case 'regular':
        return { price: 1499, label: 'Regular Pass' };
      case 'early':
      default:
        return { price: 1299, label: 'Early Bird Pass' };
    }
  };

  const { price: subtotal, label: ticketLabel } = getTicketDetails(ticketType);
  const total = subtotal;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  async function handleProceed() {
    // Mark all as touched to show errors
    if (!formValid) {
      setTouched({
        name: true,
        email: true,
        phone: true,
        college: true,
      });
      // Scroll to top error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please login first");
        setIsProcessing(false);
        return;
      }

      // ✅ SECURE: Send only ticket_type, backend calculates price
      const { data, error } = await supabase.functions.invoke("create-order", {
        body: {
          user_id: user.id,
          full_name: name,
          email,
          phone: `${cc} ${phone}`,
          college,
          gender,
          ticket_type: ticketType, // ✅ Send: 'early', 'regular', 'late', 'vip'
        },
      });

      if (error) {
        console.error(error);
        alert(error.message ?? "Error creating order.");
        setIsProcessing(false);
        return;
      }

      // ✅ Backend now returns the calculated amount and label
      const { key, order, booking_id, amount, ticket_label } = data;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Developer-The-Explorer",
        description: "Event Slot Booking",
        order_id: order.id,
        prefill: {
          name,
          email,
          contact: phone
        },
        theme: {
          color: "#3B82F6"
        },
        handler: async function (response) {
          try {
            setIsProcessing(true);
            setIsPaymentSuccess(true);


            // Delay navigation slightly to show success state
            setTimeout(() => {
              navigate("/event");
            }, 2000);
          } catch (error) {
            console.error("Error in payment handler:", error);
            navigate("/event");
            setIsPaymentSuccess(false);
          }
        },
        modal: {
          ondismiss: async () => {
            await supabase
              .from("bookings")
              .update({ payment_status: "cancelled" })
              .eq("id", booking_id);
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert("An unexpected error occurred. Please try again.");
    }
  }

  if (isLoading || isCheckingBooking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F7FB]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
          <p className="text-sm text-slate-500 font-medium">
            {isLoading ? "Verifying session..." : "Checking booking status..."}
          </p>
        </div>
      </div>
    );
  }

  if (isPaymentSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-emerald-500 mb-6"></div>
        <h2 className="text-2xl font-bold text-emerald-600 mb-2">Payment Successful!</h2>
        <p className="text-slate-500">Confirming your slot & redirecting to event page...</p>
      </div>
    );
  }

  const breadcrumbs = (
    <>
      <a className="hover:text-slate-900 transition-colors" href="/">Home</a>
      <ChevronRight size={14} className="text-slate-400" />
      <a className="hover:text-slate-900 transition-colors" href="/event">Event</a>
      <ChevronRight size={14} className="text-slate-400" />
      <span className="font-semibold text-sky-700">Checkout</span>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans pb-20 sm:pb-0">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <Navbar breadcrumbs={breadcrumbs} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 lg:py-12 relative z-10">

        {/* Page Title Section */}
        <section className="mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-3">
            <ShieldCheck size={14} /> Secure Checkout
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Confirm Your Attendance
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
            Join the elite community of developers at the tech-adventure retreat.
          </p>
        </section>

        {/* Two Column Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 items-start">

          {/* Left Column: Form */}
          <div className="lg:order-1 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-5 sm:p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <User className="text-blue-600" size={24} />
                Attendee Details
              </h2>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-full">Step 1 of 2</div>
            </div>

            <div className="space-y-5">

              {/* Ticket Type Selection */}
              <Field label="Select your Experience">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* General Admission Card (Dynamic) */}
                  <div
                    onClick={() => setTicketType(currentGATier)}
                    className={`group relative flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 
                        ${ticketType === currentGATier ?
                        (currentGATier === 'late' ? 'border-rose-500 bg-rose-50/50 shadow-md ring-1 ring-rose-500/20' : 'border-blue-500 bg-blue-50/50 shadow-md ring-1 ring-blue-500/20')
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                  >


                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg ${ticketType === currentGATier ? 'bg-white shadow-sm' : 'bg-slate-100 text-slate-500'}`}>
                          <Ticket size={16} className={ticketType === currentGATier ? (currentGATier === 'late' ? "text-rose-500" : "text-blue-500") : ""} />
                        </span>
                        <span className="font-bold text-slate-900">
                          {currentGATier === 'early' ? "Early Bird" : currentGATier === 'late' ? "Late Comers" : "Regular Pass"}
                        </span>
                      </div>
                      {ticketType === currentGATier && <CheckCircle2 size={20} className={currentGATier === 'late' ? "text-rose-600" : "text-blue-600"} />}
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="text-2xl font-bold text-slate-900">
                        {currentGATier === 'early' ? "₹1,299" : currentGATier === 'late' ? "₹1,799" : "₹1,499"}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">Full event access</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-dashed border-slate-200/60 text-xs text-slate-600 space-y-1">
                      <p>✓ All Sessions & Labs</p>
                      <p>✓ Lunch & Refreshments</p>
                    </div>
                  </div>


                  {/* VIP Pass - Only show if count < 25 */}
                  {vipCount < 25 ? (
                    <div
                      onClick={() => setTicketType('vip')}
                      className={`group relative flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${ticketType === 'vip' ? 'border-amber-500 bg-amber-50/50 shadow-md ring-1 ring-amber-500/20' : 'border-slate-200 hover:border-amber-300 hover:shadow-sm'}`}
                    >

                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`p-1.5 rounded-lg ${ticketType === 'vip' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}><Zap size={16} /></span>
                          <span className="font-bold text-slate-900">VIP Access</span>
                        </div>
                        {ticketType === 'vip' && <CheckCircle2 size={20} className="text-amber-600" />}
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="text-2xl font-bold text-slate-900">₹1,999</div>
                        <div className="text-xs text-slate-500 font-medium">Priority Experience</div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-dashed border-slate-200/60 text-xs text-slate-600 space-y-1">
                        <p>✓ Front Row Seating</p>
                        <p>✓ Exclusive Swag Kit</p>
                      </div>
                    </div>
                  ) : (
                    /* VIP SOLD OUT STATE */
                    <div className="flex flex-col p-5 rounded-2xl border border-slate-200 bg-slate-50 opacity-60 grayscale cursor-not-allowed">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-slate-200 text-slate-500"><Zap size={16} /></span>
                          <span className="font-bold text-slate-700">VIP Access</span>
                        </div>
                        <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded-full">SOLD OUT</span>
                      </div>
                      <div className="mt-2 text-xl font-bold text-slate-500">₹1,999</div>
                    </div>
                  )}
                </div>
              </Field>
              <Field label="Full Name" error={touched.name && errors.name}>
                <div className="relative group">
                  <User className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={inputCls("pl-10 " + (touched.name && errors.name ? "!border-red-500 !bg-red-50" : ""))}
                    placeholder="e.g. John Doe"
                    type="text"
                  />
                </div>
              </Field>

              <Field label="Email Address" error={touched.email && errors.email} subLabel="Tickets sent here">
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={inputCls("pl-10 " + (touched.email && errors.email ? "!border-red-500 !bg-red-50" : ""))}
                    placeholder="john@example.com"
                  />
                </div>
              </Field>

              <Field label="WhatsApp Number" error={touched.phone && errors.phone}>
                <div className="flex rounded-lg shadow-sm group">
                  <div className="relative">
                    <select
                      value={cc}
                      onChange={e => setCc(e.target.value)}
                      className="h-12 appearance-none rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 pl-3 pr-8 text-slate-700 font-medium focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>+91</option>
                      <option>+1</option>
                      <option>+44</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-4 text-slate-500 pointer-events-none" />
                  </div>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setPhone(val);
                      }}
                      onBlur={() => handleBlur("phone")}
                      className={`block h-12 w-full rounded-r-lg border border-slate-300 px-3 pl-10 py-2 placeholder-slate-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm ${touched.phone && errors.phone ? "border-red-500 bg-red-50 z-20" : ""}`}
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Organization" error={touched.college && errors.college}>
                  <div className="relative group">
                    <Building2 className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      onBlur={() => handleBlur("college")}
                      className={inputCls("pl-10 " + (touched.college && errors.college ? "!border-red-500 !bg-red-50" : ""))}
                      placeholder="e.g. IIT Delhi"
                    />
                  </div>
                </Field>

                <Field label="Gender">
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={`${inputCls("appearance-none cursor-pointer")} bg-no-repeat bg-right`}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-3.5 text-slate-500" />
                  </div>
                </Field>
              </div>
            </div>
          </div>

          {/* Right Column: Summary Sticky Sidebar */}
          <aside className="lg:order-2 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden">
              {/* Header of Receipt */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center font-bold text-xs">DT</div>
                    <span className="font-bold tracking-wide text-sm opacity-90">ORDER SUMMARY</span>
                  </div>
                  <h3 className="text-lg font-medium text-white/90">Checkout</h3>
                </div>
              </div>

              <div className="p-6 relative">
                {/* Ticket Item */}
                <div className="flex gap-4 pb-6 border-b border-dashed border-slate-200">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white shadow-lg shadow-blue-200">
                    <span className="text-xs font-medium opacity-80">FEB</span>
                    <span className="text-xl font-bold">06</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 leading-tight">Developer Explorer Summit '25</h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Ticket size={12} />
                      {ticketLabel}
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 space-y-3">
                  <SummaryRow label="Ticket Price" value={inr(subtotal)} />
                  <SummaryRow label="Convenience Fee" value={inr(0)} className="text-emerald-600" />
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-end mt-4">
                    <div className="text-sm text-slate-500">Total Payable</div>
                    <div className="text-3xl font-bold text-slate-900 tracking-tight">{inr(total)}</div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  disabled={isProcessing || bookingCount > 120}
                  onClick={handleProceed}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-all shadow-lg shadow-blue-200 active:scale-[0.98]
                    ${!isProcessing && bookingCount <= 120 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500' : 'bg-slate-300 cursor-not-allowed'}
                    `}
                >
                  {bookingCount > 120 ? (
                    <> Registrations Closed </>
                  ) : isProcessing ? (
                    <> <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing </>
                  ) : (
                    <> Complete Booking <ChevronRight size={18} /> </>
                  )}
                </button>
                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                  <Lock size={10} /> 256-Bit SSL Encrypted
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Need help? <a href="#" className="underline hover:text-blue-600">Contact Support</a>
            </p>
          </aside>

        </section>
      </main>
    </div>
  );
}

// --- Reusable Components ---

function Field({ label, subLabel, children, error }) {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="block text-[13px] font-semibold text-slate-700">
          {label} <span className="text-red-500">*</span>
        </label>
        {subLabel && <span className="text-[11px] text-slate-400 hidden xs:block">{subLabel}</span>}
      </div>
      {children}
      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-medium animate-in slide-in-from-top-1 fade-in duration-200">
          <AlertCircle size={12} />
          {error}
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value, className = "" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      <span className={`font-medium ${className}`}>{value}</span>
    </div>
  );
}

// Utility class for inputs - Text-base ensures no zoom on iOS
const inputCls = (extra = "") =>
  `h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base placeholder:text-slate-400
   transition-all duration-200
   focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
   disabled:bg-slate-50 disabled:text-slate-500
   ${extra}`;