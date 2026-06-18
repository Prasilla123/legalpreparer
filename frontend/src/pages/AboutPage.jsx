import { Link } from "react-router-dom";
import { Award, ShieldCheck, Heart, Sparkles, ArrowRight, Phone } from "lucide-react";
import { PageHeader, CTASection } from "@/pages/ServicesPage";
import { ASSETS } from "@/data/assets";

const VALUES = [
  { icon: ShieldCheck, title: "Precision", body: "Every document is prepared, proofed, and double-checked against Arizona statute before it leaves my desk." },
  { icon: Heart, title: "Care", body: "I take the time to listen. Many of my clients are navigating loss, transition, or new beginnings — and they deserve patience." },
  { icon: Award, title: "Experience", body: "Over ten years of focused practice, with credentials as an Enrolled Agent and AZCLDP." },
  { icon: Sparkles, title: "Clarity", body: "Plain-English explanations. No jargon. You will always understand what you are signing and why." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="Hello, I'm C. Katrina Jean-Oase"
        subtitle="A dedicated Arizona Certified Legal Document Preparer helping families and small business owners with precise, reliable, confidential document preparation."
      />

      <section className="container-x py-16 md:py-20 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <img src={ASSETS.katrina} alt="C. Katrina Jean-Oase" className="rounded-2xl shadow-xl w-full h-auto max-h-[620px] object-cover bg-[#F3F4F6]" data-testid="about-image" />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Credential label="Enrolled Agent" />
            <Credential label="AZCLDP" />
          </div>
          <div className="mt-6 bg-white border border-[#CBD5E1] rounded-xl p-6">
            <div className="text-sm font-semibold uppercase tracking-widest text-[#92400E]">Get in touch</div>
            <a href="tel:+15208697116" className="mt-2 inline-flex items-center gap-2 font-[Outfit] font-bold text-2xl text-[#0F172A] hover:text-[#1E3A8A]">
              <Phone className="w-5 h-5" /> +520-869-7116
            </a>
            <div className="mt-2 text-[#334155]">katrina@documentspreparer.com</div>
            <div className="mt-1 text-[#475569]">7802 E Escalante Rd, Tucson, AZ 85730</div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="font-[Outfit] font-bold text-3xl md:text-4xl text-[#0F172A]">A decade of getting the paperwork right</h2>
          <div className="mt-6 space-y-5 text-lg text-[#334155] leading-relaxed">
            <p>
              Welcome. My name is C. Katrina Jean-Oase, and for more than ten years I've helped Arizonans with
              the documents that quietly shape their families and their futures: wills, trusts, powers of attorney,
              probate filings, deeds, and the founding paperwork of new businesses.
            </p>
            <p>
              I came into this work because I watched people I love struggle with paperwork during seasons of
              grief, transition, and major life decisions. I knew there had to be a calmer, more competent way
              to get things done — done right — the first time.
            </p>
            <p>
              As an Enrolled Agent and Arizona Certified Legal Document Preparer (AZCLDP), I'm authorized to
              prepare a wide range of documents under Arizona Supreme Court rules. I work confidentially, charge
              transparent flat rates, and never recommend more work than your situation actually needs.
            </p>
            <p>
              If you're unsure where to start, the best next step is a no-cost consultation. Tell me where you are,
              and I'll tell you honestly what's involved.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" data-testid="about-cta" className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-7 py-4 rounded-md font-semibold text-lg">
              Schedule a consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+15208697116" data-testid="about-call" className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white px-7 py-4 rounded-md font-semibold text-lg">
              <Phone className="w-5 h-5" /> Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F4F6] py-16 md:py-20" data-testid="values-section">
        <div className="container-x">
          <h2 className="font-[Outfit] font-bold text-3xl md:text-4xl text-[#0F172A] max-w-2xl">How I work</h2>
          <p className="mt-3 text-lg text-[#334155] max-w-2xl">Four principles guide everything I prepare for my clients.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => {
              const I = v.icon;
              return (
                <div key={v.title} className="bg-white border border-[#CBD5E1] rounded-xl p-7 h-full">
                  <I className="w-9 h-9 text-[#1E3A8A]" />
                  <div className="mt-4 font-[Outfit] font-semibold text-xl text-[#0F172A]">{v.title}</div>
                  <p className="mt-2 text-[#334155] leading-relaxed">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

function Credential({ label }) {
  return (
    <div className="rounded-md border-2 border-[#1E3A8A] bg-white px-4 py-3 text-center">
      <div className="font-[Outfit] font-semibold text-[#1E3A8A]">{label}</div>
    </div>
  );
}
