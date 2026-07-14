import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: ["General Dentistry", "Braces & Invisalign", "Dental Implants", "Teeth Whitening", "Root Canal", "Children Dentistry"],
  Clinic: ["About Us", "Our Team", "Technology", "Gallery", "Patient Reviews", "Careers"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
};

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer
      style={{
        background: "var(--color-dark)",
        color: "white",
        paddingTop: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(79,183,197,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "4rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            paddingBottom: "4rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
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
                  letterSpacing: "-0.01em",
                }}
              >
                Singh<span style={{ color: "#4FB7C5" }}>Dental</span>
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "280px", marginBottom: "1.5rem" }}>
              Premium dental care with a personal touch. Trusted by families across Melaka for over a decade.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: <Phone size={14} />, text: "06-289 9393", href: "tel:062899393" },
                { icon: <MapPin size={14} />, text: "11, Jalan PS 2, Plaza Semabok, 75050 Melaka", href: "#" },
                { icon: <Clock size={14} />, text: "Mon–Fri: 9am–9pm | Sat: 9am–5pm | Sun: 9am–1pm", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.625rem",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.825rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4FB7C5")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                >
                  <span style={{ marginTop: "2px", flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "1.25rem",
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mega Footer Text */}
        <div ref={ref} style={{ overflow: "hidden", marginBottom: "3rem" }}>
          <motion.div
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="footer-mega-text">
              See You{" "}
              <span style={{ color: "#4FB7C5", fontStyle: "italic" }}>Smile</span>
              <br />
              Again.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            paddingBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Singh Dental Clinic Melaka. All rights reserved.
          </p>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.8rem",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4FB7C5")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
          >
            Back to top <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
