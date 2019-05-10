import { expect } from 'chai';
import { shallowMount, createLocalVue, config } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import pt from 'vuetify/src/locale/pt';

config.silent = false;

describe('App.vue', () => {
  let wrapper:any;

  const router = new VueRouter();

  beforeEach(() => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);
    localVue.use(Vuetify, {
      options: {
        customProperties: true,
      },
      iconfont: 'fa',
      lang: {
        locales: { pt },
        current: 'pt',
      },
    });

    wrapper = shallowMount(App, {
      localVue,
      router,
    });
  });

  it('Verifica se o app foi renderizado', () => {
    expect(wrapper.find('#app').exists()).to.be.equal(true);
  });
});
