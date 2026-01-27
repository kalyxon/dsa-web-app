// docusaurus.config.js
const { themes } = require('prism-react-renderer');

module.exports = {
  title: 'DSA Notes',
  tagline: 'Clean & Clear Data Structures and Algorithms Notes',
  url: 'https://Kalyxon.github.io',
  baseUrl: '/markdown-web-app/', // ← FIXED: Must match your repo name
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  organizationName: 'Kalyxon',
  projectName: 'markdown-web-app', // ← FIXED: Must match repo name

  presets: [
    [
      '@docusaurus/preset-classic', // ← FIXED: Missing '@'
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Makes docs the home page
          editUrl: 'https://github.com/Kalyxon/markdown-web-app/tree/main/', // ← FIXED repo name
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
        alt: 'GitHub Logo',
        src: 'img/logo.png',
      },
      items: [
        { to: '/', label: 'Home', position: 'left' }, // ← FIXED: Changed '/intro' to '/'
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
