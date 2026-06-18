import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Linkedin, Facebook, Clock } from "lucide-react";
import { PageHeader } from "@/pages/ServicesPage";
import ConsultationForm from "@/components/ConsultationForm";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent. We'll be in touch soon.");
      setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
    } catch (err) {
      toast.error("Could not send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Don't Hesitate to Reach Out"
        subtitle="Have questions or ready to start your legal document preparation? Contact us today for professional, reliable, and confidential assistance."
      />

      <section className="container-x py-16 md:py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <h2 className="font-[Outfit] font-bold text-3xl text-[#0F172A]">Get in touch</h2>
          <p className="mt-3 text-lg text-[#334155]">We typically respond within one business day, Monday through Friday.</p>

          <div className="mt-8 space-y-6">
            <InfoRow icon={Phone} label="Phone" value="+520-869-7116" href="tel:+15208697116" testid="contact-phone" />
            <InfoRow icon={Mail} label="Email" value="katrina@documentspreparer.com" href="mailto:katrina@documentspreparer.com" testid="contact-email" />
            <InfoRow icon={MapPin} label="Office" value="7802 E Escalante Rd, Tucson, AZ 85730" testid="contact-address" />
            <InfoRow icon={Clock} label="Hours" value="Mon – Fri · 9:00 AM – 5:00 PM (MST)" testid="contact-hours" />
          </div>

          <div className="mt-8">
            <div className="text-sm font-semibold uppercase tracking-widest text-[#92400E]">Follow</div>
            <div className="mt-3 flex gap-3">
              <a href="https://www.linkedin.com/in/katrina-oase/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-md bg-[#1E3A8A] text-white grid place-items-center hover:bg-[#1E40AF]" aria-label="LinkedIn" data-testid="contact-linkedin"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.facebook.com/executivetoastmasterstucson/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-md bg-[#1E3A8A] text-white grid place-items-center hover:bg-[#1E40AF]" aria-label="Facebook" data-testid="contact-facebook"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden border border-[#CBD5E1]">
            <iframe
              title="Office location map"
              src="https://www.google.com/maps?q=7802+E+Escalante+Rd,+Tucson,+AZ+85730&output=embed"
              width="100%"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white border border-[#CBD5E1] rounded-2xl p-8 md:p-10 shadow-sm">
            <h3 className="font-[Outfit] font-semibold text-2xl text-[#0F172A]">Send a quick message</h3>
            <p className="mt-2 text-[#334155]">Have a quick question? Drop a note and we'll reply by email.</p>
            <form onSubmit={submit} className="mt-6 grid gap-5" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your Name *">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} data-testid="contact-name" required />
                </Field>
                <Field label="Email *">
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} data-testid="contact-email-input" required />
                </Field>
              </div>
              <Field label="Subject">
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} data-testid="contact-subject" />
              </Field>
              <Field label="Message *">
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} min-h-[140px]`} data-testid="contact-message" required />
              </Field>
              <button disabled={loading} className="w-full md:w-auto bg-[#1E3A8A] hover:bg-[#1E40AF] disabled:opacity-60 text-white px-8 py-4 rounded-md font-semibold text-lg" data-testid="contact-submit">
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>

          <div className="mt-10">
            <h3 className="font-[Outfit] font-semibold text-2xl text-[#0F172A]">Or schedule a no-cost consultation</h3>
            <div className="mt-5">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const inputCls = "w-full border-2 border-[#CBD5E1] rounded-md px-4 py-3 text-lg bg-white focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none transition-colors";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-base md:text-lg font-medium text-[#0F172A] mb-2">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({ icon: Icon, label, value, href, testid }) {
  const inner = (
    <div className="flex items-start gap-4" data-testid={testid}>
      <div className="w-12 h-12 rounded-md bg-[#EFF4FB] grid place-items-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#1E3A8A]" />
      </div>
      <div>
        <div className="text-sm font-semibold uppercase tracking-widest text-[#475569]">{label}</div>
        <div className="text-lg text-[#0F172A] font-medium">{value}</div>
      </div>
    </div>
  );
  if (href) return <a href={href} className="block hover:bg-[#F3F4F6] rounded-md p-2 -m-2 transition-colors">{inner}</a>;
  return inner;
}
