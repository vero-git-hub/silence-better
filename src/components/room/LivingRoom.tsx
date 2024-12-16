import { Devvit } from "@devvit/public-api";
import { RoomLayout } from "../RoomLayout.js";

export const LivingRoomScreen = ({
    noiseLevel,
    usedLivingRoomHint,
    randomizedClue,
    onHintActivate,
    goToBasement,
    goToAttic,
    onExit,
  }: {
    noiseLevel: number;
    usedLivingRoomHint: boolean;
    randomizedClue: string;
    onHintActivate: () => void;
    goToBasement: () => void;
    goToAttic: () => void;
    onExit: () => void;
  }) => {
    return (
      <RoomLayout
        backgroundImage="living_room.png"
        roomTitle="You are in the living room."
        roomDescription="You see a cozy sofa and a flickering TV. What will you do?"
        noiseLevel={noiseLevel}
        hint={usedLivingRoomHint ? randomizedClue : null}
        secondaryActions={[
          { label: "Sit on the sofa", onPress: onHintActivate },
          { label: "Back to the basement", onPress: goToBasement },
          { label: "Go to the attic", onPress: goToAttic },
          { label: "Exit Game", onPress: onExit },
        ]}
    />
    );
  };