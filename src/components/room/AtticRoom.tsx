import { Devvit } from "@devvit/public-api";
import { RoomLayout } from "../RoomLayout.js";

export const AtticScreen = ({
    noiseLevel,
    usedHint,
    clue,
    onHintActivate,
    goToBasement,
    goToLivingRoom,
    onExit,
  }: {
    noiseLevel: number;
    usedHint: boolean;
    clue: string;
    onHintActivate: () => void;
    goToBasement: () => void;
    goToLivingRoom: () => void;
    onExit: () => void;
  }) => {
    return (
      <RoomLayout
        backgroundImage="attic.png"
        roomTitle="You are in the attic."
        roomDescription="Dusty boxes and old memories surround you. What now?"
        noiseLevel={noiseLevel}
        hint={usedHint ? clue : null}
        secondaryActions={[
          { label: "Open a box", onPress: onHintActivate },
          { label: "Go back to basement", onPress: goToBasement },
          { label: "Go to living room", onPress: goToLivingRoom },
          { label: "Exit Game", onPress: onExit },
      ]}
      />
    );
  };