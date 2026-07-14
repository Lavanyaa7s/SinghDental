import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUpVariants, clipRevealVariants } from "@/hooks/useScrollAnimation";
import { CheckCircle2, ShieldCheck, MapPin, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  "Founded in 2004 by Dr. Harjinder Singh",
  "Located at Plaza Semabok, Melaka",
  "6 fully-equipped, state-of-the-art treatment rooms",
  "Digital 3D scanning — no messy impressions",
  "CEREC same-day crowns & restorations",
  "Multilingual team: English, Mandarin, Malay, Tamil",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, controls, isInView } = useScrollReveal(0.2);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Image scale on scroll
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="subtle-noise-bg"
      style={{
        padding: "8.5rem 0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F6F8FA 50%, #EEF2F6 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow spheres for depth */}
      <div
        className="ambient-blur-circle"
        style={{
          top: "10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(79,183,197,0.14) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "10%",
          right: "-5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="floating-subtle-shape"
        style={{
          top: "60%",
          left: "45%",
          width: "180px",
          height: "180px",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="about-grid">
          {/* Image column */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              aspectRatio: "4/5",
              boxShadow: "0 24px 64px rgba(11, 18, 32, 0.12)",
            }}
          >
            <div ref={imageRef} style={{ width: "100%", height: "100%" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url(https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "2.5rem",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(11,18,32,0.2) 0%, transparent 40%, rgba(11,18,32,0.88) 100%)",
                  }}
                />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ color: "#4FB7C5", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Est. 2004 · Plaza Semabok, Melaka
                  </div>
                  <div style={{ marginTop: "0.25rem", color: "white", fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    20+ Years of Clinical Excellence
                  </div>
                </div>
              </div>
            </div>

            {/* Top Left Floating VIP Award Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                background: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(12px)",
                borderRadius: "14px",
                padding: "0.6rem 1rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                border: "1px solid rgba(79,183,197,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                zIndex: 3,
              }}
            >
              <Sparkles size={16} color="#4FB7C5" />
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.78rem", color: "#0B1220", letterSpacing: "0.03em" }}>
                Melaka's Premier VIP Center
              </span>
            </motion.div>

            {/* Floating badge bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "1.5rem",
                background: "white",
                borderRadius: "16px",
                padding: "1rem 1.25rem",
                boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                zIndex: 3,
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #4FB7C5, #3a9aa8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle2 size={20} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-numbers)", fontWeight: 700, fontSize: "1.1rem", color: "#0B1220" }}>98%</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#6B7280" }}>Recommendation Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <div ref={textRef}>
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="section-label">Our Story</div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#0B1220",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
              }}
            >
              Where Precision Meets{" "}
              <span style={{ color: "#4FB7C5" }}>Compassion.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "#6B7280",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              Singh Dental Clinic was founded in 2004 with a simple but powerful belief: every patient deserves world-class dental care delivered with genuine warmth and respect. Two decades later, that belief drives everything we do.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "#6B7280",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              From our first patient to our 5,000th, we've remained committed to investing in the latest technology, the finest materials, and ongoing clinical education — all so that you receive care that rivals the best clinics in the world, right here in Melaka.
            </motion.p>

            {/* Highlights list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(79,183,197,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={12} color="#4FB7C5" />
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#374151" }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ display: "inline-flex", marginTop: "2rem" }}
            >
              Book Your Visit
            </motion.a>

            {/* VIP Patient Assurance & Clinic Accessibility Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: "2.75rem",
                padding: "1.5rem",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(14px)",
                borderRadius: "20px",
                border: "1px solid rgba(79,183,197,0.25)",
                boxShadow: "0 12px 36px rgba(11,18,32,0.06)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(79,183,197,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#4FB7C5",
                  }}
                >
                  <MapPin size={19} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "#0B1220" }}>
                    Plaza Semabok VIP
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.45, marginTop: "0.15rem" }}>
                    Easy storefront VIP parking right outside our doors
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(124,58,237,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#7C3AED",
                  }}
                >
                  <Clock size={19} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "#0B1220" }}>
                    Open 7 Days a Week
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.45, marginTop: "0.15rem" }}>
                    Mon–Sat 9am–9pm · Sun 9am–1pm
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(5,150,105,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#059669",
                  }}
                >
                  <ShieldCheck size={19} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "#0B1220" }}>
                    20+ Years Assurance
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.45, marginTop: "0.15rem" }}>
                    5,000+ verified patients with 98% 5-star reviews
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
