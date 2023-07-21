// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "DexAppBuilder",
  tagline: "Low/no code tool for web3",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs-dexkit-open.dexkit.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "DexKit", // Usually your GitHub org/user name.
  projectName: "dexkit-open-monorepo", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/DexKit/dexkit-open-monorepo/tree/main/apps/docs",
        },
        /* blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/DexKit/dexkit-open-monorepo/tree/main/apps/docs/templates/shared/",
        },*/
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "DexKit",
        logo: {
          alt: "DexKit logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
          },
          /*  { to: "/blog", label: "Blog", position: "left" },*/
          {
            href: "https://github.com/DexKit/dexkit-open-monorepo",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              /* {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/dexkit",
              },*/
              {
                label: "Discord",
                href: "https://discord.gg/dexkit-official-943552525217435649",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/dexkit",
              },
            ],
          },
          {
            title: "More",
            items: [
              /*  {
                label: "Blog",
                to: "/blog",
              },*/
              {
                label: "DexAppBuilder",
                href: "https://dexappbuilder.dexkit.com",
              },
              {
                label: "GitHub",
                href: "https://github.com/DexKit/dexkit-open-monorepo",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DexKit, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
