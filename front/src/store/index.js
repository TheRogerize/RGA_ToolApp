import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import VueResource from "vue-resource";
import Vuelidate from "vuelidate";
import admin from "./admin/admin";
import univ from "./universidad/universidad";
import coord from "./coordinador/coordinador";
import user from "./user/user";
import chat from "./chat/chat";
import classroom from "./classroom/classroom";
import prof from "./profesor/profesor";
const axios = require("./axios");

Vue.use(Vuex);
Vue.use(axios, VueAxios, VueResource);
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

export default new Vuex.Store({
  modules: {
    admin,
    univ,
    coord,
    chat,
    classroom,
    prof
  },
});
