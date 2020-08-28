<template>
  <section class="main" style="min-height: 100vh">
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
          <h2>Coordinadores</h2>
          <h5>Cargo</h5>
        </div>

        <div
          class="task-body"
          :v-if="coordinadores"
          v-for="(coordinador, index) in coordinadores.slice(0,3)"
          :key="index"
        >
          <img src="../../assets/images/img1.jpg" />
          <div class="contenido">
            <h4>{{coordinador.userID.nombre}} {{coordinador.userID.apellido}}</h4>
          </div>
          <small>{{coordinador.cargo}}</small>
        </div>
        <div class="task-body" v-if="!coordinadores.length">
          <h4>Esta universidad no posee coordinadores</h4>
        </div>
        <!--
        <div class="task-body">
          <img src="../../assets/images/img1.jpg" />
          <div class="contenido">
            <h4>Cura para el COVID-19</h4>
            <small>Tecnicas de supervivencia ll</small>
          </div>
          <small class="red">Tiene hasta ya</small>
        </div>
        <div class="task-body">
          <img src="../../assets/images/img1.jpg" />
          <div class="contenido">
            <h4>Remedio para la palidacion</h4>
            <small>Tecnicas de supervivencia ll</small>
          </div>
          <small>Cura para el COVID-19</small>
        </div>
        -->
        <div class="task-link" v-if="coordinadores.length">
          <a href="university/panel">
            <h5>Ver más coordinadores</h5>
          </a>
        </div>
      </div>

      <div class="notify">
        <div class="notify-header">
          <h2>Facultades</h2>
        </div>
        <span v-if="facultades && facultades.length > 0" style="position=relative">
          <div v-for="(facultad, index) in facultades.slice(0,3)" :key="index" class="notify-body">
            <img src="../../assets/images/img1.jpg" />
            <div class="contenido">
              <h4>{{facultad.nombre}}</h4>
            </div>
          </div>
        </span>
        <span v-if="!facultades.length" style="padding-left: 30px;">No hay facultades registrados</span>

        <div class="notify-link" v-if="facultades.length">
          <router-link to="university/panel">
            <a>
              <h5>Ver todas</h5>
            </a>
          </router-link>
        </div>
      </div>
    </div>

    <div class="title-courses">
      <h2>Cursos de formación académica</h2>
    </div>

    <div class="grid-courses" :v-if="classrooms && classrooms.length > 0">
      <div class="card" v-for="(curso, index) in classrooms" :key="index">
        <img src="../../assets/images/img2.jpg" />
        <div class="card-contenido">
          <a></a>
          <h4>{{curso.nombre_aula}}</h4>
          <small>Fecha de creacion: {{curso.createdAt | moment("DD-MM-YYYY")}}</small>
        </div>
      </div>
    </div>
    <div v-if="!classrooms.length">
      <h4>Aún no se han registrado cursos de formación académica</h4>
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
import axios from "axios";
import Universities from "@/views/admin/adminIncludes/universities.vue";
import Teachers from "@/views/admin/adminIncludes/teachers.vue";

export default {
  data() {
    return {
      sideBar: false,
      currentDate: new Date().toLocaleString(),
      classrooms: [],
      tareas: [
        {
          title: "Receta de galletitas",
          description: "Postres para regalar al diseñador l",
          date: "24/06/2021",
        },
        {
          title: "Cura para el COVID-19",
          description: "Tecnicas de supervivencia ll",
          date: "24/06/2022",
        },
        {
          title: "Remedio para la palidacion",
          description: "Tecnicas de supervivencia ll",
          date: "24/06/2022",
        },
      ],
    };
  },

  async mounted() {
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("univ/getCoordinadores");
      await this.$store.dispatch("univ/getFacultades");
      await this.$store.dispatch("prof/getClassrooms");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  computed: {
    coordinadores() {
      let coordinadores = this.$store.getters["univ/getCoordinadores"];
      console.log(coordinadores);
      return coordinadores;
    },
    facultades() {
      let facultades = this.$store.getters["univ/getFacultades"];
      return facultades;
    },

    ...mapGetters({
      permiso: "user/getPermiso",
      userID: "user/getID",
      isLoggedIn: "user/isLoggedIn",
      classes: "prof/getClassrooms",
      userInfo: "user/getUserInfo",
    }),
  },
  watch: {
    userInfo: {
      handler(userInfo) {
        if (userInfo) {
          //
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
    classes: {
      handler(info) {
        if (info) {
          this.classrooms = info;
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

.grid-panel {
  display: grid;
  grid-gap: 40px 30px;
  grid-template-columns: 60% auto;
  grid-template-areas: "task notify";
}

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

/* ---- ---- ---- Notificaciones ---- ---- ---- */

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
  
