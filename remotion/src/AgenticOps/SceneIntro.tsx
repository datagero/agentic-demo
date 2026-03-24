import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, darkBadge } from "./theme";
import { M, float } from "./design";

// LIGHT scene — cream bg, dark badge flies up from bottom
export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeP = spring({ frame, fps, config: M.bouncy, delay: 15 });
  const tagP = spring({ frame, fps, config: M.soft, delay: 55 });
  const f = float(frame, 0, 0.015, 3);

  // Badge flies up from below
  const badgeY = interpolate(badgeP, [0, 1], [400, f]);

  return (
    <AbsoluteFill style={{ backgroundColor: T.cream, justifyContent: "center", alignItems: "center" }}>
      {/* Main badge — flies up */}
      <div
        style={{
          ...darkBadge(-2),
          padding: "50px 75px",
          textAlign: "center",
          transform: `rotate(-2deg) translateY(${badgeY}px)`,
          opacity: Math.min(badgeP * 3, 1),
        }}
      >
        <div style={{ fontSize: 68, fontFamily: T.serif, color: T.white, lineHeight: 1.1 }}>
          agentic-ops
        </div>
      </div>

      <div
        style={{
          position: "absolute", bottom: 240, opacity: tagP,
          transform: `translateY(${interpolate(tagP, [0, 1], [15, 0])}px)`,
          fontSize: 21, fontFamily: T.sans, fontWeight: 300, color: T.muted, letterSpacing: 3,
        }}
      >
        the agent operations platform
      </div>
    </AbsoluteFill>
  );
};
