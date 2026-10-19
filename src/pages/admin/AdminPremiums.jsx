import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export default function AdminPremiums() {
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      const [m, p] = await Promise.all([
        base44.entities.Member.list(500),
        base44.entities.Payment.list(500),
      ]);
      setMembers(m || []);
      setPayments(p || []);
    })();
  }, []);

  const paidFor = (memberId) => {
    const memberPayments = payments.filter((p) => p.member_id === memberId);
    return memberPayments.reduce((s, p) => s + (p.amount || 0), 0);
  };

  const today = new Date();
  const isLapsed = (m) => {
    if (m.status === "lapsed" || m.status === "cancelled") return true;
    if (!m.premium_paid_up_to) return true;
    return new Date(m.premium_paid_up_to) < today;
  };

  const active = members.filter((m) => !isLapsed(m));
  const lapsed = members.filter((m) => isLapsed(m));

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Premium reconciliation</h1>
      <p className="text-slate-500 mt-1">See who is paid up versus lapsed.</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Paid up</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{active.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Lapsed / outstanding</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{lapsed.length}</p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Member</th>
              <th className="text-left px-5 py-3 font-medium">Policy #</th>
              <th className="text-left px-5 py-3 font-medium">Premium</th>
              <th className="text-left px-5 py-3 font-medium">Paid up to</th>
              <th className="text-left px-5 py-3 font-medium">Total paid</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-[#001f3f]">{m.full_name}</td>
                <td className="px-5 py-3 text-slate-600">{m.policy_number}</td>
                <td className="px-5 py-3 text-slate-600">R {m.premium_amount}</td>
                <td className="px-5 py-3 text-slate-600">{m.premium_paid_up_to || "—"}</td>
                <td className="px-5 py-3 text-slate-600">R {paidFor(m.id).toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${isLapsed(m) ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {isLapsed(m) ? "Lapsed" : "Paid up"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {members.length === 0 && <p className="p-8 text-center text-slate-500">No members.</p>}
      </div>
    </div>
  );
}