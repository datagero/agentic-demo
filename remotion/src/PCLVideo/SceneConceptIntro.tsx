import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { T, goldBadge } from "./theme";
import { M, float } from "../AgenticOps/design";

// Scene 1 — Concept Intro, 150 frames / 5 seconds at 30fps
// Brand opening: sets the stage before the prototype demo
export const SceneConceptIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring values for each element's entrance
  const shipP = spring({ frame, fps, config: M.pop, delay: 5 });
  const titleP = spring({ frame, fps, config: M.snap, delay: 15 });
  const subtitleP = spring({ frame, fps, config: M.snap, delay: 30 });
  const taglineP = spring({ frame, fps, config: M.snap, delay: 45 });
  const cobrandP = spring({ frame, fps, config: M.snap, delay: 60 });
  const medalP = spring({ frame, fps, config: M.snap, delay: 70 });

  // Decorative float offsets
  const shipFloat = float(frame, 0, 0.05, 6);
  const medalFloat = float(frame, 2, 0.05, 4);
  const waveFloat = float(frame, 1, 0.05, 3);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 35%, ${T.navyLight} 0%, ${T.navy} 60%, #001f3f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: T.sans,
        overflow: "hidden",
      }}
    >
      {/* Subtle wave SVG accent */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          opacity: interpolate(subtitleP, [0, 1], [0, 0.18]),
          transform: `translateY(${waveFloat}px)`,
        }}
        viewBox="0 0 1920 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C320,110 640,10 960,60 C1280,110 1600,10 1920,60 L1920,120 L0,120 Z"
          fill={T.gold}
        />
      </svg>

      {/* Horizontal gold rule above content */}
      <div
        style={{
          position: "absolute",
          top: 160,
          width: interpolate(titleP, [0, 1], [0, 320]),
          height: 1,
          backgroundColor: T.gold,
          opacity: 0.4,
        }}
      />

      {/* Ship icon */}
      <div
        style={{
          fontSize: 96,
          lineHeight: 1,
          opacity: Math.min(shipP * 1.5, 1),
          transform: `scale(${interpolate(shipP, [0, 1], [0.3, 1])}) translateY(${shipFloat}px)`,
          marginBottom: 28,
        }}
      >
        🚢
      </div>

      {/* Gold accent divider */}
      <div
        style={{
          width: interpolate(shipP, [0, 1], [0, 80]),
          height: 2,
          backgroundColor: T.gold,
          borderRadius: 1,
          marginBottom: 32,
          opacity: Math.min(shipP * 1.5, 1),
        }}
      />

      {/* "Princess Cruises" — Georgia serif, springs in */}
      <div
        style={{
          opacity: Math.min(titleP * 1.5, 1),
          transform: `translateY(${interpolate(titleP, [0, 1], [40, 0])}px)`,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 68,
            fontWeight: "bold",
            color: T.white,
            margin: 0,
            letterSpacing: 3,
            textShadow: "0 2px 24px rgba(0,0,0,0.4)",
          }}
        >
          Princess Cruises
        </h1>
      </div>

      {/* "Mobile App Transformation" — Bitter display, fades up */}
      <div
        style={{
          opacity: Math.min(subtitleP * 1.5, 1),
          transform: `translateY(${interpolate(subtitleP, [0, 1], [30, 0])}px)`,
          textAlign: "center",
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            fontFamily: T.display,
            fontSize: 46,
            fontWeight: T.weight.bold,
            color: T.white,
            margin: 0,
            letterSpacing: 1,
            opacity: 0.92,
          }}
        >
          Mobile App Transformation
        </h2>
      </div>

      {/* Tagline — Inter, gold */}
      <div
        style={{
          opacity: Math.min(taglineP * 1.5, 1),
          transform: `translateY(${interpolate(taglineP, [0, 1], [20, 0])}px)`,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <p
          style={{
            fontFamily: T.sans,
            fontSize: 26,
            fontWeight: T.weight.light,
            color: T.gold,
            margin: 0,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Your voyage, reimagined
        </p>
      </div>

      {/* Medallion Gold badge — floats in */}
      <div
        style={{
          opacity: Math.min(medalP * 2, 1),
          transform: `translateY(${interpolate(medalP, [0, 1], [30, medalFloat])}px) scale(${interpolate(medalP, [0, 1], [0.6, 1])})`,
        }}
      >
        <div
          style={{
            ...goldBadge(0),
            padding: "10px 28px",
            fontSize: 16,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
          }}
        >
          ✦ Gold Medallion
        </div>
      </div>

      {/* Horizontal gold rule below content */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          width: interpolate(cobrandP, [0, 1], [0, 320]),
          height: 1,
          backgroundColor: T.gold,
          opacity: 0.4,
        }}
      />

      {/* "Thoughtworks" co-brand — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          right: 72,
          opacity: Math.min(cobrandP * 1.5, 1),
          transform: `translateY(${interpolate(cobrandP, [0, 1], [16, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: T.gold,
          }}
        />
        <span
          style={{
            fontFamily: T.sans,
            fontSize: 15,
            fontWeight: T.weight.medium,
            color: T.gray400,
            letterSpacing: 1,
          }}
        >
          Thoughtworks
        </span>
      </div>
    </AbsoluteFill>
  );
};
