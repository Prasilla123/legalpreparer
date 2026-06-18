import { ShieldCheck, Heart, Wallet, Award, HandshakeIcon, Lock } from "lucide-react";

const REASONS = [
  {
    icon: Award,
    title: "Arizona Certified Legal Document Preparer",
    body:
      "Authorized by the Arizona Supreme Court (AZCLDP) and an Enrolled Agent — credentials you can verify. Over a decade of focused practice.",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    body:
      "No call centers, no junior staff. You work directly with Katrina from your first call to the day your documents are signed and recorded.",
  },
  {
    icon: Wallet,
    title: "Affordable, Transparent Pricing",
    body:
      "Flat, honest pricing quoted in advance. You'll always know what you're paying before you sign anything.",
  },
  {
    icon: ShieldCheck,
    title: "Documents Done Right",
    body:
      "Every filing is proofed against Arizona statute and the latest county recorder requirements — so your paperwork is accepted the first time.",
  },
  {
    icon: HandshakeIcon,
    title: "Reliable Support",
    body:
      "Reply within one business day, every business day. Questions after signing? Just call — you're not a number here.",
  },
  {
    icon: Lock,
    title: "Confidential & Secure",
    body:
      "Your family's affairs are private. Documents are stored securely, conversations stay between us, and your information is never shared.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24" data-testid="why-choose-us">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="text-[#92400E] font-semibold uppercase tracking-widest text-sm">Why Families Choose Us</span>
          <h2 className="mt-3 font-[Outfit] font-bold text-3xl md:text-5xl text-[#0F172A]">
            The trusted choice for Arizona families
          </h2>
          <p className="mt-4 text-lg text-[#334155] leading-relaxed">
            When you're planning for your family's future, the details matter. Here's what sets us apart.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((r) => {
            const I = r.icon;
            return (
              <div key={r.title} className="bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl p-7 hover:border-[#1E3A8A]/40 hover:shadow-md transition-all" data-testid={`reason-${r.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}>
                <div className="w-12 h-12 rounded-md bg-[#EFF4FB] grid place-items-center">
                  <I className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <div className="mt-4 font-[Outfit] font-semibold text-xl text-[#0F172A]">{r.title}</div>
                <p className="mt-2 text-[#334155] leading-relaxed">{r.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
