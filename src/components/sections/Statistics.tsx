import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 20, suffix: "+", label: "Years of Excellence", description: "Serving Singapore since 2004" },
  { value: 5000, suffix: "+", label: "Happy Patients", description: "And counting every day" },
  { value: 98, suffix: "%", label: "Recommendation Rate", description: "Verified Google reviews" },
  { value: 6, suffix: "", label: "Treatment Rooms", description: "State-of-the-art facilities" },
];

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (value - start) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      className="subtle-noise-bg"
      style={{
        padding: "6.5rem 0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #FAFCFF 50%, #F4F8FC 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient blur circles for depth */}
      <div
        className="ambient-blur-circle"
        style={{
          top: "10%",
          left: "2%",
          width: "380px",
          height: "380px",
          background: "radial-gradient(circle, rgba(79,183,197,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "10%",
          right: "2%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />
      {/* Decorative bg text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(8rem, 20vw, 20rem)",
          fontWeight: 800,
          color: "rgba(79,183,197,0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}
      >
        TRUST
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>By The Numbers</div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0B1220",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Results That Speak{" "}
            <span style={{ color: "#4FB7C5" }}>For Themselves.</span>
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Decorative top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "40px",
                  height: "3px",
                  borderRadius: "0 0 3px 3px",
                  background: "#4FB7C5",
                }}
              />

              <div
                style={{
                  fontFamily: "var(--font-numbers)",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#0B1220",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#0B1220",
                  marginBottom: "0.375rem",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.825rem",
                  color: "#9CA3AF",
                }}
              >
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
