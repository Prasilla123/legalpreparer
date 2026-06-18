import { Link, useParams, Navigate } from "react-router-dom";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { getServiceBySlug, SERVICES } from "@/data/services";
import ConsultationForm from "@/components/ConsultationForm";
import { PageHeader } from "@/pages/ServicesPage";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  if (!service) return <Navigate to="/services" replace />;
  const Icon = service.icon;

  const others = SERVICES.filter((s) => s.slug !== slug);

  return (
    <div data-testid={`service-detail-${slug}`}>
      <PageHeader
        eyebrow={`Services / ${service.name}`}
        title={service.name}
        subtitle={service.short}
      />

      <section className="container-x py-14 md:py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <Link to="/services" className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:underline" data-testid="back-to-services">
            <ArrowLeft className="w-4 h-4" /> Back to all services
          </Link>
          <img src={service.image} alt={service.name} className="mt-6 rounded-2xl shadow-lg w-full h-[420px] object-cover" />
          <div className="mt-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-[#EFF4FB] grid place-items-center">
                <Icon className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <h2 className="font-[Outfit] font-bold text-3xl text-[#0F172A]">What you can expect</h2>
            </div>
            <p className="mt-5 text-lg text-[#334155] leading-relaxed">{service.long}</p>
            <ul className="mt-6 space-y-3">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#15803D] mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-[#334155]">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 p-6 md:p-8 rounded-xl bg-[#FEF3C7] border border-[#FCD34D]">
              <div className="text-sm font-semibold uppercase tracking-widest text-[#92400E]">Important</div>
              <p className="mt-2 text-[#0F172A] text-lg leading-relaxed">
                I am an Arizona Certified Legal Document Preparer (AZCLDP). I do not provide legal advice or
                representation. If your matter requires legal counsel, I will tell you honestly so you can decide
                whether to engage an attorney.
              </p>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28">
            <h3 className="font-[Outfit] font-semibold text-2xl text-[#0F172A]">Request a no-cost consultation</h3>
            <p className="mt-2 text-[#334155]">Tell me about your situation. I will follow up within one business day.</p>
            <div className="mt-5">
              <ConsultationForm compact />
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-[#F3F4F6] py-14 md:py-20" data-testid="other-services">
        <div className="container-x">
          <h3 className="font-[Outfit] font-bold text-2xl md:text-3xl text-[#0F172A]">Explore other services</h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((s) => {
              const I = s.icon;
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="bg-white border border-[#CBD5E1] rounded-xl p-6 hover:shadow-md transition-shadow" data-testid={`related-${s.slug}`}>
                  <div className="w-11 h-11 rounded-md bg-[#EFF4FB] grid place-items-center">
                    <I className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                  <div className="mt-3 font-[Outfit] font-semibold text-xl text-[#0F172A]">{s.name}</div>
                  <p className="mt-2 text-[#334155] line-clamp-3">{s.short}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[#1E3A8A] font-semibold">Learn more <ArrowRight className="w-4 h-4" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
