import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { SceneConceptIntro } from "./SceneConceptIntro";
import { SceneProtoHome } from "./SceneProtoHome";
import { SceneProtoItinerary } from "./SceneProtoItinerary";
import { SceneProtoCommerce } from "./SceneProtoCommerce";
import { SceneProtoNavigator } from "./SceneProtoNavigator";
import { SceneAnalyticsPCL } from "./SceneAnalyticsPCL";
import { SceneOutroPCL } from "./SceneOutroPCL";

// Scene durations at 30fps
// Concept(5s), Home(7s), Itinerary(7s), Commerce(7s), Navigator(7s), Analytics(10s), Outro(3s)
const SCENES = [150, 210, 210, 210, 210, 300, 90];
const TR = 12; // faster transitions

export const TOTAL_DURATION_PCL =
  SCENES.reduce((a, b) => a + b, 0) - TR * (SCENES.length - 1);

export const PCLVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* 1. Concept Intro — 5s */}
      <TransitionSeries.Sequence durationInFrames={SCENES[0]}>
        <SceneConceptIntro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TR })}
      />

      {/* 2. Home Screen — 7s */}
      <TransitionSeries.Sequence durationInFrames={SCENES[1]}>
        <SceneProtoHome />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TR })}
      />

      {/* 3. Itinerary — 7s */}
      <TransitionSeries.Sequence durationInFrames={SCENES[2]}>
        <SceneProtoItinerary />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TR })}
      />

      {/* 4. Commerce — 7s */}
      <TransitionSeries.Sequence durationInFrames={SCENES[3]}>
        <SceneProtoCommerce />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TR })}
      />

      {/* 5. Navigator — 7s */}
      <TransitionSeries.Sequence durationInFrames={SCENES[4]}>
        <SceneProtoNavigator />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TR })}
      />

      {/* 6. Analytics Deep Dive — 10s */}
      <TransitionSeries.Sequence durationInFrames={SCENES[5]}>
        <SceneAnalyticsPCL />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TR })}
      />

      {/* 7. Outro — 3s */}
      <TransitionSeries.Sequence durationInFrames={SCENES[6]}>
        <SceneOutroPCL />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
