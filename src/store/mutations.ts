/* eslint no-param-reassign: ["error", { "props": false }] */
import { MutationTree } from 'vuex';
import {
  RootState,
  LOAD_ISSUES,
  SET_ISSUE,
  IS_LOADING,
} from './types';

const mutations: MutationTree<RootState> = {
  /**
   * Set issues.
   * @param state
   * @param payload
   */
  [LOAD_ISSUES](state, payload) {
    state.issues = payload;
  },

  /**
   * Set issue.
   * @param state
   * @param payload
   */
  [SET_ISSUE](state, payload) {
    state.issue = payload;
  },

  /**
   * Set loading.
   * @param state
   * @param payload
   */
  [IS_LOADING](state, payload) {
    state.loading = payload;
  },

};

export default mutations;
