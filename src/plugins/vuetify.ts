import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#10ac84',
            secondary: '#2f3136',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
          dark: {
            primary: '#10ac84',
            secondary: '#2f3136',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
});
