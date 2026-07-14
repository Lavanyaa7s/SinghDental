import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveHorizontal, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Shield, Award, Activity, Cpu, Play, Pause, RotateCcw } from "lucide-react";
import gsap from "gsap";

// ── Case 1: Smile Makeover (Verified Close-up Human Smile Showing Perfect Teeth) ──
const smileMakeoverData = {
  key: "whitening",
  title: "Smile Makeover",
  treatment: "Porcelain Veneers + Professional Whitening",
  // Verified close-up portrait of a woman smiling with clear, pristine white teeth (NO X-rays or clinic chairs)
  baseImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200",
  description:
    "Witness our exact enamel shade transformation. By combining LED in-chair whitening with ultra-thin ceramic veneers, we correct baseline discoloration while preserving 100% of your natural tooth anatomy.",
};

// ── 100% Pixel-Aligned Comparison Slider Component with Particles & Glowing Divider ──
function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(5, Math.min(((clientX - rect.left) / rect.width) * 100, 95));
    setSliderPos(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = true;
    setIsDragging(true);
    updateSlider(e.clientX);
  };
  const onMouseUp = () => {
    dragRef.current = false;
    setIsDragging(false);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragRef.current) updateSlider(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    dragRef.current = true;
    setIsDragging(true);
    updateSlider(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    dragRef.current = false;
    setIsDragging(false);
  };

  // Generate 10 whitening sparkle particles clustered around the vertical divider line
  const particles = [
    { id: 1, top: "18%", offset: -14, size: 8, delay: 0 },
    { id: 2, top: "26%", offset: 12, size: 6, delay: 0.15 },
    { id: 3, top: "35%", offset: -18, size: 10, delay: 0.3 },
    { id: 4, top: "44%", offset: 15, size: 7, delay: 0.1 },
    { id: 5, top: "54%", offset: -12, size: 9, delay: 0.4 },
    { id: 6, top: "63%", offset: 18, size: 6, delay: 0.2 },
    { id: 7, top: "72%", offset: -15, size: 8, delay: 0.35 },
    { id: 8, top: "82%", offset: 14, size: 10, delay: 0.05 },
    { id: 9, top: "28%", offset: -22, size: 5, delay: 0.45 },
    { id: 10, top: "68%", offset: 22, size: 7, delay: 0.25 },
  ];

  // Dynamic label motion offsets: labels gently slide/tilt toward center as their side expands
  const leftLabelOffset = Math.max(1.5, Math.min(18, (sliderPos * 0.3) - 6));
  const rightLabelOffset = Math.max(1.5, Math.min(18, ((100 - sliderPos) * 0.3) - 6));

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        borderRadius: "32px",
        overflow: "hidden",
        cursor: "ew-resize",
        userSelect: "none",
        boxShadow: isDragging ? "0 40px 100px rgba(79,183,197,0.35)" : "0 32px 80px rgba(0,0,0,0.35)",
        background: "#0B1220",
        border: "1px solid rgba(255,255,255,0.18)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* AFTER IMAGE LAYER (Pristine radiant white porcelain enamel luster) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${smileMakeoverData.baseImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          filter: "brightness(1.08) contrast(1.06) saturate(1.05)",
        }}
      />

      {/* BEFORE IMAGE LAYER (Clipped, 100% pixel-aligned with realistic baseline yellowing & tea/coffee stain simulation) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          willChange: "clip-path",
          backgroundImage: `url(${smileMakeoverData.baseImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          filter: "sepia(0.55) saturate(1.5) brightness(0.85) contrast(0.9)",
        }}
      />

      {/* Subtle darkening gradient at bottom for labels */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 60%, rgba(11,18,32,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ✦ 1. Whitening Sparkle Particles along the divider line when dragging/moving */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 9 }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: isDragging ? [0, -25, -45] : [0, -8, 0],
              opacity: isDragging ? [0, 1, 0.9, 0] : [0.15, 0.45, 0.15],
              scale: isDragging ? [0.6, 1.4, 0.8, 0] : [0.8, 1.1, 0.8],
              rotate: isDragging ? [0, 180, 360] : [0, 45, 0],
            }}
            transition={{
              duration: isDragging ? 1.4 : 3.5,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: p.top,
              left: `calc(${sliderPos}% + ${p.offset}px)`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: p.id % 2 === 0 ? "#4FB7C5" : "#FFFFFF",
              boxShadow: p.id % 2 === 0 ? "0 0 14px #4FB7C5, 0 0 28px #4FB7C5" : "0 0 12px white, 0 0 24px #0EA5E9",
            }}
          />
        ))}
      </div>

      {/* ✦ 4. Labels Gently Move with the Slider */}
      {/* Before Badge */}
      <motion.div
        animate={{
          left: `${leftLabelOffset}%`,
          opacity: sliderPos > 14 ? 1 : 0,
          scale: isDragging ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        style={{
          position: "absolute",
          bottom: "1.75rem",
          background: "rgba(11,18,32,0.88)",
          backdropFilter: "blur(12px)",
          borderRadius: "999px",
          padding: "0.55rem 1.35rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "white",
          border: "1px solid rgba(255,255,255,0.25)",
          pointerEvents: "none",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#F59E0B" }} />
        Baseline Enamel Shade
      </motion.div>

      {/* After Badge */}
      <motion.div
        animate={{
          right: `${rightLabelOffset}%`,
          opacity: sliderPos < 86 ? 1 : 0,
          scale: isDragging ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        style={{
          position: "absolute",
          bottom: "1.75rem",
          background: "rgba(79,183,197,0.95)",
          backdropFilter: "blur(12px)",
          borderRadius: "999px",
          padding: "0.55rem 1.35rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "white",
          border: "1px solid rgba(255,255,255,0.45)",
          pointerEvents: "none",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          boxShadow: "0 8px 28px rgba(79,183,197,0.45)",
        }}
      >
        <Sparkles size={15} />
        Porcelain & Whitening Luster
      </motion.div>

      {/* ✦ 2. Glowing Divider Line + Handle + ✦ 3. Animated Percentage Counter */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Glowing Vertical Line */}
        <motion.div
          animate={{
            boxShadow: isDragging
              ? "0 0 35px #0EA5E9, 0 0 70px #4FB7C5, 0 0 16px white, 0 0 110px #4FB7C5"
              : "0 0 18px #4FB7C5, 0 0 38px #4FB7C5, 0 0 6px white",
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: isDragging ? "3px" : "2px",
            background: "white",
          }}
        />

        {/* ✦ 3. Animated Percentage Counter Pill Attached to Line */}
        <motion.div
          animate={{
            scale: isDragging ? 1.08 : 1,
            y: isDragging ? -4 : 0,
          }}
          style={{
            position: "absolute",
            top: "22%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(11,18,32,0.92)",
            backdropFilter: "blur(14px)",
            padding: "0.45rem 1rem",
            borderRadius: "999px",
            border: "1.5px solid #4FB7C5",
            color: "white",
            fontFamily: "var(--font-numbers)",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 20px rgba(79,183,197,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Sparkles size={13} color="#4FB7C5" />
          <span>{Math.round(sliderPos)}% Enamel Luster</span>
        </motion.div>

        {/* Circular Handle */}
        <motion.div
          animate={{
            scale: isDragging ? 1.15 : 1,
            boxShadow: isDragging
              ? "0 12px 40px rgba(0,0,0,0.6), 0 0 0 8px rgba(79,183,197,0.55), 0 0 30px #4FB7C5"
              : "0 8px 32px rgba(0,0,0,0.5), 0 0 0 5px rgba(79,183,197,0.45)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "62px",
            height: "62px",
            background: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "all",
            cursor: "ew-resize",
          }}
        >
          <MoveHorizontal size={24} color="#4FB7C5" />
        </motion.div>
      </div>

      {/* Top Banner Hint */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isDragging ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(11,18,32,0.82)",
          backdropFilter: "blur(12px)",
          borderRadius: "999px",
          padding: "0.5rem 1.35rem",
          border: "1px solid rgba(255,255,255,0.22)",
          pointerEvents: "none",
          zIndex: 6,
          whiteSpace: "nowrap",
        }}
      >
        <ChevronLeft size={15} color="rgba(255,255,255,0.8)" />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "white",
            fontWeight: 600,
          }}
        >
          Drag handle across to trigger live enamel whitening & particle reaction
        </span>
        <ChevronRight size={15} color="rgba(255,255,255,0.8)" />
      </motion.div>
    </div>
  );
}

// ── Case 2: Orthodontic Aligner 3D Blueprint Simulation with GSAP Smooth Tweening ──
function OrthoShowcaseCard() {
  const [activeStage, setActiveStage] = useState(1); // 0: Baseline, 1: Mid-Course, 2: Final Arch
  const [isPlaying, setIsPlaying] = useState(false);
  const teethContainerRef = useRef<HTMLDivElement>(null);
  const toothRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Exact tooth root coordinate target states for GSAP smooth tweening
  const stageStates = [
    {
      label: "Stage 01 · Baseline Crowding (Day 1)",
      detail: "Initial digital iTero scan reveals 16° anterior rotation and lower arch crowding.",
      archScale: 0.93,
      wireframeColor: "#F59E0B",
      teeth: [
        { x: -76, y: 36, rotate: -22, scale: 0.94 },
        { x: -44, y: 26, rotate: 16, scale: 0.95 },
        { x: -14, y: 44, rotate: -15, scale: 0.93 },
        { x: 14, y: 46, rotate: 18, scale: 0.93 },
        { x: 44, y: 28, rotate: -16, scale: 0.95 },
        { x: 76, y: 36, rotate: 22, scale: 0.94 },
      ],
    },
    {
      label: "Stage 12 · Mid-Course Expansion (Month 9)",
      detail: "SmartTrack® clear aligners expand the dental arch and level the bite plane smoothly.",
      archScale: 0.98,
      wireframeColor: "#0EA5E9",
      teeth: [
        { x: -78, y: 32, rotate: -10, scale: 0.97 },
        { x: -46, y: 18, rotate: 6, scale: 0.98 },
        { x: -15, y: 14, rotate: -4, scale: 0.98 },
        { x: 15, y: 14, rotate: 6, scale: 0.98 },
        { x: 46, y: 18, rotate: -6, scale: 0.98 },
        { x: 78, y: 32, rotate: 10, scale: 0.97 },
      ],
    },
    {
      label: "Stage 24 · Perfect Alignment (Month 18)",
      detail: "Final 0.0mm micro-alignment reached. Teeth locked into pristine symmetrical curve.",
      archScale: 1.0,
      wireframeColor: "#4FB7C5",
      teeth: [
        { x: -80, y: 28, rotate: -6, scale: 1 },
        { x: -48, y: 14, rotate: -3, scale: 1 },
        { x: -16, y: 8, rotate: 0, scale: 1 },
        { x: 16, y: 8, rotate: 0, scale: 1 },
        { x: 48, y: 14, rotate: 3, scale: 1 },
        { x: 80, y: 28, rotate: 6, scale: 1 },
      ],
    },
  ];

  // GSAP Smooth Tweening engine triggered whenever activeStage changes
  useEffect(() => {
    const target = stageStates[activeStage];
    toothRefs.current.forEach((el, index) => {
      if (!el || !target.teeth[index]) return;
      const t = target.teeth[index];
      gsap.to(el, {
        x: t.x,
        y: t.y,
        rotation: t.rotate,
        scale: t.scale,
        duration: 1.25,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });
  }, [activeStage]);

  // Auto-Play GSAP Cinematic Sequence
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStage((prev) => {
          if (prev >= 2) {
            setIsPlaying(false);
            return 2;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = stageStates[activeStage];

  return (
    <div
      style={{
        background: "#0B1220",
        borderRadius: "32px",
        border: "1px solid rgba(255, 255, 255, 0.16)",
        overflow: "hidden",
        boxShadow: "0 32px 90px rgba(0,0,0,0.45)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      }}
    >
      {/* Left: Interactive GSAP Smooth Tooth Aligner Simulation */}
      <div
        style={{
          background: "linear-gradient(145deg, #0f172a 0%, #080E1A 100%)",
          padding: "3rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Background Grid & Radar Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(79,183,197,0.12) 0%, transparent 70%)",
            backgroundSize: "40px 40px",
            opacity: 0.6,
          }}
        />

        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: "999px",
                background: "rgba(79,183,197,0.18)",
                border: "1px solid rgba(79,183,197,0.5)",
                color: "#4FB7C5",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              GSAP Smooth Aligner Biomechanics
            </span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "white" }}>
              Continuous Arch Progression
            </h3>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginTop: "0.3rem" }}>
              Watch GSAP smoothly tween tooth roots across treatment milestones:
            </p>
          </div>

          {/* Auto-Play Simulation Toggle */}
          <button
            onClick={() => {
              if (activeStage === 2 && !isPlaying) {
                setActiveStage(0);
                setTimeout(() => setIsPlaying(true), 100);
              } else {
                setIsPlaying(!isPlaying);
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.55rem 1.15rem",
              borderRadius: "999px",
              background: isPlaying ? "#F59E0B" : "#4FB7C5",
              color: "#0B1220",
              border: "none",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: isPlaying ? "0 0 20px rgba(245,158,11,0.5)" : "0 0 20px rgba(79,183,197,0.5)",
              transition: "all 0.25s ease",
            }}
          >
            {isPlaying ? <Pause size={14} /> : activeStage === 2 ? <RotateCcw size={14} /> : <Play size={14} />}
            {isPlaying ? "Pause Tween" : activeStage === 2 ? "Replay GSAP" : "Auto-Play GSAP"}
          </button>
        </div>

        {/* GSAP Smooth Tooth Arch Visualizer */}
        <div
          ref={teethContainerRef}
          style={{
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            margin: "1.5rem 0",
          }}
        >
          {/* Simulated Upper Arch Curve Wireframe */}
          <motion.div
            animate={{ scale: current.archScale }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "270px",
              height: "175px",
              borderRadius: "135px 135px 24px 24px",
              border: `3px dashed ${current.wireframeColor}`,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 45px ${current.wireframeColor}35`,
            }}
          >
            {/* GSAP Controlled 6 Anterior Teeth Nodes */}
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                ref={(el) => {
                  toothRefs.current[index] = el;
                }}
                style={{
                  position: "absolute",
                  top: index === 2 || index === 3 ? "14px" : index === 1 || index === 4 ? "24px" : "44px",
                  left: "calc(50% - 15px)",
                  width: "30px",
                  height: "38px",
                  borderRadius: "8px 8px 14px 14px",
                  background: current.wireframeColor,
                  border: "2px solid white",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  color: "#0B1220",
                  willChange: "transform",
                }}
              >
                {index + 1}
              </div>
            ))}

            <div style={{ position: "absolute", bottom: "18px", color: current.wireframeColor, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em" }}>
              {current.label.split("·")[0]}
            </div>
          </motion.div>
        </div>

        {/* GSAP Milestone Stage Selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem", position: "relative", zIndex: 2 }}>
          {stageStates.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsPlaying(false);
                setActiveStage(idx);
              }}
              style={{
                padding: "0.7rem",
                borderRadius: "14px",
                border: activeStage === idx ? `1.5px solid ${s.wireframeColor}` : "1px solid rgba(255,255,255,0.14)",
                background: activeStage === idx ? `${s.wireframeColor}22` : "rgba(255,255,255,0.035)",
                color: activeStage === idx ? "white" : "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-body)",
                fontSize: "0.76rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {idx === 0 && "Stage 1: Crowded"}
              {idx === 1 && "Stage 12: Expand"}
              {idx === 2 && "Stage 24: Aligned"}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Clinical Specifications & Biomechanics Details */}
      <div style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <Activity size={20} color="#4FB7C5" />
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 700, color: "white" }}>
              {current.label}
            </h4>
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.96rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "2.25rem" }}>
            {current.detail} Our GSAP timeline accurately mirrors the continuous 0.1mm biomechanical root rotation applied by SmartTrack® clear aligners.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2.5rem" }}>
            <div style={{ padding: "1.1rem", background: "rgba(255,255,255,0.035)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h5 style={{ color: "#4FB7C5", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem" }}>
                Continuous vs. Jumpy Progression
              </h5>
              <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.6 }}>
                Teeth do not jump between stages—our aligners apply gentle, continuous 24/7 micro-forces that smoothly glide tooth roots through bone.
              </p>
            </div>

            <div style={{ padding: "1.1rem", background: "rgba(255,255,255,0.035)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h5 style={{ color: "#4FB7C5", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem" }}>
                Zero Brackets or Wires Required
              </h5>
              <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.6 }}>
                Removable for meals and oral hygiene. Custom Vivera retention retainers ensure your final arch alignment never relapses.
              </p>
            </div>
          </div>
        </div>

        {/* Specs Footer */}
        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
          {["0.1mm Digital Accuracy", "Continuous Micro-Forces", "Removable for Meals", "MSc Orthodontist Care"].map((spec) => (
            <span
              key={spec}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.45rem 0.95rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={14} color="#4FB7C5" />
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Case 3: Dental Implant Titanium Engineering Anatomy (No Empty Rooms!) ──
function ImplantShowcaseCard() {
  const [selectedLayer, setSelectedLayer] = useState(0); // 0: Titanium Fixture, 1: Abutment Interface, 2: Zirconia Crown

  const layers = [
    {
      title: "1. Grade 5 Titanium Osseo-Fixture",
      spec: "Placed directly into the jaw structure. Micro-threaded medical grade titanium triggers natural bone osseointegration over 8 weeks.",
      color: "#4FB7C5",
      material: "Ti-6Al-4V Biocompatible Alloy",
    },
    {
      title: "2. Precision Hex Abutment Interface",
      spec: "Zero micro-gap locking connector that absorbs 100% of vertical chewing bite force without screw loosening or bacteria entry.",
      color: "#0EA5E9",
      material: "Gold-Anodized Titanium",
    },
    {
      title: "3. Hand-Layered CEREC Zirconia Crown",
      spec: "Triple-fired high-translucency ceramic crown customized to match the exact fluorescence and ridge texture of your surrounding teeth.",
      color: "#A8DFE7",
      material: "Multi-Layered Monolithic Zirconia",
    },
  ];

  const current = layers[selectedLayer];

  return (
    <div
      style={{
        background: "#0B1220",
        borderRadius: "32px",
        border: "1px solid rgba(255, 255, 255, 0.16)",
        overflow: "hidden",
        boxShadow: "0 32px 90px rgba(0,0,0,0.45)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      }}
    >
      {/* Left: Interactive 3D Structural Anatomy Blueprint */}
      <div
        style={{
          background: "linear-gradient(145deg, #0f172a 0%, #080E1A 100%)",
          padding: "3rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Background Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.1) 0%, transparent 70%)",
            backgroundSize: "40px 40px",
            opacity: 0.6,
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <span
            style={{
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              background: "rgba(14,165,233,0.18)",
              border: "1px solid rgba(14,165,233,0.5)",
              color: "#0EA5E9",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "0.75rem",
            }}
          >
            Structural Engineering Blueprint
          </span>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "white" }}>
            Titanium & Ceramic Anatomy
          </h3>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginTop: "0.3rem" }}>
            Click structural layers to inspect physical dental implant specifications:
          </p>
        </div>

        {/* Interactive 3-Layer Visual Anatomy Stack */}
        <div
          style={{
            height: "260px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.8rem",
            position: "relative",
            margin: "1rem 0",
          }}
        >
          {layers.map((l, idx) => {
            const isSelected = selectedLayer === idx;
            const stackIndex = 2 - idx;
            const item = layers[stackIndex];
            const isStackSelected = selectedLayer === stackIndex;

            return (
              <motion.div
                key={stackIndex}
                onClick={() => setSelectedLayer(stackIndex)}
                whileHover={{ scale: 1.03 }}
                animate={{
                  scale: isStackSelected ? 1.05 : 0.96,
                  borderColor: isStackSelected ? item.color : "rgba(255,255,255,0.15)",
                  backgroundColor: isStackSelected ? `${item.color}25` : "rgba(255,255,255,0.04)",
                }}
                style={{
                  width: stackIndex === 2 ? "220px" : stackIndex === 1 ? "180px" : "150px",
                  height: stackIndex === 2 ? "64px" : stackIndex === 1 ? "48px" : "74px",
                  borderRadius: stackIndex === 2 ? "20px 20px 8px 8px" : stackIndex === 1 ? "6px" : "6px 6px 24px 24px",
                  border: "2px solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: isStackSelected ? `0 0 30px ${item.color}40` : "none",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "0.82rem", color: isStackSelected ? "white" : "rgba(255,255,255,0.6)" }}>
                  {stackIndex === 2 && "▲ Ceramic Zirconia Crown"}
                  {stackIndex === 1 && "■ Hex Abutment Connector"}
                  {stackIndex === 0 && "▼ Titanium Osseo-Fixture Post"}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Layer Selector Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem", position: "relative", zIndex: 2 }}>
          {layers.map((l, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLayer(idx)}
              style={{
                padding: "0.65rem",
                borderRadius: "14px",
                border: selectedLayer === idx ? `1.5px solid ${l.color}` : "1px solid rgba(255,255,255,0.12)",
                background: selectedLayer === idx ? `${l.color}20` : "rgba(255,255,255,0.03)",
                color: selectedLayer === idx ? "white" : "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {idx === 0 && "1. Fixture"}
              {idx === 1 && "2. Abutment"}
              {idx === 2 && "3. Crown"}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Detailed Component Specifications */}
      <div style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
            <Cpu size={20} color="#0EA5E9" />
            <span style={{ fontSize: "0.8rem", color: "#0EA5E9", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Selected Component Spec
            </span>
          </div>
          <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 800, color: "white", marginBottom: "0.4rem" }}>
            {current.title}
          </h4>
          <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", fontSize: "0.78rem", fontWeight: 600, marginBottom: "1.35rem" }}>
            Material: {current.material}
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.96rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "2.25rem" }}>
            {current.spec}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2.5rem" }}>
            <div style={{ padding: "1.1rem", background: "rgba(255,255,255,0.035)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h5 style={{ color: "#0EA5E9", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem" }}>
                Preserves Jawbone Density
              </h5>
              <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.6 }}>
                By stimulating the jawbone like a natural tooth root, implants prevent facial collapsing and bone resorption.
              </p>
            </div>

            <div style={{ padding: "1.1rem", background: "rgba(255,255,255,0.035)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h5 style={{ color: "#0EA5E9", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem" }}>
                No Shaving of Adjacent Teeth
              </h5>
              <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.6 }}>
                Unlike traditional dental bridges, your adjacent healthy teeth remain 100% untouched and structurally sound.
              </p>
            </div>
          </div>
        </div>

        {/* Specs Footer */}
        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
          {["35+ Year Clinical Lifespan", "Preserves Bone Density", "No Shaving of Adjacent Teeth", "99.2% Success Protocol"].map((spec) => (
            <span
              key={spec}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.45rem 0.95rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={14} color="#0EA5E9" />
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────
export default function BeforeAfter() {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section
      className="subtle-noise-bg"
      style={{
        padding: "9rem 0",
        background: "linear-gradient(180deg, #F6F8FA 0%, #FFFFFF 50%, #F0F4F8 100%)",
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
          width: "480px",
          height: "480px",
          background: "radial-gradient(circle, rgba(79,183,197,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "10%",
          left: "-5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
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
          <div className="section-label" style={{ justifyContent: "center" }}>
            Real Clinical Outcomes
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4.2vw, 3.4rem)",
              color: "#0B1220",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            See The <span style={{ color: "#4FB7C5" }}>Transformation.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.08rem",
              color: "#6B7280",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Explore our 100% pixel-aligned enamel shade comparison with live particle reaction, alongside our GSAP-powered orthodontic continuous biomechanical blueprint.
          </p>
        </motion.div>

        {/* Case Selection Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.85rem",
            justifyContent: "center",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          <motion.button
            onClick={() => setActiveCase(0)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "0.85rem 1.75rem",
              borderRadius: "999px",
              border: `1.5px solid ${activeCase === 0 ? "#4FB7C5" : "rgba(0,0,0,0.12)"}`,
              background: activeCase === 0 ? "#4FB7C5" : "white",
              color: activeCase === 0 ? "white" : "#1F2937",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: activeCase === 0 ? "0 10px 28px rgba(79,183,197,0.4)" : "0 2px 10px rgba(0,0,0,0.04)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Sparkles size={16} />
            Smile Makeover
          </motion.button>

          <motion.button
            onClick={() => setActiveCase(1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "0.85rem 1.75rem",
              borderRadius: "999px",
              border: `1.5px solid ${activeCase === 1 ? "#4FB7C5" : "rgba(0,0,0,0.12)"}`,
              background: activeCase === 1 ? "#4FB7C5" : "white",
              color: activeCase === 1 ? "white" : "#1F2937",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: activeCase === 1 ? "0 10px 28px rgba(79,183,197,0.4)" : "0 2px 10px rgba(0,0,0,0.04)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Award size={16} />
            Orthodontic Correction
          </motion.button>

          <motion.button
            onClick={() => setActiveCase(2)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "0.85rem 1.75rem",
              borderRadius: "999px",
              border: `1.5px solid ${activeCase === 2 ? "#0EA5E9" : "rgba(0,0,0,0.12)"}`,
              background: activeCase === 2 ? "#0EA5E9" : "white",
              color: activeCase === 2 ? "white" : "#1F2937",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: activeCase === 2 ? "0 10px 28px rgba(14,165,233,0.4)" : "0 2px 10px rgba(0,0,0,0.04)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Shield size={16} />
            Full Restoration
          </motion.button>
        </div>

        {/* Display Active Tab Component */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ maxWidth: "1060px", margin: "0 auto" }}
        >
          {activeCase === 0 && <ComparisonSlider />}
          {activeCase === 1 && <OrthoShowcaseCard />}
          {activeCase === 2 && <ImplantShowcaseCard />}

          <div
            style={{
              textAlign: "center",
              marginTop: "2.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ height: "1px", width: "40px", background: "rgba(0,0,0,0.12)" }} />
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: activeCase === 2 ? "rgba(14,165,233,0.12)" : "rgba(79,183,197,0.12)",
                color: activeCase === 2 ? "#0284C7" : "#0E8FA0",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 600,
                padding: "0.55rem 1.4rem",
                borderRadius: "999px",
                border: activeCase === 2 ? "1px solid rgba(14,165,233,0.3)" : "1px solid rgba(79,183,197,0.3)",
              }}
            >
              Orchard Road Specialist Suite · Zero-Pain Clinical Protocol
            </span>
            <div style={{ height: "1px", width: "40px", background: "rgba(0,0,0,0.12)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
