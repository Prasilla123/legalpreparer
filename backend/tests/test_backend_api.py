"""Backend API tests for Legal Document Preparer."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://business-docs-ready.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
def test_root_health(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"


# Blog list (seeded)
def test_blog_list_seeded(client):
    r = client.get(f"{API}/blog")
    assert r.status_code == 200
    posts = r.json()
    assert isinstance(posts, list)
    assert len(posts) >= 4
    slugs = {p['slug'] for p in posts}
    expected = {
        "understanding-warranty-vs-quitclaim-deeds",
        "writing-a-will-that-actually-works",
        "navigating-probate-in-arizona",
        "starting-an-llc-in-arizona",
    }
    assert expected.issubset(slugs)


# Blog detail success
def test_blog_detail_existing(client):
    r = client.get(f"{API}/blog/understanding-warranty-vs-quitclaim-deeds")
    assert r.status_code == 200
    data = r.json()
    assert data['slug'] == "understanding-warranty-vs-quitclaim-deeds"
    assert data['title']
    assert data['content']


# Blog detail 404
def test_blog_detail_not_found(client):
    r = client.get(f"{API}/blog/non-existent-slug-xyz")
    assert r.status_code == 404


# Consultation create + persist via GET
def test_consultation_create_and_list(client):
    payload = {
        "first_name": "TEST_Jane",
        "last_name": "Doe",
        "email": "test_jane@example.com",
        "service": "Deeds",
        "meeting_type": "Zoom Meeting",
        "preferred_date": "2026-02-15",
        "preferred_time": "10:00 AM",
        "message": "Test consultation",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 200, r.text
    created = r.json()
    assert created['id']
    assert created['first_name'] == "TEST_Jane"
    assert created['email'] == "test_jane@example.com"
    # email_sent should be False since RESEND_API_KEY is empty
    assert created['email_sent'] is False

    # List
    r2 = client.get(f"{API}/consultations")
    assert r2.status_code == 200
    items = r2.json()
    ids = [i['id'] for i in items]
    assert created['id'] in ids


# Validation: invalid email
def test_consultation_invalid_email(client):
    payload = {
        "first_name": "Test",
        "last_name": "User",
        "email": "not-an-email",
        "service": "Deeds",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 422


# Validation: missing required first_name
def test_consultation_missing_first_name(client):
    payload = {
        "last_name": "User",
        "email": "valid@example.com",
        "service": "Deeds",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 422


# Contact create
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
