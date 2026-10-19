import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import PageHero from "@/components/JTG/PageHero";
import { IMAGES } from "@/lib/landingData";
import { UserPlus, Loader2, CheckCircle2 } from "lucide-react";

const PLANS = [
  { value: "Individual", label: "Individual", blurb: "Cover for yourself only." },
  { value: "Single Parent", label: "Single Parent", blurb: "Cover for you and your dependent children." },
  { value: "Family", label: "Family", blurb: "Cover for you, your spouse and dependents." },
];

export default function Apply() {
  const [form, setForm] = useState({
    full_name: "",
    id_number: "",
    phone: "",
    email: "",
    address: "",
    plan_type: "Individual",
    scheme_type: "Individual",
    group_name: "",
    cover_amount: "",
    premium_amount: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const { toast } = useToast();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        cover_amount: form.cover_amount ? Number(form.cover_amount) : undefined,
        premium_amount: form.premium_amount ? Number(form.premium_amount) : undefined,
        group_name: form.scheme_type === "Group" ? form.group_name : "",
      };
      const res = await base44.entities.MembershipApplication.create(payload);
      setSubmitted(res);
      toast({ title: "Application submitted", description: "We'll review your application and contact you shortly." });
    } catch (err) {
      toast({ title: "Could not submit", description: err?.message || "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-landing-bg min-h-screen">
        <PageHero
          image={IMAGES.vision1}
          title="Application received"
          subtitle="Thank you for choosing Justice The Great."
        />
        <section className="py-16 sm:py-20">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-landing-navy">Your application is under review</h2>
            <p className="mt-3 text-landing-mut leading-relaxed">
              We've received your membership application, {submitted.full_name}. Our team will review it and
              contact you at <span className="font-medium text-landing-navy">{submitted.email}</span> within one
              business day with next steps.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="px-6 py-3 rounded-full bg-landing-navy text-white font-medium hover:bg-landing-navy/90 transition">
                Back to home
              </Link>
              <Link to="/contact" className="px-6 py-3 rounded-full border border-landing-line text-landing-navy font-medium hover:bg-landing-alt transition">
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-landing-bg min-h-screen">
      <PageHero
        image={IMAGES.vision1}
        title="Apply for membership"
        subtitle="Join Justice The Great and give your family the dignity of cover when it matters most."
      />
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-landing-card rounded-[20px] border border-landing-line shadow-[0_10px_32px_-18px_rgba(11,31,57,0.24)] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-landing-navy text-white flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-landing-navy">Membership application</h2>
                <p className="text-sm text-landing-mut">All fields marked with * are required.</p>
              </div>
            </div>
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name *">
                  <input required value={form.full_name} onChange={set("full_name")} className={inputCls} placeholder="Your full name" />
                </Field>
                <Field label="ID number *">
                  <input required value={form.id_number} onChange={set("id_number")} className={inputCls} placeholder="South African ID number" />
                </Field>
                <Field label="Phone">
                  <input value={form.phone} onChange={set("phone")} className={inputCls} placeholder="Phone number" />
                </Field>
                <Field label="Email *">
                  <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@example.com" />
                </Field>
              </div>
              <Field label="Residential address">
                <textarea value={form.address} onChange={set("address")} className={inputCls + " min-h-[80px]"} placeholder="Street, suburb, city, postal code" />
              </Field>
              <Field label="Plan type *">
                <div className="grid sm:grid-cols-3 gap-3">
                  {PLANS.map((p) => (
                    <button
                      type="button"
                      key={p.value}
                      onClick={() => setForm((f) => ({ ...f, plan_type: p.value }))}
                      className={`text-left p-4 rounded-xl border transition ${
                        form.plan_type === p.value
                          ? "border-landing-navy bg-landing-navy/5 ring-1 ring-landing-navy"
                          : "border-landing-line hover:border-landing-navy/40"
                      }`}
                    >
                      <p className="font-semibold text-landing-navy text-sm">{p.label}</p>
                      <p className="text-xs text-landing-mut mt-1">{p.blurb}</p>
                    </button>
                  ))}
                </div>
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Scheme type *">
                  <div className="flex gap-3">
                    {["Individual", "Group"].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setForm((f) => ({ ...f, scheme_type: s }))}
                        className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition ${
                          form.scheme_type === s
                            ? "border-landing-navy bg-landing-navy/5 text-landing-navy"
                            : "border-landing-line text-landing-mut hover:border-landing-navy/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>
                {form.scheme_type === "Group" && (
                  <Field label="Group / employer name">
                    <input value={form.group_name} onChange={set("group_name")} className={inputCls} placeholder="Group or employer name" />
                  </Field>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Cover amount (R)">
                  <input type="number" value={form.cover_amount} onChange={set("cover_amount")} className={inputCls} placeholder="e.g. 30000" />
                </Field>
                <Field label="Monthly premium (R)">
                  <input type="number" value={form.premium_amount} onChange={set("premium_amount")} className={inputCls} placeholder="e.g. 120" />
                </Field>
              </div>
              <Field label="Anything else we should know?">
                <textarea value={form.notes} onChange={set("notes")} className={inputCls + " min-h-[80px]"} placeholder="Optional notes for our team" />
              </Field>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3.5 rounded-full bg-landing-navy text-white font-semibold disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-landing-navy/90 transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit application"
                )}
              </button>
              <p className="text-xs text-landing-mut text-center">
                By submitting you agree to be contacted by Justice The Great about your application.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-lg border border-landing-line bg-white text-landing-navy placeholder:text-landing-mut/60 focus:outline-none focus:ring-2 focus:ring-landing-navy/30 focus:border-landing-navy";

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-landing-navy mb-1.5">{label}</label>
      {children}
    </div>
  );
}