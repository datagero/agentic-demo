import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { T } from "./theme";
import { M, float } from "../AgenticOps/design";

// Scene 7 — Outro, 90 frames / 3 seconds at 30fps
// Elegant PCL close: logo, tagline, co-brand, confidential note
export const SceneOutroPCL: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoP = spring({ frame, fps, config: M.snap, delay: 3 });
  const taglineP = spring({ frame, fps, config: M.snap, delay: 15 });
  const cobrandP = spring({ frame, fps, config: M.snap, delay: 25 });
  const confP = spring({ frame, fps, config: M.snap, delay: 35 });

  // Gentle fade-out in the final 15 frames
  const fadeOut = interpolate(
    frame,
    [75, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const floatY = float(frame, 0, 0.05, 3);
  const logoY = interpolate(logoP, [0, 1], [60, floatY]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.navy,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: T.sans,
        opacity: fadeOut,
        overflow: "hidden",
      }}
    >
      {/* Gold accent top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
          opacity: Math.min(logoP * 2, 1),
        }}
      />

      {/* Princess Cruises logo + ship icon, centered */}
      <div
        style={{
          opacity: Math.min(logoP * 1.5, 1),
          transform: `translateY(${logoY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div style={{ fontSize: 72 }}>🚢</div>
        <div
          style={{
            width: 60,
            height: 2,
            backgroundColor: T.gold,
            borderRadius: 1,
            opacity: 0.7,
          }}
        />
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 52,
            fontWeight: "bold",
            color: T.white,
            margin: 0,
            letterSpacing: 3,
            textAlign: "center",
          }}
        >
          Princess Cruises
        </h1>
      </div>

      {/* "COME BACK NEW" tagline in gold */}
      <div
        style={{
          opacity: Math.min(taglineP * 1.5, 1),
          transform: `translateY(${interpolate(taglineP, [0, 1], [16, 0])}px)`,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: T.sans,
            fontSize: 18,
            fontWeight: T.weight.medium,
            color: T.gold,
            margin: 0,
            letterSpacing: 6,
            textTransform: "uppercase" as const,
          }}
        >
          Come Back New
        </p>
      </div>

      {/* "Thoughtworks × Princess Cruises" co-brand */}
      <div
        style={{
          opacity: Math.min(cobrandP * 1.5, 1),
          transform: `translateY(${interpolate(cobrandP, [0, 1], [14, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 32px",
          border: `1px solid rgba(196,169,98,0.25)`,
          borderRadius: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: T.gold,
            }}
          />
          <span
            style={{
              fontFamily: T.sans,
              fontSize: 16,
              fontWeight: T.weight.medium,
              color: T.white,
              letterSpacing: 0.5,
            }}
          >
            Thoughtworks
          </span>
        </div>

        <span
          style={{
            fontSize: 18,
            color: T.gray400,
            fontWeight: T.weight.light,
          }}
        >
          ×
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: T.goldLight,
            }}
          />
          <span
            style={{
              fontFamily: T.sans,
              fontSize: 16,
              fontWeight: T.weight.medium,
              color: T.goldLight,
              letterSpacing: 0.5,
            }}
          >
            Princess Cruises
          </span>
        </div>
      </div>

      {/* Confidential note — very subtle */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: Math.min(confP, 1) * 0.35,
          fontSize: 12,
          fontWeight: T.weight.light,
          color: T.gray400,
          letterSpacing: 3,
          fontFamily: T.sans,
          textTransform: "uppercase" as const,
        }}
      >
        Confidential — RFP Response 2026
      </div>

      {/* Gold accent bottom rule */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
          opacity: Math.min(logoP * 2, 1),
        }}
      />
    </AbsoluteFill>
  );
};
