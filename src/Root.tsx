import {
  AbsoluteFill,
  Composition,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Main } from "./Main";

import { calculateMetadata } from "./calculate-metadata/calculate-metadata";
import { schema } from "./calculate-metadata/schema";

const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, textAlign: "center", fontSize: "7em" }}>{title}</div>
  );
};

export const MyComposition = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        backgroundColor: "white",
      }}
    >
      <OffthreadVideo
      
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        mixBlendMode: "exclusion",
        zIndex: "10",
      }}
      src={staticFile("vad.mp4")} />;
      <Sequence durationInFrames={40}>
        <Title title="Hello" />
      </Sequence>
      <Sequence from={40} durationInFrames={40}>
        <Title title="World" />
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionRoot = () => {
  return (
    <Composition
      id="Main"
      component={MyComposition}
      defaultProps={{
        steps: null,
        themeColors: null,
        theme: "github-dark" as const,
        codeWidth: null,
        width: {
          type: "auto",
        },
      }}
      fps={30}
      height={1080}
      calculateMetadata={calculateMetadata}
      schema={schema}
    />
  );
};
