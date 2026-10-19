import React, { useState } from "react";
import { Users, TrendingUp, Building2, Briefcase, ScrollText, HeartHandshake, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import PageHero from "@/components/JTG/PageHero";
import { IMAGES } from "@/lib/landingData";

const SERVICES_HERO = IMAGES.media1;

const services = [
  { icon: <Users className="w-6 h-6" />, title: "Client Engagement", text: "Getting to know your family, your goals and your budget — the foundation for every recommendation we make." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Investment Planning", text: "Growing and protecting your wealth with disciplined, goal-based investment strategies." },
  { icon: <Building2 className="w-6 h-6" />, title: "Business Insurance", text: "Cover for business owners — key person, buy-and-sell and contingent liability protection." },
  { icon: <Briefcase className="w-6 h-6" />, title: "Employee Benefits", text: "Group funeral and risk cover for your staff, administered efficiently in one scheme." },
  { icon: <ScrollText className="w-6 h-6" />, title: "Estate Planning", text: "Wills, executorship and estate administration so your family is never left with paperwork alone." },
  { icon: <HeartHandshake className="w-6 h-6" />, title: "Funeral Administration", text: "Funeral schemes and group cover — the heart of our practice since 2004." },
];

export default function Services() {
  const { toast } = useToast();
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const openEnquire = (title) => {
    setOpen(title);
    setForm((f) => ({ ...f, message: `I'd like to enquire about ${title}.` }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.entities.Enquiry.create({
        ...form,
        service: open,
      });
      toast({ title: "Enquiry sent", description: "We'll be in touch with you shortly." });
      setOpen(null);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-landing-bg min-h-screen">
      <PageHero
        image={SERVICES_HERO}
        title="Our services"
        subtitle="Six disciplines, one relationship. Everything is handled in-house so a family never has to repeat their story to a stranger."
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative bg-landing-card p-7 rounded-2xl border border-landing-line flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-landing-blue/40 hover:shadow-[0_18px_40px_-12px_rgba(11,87,208,0.22)]"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-landing-blue/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-landing-blue/10" />
                <div className="relative w-12 h-12 rounded-2xl bg-landing-navy text-white flex items-center justify-center transition-all duration-300 group-hover:bg-landing-blue group-hover:scale-105 group-hover:shadow-[0_8px_20px_-4px_rgba(11,87,208,0.5)]">
                  {s.icon}
                </div>
                <h3 className="relative mt-5 text-lg font-bold text-landing-navy tracking-tight">{s.title}</h3>
                <p className="relative mt-2.5 text-landing-mut text-[0.92rem] leading-relaxed flex-1">{s.text}</p>
                <button
                  onClick={() => openEnquire(s.title)}
                  className="relative mt-6 inline-flex items-center gap-2 text-landing-blue font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Enquire <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setOpen(null)}>
          <div className="bg-landing-card rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-landing-navy">Enquire about {open}</h3>
            <form onSubmit={submit} className="mt-4 space-y-3">
              <input required placeholder="Full name" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required type="email" placeholder="Email" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input placeholder="Phone" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <textarea required placeholder="Message" rows={4} className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button disabled={loading} className="w-full px-5 py-3 rounded-lg bg-landing-blue text-white font-semibold disabled:opacity-50">
                {loading ? "Sending..." : "Send enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}