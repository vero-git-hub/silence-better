import { Devvit } from "@devvit/public-api";
import { PrimaryButton, SecondaryButton } from "../ui/Button.js";
import { LogoImage } from "../ui/Image.js";

export const StartScreen = ({
  onStartGame,
  onViewGhosts,
}: {
  onStartGame: () => void;
  onViewGhosts: () => void;
}) => (
  <vstack height="100%" width="100%" gap="medium" alignment="center middle">
    <LogoImage url="silent-better.png" description="logo" />
    <text size="large" weight="bold">
      Welcome to Silence Better Game!
    </text>
    <PrimaryButton onPress={onStartGame} label="Start Game" />
    <SecondaryButton onPress={onViewGhosts} label="View Ghosts" />
  </vstack>
);