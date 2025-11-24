import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Lock,
  Bell,
} from "lucide-react";
import { useAuthGuard } from "./useAuthGuard";
import { supabase } from "../../supabase/supabase.js";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "./useUserProfile";


const inr = (v) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    v
  );

export default function Bookslot() {
  const navigate = useNavigate();
  const { isLoading } = useAuthGuard("/signup");
  const { profile, loadingProfile } = useUserProfile();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cc, setCc] = useState("+91");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [gender, setGender] = useState("Male");


  const subtotal = 999.0;
  const total = subtotal;

  const formValid =
    name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email) &&
    /^[0-9]{7,15}$/.test(phone.replace(/\s|-/g, ""));

  async function handleProceed() {
  if (!formValid) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return alert("Please login first");

  const amountToCharge = Number(total.toFixed(2));

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
    return alert(error.message ?? "Error creating order.");
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
        const emailResponse = await supabase.functions.invoke("send-booking-confirmation", {
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

        if (emailResponse.error) {
          console.error("Failed to send confirmation email:", emailResponse.error);
          // Don't block navigation even if email fails
        } else {
          console.log("Confirmation email sent successfully");
        }

        // Navigate to event page
        navigate("/event");
      } catch (error) {
        console.error("Error in payment handler:", error);
        // Still navigate even if there's an error
        navigate("/event");
      }
    },

    modal: {
      ondismiss: async () => {
        await supabase
          .from("bookings")
          .update({ payment_status: "cancelled" })
          .eq("id", booking_id);
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
  async function handleLogout() {
    try {
      setIsSigningOut(true);
      await supabase.auth.signOut();
      window.location.href = "/signup";
    } catch (error) {
      console.error("Failed to sign out:", error);
      setIsSigningOut(false);
    }
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
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto max-w-6xl h-14 px-4 sm:px-6 flex items-center justify-between">
          <a href="/" className="font-semibold">Developer The Explorer</a>
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <a className="hover:text-slate-900" href="/">Home</a>
            <ChevronRight size={16} />
            <a className="hover:text-slate-900" href="/event">Event</a>
            <ChevronRight size={16} />
            <span className="font-medium text-slate-900">Book your slot</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Bell size={18} className="hidden sm:block" />
            <div className="hidden sm:flex flex-col text-right text-xs">
              <span className="text-slate-500">
                {loadingProfile ? "Syncing…" : "Signed in"}
              </span>
              <span className="text-sm font-medium text-slate-900">
                {loadingProfile ? "Loading…" : profile.name || "Guest"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              disabled={isSigningOut}
              className="text-xs sm:text-sm font-medium text-slate-600 border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-50 transition disabled:opacity-60"
            >
              {isSigningOut ? "Signing out…" : "Logout"}
            </button>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sky-200 to-violet-200 text-[11px] font-semibold text-slate-700 ring-1 ring-black/10">
              {profile.initials || "DT"}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <section>
          <h1 className="text-3xl sm:text-[32px] font-semibold">Book your slot</h1>
          <p className="mt-1 text-[15px] text-slate-600">
            Reserve your seat for hands-on sessions and showcase.
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-emerald-700">
            <Lock size={16} />
            Secure checkout via Razorpay
          </p>
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,.06)] p-5 sm:p-7">
            <h2 className="text-base font-semibold">Attendee details</h2>

            <div className="mt-4 space-y-4">
              <Field label="Full name">
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls()} placeholder="Please Enter your Name"/>
              </Field>

              <Field label="Email">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls()} placeholder="your email address" />
              </Field>

              <Field label="Phone">
                <div className="flex">
                  <button type="button" className="me-2 inline-flex items-center justify-between min-w-[88px] h-11 rounded-md border border-slate-300 bg-white px-3 text-[15px]">
                    {cc}
                    <ChevronDown size={16} className="text-slate-500" />
                  </button>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls("flex-1")} placeholder="xxxxxxxxxx" />
                </div>
              </Field>

              <Field label="College/Organization">
                <input value={college} onChange={(e) => setCollege(e.target.value)} className={inputCls()} placeholder="college/organization" />
              </Field>

              <Field label="Gender">
                <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls("appearance-none pe-10")}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 -translate-y-6 text-slate-500" />
              </Field>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,.06)] p-5 sm:p-6">
              <h3 className="text-lg font-semibold">Order Summary</h3>

              <div className="mt-4 space-y-2 text-sm">
                <SummaryRow label="Subtotal" value={inr(subtotal)} />
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-2xl font-semibold">{inr(total)}</span>
                </div>
              </div>

              <button
                disabled={!formValid}
                onClick={handleProceed}
                className={`mt-5 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white ${
                  formValid ? "bg-[#3B82F6] hover:bg-[#2563EB]" : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                Proceed to payment
              </button>

              <p className="mt-3 flex items-center gap-2 text-[13px] text-emerald-700">
                <Lock size={16} /> Safe & secure — Powered by Razorpay
              </p>

              <div className="mt-4 rounded-lg bg-slate-50 px-3 py-3 text-[13px] text-slate-600">
                You’ll be redirected to Razorpay to complete payment.
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}


function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-slate-800">
        {label}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

const inputCls = (extra = "") =>
  `h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-[15px] placeholder:text-slate-400
   focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 ${extra}`;
