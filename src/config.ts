import type { Site, SocialObjects, FriendObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.longlin.tech/", // replace this with your deployed domain
  author: "Longlin",
  desc: "Longlin 的个人小站",
  title: "Longlin's Blog",
  ogImage: "longlin-og.png",
  lightAndDarkMode: true,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "zh", // html lang code. Set this empty and default will be "en"
  langTag: ["zh-CN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: false,
  width: 216,
  height: 46,
};

export const FRIENDS: FriendObjects = [
  {
    blogURL: "https://blog.longlin.tech/",
    avatarURL:
      "https://avatars.githubusercontent.com/u/110278150?s=400&u=1cc03388b1a41b5d409de8c19b6d8a356d686b78&v=4",
    title: "longlin's 个人小站",
    description: "Simple is Complex.",
  },
  {
    blogURL: "https://blog.stv.pm/",
    avatarURL: "https://avatars.githubusercontent.com/u/113920720?v=4",
    title: "Steven Lynn's Blog",
    description: "Steven Lynn的个人博客",
  },
  {
    blogURL: "https://observatoryx.vercel.app/",
    avatarURL:
      "https://observatoryx.vercel.app/_astro/IMG_7218.B5FsYGDl_1NB5Au.webp",
    title: "ObservatoryX",
    description: "天文观测站",
  },
];

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/longlin10086",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  // {
  //   name: "Facebook",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Facebook`,
  //   active: true,
  // },
  // {
  //   name: "Instagram",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Instagram`,
  //   active: true,
  // },
  // {
  //   name: "LinkedIn",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on LinkedIn`,
  //   active: true,
  // },
  {
    name: "Mail",
    href: "gnulonglin@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  // {
  //   name: "Twitch",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Twitch`,
  //   active: false,
  // },
  // {
  //   name: "YouTube",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on YouTube`,
  //   active: false,
  // },
  // {
  //   name: "WhatsApp",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on WhatsApp`,
  //   active: false,
  // },
  // {
  //   name: "Snapchat",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Snapchat`,
  //   active: false,
  // },
  // {
  //   name: "Pinterest",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Pinterest`,
  //   active: false,
  // },
  // {
  //   name: "TikTok",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on TikTok`,
  //   active: false,
  // },
  // {
  //   name: "CodePen",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on CodePen`,
  //   active: false,
  // },
  // {
  //   name: "Discord",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Discord`,
  //   active: false,
  // },
  // {
  //   name: "GitLab",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on GitLab`,
  //   active: false,
  // },
  // {
  //   name: "Reddit",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Reddit`,
  //   active: false,
  // },
  // {
  //   name: "Skype",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Skype`,
  //   active: false,
  // },
  {
    name: "Steam",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  // {
  //   name: "Mastodon",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Mastodon`,
  //   active: false,
  // },
];
