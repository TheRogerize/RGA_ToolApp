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

    <div class="grid-panel" style="grid-template-columns: 75% auto;">
      <div class="task">
        <div class="task-header">
          <h2>Tareas pendientes</h2>
          <h5>Estado</h5>
          <h5>Fecha limite</h5>
        </div>
        <span v-show="allTareas && allTareas.length">
          <div class="task-body" v-for="(tarea, index) in allTareas.slice(0,3)" :key="index">
            <img src="../../assets/images/img1.jpg" />
            <div class="contenido">
              <h4 style="max-width:200px;">{{tarea.titulo_tarea}}</h4>
            </div>
            <a
              class="entregada statusButtons"
              style="color: #64d664"
              v-if="!checkTarea(tarea.entregados)"
            >Entregada</a>
            <a class="pendiente statusButtons" v-else>Pendiente</a>
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
            <h5 class="text-center">Aún no existen tareas</h5>
          </div>
        </span>
      </div>
    </div>

    <div class="title-courses">
      <h2>Cursos cursados actualmente</h2>
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
      usuarioID: "",
      loading: true,
      permisoState: "",
      sideBar: false,
      allTareas: [],
      classrooms: [],
      currentDate: new Date().toLocaleString(),
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
      permiso: "user/getPermiso",
      classes: "prof/getClassrooms",
      userInfo: "user/getUserInfo",
      getAllTareas: "classroom/getAllTareas",
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
    userID: {
      handler(id) {
        if (id) {
          this.usuarioID = id;
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
  methods: {
    checkTarea(entregados) {
      let count = 0;
      entregados.forEach((entrega) => {
        if (entrega.user._id) {
          if (this.usuarioID == entrega.user._id) {
            count++;
          }
        }
      });
      if (count == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
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
  
