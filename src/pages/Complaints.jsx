import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import PageHero from "@/components/JTG/PageHero";
import { IMAGES } from "@/lib/landingData";

const COMPLAINTS_HERO = IMAGES.hero3;

export default function Complaints() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", complaint_type: "Service", description: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.entities.Complaint.create(form);
      toast({ title: "Complaint received", description: "Your reference will be sent to your email. We aim to respond within 7 days." });
      setForm({ name: "", email: "", phone: "", complaint_type: "Service", description: "" });
    } catch (err) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-landing-bg min-h-screen">
      <PageHero
        image={COMPLAINTS_HERO}
        title="Complaints & dispute resolution"
        subtitle="As a licensed FSP we take complaints seriously. If you're unhappy with our service, please let us know — we'll work with you to resolve it."
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mt-2 bg-landing-card p-6 rounded-2xl border border-landing-line">
            <h2 className="font-bold text-landing-navy">How the process works</h2>
            <ol className="mt-3 space-y-2 text-landing-mut list-decimal list-inside">
              <li>Submit your complaint using the form below.</li>
              <li>We acknowledge receipt and assign a reference number.</li>
              <li>Your complaint is reviewed by our complaints officer.</li>
              <li>We aim to resolve complaints within 7 working days, or escalate complex matters and keep you updated.</li>
              <li>If you're not satisfied with our response, you may approach the Financial Sector Conduct Authority (FSCA) or the Ombudsman for Financial Services.</li>
            </ol>
          </div>

          <form onSubmit={submit} className="mt-6 bg-landing-card p-6 rounded-2xl border border-landing-line space-y-4">
            <input required placeholder="Full name" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Email" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Phone" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <select className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg text-landing-ink" value={form.complaint_type} onChange={(e) => setForm({ ...form, complaint_type: e.target.value })}>
              <option>Service</option>
              <option>Claims</option>
              <option>Premiums</option>
              <option>Policy administration</option>
              <option>Other</option>
            </select>
            <textarea required placeholder="Describe your complaint" rows={5} className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button disabled={loading} className="w-full px-5 py-3 rounded-lg bg-landing-blue text-white font-semibold disabled:opacity-50">
              {loading ? "Submitting..." : "Submit complaint"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}