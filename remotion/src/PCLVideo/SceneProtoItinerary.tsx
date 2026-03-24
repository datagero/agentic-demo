import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, cardStyle } from "./theme";
import { M } from "../AgenticOps/design";
import { PhoneMockup } from "./PhoneMockup";

// Scene — Itinerary prototype screen, 210 frames / 7 seconds
// Phone center-right, callout badges on the left
export const SceneProtoItinerary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneP = spring({ frame, fps, config: M.pop, delay: 5 });
  const b1 = spring({ frame, fps, config: M.snap, delay: 30 });
  const b2 = spring({ frame, fps, config: M.snap, delay: 50 });
  const b3 = spring({ frame, fps, config: M.snap, delay: 70 });
  const bx = (p: number) => interpolate(p, [0, 1], [-120, 0]);

  const BADGES = [
    { p: b1, icon: "🧠", title: "AI-Curated Daily Plans", desc: "Activities ranked by guest affinity and onboard availability", bg: T.blue50, border: T.blue400, titleColor: T.blue700, descColor: T.blue600 },
    { p: b2, icon: "🏅", title: "Medallion Perks Highlighted", desc: "Exclusive Medallion discounts surfaced inline in daily schedule", bg: T.amber50, border: T.amber500, titleColor: T.amber700, descColor: T.amber700 },
    { p: b3, icon: "⛅", title: "Weather-Aware Scheduling", desc: "Live conditions woven into activity recommendations", bg: T.white, border: T.gray300, titleColor: T.text, descColor: T.textMuted },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: T.gray, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans }}>
      <div style={{ display: "flex", alignItems: "center", gap: 48, width: 1000 }}>
        {/* Left callouts */}
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
        {/* Phone */}
        <div style={{ transform: `translateX(${interpolate(phoneP, [0, 1], [200, 0])}px)`, opacity: Math.min(phoneP * 2, 1), flexShrink: 0 }}>
          <PhoneMockup activeTab="itinerary">
            <ItineraryScreenContent frame={frame} />
          </PhoneMockup>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Phone screen content ─────────────────────────────────────────────────────

const TIMELINE_ITEMS = [
  { dot: T.gold,     time: "7:00 AM",  title: "Sunrise Yoga",         location: "Sun Deck",      tags: ["AI Pick", "For You"] },
  { dot: T.blue500,  time: "9:00 AM",  title: "Breakfast Buffet",     location: "Horizon Court", tags: [] },
  { dot: T.gold,     time: "11:00 AM", title: "Mixology Masterclass", location: "Crooners Bar",  tags: ["AI Pick"] },
  { dot: T.gold,     time: "1:00 PM",  title: "Lotus Spa Treatment",  location: "Deck 15",       tags: ["AI Pick", "For You"] },
];

const ItineraryScreenContent: React.FC<{ frame: number }> = ({ frame }) => {
  const itemOpacity = (i: number) => {
    const s = 15 + i * 12;
    return interpolate(frame, [s, s + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  };

  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: T.gray100, overflowY: "hidden" }}>
      {/* Navy header */}
      <div style={{ backgroundColor: T.navy, padding: "12px 14px 14px" }}>
        <p style={{ margin: 0, fontSize: 8, color: T.gold, letterSpacing: "0.12em", fontWeight: T.weight.medium, textTransform: "uppercase" }}>EASTERN CARIBBEAN</p>
        <p style={{ margin: "2px 0 0", fontFamily: "Georgia, serif", fontSize: 16, color: T.white, fontWeight: 600, lineHeight: 1.2 }}>Itinerary</p>
        <p style={{ margin: "2px 0 8px", fontSize: 11, color: T.gray400, lineHeight: 1.3 }}>Caribbean Princess · 8 days</p>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ backgroundColor: T.gold, borderRadius: 999, padding: "3px 10px" }}>
            <span style={{ fontSize: 9, fontWeight: T.weight.bold, color: T.navy }}>Daily Plan</span>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "3px 10px" }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}>All Ports</span>
          </div>
        </div>
      </div>

      {/* Day selector */}
      <div style={{ display: "flex", backgroundColor: T.white, borderBottom: `1px solid ${T.gray200}` }}>
        {["1","2","3","4","5","6","7","8"].map((d) => {
          const sel = d === "2";
          return (
            <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 2px", backgroundColor: sel ? T.navy : "transparent" }}>
              <span style={{ fontSize: 7, color: sel ? T.gold : T.gray400, fontWeight: T.weight.light, lineHeight: 1.2 }}>Day</span>
              <span style={{ fontSize: 11, fontWeight: T.weight.bold, color: sel ? T.white : T.gray600, lineHeight: 1.2 }}>{d}</span>
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div style={{ padding: "10px 10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Weather card */}
        <div style={{ ...cardStyle(), padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>⛅</span>
            <div>
              <p style={{ margin: 0, fontSize: 10, fontWeight: T.weight.bold, color: T.text, lineHeight: 1.3 }}>At Sea · Sea Day</p>
              <p style={{ margin: 0, fontSize: 9, color: T.textMuted }}>84°F</p>
            </div>
          </div>
          <span style={{ backgroundColor: T.blue50, color: T.blue600, fontSize: 8, fontWeight: T.weight.medium, borderRadius: 6, padding: "2px 7px" }}>Partly Cloudy</span>
        </div>

        {/* Activities label */}
        <p style={{ margin: 0, fontSize: 10, fontWeight: T.weight.bold, color: T.gray600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Activities</p>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 18 }}>
          <div style={{ position: "absolute", left: 6, top: 6, bottom: 6, width: 1.5, backgroundColor: T.gray200, borderRadius: 1 }} />
          {TIMELINE_ITEMS.map((item, i) => (
            <div key={item.title} style={{ opacity: itemOpacity(i), display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < TIMELINE_ITEMS.length - 1 ? 10 : 0, position: "relative" }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: -16, top: 8, width: 9, height: 9, borderRadius: "50%", backgroundColor: item.dot, border: `2px solid ${T.white}`, flexShrink: 0 }} />
              {/* Card */}
              <div style={{ ...cardStyle(), padding: "8px 10px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 8, color: T.textMuted, fontWeight: T.weight.medium, letterSpacing: "0.04em" }}>{item.time}</span>
                  {item.tags.length > 0 && (
                    <div style={{ display: "flex", gap: 4 }}>
                      {item.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 7, fontWeight: T.weight.bold, borderRadius: 4, padding: "1px 5px", backgroundColor: tag === "AI Pick" ? T.blue500 : T.amber50, color: tag === "AI Pick" ? T.white : T.amber700 }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: 10, fontWeight: T.weight.bold, color: T.text, lineHeight: 1.3 }}>{item.title}</p>
                <p style={{ margin: "2px 0 0", fontSize: 8, color: T.textMuted }}>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
