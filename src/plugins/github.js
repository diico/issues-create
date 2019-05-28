import Vue from 'vue';

const GitHub = require('github-api');

const github = new GitHub({
  token: '',
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
