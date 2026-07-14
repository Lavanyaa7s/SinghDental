import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="testimonial-card" style={{ transform: `rotate(${(Math.random() - 0.5) * 1.5}deg)` }}>
      {/* Stars */}
      <div style={{ display: "flex", gap: "0.2rem", marginBottom: "0.875rem" }}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
        ))}
      </div>

      {/* Review */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "#374151",
          lineHeight: 1.7,
          marginBottom: "1.25rem",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        "{testimonial.review}"
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}99)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "white",
            flexShrink: 0,
          }}
        >
          {testimonial.initials}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", color: "#0B1220" }}>
            {testimonial.name}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#9CA3AF" }}>
            {testimonial.treatment} · {testimonial.date}
          </div>
        </div>

        {/* Google G */}
        <div style={{ marginLeft: "auto" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Duplicate for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="subtle-noise-bg"
      style={{
        padding: "8.5rem 0",
        background: "linear-gradient(180deg, #F5F8FC 0%, #FFFFFF 50%, #F6F8FA 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient blur circles for depth */}
      <div
        className="ambient-blur-circle"
        style={{
          top: "20%",
          left: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(79,183,197,0.13) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "15%",
          right: "5%",
          width: "440px",
          height: "440px",
          background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="floating-subtle-shape"
        style={{
          top: "40%",
          left: "80%",
          width: "150px",
          height: "150px",
        }}
      />

      <div className="container" style={{ marginBottom: "3rem", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}
        >
          <div>
            <div className="section-label">Patient Stories</div>
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
              Loved By{" "}
              <span style={{ color: "#4FB7C5" }}>Thousands.</span>
            </h2>
          </div>

          {/* Rating summary */}
          <div
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: "16px",
              padding: "1rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-numbers)", fontSize: "2rem", fontWeight: 700, color: "#0B1220", lineHeight: 1 }}>4.9</div>
              <div style={{ display: "flex", gap: "0.15rem", marginTop: "0.25rem" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
            </div>
            <div style={{ width: "1px", height: "40px", background: "rgba(0,0,0,0.08)" }} />
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: "#0B1220" }}>500+ Reviews</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#9CA3AF" }}>on Google</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div style={{ position: "relative" }}>
        {/* Gradient fade edges */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, var(--color-gray-light), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, var(--color-gray-light), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Row 1 — LTR */}
        <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
          <div className="marquee-track">
            {allTestimonials.map((t, i) => (
              <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — RTL */}
        <div style={{ overflow: "hidden" }}>
          <div
            className="marquee-track"
            style={{ animationDirection: "reverse", animationDuration: "50s" }}
          >
            {[...allTestimonials].reverse().map((t, i) => (
              <TestimonialCard key={`${t.id}-rev-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
