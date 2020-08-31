import Vue from "vue";
import Cookies from "../../utils/Cookies";
const {axiosInstance} = require("../axios");
const axios = axiosInstance;
Vue.prototype.$http = axios;


const uni = {
    namespaced: true,
    state: {
        registered: null,
        coordinadores: [],
        facultades: [],
        editCoordinador: {
            id_coord: "",
            nombre: "",
            apellido: "",
            cargo: "",
            facultadID: ""
        },

    },
    getters: {
        getCoordinadores(state) {
            return state.coordinadores;
        },
        getOneCoordinador(state) {
            return state.editCoordinador;
        },
        getFacultades(state) {
            return state.facultades;
        }
    },
    mutations: {
        // UNIVERSIDADES
        getCoordinadores(state, coordinadores) {
            state.coordinadores = coordinadores;
        },
        reloadUniversities(state, universities) {
            state.universities = universities;
        },
        deleteCoordinador(state, index) {
            if (index != -1) {
                state.coordinadores.splice(index, 1);
            }
        },

        getOneCoordinador(state, coordinador) {
            state.editCoordinador = {
                id_coord: coordinador._id,
                cargo: coordinador.cargo,
                facultadID: coordinador.facultadID
                //nombre_univ: coordinador.nombre,
                //historia: coordinador.apellido,
            };
        },
        getFacultades(state, facultades) {
            state.facultades = facultades;
        },
    },
    actions: {
        async getCoordinadores({ commit }) {
            const response = await axios.get('filter_universidad/getall_univcoordinador_populate', {
                headers: {
                    'token': Cookies.read("token")
                }
            })
            const unis = response.data;
            commit('getCoordinadores', unis);
        },
        getOneCoordinador({ commit }, id) {
            let coorid = id;
            axios.get('coordinador/getone_coordinador/' + coorid)
                .then((res) => {
                    commit('getOneCoordinador', res.data)
                })
                .catch((err) => {
                    console.log(err);
                    alert("Ha ocurrido un error en la base de datos");
                })
        },

        deleteCoordinador({ commit }, deleteLoad) {
            let coorid = deleteLoad.id;
            let index = deleteLoad.index;
            axios.get('coordinador/delete_coordinador/' + coorid)
                .then(() => {
                    commit('deleteCoordinador', index)
                })
                .catch(() => {
                    alert("Ha ocurrido un error en la base de datos");
                })
        },
        registerUniversity({ commit }, payload) {
            commit('registerUniversity', payload);
        },

        async getFacultades({ commit }) {
            const response = await axios.get('filter_universidad/getall_univfacul', {
                headers: {
                    'token': Cookies.read("token")
                }
            })
            const facus = response.data;
            commit('getFacultades', facus);
        },
    }
};
export default uni;
