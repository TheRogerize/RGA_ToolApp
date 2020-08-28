import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import Argon from "./plugins/argon-kit";
import Vuelidate from "vuelidate";
import axios from "./store/axios";
import VueAxios from 'vue-axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import socket from './socket/index.js';
import circular from 'circular-json';
sync(store, router);
Vue.config.productionTip = false;

window.socket = socket
window.current_room = ""

Vue.use(circular);
Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios
  }
})
Vue.use(VueAwesomeSwiper);
Vue.use(require('vue-moment'));
Vue.use(Argon, VueAxios, axios, Vuelidate);
Vue.prototype.$http = axios;
export const eventBus = new Vue ({
  data: {
    toggleData: false
  },
  methods: {
    toggleState(toggle) {
      this.$emit('toggleState', toggle);
    }
  }
});


router.beforeEach((to, from, next) => { 
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters['user/isLoggedIn']) {
      next({
        name: 'login'
      })
    } 
    else {
      next();
    } 
  }
    else if(to.matched.some(record => record.meta.requiresVisitor)) {
      if(store.getters['user/isLoggedIn']) {
        next({
          path: '/dashboard',
        })
      } else {
        next();
      }
    }
    else if(to.matched.some(record => record.meta.requiresAdmin)) {
      if(!store.getters['user/isLoggedIn']) {
        next({
          path: '/login',
        })
      } else if(store.getters['user/isLoggedIn'] && store.getters['user/permiso'] != 0) {
        next({
          path: '/dashboard',
        })
      }
       else {
        next();
      }
    }
    else if(to.matched.some(record => record.meta.requiresUni)) {
      if(!store.getters['user/isLoggedIn']) {
        next({
          path: '/login',
        })
      } else if(store.getters['user/isLoggedIn'] && store.getters['user/permiso'] != 1) {
        next({
          path: '/dashboard',
        })
      }
       else {
        next();
      }
    }
    else if(to.matched.some(record => record.meta.requiresCoord)) {
      if(!store.getters['user/isLoggedIn']) {
        next({
          path: '/login',
        })
      } else if(store.getters['user/isLoggedIn'] && store.getters['user/permiso'] != 2) {
        next({
          path: '/dashboard',
        })
      }
       else {
        next();
      }
    }
    else if(to.matched.some(record => record.meta.requiresTeacher)) {
      if(!store.getters['user/isLoggedIn']) {
        next({
          path: '/login',
        })
      } else if(store.getters['user/isLoggedIn'] && store.getters['user/permiso'] != 3) {
        next({
          path: '/dashboard',
        })
      }
       else {
        next();
      }
    }
    else if(to.matched.some(record => record.meta.requiresStudent)) {
      if(!store.getters['user/isLoggedIn']) {
        next({
          path: '/login',
        })
      } else if(store.getters['user/isLoggedIn'] && store.getters['user/permiso'] != 4) {
        next({
          path: '/dashboard',
        })
      }
       else {
        next();
      }
    }
    else {
      next();
    }
});

new Vue({
  router,
  store,
  axios,
  validations: {},
  render: h => h(App)
}).$mount("#app");

