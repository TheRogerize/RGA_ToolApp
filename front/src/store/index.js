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
Vue.use(Vuex);
Vue.use(VueAxios, VueResource);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

export default new Vuex.Store({
  modules: {
    admin,
    univ,
    user,
    coord,
    chat,
    classroom,
    prof
  },
});
