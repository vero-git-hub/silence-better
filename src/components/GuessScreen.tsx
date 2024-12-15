import { Devvit } from "@devvit/public-api";

export const GuessScreen = ({
    ghosts,
    onSelectGhost,
    onBack,
  }: {
    ghosts: { name: string }[];
    onSelectGhost: (index: number) => void;
    onBack: () => void;
  }) => {
    return (
      <zstack height="100%" width="100%" alignment="center middle">
        <image
          url="guess_background.png"
          description="guessing background"
          imageWidth={800}
          imageHeight={600}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
        <vstack gap="medium" alignment="middle center">
          <text size="large" weight="bold" color="white">
            Who is haunting this house?
          </text>
          {ghosts.map((ghost, index) => (
            <button
              key={index.toString()}
              appearance="secondary"
              onPress={() => onSelectGhost(index)}
            >
              {ghost.name}
            </button>
          ))}
          <button appearance="secondary" onPress={onBack}>
            Back to the basement
          </button>
        </vstack>
      </zstack>
    );
  };