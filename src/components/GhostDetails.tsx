import { Devvit } from "@devvit/public-api";
import { GhostInfo } from "../types.js";
import { GhostImage } from "./ui/Image.js";

export const GhostInfoBlock = ({ ghost }: { ghost: GhostInfo }) => (
  <hstack gap="medium" alignment="top center" width="100%" grow>
    <GhostImage url={ghost.image} description={ghost.name} />
    <vstack alignment="start middle" gap="small">
      <text size="large" weight="bold">{ghost.name}</text>
      <ClueList clues={ghost.clues} />
    </vstack>
  </hstack>
);

const ClueList = ({ clues }: { clues: string[] }) => (
  <>
    {clues.map((clue, i) => (
      <text size="medium" key={i.toString()}>{clue}</text>
    ))}
  </>
);