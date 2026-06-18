import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, Linkedin, Facebook, ChevronDown } from "lucide-react";
import { ASSETS } from "@/data/assets";

const NAV = [
  { to: "/", label: "Home" },
  {
    label: "Services",
    children: [
      { to: "/estate-planning", label: "Estate Planning" },
      { to: "/probate", label: "Probate" },
      { to: "/deeds", label: "Deeds" },
      { to: "/start-a-business", label: "Start A Business" },
    ],
  },
  { to: "/checklist", label: "Free Checklist" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Top utility bar */}
      <div className="bg-[#0F172A] text-[#F8FAFC] text-sm" data-testid="utility-bar">
        <div className="container-x py-2 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-4">
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <a href="tel:+15208697116" className="inline-flex items-center gap-2 hover:text-[#FBBF24]" data-testid="utility-phone">
              <Phone className="w-4 h-4" /> <span>+520-869-7116</span>
            </a>
            <a href="mailto:katrina@documentspreparer.com" className="hidden sm:inline-flex items-center gap-2 hover:text-[#FBBF24]" data-testid="utility-email">
              <Mail className="w-4 h-4" /> <span>katrina@documentspreparer.com</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#CBD5E1]">
            <MapPin className="w-4 h-4" />
            <span>Serving Tucson & all of Arizona · Mon–Fri 9–5 MST</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-[#CBD5E1] sticky top-0 z-50 shadow-sm" data-testid="site-header">
        <div className="container-x flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <img src={ASSETS.logo} alt="Legal Document Preparer, LLC" className="h-14 w-14 object-contain" />
            <div className="leading-tight hidden sm:block">
              <div className="font-[Outfit] font-bold text-lg text-[#0F172A]">Legal Document Preparer, LLC</div>
              <div className="text-xs text-[#92400E] uppercase tracking-widest font-semibold">C. Katrina Jean-Oase · AZCLDP</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV.map((n) =>
              n.children ? (
                <div
                  key={n.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className="px-3 py-2 rounded-md text-base font-medium text-[#334155] hover:text-[#1E3A8A] inline-flex items-center gap-1"
                    data-testid="nav-services"
                  >
                    {n.label} <ChevronDown className="w-4 h-4" />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 pt-2 w-64">
                      <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-lg overflow-hidden">
                        {n.children.map((c) => (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            className={({ isActive }) =>
                              `block px-4 py-3 text-base font-medium hover:bg-[#EFF4FB] ${
                                isActive ? "text-[#1E3A8A] bg-[#EFF4FB]" : "text-[#334155]"
                              }`
                            }
                            data-testid={`nav-service-${c.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {c.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  data-testid={`nav-${n.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "text-[#1E3A8A] underline underline-offset-4 decoration-2"
                        : "text-[#334155] hover:text-[#1E3A8A]"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              )
            )}
            <a href="tel:+15208697116" className="ml-2 inline-flex items-center gap-2 bg-[#15803D] text-white hover:bg-[#166534] px-4 py-3 rounded-md font-semibold" data-testid="header-call">
              <Phone className="w-4 h-4" /> Call
            </a>
            <Link
              to="/contact"
              data-testid="header-cta"
              className="inline-flex items-center gap-2 bg-[#D97706] text-white hover:bg-[#B45309] px-4 py-3 rounded-md font-semibold transition-colors"
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
              {NAV.map((n) =>
                n.children ? (
                  <div key={n.label} className="mt-1">
                    <div className="px-3 py-2 text-sm font-semibold uppercase tracking-widest text-[#92400E]">{n.label}</div>
                    {n.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        onClick={() => setOpen(false)}
                        data-testid={`mobile-nav-${c.label.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`px-4 py-3 rounded-md text-lg font-medium block ${
                          pathname === c.to ? "bg-[#F3F4F6] text-[#1E3A8A]" : "text-[#334155]"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`px-3 py-3 rounded-md text-lg font-medium ${
                      pathname === n.to ? "bg-[#F3F4F6] text-[#1E3A8A]" : "text-[#334155]"
                    }`}
                  >
                    {n.label}
                  </Link>
                )
              )}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <a href="tel:+15208697116" onClick={() => setOpen(false)} className="text-center bg-[#15803D] text-white px-4 py-3 rounded-md font-semibold inline-flex items-center justify-center gap-2" data-testid="mobile-call">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <Link to="/contact" onClick={() => setOpen(false)} className="text-center bg-[#D97706] text-white px-4 py-3 rounded-md font-semibold" data-testid="mobile-cta">
                  Free Consult
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Sticky mobile contact bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#CBD5E1] shadow-[0_-4px_12px_rgba(0,0,0,0.08)]" data-testid="sticky-mobile-cta">
        <div className="grid grid-cols-2">
          <a href="tel:+15208697116" className="flex items-center justify-center gap-2 py-3.5 text-[#15803D] font-semibold border-r border-[#CBD5E1]" data-testid="sticky-call">
            <Phone className="w-5 h-5" /> Call Now
          </a>
          <Link to="/contact" className="flex items-center justify-center gap-2 py-3.5 bg-[#D97706] text-white font-semibold" data-testid="sticky-consult">
            Free Consultation
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-[#F8FAFC] mt-20 pb-16 lg:pb-0" data-testid="site-footer">
        <div className="container-x py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={ASSETS.logo} alt="Legal Document Preparer, LLC" className="h-14 w-14 object-contain bg-white rounded-md p-1" />
              <div>
                <div className="font-[Outfit] font-bold text-xl">Legal Document Preparer, LLC</div>
                <div className="text-sm text-[#FBBF24]">C. Katrina Jean-Oase · AZCLDP · Enrolled Agent</div>
              </div>
            </div>
            <p className="mt-5 text-[#CBD5E1] leading-relaxed max-w-md">
              Helping Arizona families and small business owners protect what matters most — with precise, reliable,
              and confidential legal document preparation. Vision · Plan · Achieve.
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
            <h3 className="font-[Outfit] font-semibold text-lg text-white">Services</h3>
            <ul className="mt-4 space-y-3 text-[#CBD5E1]">
              <li><Link to="/estate-planning" className="hover:text-white">Estate Planning</Link></li>
              <li><Link to="/probate" className="hover:text-white">Probate</Link></li>
              <li><Link to="/deeds" className="hover:text-white">Deeds</Link></li>
              <li><Link to="/start-a-business" className="hover:text-white">Start a Business</Link></li>
              <li><Link to="/checklist" className="hover:text-white">Free Estate Planning Checklist</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
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
            <span>Enrolled Agent · AZCLDP — Not a law firm. We do not provide legal advice.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
