import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-web-app/',
    component: ComponentCreator('/markdown-web-app/', 'ea7'),
    exact: true
  },
  {
    path: '/markdown-web-app/',
    component: ComponentCreator('/markdown-web-app/', '947'),
    routes: [
      {
        path: '/markdown-web-app/',
        component: ComponentCreator('/markdown-web-app/', 'e31'),
        routes: [
          {
            path: '/markdown-web-app/',
            component: ComponentCreator('/markdown-web-app/', '910'),
            routes: [
              {
                path: '/markdown-web-app/arrays',
                component: ComponentCreator('/markdown-web-app/arrays', '002'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/exercises',
                component: ComponentCreator('/markdown-web-app/exercises', 'ac9'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/graphs',
                component: ComponentCreator('/markdown-web-app/graphs', 'e5f'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/hash-tables',
                component: ComponentCreator('/markdown-web-app/hash-tables', 'c2d'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/intro',
                component: ComponentCreator('/markdown-web-app/intro', '433'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/linked-list',
                component: ComponentCreator('/markdown-web-app/linked-list', 'aba'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/maximum-flow',
                component: ComponentCreator('/markdown-web-app/maximum-flow', '5f3'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/minimum-spanning-tree',
                component: ComponentCreator('/markdown-web-app/minimum-spanning-tree', '20c'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/shortest-path',
                component: ComponentCreator('/markdown-web-app/shortest-path', 'ab7'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/stacks-queues',
                component: ComponentCreator('/markdown-web-app/stacks-queues', '2d9'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/time-complexity',
                component: ComponentCreator('/markdown-web-app/time-complexity', 'aaa'),
                exact: true,
                sidebar: "dsa"
              },
              {
                path: '/markdown-web-app/trees',
                component: ComponentCreator('/markdown-web-app/trees', 'da5'),
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
