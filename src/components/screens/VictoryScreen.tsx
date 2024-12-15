import { Devvit } from "@devvit/public-api";

export const VictoryScreen = ({
    ghostName,
    onPlayAgain,
    onShareResults,
  }: {
    ghostName: string;
    onPlayAgain: () => void;
    onShareResults: () => Promise<void>;
  }) => {
    return (
      <zstack height="100%" width="100%" alignment="center middle">
        <image
          url="victory.png"
          description="victory background"
          imageWidth={800}
          imageHeight={600}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
        <vstack gap="medium" alignment="middle center">
          <text size="large" weight="bold" color="gold">
            Congratulations! You have identified the ghost!
          </text>
          <text size="medium" color="white">
            The ghost was {ghostName}.
          </text>
          <button appearance="primary" onPress={onPlayAgain}>
            Play Again
          </button>
          <button
            appearance="secondary"
            onPress={() => {
              onShareResults().catch((error) => {
                console.error("Error sharing results in VictoryScreen:", error);
              });
            }}
          >
            Share Results
          </button>
        </vstack>
      </zstack>
    );
  };