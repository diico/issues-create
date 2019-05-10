import Vue from 'vue';
import { ActionTree } from 'vuex';
import {
  RootState,
  LOAD_ISSUES,
  SET_ISSUE,
  IS_LOADING,
  Issue,
} from './types';

const actions: ActionTree<RootState, RootState> = {
  /**
   * Load issues.
   * @param context
   * @param params
   */
  loadIssues({ commit }, params = {}): any {
    commit(LOAD_ISSUES, []);
    commit(IS_LOADING, true);

    Vue.remoteIssues.listIssues({
      ...params,
      per_page: 1000,
    }, (err: any, issues: Array<Issue> = []): any => {
      commit(IS_LOADING, false);
      if (err || !Array.isArray(issues)) {
        commit(LOAD_ISSUES, []);
        return;
      }
      commit(LOAD_ISSUES, issues);
    });
  },

  /**
   * Load issue.
   * @param context
   * @param params
   */
  loadIssue({ commit }, params): any {
    commit(SET_ISSUE, {});
    commit(IS_LOADING, true);

    Vue.remoteIssues.getIssue(params, (err: any, issue: Issue): any => {
      if (err || !issue) {
        commit(SET_ISSUE, {});
        return;
      }

      issue.labels = issue.labels.map(label => label.name);

      commit(SET_ISSUE, issue);
      commit(IS_LOADING, false);
    });
  },

  /**
   * Unlock issue.
   * @param context
   * @param params
   */
  unlockIssue({ commit }, issue): any {
    commit(IS_LOADING, true);

    return new Promise((resolve, reject) => {
      Vue.remoteIssues._request(
        'DELETE',
        `/repos/diico/issues-create/issues/${issue.number}/lock`,
      ).catch(() => { })
        .finally(() => {
          commit(IS_LOADING, false);
          commit(SET_ISSUE, issue);
          resolve();
        });
    });
  },

  /**
   * Unlock issue.
   * @param context
   * @param params
   */
  lockIssue({ commit }, issue): any {
    commit(IS_LOADING, true);

    return new Promise((resolve, reject) => {
      Vue.remoteIssues._request(
        'PUT',
        `/repos/diico/issues-create/issues/${issue.number}/lock`,
        { locked: true, active_lock_reason: 'off-topic' },
      ).catch(() => { })
        .finally(() => {
          commit(IS_LOADING, false);
          commit(SET_ISSUE, issue);
          resolve();
        });
    });
  },

  /**
   * Create issue.
   * @param context
   * @param params
   */
  createIssue({ commit }, issue): any {
    commit(IS_LOADING, true);

    return Vue.remoteIssues.createIssue(issue, (err: any, issueEdited: Issue): any => {
      commit(IS_LOADING, false);
    });
  },

  /**
   * Edit issue.
   * @param context
   * @param params
   */
  editIssue({ commit }, issue): any {
    commit(IS_LOADING, true);

    return Vue.remoteIssues.editIssue(issue.number, issue, (err: any, issueEdited: Issue): any => {
      commit(IS_LOADING, false);
    });
  },

};

export default actions;
