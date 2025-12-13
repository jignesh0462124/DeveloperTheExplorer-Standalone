import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  Lock,
  AlertCircle,
  CheckCircle2
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
  const { isLoading } = useAuthGuard("/signup");
  const { profile } = useUserProfile();

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

  // Prefill data if profile loads (Optional enhancement)
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
      errors.phone = "Phone number must be 10 digits";
    }

    if (!college.trim()) errors.college = "College/Organization is required";

    return errors;
  };

  const errors = validate();
  const formValid = Object.keys(errors).length === 0;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const subtotal = 2.0;
  const total = subtotal;

  const [isProcessing, setIsProcessing] = useState(false);

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

      // Create Order
      const { data, error } = await supabase.functions.invoke("create-order", {
        body: {
          user_id: user.id,
          full_name: name,
          email,
          phone: `${cc} ${phone}`,
          college,
          gender,
          amount: total.toFixed(2),
        },
      });

      if (error) {
        console.error(error);
        alert(error.message ?? "Error creating order.");
        setIsProcessing(false);
        return;
      }

      const { key, order, booking_id } = data;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Developer The Explorer",
        description: "Event Slot Booking",
        order_id: order.id,
        prefill: { name, email, contact: phone },
        theme: { color: "#3B82F6" }, 

        handler: async function (response) {
          try {
            // Update booking status
            await supabase
              .from("bookings")
              .update({
                payment_status: "success",
                payment_id: response.razorpay_payment_id,
              })
              .eq("id", booking_id);

            // Send confirmation email
            await supabase.functions.invoke("send-booking-confirmation", {
              body: {
                email,
                full_name: name,
                booking_id,
                amount: total.toFixed(2),
                phone: `${cc} ${phone}`,
                college,
                gender,
              },
            });

            navigate("/event");
          } catch (error) {
            console.error("Error in payment handler:", error);
            navigate("/event");
          } finally {
            setIsProcessing(false);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F7FB]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
          <p className="text-sm text-slate-500 font-medium">Verifying session...</p>
        </div>
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
    <div className="min-h-screen bg-[#F5F7FB] text-slate-900 antialiased font-sans pb-20 sm:pb-0">
      <Navbar breadcrumbs={breadcrumbs} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        
        {/* Page Title Section */}
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Secure your spot
          </h1>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-slate-600">
            <p className="text-[15px]">
              Complete your registration for the upcoming hands-on session.
            </p>
            <div className="hidden sm:block h-1 w-1 rounded-full bg-slate-300"></div>
            <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
              <Lock size={14} />
              SSL Encrypted Checkout
            </p>
          </div>
        </section>

        {/* Two Column Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="order-2 lg:order-1 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-5 sm:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-sky-100 text-sky-600 text-xs font-bold">1</span>
                    Attendee Details
                </h2>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Step 1 of 2</span>
            </div>

            <div className="space-y-5">
              <Field label="Full Name" error={touched.name && errors.name}>
                <div className="relative">
                    <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={inputCls(touched.name && errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "")}
                    placeholder="e.g. John Doe"
                    type="text"
                    />
                    {touched.name && !errors.name && <CheckCircle2 className="absolute right-3 top-3 text-emerald-500 pointer-events-none" size={18} />}
                </div>
              </Field>

              <Field label="Email Address" error={touched.email && errors.email} subLabel="We'll send your ticket here">
                <div className="relative">
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={inputCls(touched.email && errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "")}
                    placeholder="john@example.com"
                    />
                </div>
              </Field>

              <Field label="WhatsApp / Phone" error={touched.phone && errors.phone}>
                <div className="flex rounded-md shadow-sm">
                  <div className="relative">
                      <select 
                        value={cc}
                        onChange={e => setCc(e.target.value)}
                        className="h-11 appearance-none rounded-l-md border border-r-0 border-slate-300 bg-slate-50 pl-3 pr-8 text-slate-600 text-base focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      >
                        <option>+91</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2 top-3.5 text-slate-400 pointer-events-none"/>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setPhone(val);
                    }}
                    onBlur={() => handleBlur("phone")}
                    className={`block w-full flex-1 rounded-none rounded-r-md border border-slate-300 px-3 py-2 placeholder-slate-400 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 sm:text-sm h-11 text-base ${touched.phone && errors.phone ? "border-red-500 z-20" : ""}`}
                    placeholder="98765 43210"
                  />
                </div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Organization / College" error={touched.college && errors.college}>
                    <input
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      onBlur={() => handleBlur("college")}
                      className={inputCls(touched.college && errors.college ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "")}
                      placeholder="e.g. IIT Delhi"
                    />
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
          <aside className="order-1 lg:order-2 lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl shadow-slate-200/50 p-5 sm:p-6 overflow-hidden relative">
              
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-indigo-500"></div>

              <h3 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h3>

              {/* Event Mini Details */}
              <div className="mb-4 pb-4 border-b border-dashed border-slate-200">
                  <div className="flex gap-3">
                     <div className="h-12 w-12 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🎟️</span>
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-slate-900 line-clamp-1">Developer Explorer Summit</p>
                        <p className="text-xs text-slate-500">Standard Access Pass</p>
                     </div>
                  </div>
              </div>

              <div className="space-y-3 text-sm">
                <SummaryRow label="Ticket Price" value={inr(subtotal)} />
                <SummaryRow label="Processing Fee" value={inr(0)} className="text-emerald-600" />
                <SummaryRow label="Taxes" value="Included" className="text-slate-400" />
                
                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-sm font-medium text-slate-600">Total Amount</span>
                     <span className="text-[10px] text-slate-400">Including GST</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">{inr(total)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={isProcessing}
                onClick={handleProceed}
                className={`group relative mt-6 w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                  !isProcessing 
                    ? "bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-sky-200 hover:shadow-sky-300" 
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-center gap-2 relative z-10">
                    {isProcessing ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Processing...</span>
                    </>
                    ) : (
                    <>
                        <span>Proceed to Pay</span>
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </>
                    )}
                </div>
              </button>

              {/* Trust Badges */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400 bg-slate-50 py-2 rounded-lg border border-slate-100">
                <Lock size={12} className="text-slate-400" />
                <span>256-bit SSL Secured Payment</span>
              </div>
            </div>

            {/* Help Text */}
            <p className="mt-4 text-center text-xs text-slate-400 px-4">
               By proceeding, you agree to our <a href="#" className="underline hover:text-sky-600">Terms</a> & <a href="#" className="underline hover:text-sky-600">Conditions</a>.
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
  `h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base sm:text-sm placeholder:text-slate-400
   transition-all duration-200
   focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 
   disabled:bg-slate-50 disabled:text-slate-500
   ${extra}`;