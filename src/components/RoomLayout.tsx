import { Devvit } from "@devvit/public-api";
import { NoiseIndicator } from "./NoiseIndicator.js";
import { BackgroundImage } from "./ui/Image.js";
import { PrimaryButton, RenderActionButton } from "./ui/Button.js";
import { TextBlock } from "./ui/TextBlock.js";

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
            <NoiseIndicator noiseLevel={noiseLevel} />
            <TextBlock size="large" weight="bold" color="white" text={roomTitle} />
            <TextBlock size="medium" color="white" text={roomDescription} />
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
            {hint != null && hint !== "" && (
              <text size="medium" color="yellow">
                {hint}
              </text>
            )}
          </vstack>
        </zstack>
      );
  };