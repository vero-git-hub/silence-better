import { Devvit } from "@devvit/public-api";
import { NoiseIndicator } from "./NoiseIndicator.js";

export const AtticScreen = ({
    noiseLevel,
    usedAtticHint,
    randomizedClue,
    onHintActivate,
    goToBasement,
    goToLivingRoom,
  }: {
    noiseLevel: number;
    usedAtticHint: boolean;
    randomizedClue: string;
    onHintActivate: () => void;
    goToBasement: () => void;
    goToLivingRoom: () => void;
  }) => {
    return (
      <zstack height="100%" width="100%" alignment="center middle">
        <image
          url="attic.png"
          description="attic background"
          imageWidth={800}
          imageHeight={600}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
        <vstack gap="medium" alignment="middle center">
          <NoiseIndicator noiseLevel={noiseLevel} />
          <text size="large" weight="bold" color="white">
            You are in the attic.
          </text>
          <text size="medium" color="white">
            Dusty boxes and old memories surround you. What now?
          </text>
          <hstack gap="small">
            <button appearance="secondary" onPress={onHintActivate}>
              Open a box
            </button>
            <button appearance="secondary" onPress={goToBasement}>
              Go back to basement
            </button>
            <button appearance="secondary" onPress={goToLivingRoom}>
              Go to living room
            </button>
          </hstack>
          {usedAtticHint && (
            <text size="medium" color="yellow">
              {randomizedClue}
            </text>
          )}
        </vstack>
      </zstack>
    );
  };