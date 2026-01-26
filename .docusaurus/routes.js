import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '2bc'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'fd1'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'd72'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '06e'),
            routes: [
              {
                path: '/arrays',
                component: ComponentCreator('/arrays', '98e'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/exercises',
                component: ComponentCreator('/exercises', 'ae4'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/graphs',
                component: ComponentCreator('/graphs', '3e6'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/hash-tables',
                component: ComponentCreator('/hash-tables', '77c'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/intro',
                component: ComponentCreator('/intro', '5b0'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/linked-list',
                component: ComponentCreator('/linked-list', '9e0'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/maximum-flow',
                component: ComponentCreator('/maximum-flow', '484'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/minimum-spanning-tree',
                component: ComponentCreator('/minimum-spanning-tree', 'd27'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/shortest-path',
                component: ComponentCreator('/shortest-path', '0ec'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/stacks-queues',
                component: ComponentCreator('/stacks-queues', '720'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/time-complexity',
                component: ComponentCreator('/time-complexity', 'b1b'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/trees',
                component: ComponentCreator('/trees', '0ce'),
                exact: true,
                sidebar: "dsa"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
