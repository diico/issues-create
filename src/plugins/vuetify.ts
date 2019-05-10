import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import pt from 'vuetify/src/locale/pt';

Vue.use(Vuetify, {
  options: {
    customProperties: true,
  },
  iconfont: 'fa',
  lang: {
    locales: { pt },
    current: 'pt',
  },
});
