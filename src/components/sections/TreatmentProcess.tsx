import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MessageCircle, Monitor, Stethoscope, Smile } from "lucide-react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const steps = [
  { icon: <Calendar size={24} />, title: "Book Appointment", description: "Schedule online or call us — we'll find the perfect time for you.", color: "#4FB7C5" },
  { icon: <MessageCircle size={24} />, title: "Consultation", description: "Meet your dentist, discuss goals, and create your personalised treatment plan.", color: "#7C3AED" },
  { icon: <Monitor size={24} />, title: "Digital Scan", description: "3D intraoral scanning for precision — no messy impressions required.", color: "#059669" },
  { icon: <Stethoscope size={24} />, title: "Treatment", description: "Expert care delivered with the latest technology and the utmost comfort.", color: "#D97706" },
  { icon: <Smile size={24} />, title: "Healthy Smile", description: "Leave with a radiant, healthy smile and a plan to keep it that way.", color: "#EC4899" },
];

export default function TreatmentProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGLineElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the path drawing
      const path = pathRef.current;
      if (path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="subtle-noise-bg"
      style={{
        padding: "8.5rem 0",
        background: "var(--color-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(79,183,197,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>Your Journey</div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            From Booking to{" "}
            <span style={{ color: "#4FB7C5" }}>Brilliant Smile.</span>
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="process-steps-container">
          {/* Connecting SVG Path */}
          <svg
            style={{
              position: "absolute",
              top: "28px",
              left: "10%",
              width: "80%",
              height: "4px",
              overflow: "visible",
            }}
            viewBox="0 0 800 4"
            preserveAspectRatio="none"
          >
            {/* Background track */}
            <line x1="0" y1="2" x2="800" y2="2" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            {/* Animated progress path */}
            <line
              ref={pathRef}
              x1="0"
              y1="2"
              x2="800"
              y2="2"
              stroke="#4FB7C5"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: "easeOut" }}
              className="process-step"
            >
              {/* Icon bubble */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: "backOut" }}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${step.color}25, ${step.color}08)`,
                  border: `2px solid ${step.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: step.color,
                  position: "relative",
                  zIndex: 2,
                  boxShadow: `0 0 0 6px ${step.color}10`,
                }}
              >
                {step.icon}

                {/* Step number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: step.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-numbers)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {i + 1}
                </div>
              </motion.div>

              {/* Arrow (not on last item) */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "28px",
                    right: "-16px",
                    color: "rgba(79,183,197,0.4)",
                    zIndex: 3,
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    pointerEvents: "none",
                  }}
                >
                  ↓
                </div>
              )}

              <div style={{ textAlign: "center", padding: "0 0.75rem" }}>
                <h4
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "white",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.375rem",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                    maxWidth: "150px",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginTop: "4rem" }}
        >
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{ display: "inline-flex" }}
          >
            Begin Your Journey
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
