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

// Scene — Analytics Deep Dive, 300 frames / 10 seconds at 30fps
// Two-phase: phone + callouts (0-140), zoomed-out dashboard (140-300)

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const countUp = (frame: number, to: number, start: number, end: number) =>
  Math.round(interpolate(frame, [start, end], [0, to], clamp));

// ─── Phone screen: analytics dashboard ───────────────────────────────────────
const AnalyticsDashboard: React.FC<{ frame: number }> = ({ frame }) => {
  const kpiData = [
    { icon: "⭐", label: "NPS Score",      raw: 72,  pct: (72 / 75) * 100, target: 75,  trend: "+10.8%", fmt: (v: number) => `${v}`    },
    { icon: "📱", label: "App Rating",     raw: 46,  pct: (4.6 / 4.7) * 100, target: 4.7, trend: "+7.0%",  fmt: (v: number) => `${(v / 10).toFixed(1)}` },
    { icon: "💳", label: "Booking Conv.",  raw: 34,  pct: (34 / 35) * 100, target: "35%", trend: "+21.4%", fmt: (v: number) => `${v}%`  },
    { icon: "💰", label: "Rev/Guest",      raw: 847, pct: (847 / 900) * 100, target: "$900", trend: "+17.6%", fmt: (v: number) => `$${v}` },
  ];

  const barHeights = [42, 48, 51, 55, 62, 71, 68];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const funnelItems = [
    { label: "App Downloads",      val: "125K", pct: 100 },
    { label: "Registrations",      val: "98K",  pct: 78  },
    { label: "Active Users",       val: "72K",  pct: 58  },
    { label: "Pre-Cruise Bookers", val: "45K",  pct: 36  },
    { label: "Repeat Bookers",     val: "18K",  pct: 14  },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: T.gray100, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ backgroundColor: T.navy, padding: "8px 10px 10px", flexShrink: 0 }}>
        <span style={{ fontSize: 7, color: T.gold, letterSpacing: "0.14em", fontWeight: T.weight.bold, textTransform: "uppercase" }}>STAKEHOLDER VIEW</span>
        <p style={{ margin: "1px 0 0", fontFamily: "Georgia, serif", fontSize: 14, color: T.white, fontWeight: 600, lineHeight: 1.2 }}>Analytics</p>
        <p style={{ margin: "1px 0 4px", fontSize: 9, color: T.gray300 }}>Real-time KPI dashboard</p>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ backgroundColor: T.gold, borderRadius: 999, padding: "2px 8px" }}>
            <span style={{ fontSize: 7, fontWeight: T.weight.bold, color: T.navy }}>Last 7 Days</span>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 999, padding: "2px 8px" }}>
            <span style={{ fontSize: 7, color: T.gray300 }}>Last 30 Days</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "hidden", padding: "8px 8px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={{ margin: 0, fontSize: 9, fontWeight: T.weight.bold, color: T.gray600, letterSpacing: "0.07em", textTransform: "uppercase" }}>Key Metrics</p>

        {/* 2x2 KPI grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {kpiData.map((kpi, i) => {
            const val = kpi.fmt(countUp(frame, kpi.raw, 15 + i * 7, 45 + i * 7));
            const barW = interpolate(frame, [15 + i * 7, 45 + i * 7], [0, kpi.pct], clamp);
            return (
              <div key={kpi.label} style={{ ...cardStyle(), padding: "7px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11 }}>{kpi.icon}</span>
                  <span style={{ fontSize: 7, color: T.green600, fontWeight: T.weight.bold }}>↑ {kpi.trend}</span>
                </div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: T.weight.bold, color: T.navy, lineHeight: 1 }}>{val}</p>
                <p style={{ margin: 0, fontSize: 7, color: T.textMuted }}>{kpi.label}</p>
                <div style={{ height: 3, backgroundColor: T.gray200, borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${barW}%`, height: "100%", backgroundColor: T.gold, borderRadius: 999 }} />
                </div>
                <p style={{ margin: 0, fontSize: 6, color: T.gray400 }}>Target: {kpi.target}</p>
              </div>
            );
          })}
        </div>

        {/* Daily Revenue bar chart */}
        <div style={{ ...cardStyle(), padding: "6px 8px" }}>
          <p style={{ margin: "0 0 5px", fontSize: 8, fontWeight: T.weight.bold, color: T.gray600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Daily Revenue</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 38 }}>
            {barHeights.map((h, i) => {
              const animH = interpolate(frame, [30 + i * 4, 55 + i * 4], [0, (h / 71) * 34], clamp);
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div style={{ height: animH, width: "100%", backgroundColor: h === 71 ? T.gold : T.navy, borderRadius: "2px 2px 0 0" }} />
                  <span style={{ fontSize: 5, color: T.textMuted, marginTop: 1 }}>{days[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guest Engagement Funnel */}
        <div style={{ ...cardStyle(), padding: "6px 8px" }}>
          <p style={{ margin: "0 0 5px", fontSize: 8, fontWeight: T.weight.bold, color: T.gray600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Guest Engagement Funnel</p>
          {funnelItems.map((item, i) => {
            const w = interpolate(frame, [45 + i * 7, 80 + i * 7], [0, item.pct], clamp);
            return (
              <div key={item.label} style={{ marginBottom: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 7, color: T.text }}>{item.label}</span>
                  <span style={{ fontSize: 7, fontWeight: T.weight.bold, color: T.navy }}>{item.val}</span>
                </div>
                <div style={{ height: 5, backgroundColor: T.gray200, borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${w}%`, height: "100%", backgroundColor: T.navyLight, borderRadius: 999 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Main scene ───────────────────────────────────────────────────────────────
export const SceneAnalyticsPCL: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 entrances
  const phoneP   = spring({ frame, fps, config: M.snap, delay: 3   });
  const callout1P = spring({ frame, fps, config: M.snap, delay: 60  });
  const callout2P = spring({ frame, fps, config: M.snap, delay: 90  });

  // Phase 2 transition 140-170
  const phase2 = interpolate(frame, [140, 170], [0, 1], clamp);
  const phoneScale = interpolate(phase2, [0, 1], [1, 0.7]);
  const phoneShiftX = interpolate(phase2, [0, 1], [0, -80]);
  const phase1Opacity = interpolate(phase2, [0, 0.6], [1, 0], clamp);
  const phase2Opacity = interpolate(phase2, [0.3, 1], [0, 1], clamp);

  // Phase 2 detail cards
  const spendP  = spring({ frame, fps, config: M.pop, delay: 150 });
  const alertsP = spring({ frame, fps, config: M.pop, delay: 175 });

  const fromRight = (p: number) => interpolate(p, [0, 1], [180, 0]);

  const spendItems = [
    { label: "Dining",          pct: 42, amount: "$356", color: T.navy     },
    { label: "Spa & Wellness",  pct: 28, amount: "$237", color: T.gold     },
    { label: "Excursions",      pct: 20, amount: "$169", color: T.blue500  },
    { label: "Retail & Photo",  pct: 10, amount: "$85",  color: T.gray400  },
  ];

  const alertItems = [
    { icon: "✅", text: "NPS trending above target — +7 points this week", borderColor: T.green500, bg: "#F0FDF4" },
    { icon: "ℹ️", text: "Spa booking surge on Deck 15",                    borderColor: T.blue500,  bg: T.blue50  },
    { icon: "⚠️", text: "Check-in wait time approaching threshold",        borderColor: T.amber500, bg: T.amber50 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: T.gray100, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, overflow: "hidden" }}>

      {/* Top accent stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${T.navy}, ${T.gold}, ${T.navy})`, opacity: Math.min(phoneP * 2, 1) }} />

      {/* Main row */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, width: 1060, position: "relative" }}>

        {/* Phone */}
        <div style={{ transform: `translateX(${interpolate(phoneP, [0, 1], [-120, 0]) + phoneShiftX}px) scale(${phoneScale})`, opacity: Math.min(phoneP * 2, 1), flexShrink: 0, transformOrigin: "center center" }}>
          <PhoneMockup activeTab="insights">
            <AnalyticsDashboard frame={frame} />
          </PhoneMockup>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, position: "relative", minHeight: 520 }}>

          {/* Phase 1 callouts */}
          <div style={{ opacity: phase1Opacity }}>
            {/* Callout 1 */}
            <div style={{ opacity: callout1P, transform: `translateX(${fromRight(callout1P)}px)`, backgroundColor: T.white, border: `2px solid ${T.gold}`, borderRadius: 16, padding: "18px 22px", display: "flex", gap: 14, marginBottom: 20, boxShadow: "0 4px 24px rgba(0,59,111,0.10)" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: T.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>📊</div>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: T.weight.bold, color: T.navy, lineHeight: 1.3 }}>Real-Time KPI Monitoring</p>
                <p style={{ margin: "5px 0 8px", fontSize: 12, color: T.textMuted, lineHeight: 1.5 }}>Track NPS, revenue, conversion across all touchpoints</p>
                <div style={{ display: "flex", gap: 6 }}>
                  {["NPS 72 ↑", "Conv. 34% ↑", "Rating 4.6 ↑"].map((tag) => (
                    <span key={tag} style={{ backgroundColor: T.gray100, border: `1px solid ${T.gray200}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, color: T.green600, fontWeight: T.weight.bold }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Callout 2 */}
            <div style={{ opacity: callout2P, transform: `translateX(${fromRight(callout2P)}px)`, backgroundColor: T.white, border: `2px solid ${T.blue400}`, borderRadius: 16, padding: "18px 22px", display: "flex", gap: 14, boxShadow: "0 4px 24px rgba(59,130,246,0.10)" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: T.blue50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>🎯</div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 16, fontWeight: T.weight.bold, color: T.blue700, lineHeight: 1.3 }}>Engagement Funnel Analysis</p>
                <p style={{ margin: "5px 0 8px", fontSize: 12, color: T.textMuted, lineHeight: 1.5 }}>125K downloads converting to 18K repeat bookers — 14% loyalty rate</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 6, backgroundColor: T.gray200, borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${interpolate(frame, [95, 120], [0, 14], clamp)}%`, height: "100%", backgroundColor: T.blue500, borderRadius: 999 }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: T.weight.bold, color: T.blue600 }}>14% repeat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 detail cards */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, opacity: phase2Opacity, display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Spend Breakdown */}
            <div style={{ opacity: spendP, transform: `translateX(${fromRight(spendP)}px)`, backgroundColor: T.white, borderRadius: 16, border: `1.5px solid ${T.gray200}`, padding: "18px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 18 }}>💰</span>
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: T.weight.bold, color: T.navy }}>Spend Breakdown</p>
                  <p style={{ margin: 0, fontSize: 10, color: T.textMuted }}>Avg. per guest · this voyage</p>
                </div>
              </div>
              {spendItems.map((item, i) => {
                const w = interpolate(frame, [155 + i * 8, 185 + i * 8], [0, item.pct], clamp);
                return (
                  <div key={item.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: T.text }}>{item.label}</span>
                      <span style={{ fontSize: 11, color: T.textMuted }}>{item.amount} · {item.pct}%</span>
                    </div>
                    <div style={{ height: 8, backgroundColor: T.gray100, borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ width: `${w}%`, height: "100%", backgroundColor: item.color, borderRadius: 999 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Real-time Alerts */}
            <div style={{ opacity: alertsP, transform: `translateX(${fromRight(alertsP)}px)`, backgroundColor: T.white, borderRadius: 16, border: `1.5px solid ${T.gray200}`, padding: "18px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 18 }}>🔔</span>
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: T.weight.bold, color: T.navy }}>Real-time Alerts</p>
                  <p style={{ margin: 0, fontSize: 10, color: T.textMuted }}>Live operational signals</p>
                </div>
              </div>
              {alertItems.map((alert, i) => {
                const aP = spring({ frame, fps, config: M.snap, delay: 185 + i * 15 });
                return (
                  <div key={i} style={{ opacity: aP, transform: `translateX(${interpolate(aP, [0, 1], [40, 0])}px)`, backgroundColor: alert.bg, border: `1.5px solid ${alert.borderColor}`, borderRadius: 10, padding: "8px 12px", display: "flex", gap: 8, marginBottom: i < 2 ? 8 : 0 }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>{alert.icon}</span>
                    <span style={{ fontSize: 11, color: T.text, lineHeight: 1.4 }}>{alert.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scene label bottom-left */}
      <div style={{ position: "absolute", bottom: 32, left: 56, opacity: Math.min(phoneP * 2, 1), display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 3, height: 20, backgroundColor: T.gold, borderRadius: 2 }} />
        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: T.weight.bold, color: T.navy, letterSpacing: "0.06em", textTransform: "uppercase" }}>Analytics Deep Dive</p>
          <p style={{ margin: 0, fontSize: 9, color: T.textMuted, letterSpacing: "0.04em" }}>Stakeholder KPI Dashboard · Real-time</p>
        </div>
      </div>

      {/* Live badge top-right */}
      <div style={{ position: "absolute", top: 24, right: 52, opacity: Math.min(phoneP * 2, 1) }}>
        <div style={{ backgroundColor: T.navy, borderRadius: 20, padding: "5px 14px", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: T.green500 }} />
          <span style={{ fontSize: 10, color: T.white, fontWeight: T.weight.medium, letterSpacing: "0.04em" }}>LIVE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
