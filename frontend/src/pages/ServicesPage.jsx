import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "@/data/services";

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Services"
        title="Document Preparation, Done Right the First Time"
        subtitle="Explore the four core areas where I help Arizona families and small business owners with the paperwork that protects what matters most."
      />

      <section className="container-x py-16 md:py-20" data-testid="services-grid">
        <div className="space-y-12">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.slug}
                className={`grid lg:grid-cols-12 gap-10 items-center ${reverse ? "" : ""}`}
                data-testid={`service-row-${s.slug}`}
              >
                <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
                  <img src={s.image} alt={s.name} className="rounded-2xl shadow-lg w-full h-[360px] object-cover" />
                </div>
                <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}>
                  <div className="inline-flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-[#EFF4FB] grid place-items-center">
                      <Icon className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-widest text-[#92400E]">
                      Service {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-4 font-[Outfit] font-bold text-3xl md:text-4xl text-[#0F172A]">{s.name}</h2>
                  <p className="mt-4 text-lg text-[#334155] leading-relaxed">{s.long}</p>
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[#334155]">
                        <Check className="w-5 h-5 text-[#15803D] mt-1 flex-shrink-0" />
                        <span className="text-base md:text-lg">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/services/${s.slug}`}
                    data-testid={`service-detail-link-${s.slug}`}
                    className="mt-7 inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-md font-semibold"
                  >
                    See details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection />
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-[#F3F4F6] border-b border-[#E2E8F0]" data-testid="page-header">
      <div className="container-x py-14 md:py-20">
        <span className="text-[#92400E] font-semibold uppercase tracking-widest text-sm">{eyebrow}</span>
        <h1 className="mt-3 font-[Outfit] font-bold text-4xl md:text-5xl text-[#0F172A] leading-tight max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-4 text-lg md:text-xl text-[#334155] leading-relaxed max-w-3xl">{subtitle}</p>}
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="bg-[#1E3A8A] text-white" data-testid="cta-section">
      <div className="container-x py-14 md:py-16 grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8">
          <h3 className="font-[Outfit] font-bold text-2xl md:text-4xl">Ready to get the paperwork off your plate?</h3>
          <p className="mt-3 text-lg text-[#CBD5E1]">Schedule a no-cost consultation today. In-person in Tucson or via Zoom anywhere in Arizona.</p>
        </div>
        <div className="md:col-span-4 md:text-right">
          <Link to="/contact" data-testid="cta-button" className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-7 py-4 rounded-md font-semibold text-lg">
            Request Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
