import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Link2 } from "lucide-react";

export default function LinkPolicy() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await base44.functions.invoke("linkPolicy", { policy_number: policyNumber, id_number: idNumber });
      toast({ title: "Policy linked", description: "Welcome to your member portal." });
      navigate("/portal");
      window.location.reload();
    } catch (err) {
      const msg = err?.response?.data?.error || err.message;
      toast({ title: "Could not link policy", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <div className="w-12 h-12 rounded-lg bg-[#0077b6] text-white flex items-center justify-center mb-5">
          <Link2 className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#001f3f]">Link your policy</h1>
        <p className="mt-2 text-slate-600 text-sm">
          Enter your policy number and ID number to connect your account to your funeral policy.
          If you don't have a policy yet, contact us to join.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            required
            placeholder="Policy number"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
          />
          <input
            required
            placeholder="ID number"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
          <button disabled={loading} className="w-full px-5 py-3 rounded-lg bg-[#0077b6] text-white font-semibold disabled:opacity-50">
            {loading ? "Linking..." : "Link policy"}
          </button>
        </form>
        <Link to="/contact" className="mt-4 block text-center text-sm text-[#0077b6] font-semibold">
          Don't have a policy? Contact us
        </Link>
      </div>
    </div>
  );
}