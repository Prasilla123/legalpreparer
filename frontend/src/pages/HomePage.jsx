import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Award, Clock, Users } from "lucide-react";
import { SERVICES } from "@/data/services";
import ConsultationForm from "@/components/ConsultationForm";

const HERO_IMG = "https://images.pexels.com/photos/8441854/pexels-photo-8441854.jpeg?auto=compress&cs=tinysrgb&w=1600";
const KATRINA_IMG = "https://images.pexels.com/photos/15780889/pexels-photo-15780889.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white" data-testid="hero-section">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center py-16 md:py-24">
          <div className="lg:col-span-7 fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEF3C7] text-[#92400E] font-semibold text-sm tracking-wide" data-testid="hero-badge">
              <Award className="w-4 h-4" /> Enrolled Agent · AZCLDP · 10+ Years
            </span>
            <h1 className="mt-6 font-[Outfit] font-bold tracking-tight text-4xl md:text-6xl text-[#0F172A] leading-[1.05]">
              Vision. Plan. <span className="text-[#1E3A8A]">Achieve.</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[#334155] leading-relaxed max-w-2xl">
              At Legal Document Preparer, we work quietly in the background to make sure your deeds, wills, probate
              filings and LLC paperwork are prepared accurately—so you can focus on the life and legacy you are building.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" data-testid="hero-cta-primary" className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white hover:bg-[#1E40AF] px-8 py-4 rounded-md font-semibold text-lg transition-colors">
                Request a No-Cost Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services" data-testid="hero-cta-secondary" className="inline-flex items-center gap-2 bg-transparent text-[#1E3A8A] hover:bg-[#F3F4F6] px-8 py-4 rounded-md font-semibold text-lg border-2 border-[#1E3A8A] transition-colors">
                Explore Services
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-xl">
              <Stat icon={Clock} label="Years experience" value="10+" />
              <Stat icon={Users} label="Families helped" value="1,200+" />
              <Stat icon={ShieldCheck} label="Filings accurate" value="100%" />
            </div>
          </div>

          <div className="lg:col-span-5 fade-up-2">
            <div className="relative">
              <img
                src={HERO_IMG}
                alt="Senior couple reviewing legal documents at home"
                className="rounded-2xl shadow-xl w-full h-[460px] object-cover"
                data-testid="hero-image"
              />
              <div className="hidden md:block absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-5 max-w-[260px]">
                <div className="text-sm font-semibold text-[#92400E]">Trusted in Tucson</div>
                <div className="mt-1 text-[#0F172A] font-medium leading-snug">
                  Documents prepared correctly the first time—every time.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FEF3C7] -z-0" aria-hidden />
      </section>

      {/* SERVICES */}
      <section className="bg-[#F3F4F6] py-16 md:py-24" data-testid="services-section">
        <div className="container-x">
          <SectionHead
            eyebrow="Services"
            title="Services We Offer"
            subtitle="Providing precise and reliable legal document preparation services to meet your needs."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group bg-white border border-[#CBD5E1] rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
                  data-testid={`service-card-${s.slug}`}
                >
                  <div className="w-14 h-14 rounded-md bg-[#EFF4FB] grid place-items-center">
                    <Icon className="w-7 h-7 text-[#1E3A8A]" />
                  </div>
                  <h3 className="mt-5 font-[Outfit] font-semibold text-2xl text-[#0F172A]">{s.name}</h3>
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

      {/* ABOUT */}
      <section className="py-16 md:py-24" data-testid="about-section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img
              src={KATRINA_IMG}
              alt="Katrina Jean-Oase"
              className="rounded-2xl shadow-xl w-full h-[520px] object-cover"
              data-testid="katrina-image"
            />
          </div>
          <div className="lg:col-span-7">
            <span className="text-[#92400E] font-semibold uppercase tracking-widest text-sm">About Me</span>
            <h2 className="mt-3 font-[Outfit] font-bold text-3xl md:text-5xl text-[#0F172A]">Katrina Jean-Oase</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Enrolled Agent</Badge>
              <Badge>AZCLDP</Badge>
              <Badge>10+ Years Experience</Badge>
            </div>
            <p className="mt-6 text-lg text-[#334155] leading-relaxed">
              Welcome. I am Katrina Jean-Oase, a dedicated professional with over a decade of experience preparing
              legal documents. My mission is to provide my clients with precise, reliable, and confidential
              document preparation services.
            </p>
            <p className="mt-4 text-lg text-[#334155] leading-relaxed">
              Whether you need assistance with deeds, wills, estate probate, or setting up an LLC, I help you
              navigate the process with ease and confidence—saving you time and stress by getting your documents
              right the first time.
            </p>
            <Link to="/about" data-testid="about-link" className="mt-8 inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:gap-3 transition-all text-lg">
              More about my practice <ArrowRight className="w-5 h-5" />
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
              Request a No-Cost Consultation. Tell me a little about what you need, choose a date and time that works
              for you, and I will personally follow up within one business day.
            </p>
            <ul className="mt-8 space-y-3 text-[#E2E8F0]">
              <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-[#FBBF24] mt-1" /> Confidential & secure</li>
              <li className="flex gap-3"><Clock className="w-5 h-5 text-[#FBBF24] mt-1" /> Reply within one business day</li>
              <li className="flex gap-3"><Users className="w-5 h-5 text-[#FBBF24] mt-1" /> In-person or Zoom—your choice</li>
            </ul>
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
