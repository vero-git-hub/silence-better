import { Devvit } from "@devvit/public-api";

export const HintBox = ({ hint }: { hint: string }) => {
  if (!hint || hint.trim() === "") return null;

  return (
    <vstack 
      backgroundColor="#FFF3CD"
      cornerRadius="medium"
      padding="small"
      borderColor="#FFC107"
      alignment="middle center"
    >
      <text size="medium" color="#856404" weight="bold">
        {hint}
      </text>
    </vstack>
  );
};
