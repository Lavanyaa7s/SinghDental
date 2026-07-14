import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope, Smile, Shield, Sparkles, Wind, Activity,
  Heart, AlertCircle, X, Clock, Calendar, CheckCircle2, ArrowRight,
  Layers, Sparkle, Eye
} from "lucide-react";
import { services, Service } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// -- Icon Map -----------------------------------------------------------
const IconMap: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope size={28} />,
  Smile: <Smile size={28} />,
  Shield: <Shield size={28} />,
  Sparkles: <Sparkles size={28} />,
  Wind: <Wind size={28} />,
  Activity: <Activity size={28} />,
  Heart: <Heart size={28} />,
  AlertCircle: <AlertCircle size={28} />,
};

// -- High-Resolution Clinical Macro & Interior Photography Map -----------
const serviceImageMap: Record<string, string> = {
  general: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
  braces: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
  implants: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800",
  whitening: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  scaling: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
  rootcanal: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800",
  children: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  emergency: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800",
};

// -- Extended service details -------------------------------------------
const serviceDetails: Record<string, {
  duration: string;
  frequency: string;
  longDescription: string;
  process: { title: string; desc: string }[];
  benefits: string[];
  ideal: string;
}> = {
  general: {
    duration: "45–60 min",
    frequency: "Every 6 months",
    longDescription:
      "General dentistry forms the cornerstone of a healthy smile. Our comprehensive check-ups go beyond the obvious — we assess gum health, screen for oral cancer, review bite alignment, and use digital X-rays to catch issues years before they become painful. Prevention always costs less than cure.",
    process: [
      { title: "Digital X-Ray", desc: "Low-radiation digital imaging gives a full picture of what's happening beneath the surface." },
      { title: "Gum Probing", desc: "We measure pocket depths to detect the earliest signs of periodontal disease." },
      { title: "Oral Cancer Screen", desc: "A systematic check of soft tissues including tongue, cheeks and throat." },
      { title: "Personalised Plan", desc: "We walk you through findings and agree a care plan together, with zero pressure." },
    ],
    benefits: ["Early detection of decay", "Prevention of gum disease", "Oral cancer screening", "Custom home-care advice", "Digital records for trend tracking"],
    ideal: "Suitable for all ages. Recommended every 6 months.",
  },
  braces: {
    duration: "12–24 months",
    frequency: "Monthly adjustments",
    longDescription:
      "Misaligned teeth affect more than aesthetics — they can cause jaw pain, uneven wear and difficulty cleaning. We offer the full spectrum of orthodontic solutions from traditional metal braces to virtually invisible Invisalign aligners, all guided by our MSc-qualified orthodontist Dr. Preethi Kaur.",
    process: [
      { title: "3D Digital Scan", desc: "No impressions needed. We scan your teeth in minutes and create a full 3D model." },
      { title: "Treatment Simulation", desc: "See a preview of your end result on-screen before committing to treatment." },
      { title: "Fitting Session", desc: "Braces or first aligners are placed comfortably, usually within 2 weeks." },
      { title: "Progress Reviews", desc: "Monthly check-ins keep your treatment on track. We fine-tune adjustments digitally." },
    ],
    benefits: ["Straighter teeth & improved bite", "Easier cleaning & better hygiene", "Reduced jaw strain", "Boosted self-confidence", "Long-lasting results with retainer"],
    ideal: "Ideal from age 12 upward. Adults welcome. Free consultation available.",
  },
  implants: {
    duration: "3–6 months total",
    frequency: "2–4 appointments",
    longDescription:
      "A dental implant is the gold standard for replacing a missing tooth. A titanium post is placed directly into the jawbone, where it integrates over 8–12 weeks. The result is a replacement tooth that looks, feels and functions exactly like the real thing — with no need to shave adjacent teeth.",
    process: [
      { title: "CBCT 3D Scan", desc: "We map your bone structure in 3D to plan the exact implant position with surgical precision." },
      { title: "Implant Placement", desc: "The titanium post is placed under local anaesthetic. Most patients report minimal discomfort." },
      { title: "Osseointegration", desc: "Over 8–12 weeks, the implant fuses naturally with your jawbone." },
      { title: "Crown Fitting", desc: "A custom-milled CEREC crown is fitted, perfectly colour-matched to your natural teeth." },
    ],
    benefits: ["Permanent tooth replacement", "Preserves jawbone density", "No impact on adjacent teeth", "35+ year lifespan", "No special maintenance needed"],
    ideal: "Suitable for most adults with sufficient bone density. Bone grafting available if needed.",
  },
  whitening: {
    duration: "60–90 min",
    frequency: "Single session",
    longDescription:
      "Our in-chair professional whitening system uses a clinically formulated gel activated by LED light to break down stains deep within the enamel. Unlike supermarket strips, professional whitening is safe, effective, and supervised — delivering up to 8 shades lighter in a single visit.",
    process: [
      { title: "Shade Assessment", desc: "We photograph and record your baseline shade using a digital shade guide." },
      { title: "Gum Protection", desc: "A protective barrier shields your gums throughout treatment." },
      { title: "Gel Activation", desc: "Three 20-minute LED sessions progressively lighten the enamel." },
      { title: "Final Shade Check", desc: "We photograph the result and advise on maintenance to preserve your new shade." },
    ],
    benefits: ["Up to 8 shades lighter", "Single-visit treatment", "Long-lasting results", "Safe for enamel", "Take-home kit for top-ups"],
    ideal: "Best for adults with naturally discoloured or stained teeth. Not suitable for veneers or crowns.",
  },
  scaling: {
    duration: "30–45 min",
    frequency: "Every 6 months",
    longDescription:
      "Even with perfect brushing, tartar builds up in areas only professional instruments can reach. Our ultrasonic scaling and air-polishing combination removes hard deposits, polishes all surfaces, and leaves your mouth feeling factory-fresh. It's the single best preventive investment you can make.",
    process: [
      { title: "Plaque Index", desc: "We assess where plaque is accumulating and tailor the clean accordingly." },
      { title: "Ultrasonic Scaling", desc: "High-frequency vibrations shatter and remove tartar painlessly." },
      { title: "Air Polishing", desc: "A fine bicarbonate jet removes stains and smooths enamel surfaces." },
      { title: "Fluoride Varnish", desc: "A protective fluoride coat strengthens enamel and reduces sensitivity." },
    ],
    benefits: ["Prevents gum disease", "Removes 100% of tartar", "Freshens breath", "Stain removal", "Reduces sensitivity over time"],
    ideal: "Recommended for everyone every 6 months. High-risk patients may benefit from 3-monthly cleans.",
  },
  rootcanal: {
    duration: "60–90 min",
    frequency: "1–2 appointments",
    longDescription:
      "Root canal therapy has an undeserved reputation. With modern rotary instrumentation, digital apex locators, and profound local anaesthesia, the procedure is no more uncomfortable than a filling. We remove the infected pulp, sterilise the canal system and seal the tooth — saving it for decades to come.",
    process: [
      { title: "Diagnosis & X-Ray", desc: "Digital X-rays confirm the diagnosis and map the canal system precisely." },
      { title: "Deep Anaesthesia", desc: "We ensure complete numbness before starting — your comfort is non-negotiable." },
      { title: "Canal Cleaning", desc: "Rotary files gently shape and sterilise the full length of each canal." },
      { title: "Sealing & Crown", desc: "The canal is sealed with biocompatible material and a crown placed to protect the tooth." },
    ],
    benefits: ["Saves your natural tooth", "Eliminates infection", "Relieves pain immediately", "Prevents spread to adjacent teeth", "Restored function within days"],
    ideal: "Required when decay or injury reaches the dental pulp. A crown is usually recommended after.",
  },
  children: {
    duration: "30–45 min",
    frequency: "Every 6 months",
    longDescription:
      "The early years set the pattern for a lifetime of dental health. Our paediatric appointments are designed to be playful and positive — from the moment children walk through the door. We use child-friendly explanations, lots of encouragement, and a reward system to make every visit something they look forward to.",
    process: [
      { title: "Welcome Tour", desc: "We show children the instruments and let them touch safe items to build familiarity." },
      { title: "Gentle Exam", desc: "A thorough but fun check of teeth, gums and bite development." },
      { title: "Preventive Care", desc: "Fluoride varnish and fissure sealants protect newly erupted molars." },
      { title: "Parent Briefing", desc: "We teach parents age-appropriate brushing and diet tips." },
    ],
    benefits: ["Builds positive dental attitude", "Early problem detection", "Fissure sealants prevent cavities", "Fluoride protection", "Fun, fear-free experience"],
    ideal: "First visit recommended by age 1 or when first tooth appears.",
  },
  emergency: {
    duration: "30–90 min",
    frequency: "As needed",
    longDescription:
      "Dental emergencies never choose a convenient time. That's why we hold emergency slots every single day for non-registered patients. Whether it's sudden severe pain, a knocked-out tooth, a lost filling or a broken crown — call us and we'll see you same-day. Quick action often means the difference between saving and losing a tooth.",
    process: [
      { title: "Immediate Triage", desc: "We assess the urgency and get you into an emergency slot right away." },
      { title: "Pain Relief", desc: "Our immediate priority is getting you out of pain using fast-acting anaesthetics." },
      { title: "Stabilisation", desc: "We treat the infection, repair the fracture or re-implant the tooth safely." },
      { title: "Follow-Up Plan", desc: "We arrange permanent restoration once the emergency is resolved." },
    ],
    benefits: ["Same-day emergency slots", "Immediate pain relief", "Teeth-saving interventions", "Calm, reassuring care", "Clear transparent pricing"],
    ideal: "For anyone experiencing acute dental pain, trauma, swelling or broken restorations.",
  },
};

