import Vue from "vue";
import router from "../../router";
import axios from "axios";
import Cookies from "../../utils/Cookies";
Vue.prototype.$http = axios;

axios.defaults.baseURL = "http://localhost:3000/api/";

const user = {
  namespaced: true,
  state: {
    user: null,
    userData: {},
    userInfo: {},
    cursos: [],
    componentSide: 0,
    isLoggedIn: Cookies.read("token"),
    permiso: Cookies.read("nivel_usuario"),
    userID: Cookies.read("userID"),

  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    },
    permiso: state => {
      return state.permiso;
    },
    componentSide: state => {
      return state.componentSide;
    },
    getPermiso: state => {
      return state.permiso;
    },
    getID: state => {
      return state.userID;
    },
    getUserInfo: state => {
      return state.userInfo;
    },
    getCursosUni: state => {
      return state.cursos;
    }
  },
  mutations: {
    LOGIN: (state, user) => Vue.set(state, "user", user),

    LOGIN_SUCCESS(state, payload) {
      state.isLoggedIn = true;
      Cookies.create("token", payload.token, null);
      const cookie = Cookies.read("token");
      router.push("/dashboard");
    },

    PERMISO(state, payload) {
      Cookies.create("nivel_usuario", payload.permiso, null);
      const nivelUsuario = Cookies.read("nivel_usuario");
      state.permiso = payload.permiso;
      Vue.set(state.userData, 'name', "ETEEVEEE");

    },
    ID(state, payload) {
      Cookies.create("userID", payload.id, null);
      const userID = Cookies.read("userID");
      state.id = payload.id;
    },

    USER_INFO(state, payload) {
      state.userInfo = payload;
    },

    LOGOUT(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.componentSide += 1;
      Cookies.remove('token');
      Cookies.remove('userID');
      Cookies.remove('nivel_usuario');
      router.push("/login");
      setTimeout(() => {
        location.reload();
      }, 500);
    },

    getUserData(state, userData) {
      state.userData = userData;
    },
    getCursosUni(state, classes) {
      state.cursos = classes;
    }
  },

  actions: {
    CREAR_PERMISO({ state, commit }, level) {
      commit('PERMISO', { state: state, permiso: level });
    },
    CREAR_ID({ state, commit }, id) {
      commit('ID', { state: state, id: id });
    },

    USER_INFO({ state, commit }, token) {
      axios.get('user/me', {
        headers: {
          'token': Cookies.read("token")
        }
      }
      )
        .then(response => {
          commit('USER_INFO', response.data);
        })
        .catch(error => {
          console.log('error:', error.response);
          if (error.response.data.message == "Invalid Token") {
            commit("LOGOUT");
          }
        });
    },

    LOGIN({ state, commit, rootState }, payload) {
      commit("LOGIN", payload);
      return new Promise(resolve => {
        setTimeout(() => {
          commit("LOGIN_SUCCESS", { state, token: payload });
          resolve();
        }, 1000);
      })
    },

    LOGOUT({ state, commit }) {
      commit("LOGOUT");
    },


    async getCursosUni({ commit }) {
      const response = await axios.get('classroom/getall_classroom')
      const classes = response.data;
      commit('getCursosUni', classes);
    },

  }
};
export default user;
