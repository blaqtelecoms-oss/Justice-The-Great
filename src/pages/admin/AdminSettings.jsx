import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (next !== confirm) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await base44.functions.invoke("changeAdminPassword", {
        current_password: current,
        new_password: next,
      });
      toast({
        title: "Password updated",
        description: "Use the new password next time you access the admin portal.",
      });
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      toast({
        title: "Could not update password",
        description: err?.response?.data?.error || err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Admin settings</h1>
      <p className="text-slate-500 mt-1">Change the admin portal password.</p>

      <form
        onSubmit={submit}
        className="mt-6 bg-white p-6 rounded-xl border border-slate-100 space-y-4 max-w-md"
      >
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Current password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">New password</label>
          <input
            type="password"
            required
            minLength={6}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Confirm new password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <button
          disabled={loading}
          className="px-5 py-3 rounded-lg bg-[#0077b6] text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update password"}
        </button>
      </form>
    </div>
  );
}