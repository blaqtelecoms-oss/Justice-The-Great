import React, { useOutletContext } from "react";
import { Download } from "lucide-react";

export default function MyPolicy() {
  const { member } = useOutletContext();
  if (!member) return null;

  const rows = [
    ["Policy number", member.policy_number],
    ["Plan type", member.plan_type],
    ["Cover amount", `R ${member.cover_amount?.toLocaleString()}`],
    ["Monthly premium", `R ${member.premium_amount}`],
    ["Policy start date", member.policy_start_date],
    ["Premium paid up to", member.premium_paid_up_to || "—"],
    ["Status", member.status],
    ["ID number", member.id_number],
    ["Email", member.email],
    ["Phone", member.phone],
    ["Address", member.address],
  ];

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#001f3f]">My policy</h1>
          <p className="text-slate-500 mt-1">Your full policy details.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0077b6] text-white font-semibold hover:bg-[#0069a5]"
        >
          <Download className="w-4 h-4" />
          Download certificate
        </button>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="p-5 bg-[#001f3f] text-white">
          <p className="text-sm text-white/70">Policy certificate</p>
          <p className="text-lg font-bold">{member.full_name}</p>
          <p className="text-sm text-white/80">{member.policy_number} · {member.plan_type} plan</p>
        </div>
        <dl className="divide-y divide-slate-100">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between px-5 py-3">
              <dt className="text-sm text-slate-500">{label}</dt>
              <dd className="text-sm font-medium text-[#001f3f] text-right">{value || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}