import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, darkBadge } from "./theme";
import { M } from "./design";

// LIGHT scene — coral danger badges fly in fast
const risks = [
  { text: "no budgets", fromX: -500, y: 60, rot: -3 },
  { text: "no audit trail", fromX: 500, y: 30, rot: 2 },
  { text: "no isolation", fromX: -500, y: 150, rot: -1 },
  { text: "no governance", fromX: 500, y: 130, rot: 4 },
];

export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headP = spring({ frame, fps, config: M.soft, delay: 8 });

  return (
    <AbsoluteFill style={{ backgroundColor: T.cream, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute", top: 210, opacity: headP,
          transform: `translateY(${interpolate(headP, [0, 1], [12, 0])}px)`,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 50, fontFamily: T.serif, color: T.ink, lineHeight: 1.3 }}>
          but who's watching?
        </div>
      </div>

      {/* Risk badges — FLY IN from sides, fast snap */}
      {risks.map((r, i) => {
        const rP = spring({ frame, fps, config: M.snap, delay: 35 + i * 12 });
        const x = interpolate(rP, [0, 1], [r.fromX, i % 2 === 0 ? -140 : 80]);
        return (
          <div
            key={r.text}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px)`, top: `calc(42% + ${r.y}px)`,
              ...darkBadge(r.rot),
              backgroundColor: T.coral,
              padding: "14px 26px",
              opacity: Math.min(rP * 2, 1),
              transform: `rotate(${r.rot}deg)`,
            }}
          >
            <div style={{ fontSize: 20, fontFamily: T.serif, color: T.white }}>{r.text}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
