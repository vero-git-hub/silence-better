import { Devvit } from "@devvit/public-api";
import { BackgroundImage } from "../ui/Image.js";
import { ExitGameButton, PlayAgainButton } from "../ui/Button.js";
import { TextBlock } from "../ui/TextBlock.js";

export const DefeatScreen = ({ 
  onPlayAgain,
  onExit,
}: { 
  onPlayAgain: () => void;
  onExit: () => void;
}) => {
  return (
    <zstack height="100%" width="100%" alignment="center middle">
      <BackgroundImage url="defeat.png" description="defeat background" />
      <vstack gap="medium" alignment="middle center">
        <TextBlock size="large" weight="bold" color="red" text="You made too much noise..." />
        <PlayAgainButton onPress={onPlayAgain} />
        <ExitGameButton onPress={onExit} />
      </vstack>
    </zstack>
  );
};