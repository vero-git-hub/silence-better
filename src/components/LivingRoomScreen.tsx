import { Devvit } from "@devvit/public-api";
import { NoiseIndicator } from "./NoiseIndicator.js";

export const LivingRoomScreen = ({
    noiseLevel,
    usedLivingRoomHint,
    randomizedClue,
    onHintActivate,
    goToBasement,
    goToAttic,
  }: {
    noiseLevel: number;
    usedLivingRoomHint: boolean;
    randomizedClue: string;
    onHintActivate: () => void;
    goToBasement: () => void;
    goToAttic: () => void;
  }) => {
    return (
      <zstack height="100%" width="100%" alignment="center middle">
        <image
          url="living_room.png"
          description="living room background"
          imageWidth={800}
          imageHeight={600}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
        <vstack gap="medium" alignment="middle center">
          <NoiseIndicator noiseLevel={noiseLevel} />
          <text size="large" weight="bold" color="white">
            You are in the living room.
          </text>
          <text size="medium" color="white">
            You see a cozy sofa and a flickering TV. What will you do?
          </text>
          <hstack gap="small">
            <button appearance="secondary" onPress={onHintActivate}>
              Sit on the sofa
            </button>
            <button appearance="secondary" onPress={goToBasement}>
              Back to the basement
            </button>
            <button appearance="secondary" onPress={goToAttic}>
              Go to the attic
            </button>
          </hstack>
          {usedLivingRoomHint && (
            <text size="medium" color="yellow">
              {randomizedClue}
            </text>
          )}
        </vstack>
      </zstack>
    );
  };