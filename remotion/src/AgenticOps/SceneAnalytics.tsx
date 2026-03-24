import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, whiteCard } from "./theme";
import { M, float } from "./design";

// DARK scene — white metric cards fly in from right, staggered
const metrics = [
  { word: "monitor", sub: "productivity", color: T.mint, fromX: 600 },
  { word: "analyse", sub: "conversations", color: T.purple, fromX: 650 },
  { word: "suggest", sub: "optimal configs", color: T.amber, fromX: 700 },
];

const MiniChart: React.FC<{ color: string; seed: number; p: number }> = ({ color, seed, p }) => {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const x = i * 14; const y = 22 - (Math.sin(i * 0.8 + seed) * 8 + Math.cos(i * 1.2 + seed * 2) * 5);
    return `${x},${y * p}`;
  });
  return (
    <svg width={98} height={24} style={{ marginLeft: "auto", flexShrink: 0 }}>
      <path d={`M0,22 L${pts.join(" L")} L98,22 Z`} fill={`${color}15`} stroke={`${color}50`} strokeWidth={1.5} />
    </svg>
  );
};

export const SceneAnalytics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headP = spring({ frame, fps, config: M.soft, delay: 5 });

  return (
    <AbsoluteFill style={{ backgroundColor: T.dark, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute", top: 170, opacity: headP,
          transform: `translateY(${interpolate(headP, [0, 1], [10, 0])}px)`,
          fontSize: 44, fontFamily: T.serif, color: T.offWhite, textAlign: "center",
        }}
      >
        the analytics layer
      </div>

      {/* White cards fly in from right */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 40 }}>
        {metrics.map((m, i) => {
          const cP = spring({ frame, fps, config: M.snap, delay: 25 + i * 16 });
          const x = interpolate(cP, [0, 1], [m.fromX, 0]);
          const y = float(frame, i, 0.015, 3);
          return (
            <div
              key={m.word}
              style={{
                ...whiteCard(0),
                padding: "20px 32px", display: "flex", alignItems: "center", gap: 16, width: 480,
                opacity: Math.min(cP * 2, 1),
                transform: `translateX(${x}px) translateY(${y}px)`,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: m.color, boxShadow: `0 0 10px ${m.color}40`, flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: 26, fontFamily: T.serif, color: T.ink }}>{m.word}</span>
                <span style={{ fontSize: 15, fontFamily: T.sans, color: T.muted, marginLeft: 12, fontWeight: 300 }}>{m.sub}</span>
              </div>
              <MiniChart color={m.color} seed={i * 2} p={interpolate(cP, [0, 1], [0, 1], { extrapolateRight: "clamp" })} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
