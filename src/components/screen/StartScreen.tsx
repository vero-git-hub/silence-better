import { Devvit } from "@devvit/public-api";
import { PrimaryButton, SecondaryButton } from "../ui/Button.js";
import { LogoImage } from "../ui/Image.js";
import { TextBlock } from "../ui/TextBlock.js";

export const StartScreen = ({
  onStartGame,
  onViewGhosts,
  onViewRules,
}: {
  onStartGame: () => void;
  onViewGhosts: () => void;
  onViewRules: () => void;
}) => (
  <vstack height="100%" width="100%" gap="medium" alignment="center middle">
    <LogoImage url="silent-better.png" description="logo" />
    <TextBlock size="large" weight="bold" text="Welcome to Silence Better Game!" />
    <PrimaryButton onPress={onStartGame} label="Start Game" />
    <hstack>
      <SecondaryButton onPress={onViewGhosts} label="View Ghosts" />
      <SecondaryButton onPress={onViewRules} label="View Rules" />
    </hstack>
  </vstack>
);