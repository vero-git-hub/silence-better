import { Devvit } from "@devvit/public-api";
import { GhostInfo } from "../../types.js";
import { BackButton, NavigationButtons } from "../ui/Button.js";
import { GhostInfoBlock } from "../GhostDetails.js";
import { TextBlock } from "../ui/TextBlock.js";

export const GhostListScreen = ({
    ghostIndex,
    ghosts,
    onBack,
    onPrevious,
    onNext,
  }: {
    ghostIndex: number;
    ghosts: GhostInfo[];
    onBack: () => void;
    onPrevious: () => void;
    onNext: () => void;
  }) => {
    const ghost = ghosts[ghostIndex];
  
    return (
      <vstack height="100%" width="100%" gap="medium" alignment="top center" padding="medium">
      <hstack gap="small" alignment="center middle">
        <BackButton onPress={onBack} label="Back"/>
        <TextBlock size="xlarge" weight="bold" text={`Ghost ${ghostIndex + 1} of ${ghosts.length}`} />
      </hstack>
      <spacer size="medium" />
      <GhostInfoBlock ghost={ghost} />
      <spacer size="medium" />
      <NavigationButtons onPrevious={onPrevious} onNext={onNext} />
    </vstack>
    );
  };