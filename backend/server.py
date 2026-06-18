from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import html
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend config
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'katrina@documentspreparer.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Legal Document Preparer API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ----------------------- Models -----------------------
class ConsultationCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    middle_name: Optional[str] = Field(default="", max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=30)
    service: str = Field(..., min_length=1)
    preferred_date: Optional[str] = Field(default="")
    preferred_time: Optional[str] = Field(default="")
    meeting_type: str = Field(default="In-person")
    message: Optional[str] = Field(default="", max_length=4000)


class Consultation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    middle_name: str = ""
    last_name: str
    email: str
    phone: str = ""
    service: str
    preferred_date: str = ""
    preferred_time: str = ""
    meeting_type: str = "In-person"
    message: str = ""
    email_sent: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    subject: Optional[str] = Field(default="General Inquiry", max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str = "General Inquiry"
    message: str
    email_sent: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ChecklistRequestCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=30)


class ChecklistRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    email_sent: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    author: str = "C. Katrina Jean-Oase"
    category: str
    read_time: str
    image_url: str
    published_at: str


# ----------------------- Seeded Blog Data -----------------------
SEED_POSTS: List[dict] = [
    {
        "id": "post-1",
        "slug": "do-i-need-a-will-or-a-trust",
        "title": "Do I Need a Will or a Trust? An Arizona Plain-English Guide",
        "excerpt": "Wills and trusts both protect your family — but they work very differently. Here's how to figure out which one (or both) you actually need.",
        "content": "Most Arizonans ask the same question at some point: do I need a will, a trust, or both? The honest answer is: it depends on your assets, your family, and your goals — but the logic isn't as complicated as it sounds.\n\nA Last Will & Testament is a legal document that says who gets your property and who is in charge of carrying out your wishes when you pass away. Wills go through probate — the court-supervised process of validating the will and distributing assets.\n\nA Revocable Living Trust is a separate legal entity that holds your assets while you're alive. You control it as the trustee. When you pass, a successor trustee distributes assets according to your instructions — without probate.\n\nWho needs just a will? Renters or first-time homeowners with simple estates, modest assets, and no minor children may be well served by a will alone.\n\nWho benefits from a trust? Homeowners (especially in Arizona where probate is required for estates over $100,000 in personal property or $75,000 in real property), parents with minor children, blended families, and anyone who wants their estate handled privately and quickly.\n\nMany families benefit from both: a living trust to hold major assets, plus a pour-over will to catch anything that didn't make it into the trust.\n\nThe right answer depends on your specific situation. A 20-minute no-cost consultation is usually enough to figure out exactly what you need.",
        "category": "Estate Planning",
        "read_time": "5 min read",
        "image_url": "https://images.pexels.com/photos/8441854/pexels-photo-8441854.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "published_at": "2025-09-12",
    },
    {
        "id": "post-2",
        "slug": "what-happens-if-i-dont-have-a-will",
        "title": "What Happens If I Don't Have a Will in Arizona?",
        "excerpt": "If you die without a will in Arizona, the state writes one for you — through intestate succession laws. Here's what that actually means for your family.",
        "content": "When you pass away without a valid will, Arizona doesn't just leave your assets up for grabs. State law has a default plan — called intestate succession — that decides who gets what. It rarely matches what most people actually want.\n\nUnder Arizona's intestate succession rules (ARS §14-2102 through 14-2114), here's what generally happens:\n\nIf you're married with no children outside the marriage, your spouse inherits everything.\n\nIf you're married with children from a previous relationship, your spouse gets half of your separate property and you and your spouse's community property — your children from the previous relationship split the rest.\n\nIf you're unmarried with children, your children split your estate equally.\n\nIf you have no spouse or children, assets pass to parents, then siblings, then more distant relatives.\n\nMore important than who inherits is what doesn't happen automatically:\n\n- Your minor children don't have a named guardian. The court will decide.\n- Your personal representative (executor) is appointed by the court, not chosen by you.\n- Your specific wishes — a sentimental ring to a niece, a charitable donation, a private bequest — are simply ignored.\n- Probate is required and takes longer because there's no will to guide the process.\n\nThe good news: writing a simple Arizona will is straightforward. A self-proving affidavit signed in front of two witnesses and a notary is usually all it takes to make your wishes legally enforceable. The peace of mind is worth the modest effort.",
        "category": "Wills",
        "read_time": "5 min read",
        "image_url": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "published_at": "2025-10-04",
    },
    {
        "id": "post-3",
        "slug": "understanding-probate-in-arizona",
        "title": "Understanding Probate in Arizona Without the Overwhelm",
        "excerpt": "Probate doesn't have to be a maze. Here's how Arizona probate actually works — and how the right paperwork keeps it short, simple, and stress-free.",
        "content": "Probate is the court-supervised process of validating a will, paying debts, and distributing assets. In Arizona, probate comes in three flavors, each with its own paperwork and timeline.\n\n**Informal Probate** is the most common form for uncontested estates. It requires submitting the original will, a petition, and a Notice to Heirs. Most informal probates close in six to nine months.\n\n**Formal Probate** is required when the validity of the will is contested or when ambiguous language requires a judge's interpretation.\n\n**Supervised Probate** adds court oversight to every distribution. It's used in complex cases or when beneficiaries don't trust the personal representative.\n\nThere's also a fourth option: **Small Estate Affidavit**. If the deceased's personal property is worth less than $75,000 and real property is worth less than $100,000, heirs can use an affidavit to collect assets without going through full probate. This is one of the most under-used tools in Arizona estate administration.\n\nThe single biggest source of delay in probate is missing or incorrect paperwork: improperly notarized affidavits, missing inventory forms, unsigned bond waivers. Each correction can add weeks to your case.\n\nThe 5 main stages of Arizona probate:\n1. **Open probate**: Submit the will, petition, and required forms.\n2. **Publish notice**: Alert creditors via newspaper and direct mail.\n3. **Inventory assets and debts**: A complete picture of what the estate contains.\n4. **Distribute property**: Pay creditors, then transfer remaining assets to heirs.\n5. **Close the estate**: File closing statements with the court.\n\nHaving an AZCLDP prepare your probate filings means fewer rejections, fewer court visits, and more time for your family to grieve and heal.",
        "category": "Probate",
        "read_time": "7 min read",
        "image_url": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "published_at": "2025-10-22",
    },
    {
        "id": "post-4",
        "slug": "why-is-a-power-of-attorney-important",
        "title": "Why Is a Power of Attorney Important? (And Why Two Are Better Than One)",
        "excerpt": "A Power of Attorney isn't just for the elderly or seriously ill. Here's why every adult should have one — and why you actually need two different kinds.",
        "content": "A Power of Attorney (POA) is one of the most powerful — and most overlooked — documents in your estate plan. It lets you appoint someone you trust to make decisions on your behalf if you can't make them yourself.\n\nHere's the part people miss: there are really two different powers of attorney, and you need both.\n\n**1. Durable Power of Attorney (Financial)**\n\nA durable POA appoints someone to manage your finances and legal matters — paying bills, managing investments, handling taxes, dealing with banks — if you become incapacitated. The word 'durable' means the authority continues even if you lose mental capacity.\n\nWithout one, if you have a stroke or develop dementia, your family may need to go to court and become your conservator before they can pay your mortgage or access your accounts. That process is slow, expensive, and stressful.\n\n**2. Medical Power of Attorney (Healthcare)**\n\nA medical POA appoints someone to make healthcare decisions when you can't speak for yourself. It works hand-in-hand with a living will (which states your specific wishes about life support, resuscitation, and feeding tubes).\n\nWithout a medical POA, your healthcare providers may have to wait for a court-appointed guardian — or family members may disagree about your care while you're in the ICU. Neither is what you want.\n\n**Who needs powers of attorney?**\n\nEveryone over 18. Yes, including healthy adults in their twenties. Accidents, sudden illnesses, and emergencies don't check IDs first. Having both POAs in place is a small act of preparation that prevents enormous family hardship later.\n\nThe documents are simple. The peace of mind is priceless. Schedule a no-cost consultation if you'd like help getting them in place.",
        "category": "Power of Attorney",
        "read_time": "6 min read",
        "image_url": "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "published_at": "2025-11-08",
    },
    {
        "id": "post-5",
        "slug": "warranty-deeds-vs-quitclaim-deeds-arizona",
        "title": "Warranty Deeds vs. Quitclaim Deeds: What Arizona Property Owners Should Know",
        "excerpt": "Transferring property in Arizona? The right deed makes the difference between airtight protection and an unwelcome surprise. A plain-English guide.",
        "content": "Transferring real estate is one of the most consequential paper trails in your lifetime. In Arizona, two deeds come up most often: the warranty deed and the quitclaim deed.\n\nA warranty deed guarantees that the seller holds clear title and will defend against any future claims. It is the gold standard for arm's-length real estate sales because the buyer receives the strongest legal assurances.\n\nA quitclaim deed transfers only whatever interest the signer happens to own — no guarantees attached. It's commonly used between family members, in divorce settlements, or to add a spouse to a title.\n\nFor families looking to avoid probate, the beneficiary deed (also called a transfer-on-death deed) is a powerful option. You stay in control of the property during your lifetime. When you pass, the property transfers directly to your named beneficiary — no probate required.\n\nBefore signing any deed, you should review property tax implications, verify legal descriptions, and confirm the deed is recorded with the correct Arizona county recorder's office. Mistakes are rarely caught until years later, often during the next sale.\n\nIf you're unsure which instrument is right for your situation, a Certified Legal Document Preparer can walk you through the options and prepare paperwork that's filed correctly the first time.",
        "category": "Deeds",
        "read_time": "5 min read",
        "image_url": "https://images.unsplash.com/photo-1564846824194-346b7871b855?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "published_at": "2025-11-22",
    },
]


