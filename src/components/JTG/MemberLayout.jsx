import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  LayoutDashboard,
  FileText,
  Users,
  ClipboardCheck,
  ListChecks,
  Wallet,
  UserCog,
  LogOut,
  Menu,
  X,
  Building2,
} from "lucide-react";

const LOGO = "https://media.base44.com/images/public/6aad9a9d1bff6a57f97c0775/aca533eb1_jtg-logo.png";

const baseNav = [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/portal/policy", label: "My Policy", icon: FileText },
  { to: "/portal/beneficiaries", label: "Beneficiaries", icon: Users },
  { to: "/portal/submit-claim", label: "Submit a Claim", icon: ClipboardCheck },
  { to: "/portal/claims", label: "Claim Status", icon: ListChecks },
  { to: "/portal/payments", label: "Payment History", icon: Wallet },
  { to: "/portal/profile", label: "Profile", icon: UserCog },
];

export default function MemberLayout() {
  const [user, setUser] = useState(null);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (!me) {
          navigate("/login");
          return;
        }
        if (me.role === "admin") {
          navigate("/admin");
          return;
        }
        if (!me.member_id) {
          navigate("/portal/link");
          return;
        }
        const m = await base44.entities.Member.get(me.member_id);
        setMember(m);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  // Require members to complete their profile (phone, email, address) before using the portal.
  useEffect(() => {
    if (
      !loading &&
      member &&
      (!member.phone || !member.email || !member.address) &&
      location.pathname !== "/portal/profile"
    ) {
      navigate("/portal/profile", { replace: true });
    }
  }, [member, location.pathname, loading, navigate]);

  const logout = async () => {
    await base44.auth.logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0077b6] rounded-full animate-spin" />
      </div>
    );
  }

  const nav =
    member?.scheme_type === "Group"
      ? [
          ...baseNav.slice(0, 2),
          { to: "/portal/scheme-members", label: "Scheme Members", icon: Building2 },
          ...baseNav.slice(2),
        ]
      : baseNav;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#001f3f] text-white flex-col transition-transform ${
          sidebarOpen ? "translate-x-0 flex" : "-translate-x-full hidden lg:flex"
        }`}
      >
        <div className="p-5 flex items-center gap-3 border-b border-white/10">
          <img src={LOGO} alt="JTG" className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <p className="text-sm font-bold">Justice The Great</p>
            <p className="text-[10px] tracking-[0.15em] text-slate-400">MEMBER PORTAL</p>
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

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 h-16 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-[#001f3f]" />
          </button>
          <span className="font-bold text-[#001f3f]">Member Portal</span>
          <button onClick={logout}>
            <LogOut className="w-5 h-5 text-[#001f3f]" />
          </button>
        </div>
        <main className="p-4 sm:p-8 max-w-5xl mx-auto">
          <Outlet context={{ user, member, setMember }} />
        </main>
      </div>
    </div>
  );
}