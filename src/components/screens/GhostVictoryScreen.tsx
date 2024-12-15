import { Devvit } from "@devvit/public-api";

export const GhostVictoryScreen = ({ onPlayAgain }: { onPlayAgain: () => void }) => {
    return (
      <zstack height="100%" width="100%" alignment="center middle">
        <image
          url="ghost_victory.png"
          description="ghost victory background"
          imageWidth={800}
          imageHeight={600}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
        <vstack gap="medium" alignment="middle center">
          <text size="large" weight="bold" color="red">
            The ghost has won! He managed to confuse you.
          </text>
          <button appearance="primary" onPress={onPlayAgain}>
            Play Again
          </button>
        </vstack>
      </zstack>
    );
  };