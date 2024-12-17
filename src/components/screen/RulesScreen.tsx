import { Devvit } from "@devvit/public-api";
import { BackgroundImage } from "../ui/Image.js";
import { TextBlock } from "../ui/TextBlock.js";
import { BackButton } from "../ui/Button.js";
import { rulesPages } from "../../data.js";

export const RulesScreen = ({
  onBack,
  context,
}: {
  onBack: () => void;
  context: any;
}) => {
  const [currentPage, setCurrentPage] = context.useState(0);

  return (
    <zstack height="100%" width="100%" alignment="center middle">
      <BackgroundImage url="rules_screen.png" description="rules background" />
      <vstack 
        backgroundColor="rgba(0, 0, 0, 0.6)"
        cornerRadius="large"
        padding="large"
        gap="medium"
        alignment="middle center"
        width="90%"
      >
        <TextBlock size="large" weight="bold" color="#FFD700" text="Rules of Silence Better Game" />
        {rulesPages[currentPage].map((text, index) => (
          <text key={`rule_${currentPage}_${index}`} size="medium" color="white">
            {text}
          </text>
        ))}
        <hstack gap="small" alignment="center middle">
          {currentPage > 0 && (
            <button
              appearance="secondary"
              onPress={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {currentPage < rulesPages.length - 1 ? (
            <button
              appearance="secondary"
              onPress={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          ) : (
            <BackButton onPress={onBack} label="Back" />
          )}
        </hstack>
      </vstack>
    </zstack>
  );
};