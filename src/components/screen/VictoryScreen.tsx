import { Devvit } from "@devvit/public-api";
import { BackgroundImage } from "../ui/Image.js";
import { ExitGameButton, PlayAgainButton, SecondaryButton } from "../ui/Button.js";
import { TextBlock } from "../ui/TextBlock.js";

export const VictoryScreen = ({
  ghostName,
  onPlayAgain,
  onShareResults,
  onExit,
}: {
  ghostName: string;
  onPlayAgain: () => void;
  onShareResults: () => Promise<void>;
  onExit: () => void;
}) => {
  return (
    <zstack height="100%" width="100%" alignment="center middle">
      <BackgroundImage url="victory.png" description="victory background" />
      <vstack gap="medium" alignment="middle center">
        <TextBlock
          size="large"
          weight="bold"
          color="gold"
          text="Congratulations! You have identified the ghost!"
        />
        <TextBlock
          size="medium"
          color="white"
          text={`The ghost was ${ghostName}.`}
        />
        <PlayAgainButton onPress={onPlayAgain} />
        <ExitGameButton onPress={onExit} />
        <SecondaryButton
          onPress={() =>
            onShareResults().catch((error) => {
              console.error("Error sharing results in VictoryScreen:", error);
            })
          }
          label="Share Results"
        />
      </vstack>
    </zstack>
  );
};