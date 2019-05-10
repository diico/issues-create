
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './store/types';
import rootModule from './store/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = rootModule;

// @ts-ignore
export default new Vuex.Store<RootState>(store);
