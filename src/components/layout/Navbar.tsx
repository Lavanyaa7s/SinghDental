import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#dentists", label: "Our Team" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}
            whileHover={{ scale: 1.02 }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #4FB7C5, #3a9aa8)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 56 56" fill="none">
                <path
                  d="M28 8C22 8 17 12 17 17.5C17 20.5 18.5 23 18.5 23C18.5 23 19 27 19 30C19 34 20 44 23 44C26 44 26 38 28 38C30 38 30 44 33 44C36 44 37 34 37 30C37 27 37.5 23 37.5 23C37.5 23 39 20.5 39 17.5C39 12 34 8 28 8Z"
                  fill="white"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: scrolled ? "#0B1220" : "white",
                letterSpacing: "-0.01em",
                transition: "color 0.5s ease",
              }}
            >
              Singh<span style={{ color: "#4FB7C5" }}>Dental</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div
            className="nav-links-desktop"
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: scrolled ? "#1F2937" : "rgba(255,255,255,0.8)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#4FB7C5";
                  (e.target as HTMLElement).style.background = scrolled
                    ? "rgba(79,183,197,0.08)"
                    : "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = scrolled
                    ? "#1F2937"
                    : "rgba(255,255,255,0.8)";
                  (e.target as HTMLElement).style.background = "none";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="tel:062899393"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: scrolled ? "#1F2937" : "rgba(255,255,255,0.7)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              className="nav-links-desktop"
            >
              <Phone size={14} />
              06-289 9393
            </a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick("#contact")}
              className="nav-book-btn"
              style={{
                background: "#4FB7C5",
                color: "white",
                border: "none",
                borderRadius: "999px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(79,183,197,0.35)",
              }}
            >
              Book Appointment
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              className="nav-mobile-trigger"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: scrolled ? "#1F2937" : "white",
                display: "flex",
                alignItems: "center",
                padding: "0.25rem",
              }}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: "70px",
              left: "1rem",
              right: "1rem",
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "1.5rem",
              zIndex: 999,
              boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => handleNavClick(link.href)}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.875rem 1rem",
                  borderRadius: "12px",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#1F2937",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(79,183,197,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "#4FB7C5";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "none";
                  (e.currentTarget as HTMLElement).style.color = "#1F2937";
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: "1rem", paddingTop: "1rem" }}>
              <a
                href="tel:062899393"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "#4FB7C5",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                <Phone size={15} />
                06-289 9393
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
