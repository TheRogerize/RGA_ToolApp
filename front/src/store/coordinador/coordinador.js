import Vue from "vue";
import axios from "axios";
import Cookies from "../../utils/Cookies";
Vue.prototype.$http = axios;

axios.defaults.baseURL = "http://localhost:3000/api/";

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
        singleProfesor: null,
        contenidos: [],
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
        getProfesorInfo(state) {
            return state.singleProfesor;
        },
        getOneContenido(state) {
            return state.editCont;
        },
        getContenidos(state) {
            return state.contenidos;
        },
        getCursos(state) {
            return state.cursos;
        },
        getClassrooms(state) {
            return state.classrooms;
        }
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
        deleteCurso(state, index) {
            if (index != -1) {
                state.classrooms.splice(index, 1);
            }
        },
        getOneProfesor(state, profesor) {
            state.editProfesor = {
                id_prof: profesor._id,
                cargo: profesor.cargo,
                carnet: profesor.carnet
            };
        },
        getProfesorInfo(state, profesor) {
            state.singleProfesor = profesor
        },
        getContenidos(state, contenidos) {
            state.contenidos = contenidos;
        },
        getOneContenido(state, contenido) {
            state.editCont = {
                id_cont: contenido._id,
                nombre_plantilla: contenido.nombre_plantilla,
                unidad: contenido.unidad
            };
        },
        getClassrooms(state, classrooms) {
            state.classrooms = classrooms;
        },
        getCursos(state, cursos) {
            state.cursos = cursos;
        },

    },
    actions: {
        async coordinadoresPDF({ commit }) {
            const token = Cookies.read("token");
            const response = await axios.get('reports/coordinadores_list', {
                responseType: 'blob',
                headers: {
                    'token': token
                }
            })
                .then(res => {
                    const pdfBlob = new Blob([res.data], { type: "application/pdf" })
                    const filename = "coordinadores-" + new Date().toISOString().slice(0, 10) + ".pdf";
                    const blobUrl = window.URL.createObjectURL(pdfBlob)
                    const link = document.createElement('a')
                    link.href = blobUrl
                    link.setAttribute('download', filename)
                    link.click();
                    link.remove();
                    URL.revokeObjectURL(blobUrl);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        async getClassrooms({ commit }) {
            const token = Cookies.read("token");
            const response = await axios.get('filter_universidad/getall_univclassrooms', {
                headers: {
                    'token': token
                }
            })
                .then(response => {
                    const classrooms = response.data;
                    commit('getClassrooms', classrooms);
                })
                .catch(err => {
                    console.log(err.response.data.message)

                })
        },
        async getContenidos({ commit }) {
            const token = Cookies.read("token");
            const response = await axios.get('filter_universidad/getall_univplantillas', {
                headers: {
                    'token': token
                }
            })
            const conts = response.data;
            commit('getContenidos', conts);
        },
        async getProfesores({ commit }) {
            const token = Cookies.read("token");
            const response = await axios.get('filter_universidad/getall_univprofesor_populate', {
                headers: {
                    'token': token
                }
            })
            const profs = response.data;
            commit('getProfesores', profs);
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
        getProfesorInfo({ commit }, id) {
            let profid = id;
            axios.get('profesor/populate_profesor/' + profid)
                .then((res) => {
                    commit('getProfesorInfo', res.data)
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
        deleteCurso({ dispatch, commit }, deleteLoad) {
            let classid = deleteLoad.id;
            let index = deleteLoad.index;
            axios.get('classroom/delete_classroom/' + classid)
                .then(() => {
                    commit('deleteCurso', index);
                })
                .catch((err) => {
                    console.log(err);
                    alert("Ha ocurrido un error en la base de datos");
                })
        },


    }
};
export default coord;
