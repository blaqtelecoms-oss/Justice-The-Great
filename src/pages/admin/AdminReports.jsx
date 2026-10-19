import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  Users,
  TrendingUp,
  ClipboardList,
  Wallet,
  UserPlus,
  FileCheck2,
  ArrowRight,
  Loader2,
  LayoutGrid,
} from "lucide-react";

export default function AdminReports() {
  const [stats, setStats] = useState({
    members: 0,
    activeMembers: 0,
    claimsThisMonth: 0,
    premiumCollected: 0,
  });
  const [pendingApps, setPendingApps] = useState(0);
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [members, claims, payments, appsRes] = await Promise.all([
          base44.entities.Member.list(500),
          base44.entities.Claim.list(500),
          base44.entities.Payment.list(500),
          base44.entities.MembershipApplication.filter(
            { status: "Pending" },
            { sort: "-created_date", limit: 5 }
          ),
        ]);

        const now = new Date();
        const claimsThisMonth = (claims || []).filter((c) => {
          const d = new Date(c.date_submitted || c.created_date);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length;

        const premiumCollected = (payments || []).reduce((s, p) => s + (p.amount || 0), 0);

        setStats({
          members: members?.length || 0,
          activeMembers: (members || []).filter((m) => m.status === "active").length,
          claimsThisMonth,
          premiumCollected,
        });

        const apps = appsRes?.items || [];
        setPendingApps(apps.length);
        setRecentApps(apps);
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards = [
    {
      index: "01",
      label: "Total members",
      value: stats.members,
      icon: Users,
      to: "/admin/members",
    },
    {
      index: "02",
      label: "Active members",
      value: stats.activeMembers,
      icon: TrendingUp,
      to: "/admin/members",
    },
    {
      index: "03",
      label: "Claims this month",
      value: stats.claimsThisMonth,
      icon: ClipboardList,
      to: "/admin/claims",
    },
    {
      index: "04",
      label: "Premium collected",
      value: `R ${stats.premiumCollected.toLocaleString()}`,
      icon: Wallet,
      to: "/admin/premiums",
    },
  ];

  return (
    <div className="relative -m-4 sm:-m-8 bg-[#eef2f6] min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-0px)] border-x border-b border-[#d7e0e8] overflow-hidden rounded-b-xl">
      {/* Thin blue status rail */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#47739e] origin-left jtg-admin-rail"
        aria-hidden="true"
      />

      <div className="px-6 sm:px-8 lg:px-14 pt-10 pb-16">
        {/* Heading */}
        <header className="flex items-start justify-between gap-6 jtg-admin-arrive jtg-admin-arrive--1">
          <div>
            <h1 className="text-[1.85rem] leading-[1.15] tracking-[-0.7px] font-bold text-[#102844]">
              Dashboard
            </h1>
            <p className="mt-2 text-[0.875rem] leading-[1.5] text-[#64778b]">
              Overview of your book of business.
            </p>
          </div>
          <div className="hidden sm:grid place-items-center w-[46px] h-[46px] rounded-[13px] border border-[#d3dee8] bg-white text-[#47739e] shadow-[0_4px_12px_rgba(16,40,68,0.04)]">
            <LayoutGrid className="w-[22px] h-[22px]" strokeWidth={1.8} />
          </div>
        </header>

        {/* Pending applications hero panel */}
        <Link
          to="/admin/applications"
          className="group relative isolate overflow-hidden rounded-[18px] min-h-[178px] p-7 sm:p-8 flex items-center text-white bg-[#102844] border border-[#284663] shadow-[0_12px_28px_rgba(16,40,68,0.11)] mt-7 jtg-admin-arrive jtg-admin-arrive--2"
        >
          <div className="absolute inset-0 -z-10">
            <img
              src="https://media.base44.com/images/public/6aad9a9d1bff6a57f97c0775/d4f090519_generated_bdcacc2a.jpg"
              alt=""
              className="w-full h-full object-cover opacity-[0.58]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#102844]/95 via-[#102844]/85 to-[#102844]/40" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full flex-wrap">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-[54px] h-[54px] shrink-0 grid place-items-center rounded-[15px] border border-white/20 bg-white/10 text-[#e8f1fa] backdrop-blur-sm">
                <UserPlus className="w-[25px] h-[25px]" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[0.8125rem] text-[#d3e1ef] font-medium leading-[1.45]">
                  Pending membership applications
                </div>
                <div className="text-[2.1rem] font-bold leading-[1.1] tracking-[-0.7px] mt-1.5 tabular-nums">
                  {loading ? (
                    <Loader2 className="w-7 h-7 animate-spin inline" />
                  ) : (
                    pendingApps
                  )}
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 px-3.5 py-2.5 border border-white/20 bg-white/10 rounded-[10px] text-[#edf5fb] text-[0.8125rem] font-semibold whitespace-nowrap backdrop-blur-sm transition-all duration-200 group-hover:bg-white/20 group-hover:text-white group-hover:shadow-[0_5px_16px_rgba(6,27,46,0.19)]">
              Review queue
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[3px]"
                strokeWidth={1.8}
              />
            </span>
          </div>
        </Link>

        {/* Metrics */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {cards.map((c, i) => (
            <Link
              key={c.label}
              to={c.to}
              className={`block min-h-[173px] p-5 rounded-[14px] bg-white border border-[#d8e1e9] shadow-[0_3px_10px_rgba(16,40,68,0.03)] no-underline text-inherit transition-all duration-200 hover:border-[#9bb3c9] hover:shadow-[0_8px_20px_rgba(16,40,68,0.07)] hover:bg-[#fcfdff] active:bg-[#f4f8fb] focus-visible:outline-[3px] focus-visible:outline-[#79a6ce] focus-visible:outline-offset-[3px] jtg-admin-arrive jtg-admin-arrive--${i + 3}`}
            >
              <div className="flex items-center justify-between">
                <span className="w-[39px] h-[39px] rounded-[11px] grid place-items-center bg-[#edf3f8] text-[#47739e] border border-[#e1eaf1]">
                  <c.icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <span className="text-[0.625rem] tracking-[0.12em] font-bold text-[#98a8b7]">
                  {c.index}
                </span>
              </div>
              <p className="text-xs leading-[1.4] text-[#6a7c8e] font-semibold mt-4">
                {c.label}
              </p>
              <p className="text-[1.6rem] leading-[1.2] text-[#102844] font-bold tracking-[-0.4px] mt-1.5 tabular-nums">
                {c.value}
              </p>
            </Link>
          ))}
        </section>

        {/* Recent applications work area */}
        <section className="mt-9 jtg-admin-arrive jtg-admin-arrive--7">
          <div className="flex items-center justify-between gap-5 mb-3.5">
            <h2 className="flex items-center gap-2.5 m-0 text-[#102844] text-[1.05rem] leading-[1.35] font-bold tracking-[-0.2px]">
              <FileCheck2 className="w-5 h-5 text-[#47739e]" strokeWidth={1.8} />
              Recent applications
            </h2>
            <Link
              to="/admin/applications"
              className="text-[#47739e] no-underline text-[0.8125rem] font-semibold px-0.5 py-1.5 transition-all duration-200 hover:text-[#102844] hover:underline active:opacity-70 focus-visible:outline-[3px] focus-visible:outline-[#79a6ce] focus-visible:outline-offset-[3px]"
            >
              View all
            </Link>
          </div>

          <div className="bg-white border border-[#d8e1e9] rounded-[14px] min-h-[232px] flex items-center justify-center shadow-[0_4px_14px_rgba(16,40,68,0.03)] divide-y divide-[#eef1f5]">
            {loading ? (
              <div className="flex items-center justify-center py-12 text-[#8393a2]">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : recentApps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-[#8393a2] gap-2.5">
                <FileCheck2 className="w-8 h-8 text-[#9aacbc]" strokeWidth={1.7} />
                <p className="text-[0.8125rem] leading-[1.5]">No pending applications.</p>
              </div>
            ) : (
              recentApps.map((a) => (
                <Link
                  key={a.id}
                  to="/admin/applications"
                  className="flex items-center justify-between gap-4 px-5 py-3.5 w-full hover:bg-[#f6f9fb] transition-colors no-underline text-inherit focus-visible:outline-[3px] focus-visible:outline-[#79a6ce] focus-visible:outline-offset-[3px]"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-[#102844] truncate">{a.full_name}</p>
                    <p className="text-xs text-[#6a7c8e] truncate mt-0.5">
                      {a.plan_type} · {a.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-[#98a8b7] tabular-nums">
                      {new Date(a.created_date).toLocaleDateString()}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fdf3e3] text-[#9a6b1a] border border-[#f0d9a8]">
                      Pending
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}