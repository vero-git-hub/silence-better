import { Devvit } from "@devvit/public-api";
import { BackgroundImage } from "../ui/Image.js";
import { BackButton, GhostButton } from "../ui/Button.js";
import { TextBlock } from "../ui/TextBlock.js";

export const GuessScreen = ({
  ghosts,
  onSelectGhost,
  onBack,
}: {
  ghosts: { name: string }[];
  onSelectGhost: (index: number) => void;
  onBack: () => void;
}) => {
  return (
    <zstack height="100%" width="100%" alignment="center middle">
      <BackgroundImage url="guess_background.png" description="guessing background" />
      <vstack gap="medium" alignment="middle center">
        <TextBlock size="large" weight="bold" color="white" text="Who is haunting this house?" />
        {ghosts.map((ghost, index) => (
          <vstack key={`ghost_${index}`} alignment="middle center">
            <GhostButton ghost={ghost} onPress={() => onSelectGhost(index)} />
          </vstack>
        ))}
        <BackButton onPress={onBack} label="Back to the basement"/>
      </vstack>
    </zstack>
  );
};