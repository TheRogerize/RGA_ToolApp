import Vue from "vue";
import Cookies from "../../utils/Cookies";
const axios = require('../axios');
Vue.prototype.$http = axios;

const coord = {
    namespaced: true,
    state: {
        registered: null,
        curso_info: null,
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
        contenidos: [],
        cursos: [],
        pendings: [],
        students: [],
        tareas: [],
        allTareas: [],
        profesor_info: null
    },
    getters: {
        getCursoInfo(state) {
            return state.curso_info;
        },
        getPendingUsers(state) {
            return state.pendings;
        },
        getOneProfesor(state) {
            return state.profesor_info;
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
        getTareas(state) {
            return state.tareas;
        },
        getAllTareas(state) {
            return state.allTareas;
        },
        getStudents(state) {
            return state.students;
        },
    },
    mutations: {
        getCursoInfo(state, curso) {
            state.curso_info = curso;
        },
        getPendingUsers(state, pendings) {
            state.pendings = pendings;
        },
        getTareas(state, tareas) {
            state.tareas = tareas;
        },
        getAllTareas(state, tareas) {
            state.allTareas = tareas;
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
        acceptPending(state, index) {
            if (index != -1) {
                state.pendings.pending_invitation.splice(index, 1);
            }
        },
        declinePending(state, index) {
            if (index != -1) {
                state.pendings.pending_invitation.splice(index, 1);
            }
        },
        deleteTarea(state, index) {
            if (index != -1) {
                state.tareas.splice(index, 1);
            }
        },
        deleteFile(state, indexes) {
        },
        getOneProfesor(state, profesor) {
            this.profesor_info = profesor;
        },
        getContenidos(state, contenidos) {
            state.contenidos = contenidos;
        },
        getStudents(state, students) {
            state.students = students;
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
        estudiantesPDF(state, cursos) {

        }

    },
    actions: {
        async getCursoInfo({ commit }, cursoID) {
            const response = await axios.get('classroom/getOne_classroom/' + cursoID)
            const info = response.data;
            commit('getCursoInfo', info);
        },
        async getPendingUsers({ commit }, roomid) {
            const response = await axios.get('classroom/pending_user_classroom/' + roomid)
            const info = response.data;
            commit('getPendingUsers', info);
        },
        async getTareas({ commit }, roomid) {
            const response = await axios.get('tareas/getall_tarea_classroom/' + roomid)
            const info = response.data;
            commit('getTareas', info);
        },
        async getAllTareas({ commit }, roomid) {
            const token = Cookies.read("token");
            const response = await axios.get('tareas/getall_user_tareas', {
                headers: {
                    'token': token
                }
            })
                .then(res => {
                    const info = res.data;
                    commit('getAllTareas', info);
                })
                .catch(err => {
                    console.log(err)
                })
        },
        async acceptPending({ dispatch, commit }, payload) {

            const response = await axios.get('classroom/accept_user/' + payload.roomid + '/' + payload.userid)
                .then(res => {
                    commit('acceptPending', payload.index);
                    dispatch('getStudents', payload.roomid);
                })
                .catch(err => {
                    alert(err);
                })
        },
        async estudiantesPDF({ dispatch, commit }, classroomID) {
            const response = await axios.get('reports/students_list/' + classroomID, { responseType: 'blob' })
                .then(res => {
                    const pdfBlob = new Blob([res.data], { type: "application/pdf" })
                    const filename = "alumnos-" + new Date().toISOString().slice(0, 10) + ".pdf";
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
        async declinePending({ dispatch, commit }, payload) {

            const response = await axios.get('classroom/decline_user/' + payload.roomid + '/' + payload.userid)
                .then(res => {
                    commit('declinePending', payload.index);
                })
                .catch(err => {
                    alert(err);
                })

        },
        async getStudents({ commit }, roomid) {
            const response = await axios.get('classroom/get_estudiantes/' + roomid)
            const est = response.data;
            commit('getStudents', est);
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
            axios.get('profesor/populate_profesor/' + profid)
                .then((res) => {
                    commit('getOneProfesor', res.data)
                })
                .catch((err) => {
                    alert("Ha ocurrido un error en la base de datos");
                })
        },
        getEntregas({ commit }, payload) {
            let tareaid = payload.tareaid;
            axios.get('tareas/populate_profesor/' + tareaid)
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
        deleteTarea({ commit }, deleteLoad) {
            let tareaid = deleteLoad.tareaid;
            let index = deleteLoad.index;
            axios.get('tareas/delete_tarea/' + tareaid)
                .then(() => {
                    commit('deleteTarea', index)
                })
                .catch(() => {
                    alert("Ha ocurrido un error en la base de datos");
                })
        },
        deleteFile({ dispatch, commit }, deleteLoad) {
            let indexes = {
                unidadIndex: deleteLoad.unidadIndex,
                temaIndex: deleteLoad.temaIndex,
                contenidoIndex: deleteLoad.contenidoIndex
            }
            axios.post('classroom/delete_archivo', deleteLoad)
                .then(() => {
                    dispatch('getCursoInfo', deleteLoad.classroomID);
                    commit('deleteFile', indexes)
                })
                .catch((err) => {
                    alert("Ha ocurrido un error en la base de datos");
                })
        },


    }
};
export default coord;
