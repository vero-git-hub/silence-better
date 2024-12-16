import { Devvit } from "@devvit/public-api";

export const NoiseBar = ({ noiseLevel }: { noiseLevel: number }) => {
  const progress = (noiseLevel / 5) * 100;

  return (
    <vstack width="100%" gap="small">
      <text size="small" color="white">
        Noise Level
      </text>
      <vstack backgroundColor="#FFD5C6" cornerRadius="full" width="100%" height="16px">
        <hstack backgroundColor="#D93A00" width={`${progress}%`} height="100%">
          <spacer />
        </hstack>
      </vstack>
    </vstack>
  );
};
