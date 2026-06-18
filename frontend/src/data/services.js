// Static services catalog used across pages
import { FileText, ScrollText, Scale, Briefcase } from "lucide-react";

export const SERVICES = [
  {
    slug: "deeds",
    name: "Deeds",
    icon: FileText,
    short:
      "Transferring property ownership can be complex. I prepare warranty deeds, quitclaim deeds, beneficiary deeds and more—each legally sound and tailored to your situation.",
    long:
      "Whether you are passing a property to a family member, settling a divorce, or completing a sale between trusted parties, the deed you choose carries different protections and consequences. I prepare warranty deeds, quitclaim deeds, beneficiary deeds, and corrective deeds, and I make sure every legal description, signature line and notary block is exactly right before the document is recorded with the Arizona county recorder.",
    bullets: [
      "Warranty Deeds for arm's-length sales",
      "Quitclaim Deeds for family transfers and divorce",
      "Beneficiary Deeds to avoid probate",
      "Title verification and recorder filing support",
    ],
    image:
      "https://images.unsplash.com/photo-1564846824194-346b7871b855?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  },
  {
    slug: "will-preparation",
    name: "Will Preparation",
    icon: ScrollText,
    short:
      "Secure your legacy with a well-crafted will. I help document your wishes clearly and legally, ensuring your assets are distributed exactly as you intend.",
    long:
      "Your will is the final word you leave for the people you love. I draft Arizona wills with clear executor designations, specific bequests, guardianship clauses for minor children, and self-proving affidavits—reducing the risk of probate disputes and saving your family time and grief when the moment arrives.",
    bullets: [
      "Simple and complex wills under Arizona law",
      "Executor and guardian designations",
      "Self-proving affidavits and proper witnessing",
      "Updates after marriage, divorce, or new assets",
    ],
    image:
      "https://images.pexels.com/photos/8441854/pexels-photo-8441854.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    slug: "estate-probate",
    name: "Estate Probate",
    icon: Scale,
    short:
      "Navigating probate can be overwhelming. I prepare every required document—petitions, inventories, notices—so the process moves forward without delay.",
    long:
      "Arizona probate has three flavors: informal, formal, and supervised. I prepare the right paperwork for the right pathway—original wills, petitions, notices to heirs, inventories, accountings, and closing statements—so your family does not lose months to corrections, missed notarizations, or missing signatures.",
    bullets: [
      "Informal, formal and supervised probate filings",
      "Inventory and accounting preparation",
      "Notice to Heirs and creditor notifications",
      "Closing statements and final distributions",
    ],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  },
  {
    slug: "start-a-business",
    name: "Start A Business",
    icon: Briefcase,
    short:
      "Starting an LLC? I prepare and file the Articles of Organization, draft your Operating Agreement, and walk you through publication and EIN requirements.",
    long:
      "Filing your LLC correctly the first time means fewer headaches later. I prepare Articles of Organization for the Arizona Corporation Commission, draft tailored Operating Agreements, handle statutory agent designations, and guide you through publication requirements and EIN applications.",
    bullets: [
      "Arizona LLC Articles of Organization filings",
      "Customized Operating Agreements",
      "Statutory Agent and publication handling",
      "EIN and basic business compliance setup",
    ],
    image:
      "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);
