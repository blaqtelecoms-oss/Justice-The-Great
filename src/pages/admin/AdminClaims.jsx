import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { X, FileText } from "lucide-react";

const statuses = ["Submitted", "Under Review", "Approved", "Paid", "Rejected"];

const statusColors = {
  Submitted: "bg-blue-100 text-blue-700",
  "Under Review": "bg-amber-100 text-amber-700",
  Approved: "bg-green-100 text-green-700",
  Paid: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function AdminClaims() {
  const { toast } = useToast();
  const [claims, setClaims] = useState([]);
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(null);
  const [notes, setNotes] = useState("");

  const load = async () => {
    const [c, m] = await Promise.all([
      base44.entities.Claim.list(500),
      base44.entities.Member.list(500),
    ]);
    setClaims(c || []);
    setMembers(m || []);
  };

  useEffect(() => { load(); }, []);

  const memberName = (id) => members.find((m) => m.id === id)?.full_name || "Unknown";

  const openClaim = (c) => {
    setOpen(c);
    setNotes(c.admin_notes || "");
  };

  const updateStatus = async (status) => {
    try {
      await base44.entities.Claim.update(open.id, { status, admin_notes: notes });
      toast({ title: `Claim marked ${status}` });
      setOpen(null);
      load();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Claims queue</h1>
      <p className="text-slate-500 mt-1">Review claims, view documents and update status.</p>

      <div className="mt-6 space-y-3">
        {claims.length === 0 && <p className="text-slate-500">No claims submitted.</p>}
        {claims.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-100 flex justify-between items-center flex-wrap gap-3">
            <div>
              <p className="font-bold text-[#001f3f]">{c.claim_reference}</p>
              <p className="text-sm text-slate-500">{memberName(c.member_id)} · {c.deceased_name} · {c.date_submitted}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[c.status]}`}>{c.status}</span>
              <button onClick={() => openClaim(c)} className="text-[#0077b6] font-semibold">Open</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#001f3f]">{open.claim_reference}</h3>
              <button onClick={() => setOpen(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-slate-500">Member: </span>{memberName(open.member_id)}</p>
              <p><span className="text-slate-500">Claimant: </span>{open.claimant_name}</p>
              <p><span className="text-slate-500">Deceased: </span>{open.deceased_name}</p>
              <p><span className="text-slate-500">Cause: </span>{open.cause_type}</p>
              <p><span className="text-slate-500">Submitted: </span>{open.date_submitted}</p>
              <p><span className="text-slate-500">Status: </span><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColors[open.status]}`}>{open.status}</span></p>
            </div>

            {(open.documents || []).length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-[#001f3f] mb-2">Documents</p>
                <div className="space-y-2">
                  {open.documents.map((d, i) => (
                    <a key={i} href={d} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#0077b6] hover:underline">
                      <FileText className="w-4 h-4" /> Document {i + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="block text-sm font-medium text-[#001f3f] mb-1">Admin notes</label>
              <textarea rows={3} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {statuses.map((s) => (
                <button key={s} onClick={() => updateStatus(s)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-[#001f3f] hover:bg-slate-50">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}