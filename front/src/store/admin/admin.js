import Vue from "vue";
const {axiosInstance} = require("../axios");
const axios = axiosInstance;
Vue.prototype.$http = axios;

const admin = {
    namespaced: true,
    state: {
        registered: null,
        universities: [],
        teachers: null,
        editUniversity: {
            id_univ: "",
            nombre_univ: "",
            historia: "",
            mision: "",
            vision: "",
            metas: ""
        },
     
    },
    getters: {
        getUniversities(state) {
            return state.universities;
        },
        getOneUniversity(state) {
            return state.editUniversity;
        },

    },
    mutations: {
        // UNIVERSIDADES
        getUniversities(state, universities) {
            state.universities = universities;
        },
        reloadUniversities(state, universities) {
            state.universities = universities;
        },
        deleteUniversity(state, index) {
            if(index != -1) {
                state.universities.splice(index, 1);
            }
        },

        getOneUniversity(state, university) {
            state.editUniversity = {
                id_univ: university._id,
                nombre_univ: university.nombre_univ,
                historia: university.historia,
                mision: university.mision,
                vision: university.vision,
                metas: university.metas
            };
        },
    },
    actions: {

        // UNIVERSIDADES
        async getUniversities ({ commit }) {
          const response = await axios.get('universidad/univ_popu')
          const unis = response.data;
          commit('getUniversities', unis);
        },

        getOneUniversity ({commit}, id) {
            let univid = id;
                axios.get('universidad/getone_universidad/'+univid)
              .then((res) => {              
                  commit('getOneUniversity', res.data)
              })
              .catch((err) => {
                  console.log(err);
                  alert("Ha ocurrido un error en la base de datos");
              })
          },

        deleteUniversity ({commit}, deleteLoad) {
            let univid = deleteLoad.id;
            let index = deleteLoad.index;
                axios.get('universidad/delete_universidad/'+univid)
              .then(() => {              
                  commit('deleteUniversity', index)
              })
              .catch(() => {
                  alert("Ha ocurrido un error en la base de datos");
              })
          },
        registerUniversity({ commit}, payload) {
            commit('registerUniversity', payload);
        },
    }
};
export default admin;
