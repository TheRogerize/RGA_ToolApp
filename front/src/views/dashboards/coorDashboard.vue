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
          <h2>Contenidos/Plantillas</h2>
          <h5></h5>
        </div>

        <div
          class="task-body"
          :v-if="contenidos.length"
          v-for="(contenido, index) in contenidos.slice(0,3)"
          :key="index"
        >
          <img src="../../assets/images/img1.jpg" />
          <div class="contenido">
            <h4>{{contenido.nombre_plantilla}}</h4>
          </div>
        </div>

        <div class="task-body" v-if="!contenidos.length">
          <div class="contenido">
            <h4>No se encontraron contenidos o plantillas</h4>
          </div>
        </div>
        <div class="task-link" v-if="contenidos.length">
          <a href="#">
            <router-link to="coordinador/panel">
              <a>
                <h5>Ver todos</h5>
              </a>
            </router-link>
          </a>
        </div>
      </div>

      <div class="notify">
        <div class="notify-header">
          <h2>Profesores</h2>
        </div>
        <span v-if="profesores">
          <span v-if="profesores.length" style="position=relative">
            <div
              v-for="(profesor, index) in profesores.slice(0,3)"
              :key="profesor._id + index"
              class="notify-body"
            >
              <img src="../../assets/images/img1.jpg" />
              <div class="contenido">
                <h4>{{profesor.userID.nombre}} {{profesor.userID.apellido}}</h4>
                <h5>{{profesor.cargo}}</h5>
              </div>
            </div>
          </span>
          <span v-else style="padding-left: 30px;">No hay Profesores registrados</span>
        </span>

        <div class="notify-link" v-if="profesores.length">
          <router-link to="coordinador/panel">
            <a>
              <h5>Ver todos</h5>
            </a>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="!loading">
      <div class="title-courses">
        <h2>Cursos Existentes</h2>
      </div>
      <div class="grid-courses" v-if="classrooms.length">
        <div v-for="(curso, indexCurso) in classrooms" :key="indexCurso">
          <div class="card">
            <img src="../../assets/images/img1.jpg" />
            <div class="card-contenido">
              <h4>{{curso.nombre_aula}}</h4>
              <small>{{curso.seccion}}</small>
            </div>
          </div>
        </div>
      </div>
      <div style="min-width:100%;" v-else>
        <h2>Esta universidad aun no posee ningún curso de formación.</h2>
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
import { mapGetters } from "vuex";
import { eventBus } from "../../main";
import Modal from "@/components/Modal.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import Universities from "@/views/admin/adminIncludes/universities.vue";
import Teachers from "@/views/admin/adminIncludes/teachers.vue";

