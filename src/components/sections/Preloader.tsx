import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Animate bar from 0% to 100%
    const start = performance.now();
    const duration = 2000;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      bar.style.width = `${eased * 100}%`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <motion.div
      className="preloader"
      exit={{
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(79,183,197,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
      >
        {/* Tooth SVG Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ marginBottom: "1rem" }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="16" fill="rgba(79,183,197,0.15)" />
            <path
              d="M28 10C22 10 17 14 17 19.5C17 22.5 18.5 25 18.5 25C18.5 25 19 29 19 32C19 36 20 46 23 46C26 46 26 40 28 40C30 40 30 46 33 46C36 46 37 36 37 32C37 29 37.5 25 37.5 25C37.5 25 39 22.5 39 19.5C39 14 34 10 28 10Z"
              fill="#4FB7C5"
              stroke="#4FB7C5"
              strokeWidth="0"
            />
            <path
              d="M24 18C24 18 21 19 21 22"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        <div className="preloader-logo">
          Singh<span style={{ color: "#4FB7C5" }}>Dental</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
          Premium Dental Care
        </p>
      </motion.div>

      <div className="preloader-bar-track" style={{ marginTop: "2.5rem" }}>
        <div ref={barRef} className="preloader-bar" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          marginTop: "1rem",
          color: "rgba(255,255,255,0.25)",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          fontFamily: "var(--font-body)",
        }}
      >
        Crafting Your Perfect Smile...
      </motion.p>
    </motion.div>
  );
}
