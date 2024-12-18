import { Devvit } from "@devvit/public-api";
import { BackgroundImage } from "../ui/Image.js";
import { PlayAgainButton } from "../ui/Button.js";
import { TextBlock } from "../ui/TextBlock.js";

export const GhostVictoryScreen = ({ 
  onPlayAgain,
}: { 
  onPlayAgain: () => void,
 }) => {
  return (
    <zstack height="100%" width="100%" alignment="center middle">
      <BackgroundImage url="ghost_victory.png" description="ghost victory background" />
      <vstack gap="medium" alignment="middle center">
        <TextBlock size="large" weight="bold" color="red" text="The ghost has won! He managed to confuse you." />
        <PlayAgainButton onPress={onPlayAgain} />
      </vstack>
    </zstack>
  );
};