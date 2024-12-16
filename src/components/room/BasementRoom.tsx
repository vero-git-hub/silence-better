import { Devvit } from "@devvit/public-api";
import { RoomLayout } from "../RoomLayout.js";

export const BasementScreen = ({
    noiseLevel,
    usedHint,
    clue,
    onLookAround,
    onGoToLivingRoom,
    onGoToAttic,
    onGuess,
  }: {
    noiseLevel: number;
    usedHint: boolean;
    clue: string;
    onLookAround: () => void;
    onGoToLivingRoom: () => void;
    onGoToAttic: () => void;
    onGuess: () => void;
  }) => {
    return (
      <RoomLayout
      backgroundImage="basement.png"
      roomTitle="You are in the basement!"
      roomDescription="It's dark and damp. What will you do?"
      noiseLevel={noiseLevel}
      hint={usedHint ? clue : null}
      primaryActionLabel="Guess the ghost"
      onPrimaryAction={onGuess}
      secondaryActions={[
        { label: "Look around", onPress: onLookAround },
        { label: "Go to the living room", onPress: onGoToLivingRoom },
        { label: "Go to the attic", onPress: onGoToAttic },
      ]}
    />
    );
  };