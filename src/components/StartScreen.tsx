import { Devvit } from "@devvit/public-api";

export const StartScreen = ({
    onStartGame,
    onViewGhosts,
  }: {
    onStartGame: () => void;
    onViewGhosts: () => void;
  }) => (
    <vstack height="100%" width="100%" gap="medium" alignment="center middle">
      <image
        url="silent-better.png"
        description="logo"
        imageHeight={256}
        imageWidth={256}
        height="157px"
        width="248px"
      />
      <text size="large">Welcome to Silence Better Game!</text>
      <button appearance="primary" onPress={onStartGame}>
        Start Game
      </button>
      <button appearance="secondary" onPress={onViewGhosts}>
        View Ghosts
      </button>
    </vstack>
  );