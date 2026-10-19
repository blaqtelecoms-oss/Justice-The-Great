import React, { useState } from "react";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import PageHero from "@/components/JTG/PageHero";
import { IMAGES } from "@/lib/landingData";

const CONTACT_HERO = IMAGES.media2;
const WHATSAPP_NUMBER = "27000000000"; // replace with real number

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.entities.Enquiry.create(form);
      toast({ title: "Message sent", description: "We'll come back to you personally." });
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
        image={CONTACT_HERO}
        title="Contact us"
        subtitle="Visit the office in Scott Street, send a message, or chat to us on WhatsApp."
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mt-2 grid lg:grid-cols-2 gap-8">
            <form onSubmit={submit} className="bg-landing-card p-8 rounded-2xl border border-landing-line space-y-4">
              <input required placeholder="Full name" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required type="email" placeholder="Email" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input placeholder="Phone" className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <textarea required placeholder="Message" rows={5} className="w-full px-4 py-2.5 rounded-lg border border-landing-line bg-landing-bg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button disabled={loading} className="w-full px-5 py-3 rounded-lg bg-landing-blue text-white font-semibold disabled:opacity-50">
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>

            <div className="space-y-5">
              <div className="bg-landing-card p-6 rounded-2xl border border-landing-line flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-landing-blue text-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-landing-navy">Office</p>
                  <p className="text-landing-mut mt-1">Office no. 6, Building 40 Scott Street, Newcastle 2940, KwaZulu-Natal</p>
                </div>
              </div>

              <div className="bg-landing-card p-6 rounded-2xl border border-landing-line flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-landing-blue text-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-landing-navy">Email</p>
                  <a href="mailto:jtfgunerals@gmail.com" className="text-landing-mut mt-1 hover:text-landing-blue">jtfgunerals@gmail.com</a>
                </div>
              </div>

              <div className="bg-landing-card p-6 rounded-2xl border border-landing-line flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-landing-blue text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-landing-navy">Phone</p>
                  <p className="text-landing-mut mt-1">Phone number on request</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}