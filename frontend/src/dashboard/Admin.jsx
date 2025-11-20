import React, { useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  IndianRupee,
  MoreVertical,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Banknote,
  Wallet,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { supabase } from "../../supabase/supabase.js";
import { useUserProfile } from "./useUserProfile";

/* ---------- Utils ---------- */
const cn = (...a) => a.filter(Boolean).join(" ");
const currency = (v) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    v
  );

/* ---------- Sample data (replace with API / Supabase) ---------- */
const SAMPLE_ROWS = [
  {
    id: 1,
    date: "27 Nov 2025",
    time: "10:42 AM",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    paymentId: "pay_Lk19a23B7…",
    orderId: "order_Gh83K2p9…",
    method: "UPI",
    amount: 799,
    status: "Captured",
  },
  {
    id: 2,
    date: "27 Nov 2025",
    time: "09:15 AM",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 8765432109",
    paymentId: "pay_MzB83c4CE8…",
    orderId: "order_Jh94L3q0…",
    method: "Card",
    amount: 1299,
    status: "Authorized",
  },
  {
    id: 3,
    date: "26 Nov 2025",
    time: "08:30 PM",
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 7654321098",
    paymentId: "pay_Nk39c45DF9…",
    orderId: "order_KJ05M4r1…",
    method: "Netbanking",
    amount: 549,
    status: "Failed",
  },
  {
    id: 4,
    date: "26 Nov 2025",
    time: "05:45 PM",
    name: "Sneha Gupta",
    email: "sneha.g@example.com",
    phone: "+91 6543210987",
    paymentId: "pay_0k40d56E0…",
    orderId: "order_LiEN5z…",
    method: "Wallet",
    amount: 2499,
    status: "Refunded",
  },
  {
    id: 5,
    date: "26 Nov 2025",
    time: "02:20 PM",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 5432109876",
    paymentId: "pay_PkS1e67F7H…",
    orderId: "order_MJZ0fB3…",
    method: "UPI",
    amount: 899,
    status: "Captured",
  },
];

/* ---------- Main ---------- */
export default function Admin() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(["Captured"]);
  const [methodFilter, setMethodFilter] = useState(["UPI"]);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { profile, loadingProfile } = useUserProfile();

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

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return SAMPLE_ROWS.filter((r) => {
      const text =
        `${r.name} ${r.email} ${r.phone} ${r.paymentId} ${r.orderId}`.toLowerCase();
      const matchQ = !q || text.includes(q);
      const matchS =
        statusFilter.length === 0 || statusFilter.includes(r.status);
      const matchM =
        methodFilter.length === 0 || methodFilter.includes(r.method);
      return matchQ && matchS && matchM;
    });
  }, [query, statusFilter, methodFilter]);

  const totalRevenue = SAMPLE_ROWS.filter(
    (r) => r.status === "Captured"
  ).reduce((a, b) => a + b.amount, 0);

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-900 antialiased">
      {/* Shell */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:block min-h-screen border-r border-slate-200 bg-white/90 backdrop-blur-md">
          <div className="p-4 flex items-center gap-2">
            <Logo />
            <span className="font-semibold">Developer The Explorer Admin</span>
          </div>
          <nav className="px-2 py-3">
            <SideItem
              active
              icon={<ShieldCheck size={18} />}
              label="Dashboard"
            />
            <SideItem
              active
              icon={<IndianRupee size={18} />}
              label="Payments"
            />
            <SideItem icon={<CreditCard size={18} />} label="Orders" />
            <SideItem icon={<UsersIcon />} label="Users" />
            <SideItem icon={<Settings size={18} />} label="Settings" />
          </nav>
        </aside>

        {/* Content */}
        <div className="min-h-screen">
          {/* Top app bar (mobile) */}
          <div className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="h-14 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo />
                <span className="font-semibold">Admin</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Bell size={18} />
                <span className="text-sm font-medium text-slate-900 hidden sm:block">
                  {loadingProfile ? "Loading…" : profile.name || "Guest"}
                </span>
                <button
                  onClick={handleLogout}
                  disabled={isSigningOut}
                  className="text-xs font-medium text-slate-600 border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-50 transition disabled:opacity-60"
                >
                  {isSigningOut ? "Signing out…" : "Logout"}
                </button>
                <Avatar initials={profile.initials} />
              </div>
            </div>
          </div>

          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Payments</h1>
                <p className="text-sm text-slate-600">
                  Manage transactions from Razorpay; verify, refund, export, and
                  send receipts.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                  <Download size={16} />
                  Export CSV
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-[#3B82F6] px-3 py-2 text-sm font-medium text-white hover:bg-[#2563EB]">
                  <Plus size={16} />
                  Create Manual Entry
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50">
                  <RefreshCcw size={16} />
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isSigningOut}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* KPI cards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <KpiCard
                title="Total Revenue"
                value={currency(totalRevenue)}
                badge={<RupeeBadge />}
              />
              <KpiCard
                title="Successful Payments"
                value={SAMPLE_ROWS.filter(
                  (r) => r.status === "Captured"
                ).length.toLocaleString()}
                badge={
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    <CheckCircle2 size={14} /> Live
                  </span>
                }
              />
            </div>

            {/* Filter bar */}
            <div className="mt-5 rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,.06)] p-3">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by email, phone, transaction or order ID"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400"
                  />
                </div>

                <BtnSelect label="Today" />
                <BtnSelect label="Status" />
                <BtnSelect label="Method" />

                <div className="relative w-full sm:w-40">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    Min ₹
                  </span>
                  <input
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-14 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400"
                    placeholder="0.00"
                    type="number"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setQuery("");
                      setStatusFilter([]);
                      setMethodFilter([]);
                    }}
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm hover:bg-slate-50"
                  >
                    Clear
                  </button>
                  <button className="h-10 rounded-lg bg-[#3B82F6] px-4 text-sm font-medium text-white hover:bg-[#2563EB]">
                    Apply Filters
                  </button>
                </div>
              </div>

              {/* Active chips */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {statusFilter.map((s) => (
                  <Chip
                    key={s}
                    color="blue"
                    onClose={() => setStatusFilter([])}
                  >
                    {s}
                  </Chip>
                ))}
                {methodFilter.map((m) => (
                  <Chip
                    key={m}
                    color="indigo"
                    onClose={() => setMethodFilter([])}
                  >
                    {m}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="mt-5 rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,.06)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr className="text-left">
                      <th className="w-10 p-4">
                        <input type="checkbox" className="accent-[#3B82F6]" />
                      </th>
                      <Th>Date & Time</Th>
                      <Th>Payer Details</Th>
                      <Th>Phone</Th>
                      <Th>Transaction ID</Th>
                      <Th>Order ID</Th>
                      <Th>Method</Th>
                      <Th className="text-right">Amount</Th>
                      <Th className="text-right">Status</Th>
                      <th className="w-10 p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((r) => (
                      <Row key={r.id} row={r} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer / Pagination */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 p-3">
                <div className="flex items-center gap-2 text-sm">
                  Rows per page:
                  <select className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
                <div className="text-sm text-slate-600">
                  1–{filtered.length} of 1,247 results
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-md border border-slate-200 bg-white p-1.5 hover:bg-slate-50">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="rounded-md border border-slate-200 bg-white p-1.5 hover:bg-slate-50">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------- Pieces ---------- */

function SideItem({ icon, label, active }) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
        active
          ? "bg-slate-100 text-slate-900"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <span className="text-slate-600">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
      <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
      <span className="h-2 w-2 rounded-full bg-[#34A853]" />
      <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
    </div>
  );
}

function Avatar({ initials }) {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sky-200 to-violet-200 text-[11px] font-semibold text-slate-700 ring-1 ring-black/10">
      {initials || "DT"}
    </div>
  );
}

function KpiCard({ title, value, badge }) {
  return (
    <div className="rounded-xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,.06)] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">{title}</p>
        {badge}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {/* optional sparkline placeholder */}
      <div className="mt-3 h-8 w-full rounded bg-slate-50" />
    </div>
  );
}

function RupeeBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
      <IndianRupee size={14} />
      Rs
    </span>
  );
}

