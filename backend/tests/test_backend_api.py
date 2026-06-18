"""Backend API tests for Legal Document Preparer (iteration 2 — major redesign)."""
import os
import pytest
import requests

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
API = f"{BASE_URL}/api"

EXPECTED_SLUGS = {
    "do-i-need-a-will-or-a-trust",
    "what-happens-if-i-dont-have-a-will",
    "understanding-probate-in-arizona",
    "why-is-a-power-of-attorney-important",
    "warranty-deeds-vs-quitclaim-deeds-arizona",
}

STALE_SLUGS = {
    "writing-a-will-that-actually-works",
    "navigating-probate-in-arizona",
    "starting-an-llc-in-arizona",
    "understanding-warranty-vs-quitclaim-deeds",
}


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- Health -----
def test_root_health(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


# ----- Blog: 5 new seeds, no stale -----
def test_blog_list_new_seeds(client):
    r = client.get(f"{API}/blog")
    assert r.status_code == 200
    posts = r.json()
    assert isinstance(posts, list)
    slugs = {p['slug'] for p in posts}
    assert EXPECTED_SLUGS.issubset(slugs), f"Missing seeds: {EXPECTED_SLUGS - slugs}"
    assert slugs.isdisjoint(STALE_SLUGS), f"Stale slugs still present: {slugs & STALE_SLUGS}"
    assert len(posts) == 5, f"Expected exactly 5 posts, got {len(posts)}"


def test_blog_detail_do_i_need_a_will(client):
    r = client.get(f"{API}/blog/do-i-need-a-will-or-a-trust")
    assert r.status_code == 200
    data = r.json()
    assert data['slug'] == "do-i-need-a-will-or-a-trust"
    assert data['title'].startswith("Do I Need a Will or a Trust?")
    assert data['content']


def test_blog_detail_not_found(client):
    r = client.get(f"{API}/blog/non-existent-slug-xyz")
    assert r.status_code == 404


# ----- Checklist requests -----
def test_checklist_request_success(client):
    payload = {
        "name": "TEST_Checklist User",
        "email": "test_checklist@example.com",
        "phone": "+15555550100",
    }
    r = client.post(f"{API}/checklist-requests", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data['id']
    assert data['name'] == payload['name']
    assert data['email'] == payload['email']
    assert data['phone'] == payload['phone']
    # email_sent must be False without RESEND_API_KEY
    assert data['email_sent'] is False


def test_checklist_request_invalid_email(client):
    r = client.post(f"{API}/checklist-requests", json={
        "name": "Bad",
        "email": "not-an-email",
    })
    assert r.status_code == 422


def test_checklist_request_missing_name(client):
    r = client.post(f"{API}/checklist-requests", json={
        "email": "valid@example.com",
    })
    assert r.status_code == 422


# ----- Consultation with new SERVICE_INTERESTS -----
@pytest.mark.parametrize("service", [
    "Estate Planning — Wills",
    "Revocable Living Trust",
    "Free Estate Planning Checklist",
])
def test_consultation_new_service_values(client, service):
    payload = {
        "first_name": "TEST_Jane",
        "last_name": "Doe",
        "email": "test_jane@example.com",
        "service": service,
        "meeting_type": "Zoom Meeting",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 200, r.text
    created = r.json()
    assert created['id']
    assert created['service'] == service
    assert created['email_sent'] is False


def test_consultation_invalid_email(client):
    payload = {
        "first_name": "Test",
        "last_name": "User",
        "email": "not-an-email",
        "service": "Estate Planning — Wills",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 422


# ----- Contact -----
def test_contact_create(client):
    payload = {
        "name": "TEST_Contact",
        "email": "test_contact@example.com",
        "subject": "Inquiry",
        "message": "Please reach out.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data['id']
    assert data['name'] == "TEST_Contact"
    assert data['email_sent'] is False