async def seed_blog_posts():
    """Upsert all seed posts by id so content updates propagate on restart."""
    for post in SEED_POSTS:
        await db.blog_posts.replace_one({"id": post["id"]}, post, upsert=True)
    # Remove any old posts that are no longer in the seed list
    seed_ids = [p["id"] for p in SEED_POSTS]
    await db.blog_posts.delete_many({"id": {"$nin": seed_ids}})
    logger.info("Seeded %d blog posts", len(SEED_POSTS))


# ----------------------- Email Helpers -----------------------
def _build_consultation_admin_html(c: Consultation) -> str:
    e = html.escape
    return f"""
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: auto; padding: 24px; color: #0F172A;">
      <h2 style="color:#1E3A8A;">New Consultation Request</h2>
      <p style="font-size:16px;">A new consultation request has been submitted on Legal Document Preparer.</p>
      <table style="width:100%; border-collapse: collapse; font-size:15px;">
        <tr><td style="padding:8px; font-weight:bold; width:200px;">Name</td><td style="padding:8px;">{e(c.first_name)} {e(c.middle_name)} {e(c.last_name)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Email</td><td style="padding:8px;">{e(c.email)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Phone</td><td style="padding:8px;">{e(c.phone) or '—'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Service</td><td style="padding:8px;">{e(c.service)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Preferred Date</td><td style="padding:8px;">{e(c.preferred_date) or '—'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Preferred Time</td><td style="padding:8px;">{e(c.preferred_time) or '—'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Meeting Type</td><td style="padding:8px;">{e(c.meeting_type)}</td></tr>
        <tr><td style="padding:8px; font-weight:bold; vertical-align:top;">Message</td><td style="padding:8px; white-space:pre-wrap;">{e(c.message) or '—'}</td></tr>
      </table>
      <p style="margin-top:24px; font-size:13px; color:#64748B;">Submitted at {c.created_at.isoformat()}</p>
    </div>
    """


