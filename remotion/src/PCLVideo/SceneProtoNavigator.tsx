import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { T, cardStyle } from "./theme";
import { M } from "../AgenticOps/design";
import { PhoneMockup } from "./PhoneMockup";

// Scene — Navigator Prototype, 210 frames / 7 seconds at 30fps
// Phone center-right, callout badges on the left
export const SceneProtoNavigator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone entrance (from right)
  const phoneP = spring({ frame, fps, config: M.pop, delay: 5 });

  // Deck map icons pop in
  const icon1P = spring({ frame, fps, config: M.pop, delay: 25 });
  const icon2P = spring({ frame, fps, config: M.pop, delay: 35 });
  const icon3P = spring({ frame, fps, config: M.pop, delay: 45 });
  const icon4P = spring({ frame, fps, config: M.pop, delay: 55 });

  // Callout badge stagger (from left)
  const callout1P = spring({ frame, fps, config: M.snap, delay: 40 });
  const callout2P = spring({ frame, fps, config: M.snap, delay: 60 });
  const callout3P = spring({ frame, fps, config: M.snap, delay: 80 });

  const phoneX = interpolate(phoneP, [0, 1], [340, 0]);

  const callout1X = interpolate(callout1P, [0, 1], [-300, 0]);
  const callout2X = interpolate(callout2P, [0, 1], [-300, 0]);
  const callout3X = interpolate(callout3P, [0, 1], [-300, 0]);

  const decks = ["17", "16", "15", "7", "6"];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: T.gray,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: T.sans,
        overflow: "hidden",
      }}
    >
      {/* Left-side callout badges */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 240, marginRight: 60 }}>

        {/* Callout 1 */}
        <div style={{
          transform: `translateX(${callout1X}px)`,
          opacity: Math.min(callout1P * 1.5, 1),
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: T.white,
          borderLeft: `4px solid ${T.gold}`,
          borderRadius: 12,
          padding: "12px 18px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}>
          <span style={{ fontSize: 22 }}>🧭</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: T.weight.bold, color: T.navy, margin: 0 }}>Indoor Navigation</p>
            <p style={{ fontSize: 10, color: T.textMuted, margin: 0 }}>Turn-by-turn ship routing</p>
          </div>
        </div>

        {/* Callout 2 */}
        <div style={{
          transform: `translateX(${callout2X}px)`,
          opacity: Math.min(callout2P * 1.5, 1),
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: T.white,
          borderLeft: `4px solid ${T.gold}`,
          borderRadius: 12,
          padding: "12px 18px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}>
          <span style={{ fontSize: 22 }}>♿</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: T.weight.bold, color: T.navy, margin: 0 }}>ADA Accessible Routes</p>
            <p style={{ fontSize: 10, color: T.textMuted, margin: 0 }}>Inclusive wayfinding</p>
          </div>
        </div>

        {/* Callout 3 */}
        <div style={{
          transform: `translateX(${callout3X}px)`,
          opacity: Math.min(callout3P * 1.5, 1),
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: T.white,
          borderLeft: `4px solid ${T.gold}`,
          borderRadius: 12,
          padding: "12px 18px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}>
          <span style={{ fontSize: 22 }}>📡</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: T.weight.bold, color: T.navy, margin: 0 }}>Medallion Location Services</p>
            <p style={{ fontSize: 10, color: T.textMuted, margin: 0 }}>Real-time guest tracking</p>
          </div>
        </div>

      </div>

      {/* Phone — center-right */}
      <div
        style={{
          transform: `translateX(${phoneX}px)`,
          opacity: Math.min(phoneP * 1.5, 1),
        }}
      >
        <PhoneMockup activeTab="navigator">
          {/* Screen content */}
          <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.gray100 }}>

            {/* Navy header */}
            <div style={{ backgroundColor: T.navy, padding: "10px 14px", flexShrink: 0 }}>
              <p style={{ color: T.gold, fontSize: 8, fontWeight: T.weight.bold, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 2px" }}>SHIP MAP</p>
              <p style={{ fontFamily: "Georgia, serif", color: T.white, fontSize: 16, fontWeight: 700, margin: "0 0 1px" }}>Navigator</p>
              <p style={{ color: T.gray300, fontSize: 9, margin: "0 0 6px" }}>Caribbean Princess · Deck Guide</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {/* Accessibility toggle */}
                <div style={{
                  backgroundColor: T.navyLight,
                  border: `1px solid ${T.gold}`,
                  borderRadius: 6,
                  padding: "2px 7px",
                  fontSize: 8,
                  color: T.gold,
                  fontWeight: T.weight.medium,
                }}>
                  ♿ A11y
                </div>
                {/* Search bar */}
                <div style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  padding: "3px 8px",
                  fontSize: 8,
                  color: T.gray400,
                  border: `1px solid rgba(255,255,255,0.15)`,
                }}>
                  🔍 Find on ship...
                </div>
              </div>
            </div>

            {/* Scrollable area */}
            <div style={{ flex: 1, overflowY: "hidden", padding: "8px 10px" }}>

              {/* Location card */}
              <div style={{
                ...cardStyle(),
                borderLeft: `3px solid ${T.gold}`,
                padding: "7px 10px",
                marginBottom: 8,
              }}>
                <p style={{ fontSize: 10, fontWeight: T.weight.bold, color: T.text, margin: "0 0 1px" }}>📍 You are here</p>
                <p style={{ fontSize: 9, color: T.textMuted, margin: "0 0 2px" }}>Cabin D412 · Dolphin Deck 9</p>
                <p style={{ fontSize: 8, color: T.green600, fontWeight: T.weight.medium, margin: 0 }}>Medallion Active ✓</p>
              </div>

              {/* Deck selector */}
              <p style={{ fontSize: 9, fontWeight: T.weight.bold, color: T.gray600, margin: "0 0 5px", textTransform: "uppercase", letterSpacing: 1 }}>Select Deck</p>
              <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                {decks.map((deck) => {
                  const isActive = deck === "15";
                  return (
                    <div key={deck} style={{
                      padding: "3px 9px",
                      borderRadius: 20,
                      fontSize: 9,
                      fontWeight: T.weight.bold,
                      backgroundColor: isActive ? T.navy : T.white,
                      color: isActive ? T.white : T.gray600,
                      border: `1px solid ${isActive ? T.navy : T.gray300}`,
                    }}>
                      {deck}
                    </div>
                  );
                })}
              </div>

              {/* Deck section label */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <p style={{ fontSize: 10, fontWeight: T.weight.bold, color: T.text, margin: 0 }}>Lido Deck</p>
                <div style={{
                  backgroundColor: T.navy,
                  color: T.white,
                  borderRadius: 4,
                  padding: "1px 5px",
                  fontSize: 8,
                  fontWeight: T.weight.bold,
                }}>15</div>
              </div>

              {/* Deck map */}
              <div style={{
                border: `1.5px dashed ${T.gray300}`,
                borderRadius: 10,
                backgroundColor: T.white,
                padding: 8,
                marginBottom: 8,
                position: "relative",
                height: 100,
                overflow: "hidden",
              }}>
                {/* Map icon 1 */}
                <div style={{
                  position: "absolute",
                  top: 12,
                  left: 14,
                  opacity: icon1P,
                  transform: `scale(${interpolate(icon1P, [0, 1], [0.3, 1])})`,
                  fontSize: 9,
                  backgroundColor: T.amber50,
                  border: `1px solid ${T.amber500}`,
                  borderRadius: 6,
                  padding: "2px 5px",
                  color: T.amber700,
                  fontWeight: T.weight.medium,
                  whiteSpace: "nowrap",
                }}>
                  🍽 Horizon Court Buffet
                </div>
                {/* Map icon 2 */}
                <div style={{
                  position: "absolute",
                  top: 38,
                  right: 14,
                  opacity: icon2P,
                  transform: `scale(${interpolate(icon2P, [0, 1], [0.3, 1])})`,
                  fontSize: 9,
                  backgroundColor: T.amber50,
                  border: `1px solid ${T.amber500}`,
                  borderRadius: 6,
                  padding: "2px 5px",
                  color: T.amber700,
                  fontWeight: T.weight.medium,
                  whiteSpace: "nowrap",
                }}>
                  🍔 Trident Grill
                </div>
                {/* Map icon 3 */}
                <div style={{
                  position: "absolute",
                  top: 62,
                  left: 14,
                  opacity: icon3P,
                  transform: `scale(${interpolate(icon3P, [0, 1], [0.3, 1])})`,
                  fontSize: 9,
                  backgroundColor: T.blue50,
                  border: `1px solid ${T.blue400}`,
                  borderRadius: 6,
                  padding: "2px 5px",
                  color: T.blue700,
                  fontWeight: T.weight.medium,
                  whiteSpace: "nowrap",
                }}>
                  💆 Lotus Spa
                </div>
                {/* Map icon 4 */}
                <div style={{
                  position: "absolute",
                  top: 62,
                  right: 14,
                  opacity: icon4P,
                  transform: `scale(${interpolate(icon4P, [0, 1], [0.3, 1])})`,
                  fontSize: 9,
                  backgroundColor: T.blue50,
                  border: `1px solid ${T.blue400}`,
                  borderRadius: 6,
                  padding: "2px 5px",
                  color: T.blue700,
                  fontWeight: T.weight.medium,
                  whiteSpace: "nowrap",
                }}>
                  💪 Fitness Center
                </div>
              </div>

              {/* List items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ ...cardStyle(), padding: "6px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 9, fontWeight: T.weight.medium, color: T.text }}>🍽 Horizon Court Buffet</span>
                  <span style={{ fontSize: 9, color: T.textMuted }}>2 min walk</span>
                </div>
                <div style={{ ...cardStyle(), padding: "6px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 9, fontWeight: T.weight.medium, color: T.text }}>💆 Lotus Spa</span>
                  <span style={{ fontSize: 9, color: T.textMuted }}>3 min walk</span>
                </div>
              </div>

            </div>
          </div>
        </PhoneMockup>
      </div>
    </AbsoluteFill>
  );
};
