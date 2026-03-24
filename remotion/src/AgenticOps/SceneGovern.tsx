import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { T, darkBadge, whiteCard } from "./theme";
import { M, float } from "./design";

// LIGHT scene — Policy management USP. Nested layers + policy badges.
// This is the key differentiator — spend more visual energy here.
const policyExamples = [
  { text: "budget limits", color: T.amber, fromX: -400, rot: -2 },
  { text: "tool restrictions", color: T.purple, fromX: 400, rot: 3 },
  { text: "command guards", color: T.coral, fromX: -400, rot: -1 },
];

export const SceneGovern: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headP = spring({ frame, fps, config: M.soft, delay: 5 });
  const subP = spring({ frame, fps, config: M.soft, delay: 22 });
  const orgP = spring({ frame, fps, config: M.snap, delay: 35 });
  const projP = spring({ frame, fps, config: M.snap, delay: 50 });

  const orgY = interpolate(orgP, [0, 1], [250, 0]);
  const projX = interpolate(projP, [0, 1], [350, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: T.cream, justifyContent: "center", alignItems: "center" }}>
      {/* Title — emphasize POLICY */}
      <div style={{ position: "absolute", top: 80, textAlign: "center" }}>
        <div
          style={{
            opacity: headP,
            transform: `translateY(${interpolate(headP, [0, 1], [10, 0])}px)`,
            fontSize: 44, fontFamily: T.serif, color: T.ink,
          }}
        >
          policy management
        </div>
        <div
          style={{
            opacity: subP,
            transform: `translateY(${interpolate(subP, [0, 1], [8, 0])}px)`,
            fontSize: 22, fontFamily: T.sans, color: T.muted, fontWeight: 300, marginTop: 8,
          }}
        >
          full control at every level
        </div>
      </div>

      {/* Nested layers — left side */}
      <div style={{ position: "absolute", left: 100, top: 220 }}>
        <div
          style={{
            ...whiteCard(0), width: 480, height: 260, padding: 22,
            position: "relative",
            opacity: Math.min(orgP * 2, 1),
            transform: `translateY(${orgY}px)`,
          }}
        >
          <div style={{ fontSize: 11, fontFamily: T.sans, color: T.purple, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            organization
          </div>

          <div
            style={{
              ...whiteCard(0), position: "absolute", top: 40, left: 30, right: 30, bottom: 30,
              border: `1.5px solid ${T.cyan}18`, padding: 18,
              opacity: Math.min(projP * 2, 1),
              transform: `translateX(${projX}px)`,
            }}
          >
            <div style={{ fontSize: 11, fontFamily: T.sans, color: T.cyan, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
              project
            </div>

            <div style={{ position: "absolute", top: 40, left: 22, right: 22, bottom: 22, display: "flex", gap: 10, alignItems: "center", justifyContent: "center" }}>
              {[1, 2, 3].map((n, i) => {
                const sP = spring({ frame, fps, config: M.bouncy, delay: 62 + i * 8 });
                const sY = interpolate(sP, [0, 1], [180, float(frame, i, 0.015, 2)]);
                return (
                  <div
                    key={n}
                    style={{
                      ...darkBadge([-2, 1, -1][i]), padding: "10px 20px",
                      opacity: Math.min(sP * 2, 1),
                      transform: `rotate(${[-2, 1, -1][i]}deg) translateY(${sY}px)`,
                    }}
                  >
                    <div style={{ fontSize: 13, fontFamily: T.sans, color: T.amber, fontWeight: 500 }}>session {n}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Policy examples — right side, fly in from right */}
      <div style={{ position: "absolute", right: 120, top: 240, display: "flex", flexDirection: "column", gap: 16 }}>
        {policyExamples.map((p, i) => {
          const pP = spring({ frame, fps, config: M.snap, delay: 75 + i * 14 });
          const x = interpolate(pP, [0, 1], [p.fromX, 0]);
          const y = float(frame, i, 0.015, 3);
          return (
            <div
              key={p.text}
              style={{
                ...darkBadge(p.rot), padding: "16px 30px",
                opacity: Math.min(pP * 2, 1),
                transform: `rotate(${p.rot}deg) translateX(${x}px) translateY(${y}px)`,
              }}
            >
              <div style={{ fontSize: 20, fontFamily: T.serif, color: p.color }}>{p.text}</div>
            </div>
          );
        })}

        {/* "and more" whisper */}
        {(() => {
          const mP = spring({ frame, fps, config: M.soft, delay: 120 });
          return (
            <div style={{ opacity: mP, fontSize: 15, fontFamily: T.sans, color: T.dimLight, fontWeight: 300, marginTop: 4, paddingLeft: 8 }}>
              time restrictions · model mapping · compliance packs
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
