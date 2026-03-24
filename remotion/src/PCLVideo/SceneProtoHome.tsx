import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, cardStyle } from "./theme";
import { M } from "../AgenticOps/design";
import { PhoneMockup } from "./PhoneMockup";

// Scene — Home prototype screen, 210 frames / 7 seconds
// Phone centered-left, floating callout badges on the right
export const SceneProtoHome: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneP = spring({ frame, fps, config: M.pop, delay: 5 });
  const b1 = spring({ frame, fps, config: M.snap, delay: 30 });
  const b2 = spring({ frame, fps, config: M.snap, delay: 50 });
  const b3 = spring({ frame, fps, config: M.snap, delay: 70 });
  const bx = (p: number) => interpolate(p, [0, 1], [120, 0]);

  // Content auto-scroll: starts frame 40, 0 → -60px
  const scrollY = interpolate(frame, [40, 210], [0, -60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const BADGES = [
    { p: b1, icon: "🤖", title: "AI-Powered Recommendations", desc: "Personalized suggestions based on guest history & preferences", bg: T.blue50, border: T.blue400, titleColor: T.blue700, descColor: T.blue600 },
    { p: b2, icon: "🏅", title: "Medallion Personalization", desc: "Gold tier status and loyalty points surfaced at every touchpoint", bg: T.amber50, border: T.amber500, titleColor: T.amber700, descColor: T.amber700 },
    { p: b3, icon: "👆", title: "One-tap Booking", desc: "Reserve dining, excursions, and spa from a single tap", bg: T.white, border: T.gray300, titleColor: T.text, descColor: T.textMuted },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: T.gray, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans }}>
      <div style={{ display: "flex", alignItems: "center", gap: 48, width: 1000 }}>
        {/* Phone */}
        <div style={{ transform: `translateY(${interpolate(phoneP, [0, 1], [200, 0])}px)`, opacity: Math.min(phoneP * 2, 1), flexShrink: 0 }}>
          <PhoneMockup activeTab="home">
            <HomeScreenContent scrollY={scrollY} />
          </PhoneMockup>
        </div>
        {/* Right callouts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          {BADGES.map(({ p, icon, title, desc, bg, border, titleColor, descColor }) => (
            <div key={title} style={{ opacity: p, transform: `translateX(${bx(p)}px)`, backgroundColor: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: T.weight.bold, color: titleColor, lineHeight: 1.3 }}>{title}</p>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: descColor, lineHeight: 1.4 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Phone screen content ─────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { icon: "🍽", title: "Reserve Dining",    sub: "3 available" },
  { icon: "🛳", title: "Shore Excursions",  sub: "5 ports" },
  { icon: "💆", title: "Spa & Wellness",    sub: "20% off" },
  { icon: "📋", title: "Check-in",          sub: "Complete" },
];

const RECOMMENDED = [
  { icon: "👨‍🍳", title: "Chef's Table Experience",      price: "$89/person" },
  { icon: "🤿", title: "Snorkeling at Princess Cays", price: "$79/person" },
];

const HomeScreenContent: React.FC<{ scrollY: number }> = ({ scrollY }) => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${scrollY}px)`, backgroundColor: T.gray100 }}>
    {/* Navy voyage header */}
    <div style={{ backgroundColor: T.navy, padding: "12px 14px 14px" }}>
      <p style={{ margin: 0, fontSize: 8, color: T.gold, letterSpacing: "0.12em", fontWeight: T.weight.medium, textTransform: "uppercase" }}>YOUR VOYAGE</p>
      <p style={{ margin: "2px 0 0", fontFamily: "Georgia, serif", fontSize: 16, color: T.white, fontWeight: 600, lineHeight: 1.2 }}>Caribbean Princess</p>
      <p style={{ margin: "2px 0 6px", fontSize: 11, color: T.gray400, lineHeight: 1.3 }}>Eastern Caribbean · 7 nights</p>
      <div style={{ display: "inline-block", backgroundColor: T.gold, borderRadius: 999, padding: "3px 10px" }}>
        <span style={{ fontSize: 9, fontWeight: T.weight.bold, color: T.navy, letterSpacing: "0.04em" }}>14 days until departure</span>
      </div>
    </div>

    <div style={{ padding: "10px 10px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Medallion card */}
      <div style={{ ...cardStyle(), border: `1.5px solid ${T.gold}`, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>🏅</span>
        <span style={{ fontSize: 10, fontWeight: T.weight.medium, color: T.text }}>
          Gold Medallion Member · <span style={{ color: T.goldDark, fontWeight: T.weight.bold }}>2,450 points</span>
        </span>
      </div>

      {/* Quick Actions */}
      <div>
        <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: T.weight.bold, color: T.gray600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Quick Actions</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          {QUICK_ACTIONS.map(({ icon, title, sub }) => (
            <div key={title} style={{ ...cardStyle(), padding: "9px 10px" }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <p style={{ margin: "4px 0 2px", fontSize: 9, fontWeight: T.weight.bold, color: T.text, lineHeight: 1.3 }}>{title}</p>
              <p style={{ margin: 0, fontSize: 8, color: T.textMuted }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended for You */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: T.weight.bold, color: T.gray600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Recommended for You</p>
          <span style={{ backgroundColor: T.blue500, color: T.white, fontSize: 7, fontWeight: T.weight.bold, borderRadius: 4, padding: "1px 5px", letterSpacing: "0.06em" }}>AI</span>
        </div>
        {RECOMMENDED.map(({ icon, title, price }) => (
          <div key={title} style={{ ...cardStyle(), padding: "9px 12px", marginBottom: 7, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 9, fontWeight: T.weight.bold, color: T.text, lineHeight: 1.3 }}>{title}</p>
              <p style={{ margin: "2px 0 0", fontSize: 8, color: T.textMuted }}>{price}</p>
            </div>
            <div style={{ backgroundColor: T.navy, borderRadius: 6, padding: "4px 8px" }}>
              <span style={{ fontSize: 8, color: T.gold, fontWeight: T.weight.bold }}>Book</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
