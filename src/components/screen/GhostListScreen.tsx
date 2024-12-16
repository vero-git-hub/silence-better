import { Devvit } from "@devvit/public-api";
import { GhostInfo } from "../../types.js";
import { NavigationButtons } from "../ui/Button.js";
import { GhostInfoBlock } from "../GhostDetails.js";

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
        <button appearance="secondary" onPress={onBack}>
          Back
        </button>
        <text size="xlarge" weight="bold">
          Ghosts Information
        </text>
      </hstack>
      <spacer size="medium" />
      <GhostInfoBlock ghost={ghost} />
      <spacer size="medium" />
      <NavigationButtons onPrevious={onPrevious} onNext={onNext} />
    </vstack>
    );
  };