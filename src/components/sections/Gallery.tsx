import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, CheckCircle2, LayoutGrid, Layers, ArrowUpRight } from "lucide-react";

// ── Real High-Resolution Gallery Photography with varied Masonry heights ──
const galleryItems = [
  {
    id: 1,
    title: "Plaza Semabok VIP Reception Lounge",
    subtitle: "Tranquil & Welcoming Ambience",
    height: "520px", // Tall Pinterest style
    aspectRatio: "3/5",
    color: "#4FB7C5",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200",
    description: "Our patient lounge is designed with natural warm tones, ambient aromatherapy, and comfortable seating to ensure your visit feels more like a wellness retreat than a traditional clinic.",
    specifications: [
      "Ergonomic acoustic-damped seating",
      "Complimentary organic refreshment bar",
      "Private pre-consultation check-in"
    ],
  },
  {
    id: 2,
    title: "State-of-the-Art Treatment Suite",
    subtitle: "Precision & Patient Comfort",
    height: "340px", // Normal/compact style
    aspectRatio: "4/3",
    color: "#0EA5E9",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
    description: "Each of our 6 private treatment suites is equipped with hospital-grade air filtration, ceiling-mounted entertainment displays, and plush memory foam dental chairs.",
    specifications: [
      "HEPA H13 medical air filtration",
      "Overhead 4K entertainment monitors",
      "Ultra-quiet hydraulic patient chairs"
    ],
  },
  {
    id: 3,
    title: "3D Intraoral Digital Scanning Lab",
    subtitle: "Zero Messy Impressions",
    height: "440px", // Medium style
    aspectRatio: "1/1",
    color: "#7C3AED",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    description: "We utilize Trios 5 optical scanners to capture thousands of high-definition 3D images per second, creating exact digital models of your teeth without uncomfortable putty.",
    specifications: [
      "Sub-micron accuracy digital impressions",
      "Instant 3D treatment simulation",
      "No gag reflex or messy impression paste"
    ],
  },
  {
    id: 4,
    title: "CEREC Same-Day Ceramic Milling",
    subtitle: "Custom Crowns in Under 60 Minutes",
    height: "360px",
    aspectRatio: "16/10",
    color: "#059669",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    description: "Our on-site robotic milling center crafts monolithic zirconia and porcelain restorations right before your eyes, eliminating temporary crowns and multi-week wait times.",
    specifications: [
      "Single-visit crown & veneer delivery",
      "High-strength biocompatible zirconia",
      "Precision color & shade matching"
    ],
  },
  {
    id: 5,
    title: "Private Consultation Studio",
    subtitle: "Transparent Smile Design Planning",
    height: "500px", // Tall style
    aspectRatio: "3/4",
    color: "#D97706",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
    description: "In our private consultation studios, our specialists walk you through digital X-rays and 3D smile design simulations on large screens with zero pressure.",
    specifications: [
      "Full 3D smile preview before treatment",
      "Clear itemised treatment timeline",
      "Multilingual patient coordinators"
    ],
  },
  {
    id: 6,
    title: "Class-B Sterilisation Center",
    subtitle: "100% Barcoded Instrument Tracking",
    height: "380px",
    aspectRatio: "5/4",
    color: "#EC4899",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200",
    description: "We adhere to hospital-grade disinfection protocols. Every instrument undergoes multi-stage thermal cleaning and vacuum autoclaving inside sealed sterile pouches.",
    specifications: [
      "Exceeds international medical standards",
      "Single-use barrier protection throughout",
      "Daily spore & biological testing"
    ],
  },
];

