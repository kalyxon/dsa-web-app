// docusaurus.config.js
const { themes } = require('prism-react-renderer');

module.exports = {
  title: 'DSA Notes',
  tagline: 'Clean & Clear Data Structures and Algorithms Notes',
  url: 'https://Kalyxon.github.io',
  baseUrl: '/', // Change to '/' if deploying to root domain (e.g. Vercel/Netlify)
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  organizationName: 'Kalyxon', // Usually your GitHub username
  projectName: 'my-dsa-notes',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Makes docs the home page
          editUrl: 'https://github.com/Kalyxon/my-dsa-notes/tree/main/',
        },
        blog: false, // We don't need a blog
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
      hideOnScroll: false,
      title: 'DSA Notes',
      logo: {
        alt: 'GitHub Logo',
        src: 'img/logo.png',
      },
      items: [
        { to: '/intro', label: 'Home', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Kalyxon DSA Notes`,
    },
    prism: {
      theme: themes.github,      // Light mode code theme
      darkTheme: themes.dracula, // Dark mode code theme (very colorful and nice)
      additionalLanguages: ['cpp', 'java', 'python', 'bash'], // Add more if needed
    },
  },
};
