import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { CheckCircle2, Mail, Phone, ArrowRight, Download } from "lucide-react";
import { PageHeader } from "@/pages/ServicesPage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CHECKLIST_ITEMS = [
  { title: "Last Will & Testament", body: "Naming your executor, guardians for minor children, and clear bequests." },
  { title: "Revocable Living Trust", body: "Privately transfer assets and avoid probate. Don't forget to fund it." },
  { title: "Pour-Over Will", body: "Safety net to sweep any forgotten assets into your living trust." },
  { title: "Living Will / Advance Directive", body: "Your medical preferences in writing — life support, resuscitation, feeding tubes." },
  { title: "Durable Power of Attorney (Financial)", body: "A trusted agent to handle bills, taxes, and accounts if you can't." },
  { title: "Medical Power of Attorney", body: "A trusted agent to make healthcare decisions when you can't speak for yourself." },
  { title: "HIPAA Authorization", body: "Allows your loved ones access to your medical information." },
  { title: "Beneficiary Designations", body: "Update IRAs, 401(k)s, life insurance — they pass outside your will." },
  { title: "Real Estate Deeds", body: "Beneficiary (Transfer-on-Death) deeds can transfer property without probate." },
  { title: "Digital Asset Inventory", body: "List of online accounts, passwords, and digital property." },
  { title: "Letter of Instruction", body: "Funeral wishes, account locations, contact list for executors." },
  { title: "Annual Review", body: "Update after marriage, divorce, births, deaths, or major asset changes." },
];

export default function ChecklistPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/checklist-requests`, form);
      setSubmitted(true);
      toast.success("Sent! Check your inbox for the checklist.");
    } catch (err) {
      toast.error("Couldn't process your request. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="checklist-page">
      <PageHeader
        eyebrow="Free Resource"
        title="The Arizona Estate Planning Checklist"
        subtitle="A simple, printable checklist of the 12 documents and decisions every Arizona family should have in place. No legal jargon. Just the essentials, explained."
      />

      <section className="container-x py-16 md:py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-[Outfit] font-bold text-3xl text-[#0F172A]">What's in the checklist</h2>
          <p className="mt-3 text-lg text-[#334155] leading-relaxed">
            A practical, printable list of the documents and decisions that protect your family — and a short
            note explaining why each one matters.
          </p>
          <ol className="mt-7 grid sm:grid-cols-2 gap-4">
            {CHECKLIST_ITEMS.map((item, i) => (
              <li key={item.title} className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex gap-4" data-testid={`checklist-item-${i}`}>
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EFF4FB] grid place-items-center text-[#1E3A8A] font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="font-[Outfit] font-semibold text-lg text-[#0F172A]">{item.title}</div>
                  <p className="mt-1 text-[#334155]">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 bg-white border-2 border-[#1E3A8A] rounded-2xl p-8 shadow-lg" data-testid="checklist-form-card">
            {!submitted ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-bold uppercase tracking-widest">
                  Free · No strings attached
                </div>
                <h3 className="mt-4 font-[Outfit] font-bold text-2xl md:text-3xl text-[#0F172A]">
                  Send the checklist to my inbox
                </h3>
                <p className="mt-3 text-[#334155]">
                  Enter your details below. We'll email you the printable PDF and a short follow-up — that's it. No spam, ever.
                </p>
                <form onSubmit={submit} className="mt-6 space-y-4" data-testid="checklist-form">
                  <div>
                    <label className="block text-base font-medium text-[#0F172A] mb-2">Your Name *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} data-testid="checklist-name" required />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-[#0F172A] mb-2">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="you@example.com" data-testid="checklist-email" required />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-[#0F172A] mb-2">Phone (optional)</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} data-testid="checklist-phone" />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white disabled:opacity-60 px-6 py-4 rounded-md font-semibold text-lg"
                    data-testid="checklist-submit"
                  >
                    {loading ? "Sending…" : (<><Download className="w-5 h-5" /> Get the Checklist</>)}
                  </button>
                </form>
                <p className="mt-4 text-sm text-[#64748B]">By submitting, you agree to be contacted about your request. Unsubscribe anytime.</p>
              </>
            ) : (
              <div className="text-center" data-testid="checklist-success">
                <CheckCircle2 className="w-14 h-14 text-[#15803D] mx-auto" />
                <h3 className="mt-4 font-[Outfit] font-bold text-2xl text-[#0F172A]">Check your inbox</h3>
                <p className="mt-3 text-[#334155] leading-relaxed">
                  Your Arizona Estate Planning Checklist is on its way to <strong>{form.email}</strong>. If you don't see
                  it in a few minutes, check your spam folder or give us a call.
                </p>
                <div className="mt-6 grid gap-3">
                  <a href="tel:+15208697116" className="inline-flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white px-6 py-3 rounded-md font-semibold">
                    <Phone className="w-5 h-5" /> Call +520-869-7116
                  </a>
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded-md font-semibold">
                    Schedule a Free Consultation <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </aside>
      </section>

      <section className="bg-[#0F172A] text-white py-14 md:py-16">
        <div className="container-x grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <h3 className="font-[Outfit] font-bold text-2xl md:text-4xl">Want help putting the checklist into action?</h3>
            <p className="mt-3 text-lg text-[#CBD5E1]">A no-cost consultation is the easiest way to figure out which documents you actually need.</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-7 py-4 rounded-md font-semibold text-lg" data-testid="checklist-page-cta">
              <Mail className="w-5 h-5" /> Contact Katrina
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const inputCls = "w-full border-2 border-[#CBD5E1] rounded-md px-4 py-3 text-lg bg-white focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none transition-colors";
