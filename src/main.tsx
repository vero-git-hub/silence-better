import { Devvit, useState } from '@devvit/public-api';
import { ghosts } from './data.js';
import { shuffleArray } from './utils.js';
import { NoiseIndicator } from './components/NoiseIndicator.js';
import { StartScreen } from './components/StartScreen.js';
import { GhostListScreen } from './components/GhostListScreen.js';

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
      // The preview appears while the post loads
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
          text: JSON.stringify([
            { e: "text", t: message }
          ]),
        });
        ui.showToast("Your results have been shared!");
      } catch (error) {
        console.error("Error while sharing results:", error);
        ui.showToast("Failed to share results. Please try again.");
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
        <zstack height="100%" width="100%" alignment="center middle">
          <image
            url="basement.png"
            description="basement background"
            imageWidth={800}
            imageHeight={600}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
          <vstack gap="medium" alignment="middle center">
          <NoiseIndicator noiseLevel={noiseLevel} />
            <text size="large" weight="bold" color="white">
              You are in the basement!.
            </text>
            <text size="medium" color="white">
              It's dark and damp. What will you do?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => {
                console.log("Look around pressed");
                if (!usedBasementHint && chosenGhostIndex !== null) {
                  increaseNoise(3);
                  setUsedBasementHint(true);
                } else {
                  console.log("You already looked around here.");
                }
              }}>
                Look around
              </button>
              <button appearance="secondary" onPress={() => goToRoom('living_room')}>
                Go to the living room
              </button>
              <button appearance="secondary" onPress={() => goToRoom('attic')}>
                Go to the attic
              </button>
            </hstack>
            <hstack gap="small">
              <button
                appearance="primary"
                onPress={() => setScreen('guess')}
              >
                Guess the ghost
              </button>
            </hstack>
            {usedBasementHint && (
              <text size="medium" color="yellow">{randomizedClues[0]}</text>
            )}
          </vstack>
        </zstack>
      );
    } else if (screen === 'guess') {
        return (
          <zstack height="100%" width="100%" alignment="center middle">
            <image
              url="guess_background.png"
              description="guessing background"
              imageWidth={800}
              imageHeight={600}
              width="100%"
              height="100%"
              resizeMode="cover"
            />
            <vstack gap="medium" alignment="middle center">
              <text size="large" weight="bold" color="white">
                Who is haunting this house?
              </text>
              {ghosts.map((ghost, index) => (
                <button
                  key={index.toString()}
                  appearance="secondary"
                  onPress={() => {
                    if (chosenGhostIndex === index) {
                      setScreen('victory');
                    } else {
                      setScreen('ghost_victory');
                    }
                  }}
                >
                  {ghost.name}
                </button>
              ))}
              <button
                appearance="secondary"
                onPress={() => setScreen('basement')}
              >
                Back to the basement
              </button>
            </vstack>
          </zstack>
        );
    } else if (screen === 'victory') {
        return (
          <zstack height="100%" width="100%" alignment="center middle">
            <image
              url="victory.png"
              description="victory background"
              imageWidth={800}
              imageHeight={600}
              width="100%"
              height="100%"
              resizeMode="cover"
            />
            <vstack gap="medium" alignment="middle center">
              <text size="large" weight="bold" color="gold">
                Congratulations! You have identified the ghost!
              </text>
              <text size="medium" color="white">
                The ghost was {ghosts[chosenGhostIndex!].name}.
              </text>
              <button
                appearance="primary"
                onPress={() => setScreen('start')}
              >
                Play Again
              </button>
              <button
                appearance="secondary"
                onPress={() => {
                  shareResults(
                    _context,
                    `I guessed the ghost! It was ${ghosts[chosenGhostIndex!].name} with a noise level of ${noiseLevel}.`
                  ).catch((error) => {
                    console.error("Error during shareResults:", error);
                  });
                }}
              >
                Share Results
              </button>
            </vstack>
          </zstack>
        );
    } else if (screen === 'ghost_victory') {
      return (
        <zstack height="100%" width="100%" alignment="center middle">
          <image
            url="ghost_victory.png"
            description="ghost victory background"
            imageWidth={800}
            imageHeight={600}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
          <vstack gap="medium" alignment="middle center">
            <text size="large" weight="bold" color="red">
              The ghost has won! He managed to confuse you.
            </text>
            <button
              appearance="primary"
              onPress={() => setScreen('start')}
            >
              Play Again
            </button>
          </vstack>
        </zstack>
      );
    } else if (screen === 'living_room') {
      return (
        <zstack height="100%" width="100%" alignment="center middle">
          <image
            url="living_room.png"
            description="living room background"
            imageWidth={800}
            imageHeight={600}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
          <vstack gap="medium" alignment="middle center">
          <NoiseIndicator noiseLevel={noiseLevel} />
            <text size="large" weight="bold" color="white">
              You are in the living room.
            </text>
            <text size="medium" color="white">
              You see a cozy sofa and a flickering TV. What will you do?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => {
                if (!usedLivingRoomHint && chosenGhostIndex !== null) {
                  increaseNoise(2);
                  setUsedLivingRoomHint(true);
                } else {
                  console.log("You already sat on the sofa here.");
                }
              }}>
                Sit on the sofa
              </button>
              <button appearance="secondary" onPress={() => goToRoom('basement')}>
                Back to the basement
              </button>
              <button appearance="secondary" onPress={() => goToRoom('attic')}>
                Go to the attic
              </button>
            </hstack>
            {usedLivingRoomHint && (
              <text size="medium" color="yellow">{randomizedClues[1]}</text>
            )}
          </vstack>
        </zstack>
      );
    } else if (screen === 'attic') {
      return (
        <zstack height="100%" width="100%" alignment="center middle">
          <image
            url="attic.png"
            description="attic background"
            imageWidth={800}
            imageHeight={600}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
          <vstack gap="medium" alignment="middle center">
          <NoiseIndicator noiseLevel={noiseLevel} />
            <text size="large" weight="bold" color="white">
              You are in the attic.
            </text>
            <text size="medium" color="white">
              Dusty boxes and old memories surround you. What now?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => {
                console.log("Open a box pressed");
                if (!usedAtticHint && chosenGhostIndex !== null) {
                  increaseNoise(1);
                  setUsedAtticHint(true);
                } else {
                  console.log("You already opened a box here.");
                }
              }}>
                Open a box
              </button>
              <button appearance="secondary" onPress={() => goToRoom('basement')}>
                Go back to basement
              </button>
              <button appearance="secondary" onPress={() => goToRoom('living_room')}>
                Go to living room
              </button>
            </hstack>
            {usedAtticHint && (
              <text size="medium" color="yellow">{randomizedClues[2]}</text>
            )}
          </vstack>
        </zstack>
      );
    } else if (screen === 'defeat') {
      return (
        <blocks>
          <text size="large" weight="bold" color="red">
            You made too much noise... Game Over.
          </text>
          <button appearance="primary" onPress={() => setScreen('start')}>
            Restart
          </button>
        </blocks>
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
