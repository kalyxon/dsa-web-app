// sidebars.js
module.exports = {
  dsa: [
    'intro',

    {
      type: 'category',
      label: 'Data Structures',
      collapsed: false,
      items: [
        'arrays',
        'linked-list',
        'stacks-queues',
        'hash-tables',
        'trees',
        'graphs',
      ],
    },

    {
      type: 'category',
      label: 'Algorithms',
      collapsed: false,
      items: [
        'time-complexity',
        'minimum-spanning-tree',
        'maximum-flow',
        'shortest-path',
      ],
    },

    {
      type: 'category',
      label: 'Reference & Practice',
      items: ['exercises'],
    },
  ],
};