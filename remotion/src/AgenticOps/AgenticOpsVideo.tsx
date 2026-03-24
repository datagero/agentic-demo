import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";
import { SceneIntro } from "./SceneIntro";
import { SceneWhatAreAgents } from "./SceneWhatAreAgents";
import { SceneProblem } from "./SceneProblem";
import { ScenePillars } from "./ScenePillars";
import { SceneDeploy } from "./SceneDeploy";
import { SceneAnalytics } from "./SceneAnalytics";
import { SceneGovern } from "./SceneGovern";
import { ScenePossibilities } from "./ScenePossibilities";
import { SceneOutro } from "./SceneOutro";

// Audio: 3.2, 7.1, 5.9, 6.4, 6.1, 6.3, 7.7, 6.5, 3.4 seconds
// Scene = audio + ~1s padding
const SCENES = [135, 245, 210, 225, 215, 225, 265, 228, 140];
const TR = 15; // faster transitions

export const TOTAL_DURATION =
  SCENES.reduce((a, b) => a + b, 0) - TR * (SCENES.length - 1);

const VO = [
  "voiceover/01-intro.mp3",
  "voiceover/02-agents.mp3",
  "voiceover/03-problem.mp3",
  "voiceover/04-pillars.mp3",
  "voiceover/05-deploy.mp3",
  "voiceover/06-analytics.mp3",
  "voiceover/07-govern.mp3",
  "voiceover/08-possibilities.mp3",
  "voiceover/09-outro.mp3",
];

export const AgenticOpsVideo: React.FC = () => {
  const starts: number[] = [];
  let pos = 0;
  for (let i = 0; i < SCENES.length; i++) {
    starts.push(pos);
    pos += SCENES[i] - TR;
  }

  return (
    <>
      {/* === VOICEOVER === */}
      {VO.map((file, i) => (
        <Sequence key={file} from={starts[i] + 8} layout="none">
          <Audio src={staticFile(file)} volume={0.9} />
        </Sequence>
      ))}

      {/* === SFX — whoosh on slide transitions === */}
      <Sequence from={starts[3] - 3} layout="none">
        <Audio src="https://remotion.media/whoosh.wav" volume={0.2} />
      </Sequence>
      <Sequence from={starts[4] - 3} layout="none">
        <Audio src="https://remotion.media/whoosh.wav" volume={0.15} />
      </Sequence>
      <Sequence from={starts[7] - 3} layout="none">
        <Audio src="https://remotion.media/whoosh.wav" volume={0.15} />
      </Sequence>
      {/* Switch on badge pop */}
      <Sequence from={starts[0] + 15} layout="none">
        <Audio src="https://remotion.media/switch.wav" volume={0.1} />
      </Sequence>
      <Sequence from={starts[8] + 20} layout="none">
        <Audio src="https://remotion.media/switch.wav" volume={0.1} />
      </Sequence>

      {/* === VISUALS === */}
      <TransitionSeries>
        {/* 1. Intro — LIGHT */}
        <TransitionSeries.Sequence durationInFrames={SCENES[0]}>
          <SceneIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TR })} />

        {/* 2. What are agents — DARK */}
        <TransitionSeries.Sequence durationInFrames={SCENES[1]}>
          <SceneWhatAreAgents />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TR })} />

        {/* 3. Problem — LIGHT */}
        <TransitionSeries.Sequence durationInFrames={SCENES[2]}>
          <SceneProblem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: TR })} />

        {/* 4. Two engines — DARK */}
        <TransitionSeries.Sequence durationInFrames={SCENES[3]}>
          <ScenePillars />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: TR })} />

        {/* 5. Deploy — LIGHT */}
        <TransitionSeries.Sequence durationInFrames={SCENES[4]}>
          <SceneDeploy />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TR })} />

        {/* 6. Analytics — DARK */}
        <TransitionSeries.Sequence durationInFrames={SCENES[5]}>
          <SceneAnalytics />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TR })} />

        {/* 7. Govern — LIGHT */}
        <TransitionSeries.Sequence durationInFrames={SCENES[6]}>
          <SceneGovern />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: TR })} />

        {/* 8. Possibilities — DARK */}
        <TransitionSeries.Sequence durationInFrames={SCENES[7]}>
          <ScenePossibilities />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TR })} />

        {/* 9. Outro — LIGHT */}
        <TransitionSeries.Sequence durationInFrames={SCENES[8]}>
          <SceneOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
