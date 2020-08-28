<template>
  <section class="main" style="min-height:100vh">
    <header class="header">
      <div class="welcome">
        <h3>Mensajes</h3>
      </div>
      <div class="date"></div>
    </header>
    <div class="title-courses">
      <h2>Grupos de chat</h2>
      <div class="search-filter">
        <div class="search">
          <i class="fas fa-search"></i>
          <input type="search" class="form-control" placeholder="Buscar" />
        </div>
        <div class="search">
          <i class="fas fa-filter"></i>
          <input type="search" class="form-control" placeholder="Filtrar" />
        </div>
      </div>
    </div>
    <div class="grid-courses">
      <div class="card">
        <img src="../../assets/images/img1.jpg" />
        <div class="card-contenido">
          <a href="#" class="cursorDefault"></a>
          <h4>Técnicas de supervivencia ll</h4>
          <small>Oropeza :3</small>
        </div>
      </div>
      <div class="card">
        <img src="../../assets/images/img2.jpg" />
        <div class="card-contenido">
          <a href="#" class="cursorDefault"></a>
          <h4>Teoria del Tuco, del Tusuri y Marcelo</h4>
          <small>Ana Beberaggi</small>
        </div>
      </div>
      <div class="card">
        <img src="../../assets/images/img3.jpg" />
        <div class="card-contenido">
          <a href="#" class="cursorDefault"></a>
          <h4>La Rosalía</h4>
          <small>La Rosalía</small>
        </div>
      </div>
      <div class="card">
        <img src="../../assets/images/img4.jpg" />
        <div class="card-contenido">
          <a href="#" class="cursorDefault"></a>
          <h4>Relatos jocosos pero asombrosamente reales l</h4>
          <small>Guido Martinez</small>
        </div>
      </div>
    </div>
    <h2 style="text-align:center;padding-top:20px;">
      <router-link to="/chat/salas" class="nav-link">Entrar a lobby de salas Router</router-link>
      <a href="/chat/salas">Entrar a lobby de salas href</a>
    </h2>
    <div class="title-courses">
      <div class="textCont">
        <h2>Chats personales</h2>
        <br />
        <p>Comparte tus ideas con tus compañeros de clase</p>
      </div>
    </div>
    <div class="mensajesPersonales">
      <div class="mensajeRow">
        <img src="../../assets/images/img1.jpg" />
        <div class="mensajeDiv">
          <h3>Guido-sama</h3>
          <p>Eteveee ev eve ve ev e</p>
        </div>
      </div>
      <div class="mensajeRow">
        <img src="../../assets/images/img1.jpg" />
        <div class="mensajeDiv">
          <h3>Guido-sama</h3>
          <p>Eteveee ev eve ve ev e</p>
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
import axios from "axios";
import Universities from "@/views/admin/adminIncludes/universities.vue";
import Teachers from "@/views/admin/adminIncludes/teachers.vue";

export default {
  data() {
    return {
      isActive: true,
      activeClass: "active",
      deactivateClass: "deactivate",
      sideBar: false,
    };
  },

  methods: {},
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