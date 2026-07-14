import { useEffect, useState } from "react";

// ── Global Ultra-Slow, Almost Invisible Atmospheric Layer ──────────────────
export default function GlobalAmbientAtmosphere() {
  const [particles, setParticles] = useState<
    Array<{ id: number; left: string; size: number; duration: number; delay: number; color: string }>
  >([]);

  useEffect(() => {
    // Generate 18 subtle floating light/dust particles with randomized properties
    const colors = ["#4FB7C5", "#0EA5E9", "#A8DFE7", "#FFFFFF", "#7C3AED"];
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 96 + 2}%`,
      size: Math.random() * 3.5 + 2, // 2px to 5.5px
      duration: Math.random() * 22 + 28, // 28s to 50s ultra slow rise
      delay: Math.random() * 25, // Staggered delays up to 25s
      color: colors[i % colors.length],
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* 1. Ultra-Slow Shifting Animated Mesh Gradient Overlay */}
      <div
        className="ambient-animated-gradient"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.65,
          mixBlendMode: "overlay",
        }}
      />

      {/* 2. Slow Floating Blur Orbs across Viewport */}
      <div
        className="ambient-blur-circle"
        style={{
          top: "12%",
          left: "8%",
          width: "480px",
          height: "480px",
          background: "radial-gradient(circle, rgba(79,183,197,0.11) 0%, transparent 70%)",
          animationDuration: "36s",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          top: "55%",
          right: "6%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)",
          animationDuration: "44s",
          animationDelay: "-12s",
        }}
      />
      <div
        className="ambient-blur-circle"
        style={{
          bottom: "8%",
          left: "30%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
          animationDuration: "38s",
          animationDelay: "-20s",
        }}
      />

      {/* 3. Almost Invisible Subtle Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            bottom: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            opacity: 0,
            animation: `ambientParticleRise ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