def _build_consultation_user_html(c: Consultation) -> str:
    e = html.escape
    return f"""
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: auto; padding: 24px; color: #0F172A;">
      <h2 style="color:#1E3A8A;">Thank you, {e(c.first_name)}</h2>
      <p style="font-size:16px; line-height:1.6;">We have received your no-cost consultation request regarding <strong>{e(c.service)}</strong>. Katrina will personally review your details and reach out to confirm your appointment within one business day.</p>
      <p style="font-size:16px; line-height:1.6;">In the meantime, if you have any urgent questions, please feel free to call <strong>+520-869-7116</strong> or reply to this email.</p>
      <p style="font-size:16px; line-height:1.6; margin-top:24px;">Warmly,<br/>C. Katrina Jean-Oase<br/><em>Enrolled Agent · AZCLDP</em><br/>Legal Document Preparer, LLC</p>
    </div>
    """


def _build_checklist_user_html(req: ChecklistRequest) -> str:
    e = html.escape
    return f"""
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: auto; padding: 24px; color: #0F172A;">
      <h2 style="color:#1E3A8A;">Your Arizona Estate Planning Checklist</h2>
      <p style="font-size:16px; line-height:1.6;">Hi {e(req.name)}, thank you for requesting our free Arizona Estate Planning Checklist.</p>
      <p style="font-size:16px; line-height:1.6;">Here are the 12 documents and decisions every Arizona family should have in place:</p>
      <ol style="font-size:15px; line-height:1.8; padding-left:24px;">
        <li><strong>Last Will &amp; Testament</strong> — Naming your executor, guardians for minor children, and clear bequests.</li>
        <li><strong>Revocable Living Trust</strong> — Privately transfer assets and avoid probate. Don't forget to fund it.</li>
        <li><strong>Pour-Over Will</strong> — Safety net to sweep any forgotten assets into your living trust.</li>
        <li><strong>Living Will / Advance Directive</strong> — Your medical preferences in writing.</li>
        <li><strong>Durable Power of Attorney (Financial)</strong> — A trusted agent to handle bills, taxes, and accounts.</li>
        <li><strong>Medical Power of Attorney</strong> — A trusted agent to make healthcare decisions when you can't.</li>
        <li><strong>HIPAA Authorization</strong> — Allows loved ones access to your medical information.</li>
        <li><strong>Beneficiary Designations</strong> — Update IRAs, 401(k)s, life insurance.</li>
        <li><strong>Real Estate Deeds</strong> — Consider a beneficiary (TOD) deed to avoid probate.</li>
        <li><strong>Digital Asset Inventory</strong> — List of online accounts and passwords.</li>
        <li><strong>Letter of Instruction</strong> — Funeral wishes, account locations, executor contact list.</li>
        <li><strong>Annual Review</strong> — Update after marriage, divorce, births, deaths, or major asset changes.</li>
      </ol>
      <p style="font-size:16px; line-height:1.6; margin-top:24px;">When you're ready to put this checklist into action, I'd be happy to walk through your situation in a no-cost consultation. You can reach me at <strong>+520-869-7116</strong> or just reply to this email.</p>
      <p style="font-size:16px; line-height:1.6; margin-top:24px;">Warmly,<br/>C. Katrina Jean-Oase<br/><em>Enrolled Agent · AZCLDP</em><br/>Legal Document Preparer, LLC</p>
    </div>
    """


