import React, { useState, useOutletContext } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function MemberProfile() {
  const { user, member, setMember } = useOutletContext();
  const { toast } = useToast();
  const [form, setForm] = useState({
    phone: member?.phone || "",
    email: member?.email || "",
    address: member?.address || "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.entities.Member.update(member.id, form);
      setMember({ ...member, ...form });
      toast({ title: "Profile updated", description: "Your contact details have been saved." });
    } catch (err) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Profile</h1>
      <p className="text-slate-500 mt-1">Update your contact details.</p>

      <form onSubmit={submit} className="mt-6 bg-white p-6 rounded-xl border border-slate-100 space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Full name</label>
          <input disabled value={member?.full_name || ""} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
          <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Phone</label>
          <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Address</label>
          <textarea rows={3} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <button disabled={loading} className="px-5 py-3 rounded-lg bg-[#0077b6] text-white font-semibold disabled:opacity-50">
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}