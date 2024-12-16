import { Devvit } from "@devvit/public-api";

export const TextBlock = ({
  size,
  weight,
  color,
  text,
}: {
  size: "small" | "medium" | "large" | "xlarge";
  weight?: "bold";
  color?: string;
  text: string;
}) => (
  <text size={size} weight={weight} color={color}>
    {text}
  </text>
);