export default {
  data() {
    return {
      sideBar: false,
      loading: true,
      username: "",
      permisoState: "",
      currentDate: new Date().toLocaleString(),
    };
  },

  async mounted() {
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("coord/getProfesores");
      await this.$store.dispatch("coord/getContenidos");
      await this.$store.dispatch("prof/getClassrooms");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
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
    ...mapGetters({
      permiso: "user/getPermiso",
      userID: "user/getID",
      isLoggedIn: "user/isLoggedIn",
      userInfo: "user/getUserInfo",
    }),
    ...mapGetters({
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
.contenedor {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: "menu contenido";
}

@media only screen and (max-width: 1499px) {
  .main {
    grid-area: contenido;
    background: #e4e4e4;
    padding: 45px 20px;
  }
}
@media only screen and (min-width: 1500px) {
  .main {
    grid-area: contenido;
    background: #e4e4e4;
    padding: 45px 70px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
@media only screen and (max-width: 1499px) {
  .header > .welcome,
  h2 {
    font-size: 27px;
    display: inline-block;
  }

  .header > .welcome,
  .date h3 {
    font-size: 27px;
    display: inline-block;
  }
}
@media only screen and (min-width: 1500px) {
  .header > .welcome,
  .date,
  h3 {
    display: inline-block;
  }
}
.header > .date {
  margin-top: 5px;
}

/* ---- ---- ---- Panel ---- ---- ---- */
.grid-panel {
  display: grid;
  grid-gap: 40px 30px;
  grid-template-columns: 60% auto;
  grid-template-areas: "task notify";
}
/* ---- ---- ---- Tareas ---- ---- ---- */

.task {
  grid-area: task;
  background-color: #fff;
}

@media only screen and (max-width: 1499px) {
  .grid-panel {
    max-height: 450px;
  }
  .task {
    grid-area: task;
    background-color: #fff;
    max-height: 400px;
  }
  .task h2 {
    font-weight: 600;
    font-size: 25px;
  }
  .task-header {
    padding: 3% 4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .task-body {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 4% 3.5% 7%;
  }
  .task-body img {
    margin-right: 40px;
    width: 50px;
    height: 50px;
    border-radius: 25%;
  }

  .task-body h4 {
    font-size: 20px;
  }

  .task-body small {
    margin-left: auto;
    font-size: 15px;
    font-weight: 300;
  }

  .task .task-link {
    text-align: center;
    padding-bottom: 2%;
  }
  .task-link a h5 {
    color: #64d664;
    font-size: 15px;
  }
}

@media only screen and (min-width: 1500px) {
  .task h2 {
    font-weight: 600;
  }

  .task-header {
    padding: 5% 7% 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .task-body {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 7% 5% 10%;
  }

  .task-body img {
    margin-right: 40px;
    width: 50px;
    height: 50px;
    border-radius: 25%;
  }

  .task-body h4 {
    font-size: 25px;
  }

  .task-body small {
    margin-left: auto;
    font-size: 18px;
    font-weight: 300;
  }

  .task .task-link {
    text-align: center;
    padding-bottom: 5%;
  }

  .task-link a h5 {
    color: #64d664;
    font-size: 18px;
  }
}

.red {
  color: #ff0000;
}

.notify {
  position: relative;
  grid-area: notify;
  background-color: #fff;
}

@media only screen and (max-width: 1499px) {
  .notify {
    max-height: 400px;
  }

  .notify-header {
    padding: 5% 7% 5%;
    font-size: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .notify-header h2 {
    font-size: 25px;
    font-weight: 600;
  }

  .notify-body {
    display: flex;
    align-items: center;
    padding: 0 20px 10px 20px;
  }
  .notify-body h4 {
    font-size: 20px;
    padding-left: 12px;
  }
  .notify-body h5 {
    font-size: 17px;
    padding-left: 12px;
  }

  .notify-body img {
    width: 70px;
    height: 70px;
    border-radius: 25%;
    margin-right: 12px;
  }

  .notify .notify-link {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    text-align: center;
    padding-bottom: 5%;
    cursor: pointer;
  }
}

@media only screen and (min-width: 1500px) {
  .notify-header {
    padding: 2em 2.5em 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notify-body {
    display: flex;
    align-items: center;
    padding: 0 7% 10px 7%;
    margin-bottom: 20px;
  }

  .notify-body h4 {
    font-size: 23px;
    padding-left: 12px;
  }
  .notify-body h5 {
    font-size: 19px;
    padding-left: 12px;
  }

  .notify-body img {
    width: 100px;
    height: 100px;
    border-radius: 25%;
    margin-right: 12px;
  }

  .notify .notify-link {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    text-align: center;
    padding-bottom: 5%;
    cursor: pointer;
  }
}

.notify a {
  color: #64d664;
}

/* ---- ---- ---- Cursos ---- ---- ---- */

.main .title-courses {
  padding: 30px 45px;
}

.grid-courses {
  display: grid;
  grid-gap: 40px 25px;
  grid-template-columns: repeat(4, 1fr);
}

.grid-courses .card {
  position: relative;
  width: 100%;
  background-color: #fff;
  box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.25s;
}

.grid-courses .card:hover {
  transform: translateY(-15px);
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
}

.grid-courses .card img {
  width: 100%;
  height: 170px;
}

.grid-courses .card .card-contenido {
  padding: 15px;
}

.card .card-contenido a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
@media only screen and (max-width: 1499px) {
  .card .card-contenido h4 {
    color: #000000;
    padding-bottom: 10px;
    font-size: 17px;
  }
}
@media only screen and (min-width: 1500px) {
  .card .card-contenido h4 {
    color: #000000;
    padding-bottom: 10px;
    font-size: 25px;
  }
}
</style>
  
