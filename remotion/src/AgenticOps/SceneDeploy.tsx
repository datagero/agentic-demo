import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, whiteCard } from "./theme";
import { M, float } from "./design";

// LIGHT scene — white agent CARDS (Greg-style) fly in from bottom
const agents = [
  { label: "planner", desc: "breaks goals into tasks", color: T.purple, rot: -2, fromY: 500 },
  { label: "implementer", desc: "writes the code", color: T.green, rot: 1, fromY: 550 },
  { label: "verifier", desc: "checks the work", color: T.cyan, rot: -1, fromY: 520 },
  { label: "coordinator", desc: "dispatches the team", color: T.amber, rot: 2, fromY: 540 },
  { label: "witness", desc: "monitors everything", color: T.coral, rot: -2, fromY: 510 },
];

export const SceneDeploy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headP = spring({ frame, fps, config: M.soft, delay: 5 });
  const subP = spring({ frame, fps, config: M.soft, delay: 95 });

  return (
    <AbsoluteFill style={{ backgroundColor: T.cream, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute", top: 100, opacity: headP, width: "100%", textAlign: "center",
          transform: `translateY(${interpolate(headP, [0, 1], [12, 0])}px)`,
          fontSize: 46, fontFamily: T.serif, color: T.ink,
        }}
      >
        deploy a team of agents
      </div>

      {/* White cards — fly up from bottom, Greg-style */}
      <div style={{ display: "flex", gap: 22, marginTop: 60 }}>
        {agents.map((a, i) => {
          const cP = spring({ frame, fps, config: M.bouncy, delay: 20 + i * 12 });
          const y = interpolate(cP, [0, 1], [a.fromY, float(frame, i, 0.015, 3)]);
          return (
            <div
              key={a.label}
              style={{
                ...whiteCard(a.rot),
                width: 190, padding: "28px 22px",
                transform: `rotate(${a.rot}deg) translateY(${y}px)`,
                opacity: Math.min(cP * 2, 1),
                textAlign: "center",
              }}
            >
              {/* Colored dot */}
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${a.color}18`, border: `2px solid ${a.color}30`, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: a.color }} />
              </div>
              <div style={{ fontSize: 18, fontFamily: T.serif, color: T.ink, fontWeight: 400, marginBottom: 6 }}>{a.label}</div>
              <div style={{ fontSize: 13, fontFamily: T.sans, color: T.muted, fontWeight: 300, lineHeight: 1.4 }}>{a.desc}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute", bottom: 140, opacity: subP,
          fontSize: 18, fontFamily: T.sans, color: T.muted, fontWeight: 300, letterSpacing: 1,
        }}
      >
        one config · any combination · instantly
      </div>
    </AbsoluteFill>
  );
};
