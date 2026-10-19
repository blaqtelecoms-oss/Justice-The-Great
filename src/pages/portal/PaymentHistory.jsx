import React, { useEffect, useState, useOutletContext } from "react";
import { base44 } from "@/api/base44Client";

export default function PaymentHistory() {
  const { member } = useOutletContext();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!member) return;
    base44.entities.Payment.filter({ member_id: member.id }, "-date").then((p) => setPayments(p || []));
  }, [member]);

  const total = payments.reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Payment history</h1>
      <p className="text-slate-500 mt-1">Your premium payments and status.</p>

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Total paid</p>
          <p className="text-xl font-bold text-[#001f3f] mt-1">R {total.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Premium</p>
          <p className="text-xl font-bold text-[#001f3f] mt-1">R {member?.premium_amount}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Paid up to</p>
          <p className="text-xl font-bold text-[#001f3f] mt-1">{member?.premium_paid_up_to || "—"}</p>
        </div>
      </div>

      {member?.status === "lapsed" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700 font-medium">Your policy is lapsed. Please contact us to reinstate your cover.</p>
        </div>
      )}

      <div className="mt-6 bg-white rounded-xl border border-slate-100 overflow-hidden">
        {payments.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No payments recorded.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Method</th>
                <th className="text-left px-5 py-3 font-medium">Reference</th>
                <th className="text-right px-5 py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-3 text-slate-600">{p.date}</td>
                  <td className="px-5 py-3 text-slate-600">{p.method || "—"}</td>
                  <td className="px-5 py-3 text-slate-600">{p.reference || "—"}</td>
                  <td className="px-5 py-3 text-right font-medium text-[#001f3f]">R {p.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}