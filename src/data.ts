import { GhostInfo } from "./types.js";

export const ghosts: GhostInfo[] = [
  {
    name: "Whisperer",
    image: "whisperer.png",
    clues: [
      "Whispers phrases",
      "Leaves sand",
      "Whispers phrases"
    ],
  },
  {
    name: "Sage",
    image: "sage.png",
    clues: [
      "Does not reflect in mirrors",
      "Whispers phrases",
      "A grey hair"
    ],
  },
  {
    name: "Sandman",
    image: "sandman.png",
    clues: [
      "Does not reflect in mirrors",
      "Leaves sand",
      "Plays with time"
    ],
  },
];

export const rulesPages = [
    [
      "Welcome to Silence Better, a game of strategy and deduction! Here's how to play:",
      "Identify the ghost haunting the house before the noise level reaches its maximum (6).",
      "Explore rooms, uncover clues, and make your final guess.",
      "Beware: noise will attract the ghost, and the game will end if you make too much noise!",
    ],
    [
      "1. Start the Game: Press 'Start Game' to begin. You’ll start in the basement.",
      "2. Explore Rooms: Navigate between the basement, living room, and attic.", 
      "3. Gather Clues: Use the actions in each room to find clues.",
      "4. Noise Level: Gathering clues or moving between rooms", "that you’ve already used hints increases noise.",
      "5. Guess the Ghost: Use the 'Guess the Ghost' button in the basement.",
    ],
    [
      "Choose wisely—an incorrect guess means the ghost wins!",
      "Tips for Success",
      "- Each ghost has unique traits; study them before starting the game.",
      "- Plan your actions strategically to minimize noise.",
      "- Use your hints wisely—they’re your key to identifying the ghost!",
    ],
  ];