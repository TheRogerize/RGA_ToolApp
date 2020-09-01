<template>
  <div class="wrapper">
    <div class="mob_container">
      <mobileNavbar></mobileNavbar>
      <div class="welcomeMsg">
        <h2>¡Aprende sobre RGA!</h2>
        <p>¡Te invitamos a conocer algunas de las funcionalidades de la herramienta académica RGA!</p>
      </div>
      <div class="wrapper">
        <div class="about">
          <div class="info">
            <div class="circle-img univImg"></div>
            <p>Gestión de universidad</p>
          </div>
          <div class="info">
            <div class="circle-img classImg"></div>
            <p>Creación de cursos/classrooms</p>
          </div>
          <div class="info">
            <div class="circle-img studentsImg"></div>
            <p>Visualización y descarga de contenidos</p>
          </div>
          <div class="info">
            <div class="circle-img tasksImg"></div>
            <p>Creación y entrega de tareas</p>
          </div>
        </div>
      </div>
      <mobFooter></mobFooter>
    </div>

    <div class="outContainer">
      <div class="welcomeMsg">
        <h2>¡Aprende sobre RGA!</h2>
      </div>
      <div class="leftSide">
        <a href="#">
          <img class="logo" src="../assets/images/RGA_logo_icon_gray.svg" alt="RGA Icon" />
        </a>
        <div class="left">
          <p>¡Te invitamos a conocer algunas de las funcionalidades de la herramienta académica RGA!</p>
        </div>
        <div class="social-network">
          <a href="#">
            <i class="fab fa-twitter pb"></i>
          </a>
          <a href="#">
            <i class="fab fa-facebook-f pb"></i>
          </a>
          <a href="#">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div class="rightSide">
        <navbar />
        <div class="wrapper">
          <div class="about">
            <div class="info">
              <div class="circle-img univImg"></div>
              <p>Gestión de universidad</p>
            </div>
            <div class="info">
              <div class="circle-img classImg"></div>
              <p>Creación de cursos/classrooms</p>
            </div>
            <div class="info">
              <div class="circle-img studentsImg"></div>
              <p>Visualización y descarga de contenidos</p>
            </div>
            <div class="info">
              <div class="circle-img tasksImg"></div>
              <p>Creación y entrega de tareas</p>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../layout/unloggedNavbar";
import Cookies from "../utils/Cookies";
import router from "../router.js";
import footer from "../layout/AppFooter";
import mobileNavbar from "../layout/mobileNavbar";
import mobFooter from "../layout/mobileFooter";
import { mapState } from "vuex";

export default {
  components: {
    navbar,
    Footer: footer,
    mobileNavbar,
    mobFooter,
  },
};
</script>
