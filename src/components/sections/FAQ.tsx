import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faq";
import { Plus } from "lucide-react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      className="subtle-noise-bg"
      style={{
        padding: "8.5rem 0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient blur circles for depth */}
      <div
        className="ambient-blur-circle"
        style={{
          top: "15%",
          right: "-5%",
          width: "420px",
          height: "420px",
          background: "radial-gradient(circle, rgba(79,183,197,0.13) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "10%",
          left: "-5%",
          width: "440px",
          height: "440px",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="floating-subtle-shape"
        style={{
          top: "50%",
          left: "5%",
          width: "130px",
          height: "130px",
        }}
      />

      <div className="container">
        <div className="faq-grid">
          {/* Left sticky on desktop, normal stacked on mobile */}
          <div className="faq-sidebar">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-label">FAQ</div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 3vw, 2.75rem)",
                  color: "#0B1220",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                Got Questions?<br />
                <span style={{ color: "#4FB7C5" }}>We've Got</span>
                <br />Answers.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "#6B7280",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                Can't find what you're looking for? Our team is always happy to help.
              </p>
              <motion.a
                href="tel:06-2899393"
                className="btn-outline-dark"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex" }}
              >
                Call Us
              </motion.a>
            </motion.div>
          </div>

          {/* Accordion */}
          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="accordion-item"
              >
                <button
                  className="accordion-trigger"
                  data-open={openId === faq.id ? "true" : "false"}
                  onClick={() => toggle(faq.id)}
                  aria-expanded={openId === faq.id}
                  id={`faq-trigger-${faq.id}`}
                >
                  <span style={{ paddingRight: "1rem", lineHeight: 1.4 }}>{faq.question}</span>
                  <div className="accordion-icon">
                    <motion.div
                      animate={{ rotate: openId === faq.id ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Plus size={14} color={openId === faq.id ? "white" : "#374151"} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                      role="region"
                      aria-labelledby={`faq-trigger-${faq.id}`}
                    >
                      <div style={{ paddingBottom: "1.5rem" }}>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.95rem",
                            color: "#6B7280",
                            lineHeight: 1.8,
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
