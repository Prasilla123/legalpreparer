import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  Users,
  Phone,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { ASSETS } from "@/data/assets";
import ConsultationForm from "@/components/ConsultationForm";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FAFAFA]" data-testid="hero-section">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center py-14 md:py-20">
          <div className="lg:col-span-7 fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEF3C7] text-[#92400E] font-semibold text-sm tracking-wide" data-testid="hero-badge">
              <Award className="w-4 h-4" /> Arizona Certified Legal Document Preparer · Enrolled Agent · 10+ Years
            </span>
            <h1 className="mt-6 font-[Outfit] font-bold tracking-tight text-4xl md:text-6xl text-[#0F172A] leading-[1.05]">
              Protect your family. <br className="hidden md:block" />
              <span className="text-[#1E3A8A]">Plan your legacy.</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[#334155] leading-relaxed max-w-2xl">
              Wills, trusts, powers of attorney, probate, deeds, and LLC formation — prepared accurately the first time
              by Katrina Jean-Oase, serving Tucson and all of Arizona. Plain English. Flat pricing. Personal service.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" data-testid="hero-cta-primary" className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white hover:bg-[#1E40AF] px-7 py-4 rounded-md font-semibold text-lg transition-colors shadow-sm">
                Schedule a Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+15208697116" data-testid="hero-cta-call" className="inline-flex items-center gap-2 bg-[#15803D] text-white hover:bg-[#166534] px-7 py-4 rounded-md font-semibold text-lg transition-colors">
                <PhoneCall className="w-5 h-5" /> Call +520-869-7116
              </a>
              <Link to="/checklist" data-testid="hero-cta-checklist" className="inline-flex items-center gap-2 bg-white text-[#1E3A8A] hover:bg-[#F3F4F6] px-7 py-4 rounded-md font-semibold text-lg border-2 border-[#1E3A8A] transition-colors">
                <Sparkles className="w-5 h-5" /> Free Estate Planning Checklist
              </Link>
            </div>

            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[#334155] max-w-xl">
              {[
                "Wills, Trusts & Powers of Attorney",
                "Probate filings — done right",
                "Deeds: quitclaim, gift, beneficiary",
                "Arizona LLC formation",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#15803D] flex-shrink-0" /> {b}</li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl">
              <Stat icon={Clock} label="Years experience" value="10+" />
              <Stat icon={Users} label="Families helped" value="1,200+" />
              <Stat icon={ShieldCheck} label="Filings accurate" value="100%" />
            </div>
          </div>

          <div className="lg:col-span-5 fade-up-2">
            <div className="relative">
              <img
                src={ASSETS.katrina}
                alt="C. Katrina Jean-Oase — Arizona Certified Legal Document Preparer"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto h-auto object-cover bg-[#F3F4F6]"
                data-testid="hero-image"
              />
              <div className="hidden md:block absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-5 max-w-[260px]">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#92400E]">
                  <Award className="w-4 h-4" /> Trusted in Tucson
                </div>
                <div className="mt-1 text-[#0F172A] font-medium leading-snug">
                  Documents prepared correctly the first time — every time.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FEF3C7] -z-0" aria-hidden />
      </section>

      {/* SERVICES — Estate Planning featured */}
      <section className="bg-[#F3F4F6] py-16 md:py-24" data-testid="services-section">
        <div className="container-x">
          <SectionHead
            eyebrow="What we help with"
            title="Legal Documents That Protect What Matters Most"
            subtitle="From the will that protects your family to the deed that secures your home — every document is prepared with care, precision, and confidentiality."
          />

          {/* Estate Planning — featured */}
          <Link
            to="/estate-planning"
            className="group mt-12 block bg-white border-2 border-[#1E3A8A] rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            data-testid="featured-estate-planning"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 md:p-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-bold uppercase tracking-widest">
                  Most requested
                </span>
                <h3 className="mt-4 font-[Outfit] font-bold text-3xl md:text-4xl text-[#0F172A]">
                  Estate Planning
                </h3>
                <p className="mt-3 text-lg text-[#334155] leading-relaxed">
                  Wills · Revocable Living Trusts · Pour-Over Wills · Living Wills · Durable & Medical Powers of Attorney.
                  The complete package that keeps your family in control — not the courts.
                </p>
                <ul className="mt-5 space-y-2 text-[#334155]">
                  {[
                    "Avoid probate with a properly funded living trust",
                    "Name guardians for minor children",
                    "Decide medical care in advance with a living will",
                    "Appoint trusted decision-makers for finances and health",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-[#15803D] mt-0.5 flex-shrink-0" /> {b}</li>
                  ))}
                </ul>
                <div className="mt-7 inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-md font-semibold group-hover:bg-[#1E40AF] transition-colors">
                  Explore Estate Planning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="relative h-80 lg:h-auto">
                <img src={SERVICES[0].image} alt="Estate planning documents" className="w-full h-full object-cover" />
              </div>
            </div>
          </Link>

          {/* Other services */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(1).map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/${s.slug}`}
                  className="group bg-white border border-[#CBD5E1] rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
                  data-testid={`service-card-${s.slug}`}
                >
                  <div className="w-14 h-14 rounded-md bg-[#EFF4FB] grid place-items-center">
                    <Icon className="w-7 h-7 text-[#1E3A8A]" />
                  </div>
                  <h3 className="mt-5 font-[Outfit] font-semibold text-2xl text-[#0F172A]">{s.name}</h3>
                  <p className="mt-2 text-sm font-medium text-[#92400E] uppercase tracking-widest">{s.short_label}</p>
                  <p className="mt-3 text-base text-[#334155] leading-relaxed flex-1">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[#1E3A8A] font-semibold group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* ABOUT */}
      <section className="py-16 md:py-24 bg-white" data-testid="about-section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img
              src={ASSETS.katrina}
              alt="C. Katrina Jean-Oase, AZCLDP"
              className="rounded-2xl shadow-xl w-full h-auto max-h-[560px] object-cover bg-[#F3F4F6]"
              data-testid="katrina-image"
            />
          </div>
          <div className="lg:col-span-7">
            <span className="text-[#92400E] font-semibold uppercase tracking-widest text-sm">Meet Katrina</span>
            <h2 className="mt-3 font-[Outfit] font-bold text-3xl md:text-5xl text-[#0F172A]">
              C. Katrina Jean-Oase
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Enrolled Agent</Badge>
              <Badge>AZCLDP</Badge>
              <Badge>10+ Years Experience</Badge>
            </div>
            <p className="mt-6 text-lg text-[#334155] leading-relaxed">
              Welcome. I'm Katrina Jean-Oase, a dedicated professional with over a decade of experience preparing
              legal documents for Arizona families. My mission is to provide precise, reliable, and confidential
              service — so you can focus on the people and the future you're protecting.
            </p>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Whether you need a will, a living trust, help with probate, a deed, or to start an LLC — I'll walk
              you through each step in plain English, prepare every document correctly the first time, and follow
              through until everything is signed, notarized, and recorded.
            </p>
            <Link to="/about" data-testid="about-link" className="mt-8 inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:gap-3 transition-all text-lg">
              More about my practice <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Free Checklist banner */}
      <section className="py-16 md:py-20 bg-[#FEF3C7]" data-testid="checklist-banner">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <span className="text-[#92400E] font-semibold uppercase tracking-widest text-sm">Free download</span>
            <h2 className="mt-3 font-[Outfit] font-bold text-3xl md:text-5xl text-[#0F172A]">
              The Arizona Estate Planning Checklist
            </h2>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed max-w-2xl">
              A simple, printable checklist that walks you through the 12 documents and decisions every Arizona
              family should have in place. Send to your inbox — no strings attached.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/checklist"
              data-testid="checklist-cta"
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-7 py-4 rounded-md font-semibold text-lg"
            >
              Get the Free Checklist <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section className="bg-[#0F172A] text-white py-16 md:py-24" data-testid="consult-section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="text-[#FBBF24] font-semibold uppercase tracking-widest text-sm">Let's consult together</span>
            <h2 className="mt-3 font-[Outfit] font-bold text-3xl md:text-5xl text-white leading-tight">
              Let Our Experience Be Your Guide
            </h2>
            <p className="mt-5 text-lg text-[#CBD5E1] leading-relaxed">
              Request a no-cost consultation. Tell me a little about what you need, choose a date and time that works
              for you, and I'll personally follow up within one business day.
            </p>
            <ul className="mt-8 space-y-3 text-[#E2E8F0]">
              <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-[#FBBF24] mt-1 flex-shrink-0" /> Confidential & secure</li>
              <li className="flex gap-3"><Clock className="w-5 h-5 text-[#FBBF24] mt-1 flex-shrink-0" /> Reply within one business day</li>
              <li className="flex gap-3"><Users className="w-5 h-5 text-[#FBBF24] mt-1 flex-shrink-0" /> In-person or Zoom — your choice</li>
            </ul>

            <div className="mt-8 p-5 bg-[#1E293B] rounded-lg border border-[#334155]">
              <div className="text-sm uppercase tracking-widest text-[#FBBF24] font-semibold">Prefer to talk?</div>
              <a href="tel:+15208697116" className="mt-2 inline-flex items-center gap-2 text-white font-[Outfit] font-bold text-2xl hover:text-[#FBBF24]">
                <Phone className="w-5 h-5" /> +520-869-7116
              </a>
              <div className="text-sm text-[#CBD5E1] mt-1">Mon – Fri · 9:00 AM – 5:00 PM MST</div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <span className="text-[#92400E] font-semibold uppercase tracking-widest text-sm">{eyebrow}</span>
      <h2 className="mt-3 font-[Outfit] font-bold text-3xl md:text-5xl text-[#0F172A]">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-[#334155] leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div>
      <Icon className="w-6 h-6 text-[#1E3A8A]" />
      <div className="mt-2 font-[Outfit] font-bold text-3xl text-[#0F172A]">{value}</div>
      <div className="text-sm text-[#475569]">{label}</div>
    </div>
  );
}

function Badge({ children }) {
  return <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#EFF4FB] text-[#1E3A8A] text-sm font-semibold border border-[#1E3A8A]/15">{children}</span>;
}
