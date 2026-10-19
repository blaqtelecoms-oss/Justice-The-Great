import React, { useEffect, useState, useOutletContext } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Users, Baby, Send } from "lucide-react";

export default function Beneficiaries() {
  const { member } = useOutletContext();
  const { toast } = useToast();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [dependents, setDependents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ full_name: "", id_number: "", relationship: "", allocation_pct: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!member) return;
    const [b, d, r] = await Promise.all([
      base44.entities.Beneficiary.filter({ member_id: member.id }),
      base44.entities.Dependent.filter({ member_id: member.id }),
      base44.entities.BeneficiaryChangeRequest.filter({ member_id: member.id }),
    ]);
    setBeneficiaries(b || []);
    setDependents(d || []);
    setRequests(r || []);
  };

  useEffect(() => { load(); }, [member]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.entities.BeneficiaryChangeRequest.create({
        member_id: member.id,
        requested_beneficiaries: JSON.stringify(form),
      });
      toast({ title: "Change request submitted", description: "Our team will review and approve your request." });
      setShowForm(false);
      setForm({ full_name: "", id_number: "", relationship: "", allocation_pct: "" });
      load();
    } catch (err) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!member) return null;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#001f3f]">Beneficiaries & dependents</h1>
          <p className="text-slate-500 mt-1">View your beneficiaries and request changes.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2.5 rounded-lg bg-[#0077b6] text-white font-semibold hover:bg-[#0069a5]">
          Request a change
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="mt-4 bg-white p-5 rounded-xl border border-slate-100 space-y-3">
          <p className="text-sm text-slate-500">Submit a new or updated beneficiary. Changes go to our admin team for approval — your existing beneficiaries stay in place until approved.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <input required placeholder="Full name" className="px-4 py-2.5 rounded-lg border border-slate-200" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
            <input placeholder="ID number" className="px-4 py-2.5 rounded-lg border border-slate-200" value={form.id_number} onChange={(e) => setForm({ ...form, id_number: e.target.value })} />
            <input placeholder="Relationship" className="px-4 py-2.5 rounded-lg border border-slate-200" value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} />
            <input type="number" placeholder="Allocation %" className="px-4 py-2.5 rounded-lg border border-slate-200" value={form.allocation_pct} onChange={(e) => setForm({ ...form, allocation_pct: e.target.value })} />
          </div>
          <button disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0077b6] text-white font-semibold disabled:opacity-50">
            <Send className="w-4 h-4" /> {loading ? "Submitting..." : "Submit request"}
          </button>
        </form>
      )}

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#0077b6]" />
            <p className="font-bold text-[#001f3f]">Beneficiaries</p>
          </div>
          {beneficiaries.length === 0 ? (
            <p className="text-sm text-slate-500">No beneficiaries on record.</p>
          ) : (
            <ul className="space-y-3">
              {beneficiaries.map((b) => (
                <li key={b.id} className="flex justify-between">
                  <div>
                    <p className="font-medium text-[#001f3f]">{b.full_name}</p>
                    <p className="text-xs text-slate-500">{b.relationship} · {b.id_number || "No ID"}</p>
                  </div>
                  <span className="text-sm font-medium text-[#0077b6]">{b.allocation_pct}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Baby className="w-5 h-5 text-[#0077b6]" />
            <p className="font-bold text-[#001f3f]">Dependents</p>
          </div>
          {dependents.length === 0 ? (
            <p className="text-sm text-slate-500">No dependents on record.</p>
          ) : (
            <ul className="space-y-3">
              {dependents.map((d) => (
                <li key={d.id}>
                  <p className="font-medium text-[#001f3f]">{d.full_name}</p>
                  <p className="text-xs text-slate-500">{d.relationship} · DOB {d.date_of_birth || "—"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 bg-white p-5 rounded-xl border border-slate-100">
        <p className="font-bold text-[#001f3f] mb-3">Change requests</p>
        {requests.length === 0 ? (
          <p className="text-sm text-slate-500">No change requests.</p>
        ) : (
          <ul className="space-y-2">
            {requests.map((r) => (
              <li key={r.id} className="flex justify-between text-sm">
                <span className="text-slate-600">{new Date(r.created_date).toLocaleDateString()}</span>
                <span className="font-medium text-[#001f3f]">{r.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}