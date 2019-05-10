import Vue from 'vue';

const GitHub = require('github-api');

const github = new GitHub({
  token: 'ee45e98d8699e875b31597c6b1a8a4744e2702c5',
});

const remoteIssues = github.getIssues('diico', 'issues-create');

// eslint-disable-next-line no-shadow
Plugin.install = function install(Vue, options) {
  // eslint-disable-next-line no-param-reassign
  Vue.remoteIssues = remoteIssues;
  Object.defineProperties(Vue.prototype, {
    remoteIssues: {
      get() {
        return remoteIssues;
      },
    },
    $remoteIssues: {
      get() {
        return remoteIssues;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
