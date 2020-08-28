<template>
  <section class="adminDashboard">
    <div class="menu" @click="open">Menu</div>
    <div class="cardCounts">
      <div class="card">
        <div class="color shadowRed">
          <div class="cardNumberPosition">
            <div class="cardNumber" v-if="profesores.length">{{profesores.length}}</div>
            <div class="cardNumber" v-else>0</div>
          </div>
        </div>
        <p>Registrados</p>
        <h1>Profesores</h1>
      </div>
      <div class="card">
        <div class="color shadowBlue">
          <div class="cardNumberPosition">
            <div class="cardNumber" v-if="contenidos.length">{{contenidos.length}}</div>
            <div class="cardNumber" v-else>0</div>
          </div>
        </div>
        <p>Agregados</p>
        <h1>Contenidos</h1>
      </div>
      <div class="card">
        <div class="color shadowPurple">
          <div class="cardNumberPosition">
            <div class="cardNumber" v-if="cursos.length">{{cursos.length}}</div>
            <div class="cardNumber" v-else>0</div>
          </div>
        </div>
        <p>Creados</p>
        <h1>Cursos</h1>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-12 mt-5 mt-lg-0">
        <tabs fill class="flex-column flex-md-row">
          <card shadow>
            <tab-pane title="Profesores">
              <profesores></profesores>
            </tab-pane>

            <tab-pane title="Plantillas de Contenido">
              <contenidos></contenidos>
            </tab-pane>

            <tab-pane title="Cursos">
              <cursos></cursos>
            </tab-pane>
          </card>
        </tabs>
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
import axios from "axios";
import { mapState } from "vuex";
import { eventBus } from "../../main";
import Modal from "@/components/Modal.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import profesores from "@/views/coordinador/panelIncludes/Profesores.vue";
import contenidos from "@/views/coordinador/panelIncludes/Contenidos.vue";
import cursos from "@/views/coordinador/panelIncludes/Cursos.vue";

export default {
  data() {
    return {
      sideBar: false,
    };
  },
  computed: {
    profesores() {
      let profesores = this.$store.getters["coord/getProfesores"];
      return profesores;
    },
    contenidos() {
      let contenidos = this.$store.getters["coord/getContenidos"];
      return contenidos;
    },
    cursos() {
      let cursos = this.$store.getters["coord/getCursos"];
      return cursos;
    },
  },

  methods: {
    open() {
      this.sideBar = !this.sideBar;
      eventBus.toggleState(this.sideBar);
    },
  },
  components: {
    Modal,
    Tabs,
    TabPane,
    profesores,
    contenidos,
    cursos,
  },
};
</script>

<style scoped>
.field {
  max-height: 40px;
}
</style>
  
