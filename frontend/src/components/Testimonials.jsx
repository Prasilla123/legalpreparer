import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-[#F3F4F6] py-16 md:py-24" data-testid="testimonials">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="text-[#92400E] font-semibold uppercase tracking-widest text-sm">What clients say</span>
          <h2 className="mt-3 font-[Outfit] font-bold text-3xl md:text-5xl text-[#0F172A]">
            Trusted by families across Arizona
          </h2>
          <p className="mt-4 text-lg text-[#334155] leading-relaxed">
            Hear from clients who let us handle the paperwork so they could focus on what matters most.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <figure key={i} className="bg-white border border-[#CBD5E1] rounded-xl p-7 shadow-sm flex flex-col h-full" data-testid={`testimonial-${i}`}>
              <Quote className="w-8 h-8 text-[#D97706]" />
              <div className="mt-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                ))}
              </div>
              <blockquote className="mt-4 text-[#334155] leading-relaxed text-base flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-[#E2E8F0]">
                <div className="font-[Outfit] font-semibold text-[#0F172A]">{t.name}</div>
                <div className="text-sm text-[#475569]">{t.location} · {t.relation}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[#64748B] italic max-w-2xl mx-auto">
          Reviews reflect individual client experiences. Names abbreviated for client privacy.
        </p>
      </div>
    </section>
  );
}
