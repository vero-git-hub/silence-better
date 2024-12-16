import { Devvit } from "@devvit/public-api";
import { BackgroundImage } from "../ui/Image.js";
import { PlayAgainButton } from "../ui/Button.js";

export const GhostVictoryScreen = ({ onPlayAgain }: { onPlayAgain: () => void }) => {
  return (
    <zstack height="100%" width="100%" alignment="center middle">
      <BackgroundImage url="ghost_victory.png" description="ghost victory background" />
      <vstack gap="medium" alignment="middle center">
        <text size="large" weight="bold" color="red">
          The ghost has won! He managed to confuse you.
        </text>
        <PlayAgainButton onPress={onPlayAgain} />
      </vstack>
    </zstack>
  );
};