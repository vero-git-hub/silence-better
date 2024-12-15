import { Devvit } from "@devvit/public-api";
import { GhostInfo } from "../types.js";

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
        <hstack gap="medium" alignment="top center" width="100%" grow>
          <image
            url={ghost.image}
            description={ghost.name}
            imageWidth={256}
            imageHeight={256}
            width="128px"
            height="128px"
          />
          <vstack alignment="start middle" gap="small">
            <text size="large" weight="bold">{ghost.name}</text>
            {ghost.clues.map((clue, i) => (
              <text size="medium" key={i.toString()}>{clue}</text>
            ))}
          </vstack>
        </hstack>
        <spacer size="medium" />
        <hstack gap="small" alignment="center middle">
          <button appearance="secondary" onPress={onPrevious}>
            Previous
          </button>
          <button appearance="secondary" onPress={onNext}>
            Next
          </button>
        </hstack>
      </vstack>
    );
  };