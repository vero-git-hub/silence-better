import { Devvit } from "@devvit/public-api";
import { NoiseIndicator } from "./NoiseIndicator.js";

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
          <image
            url={backgroundImage}
            description={`${roomTitle} background`}
            imageWidth={800}
            imageHeight={600}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
          <vstack gap="medium" alignment="middle center">
        <NoiseIndicator noiseLevel={noiseLevel} />
        <text size="large" weight="bold" color="white">
          {roomTitle}
        </text>
        <text size="medium" color="white">
          {roomDescription}
        </text>
        <hstack gap="small">
          {secondaryActions.map((action, index) => (
            <button
              key={index.toString()}
              appearance="secondary"
              onPress={action.onPress}
            >
              {action.label}
            </button>
          ))}
        </hstack>
        {onPrimaryAction && primaryActionLabel ? (
          <hstack gap="small">
            <button appearance="primary" onPress={onPrimaryAction}>
              {primaryActionLabel}
            </button>
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