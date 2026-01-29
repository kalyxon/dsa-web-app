// docusaurus.config.js
const { themes } = require('prism-react-renderer');

module.exports = {
  title: 'DSA',
  tagline: 'Clean & Focused Data Structures and Algorithms Notes',
  url: 'https://kalyxon.github.io',
  baseUrl: '/markdown-web-app/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  favicon: 'img/favicon.ico',

  organizationName: 'kalyxon',
  projectName: 'markdown-web-app',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',           // docs become root
          editUrl: 'https://github.com/kalyxon/markdown-web-app/tree/main/',
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
      title: 'DSA',
      logo: {
        alt: 'DSA Logo',
        src: 'img/logo.png',
        href: '/intro',                // fix blank page when clicking logo
      },
      items: [
        { to: '/intro', label: 'Home', position: 'left' },
      ],
      hideOnScroll: false,
    },

    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Kalyxon`,
    },

    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ['cpp', 'java', 'python', 'bash'],
    },
  },
};
