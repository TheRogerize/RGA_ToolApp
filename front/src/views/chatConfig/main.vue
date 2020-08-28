<template>
  <section class="main">
    <header class="header">
      <div class="welcome">
        <h3>Chat grupal</h3>
      </div>
      <div class="date"></div>
    </header>
    <div class="groupchat" v-if="roomdata">
      <div class="chatContainer">
        <div class="chatLists">
          <div class="list" style="width:100%;">
            <h3 @click="grupos">Grupos</h3>
            <ChannelList :list="roomdata.rooms" :active="roomdata.current_room"></ChannelList>
            <div v-for="room in roomdata" :key="room._id" v-on:click="chooseRoom(room._id)">
              <p>{{room.nombre_aula}} - {{room._id}}</p>
            </div>
          </div>
          <div class="list" style="width:100%;">
            <h3 @click="users">Conectados</h3>
            <userList :users="roomdata.users"></userList>
          </div>
        </div>
        <div class="chatContent">
          <div class="header">
            <img src="../../assets/images/img1.jpg" />
            <div class="mensajeDiv">
              <h3>{{user_messages.nombre_aula}} - Seccion</h3>

              <p>
                RGA ID #
                <small>3132</small>
              </p>
            </div>
          </div>
          <chatbody :messages="user_messages.class_chat"></chatbody>

          <div class="mensaje">
            <input type="textarea" v-model="chat_block" placeholder="Escribe tu mensaje ..." />
            <a v-on:click="send">
              <i class="fa fa-play"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Cargando chats</div>
  </section>
</template>
<script>
import ChannelList from "./Channel_list";
import userList from "./User_list";
import settings from "./Settings";
import chatbody from "./chat_body";
import { mapGetters } from "vuex";

import store from "../../store";
import io from "socket.io-client";
//
import axios from "axios";
import Cookies from "../../utils/Cookies";

export default {
  components: {
    ChannelList,
    userList,
    settings,
    chatbody,
  },
  data() {
    return {
      chat_block: "sdsd",
      roomdata2: "",
      roomchat: "",
      active_room: "",
    };
  },
  computed: {
    ...mapGetters({ roomdata: "chat/channel_list" }),
    ...mapGetters({ user_messages: "chat/getRoomData" }),
  },
  watch: {
    roomdata: {
      handler(newVal) {
        if (newVal) {
        }
      },
      immediate: true,
    },
    user_messages: {
      handler(newmessagesVal) {
        if (newmessagesVal) {
        }
      },
      immediate: true,
    },
  },

  methods: {
    grupos() {},
    grupo() {},
    users() {},
    send() {
      let data = {
        roomid: this.user_messages._id,
        msg: this.chat_block,
      };
      axios
        .post("http://localhost:3000/api/classroom/add_msg/", data, {
          headers: {
            token: Cookies.read("token"),
          },
        })
        .then(() => {})
        .catch((errors) => {
          console.log(errors);
        });
    },

    chooseRoom(newroom) {
      this.$store.dispatch("chat/getRoomData", newroom);
    },
  },
  created() {
    socket.emit("chat_connect");
    socket.on("socket_test", (data) => {
      this.$store.dispatch("chat/socket_msg", data);
    });
    this.$store.dispatch("chat/getChanne_list");
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");

#app {
  font-family: "Nunito", sans-serif;
  height: 100vh;
}

.channel_header {
  padding: 10px;
  background: #409eff;
  height: auto !important;
  color: #fff;
  display: flex;
  align-items: center;
  display: table-cell;

  h1 {
    padding: 10px 0px;
  }

  * {
    padding: 0px;
    margin: 0px;
  }
}

body {
  margin: 0px;
  height: 100vh;
  overflow: hidden;
}

.massege_container {
  padding: 10px 0px 10px 0px !important;
  height: calc(100vh - 120px);
}

.control_area {
  background: #d9e9ff;
  color: #303133;
  overflow-y: scroll !important;
  height: 100vh;
}

.chat-input {
  margin-right: 10px;
}

.el-footer {
  padding: 10px !important;
}

.footer {
  position: absolute;
  bottom: 0px;
  width: calc(100% - 200px);
  background: #eee;
  height: auto !important;
}

.chat_body {
  height: calc(100% - 74px);
  overflow-y: scroll;
}
</style>