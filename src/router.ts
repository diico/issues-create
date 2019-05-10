import Vue from 'vue';
import Router from 'vue-router';
import List from './views/List.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List,
    },
    {
      path: '/issue/:id?',
      name: 'form',
      component: () => import(/* webpackChunkName: "issue" */ './views/Form.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
