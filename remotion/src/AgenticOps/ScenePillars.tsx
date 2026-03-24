import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, darkBadge } from "./theme";
import { M, float } from "./design";

// DARK scene — two badges fly in from opposite sides
export const ScenePillars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headP = spring({ frame, fps, config: M.soft, delay: 8 });
  const leftP = spring({ frame, fps, config: M.snap, delay: 25 });
  const rightP = spring({ frame, fps, config: M.snap, delay: 40 });
  const lineP = spring({ frame, fps, config: M.soft, delay: 55 });

  const leftX = interpolate(leftP, [0, 1], [-500, 0]);
  const rightX = interpolate(rightP, [0, 1], [500, 0]);
  const lf = float(frame, 0, 0.015, 4);
  const rf = float(frame, 1, 0.012, 4);

  const leftSubs = ["manage sessions", "blueprints", "containers"];
  const rightSubs = ["govern & policy", "harness agents", "analytics"];

  return (
    <AbsoluteFill style={{ backgroundColor: T.dark, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute", top: 120, opacity: headP,
          transform: `translateY(${interpolate(headP, [0, 1], [12, 0])}px)`,
          fontSize: 44, fontFamily: T.serif, color: T.offWhite, textAlign: "center",
        }}
      >
        two engines, one platform
      </div>

      <div style={{ display: "flex", gap: 80, alignItems: "flex-start", marginTop: 30 }}>
        {/* obs-server — flies in from left */}
        <div style={{ textAlign: "center", transform: `translateX(${leftX}px)`, opacity: Math.min(leftP * 2, 1) }}>
          <div
            style={{
              ...darkBadge(-3),
              backgroundColor: T.darkCard,
              border: `1.5px solid ${T.mint}30`,
              padding: "36px 48px", marginBottom: 24,
              transform: `rotate(-3deg) translateY(${lf}px)`,
            }}
          >
            <div style={{ fontSize: 32, fontFamily: T.serif, color: T.mint }}>obs-server</div>
          </div>
          {leftSubs.map((s, i) => {
            const sP = spring({ frame, fps, config: M.soft, delay: 60 + i * 10 });
            return <div key={s} style={{ opacity: sP, fontSize: 17, fontFamily: T.sans, color: T.dimDark, marginBottom: 7, fontWeight: 300 }}>{s}</div>;
          })}
        </div>

        {/* Line */}
        <div style={{ width: interpolate(lineP, [0, 1], [0, 50]), height: 2, background: `linear-gradient(90deg, ${T.mint}40, ${T.purple}40)`, borderRadius: 1, marginTop: 55 }} />

        {/* agentic-ops — flies in from right */}
        <div style={{ textAlign: "center", transform: `translateX(${rightX}px)`, opacity: Math.min(rightP * 2, 1) }}>
          <div
            style={{
              ...darkBadge(2),
              backgroundColor: T.darkCard,
              border: `1.5px solid ${T.purple}30`,
              padding: "36px 48px", marginBottom: 24,
              transform: `rotate(2deg) translateY(${rf}px)`,
            }}
          >
            <div style={{ fontSize: 32, fontFamily: T.serif, color: T.purple }}>agentic-ops</div>
          </div>
          {rightSubs.map((s, i) => {
            const sP = spring({ frame, fps, config: M.soft, delay: 75 + i * 10 });
            return <div key={s} style={{ opacity: sP, fontSize: 17, fontFamily: T.sans, color: T.dimDark, marginBottom: 7, fontWeight: 300 }}>{s}</div>;
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
