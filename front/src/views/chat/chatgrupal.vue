<template>
  <section class="main" style="min-height:100vh">
    <header class="header">
      <div class="welcome">
        <h3>Chat grupal</h3>
      </div>
      <div class="date"></div>
    </header>
    <div class="groupchat">
      <div class="chatContainer">
        <div class="chatLists">
          <div class="list">
            <h3>Grupos</h3>
            <div class="listRow">
              <img src="../../assets/images/img1.jpg" />
              <p>Tecnias de superviencias dak dwlad</p>
            </div>
            <div class="listRow">
              <img src="../../assets/images/img1.jpg" />
              <p>Tecnias de superviencias dak dwlad</p>
            </div>
          </div>
        </div>
        <div class="chatContent">
          <div class="header">
            <img src="../../assets/images/img1.jpg" />
            <div class="mensajeDiv">
              <h3>Tecnicas de eteve II</h3>
              <p>
                RGA ID #
                <small>3132</small>
              </p>
            </div>
          </div>
          <div class="chat">
            <ul>
              <li>
                <h3>Guido Martinez</h3>ad sadwadaaw das awadawad ad ad adad ad a wdd awa dawd d awda
                <br />a wda
              </li>
            </ul>
          </div>
          <div class="mensaje">
            <input type="text" placeholder="Escribe tu mensaje ..." />
            <a>
              <i class="fa fa-play"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  email,
  numeric,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import { eventBus } from "../../main";
import Modal from "@/components/Modal.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import Universities from "@/views/admin/adminIncludes/universities.vue";
import Teachers from "@/views/admin/adminIncludes/teachers.vue";

export default {
  components: {
    Modal,
    Tabs,
    TabPane,
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 10px;
}
</style>