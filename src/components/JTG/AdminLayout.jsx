import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { BarChart3, Users, ClipboardList, UserCheck, Wallet, LogOut, Menu, Settings, FileText, HelpCircle, Quote, HeartHandshake, Type, UserPlus } from "lucide-react";
import AdminGate from "@/components/JTG/AdminGate";

const LOGO = "https://media.base44.com/images/public/6aad9a9d1bff6a57f97c0775/aca533eb1_jtg-logo.png";

const nav = [
  { to: "/admin", label: "Dashboard", icon: BarChart3, end: true },
  { to: "/admin/applications", label: "Applications", icon: UserPlus },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/claims", label: "Claims queue", icon: ClipboardList },
  { to: "/admin/beneficiary-requests", label: "Beneficiary requests", icon: UserCheck },
  { to: "/admin/premiums", label: "Premium reconciliation", icon: Wallet },
  { to: "/admin/plans", label: "Funeral Plans", icon: FileText },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { to: "/admin/partners", label: "Partners", icon: HeartHandshake },
  { to: "/admin/section-copy", label: "Section Copy", icon: Type },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("jtg_admin_unlocked") === "1");
  const [loading, setLoading] = useState(unlocked);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Show the admin password gate first; only verify the signed-in admin
  // account after the gate is unlocked, so non-admins landing on /admin
  // see the gate instead of being bounced to the member portal.
  useEffect(() => {
    if (!unlocked) return;
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (!me || me.role !== "admin") {
          navigate("/login");
          return;
        }
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate, unlocked]);

  const logout = async () => {
    sessionStorage.removeItem("jtg_admin_unlocked");
    await base44.auth.logout();
    navigate("/");
  };

  if (!unlocked) {
    return <AdminGate onUnlock={() => setUnlocked(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0077b6] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#001f3f] text-white flex-col transition-transform ${
          sidebarOpen ? "translate-x-0 flex" : "-translate-x-full hidden lg:flex"
        }`}
      >
        <div className="p-5 flex items-center gap-3 border-b border-white/10">
          <img src={LOGO} alt="JTG" className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <p className="text-sm font-bold">Justice The Great</p>
            <p className="text-[10px] tracking-[0.15em] text-slate-400">ADMIN PORTAL</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? "bg-[#0077b6] text-white" : "text-slate-300 hover:bg-white/5"
                }`
              }
            >
              <n.icon className="w-5 h-5" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 w-full">
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 h-16 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-[#001f3f]" />
          </button>
          <span className="font-bold text-[#001f3f]">Admin Portal</span>
          <button onClick={logout}>
            <LogOut className="w-5 h-5 text-[#001f3f]" />
          </button>
        </div>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}