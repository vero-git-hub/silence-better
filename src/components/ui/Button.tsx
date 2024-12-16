import { Devvit } from "@devvit/public-api";

export const NavigationButtons = ({ onPrevious, onNext }: { onPrevious: () => void; onNext: () => void }) => (
  <hstack gap="small" alignment="center middle">
    <button appearance="secondary" onPress={onPrevious}>
      Previous
    </button>
    <button appearance="secondary" onPress={onNext}>
      Next
    </button>
  </hstack>
);

export const PlayAgainButton = ({ onPress }: { onPress: () => void }) => (
  <button appearance="primary" onPress={onPress}>
    Play Again
  </button>
);

export const GhostButton = ({ ghost, onPress }: { ghost: { name: string }; onPress: () => void }) => (
  <button appearance="secondary" onPress={onPress}>
    {ghost.name}
  </button>
);

export const BackButton = ({ onPress, label }: { onPress: () => void; label: string; }) => (
  <button appearance="secondary" onPress={onPress}>
    {label}
  </button>
);

export const PrimaryButton = ({ onPress, label }: { onPress: () => void; label: string; }) => (
  <button appearance="primary" onPress={onPress}>
    {label}
  </button>
);

export const SecondaryButton = ({ onPress, label }: { onPress: () => void; label: string; }) => (
  <button appearance="secondary" onPress={onPress}>
    {label}
  </button>
);

export const RenderActionButton = ({ action, index }: { action: { onPress: () => void; label: string; }, index: number }) => (
    <button
      key={index.toString()}
      appearance="secondary"
      onPress={action.onPress}
    >
      {action.label}
    </button>
  );

export const ExitGameButton = ({ onPress }: { onPress: () => void }) => (
  <button appearance="secondary" onPress={onPress}>
    Exit Game
  </button>
);