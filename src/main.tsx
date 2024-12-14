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

Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'regular',
  render: (_context) => {
    const [screen, setScreen] = useState<'start' | 'basement' | 'living_room' | 'attic'>('start');

    if (screen === 'start') {
      return (
        <vstack height="100%" width="100%" gap="medium" alignment="center middle">
          <image
            url="silent-better.png"
            description="logo"
            imageHeight={256}
            imageWidth={256}
            height="215px"
            width="248px"
          />
          <text size="large">Welcome to Silent Better Game!</text>
          <button appearance="primary" onPress={() => setScreen('basement')}>
            Start Game
          </button>
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
            <text size="large" weight="bold" color="white">
              You are in the basement.
            </text>
            <text size="medium" color="white">
              It's dark and damp. What will you do?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => console.log("Look around pressed")}>
                Look around
              </button>
              <button appearance="secondary" onPress={() => setScreen('living_room')}>
                Go to the living room
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
            <text size="large" weight="bold" color="white">
              You are in the living room.
            </text>
            <text size="medium" color="white">
              You see a cozy sofa and a flickering TV. What will you do?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => console.log("Sit on sofa pressed")}>
                Sit on the sofa
              </button>
              <button appearance="secondary" onPress={() => setScreen('basement')}>
                Back to the basement
              </button>
              <button appearance="secondary" onPress={() => setScreen('attic')}>
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
            <text size="large" weight="bold" color="white">
              You are in the attic.
            </text>
            <text size="medium" color="white">
              Dusty boxes and old memories surround you. What now?
            </text>
            <hstack gap="small">
              <button appearance="secondary" onPress={() => console.log("Open a box pressed")}>
                Open a box
              </button>
              <button appearance="secondary" onPress={() => setScreen('basement')}>
                Go back to basement
              </button>
              <button appearance="secondary" onPress={() => setScreen('living_room')}>
                Go to living room
              </button>
            </hstack>
          </vstack>
        </zstack>
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
