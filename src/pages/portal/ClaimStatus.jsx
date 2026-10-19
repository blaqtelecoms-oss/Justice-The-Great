import React, { useEffect, useState, useOutletContext } from "react";
import { base44 } from "@/api/base44Client";

const statusColors = {
  Submitted: "bg-blue-100 text-blue-700",
  "Under Review": "bg-amber-100 text-amber-700",
  Approved: "bg-green-100 text-green-700",
  Paid: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function ClaimStatus() {
  const { member } = useOutletContext();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    if (!member) return;
    base44.entities.Claim.filter({ member_id: member.id }, "-created_date").then((c) => setClaims(c || []));
  }, [member]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Claim status</h1>
      <p className="text-slate-500 mt-1">Track the status of your submitted claims.</p>

      {claims.length === 0 ? (
        <div className="mt-6 bg-white p-8 rounded-xl border border-slate-100 text-center">
          <p className="text-slate-500">No claims submitted yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {claims.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-100">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="font-bold text-[#001f3f]">{c.claim_reference}</p>
                  <p className="text-sm text-slate-500">Submitted {c.date_submitted}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[c.status] || statusColors.Submitted}`}>
                  {c.status}
                </span>
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
                <p><span className="text-slate-500">Deceased: </span><span className="text-[#001f3f]">{c.deceased_name}</span></p>
                <p><span className="text-slate-500">Claimant: </span><span className="text-[#001f3f]">{c.claimant_name}</span></p>
                <p><span className="text-slate-500">Cause: </span><span className="text-[#001f3f]">{c.cause_type}</span></p>
                <p><span className="text-slate-500">Documents: </span><span className="text-[#001f3f]">{(c.documents || []).length} uploaded</span></p>
              </div>
              {c.admin_notes && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                  <p className="font-semibold text-[#001f3f]">Notes from our team:</p>
                  <p className="mt-1">{c.admin_notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}