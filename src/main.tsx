import { Devvit, useState } from '@devvit/public-api';

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

type GhostInfo = {
  name: string;
  image: string;
  clues: string[];
};

const ghosts: GhostInfo[] = [
  {
    name: "Whisperer",
    image: "whisperer.png",
    clues: [
      "Whispers phrases",
      "Can pretend to be the Sandman",
      "Unique (U): Repeats whisper again"
    ],
  },
  {
    name: "Sage",
    image: "sage.png",
    clues: [
      "Does not reflect in mirrors",
      "Can pretend to be another ghost",
      "Unique (U): A grey hair"
    ],
  },
  {
    name: "Sandman",
    image: "sandman.png",
    clues: [
      "Does not reflect in mirrors",
      "Leaves sand",
      "Unique (U): Plays with time"
    ],
  },
];

Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'regular',
  render: (_context) => {
    const [screen, setScreen] = useState<'start' | 'basement' | 'living_room' | 'attic'| 'defeat'| 'ghost_list'>('start');
    const [noiseLevel, setNoiseLevel] = useState(0);

    const [usedBasementHint, setUsedBasementHint] = useState(false);
    const [usedLivingRoomHint, setUsedLivingRoomHint] = useState(false);
    const [usedAtticHint, setUsedAtticHint] = useState(false);

    const [ghostIndex, setGhostIndex] = useState(0);

    const NoiseIndicator = () => (
      <hstack width="100%" alignment="start middle" padding="small">
        <text size="medium" color="white">{`Noise level: ${noiseLevel}%`}</text>
      </hstack>
    );

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

    if (screen === 'start') {
      return (
        <vstack height="100%" width="100%" gap="medium" alignment="center middle">
          <image
            url="silent-better.png"
            description="logo"
            imageHeight={256}
            imageWidth={256}
            height="157px"
            width="248px"
          />
          <text size="large">Welcome to Silent Better Game!</text>
          <button appearance="primary" onPress={() => {
            setScreen('basement');
            setNoiseLevel(0);
            setUsedBasementHint(false);
            setUsedLivingRoomHint(false);
            setUsedAtticHint(false);
          }}>
            Start Game
          </button>
          <button appearance="secondary" onPress={() => setScreen('ghost_list')}>
            View Ghosts
          </button>
        </vstack>
      );
    } else if (screen === 'ghost_list') {
      const ghost = ghosts[ghostIndex];

      return (
        <vstack height="100%" width="100%" gap="medium" alignment="top center" padding="medium">
          <hstack gap="small" alignment="center middle">
            <button appearance="secondary" onPress={() => setScreen('start')}>
              Back
            </button>
            <text size="xlarge" weight="bold">Ghosts Information</text>
          </hstack>
          
          <spacer size="medium" />
          <hstack gap="medium" alignment="top center" width="100%" grow>
            <image
              url={ghost.image}
              description={ghost.name}
              imageWidth={256}
              imageHeight={256}
              width="128px"
              height="128px"
            />
            <vstack alignment="start middle" gap="small">
              <text size="large" weight="bold">{ghost.name}</text>
              {ghost.clues.map((clue, i) => (
                <text size="medium" key={i.toString()}>{clue}</text>
              ))}
            </vstack>
          </hstack>
          <spacer size="medium" />
          <hstack gap="small" alignment="center middle">
            <button appearance="secondary" onPress={() => setGhostIndex((idx) => (idx === 0 ? ghosts.length - 1 : idx - 1))}>
              Previous
            </button>
            <button appearance="secondary" onPress={() => setGhostIndex((idx) => (idx === ghosts.length - 1 ? 0 : idx + 1))}>
              Next
            </button>
          </hstack>
        </vstack>
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
            {NoiseIndicator()}
            <text size="large" weight="bold" color="white">
              You are in the basement!.
            </text>
            <text size="medium" color="white">
              It's dark and damp. What will you do?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => {
                console.log("Look around pressed");
                if (!usedBasementHint) {
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
            {NoiseIndicator()}
            <text size="large" weight="bold" color="white">
              You are in the living room.
            </text>
            <text size="medium" color="white">
              You see a cozy sofa and a flickering TV. What will you do?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => {
                if (!usedLivingRoomHint) {
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
            {NoiseIndicator()}
            <text size="large" weight="bold" color="white">
              You are in the attic.
            </text>
            <text size="medium" color="white">
              Dusty boxes and old memories surround you. What now?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => {
                console.log("Open a box pressed");
                if (!usedAtticHint) {
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
          </vstack>
        </zstack>
      );
    } else if (screen === 'defeat') {
      return (
        <blocks>
          <text size="large" weight="bold" color="red">
            You made too much noise... Game Over.
          </text>
          <button appearance="primary" onPress={() => {
            setScreen('start');
            setNoiseLevel(0);
            setUsedBasementHint(false);
            setUsedLivingRoomHint(false);
            setUsedAtticHint(false);
          }}>
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
