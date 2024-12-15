import { Devvit } from "@devvit/public-api";

export const NoiseIndicator = ({ noiseLevel }: { noiseLevel: number }) => (
    <hstack width="100%" alignment="start middle" padding="small">
      <text size="medium" color="white">{`Noise level: ${noiseLevel}%`}</text>
    </hstack>
  );