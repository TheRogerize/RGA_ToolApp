<template>
  <section class="main" style="min-height:100vh">
    <header class="header">
      <div class="welcome">
        <h2>¡Bienvenido, {{username}}!</h2>
      </div>
      <div class="date">
        <h3>{{currentDate}}</h3>
      </div>
    </header>

    <div class="grid-panel">
      <div class="task">
        <div class="task-header">
          <h2>Tareas creadas</h2>
          <h5>Fecha limite</h5>
        </div>
        <span v-show="allTareas && allTareas.length">
          <div class="task-body" v-for="(tarea, index) in allTareas.slice(0,3)" :key="index">
            <img src="../../assets/images/img1.jpg" />
            <div class="contenido">
              <h4>{{tarea.titulo_tarea}}</h4>
              <small>{{tarea.descripcion}}</small>
            </div>
            <small>{{tarea.fecha_entrega | moment("DD-MM-YYYY")}}</small>
          </div>
          <div class="task-link">
            <router-link to="cursos">
              <h5>Ver más tareas</h5>
            </router-link>
          </div>
        </span>
        <span v-show="allTareas && !allTareas.length">
          <div class="task-body">
            <h5 class="text-center">Aún no has creado ninguna tarea</h5>
          </div>
        </span>
      </div>
    </div>

    <div class="title-courses">
      <h2>Cursos de formación</h2>
    </div>
    <div v-if="!loading">
      <div class="grid-courses" v-if="classrooms.length">
        <div to="curso/" v-for="(curso, indexCurso) in classrooms" :key="indexCurso">
          <router-link :to="permisoState+'curso/'+curso._id">
            <div class="card">
              <img src="../../assets/images/img1.jpg" />
              <div class="card-contenido">
                <h4>{{curso.nombre_aula}}</h4>
                <small>{{curso.seccion}}</small>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div style="min-width:100%;" v-else>
        <h2>Aún no formas parte de ningún curso de formación.</h2>
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
      loading: true,
      permisoState: "",
      sideBar: false,
      currentDate: new Date().toLocaleString(),
      allTareas: [],
    };
  },
  async mounted() {
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("prof/getClassrooms");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  created() {
    this.$store.dispatch("classroom/getAllTareas");
  },

  computed: {
    ...mapGetters({
      permiso: "user/getPermiso",
      userID: "user/getID",
      isLoggedIn: "user/isLoggedIn",
      userInfo: "user/getUserInfo",
      getAllTareas: "classroom/getAllTareas",
      permiso: "user/getPermiso",
      classes: "prof/getClassrooms",
    }),
  },
  watch: {
    classes: {
      handler(info) {
        if (info) {
          this.classrooms = info;
        }
      },
      immediate: true,
    },
    getAllTareas: {
      handler(allTareas) {
        if (allTareas) {
          this.allTareas = allTareas;
        }
      },
      immediate: true,
    },
    permiso: {
      handler(perm) {
        if (perm) {
          if (perm == 4) {
            this.permisoState = "student/";
          }
        }
      },
      immediate: true,
    },
    userInfo: {
      handler(userInfo) {
        if (userInfo) {
          this.myInfo = userInfo;
          if (this.permiso == 0) {
            this.username = userInfo.nombre;
          } else if (this.permiso == 1) {
            this.username = userInfo.nombre_univ;
          } else if (
            this.permiso == 2 ||
            this.permiso == 3 ||
            this.permiso == 4
          ) {
            if (userInfo.userID) {
              this.username = userInfo.userID.nombre;
            }
          }
        }
      },
      immediate: true,
    },
  },
  methods: {},
  components: {
    Modal,
    Tabs,
    TabPane,
    Universities,
    Teachers,
  },
};
</script>

<style scoped>
</style>
  
