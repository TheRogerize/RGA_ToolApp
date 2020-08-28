import Vue from "vue";
import Cookies from "../../utils/Cookies";
Vue.prototype.$http = axios;
const axios = require('../axios');


const coord = {
    namespaced: true,
    state: {
        registered: null,
        profesores: [],
        editProfesor: {
            id_prof: "",
            cargo: "",
            carnet: ""
        },
        editCont: {
            id_cont: "",
            nombre_plantilla: "",
            unidad: ""
        },
        classrooms: [],
        cursos: []

    },
    getters: {
        getProfesores(state) {
            return state.profesores;
        },
        getOneProfesor(state) {
            return state.editProfesor;
        },
        getOneContenido(state) {
            return state.editCont;
        },
        getClassrooms(state) {
            return state.classrooms;
        },
        getCursos(state) {
            return state.cursos;
        },
    },
    mutations: {
        // UNIVERSIDADES
        getProfesores(state, profesores) {
            state.profesores = profesores;
        },

        deleteProfesor(state, index) {
            if (index != -1) {
                state.profesores.splice(index, 1);
            }
        },
        deleteContenido(state, index) {
            if (index != -1) {
                state.contenidos.splice(index, 1);
            }
        },
        getOneProfesor(state, profesor) {
            state.editProfesor = {
                id_prof: profesor._id,
                cargo: profesor.cargo,
                carnet: profesor.carnet
            };
            console.log(state.editProfesor);
        },
        getClassrooms(state, classrooms) {
            state.classrooms = classrooms;
        },
        getOneContenido(state, contenido) {
            state.editCont = {
                id_cont: contenido._id,
                nombre_plantilla: contenido.nombre_plantilla,
                unidad: contenido.unidad
            };
        },
        getCursos(state, cursos) {
            state.cursos = cursos;
        },

    },
    actions: {
        async getClassrooms({ commit }) {
            const token = Cookies.read("token");
            const response = await axios.get('filter_universidad/getall_univclassrooms', {
                headers: {
                    'token': token
                }
            })
            const classrooms = response.data;
            commit('getClassrooms', classrooms);
        },
        async getProfesores({ commit }) {
            const response = await axios.get('profesor/populate_profesor')
            const unis = response.data;
            commit('getProfesores', unis);
        },

        async getCursos({ commit }) {
            const response = await axios.get('classroom/getall_classroom')
            const cursos = response.data;
            commit('getCursos', cursos);
        },

        getOneProfesor({ commit }, id) {
            let profid = id;
            axios.get('profesor/getone_profesor/' + profid)
                .then((res) => {
                    commit('getOneProfesor', res.data)
                })
                .catch((err) => {
                    alert("Ha ocurrido un error en la base de datos");
                })
        },
        getOneContenido({ commit }, id) {
            let contid = id;
            axios.get('contenido/getone_contenido/' + contid)
                .then((res) => {
                    commit('getOneContenido', res.data)
                })
                .catch((err) => {
                    alert("Ha ocurrido un error en la base de datos");
                })
        },

        deleteProfesor({ commit }, deleteLoad) {
            let profid = deleteLoad.id;
            let index = deleteLoad.index;
            axios.get('profesor/delete_profesor/' + profid)
                .then(() => {
                    commit('deleteProfesor', index)
                })
                .catch(() => {
                    alert("Ha ocurrido un error en la base de datos");
                })
        },
        deleteContenido({ commit }, deleteLoad) {
            let contid = deleteLoad.id;
            let index = deleteLoad.index;
            axios.get('contenido/delete_contenido/' + contid)
                .then(() => {
                    commit('deleteContenido', index)
                })
                .catch((err) => {
                    console.log(err);
                    alert("Ha ocurrido un error en la base de datos");
                })
        },
    }
};
export default coord;
