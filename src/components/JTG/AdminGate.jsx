import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Lock, Loader2 } from "lucide-react";

export default function AdminGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await base44.functions.invoke("verifyAdminPassword", { password });
      if (res.data?.valid) {
        sessionStorage.setItem("jtg_admin_unlocked", "1");
        onUnlock();
      } else {
        setError("Incorrect admin password");
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Could not verify password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <div className="w-12 h-12 rounded-lg bg-[#001f3f] text-white flex items-center justify-center mb-5">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#001f3f]">Admin access</h1>
        <p className="mt-2 text-slate-600 text-sm">Enter the admin password to continue.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="password"
            required
            autoFocus
            placeholder="Admin password"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            disabled={loading}
            className="w-full px-5 py-3 rounded-lg bg-[#0077b6] text-white font-semibold disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Unlock"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}