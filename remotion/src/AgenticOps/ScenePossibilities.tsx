import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, darkBadge } from "./theme";
import { M, float } from "./design";

// DARK scene — badges fly in from all directions
const items = [
  { text: "A/B test agents", color: T.purple, fromX: -500, fromY: -200, rot: -3 },
  { text: "optimal configs", color: T.mint, fromX: 500, fromY: -150, rot: 2 },
  { text: "self-healing", color: T.coral, fromX: -500, fromY: 100, rot: -1 },
  { text: "one-shot or loops", color: T.amber, fromX: 500, fromY: 50, rot: 4 },
  { text: "open-source policies", color: T.blue, fromX: 0, fromY: 400, rot: -2 },
];

const finalPositions = [
  { x: -220, y: -60 },
  { x: 140, y: -80 },
  { x: -100, y: 40 },
  { x: 190, y: 30 },
  { x: 20, y: 130 },
];

export const ScenePossibilities: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headP = spring({ frame, fps, config: M.soft, delay: 5 });

  return (
    <AbsoluteFill style={{ backgroundColor: T.dark, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute", top: 130, opacity: headP,
          transform: `translateY(${interpolate(headP, [0, 1], [10, 0])}px)`,
          fontSize: 44, fontFamily: T.serif, color: T.offWhite, textAlign: "center",
        }}
      >
        what becomes possible
      </div>

      <div style={{ position: "relative", width: 700, height: 340, marginTop: 50 }}>
        {items.map((item, i) => {
          const iP = spring({ frame, fps, config: M.snap, delay: 25 + i * 10 });
          const fp = finalPositions[i];
          const x = interpolate(iP, [0, 1], [item.fromX, fp.x]);
          const y = interpolate(iP, [0, 1], [item.fromY, fp.y + float(frame, i, 0.02, 3)]);
          return (
            <div
              key={item.text}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`,
                transform: `translate(-50%,-50%) rotate(${item.rot}deg)`,
                ...darkBadge(0),
                backgroundColor: T.darkCard,
                border: `1.5px solid ${item.color}30`,
                padding: "14px 28px",
                opacity: Math.min(iP * 2, 1),
              }}
            >
              <div style={{ fontSize: 19, fontFamily: T.serif, color: item.color }}>{item.text}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