// ── Pinterest Masonry Card Component ─────────────────────────────────────
function MasonryCard({
  item,
  onClick,
}: {
  item: typeof galleryItems[0];
  onClick: () => void;
}) {
  return (
    <motion.div
      className="masonry-item"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      style={{ cursor: "pointer", height: item.height }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "26px",
          border: `1px solid rgba(255,255,255,0.14)`,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 18px 48px rgba(0,0,0,0.35)",
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1.85rem",
        }}
      >
        {/* Darkening gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(11,18,32,0.2) 0%, rgba(11,18,32,0.1) 40%, rgba(11,18,32,0.88) 100%)",
            transition: "all 0.4s ease",
          }}
        />

        {/* Top: Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
          <span
            style={{
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              background: "rgba(11,18,32,0.78)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${item.color}65`,
              color: "white",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            }}
          >
            Clinical Excellence
          </span>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(11,18,32,0.78)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <ZoomIn size={16} color="white" />
          </div>
        </div>

        {/* Bottom: Title & Subtitle */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "1.35rem",
              color: "white",
              lineHeight: 1.25,
              marginBottom: "0.35rem",
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.5,
            }}
          >
            {item.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Stacked Overlapping Cards Component ──────────────────────────────────
function StackedCardsView({
  onSelect,
}: {
  onSelect: (item: typeof galleryItems[0]) => void;
}) {
  const [activeStackIndex, setActiveStackIndex] = useState(0);

  return (
    <div style={{ maxWidth: "1050px", margin: "0 auto", position: "relative" }}>
      <div className="gallery-stacked-grid">
        {/* Left: Stacked Deck Interactive Display */}
        <div className="gallery-stacked-deck" style={{ position: "relative", height: "460px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {galleryItems.map((item, idx) => {
            const offset = (idx - activeStackIndex + galleryItems.length) % galleryItems.length;
            const isTop = offset === 0;
            const zIndex = galleryItems.length - offset;

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (isTop) onSelect(item);
                  else setActiveStackIndex(idx);
                }}
                initial={false}
                animate={{
                  scale: isTop ? 1 : 1 - offset * 0.05,
                  y: offset * 22,
                  x: offset * 12,
                  rotate: isTop ? 0 : offset * 3 - 3,
                  opacity: offset > 3 ? 0 : 1 - offset * 0.18,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  width: "90%",
                  height: "390px",
                  borderRadius: "28px",
                  border: `1.5px solid ${isTop ? item.color : "rgba(255,255,255,0.15)"}`,
                  boxShadow: isTop
                    ? `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${item.color}40`
                    : "0 12px 36px rgba(0,0,0,0.4)",
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                  zIndex,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isTop
                      ? "linear-gradient(180deg, transparent 40%, rgba(11,18,32,0.92) 100%)"
                      : "rgba(11,18,32,0.45)",
                  }}
                />

                {isTop && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", zIndex: 3 }}>
                    <span
                      style={{
                        padding: "0.3rem 0.8rem",
                        borderRadius: "999px",
                        background: `${item.color}25`,
                        border: `1px solid ${item.color}60`,
                        color: item.color,
                        fontFamily: "var(--font-body)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        display: "inline-block",
                        marginBottom: "0.6rem",
                      }}
                    >
                      Featured Space #{item.id}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "white" }}>
                      {item.title}
                    </h3>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right: Stack Navigation & Details */}
        <div style={{ paddingRight: "1rem" }}>
          <div style={{ color: "#4FB7C5", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Interactive Deck · Click to inspect
          </div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "2.1rem", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: "1rem" }}>
            {galleryItems[activeStackIndex].title}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.02rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
            {galleryItems[activeStackIndex].description}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.25rem" }}>
            {galleryItems[activeStackIndex].specifications.map((spec, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <CheckCircle2 size={18} color={galleryItems[activeStackIndex].color} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "rgba(255,255,255,0.88)" }}>
                  {spec}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              onClick={() => onSelect(galleryItems[activeStackIndex])}
              style={{
                padding: "0.85rem 1.75rem",
                borderRadius: "999px",
                background: galleryItems[activeStackIndex].color,
                color: "white",
                border: "none",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: `0 8px 24px ${galleryItems[activeStackIndex].color}40`,
              }}
            >
              Full Screen View <ArrowUpRight size={17} />
            </button>

            <button
              onClick={() => setActiveStackIndex((prev) => (prev + 1) % galleryItems.length)}
              style={{
                padding: "0.85rem 1.5rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.25)",
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Next Card →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Gallery Component ───────────────────────────────────────────────
export default function Gallery() {
  const [activeItem, setActiveItem] = useState<typeof galleryItems[0] | null>(null);
  const [viewMode, setViewMode] = useState<"masonry" | "stacked">("masonry");

  return (
    <section
      id="gallery"
      className="subtle-noise-bg"
      style={{
        padding: "8.5rem 0",
        background: "var(--color-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background gradients, noise & floating shapes for depth */}
      <div
        className="ambient-blur-circle"
        style={{
          top: "10%",
          right: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(79,183,197,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "15%",
          left: "5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
        }}
      />
      <div
        className="floating-subtle-shape"
        style={{
          top: "25%",
          left: "8%",
          width: "160px",
          height: "160px",
        }}
      />
      <div
        className="floating-subtle-shape"
        style={{
          bottom: "20%",
          right: "10%",
          width: "220px",
          height: "220px",
          animationDelay: "4s",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center", color: "#4FB7C5" }}>
            Inside Singh Dental Clinic
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Designed for <span style={{ color: "#4FB7C5" }}>Depth & Tranquility.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.08rem",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "580px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.65,
            }}
          >
            Explore our architectural Orchard Road treatment suites and high-tech diagnostic center. Switch between our dynamic Pinterest masonry grid and interactive stacked cards below.
          </p>

          {/* Layout Mode Toggler */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(14px)",
              padding: "0.35rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.15)",
              gap: "0.35rem",
            }}
          >
            <button
              onClick={() => setViewMode("masonry")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: viewMode === "masonry" ? "#4FB7C5" : "transparent",
                color: "white",
                fontFamily: "var(--font-body)",
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: viewMode === "masonry" ? "0 6px 18px rgba(79,183,197,0.4)" : "none",
              }}
            >
              <LayoutGrid size={16} /> Pinterest Masonry
            </button>
            <button
              onClick={() => setViewMode("stacked")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.4rem",
                borderRadius: "999px",
                border: "none",
                background: viewMode === "stacked" ? "#4FB7C5" : "transparent",
                color: "white",
                fontFamily: "var(--font-body)",
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: viewMode === "stacked" ? "0 6px 18px rgba(79,183,197,0.4)" : "none",
              }}
            >
              <Layers size={16} /> Stacked Overlapping Cards
            </button>
          </div>
        </motion.div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {viewMode === "masonry" ? (
            <motion.div
              key="masonry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="masonry-grid"
            >
              {galleryItems.map((item) => (
                <MasonryCard key={item.id} item={item} onClick={() => setActiveItem(item)} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="stacked"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <StackedCardsView onSelect={(item) => setActiveItem(item)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(11,18,32,0.92)",
              backdropFilter: "blur(16px)",
              zIndex: 3000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 25, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "760px",
                width: "100%",
                background: "#0f172a",
                borderRadius: "32px",
                border: `1px solid rgba(255,255,255,0.18)`,
                overflow: "hidden",
                boxShadow: "0 50px 140px rgba(0,0,0,0.75)",
                position: "relative",
              }}
            >
              <button
                onClick={() => setActiveItem(null)}
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  background: "rgba(11,18,32,0.85)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "50%",
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "white",
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>

              {/* Top Photo */}
              <div
                style={{
                  height: "350px",
                  backgroundImage: `url(${activeItem.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 50%, #0f172a 100%)",
                  }}
                />
              </div>

              <div style={{ padding: "0 2.5rem 2.5rem" }}>
                <span
                  style={{
                    color: activeItem.color,
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Singh Dental Clinic · Orchard Road Suite
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.85rem", color: "white", marginBottom: "0.4rem" }}>
                  {activeItem.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", marginBottom: "1.35rem" }}>
                  {activeItem.subtitle}
                </p>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.75, marginBottom: "1.85rem" }}>
                  {activeItem.description}
                </p>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1.5rem" }}>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: "1rem" }}>
                    Clinical Features & Comfort Standards
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                    {activeItem.specifications.map((spec, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                        <CheckCircle2 size={18} color={activeItem.color} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "rgba(255,255,255,0.82)" }}>
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
