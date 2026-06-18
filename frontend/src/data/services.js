// Service catalog — restructured to put Estate Planning as the flagship service.
// Slugs match the original site for SEO equivalence.
import { ScrollText, Scale, FileText, Briefcase, ShieldCheck, HeartPulse, Banknote, FileSignature } from "lucide-react";

export const SERVICES = [
  {
    slug: "estate-planning",
    name: "Estate Planning",
    short_label: "Wills, Trusts & Power of Attorney",
    icon: ScrollText,
    benefit:
      "Protect your family, control how your assets are distributed, and spare your loved ones the burden of guessing what you would have wanted.",
    short:
      "Wills, revocable living trusts, pour-over wills, living wills, durable powers of attorney and medical powers of attorney — the documents that protect your family and your wishes.",
    long:
      "Owning a home or any piece of land is often our biggest investment. Having a plan to manage it properly gives peace of mind. Estate planning ensures your wishes are followed, your loved ones are taken care of, and estate taxes are kept to a minimum. I prepare the full suite of Arizona estate planning documents and explain every one of them in plain English before you sign.",
    sub_services: [
      {
        name: "Last Will & Testament",
        icon: ScrollText,
        body:
          "Everyone has a will — either one you create, or one the state of Arizona writes for you through intestate succession laws. A personal will lets you choose your executor, name guardians for minor children, and direct exactly where your assets go. I draft simple and complex Arizona wills with self-proving affidavits so probate moves faster.",
      },
      {
        name: "Revocable Living Trust",
        icon: ShieldCheck,
        body:
          "A revocable living trust lets you keep full control of your assets while you're alive, avoid the cost and delay of probate, and pass assets privately to your beneficiaries. You can change or revoke it at any time. I help you set it up and fund it correctly so it actually works when it's needed.",
      },
      {
        name: "Pour-Over Will",
        icon: FileSignature,
        body:
          "A pour-over will is the safety net that catches anything you forgot to put in your living trust. After you pass, any leftover assets 'pour over' into the trust and follow the same instructions — keeping your estate plan unified and complete.",
      },
      {
        name: "Living Will (Advance Directive)",
        icon: HeartPulse,
        body:
          "A living will tells doctors and family what kind of medical care you want — life support, resuscitation, feeding tubes — if you can't speak for yourself. Anyone over 18 should have one. It prevents family arguments during the hardest moments and ensures your wishes are followed.",
      },
      {
        name: "Durable Power of Attorney",
        icon: Banknote,
        body:
          "A General Durable Power of Attorney appoints someone you trust to manage your finances and legal matters if you become unable to. Without it, your family may need a long, expensive court process to be appointed your guardian or conservator.",
      },
      {
        name: "Medical Power of Attorney",
        icon: HeartPulse,
        body:
          "A Medical Power of Attorney appoints someone to make healthcare decisions for you when you can't. It works alongside your living will to make sure your medical preferences are honored — fast — without disputes among loved ones.",
      },
    ],
    bullets: [
      "Last Will & Testament with self-proving affidavit",
      "Revocable Living Trust (with funding guidance)",
      "Pour-Over Will to complement your trust",
      "Living Will / Advance Directive",
      "Durable Power of Attorney (financial)",
      "Medical Power of Attorney (healthcare)",
    ],
    image:
      "https://images.pexels.com/photos/8441854/pexels-photo-8441854.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "probate",
    name: "Probate",
    short_label: "Informal, Formal & Small Estate",
    icon: Scale,
    benefit:
      "Lift the weight of paperwork off grieving families. Move through Arizona probate quickly, correctly, and with dignity.",
    short:
      "Estate planning aims to avoid probate — but sometimes it happens anyway. I prepare every Arizona probate filing your family needs, so the process is smooth and stress-free.",
    long:
      "If you find yourself dealing with probate, I am here to help. My goal is to make the process as smooth and stress-free as possible. I prepare every document required by the Pima County and Maricopa County probate courts — from opening petitions through final closing statements — so you can focus on your family instead of the paperwork.",
    sub_services: [
      {
        name: "1. Open Probate",
        icon: FileText,
        body:
          "Pima County Probate Information Sheet, Certificates of Completion of Required Training, Notice of Completion of Required Training, Application for Informal Probate, Verified Statement of Fiduciary Licensure, Renunciation of Right to Appointment as Personal Representative, and Acceptance of the Duties of PR.",
      },
      {
        name: "2. Publishing Notice",
        icon: FileText,
        body:
          "Notice to Creditor by Publication, Notice to Creditor by Mailing, Proof of Mailing Notice to Creditors, and Proof for Publication.",
      },
      {
        name: "3. Inventory of Assets & Debts",
        icon: FileText,
        body:
          "The personal representative has a duty to take possession or control of, pay taxes on, and otherwise manage, protect, and preserve the assets of the estate. I prepare the full inventory and accounting documents.",
      },
      {
        name: "4. Property Distribution",
        icon: FileText,
        body:
          "Deed or Instrument of Distribution, Final Account, Proposal for Distribution, and Receipt, Release and Waiver — prepared and reviewed before signing.",
      },
      {
        name: "5. Closing the Estate",
        icon: FileText,
        body:
          "Closing Statement, Letter to Clerk of the Court, Application and Registrar's Certificate, Proof of Mailing, and Certificate of Registrar.",
      },
    ],
    bullets: [
      "Informal Probate filings",
      "Small Estate / Affidavit of Succession",
      "Inventory & accounting preparation",
      "Notice to Heirs and creditor notifications",
      "Closing statements and final distributions",
    ],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  },
  {
    slug: "deeds",
    name: "Deeds",
    short_label: "Property Transfers Done Right",
    icon: FileText,
    benefit:
      "Transfer property with confidence — every signature, notary, and recording handled so your title is clean.",
    short:
      "Quitclaim, gift, beneficiary, and correction deeds — drafted, notarized and recorded with the Arizona county recorder.",
    long:
      "Transferring titles with a deed can be tricky and carry tax consequences. If you know what type of deed you need — a quitclaim deed, a gift deed, or a beneficiary deed — I help you with the full transaction: drafting, review, notarization, and county recording.",
    process: [
      "Draft the deed accordingly to your situation.",
      "Email the draft to you for review and approval.",
      "Have your signature notarized as required by law.",
      "Submit and record the deed with the county recorder's office.",
    ],
    sub_services: [
      {
        name: "Quitclaim Deed",
        icon: FileText,
        body:
          "Transfers property ownership without guaranteeing title. Commonly used between family members, to add or remove a spouse after marriage or divorce, or to fix mistakes in a title. Quick and inexpensive when both parties know each other and trust the title.",
      },
      {
        name: "Gift Deed",
        icon: FileText,
        body:
          "Lets a property owner (donor) give property to someone (donee) without payment in return. Often used between family or for charitable donations. May have gift-tax implications above the annual exclusion ($18,000 in 2024) — I help you understand them before you sign.",
      },
      {
        name: "Beneficiary Deed (Transfer-on-Death)",
        icon: FileText,
        body:
          "Names someone to inherit your property when you die, without going through probate. You keep full ownership and control while you're alive. No gift tax on signing; the beneficiary receives a step-up in basis at your death.",
      },
      {
        name: "Correction Deed",
        icon: FileText,
        body:
          "Fixes mistakes in a previously recorded deed — typos, misspelled names, wrong property descriptions. It does not transfer property again; it just corrects the public record.",
      },
    ],
    bullets: [
      "Warranty Deeds, Quitclaim Deeds, Gift Deeds",
      "Beneficiary (Transfer-on-Death) Deeds",
      "Correction Deeds for prior recordings",
      "Notarization and county recorder filing",
    ],
    image:
      "https://images.unsplash.com/photo-1564846824194-346b7871b855?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  },
  {
    slug: "start-a-business",
    name: "Start A Business",
    short_label: "LLCs, Corporations & S-Corp Elections",
    icon: Briefcase,
    benefit:
      "Get your new business off to a confident start. Filings done right, on time, so you can focus on customers — not paperwork.",
    short:
      "Forming an entity protects your personal assets and adds credibility. I prepare LLC, corporation, and S-Corp filings from start to finish.",
    long:
      "Starting an LLC is a smart way to protect your personal assets and build your business. With a few steps and the right documents, you can set up your corporation or LLC and be on your way. It will be a pleasure to sit down with you, hear your dreams, and prepare your paperwork carefully.",
    process: [
      "Choose a unique business name and verify availability.",
      "Appoint a registered (statutory) agent.",
      "File Articles of Organization with the Arizona Corporation Commission.",
      "Draft an Operating Agreement (LLC) or Bylaws (corporation).",
      "Obtain an Employer Identification Number (EIN) from the IRS.",
      "Register for state taxes and required business licenses.",
      "Issue stock certificates (corporation) or units of interest (LLC).",
      "Elect S-Corp status with the IRS if it fits your situation.",
    ],
    sub_services: [
      {
        name: "Arizona LLC Formation",
        icon: Briefcase,
        body:
          "Articles of Organization with the Arizona Corporation Commission, statutory agent designation, publication where required, and Operating Agreement tailored to your members and ownership terms.",
      },
      {
        name: "Corporation Formation",
        icon: Briefcase,
        body:
          "Articles of Incorporation, bylaws, initial board resolutions, stock certificates, and shareholder records — set up so your corporation is governed correctly from day one.",
      },
      {
        name: "S Corporation Election",
        icon: Briefcase,
        body:
          "Avoid double taxation through pass-through taxation. Profits flow to shareholders' personal returns. Comes with strict rules around reasonable salaries and profit sharing — I help you decide if it fits your situation.",
      },
      {
        name: "EIN, Licenses & Compliance",
        icon: Briefcase,
        body:
          "Federal EIN application, basic state tax registration, and guidance on common business licenses for Pima County and Maricopa County.",
      },
    ],
    bullets: [
      "Arizona LLC Articles of Organization",
      "Custom Operating Agreements",
      "Corporation formation & bylaws",
      "S-Corp election guidance",
      "EIN & basic compliance setup",
    ],
    image:
      "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);

// Used in the consultation form's "I am interested in" dropdown — matches the
// live site options so existing users see familiar terminology.
export const SERVICE_INTERESTS = [
  "Estate Planning — Wills",
  "Revocable Living Trust",
  "Pour-Over Wills",
  "Living Wills",
  "Durable Power of Attorney",
  "Medical Power of Attorney",
  "Probate (Informal / Small Estate)",
  "Deeds — Quitclaim",
  "Deeds — Gift",
  "Deeds — Beneficiary",
  "Start A Business / LLC",
  "Free Estate Planning Checklist",
  "Other / Not Sure",
];
