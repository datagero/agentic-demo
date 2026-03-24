import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, darkBadge } from "./theme";
import { M, float } from "./design";

// LIGHT scene — strong close. No "open source". Badge + tagline.
export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const badgeP = spring({ frame, fps, config: M.bouncy, delay: 15 });
  const tagP = spring({ frame, fps, config: M.soft, delay: 55 });

  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeY = interpolate(badgeP, [0, 1], [350, float(frame, 0, 0.012, 3)]);
  const gradAngle = interpolate(frame, [0, durationInFrames], [130, 195]);

  return (
    <AbsoluteFill style={{ backgroundColor: T.cream, justifyContent: "center", alignItems: "center", opacity: fadeOut }}>
      {/* Badge — flies up */}
      <div
        style={{
          ...darkBadge(-1),
          padding: "50px 75px", textAlign: "center",
          opacity: Math.min(badgeP * 2, 1),
          transform: `rotate(-1deg) translateY(${badgeY}px)`,
        }}
      >
        <div style={{ fontSize: 30, fontFamily: T.serif, color: `${T.white}cc`, lineHeight: 1.4, marginBottom: 6 }}>
          agentic-ops
        </div>
        <div
          style={{
            fontSize: 44, fontFamily: T.serif,
            background: `linear-gradient(${gradAngle}deg, ${T.mint}, ${T.purple})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}
        >
          operations for the
          <br />
          agent generation
        </div>
      </div>

      <div
        style={{
          position: "absolute", bottom: 230, opacity: tagP,
          transform: `translateY(${interpolate(tagP, [0, 1], [10, 0])}px)`,
          fontSize: 18, fontFamily: T.sans, color: T.muted, fontWeight: 300, letterSpacing: 2,
        }}
      >
        govern · monitor · deploy
      </div>
    </AbsoluteFill>
  );
};
