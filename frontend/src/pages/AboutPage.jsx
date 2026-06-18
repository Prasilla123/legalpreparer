import { Link } from "react-router-dom";
import { Award, ShieldCheck, Heart, Sparkles, ArrowRight } from "lucide-react";
import { PageHeader, CTASection } from "@/pages/ServicesPage";

const KATRINA_IMG = "https://images.pexels.com/photos/15780889/pexels-photo-15780889.jpeg?auto=compress&cs=tinysrgb&w=1200";

const VALUES = [
  { icon: ShieldCheck, title: "Precision", body: "Every document is prepared, proofed, and double-checked against Arizona statute before it leaves my desk." },
  { icon: Heart, title: "Care", body: "I take the time to listen. Many of my clients are navigating loss, transition, or new beginnings—and they deserve patience." },
  { icon: Award, title: "Experience", body: "Over ten years of focused practice, with credentials as an Enrolled Agent and AZCLDP." },
  { icon: Sparkles, title: "Clarity", body: "Plain-English explanations. No jargon. You will always understand what you are signing and why." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="Hello, I'm Katrina Jean-Oase"
        subtitle="A dedicated professional helping Arizona families and small business owners with precise, reliable legal document preparation."
      />

      <section className="container-x py-16 md:py-20 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <img src={KATRINA_IMG} alt="Katrina Jean-Oase" className="rounded-2xl shadow-xl w-full h-[560px] object-cover" data-testid="about-image" />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Credential label="Enrolled Agent" />
            <Credential label="AZCLDP" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="font-[Outfit] font-bold text-3xl md:text-4xl text-[#0F172A]">A decade of getting the paperwork right</h2>
          <div className="mt-6 space-y-5 text-lg text-[#334155] leading-relaxed">
            <p>
              Welcome. My name is Katrina Jean-Oase, and for more than ten years I have helped Arizonans with
              the documents that quietly shape their families and their futures: deeds, wills, probate
              filings, and the founding paperwork of new businesses.
            </p>
            <p>
              I came into this work because I watched people I love struggle with paperwork during seasons of
              grief, transition, and major life decisions. I knew there had to be a calmer, more competent
              way to get things done—done right—the first time.
            </p>
            <p>
              As an Enrolled Agent and Arizona Certified Legal Document Preparer (AZCLDP), I am authorized to
              prepare a wide range of documents. I work confidentially, charge transparent rates, and never
              recommend more work than your situation actually needs.
            </p>
            <p>
              If you are unsure where to start, the best next step is a no-cost consultation. Tell me where you are,
              and I will tell you honestly what is involved.
            </p>
          </div>
          <Link to="/contact" data-testid="about-cta" className="mt-8 inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-7 py-4 rounded-md font-semibold text-lg">
            Schedule a consultation <ArrowRight className="w-5 h-5" />
          </Link>
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
