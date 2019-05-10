import { GetterTree } from 'vuex';
import { RootState, Issue } from './types';

const getters: GetterTree<RootState, RootState> = {
  loading(state): boolean {
    return state.loading;
  },

  issues(state): Array<Issue> {
    return state.issues;
  },

  issue(state): Issue|null {
    return state.issue;
  },

};

export default getters;
