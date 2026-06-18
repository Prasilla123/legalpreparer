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


class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    author: str = "Katrina Jean-Oase"
    category: str
    read_time: str
    image_url: str
    published_at: str


# ----------------------- Seeded Blog Data -----------------------
SEED_POSTS: List[dict] = [
    {
        "id": "post-1",
        "slug": "understanding-warranty-vs-quitclaim-deeds",
        "title": "Warranty Deeds vs. Quitclaim Deeds: What Every Arizona Property Owner Should Know",
        "excerpt": "When transferring property in Arizona, choosing the right deed makes the difference between airtight protection and an unwelcome surprise. Here's a plain-English guide.",
        "content": "Transferring real estate is one of the most consequential paper trails in your lifetime. In Arizona, two deeds come up most often: the warranty deed and the quitclaim deed. \n\nA warranty deed guarantees that the seller holds clear title and will defend against any future claims. It is the gold standard for arm's-length real estate sales because the buyer receives the strongest legal assurances.\n\nA quitclaim deed, on the other hand, transfers only whatever interest the signer happens to own—no guarantees attached. It is commonly used between family members, in divorce settlements, or to add a spouse to a title.\n\nBefore signing either document, you should review property tax implications, verify legal descriptions, and confirm the deed is recorded with the correct Arizona county recorder's office. Mistakes are rarely caught until years later, often during the next sale.\n\nIf you are unsure which instrument is right for your situation, a Certified Legal Document Preparer can walk you through the options and prepare paperwork that is filed correctly the first time.",
        "category": "Deeds",
        "read_time": "5 min read",
        "image_url": "https://images.unsplash.com/photo-1564846824194-346b7871b855?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "published_at": "2025-09-12",
    },
    {
        "id": "post-2",
        "slug": "writing-a-will-that-actually-works",
        "title": "Writing a Will That Actually Works: A Calm, Honest Guide for Arizona Families",
        "excerpt": "A will is more than a list of names and assets—it is the instructions you leave behind. Here is how to write one with clarity, dignity, and zero ambiguity.",
        "content": "Most people put off writing a will because the conversation feels heavy. The truth is, putting your wishes on paper is a final act of kindness toward the people you love.\n\nA well-crafted Arizona will should clearly identify your executor, list specific bequests, name guardians if you have minor children, and outline how the residue of your estate is distributed. Vague language is the most common reason wills end up in probate disputes.\n\nWitness requirements in Arizona are specific—two witnesses, both adults, neither of whom is a beneficiary. Self-proving affidavits notarized at signing save your loved ones weeks of court delays later.\n\nUpdate your will after major life events: marriage, divorce, the birth of a child, the loss of a beneficiary, or significant changes in assets. A document filed in 1998 rarely reflects who you are today.\n\nWorking with a Certified Legal Document Preparer ensures your will is drafted to Arizona statute, witnessed properly, and stored securely.",
        "category": "Will Preparation",
        "read_time": "6 min read",
        "image_url": "https://images.pexels.com/photos/8441854/pexels-photo-8441854.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "published_at": "2025-10-04",
    },
    {
        "id": "post-3",
        "slug": "navigating-probate-in-arizona",
        "title": "Navigating Probate in Arizona Without the Overwhelm",
        "excerpt": "Probate doesn't have to be a maze. With the right paperwork prepared the first time, families can move through the process faster and with less stress.",
        "content": "Probate is the court-supervised process of validating a will, paying debts, and distributing assets. In Arizona, probate types include informal, formal, and supervised—each with its own paperwork and timelines.\n\nInformal probate is the most common for uncontested estates. It requires submitting the original will, a petition, and a Notice to Heirs. Most informal probates close in six to nine months.\n\nFormal probate is required when the validity of the will is contested or when ambiguous language requires a judge's interpretation. Supervised probate adds court oversight to every distribution.\n\nThe single biggest source of delay is missing or incorrect paperwork: improperly notarized affidavits, missing inventory forms, or unsigned bond waivers. Each correction can add weeks to your case.\n\nHaving an experienced AZCLDP prepare your probate filings means fewer rejections, fewer court visits, and more time for your family to grieve and heal.",
        "category": "Estate Probate",
        "read_time": "7 min read",
        "image_url": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "published_at": "2025-10-22",
    },
    {
        "id": "post-4",
        "slug": "starting-an-llc-in-arizona",
        "title": "Starting an LLC in Arizona: The Paperwork Side of Your New Business",
        "excerpt": "Forming an LLC is exciting, but the filing details can trip up first-time owners. Here's what your documents need to say, and where they need to go.",
        "content": "An LLC (Limited Liability Company) gives Arizona business owners liability protection without the formality of a corporation. The setup paperwork is straightforward—if you know exactly what to file.\n\nStart with the Articles of Organization, filed with the Arizona Corporation Commission. You will need a unique business name, a known place of business, a statutory agent, and the names of members or managers.\n\nNext comes the Operating Agreement. Arizona does not require it to be filed, but lenders, partners, and the IRS will all ask for it. A clear operating agreement defines ownership percentages, voting rights, profit distributions, and exit terms.\n\nDon't forget the Arizona Publication requirement: most counties require new LLCs to publish notice of formation in an approved newspaper within 60 days. Maricopa and Pima counties are exempt.\n\nFinally, apply for an EIN with the IRS so you can open a business bank account and hire employees. A Certified Legal Document Preparer can handle the filings while you focus on running your new company.",
        "category": "Start A Business",
        "read_time": "6 min read",
        "image_url": "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "published_at": "2025-11-08",
    },
]


async def seed_blog_posts():
    existing = await db.blog_posts.count_documents({})
    if existing == 0:
        await db.blog_posts.insert_many(SEED_POSTS)
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
      <p style="font-size:16px; line-height:1.6; margin-top:24px;">Warmly,<br/>Katrina Jean-Oase<br/><em>Enrolled Agent · AZCLDP</em><br/>Legal Document Preparer, LLC</p>
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

    # Try sending both emails (admin notification + user confirmation)
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
    allow_credentials=True,
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
