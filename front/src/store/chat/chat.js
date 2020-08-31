import Vue from "vue";
import Cookies from '../../utils/Cookies'
const {axiosInstance} = require("../axios");
const axios = axiosInstance;
Vue.prototype.$http = axios;


const chat = {
    namespaced: true,
    state: {
        room_list: '',
        act_room:'',
        messages: []
    },
    getters: {
     
        users: state => state.users,
        getRooms(state) {
            return state.room_list;
        },
        getRoomData(state) {
            return state.act_room;
        },
        channel_list(state){
            return state.room_list
        },
    },
    mutations: {
        getChanne_list(state, room_list) {
            state.room_list = room_list
        },
        addmessages(state, message) {
            state.messages.push(message)
        },
        clearmessages(state) {
            state.messages = []
        },
        getRoomData(state, room_msg){
            state.act_room = room_msg
        },
        socket_msg(state, msg){
           state.act_room.class_chat = state.act_room.class_chat.concat(msg)
        }
    },
    actions: {
    
        getChanne_list ({commit}) {
            axios.get("alumno/get_alumno_room",
                        {headers: {'token': Cookies.read("token")}
            })
            .then((response) => {
              commit('getChanne_list', response.data.aulasID) 
            })
            .catch((errors) => {
              console.log(errors);
            })
        },
        getRoomData({commit}, payload){
            axios.get("classroom/getChat/"+payload)
            .then((response) => {
                commit("getRoomData",response.data)
            })
            .catch((errors) => {
                console.log(errors)
            })
        },
        socket_msg({commit}, payload) {
            commit('socket_msg', payload)
        },
        clearnthemessages(context) {
            context.commit('clearmessages')
        },
        left_message(context) {
            context.commit('addmessages', message)
        }
    }
};
export default chat;
