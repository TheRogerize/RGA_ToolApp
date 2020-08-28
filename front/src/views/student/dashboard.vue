<template>
  <section class="main">
    <header class="header">
      <div class="welcome">
        <h2>¡Bienvenido, {{username}}!</h2>
      </div>
      <div class="date">
        <h4>{{currentDate}}</h4>
      </div>
    </header>

    <div class="grid-panel">
      <div class="task">
        <div class="task-header">
          <h2>Tareas pendientes</h2>
          <h5>Fecha limite</h5>
        </div>

        <div class="task-body">
          <img src="../../assets/images/img1.jpg" />
          <div class="contenido">
            <h4>Receta de galletitas</h4>
            <small>Postres para regalar al diseñador l</small>
          </div>
          <small>Tienes hasta el 31 de mayo</small>
        </div>
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
        <div class="task-link">
          <a href="#">
            <h5>Ver más tareas</h5>
          </a>
        </div>
      </div>

      <div class="notify">
        <div class="notify-header">
          <h2>Notificaciones</h2>
        </div>

        <div class="notify-body">
          <img src="../../assets/images/img1.jpg" />
          <div class="contenido">
            <h4>Tecnicas de supervivencia ll</h4>
            <h5>Una tarea está a punto de vencerse</h5>
          </div>
        </div>

        <div class="notify-link">
          <a href="#">
            <h5>Ir a notificaciones</h5>
          </a>
        </div>
      </div>
    </div>

    <div class="title-courses">
      <h2>Cursos cursados actualmente</h2>
    </div>

    <div class="grid-courses">
      <div class="card">
        <img src="../../assets/images/img1.jpg" />
        <div class="card-contenido">
          <a href="#"></a>
          <h4>Técnicas de supervivencia ll</h4>
          <small>Oropeza :3</small>
        </div>
      </div>
      <div class="card">
        <img src="../../assets/images/img2.jpg" />
        <div class="card-contenido">
          <a href="#"></a>
          <h4>Teoria del Tuco, del Tusuri y Marcelo</h4>
          <small>Ana Beberaggi</small>
        </div>
      </div>
      <div class="card">
        <img src="../../assets/images/img3.jpg" />
        <div class="card-contenido">
          <a href="#"></a>
          <h4>La Rosalía</h4>
          <small>La Rosalía</small>
        </div>
      </div>
      <div class="card">
        <img src="../../assets/images/img4.jpg" />
        <div class="card-contenido">
          <a href="#"></a>
          <h4>Relatos jocosos pero asombrosamente reales l</h4>
          <small>Guido Martinez</small>
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
      username: "",
      currentDate: new Date().toLocaleString(),
      sideBar: false,
    };
  },

  computed: {
    ...mapGetters({
      permiso: "user/getPermiso",
      userID: "user/getID",
      isLoggedIn: "user/isLoggedIn",
      userInfo: "user/getUserInfo",
    }),
  },
  watch: {
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
    padding: 45px 30px;
  }
}
@media only screen and (min-width: 1500px) {
  .main {
    grid-area: contenido;
    background: #e4e4e4;
    padding: 45px 90px;
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
    width: 50px;
    height: 50px;
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
    padding: 0 7% 47% 10%;
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
    width: 50px;
    height: 50px;
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
  
