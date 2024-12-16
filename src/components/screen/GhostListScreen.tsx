import { Devvit } from "@devvit/public-api";
import { GhostInfo } from "../../types.js";
import { BackButton, NavigationButtons } from "../ui/Button.js";
import { GhostInfoBlock } from "../GhostDetails.js";
import { TextBlock } from "../ui/TextBlock.js";
import { BackgroundImage } from "../ui/Image.js";

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
      <zstack height="100%" width="100%" alignment="center middle">
        <BackgroundImage url="ghost_list.png" description="ghost list background" />
        <vstack height="100%" width="100%" gap="medium" alignment="top center" padding="medium">
          <hstack gap="small" alignment="center middle">
            <BackButton onPress={onBack} label="Back"/>
            <TextBlock size="xlarge" weight="bold" text={`Ghost ${ghostIndex + 1} of ${ghosts.length}`} />
          </hstack>
          <GhostInfoBlock ghost={ghost} />
          <NavigationButtons onPrevious={onPrevious} onNext={onNext} />
        </vstack>
      </zstack>
    );
  };