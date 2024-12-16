import { Devvit, useState } from '@devvit/public-api';
import { ghosts } from './data.js';
import { shuffleArray } from './utils.js';
import { StartScreen } from './components/screen/StartScreen.js';
import { GhostListScreen } from './components/screen/GhostListScreen.js';
import { GuessScreen } from './components/screen/GuessScreen.js';
import { VictoryScreen } from './components/screen/VictoryScreen.js';
import { GhostVictoryScreen } from './components/screen/GhostVictoryScreen.js';
import { BasementScreen } from './components/room/BasementRoom.js';
import { LivingRoomScreen } from './components/room/LivingRoom.js';
import { AtticScreen } from './components/room/AtticRoom.js';
import { DefeatScreen } from './components/screen/DefeatScreen.js';

Devvit.configure({
  redditAPI: true,
});

Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'My devvit post',
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'regular',
  render: (_context) => {
    const [screen, setScreen] = useState<'start' | 'basement' | 'living_room' | 'attic'| 'defeat'| 'ghost_list' | 'guess' | 'victory' | 'ghost_victory'>('start');
    const [noiseLevel, setNoiseLevel] = useState(0);

    const [usedBasementHint, setUsedBasementHint] = useState(false);
    const [usedLivingRoomHint, setUsedLivingRoomHint] = useState(false);
    const [usedAtticHint, setUsedAtticHint] = useState(false);

    const [chosenGhostIndex, setChosenGhostIndex] = useState<number | null>(null);
    const [randomizedClues, setRandomizedClues] = useState<string[]>([]);

    const [ghostIndex, setGhostIndex] = useState(0);

    function increaseNoise(amount: number) {
      setNoiseLevel((lvl) => {
        const newLvl = lvl + amount;
        if (newLvl > 5 && screen !== 'defeat') {
          setScreen('defeat');
        }
        return newLvl;
      });
    }

    function goToRoom(newRoom: 'basement' | 'living_room' | 'attic') {
      setScreen((oldRoom) => {
        if (oldRoom !== 'start') {
          if (newRoom === 'basement' && usedBasementHint) {
            increaseNoise(1); 
          } else if (newRoom === 'living_room' && usedLivingRoomHint) {
            increaseNoise(1);
          } else if (newRoom === 'attic' && usedAtticHint) {
            increaseNoise(1);
          }
        }
        return newRoom;
      });
    }

    function startGame() {
      const randomIndex = Math.floor(Math.random() * ghosts.length);
      setChosenGhostIndex(randomIndex);
      console.log("Chosen ghost:", ghosts[randomIndex].name);

      const clues = shuffleArray([...ghosts[randomIndex].clues]);
      setRandomizedClues(clues);

      setScreen('basement');
      setNoiseLevel(0);
      setUsedBasementHint(false);
      setUsedLivingRoomHint(false);
      setUsedAtticHint(false);
    }

    async function shareResults(context: any, message: string) {
      const { reddit, ui, postId } = context;
    
      if (!postId) {
        console.error("No post ID found. Cannot share results.");
        ui.showToast("Error: Unable to share results. Please try again.");
        return;
      }
    
      try {
        await reddit.submitComment({
          id: postId,
          text: message,
        });
        ui.showToast("Your results have been shared!");
      } catch (error) {
        console.error("Error while sharing results:", error);
        ui.showToast("Failed to share results. Please try again.");
      }
    }

    async function handleShareResults() {
      if (chosenGhostIndex !== null) {
        const message = `I guessed the ghost! It was ${ghosts[chosenGhostIndex].name} with a noise level of ${noiseLevel}.`;
        await shareResults(_context, message);
      }
    }

    function handleSelectGhost(index: number) {
      if (chosenGhostIndex === index) {
        setScreen('victory');
      } else {
        setScreen('ghost_victory');
      }
    }

    if (screen === 'start') {
      return (
        <StartScreen
          onStartGame={startGame}
          onViewGhosts={() => setScreen('ghost_list')}
        />
      );
    } else if (screen === 'ghost_list') {
      return (
        <GhostListScreen
          ghostIndex={ghostIndex}
          ghosts={ghosts}
          onBack={() => setScreen('start')}
          onPrevious={() =>
            setGhostIndex((idx) => (idx === 0 ? ghosts.length - 1 : idx - 1))
          }
          onNext={() => 
            setGhostIndex((idx) => (idx === ghosts.length - 1 ? 0 : idx + 1))
          }
          />
      );
    } else if (screen === 'basement') {
      return (
        <BasementScreen
          noiseLevel={noiseLevel}
          usedHint={usedBasementHint}
          clue={randomizedClues[0] || ""}
          onLookAround={() => {
            if (!usedBasementHint && chosenGhostIndex !== null) {
              increaseNoise(3);
              setUsedBasementHint(true);
            }
          }}
          onGoToLivingRoom={() => goToRoom('living_room')}
          onGoToAttic={() => goToRoom('attic')}
          onGuess={() => setScreen('guess')}
        />
      );
    } else if (screen === 'guess') {
        return (
          <GuessScreen
            ghosts={ghosts}
            onSelectGhost={handleSelectGhost}
            onBack={() => setScreen('basement')}
          />
        );
    } else if (screen === 'victory') {
        return (
          <VictoryScreen
            ghostName={ghosts[chosenGhostIndex!].name}
            onPlayAgain={() => setScreen("start")}
            onShareResults={handleShareResults}
          />
        );
    } else if (screen === 'ghost_victory') {
      return (
        <GhostVictoryScreen onPlayAgain={() => setScreen("start")}
        />
      );
    } else if (screen === 'living_room') {
      return (
        <LivingRoomScreen
          noiseLevel={noiseLevel}
          usedLivingRoomHint={usedLivingRoomHint}
          randomizedClue={randomizedClues[1]}
          onHintActivate={() => {
            if (!usedLivingRoomHint && chosenGhostIndex !== null) {
              increaseNoise(2);
              setUsedLivingRoomHint(true);
            } else {
              console.log("You already sat on the sofa here.");
            }
          }}
          goToBasement={() => goToRoom("basement")}
          goToAttic={() => goToRoom("attic")}
        />
      );
    } else if (screen === 'attic') {
      return (
        <AtticScreen
          noiseLevel={noiseLevel}
          usedHint={usedAtticHint}
          clue={randomizedClues[2]}
          onHintActivate={() => {
            console.log("Open a box pressed");
            if (!usedAtticHint && chosenGhostIndex !== null) {
              increaseNoise(1);
              setUsedAtticHint(true);
            } else {
              console.log("You already opened a box here.");
            }
          }}
          goToBasement={() => goToRoom("basement")}
          goToLivingRoom={() => goToRoom("living_room")}
        />
      );
    } else if (screen === 'defeat') {
      return (
        <DefeatScreen onPlayAgain={() => setScreen('start')} />
      );
    }
    return (
      <blocks>
        <text>Unknown screen state</text>
      </blocks>
    );
  },
});

export default Devvit;
