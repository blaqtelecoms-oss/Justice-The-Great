import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ClipboardCheck, Users, Wallet, FileText, ArrowRight } from "lucide-react";

const statusColors = {
  active: "bg-green-100 text-green-700",
  lapsed: "bg-red-100 text-red-700",
  cancelled: "bg-slate-100 text-slate-600",
};

export default function MemberDashboard() {
  const { member, user } = useOutletContext();
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!member) return;
    (async () => {
      const [c, p] = await Promise.all([
        base44.entities.Claim.filter({ member_id: member.id }),
        base44.entities.Payment.filter({ member_id: member.id }),
      ]);
      setClaims(c || []);
      setPayments(p || []);
    })();
  }, [member]);

  if (!member) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Welcome, {member.full_name?.split(" ")[0]}</h1>
      <p className="text-slate-500 mt-1">Here's an overview of your policy.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Policy status</p>
          <span className={`mt-2 inline-block px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[member.status] || statusColors.active}`}>
            {member.status}
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Cover amount</p>
          <p className="text-xl font-bold text-[#001f3f] mt-1">R {member.cover_amount?.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Monthly premium</p>
          <p className="text-xl font-bold text-[#001f3f] mt-1">R {member.premium_amount}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Paid up to</p>
          <p className="text-xl font-bold text-[#001f3f] mt-1">{member.premium_paid_up_to || "—"}</p>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <button onClick={() => navigate("/portal/submit-claim")} className="flex items-center gap-4 bg-[#0077b6] text-white p-5 rounded-xl hover:bg-[#0069a5] text-left">
          <ClipboardCheck className="w-8 h-8" />
          <div>
            <p className="font-bold">Submit a claim</p>
            <p className="text-sm text-white/80">Report a loss and upload documents</p>
          </div>
          <ArrowRight className="w-5 h-5 ml-auto" />
        </button>
        <button onClick={() => navigate("/portal/beneficiaries")} className="flex items-center gap-4 bg-white border border-slate-100 text-[#001f3f] p-5 rounded-xl hover:bg-slate-50 text-left">
          <Users className="w-8 h-8" />
          <div>
            <p className="font-bold">Update beneficiaries</p>
            <p className="text-sm text-slate-500">Request a change for admin approval</p>
          </div>
          <ArrowRight className="w-5 h-5 ml-auto" />
        </button>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-[#0077b6]" />
            <p className="font-bold text-[#001f3f]">Recent claims</p>
          </div>
          {claims.length === 0 ? (
            <p className="text-sm text-slate-500">No claims submitted.</p>
          ) : (
            <ul className="space-y-2">
              {claims.slice(0, 3).map((c) => (
                <li key={c.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{c.claim_reference}</span>
                  <span className="font-medium text-[#001f3f]">{c.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-5 h-5 text-[#0077b6]" />
            <p className="font-bold text-[#001f3f]">Recent payments</p>
          </div>
          {payments.length === 0 ? (
            <p className="text-sm text-slate-500">No payments recorded.</p>
          ) : (
            <ul className="space-y-2">
              {payments.slice(0, 3).map((p) => (
                <li key={p.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{p.date}</span>
                  <span className="font-medium text-[#001f3f]">R {p.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}