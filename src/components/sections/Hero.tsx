import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Star, Users, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["Smile", "With", "Confidence."];
const subtitle = "Modern Dentistry Designed Around You.";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="hero-section" id="home" style={{ minHeight: "100dvh" }}>
      {/* Background */}
      <motion.div
        className="hero-bg"
        style={{ y: bgY }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(11,18,32,0.92) 0%, rgba(11,18,32,0.72) 50%, rgba(11,18,32,0.88) 100%)",
          }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div className="hero-grid" />

      {/* Ambient glows */}
      <div
        className="hero-glow"
        style={{
          top: "20%",
          right: "10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(79,183,197,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="hero-glow"
        style={{
          bottom: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="container"
        style={{ y: contentY, position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "4rem" }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(79,183,197,0.12)",
            border: "1px solid rgba(79,183,197,0.25)",
            borderRadius: "999px",
            padding: "0.375rem 0.875rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4FB7C5" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#4FB7C5", fontWeight: 500 }}>
            Melaka's Premier Dental Clinic
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "white",
            marginBottom: "0.25rem",
            maxWidth: "900px",
          }}
        >
          {words.map((word, i) => (
            <span key={i} className="word" style={{ marginRight: "0.25em" }}>
              <motion.span
                className="word-inner"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  display: "inline-block",
                  color: i === 2 ? "#4FB7C5" : "white",
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "2.5rem",
            maxWidth: "540px",
            lineHeight: 1.5,
            marginTop: "1.5rem",
          }}
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}
        >
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(79,183,197,0.45)" }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Appointment <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="#services"
            className="btn-outline"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Our Services
          </motion.a>
        </motion.div>

        {/* Floating Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          {[
            {
              icon: <Star size={16} fill="#F59E0B" color="#F59E0B" />,
              label: "5-Star Rated",
              sub: "Google Reviews",
              anim: "float-animation",
            },
            {
              icon: <Users size={16} color="#4FB7C5" />,
              label: "5,000+ Happy",
              sub: "Patients",
              anim: "float-animation-delay",
            },
            {
              icon: <Award size={16} color="#7C3AED" />,
              label: "20+ Years",
              sub: "Experience",
              anim: "float-animation",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`glass ${card.anim}`}
              style={{
                borderRadius: "16px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-numbers)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "white",
                    lineHeight: 1.2,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {card.sub}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} color="rgba(255,255,255,0.4)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
