// docusaurus.config.js
const { themes } = require('prism-react-renderer');

module.exports = {
  title: 'DSA Notes',
  tagline: 'Clean & Clear Data Structures and Algorithms Notes',
  url: 'https://kalyxon.github.io',
  baseUrl: '/markdown-web-app/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  organizationName: 'Kalyxon',
  projectName: 'markdown-web-app',

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/Kalyxon/markdown-web-app/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: false,
      title: 'DSA Notes',
      logo: {
        alt: 'DSA Notes Logo',
        src: 'img/logo.png',
      },
      items: [
        { to: '/', label: 'Home', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Kalyxon DSA Notes`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ['cpp', 'java', 'python', 'bash'],
    },
  },
};
