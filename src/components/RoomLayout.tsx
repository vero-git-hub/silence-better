import { Devvit } from "@devvit/public-api";
import { BackgroundImage } from "./ui/Image.js";
import { PrimaryButton, RenderActionButton } from "./ui/Button.js";
import { TextBlock } from "./ui/TextBlock.js";
import { NoiseBar } from "./NoiseBar.js";
import { HintBox } from "./HintBox.js";

export const RoomLayout = ({
    backgroundImage,
    roomTitle,
    roomDescription,
    noiseLevel,
    hint,
    onPrimaryAction,
    primaryActionLabel,
    secondaryActions,
  }: {
    backgroundImage: string;
    roomTitle: string;
    roomDescription: string;
    noiseLevel: number;
    hint: string | null;
    onPrimaryAction?: () => void;
    primaryActionLabel?: string;
    secondaryActions: {
      label: string;
      onPress: () => void;
    }[];
  }) => {
    return (
        <zstack height="100%" width="100%" alignment="center middle">
          <BackgroundImage url={backgroundImage} description={`${roomTitle} background`} />
          <vstack gap="medium" alignment="middle center">
            <NoiseBar noiseLevel={noiseLevel} />
            <hstack backgroundColor="rgba(0, 0, 0, 0.5)" cornerRadius="medium" padding="small">
              <TextBlock size="large" weight="bold" color="white" text={roomTitle} />
            </hstack>
            <hstack backgroundColor="rgba(0, 0, 0, 0.5)" cornerRadius="medium" padding="small">
              <TextBlock size="medium" color="white" text={roomDescription} />
            </hstack>
            <hstack gap="small">
              {secondaryActions.map((action, index) => (
                <RenderActionButton action={action} index={index} />
              ))}
            </hstack>
            {onPrimaryAction && primaryActionLabel ? (
              <hstack gap="small">
                <PrimaryButton onPress={onPrimaryAction} label={primaryActionLabel} />
              </hstack>
            ) : null}
            <HintBox hint={hint || ""} />
          </vstack>
        </zstack>
      );
  };