function BtnSelect({ label }) {
  return (
    <button className="inline-flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 min-w-[120px]">
      <span>{label}</span>
      <ChevronDown size={16} className="text-slate-500" />
    </button>
  );
}

function Chip({ children, color = "blue", onClose }) {
  const colors = {
    blue: "bg-sky-50 text-sky-700",
    indigo: "bg-indigo-50 text-indigo-700",
  }[color];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        colors
      )}
    >
      <span>{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ms-1 text-slate-500 hover:text-slate-700"
        >
          ×
        </button>
      )}
    </span>
  );
}

function Th({ children, className = "" }) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-xs font-semibold uppercase tracking-wide",
        className
      )}
    >
      {children}
    </th>
  );
}

function Row({ row }) {
  return (
    <tr className="hover:bg-slate-50/60">
      <td className="p-4">
        <input type="checkbox" className="accent-[#3B82F6]" />
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-[13px]">{row.date}</div>
        <div className="text-[12px] text-slate-500">{row.time}</div>
      </td>

      <td className="px-4 py-4">
        <div className="font-medium">{row.name}</div>
        <div className="text-slate-500">{row.email}</div>
      </td>

      <td className="px-4 py-4 whitespace-nowrap">{row.phone}</td>

      <td className="px-4 py-4 font-mono text-[12px] text-slate-700">
        {row.paymentId}
      </td>

      <td className="px-4 py-4 font-mono text-[12px] text-slate-700">
        {row.orderId}
      </td>

      <td className="px-4 py-4">
        <MethodPill method={row.method} />
      </td>

      <td className="px-4 py-4 text-right font-medium">
        {currency(row.amount)}
      </td>

      <td className="px-4 py-4 text-right">
        <StatusChip status={row.status} />
      </td>

      <td className="p-4">
        <button className="rounded-md border border-slate-200 bg-white p-2 hover:bg-slate-50">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}

function MethodPill({ method }) {
  let icon = <Smartphone size={16} />;
  if (method === "Card") icon = <CreditCard size={16} />;
  if (method === "Netbanking") icon = <Banknote size={16} />;
  if (method === "Wallet") icon = <Wallet size={16} />;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
      {icon}
      {method}
    </span>
  );
}

function StatusChip({ status }) {
  const map = {
    Captured: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "text-emerald-600",
    },
    Authorized: { bg: "bg-sky-50", text: "text-sky-700", dot: "text-sky-600" },
    Failed: { bg: "bg-rose-50", text: "text-rose-700", dot: "text-rose-600" },
    Refunded: {
      bg: "bg-amber-50",
      text: "text-amber-800",
      dot: "text-amber-700",
    },
  }[status] || {
    bg: "bg-slate-100",
    text: "text-slate-700",
    dot: "text-slate-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs",
        map.bg,
        map.text
      )}
    >
      <Circle size={12} className={map.dot} fill="currentColor" />
      {status}
    </span>
  );
}

function UsersIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-slate-600"
    >
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 20a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
