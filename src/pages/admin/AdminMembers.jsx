import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Search, X } from "lucide-react";
import { PLAN_TYPES } from "@/lib/plansData";

const statusColors = {
  active: "bg-green-100 text-green-700",
  lapsed: "bg-red-100 text-red-700",
  cancelled: "bg-slate-100 text-slate-600",
};

export default function AdminMembers() {
  const { toast } = useToast();
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const load = async () => {
    const m = await base44.entities.Member.list(500);
    setMembers(m || []);
  };

  useEffect(() => { load(); }, []);

  const filtered = members.filter((m) => {
    const q = query.toLowerCase();
    const matchQ = !q || m.full_name?.toLowerCase().includes(q) || m.id_number?.includes(q) || m.policy_number?.toLowerCase().includes(q);
    const matchS = !statusFilter || m.status === statusFilter;
    return matchQ && matchS;
  });

  const openEdit = (m) => {
    setEditing(m);
    setEditForm(m);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await base44.entities.Member.update(editing.id, editForm);
      toast({ title: "Member updated" });
      setEditing(null);
      load();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Members</h1>
      <p className="text-slate-500 mt-1">Search, filter and edit member records.</p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            placeholder="Search name, ID or policy number"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="px-4 py-2.5 rounded-lg border border-slate-200" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="lapsed">Lapsed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mt-4 bg-white rounded-xl border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Name</th>
              <th className="text-left px-5 py-3 font-medium">Policy #</th>
              <th className="text-left px-5 py-3 font-medium">Plan</th>
              <th className="text-left px-5 py-3 font-medium">Cover</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <p className="font-medium text-[#001f3f]">{m.full_name}</p>
                  <p className="text-xs text-slate-400">{m.id_number}</p>
                </td>
                <td className="px-5 py-3 text-slate-600">{m.policy_number}</td>
                <td className="px-5 py-3 text-slate-600">{m.plan_type}</td>
                <td className="px-5 py-3 text-slate-600">R {m.cover_amount?.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[m.status] || statusColors.active}`}>{m.status}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => openEdit(m)} className="text-[#0077b6] font-semibold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-slate-500">No members found.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#001f3f]">Edit member</h3>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={save} className="space-y-3">
              <input required placeholder="Full name" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.full_name || ""} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} />
              <input placeholder="ID number" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.id_number || ""} onChange={(e) => setEditForm({ ...editForm, id_number: e.target.value })} />
              <input placeholder="Policy number" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.policy_number || ""} onChange={(e) => setEditForm({ ...editForm, policy_number: e.target.value })} />
              <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.plan_type || ""} onChange={(e) => setEditForm({ ...editForm, plan_type: e.target.value })}>
                {PLAN_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <input type="number" placeholder="Cover amount" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.cover_amount || ""} onChange={(e) => setEditForm({ ...editForm, cover_amount: Number(e.target.value) })} />
              <input type="number" placeholder="Premium amount" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.premium_amount || ""} onChange={(e) => setEditForm({ ...editForm, premium_amount: Number(e.target.value) })} />
              <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.policy_start_date || ""} onChange={(e) => setEditForm({ ...editForm, policy_start_date: e.target.value })} />
              <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.premium_paid_up_to || ""} onChange={(e) => setEditForm({ ...editForm, premium_paid_up_to: e.target.value })} />
              <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.status || "active"} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="lapsed">Lapsed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input placeholder="Email" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
              <input placeholder="Phone" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
              <textarea placeholder="Address" rows={2} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={editForm.address || ""} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
              <button className="w-full px-5 py-3 rounded-lg bg-[#0077b6] text-white font-semibold">Save changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}