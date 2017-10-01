import Vue from 'vue';
import Layout from './components/Layout.vue';

export const routes = [
  { path: '/', component: Layout, children: [
      // { path: '/', component: Name },
      // { path: '/portfolio', component: Portfolio },
      // { path: '/resume', component: Resume },
      // { path: '/weblog', component: Weblog }
    ]
  }
]
