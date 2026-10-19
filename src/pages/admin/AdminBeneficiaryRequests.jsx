import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";

export default function AdminBeneficiaryRequests() {
  const { toast } = useToast();
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);

  const load = async () => {
    const [r, m] = await Promise.all([
      base44.entities.BeneficiaryChangeRequest.list(500),
      base44.entities.Member.list(500),
    ]);
    setRequests(r || []);
    setMembers(m || []);
  };

  useEffect(() => { load(); }, []);

  const memberName = (id) => members.find((m) => m.id === id)?.full_name || "Unknown";

  const resolve = async (req, status) => {
    try {
      await base44.entities.BeneficiaryChangeRequest.update(req.id, { status });
      toast({ title: `Request ${status.toLowerCase()}` });
      load();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const parse = (s) => {
    try { return JSON.parse(s); } catch { return {}; }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Beneficiary change requests</h1>
      <p className="text-slate-500 mt-1">Approve or reject member requests with an audit trail.</p>

      <div className="mt-6 space-y-3">
        {requests.length === 0 && <p className="text-slate-500">No change requests.</p>}
        {requests.map((r) => {
          const data = parse(r.requested_beneficiaries);
          return (
            <div key={r.id} className="bg-white p-5 rounded-xl border border-slate-100">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="font-bold text-[#001f3f]">{memberName(r.member_id)}</p>
                  <p className="text-xs text-slate-500">Requested {new Date(r.created_date).toLocaleString()}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  r.status === "Pending" ? "bg-amber-100 text-amber-700" :
                  r.status === "Approved" ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"
                }`}>{r.status}</span>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                <p><span className="text-slate-400">Name: </span>{data.full_name || "—"}</p>
                <p><span className="text-slate-400">ID: </span>{data.id_number || "—"}</p>
                <p><span className="text-slate-400">Relationship: </span>{data.relationship || "—"}</p>
                <p><span className="text-slate-400">Allocation: </span>{data.allocation_pct || "—"}%</p>
              </div>
              {r.status === "Pending" && (
                <div className="mt-4 flex gap-2">
                  <button onClick={() => resolve(r, "Approved")} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700">
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => resolve(r, "Rejected")} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}