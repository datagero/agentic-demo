import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, darkBadge } from "./theme";
import { M, float } from "./design";

// DARK scene — contrast shift. Badges fly in from sides.
const abilities = [
  { text: "read code", color: T.cyan, fromX: -600, rot: -2 },
  { text: "write code", color: T.mint, fromX: 600, rot: 2 },
  { text: "run commands", color: T.purple, fromX: -600, rot: -1 },
  { text: "make decisions", color: T.amber, fromX: 600, rot: 3 },
];

export const SceneWhatAreAgents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headP = spring({ frame, fps, config: M.soft, delay: 8 });
  const subP = spring({ frame, fps, config: M.soft, delay: 25 });

  return (
    <AbsoluteFill style={{ backgroundColor: T.dark, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 170, textAlign: "center" }}>
        <div
          style={{
            opacity: headP,
            transform: `translateY(${interpolate(headP, [0, 1], [15, 0])}px)`,
            fontSize: 48, fontFamily: T.serif, color: T.offWhite, lineHeight: 1.3,
          }}
        >
          AI agents are software
        </div>
        <div
          style={{
            opacity: subP,
            transform: `translateY(${interpolate(subP, [0, 1], [10, 0])}px)`,
            fontSize: 48, fontFamily: T.serif, color: T.cyan,
          }}
        >
          that work on their own.
        </div>
      </div>

      {/* Ability badges — fly in from left/right alternating */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", maxWidth: 700, marginTop: 100 }}>
        {abilities.map((a, i) => {
          const aP = spring({ frame, fps, config: M.snap, delay: 42 + i * 12 });
          const x = interpolate(aP, [0, 1], [a.fromX, 0]);
          const y = float(frame, i, 0.02, 3);
          return (
            <div
              key={a.text}
              style={{
                ...darkBadge(a.rot),
                backgroundColor: T.darkCard,
                border: `1.5px solid ${a.color}30`,
                padding: "14px 28px",
                opacity: aP,
                transform: `rotate(${a.rot}deg) translateX(${x}px) translateY(${y}px)`,
              }}
            >
              <div style={{ fontSize: 20, fontFamily: T.serif, color: a.color }}>{a.text}</div>
            </div>
          );
        })}
      </div>

      {(() => {
        const fP = spring({ frame, fps, config: M.soft, delay: 100 });
        return (
          <div
            style={{
              position: "absolute", bottom: 170, opacity: fP,
              fontSize: 19, fontFamily: T.sans, color: T.dimDark, fontWeight: 300, letterSpacing: 1,
            }}
          >
            they handle tasks that used to need a developer
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