async def _send_email_safe(to_email: str, subject: str, html_content: str) -> bool:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured — skipping email to %s", to_email)
        return False
    try:
        params = {"from": SENDER_EMAIL, "to": [to_email], "subject": subject, "html": html_content}
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Email sent to %s: %s", to_email, result.get("id"))
        return True
    except Exception as e:
        logger.error("Failed to send email to %s: %s", to_email, e)
        return False


# ----------------------- Routes -----------------------
@api_router.get("/")
async def root():
    return {"message": "Legal Document Preparer API", "status": "ok"}


@api_router.post("/consultations", response_model=Consultation)
async def create_consultation(payload: ConsultationCreate):
    consultation = Consultation(**payload.model_dump())
    admin_ok = await _send_email_safe(
        NOTIFICATION_EMAIL,
        f"New Consultation Request — {consultation.service}",
        _build_consultation_admin_html(consultation),
    )
    user_ok = await _send_email_safe(
        consultation.email,
        "We received your consultation request — Legal Document Preparer",
        _build_consultation_user_html(consultation),
    )
    consultation.email_sent = admin_ok and user_ok

    doc = consultation.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.consultations.insert_one(doc)
    return consultation


@api_router.get("/consultations", response_model=List[Consultation])
async def list_consultations():
    items = await db.consultations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    e = html.escape
    admin_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;padding:24px;color:#0F172A;">
      <h2 style="color:#1E3A8A;">New Contact Message</h2>
      <p><strong>Name:</strong> {e(msg.name)}</p>
      <p><strong>Email:</strong> {e(msg.email)}</p>
      <p><strong>Subject:</strong> {e(msg.subject)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;">{e(msg.message)}</p>
    </div>
    """
    msg.email_sent = await _send_email_safe(
        NOTIFICATION_EMAIL, f"New Contact Message — {msg.subject}", admin_html
    )

    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.post("/checklist-requests", response_model=ChecklistRequest)
async def create_checklist_request(payload: ChecklistRequestCreate):
    req = ChecklistRequest(**payload.model_dump())
    e = html.escape
    # Notify admin
    admin_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;padding:24px;color:#0F172A;">
      <h2 style="color:#1E3A8A;">New Checklist Download Request</h2>
      <p><strong>Name:</strong> {e(req.name)}</p>
      <p><strong>Email:</strong> {e(req.email)}</p>
      <p><strong>Phone:</strong> {e(req.phone) or '—'}</p>
    </div>
    """
    admin_ok = await _send_email_safe(
        NOTIFICATION_EMAIL,
        "New Estate Planning Checklist Request",
        admin_html,
    )
    user_ok = await _send_email_safe(
        req.email,
        "Your Arizona Estate Planning Checklist",
        _build_checklist_user_html(req),
    )
    req.email_sent = admin_ok and user_ok

    doc = req.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.checklist_requests.insert_one(doc)
    return req


@api_router.get("/blog", response_model=List[BlogPost])
async def list_blog_posts():
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("published_at", -1).to_list(200)
    return posts


@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await seed_blog_posts()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
