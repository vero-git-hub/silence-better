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
        <button appearance="primary" onPress={() => {
          console.log("Start Game clicked!");
        }}>
          Start Game
        </button>
      </vstack>
    );
  },
});

export default Devvit;
