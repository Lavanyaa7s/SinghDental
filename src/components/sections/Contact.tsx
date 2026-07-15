import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Send, AlertCircle, MessageCircle } from "lucide-react";

const clinicHours = [
  { day: "Monday – Friday", hours: "9:00 AM – 9:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "9:00 AM – 1:00 PM" },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    color: "#1F2937",
    background: "white",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "0.375rem",
  };

  return (
    <section
      id="contact"
      className="subtle-noise-bg"
      style={{
        padding: "8.5rem 0",
        background: "linear-gradient(180deg, #F1F5F9 0%, #FFFFFF 50%, #F8FAFC 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient blur circles for depth */}
      <div
        className="ambient-blur-circle"
        style={{
          top: "15%",
          left: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(79,183,197,0.14) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "10%",
          right: "5%",
          width: "480px",
          height: "480px",
          background: "radial-gradient(circle, rgba(14,165,233,0.11) 0%, transparent 70%)",
        }}
      />
      <div
        className="floating-subtle-shape"
        style={{
          top: "35%",
          left: "70%",
          width: "160px",
          height: "160px",
          animationDelay: "1.5s",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>Get In Touch</div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0B1220",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Book Your{" "}
            <span style={{ color: "#4FB7C5" }}>Appointment.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#6B7280", maxWidth: "480px", margin: "0 auto" }}>
            Ready to transform your smile? Reach out and we'll be in touch within 24 hours.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "2.5rem",
              boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "3rem 0" }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🦷✨</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem", color: "#0B1220", marginBottom: "0.75rem" }}>
                  Appointment Request Sent!
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#6B7280", maxWidth: "340px", margin: "0 auto" }}>
                  Thank you! Our front desk team will contact you shortly via phone/WhatsApp to confirm your slot.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: "1.5rem",
                    padding: "0.75rem 1.5rem",
                    background: "#4FB7C5",
                    color: "white",
                    border: "none",
                    borderRadius: "999px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "#0B1220", marginBottom: "1.5rem" }}>
                  Request an Appointment
                </h3>

                {/* Name & Email */}
                <div className="contact-form-row">
                  <div>
                    <label htmlFor="name" style={labelStyle}>Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#4FB7C5";
                        e.target.style.boxShadow = "0 0 0 3px rgba(79,183,197,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(0,0,0,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#4FB7C5";
                        e.target.style.boxShadow = "0 0 0 3px rgba(79,183,197,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(0,0,0,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Phone & Service */}
                <div className="contact-form-row">
                  <div>
                    <label htmlFor="phone" style={labelStyle}>Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+65 9123 4567"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#4FB7C5";
                        e.target.style.boxShadow = "0 0 0 3px rgba(79,183,197,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(0,0,0,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" style={labelStyle}>Service Required</label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "#4FB7C5";
                        (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(79,183,197,0.12)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
                        (e.target as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select a service</option>
                      <option>General Dentistry</option>
                      <option>Braces & Invisalign</option>
                      <option>Dental Implants</option>
                      <option>Teeth Whitening</option>
                      <option>Scaling & Polishing</option>
                      <option>Root Canal</option>
                      <option>Children Dentistry</option>
                      <option>Emergency Dental</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date */}
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="date" style={labelStyle}>Preferred Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formState.date}
                    onChange={handleChange}
                    style={inputStyle}
                    min={new Date().toISOString().split("T")[0]}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#4FB7C5";
                      e.target.style.boxShadow = "0 0 0 3px rgba(79,183,197,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,0,0,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="message" style={labelStyle}>Additional Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell us about your concerns or questions..."
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#4FB7C5";
                      e.target.style.boxShadow = "0 0 0 3px rgba(79,183,197,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,0,0,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "0.9rem",
                    background: loading ? "#9CA3AF" : "#4FB7C5",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "background 0.3s ease",
                  }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: "16px", height: "16px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Request Appointment
                    </>
                  )}
                </motion.button>

                <p style={{ marginTop: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#9CA3AF", textAlign: "center" }}>
                  We'll respond within 24 hours. Your data is private and secure.
                </p>
              </form>
            )}
          </motion.div>

          {/* Right info column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Map */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                height: "280px",
              }}
            >
              <iframe
                title="Singh Dental Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.8206!2d102.2618!3d2.1970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d1f1e000000000%3A0x0!2sPlaza%20Semabok%2C%20Melaka!5e0!3m2!1sen!2smy!4v1706000000000!5m2!1sen!2smy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info cards */}
            {[
              {
                icon: <MapPin size={18} color="#4FB7C5" />,
                title: "Visit Us",
                content: "11, Jalan PS 2, Plaza Semabok\n75050 Melaka",
              },
              {
                icon: <Phone size={18} color="#4FB7C5" />,
                title: "Call Us",
                content: "06-289 9393\n(Mon–Fri: 9am–9pm | Sat: 9am–5pm | Sun: 9am–1pm)",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  border: "1px solid rgba(0,0,0,0.04)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(79,183,197,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", color: "#0B1220", marginBottom: "0.25rem" }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                    {item.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Clinic Hours */}
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "1.25rem 1.5rem",
                border: "1px solid rgba(0,0,0,0.04)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(79,183,197,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Clock size={18} color="#4FB7C5" />
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", color: "#0B1220" }}>
                  Clinic Hours
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {clinicHours.map((h) => (
                  <div
                    key={h.day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.825rem",
                    }}
                  >
                    <span style={{ color: "#6B7280" }}>{h.day}</span>
                    <span style={{ fontWeight: 500, color: "#0B1220" }}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency banner */}
            <div
              style={{
                background: "linear-gradient(135deg, #DC2626, #b91c1c)",
                borderRadius: "16px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <AlertCircle size={24} color="white" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", color: "white", marginBottom: "0.2rem" }}>
                  Need Immediate Dental Care?
                </div>
                <a
                  href="tel:062899393"
                  style={{
                    fontFamily: "var(--font-numbers)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  06-289 9393
                </a>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
                  Call us today for priority slots
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/6062899393?text=Hi%20Singh%20Dental!%20I'd%20like%20to%20book%20an%20appointment."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} color="white" fill="white" />
      </a>
    </section>
  );
}
