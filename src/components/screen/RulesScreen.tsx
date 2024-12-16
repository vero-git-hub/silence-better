import { Devvit } from "@devvit/public-api";
import { BackButton } from "../ui/Button.js";
import { TextBlock } from "../ui/TextBlock.js";
import { BackgroundImage } from "../ui/Image.js";

export const RulesScreen = ({
    onBack,
  }: {
    onBack: () => void;
  }) => {
    
    return (
      <zstack height="100%" width="100%" alignment="center middle">
        <BackgroundImage url="rules.png" description="rules background" />
        <vstack gap="medium" alignment="top center" padding="medium" width="90%">
          <TextBlock size="large" weight="bold" color="gold" text="Rules of Silence Better Game" />
          <TextBlock size="medium" color="white" text="Welcome to Silence Better, a game of strategy and deduction! Here's how to play:" />
          <TextBlock size="large" weight="bold" color="white" text="Objective" />
          <TextBlock size="medium" color="white" text="Identify the ghost haunting the house before the noise level reaches its maximum (6). Explore rooms, uncover clues, and make your final guess. Beware: noise will attract the ghost, and the game will end if you make too much noise!" />

          <TextBlock size="large" weight="bold" color="white" text="How to Play" />
          <vstack gap="small" alignment="start">
            <TextBlock size="medium" color="white" text="1. Start the Game: Press 'Start Game' to begin. You’ll start in the basement." />
            <TextBlock size="medium" color="white" text="2. Explore Rooms: Navigate between the basement, living room, and attic. Each room holds clues about the ghost." />
            <TextBlock size="medium" color="white" text="3. Gather Clues: Use the 'Look around' or 'Open a box' actions in each room to find clues. Be careful: gathering clues increases noise!" />
            <TextBlock size="medium" color="white" text="4. Noise Level: Moving between rooms or interacting with objects increases noise if you’ve already used hints in those areas. Keep the noise level below 5 to stay in the game." />
            <TextBlock size="medium" color="white" text="5. Guess the Ghost: Once you feel confident, use the 'Guess the Ghost' button to identify the haunting entity. Choose wisely—an incorrect guess means the ghost wins!" />
          </vstack>

          <TextBlock size="large" weight="bold" color="white" text="Tips for Success" />
          <TextBlock size="medium" color="white" text="- Each ghost has unique traits; study them before starting the game." />
          <TextBlock size="medium" color="white" text="- Plan your actions strategically to minimize noise." />
          <TextBlock size="medium" color="white" text="- Use your hints wisely—they’re your key to identifying the ghost!" />
          
          <hstack gap="small" alignment="center middle">
            <BackButton onPress={onBack} label="Back" />
          </hstack>
        </vstack>
      </zstack>
    );
  };