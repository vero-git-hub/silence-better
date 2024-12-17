import { Devvit } from "@devvit/public-api";
import { PrimaryButton, SecondaryButton } from "../ui/Button.js";
import { BackgroundImage } from "../ui/Image.js";
import { TextBlock } from "../ui/TextBlock.js";

export const StartScreen = ({
  onStartGame,
  onViewGhosts,
  onViewRules,
}: {
  onStartGame: () => void;
  onViewGhosts: () => void;
  onViewRules: () => void;
}) => {
  return (
    <zstack height="100%" width="100%" alignment="center middle">
    <BackgroundImage url="start.png" description="start screen background" />
      <vstack
        backgroundColor="rgba(0, 0, 0, 0.6)"
        cornerRadius="large"
        padding="large"
        gap="medium"
        alignment="middle center"
        width="60%"
      >
        <TextBlock
          size="xlarge"
          weight="bold"
          color="white"
          text="Welcome to Silence Better Game!"
        />
        <PrimaryButton
          onPress={onStartGame}
          label="Start Game"
        />
        <hstack gap="medium" alignment="middle center">
          <SecondaryButton onPress={onViewGhosts} label="View Ghosts" />
          <SecondaryButton onPress={onViewRules} label="View Rules" />
        </hstack>
      </vstack>
    </zstack>
  );
};