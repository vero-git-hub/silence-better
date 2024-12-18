import { Devvit } from "@devvit/public-api";

export const BackgroundImage = ({ url, description }: { url: string; description: string }) => (
  <image
    url={url}
    description={description}
    imageWidth={800}
    imageHeight={600}
    width="100%"
    height="100%"
    resizeMode="cover"
  />
);

export const LogoImage = ({ url, description }: { url: string; description: string }) => (
  <image
    url={url}
    description={description}
    imageHeight={256}
    imageWidth={256}
    height="157px"
    width="248px"
  />
);

export const GhostImage = ({ url, description }: { url: string; description: string }) => (
  <zstack alignment="center middle" width="170px" height="180px">
    <vstack
      width="100%"
      height="100%"
      backgroundColor="#fff"
      cornerRadius="medium"
    />
    <image
      url={url}
      description={description}
      imageWidth={256}
      imageHeight={256}
      width="160px"
      height="170px"
    />
  </zstack>
);