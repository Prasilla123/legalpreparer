import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, Linkedin, Facebook } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Top utility bar */}
      <div className="bg-[#0F172A] text-[#F8FAFC] text-sm" data-testid="utility-bar">
        <div className="container-x py-2 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-4">
          <div className="flex items-center gap-5">
            <a href="tel:+15208697116" className="inline-flex items-center gap-2 hover:text-[#FBBF24]" data-testid="utility-phone">
              <Phone className="w-4 h-4" /> <span>+520-869-7116</span>
            </a>
            <a href="mailto:katrina@documentspreparer.com" className="hidden sm:inline-flex items-center gap-2 hover:text-[#FBBF24]" data-testid="utility-email">
              <Mail className="w-4 h-4" /> <span>katrina@documentspreparer.com</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#CBD5E1]">
            <MapPin className="w-4 h-4" />
            <span>7802 E Escalante Rd, Tucson, AZ 85730</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-[#CBD5E1] sticky top-0 z-50" data-testid="site-header">
        <div className="container-x flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <div className="w-11 h-11 rounded-md bg-[#1E3A8A] text-white grid place-items-center font-bold text-lg" aria-hidden>
              LD
            </div>
            <div className="leading-tight">
              <div className="font-[Outfit] font-bold text-lg text-[#0F172A]">Legal Document Preparer</div>
              <div className="text-xs text-[#475569] uppercase tracking-widest">Vision · Plan · Achieve</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                data-testid={`nav-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-lg font-medium transition-colors ${
                    isActive
                      ? "text-[#1E3A8A] underline underline-offset-4 decoration-2"
                      : "text-[#334155] hover:text-[#1E3A8A] hover:underline underline-offset-4"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              data-testid="header-cta"
              className="ml-4 inline-flex items-center gap-2 bg-[#D97706] text-white hover:bg-[#B45309] px-5 py-3 rounded-md font-semibold transition-colors"
            >
              Free Consultation
            </Link>
          </nav>

          <button
            className="lg:hidden p-2 rounded-md border border-[#CBD5E1]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-[#CBD5E1] bg-white" data-testid="mobile-menu">
            <div className="container-x py-3 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                  className={`px-3 py-3 rounded-md text-lg font-medium ${
                    pathname === n.to ? "bg-[#F3F4F6] text-[#1E3A8A]" : "text-[#334155]"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 text-center bg-[#D97706] text-white px-5 py-3 rounded-md font-semibold"
                data-testid="mobile-cta"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-[#F8FAFC] mt-20" data-testid="site-footer">
        <div className="container-x py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-[Outfit] font-bold text-2xl">Legal Document Preparer, LLC</div>
            <p className="mt-4 text-[#CBD5E1] leading-relaxed max-w-md">
              Providing expert legal document preparation services with precision, reliability,
              and confidentiality. Let our experience be your guide.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://www.linkedin.com/in/katrina-oase/" target="_blank" rel="noreferrer" className="w-11 h-11 grid place-items-center rounded-md bg-[#1E3A8A] hover:bg-[#1E40AF]" data-testid="footer-linkedin" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/executivetoastmasterstucson/" target="_blank" rel="noreferrer" className="w-11 h-11 grid place-items-center rounded-md bg-[#1E3A8A] hover:bg-[#1E40AF]" data-testid="footer-facebook" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-[Outfit] font-semibold text-lg text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-[#CBD5E1]">
              <li><Link to="/services/deeds" className="hover:text-white">Deeds</Link></li>
              <li><Link to="/services/will-preparation" className="hover:text-white">Estate Planning</Link></li>
              <li><Link to="/services/estate-probate" className="hover:text-white">Probate</Link></li>
              <li><Link to="/services/start-a-business" className="hover:text-white">Start a Business</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Free Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-[Outfit] font-semibold text-lg text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-[#CBD5E1]">
              <li className="flex items-start gap-3"><Phone className="w-5 h-5 mt-0.5 text-[#FBBF24]" /> +520-869-7116</li>
              <li className="flex items-start gap-3"><Mail className="w-5 h-5 mt-0.5 text-[#FBBF24]" /> katrina@documentspreparer.com</li>
              <li className="flex items-start gap-3"><MapPin className="w-5 h-5 mt-0.5 text-[#FBBF24]" /> 7802 E Escalante Rd<br/>Tucson, AZ 85730</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1E293B]">
          <div className="container-x py-5 text-sm text-[#94A3B8] flex flex-col md:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} Legal Document Preparer, LLC. All rights reserved.</span>
            <span>Enrolled Agent · AZCLDP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
