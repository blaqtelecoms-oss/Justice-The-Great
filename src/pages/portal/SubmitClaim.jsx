import React, { useState, useOutletContext } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X, CheckCircle } from "lucide-react";

export default function SubmitClaim() {
  const { member } = useOutletContext();
  const { toast } = useToast();
  const [form, setForm] = useState({ claimant_name: "", deceased_name: "", cause_type: "Natural" });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState(null);

  const onFiles = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const submit = async (e) => {
    e.preventDefault();
    if (!member) return;
    setLoading(true);
    setUploading(true);
    try {
      const docs = [];
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
        docs.push(file_url);
      }
      setUploading(false);

      const claimRef = "CLM-" + Date.now().toString(36).toUpperCase();
      await base44.entities.Claim.create({
        member_id: member.id,
        user_id: member.user_id,
        claim_reference: claimRef,
        date_submitted: new Date().toISOString().slice(0, 10),
        claimant_name: form.claimant_name,
        deceased_name: form.deceased_name,
        cause_type: form.cause_type,
        status: "Submitted",
        documents: docs,
      });
      setReference(claimRef);
      toast({ title: "Claim submitted", description: `Reference ${claimRef}` });
    } catch (err) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (reference) {
    return (
      <div className="max-w-md mx-auto text-center bg-white p-8 rounded-xl border border-slate-100">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold text-[#001f3f] mt-4">Claim submitted</h1>
        <p className="text-slate-600 mt-2">Your claim reference number is:</p>
        <p className="text-2xl font-bold text-[#0077b6] mt-2">{reference}</p>
        <p className="text-slate-500 text-sm mt-4">Keep this reference for follow-ups. We'll update the status in your portal as we process it.</p>
        <button onClick={() => setReference(null)} className="mt-6 px-5 py-2.5 rounded-lg bg-[#0077b6] text-white font-semibold">
          Submit another claim
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Submit a claim</h1>
      <p className="text-slate-500 mt-1">Report a loss and upload the supporting documents.</p>

      <form onSubmit={submit} className="mt-6 bg-white p-6 rounded-xl border border-slate-100 space-y-4 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <input required placeholder="Claimant full name" className="px-4 py-2.5 rounded-lg border border-slate-200" value={form.claimant_name} onChange={(e) => setForm({ ...form, claimant_name: e.target.value })} />
          <input required placeholder="Deceased full name" className="px-4 py-2.5 rounded-lg border border-slate-200" value={form.deceased_name} onChange={(e) => setForm({ ...form, deceased_name: e.target.value })} />
        </div>
        <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200" value={form.cause_type} onChange={(e) => setForm({ ...form, cause_type: e.target.value })}>
          <option>Natural</option>
          <option>Accidental</option>
          <option>Other</option>
        </select>

        <div>
          <p className="text-sm font-medium text-[#001f3f] mb-2">Documents (death certificate, ID copies, proof of relationship, banking details)</p>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-6 cursor-pointer hover:border-[#0077b6]">
            <Upload className="w-8 h-8 text-slate-400" />
            <p className="text-sm text-slate-500 mt-2">Click to upload files</p>
            <input type="file" multiple className="hidden" onChange={onFiles} />
          </label>
          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg text-sm">
                  <span className="text-slate-600 truncate">{f.name}</span>
                  <button type="button" onClick={() => removeFile(i)}><X className="w-4 h-4 text-slate-400" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button disabled={loading} className="px-5 py-3 rounded-lg bg-[#0077b6] text-white font-semibold disabled:opacity-50">
          {uploading ? "Uploading documents..." : loading ? "Submitting..." : "Submit claim"}
        </button>
      </form>
    </div>
  );
}