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

// Scene — Commerce Prototype, 210 frames / 7 seconds at 30fps
// Phone center-left, callout badges on the right
export const SceneProtoCommerce: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone entrance
  const phoneP = spring({ frame, fps, config: M.pop, delay: 5 });

  // Product card stagger
  const product1P = spring({ frame, fps, config: M.pop, delay: 20 });
  const product2P = spring({ frame, fps, config: M.pop, delay: 35 });
  const product3P = spring({ frame, fps, config: M.pop, delay: 50 });

  // Callout badge stagger (from right)
  const callout1P = spring({ frame, fps, config: M.snap, delay: 40 });
  const callout2P = spring({ frame, fps, config: M.snap, delay: 60 });
  const callout3P = spring({ frame, fps, config: M.snap, delay: 80 });

  // Subtle auto-scroll effect on content
  const scrollOffset = interpolate(frame, [30, 180], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phoneX = interpolate(phoneP, [0, 1], [-340, 0]);

  const callout1X = interpolate(callout1P, [0, 1], [300, 0]);
  const callout2X = interpolate(callout2P, [0, 1], [300, 0]);
  const callout3X = interpolate(callout3P, [0, 1], [300, 0]);

  const categories = ["All", "Dining", "Spa", "Excursions", "Drinks", "Retail"];

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
      {/* Phone — center-left */}
      <div
        style={{
          transform: `translateX(${phoneX}px)`,
          opacity: Math.min(phoneP * 1.5, 1),
          marginRight: 60,
          position: "relative",
        }}
      >
        <PhoneMockup activeTab="shop">
          {/* Screen content */}
          <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.gray100 }}>

            {/* Navy header */}
            <div style={{ backgroundColor: T.navy, padding: "10px 14px", flexShrink: 0 }}>
              <p style={{ color: T.gold, fontSize: 8, fontWeight: T.weight.bold, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 2px" }}>ONBOARD</p>
              <p style={{ fontFamily: "Georgia, serif", color: T.white, fontSize: 16, fontWeight: 700, margin: "0 0 1px" }}>Shop &amp; Book</p>
              <p style={{ color: T.gray300, fontSize: 9, margin: 0 }}>Experiences, dining &amp; more</p>
            </div>

            {/* Scrollable area */}
            <div style={{ flex: 1, overflowY: "hidden", position: "relative" }}>
              <div style={{ transform: `translateY(-${scrollOffset}px)`, padding: "8px 10px" }}>

                {/* Gold gradient banner */}
                <div style={{
                  background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`,
                  borderRadius: 10,
                  padding: "8px 10px",
                  marginBottom: 8,
                  fontSize: 9,
                  fontWeight: T.weight.bold,
                  color: T.navy,
                }}>
                  🎉 Early Bird Special — Book 48hrs before departure — save 20% on dining
                </div>

                {/* Gold-bordered info card */}
                <div style={{
                  ...cardStyle(),
                  border: `1.5px solid ${T.gold}`,
                  padding: "6px 10px",
                  marginBottom: 8,
                  fontSize: 9,
                  color: T.navy,
                }}>
                  🏅 Gold members save 15% on select items
                </div>

                {/* Category filter pills */}
                <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "nowrap", overflow: "hidden" }}>
                  {categories.map((cat) => {
                    const isActive = cat === "All";
                    return (
                      <div key={cat} style={{
                        padding: "3px 8px",
                        borderRadius: 20,
                        fontSize: 8,
                        fontWeight: T.weight.medium,
                        backgroundColor: isActive ? T.navy : T.white,
                        color: isActive ? T.white : T.gray600,
                        border: `1px solid ${isActive ? T.navy : T.gray300}`,
                        flexShrink: 0,
                      }}>
                        {cat}
                      </div>
                    );
                  })}
                </div>

                {/* Section label */}
                <p style={{ fontSize: 10, fontWeight: T.weight.bold, color: T.text, margin: "0 0 6px" }}>8 Items</p>

                {/* Product card 1 */}
                <div style={{
                  ...cardStyle(),
                  padding: "8px 10px",
                  marginBottom: 6,
                  opacity: product1P,
                  transform: `translateY(${interpolate(product1P, [0, 1], [20, 0])}px)`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 10, fontWeight: T.weight.bold, color: T.text, margin: "0 0 2px" }}>🍝 Sabatini's Italian Trattoria</p>
                      <p style={{ fontSize: 9, color: T.textMuted, margin: "0 0 3px" }}>★ 4.8 (342)</p>
                      <p style={{ fontSize: 11, fontWeight: T.weight.bold, color: T.navy, margin: 0 }}>$29</p>
                    </div>
                    <div style={{
                      backgroundColor: T.navy,
                      color: T.white,
                      borderRadius: 8,
                      padding: "4px 10px",
                      fontSize: 9,
                      fontWeight: T.weight.bold,
                      alignSelf: "center",
                    }}>
                      Add
                    </div>
                  </div>
                </div>

                {/* Product card 2 */}
                <div style={{
                  ...cardStyle(),
                  padding: "8px 10px",
                  marginBottom: 6,
                  opacity: product2P,
                  transform: `translateY(${interpolate(product2P, [0, 1], [20, 0])}px)`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 10, fontWeight: T.weight.bold, color: T.text, margin: "0 0 2px" }}>💆 Deep Tissue Massage</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                        <span style={{ fontSize: 9, color: T.textMuted, textDecoration: "line-through" }}>$149</span>
                        <span style={{ fontSize: 11, fontWeight: T.weight.bold, color: T.navy }}>$119</span>
                        <span style={{
                          backgroundColor: T.gold,
                          color: T.navy,
                          borderRadius: 4,
                          padding: "1px 5px",
                          fontSize: 7,
                          fontWeight: T.weight.bold,
                        }}>Gold -15%</span>
                      </div>
                      <p style={{ fontSize: 9, color: T.textMuted, margin: 0 }}>★ 4.9 (156)</p>
                    </div>
                    <div style={{
                      backgroundColor: T.navy,
                      color: T.white,
                      borderRadius: 8,
                      padding: "4px 10px",
                      fontSize: 9,
                      fontWeight: T.weight.bold,
                      alignSelf: "center",
                    }}>
                      Add
                    </div>
                  </div>
                </div>

                {/* Product card 3 */}
                <div style={{
                  ...cardStyle(),
                  padding: "8px 10px",
                  marginBottom: 6,
                  opacity: product3P,
                  transform: `translateY(${interpolate(product3P, [0, 1], [20, 0])}px)`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 10, fontWeight: T.weight.bold, color: T.text, margin: "0 0 2px" }}>🤿 Snorkeling at Princess Cays</p>
                      <p style={{ fontSize: 9, color: T.textMuted, margin: "0 0 3px" }}>★ 4.8 (412)</p>
                      <p style={{ fontSize: 11, fontWeight: T.weight.bold, color: T.navy, margin: 0 }}>$79</p>
                    </div>
                    <div style={{
                      backgroundColor: T.navy,
                      color: T.white,
                      borderRadius: 8,
                      padding: "4px 10px",
                      fontSize: 9,
                      fontWeight: T.weight.bold,
                      alignSelf: "center",
                    }}>
                      Add
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Sticky bottom — View Cart */}
            <div style={{
              backgroundColor: T.navy,
              padding: "10px 14px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}>
              <span style={{ color: T.white, fontSize: 11, fontWeight: T.weight.bold }}>🛒 View Cart</span>
              <div style={{
                position: "absolute",
                right: 18,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: T.gold,
                color: T.navy,
                borderRadius: "50%",
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                fontWeight: T.weight.bold,
              }}>
                2
              </div>
            </div>
          </div>
        </PhoneMockup>
      </div>

      {/* Right-side callout badges */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 240 }}>

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
          <span style={{ fontSize: 22 }}>🏅</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: T.weight.bold, color: T.navy, margin: 0 }}>Medallion Tier Discounts</p>
            <p style={{ fontSize: 10, color: T.textMuted, margin: 0 }}>Personalised loyalty pricing</p>
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
          <span style={{ fontSize: 22 }}>🛍</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: T.weight.bold, color: T.navy, margin: 0 }}>Onboard Commerce Engine</p>
            <p style={{ fontSize: 10, color: T.textMuted, margin: 0 }}>Unified cart across categories</p>
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
          <span style={{ fontSize: 22 }}>📈</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: T.weight.bold, color: T.navy, margin: 0 }}>Dynamic Pricing &amp; Offers</p>
            <p style={{ fontSize: 10, color: T.textMuted, margin: 0 }}>Real-time early-bird deals</p>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