// -- Service Modal Component -------------------------------------------
function ServiceModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  const details = serviceDetails[service.id];
  const color = service.color;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11, 18, 32, 0.88)",
        backdropFilter: "blur(18px)",
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0f172a",
          border: `1px solid rgba(255, 255, 255, 0.16)`,
          borderRadius: "32px",
          maxWidth: "820px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 40px 120px rgba(0, 0, 0, 0.75)",
        }}
      >
        {/* Top Header Photo with Gradient */}
        <div
          style={{
            height: "260px",
            backgroundImage: `url(${serviceImageMap[service.id]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.92) 100%)`,
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              zIndex: 10,
            }}
          >
            <X size={20} />
          </button>

          <div className="service-modal-header-content">
            <span
              style={{
                display: "inline-block",
                padding: "0.35rem 0.9rem",
                borderRadius: "999px",
                background: `${color}25`,
                border: `1px solid ${color}60`,
                color: color,
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Plaza Semabok VIP Clinical Care
            </span>
            <h3 className="service-modal-title">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="service-modal-body">
          {/* Quick stats bar */}
          {details && (
            <div
              className="service-modal-grid"
              style={{
                marginBottom: "2rem",
                padding: "1.25rem 1.75rem",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <Clock size={20} style={{ color }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                    Duration
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "white" }}>
                    {details.duration}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <Calendar size={20} style={{ color }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                    Recommended
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "white" }}>
                    {details.frequency}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Long Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.08rem",
              color: "rgba(255, 255, 255, 0.82)",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            {details?.longDescription || service.description}
          </p>

          {/* Step-by-Step Treatment Process */}
          {details?.process && details.process.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <h4
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
                Step-by-Step Treatment Process
              </h4>
              <div className="service-modal-grid">
                {details.process.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1.25rem",
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: `${color}25`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-numbers)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {i + 1}
                      </div>
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.98rem", color: "white" }}>
                        {step.title}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Patient Benefits */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "white",
                marginBottom: "1.25rem",
              }}
            >
              Key Patient Benefits
            </h4>
            <div className="service-modal-grid">
              {(details?.benefits || service.features).map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <CheckCircle2 size={19} style={{ color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.88)" }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div
            style={{
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.25rem",
            }}
          >
            <div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                Ideal Candidate
              </div>
              <div style={{ fontSize: "0.95rem", color: "white", fontWeight: 500 }}>
                {details?.ideal || "All registered and new patients."}
              </div>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              style={{
                padding: "0.95rem 2.25rem",
                background: color,
                color: "white",
                borderRadius: "999px",
                fontFamily: "var(--font-body)",
                fontSize: "0.98rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                boxShadow: `0 10px 30px ${color}45`,
              }}
            >
              Book {service.title} Slot <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// -- Glassmorphic Card Component (Awwwards Level with Zero Line/Clipping) ----
function GlassServiceCard({
  service,
  onLearnMore,
}: {
  service: Service;
  onLearnMore: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const icon = IconMap[service.icon] || <Stethoscope size={28} />;
  const photo = serviceImageMap[service.id] || serviceImageMap.general;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onLearnMore}
      animate={{
        y: isHovered ? -12 : 0,
        rotateX: isHovered ? -mousePos.y * 7 : 0,
        rotateY: isHovered ? mousePos.x * 7 : 0,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        background: isHovered ? "rgba(255, 255, 255, 0.085)" : "rgba(255, 255, 255, 0.045)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "28px",
        border: isHovered
          ? `1px solid ${service.color}`
          : "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: isHovered
          ? `0 24px 70px rgba(0,0,0,0.65), 0 0 35px ${service.color}35`
          : "0 12px 36px rgba(0,0,0,0.35)",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 1. Header Photo with Dark Glass Gradient */}
      <div
        style={{
          height: "195px",
          width: "100%",
          backgroundImage: `url(${photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: "28px 28px 0 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isHovered
              ? "linear-gradient(180deg, rgba(11,18,32,0.15) 0%, rgba(11,18,32,0.85) 100%)"
              : "linear-gradient(180deg, rgba(11,18,32,0.35) 0%, rgba(11,18,32,0.94) 100%)",
            transition: "all 0.5s ease",
          }}
        />

        {/* Top Right Badge */}
        <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 5 }}>
          <span
            style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "999px",
              background: "rgba(11,18,32,0.75)",
              backdropFilter: "blur(10px)",
              border: `1px solid rgba(255,255,255,0.2)`,
              color: "white",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Plaza Semabok Care
          </span>
        </div>
      </div>

      {/* Floating Glowing Icon Ring — Rendered outside Header Photo so it never clips across a horizontal line! */}
      <div
        style={{
          position: "absolute",
          top: "162px",
          left: "1.75rem",
          zIndex: 15,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.12 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "66px",
            height: "66px",
            borderRadius: "50%",
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(16px)",
            border: `2px solid ${service.color}`,
            boxShadow: `0 8px 26px ${service.color}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: service.color,
          }}
        >
          {icon}
        </motion.div>
      </div>

      {/* 2. Card Content Body */}
      <div style={{ padding: "2.5rem 1.75rem 1.75rem", display: "flex", flexDirection: "column", flex: 1, borderRadius: "0 0 28px 28px", overflow: "hidden" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.45rem",
            fontWeight: 800,
            color: "white",
            marginBottom: "0.6rem",
            lineHeight: 1.25,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            flex: 1,
          }}
        >
          {service.description}
        </p>

        {/* Feature Check Marks */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {service.features.slice(0, 3).map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>
              <span style={{ color: service.color, fontWeight: 700 }}>✓</span> {f}
            </li>
          ))}
        </ul>

        {/* CTA Button with slide animation on hover */}
        <div
          style={{
            paddingTop: "1.1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.92rem",
              fontWeight: 600,
              color: service.color,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Inspect Details
            <motion.span
              animate={{ x: isHovered ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </span>

          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 500,
            }}
          >
            {serviceDetails[service.id]?.duration || "45 min"}
          </span>
        </div>
      </div>

      {/* 3. Hover Animated Particles */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: 3,
            }}
          >
            {/* Soft glowing ambient gradient */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "220px",
                height: "220px",
                background: `radial-gradient(circle, ${service.color}25 0%, transparent 70%)`,
                filter: "blur(30px)",
              }}
            />

            {/* Rising tiny glowing particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: 30 + i * 55,
                  y: 400,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: [400, 150, -20],
                  opacity: [0, 0.9, 0],
                  scale: [0.5, 1.2, 0.4],
                }}
                transition={{
                  duration: 2 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                style={{
                  position: "absolute",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: service.color,
                  boxShadow: `0 0 10px ${service.color}, 0 0 20px ${service.color}`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// -- Main Services Section (Awwwards GSAP Scroll Sequence) -------------
export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const bgGlowRef1 = useRef<HTMLDivElement>(null);
  const bgGlowRef2 = useRef<HTMLDivElement>(null);

  // Filter 6 Primary Services
  const primaryIds = ["general", "braces", "implants", "whitening", "rootcanal", "emergency"];
  const primaryServices = services.filter((s) => primaryIds.includes(s.id));

  // GSAP ScrollTrigger Sequence
  useEffect(() => {
    if (!sectionRef.current || !cardsGridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".service-card-item");

      // Staggered cinematic reveal of cards as user scrolls into section
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 65,
          rotationX: 12,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Background glowing orb parallax drift
      if (bgGlowRef1.current && bgGlowRef2.current) {
        gsap.to(bgGlowRef1.current, {
          y: 160,
          x: 80,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(bgGlowRef2.current, {
          y: -140,
          x: -60,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="services"
        ref={sectionRef}
        className="subtle-noise-bg"
        style={{
          padding: "9.5rem 0",
          background: "#080E1A", // Rich ultra-deep luxury dark
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* -- Rich Multi-Layered Background Atmosphere -- */}
        <div
          ref={bgGlowRef1}
          style={{
            position: "absolute",
            top: "5%",
            left: "-10%",
            width: "680px",
            height: "680px",
            background: "radial-gradient(circle, rgba(79,183,197,0.18) 0%, rgba(14,165,233,0.06) 45%, transparent 70%)",
            filter: "blur(90px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          ref={bgGlowRef2}
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-10%",
            width: "720px",
            height: "720px",
            background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, rgba(236,72,153,0.05) 45%, transparent 70%)",
            filter: "blur(90px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "40%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(5,150,105,0.09) 0%, transparent 70%)",
            filter: "blur(110px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2.5rem",
              marginBottom: "4.5rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="section-label" style={{ color: "#4FB7C5", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkle size={15} /> Clinical Specialisations
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)",
                  color: "white",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                Comprehensive Care,{" "}
                <span style={{ color: "#4FB7C5" }}>Expertly Delivered.</span>
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.06rem",
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: "380px",
                  lineHeight: 1.65,
                  textAlign: "right",
                }}
              >
                We focus on our 6 core clinical pillars using high-resolution 3D diagnostics and zero-pain anaesthesia protocols.
              </p>
              <button
                onClick={() => setShowAllServicesModal(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.75rem 1.6rem",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Layers size={16} color="#4FB7C5" /> View All 8 Clinical Services →
              </button>
            </div>
          </motion.div>

          {/* 6 Primary Service Cards Grid */}
          <div
            ref={cardsGridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {primaryServices.map((service) => (
              <div key={service.id} className="service-card-item">
                <GlassServiceCard
                  service={service}
                  onLearnMore={() => setSelectedService(service)}
                />
              </div>
            ))}
          </div>

          {/* Bottom Bar: Explore All Services Option */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              marginTop: "4.5rem",
              padding: "2rem",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "rgba(79,183,197,0.15)",
                  border: "1px solid #4FB7C5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4FB7C5",
                }}
              >
                <Eye size={24} />
              </div>
              <div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700, color: "white" }}>
                  Looking for Paediatric Dentistry or Scaling & Polishing?
                </h4>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(255,255,255,0.65)" }}>
                  We provide all 8 specialist dental treatments under one Orchard Road roof.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAllServicesModal(true)}
              style={{
                padding: "0.9rem 2.2rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #4FB7C5 0%, #0EA5E9 100%)",
                color: "white",
                border: "none",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(79,183,197,0.4)",
              }}
            >
              Explore Complete Service Directory →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Individual Service Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>

      {/* View All Services Directory Modal */}
      <AnimatePresence>
        {showAllServicesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllServicesModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(11, 18, 32, 0.92)",
              backdropFilter: "blur(20px)",
              zIndex: 3500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#0f172a",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "32px",
                maxWidth: "1150px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "2.75rem",
                position: "relative",
                boxShadow: "0 50px 140px rgba(0,0,0,0.8)",
              }}
            >
              <button
                onClick={() => setShowAllServicesModal(false)}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>

              <div style={{ marginBottom: "2.5rem" }}>
                <span style={{ color: "#4FB7C5", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Full Directory · Orchard Road Suite
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", fontWeight: 800, color: "white" }}>
                  All 8 Specialist Dental Services
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setShowAllServicesModal(false);
                      setSelectedService(s);
                    }}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${s.color}35`,
                      borderRadius: "24px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        height: "140px",
                        backgroundImage: `url(${serviceImageMap[s.id]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}
                    >
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 20%, rgba(15,23,42,0.95) 100%)" }} />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-15px",
                          left: "1.25rem",
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          background: "#0f172a",
                          border: `2px solid ${s.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: s.color,
                        }}
                      >
                        {IconMap[s.icon] || <Stethoscope size={20} />}
                      </div>
                    </div>

                    <div style={{ padding: "1.5rem 1.25rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.4rem" }}>
                          {s.title}
                        </h4>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, marginBottom: "1rem" }}>
                          {s.description}
                        </p>
                      </div>

                      <span style={{ color: s.color, fontWeight: 600, fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        Inspect Treatment Plan <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
