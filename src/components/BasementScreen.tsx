import { Devvit } from "@devvit/public-api";
import { NoiseIndicator } from "./NoiseIndicator.js";

export const BasementScreen = ({
    noiseLevel,
    usedHint,
    clue,
    onLookAround,
    onGoToLivingRoom,
    onGoToAttic,
    onGuess,
  }: {
    noiseLevel: number;
    usedHint: boolean;
    clue: string;
    onLookAround: () => void;
    onGoToLivingRoom: () => void;
    onGoToAttic: () => void;
    onGuess: () => void;
  }) => {
    return (
      <zstack height="100%" width="100%" alignment="center middle">
        <image
          url="basement.png"
          description="basement background"
          imageWidth={800}
          imageHeight={600}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
        <vstack gap="medium" alignment="middle center">
          <NoiseIndicator noiseLevel={noiseLevel} />
          <text size="large" weight="bold" color="white">
            You are in the basement!
          </text>
          <text size="medium" color="white">
            It's dark and damp. What will you do?
          </text>
          <hstack gap="small">
            <button appearance="secondary" onPress={onLookAround}>
              Look around
            </button>
            <button appearance="secondary" onPress={onGoToLivingRoom}>
              Go to the living room
            </button>
            <button appearance="secondary" onPress={onGoToAttic}>
              Go to the attic
            </button>
          </hstack>
          <hstack gap="small">
            <button appearance="primary" onPress={onGuess}>
              Guess the ghost
            </button>
          </hstack>
          {usedHint && (
            <text size="medium" color="yellow">
              {clue}
            </text>
          )}
        </vstack>
      </zstack>
    );
  };