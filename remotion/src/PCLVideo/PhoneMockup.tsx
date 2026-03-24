import React from "react";
import { T } from "./theme";

// Phone dimensions - larger for video visibility (60% of 1080 height)
const PHONE_H = 580;
const PHONE_W = Math.round(PHONE_H * (390 / 844));

interface PhoneMockupProps {
  children?: React.ReactNode;
  activeTab?: string; // "home" | "itinerary" | "shop" | "navigator" | "insights"
}

export const PHONE_H_EXPORT = PHONE_H;
export const PHONE_W_EXPORT = PHONE_W;

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, activeTab = "home" }) => {
  const tabs = [
    { id: "home", label: "Home", icon: "⌂" },
    { id: "itinerary", label: "Itinerary", icon: "📅" },
    { id: "shop", label: "Shop", icon: "🛍" },
    { id: "navigator", label: "Navigator", icon: "🗺" },
    { id: "insights", label: "Insights", icon: "📊" },
  ];

  return (
    <div style={{
      width: PHONE_W,
      height: PHONE_H,
      background: T.white,
      borderRadius: 32,
      overflow: "hidden",
      position: "relative",
      boxShadow: `0 0 0 1px rgba(0,0,0,0.08), 0 0 0 8px ${T.text}, 0 0 0 9px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)`,
      fontFamily: T.sans,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        background: T.navy,
        color: T.white,
        height: 44,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: T.gold, fontSize: 14 }}>🚢</span>
          <div>
            <p style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: 10, lineHeight: 1.2, letterSpacing: "0.03em", margin: 0 }}>Princess Cruises</p>
            <p style={{ color: T.gold, fontSize: 8, lineHeight: 1.2, fontWeight: 300, letterSpacing: "0.08em", margin: 0 }}>COME BACK NEW</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 8, color: T.gray300, lineHeight: 1.2, margin: 0 }}>Welcome back</p>
            <p style={{ fontSize: 9, fontWeight: T.weight.medium, lineHeight: 1.2, color: T.gold, margin: 0 }}>Sarah M.</p>
          </div>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: T.gold, display: "flex", alignItems: "center", justifyContent: "center", color: T.navy, fontWeight: 700, fontSize: 9 }}>SM</div>
        </div>
      </div>

      {/* Screen content area */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {children}
      </div>

      {/* Bottom nav */}
      <nav style={{
        flexShrink: 0,
        background: T.white,
        borderTop: `1px solid ${T.gray200}`,
        height: 44,
        display: "flex",
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div key={tab.id} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              gap: 1,
              color: isActive ? T.navy : T.gray400,
              position: "relative",
            }}>
              {isActive && <span style={{ position: "absolute", top: 0, height: 2, width: 28, borderRadius: 999, background: T.gold }} />}
              <span style={{ fontSize: 12 }}>{tab.icon}</span>
              <span style={{ fontSize: 7, fontWeight: isActive ? T.weight.medium : T.weight.light }}>{tab.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
