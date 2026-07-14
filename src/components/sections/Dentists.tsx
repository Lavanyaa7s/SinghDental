import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dentists } from "@/data/dentists";
import { X, GraduationCap, Award } from "lucide-react";

// ── Real Specialist Medical Photography Mapping ──────────────────────────
const doctorPhotos: Record<string, string> = {
  "dr-harjinder": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
  "dr-preethi":   "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
  "dr-rajiv":     "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
};

const doctorColors: Record<string, { primary: string; secondary: string }> = {
  "dr-harjinder": { primary: "#4FB7C5", secondary: "#0e8fa0" },
  "dr-preethi":   { primary: "#7C3AED", secondary: "#5a22c4" },
  "dr-rajiv":     { primary: "#059669", secondary: "#047857" },
};

// ── Dentist Card Component ───────────────────────────────────────────────
function DentistCard({ dentist, onClick }: { dentist: typeof dentists[0]; onClick: () => void }) {
  const colors = doctorColors[dentist.id] || { primary: "#4FB7C5", secondary: "#2d8e9b" };
  const color = colors.primary;
  const photoUrl = doctorPhotos[dentist.id] || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: "28px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Real Portrait Photo Header */}
      <div
        style={{
          height: "300px",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${photoUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
        }}
      >
        {/* Subtle gradient overlay at bottom for clean text transition */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Specialty badge */}
        <div
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${color}40`,
            borderRadius: "999px",
            padding: "0.35rem 0.85rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: color,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {dentist.specialization.split("&")[0].trim()}
        </div>
      </div>

      {/* Info Body */}
      <div style={{ padding: "1.75rem" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "1.35rem",
            color: "#0B1220",
            letterSpacing: "-0.01em",
            marginBottom: "0.25rem",
          }}
        >
          {dentist.name}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#6B7280", marginBottom: "1.125rem" }}>
          {dentist.role}
        </p>

        {/* Experience stat */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.125rem" }}>
          <Award size={16} color={color} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "#4B5563", fontWeight: 600 }}>
            {dentist.experience} clinical experience
          </span>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {dentist.badges.slice(0, 3).map((badge) => (
            <span
              key={badge}
              style={{
                padding: "0.25rem 0.7rem",
                borderRadius: "999px",
                background: `${color}12`,
                border: `1px solid ${color}25`,
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: color,
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.88rem",
            fontWeight: 700,
            color: color,
          }}
        >
          View Clinical Profile →
        </div>
      </div>
    </motion.div>
  );
}

// ── Specialist Detail Modal ──────────────────────────────────────────────
function DentistModal({ dentist, onClose }: { dentist: typeof dentists[0]; onClose: () => void }) {
  const colors = doctorColors[dentist.id] || { primary: "#4FB7C5", secondary: "#2d8e9b" };
  const color = colors.primary;
  const photoUrl = doctorPhotos[dentist.id] || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,18,32,0.8)",
        backdropFilter: "blur(12px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "32px",
          maxWidth: "680px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 40px 120px rgba(0,0,0,0.35)",
        }}
      >
        {/* Modal Header with Portrait */}
        <div
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}04)`,
            padding: "2.25rem",
            borderRadius: "32px 32px 0 0",
            position: "relative",
            borderBottom: `1px solid ${color}20`,
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(0,0,0,0.06)",
              border: "none",
              borderRadius: "50%",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#6B7280",
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                backgroundImage: `url(${photoUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center 20%",
                border: `3px solid white`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color,
                  marginBottom: "0.35rem",
                }}
              >
                {dentist.specialization}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "1.65rem",
                  color: "#0B1220",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.25rem",
                }}
              >
                {dentist.name}
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#6B7280" }}>
                {dentist.role} · {dentist.experience}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "2rem 2.25rem 2.25rem" }}>
          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {dentist.badges.map((badge) => (
              <span
                key={badge}
                style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  background: `${color}12`,
                  border: `1px solid ${color}28`,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color,
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "#4B5563",
              lineHeight: 1.8,
              marginBottom: "1.75rem",
            }}
          >
            {dentist.bio}
          </p>

          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              paddingTop: "1.75rem",
              marginBottom: "1.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <GraduationCap size={20} color={color} />
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "#0B1220" }}>
                Education & Clinical Credentials
              </span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {dentist.education.map((edu, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "#4B5563",
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                  {edu}
                </li>
              ))}
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onClose();
              setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 300);
            }}
            style={{
              width: "100%",
              padding: "1rem",
              background: color,
              color: "white",
              border: "none",
              borderRadius: "16px",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: `0 8px 24px ${color}40`,
            }}
          >
            Book Consultation with {dentist.name.split(" ")[0]} {dentist.name.split(" ")[1]}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Dentists Section ────────────────────────────────────────────────
export default function Dentists() {
  const [selected, setSelected] = useState<typeof dentists[0] | null>(null);

  return (
    <section
      id="dentists"
      className="subtle-noise-bg"
      style={{
        padding: "8.5rem 0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #FAFCFF 50%, #F5F8FC 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient blur circles for depth */}
      <div
        className="ambient-blur-circle"
        style={{
          top: "10%",
          left: "-4%",
          width: "420px",
          height: "420px",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "10%",
          right: "-4%",
          width: "460px",
          height: "460px",
          background: "radial-gradient(circle, rgba(79,183,197,0.14) 0%, transparent 70%)",
        }}
      />
      <div
        className="floating-subtle-shape"
        style={{
          top: "45%",
          right: "8%",
          width: "160px",
          height: "160px",
          animationDelay: "2s",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            The Clinical Team
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#0B1220",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Meet Your <span style={{ color: "#4FB7C5" }}>Specialists.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "#6B7280",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Our team of internationally trained clinicians combines precision dentistry with a warm, empathetic approach to patient care.
          </p>
        </motion.div>

        <div className="dentists-grid">
          {dentists.map((dentist) => (
            <DentistCard key={dentist.id} dentist={dentist} onClick={() => setSelected(dentist)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <DentistModal dentist={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
