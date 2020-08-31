<template>
  <div class="wrapper">
    <div class="mob_container">
      <mobileNavbar></mobileNavbar>
      <div class="welcomeMsg">
        <h2>¡Bienvenido!</h2>
      </div>
      <div class="swiperContainer">
        <div class="slide-swiper">
          <swiper :options="swiperOption" ref="VueAwesomeSwiper">
            <swiper-slide>
              <img src="../assets/images/slid1.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="../assets/images/slid2.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="../assets/images/slid3.jpg" alt />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
        </div>
      </div>
      <div class="register">
        <h2>¿Iniciamos?</h2>
        <router-link tag="span" to="register">
          <button>Registrarse</button>
        </router-link>
        <a href="#">Organízate</a>
        <a href="#">Mantente al día</a>
        <router-link tag="span" to="login">
          <a href="#">Conéctate</a>
        </router-link>
      </div>
    </div>
    <mobFooter></mobFooter>
    <div class="container">
      <div class="welcomeMsg">
        <h2>¡Bienvenido!</h2>
      </div>
      <div class="container-1">
        <a href="#">
          <img class="logo" src="../assets/images/RGA_logo_icon_gray.svg" alt="RGA Icon" />
        </a>
        <div class="register">
          <h2>¿Iniciamos?</h2>
          <router-link tag="span" to="register">
            <button>Registrarse</button>
          </router-link>
          <a href="#">Organízate</a>
          <a href="#">Mantente al día</a>
          <router-link tag="span" to="login">
            <a href="#">Conéctate</a>
          </router-link>
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
      <div class="container-2">
        <nav class="navbar">
          <ul>
            <li>
              <router-link to="/" tag="span">Inicio</router-link>
            </li>
            <li>
              <router-link to="register" tag="span">Regístrate</router-link>
            </li>
            <li>
              <router-link to="login" tag="span">Iniciar Sesión</router-link>
            </li>
          </ul>
        </nav>
        <div class="slide-swiper">
          <swiper :options="swiperOption" ref="VueAwesomeSwiper">
            <swiper-slide>
              <img src="../assets/images/slid1.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="../assets/images/slid2.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="../assets/images/slid3.jpg" alt />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
        </div>
        <div class="footer">
          <small>©2020 RGA Education, C.A. Todos los derechos reservados.</small>
          <small>By Angeline Matos, Roy Gutiérrez y Guido Martínez.</small>
          <img class="logo-text" src="../assets/images/RGA_logo_gray_text.svg" alt="RGA Logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import footer from "../layout/AppFooter";
import mobileNavbar from "../layout/mobileNavbar";
import mobFooter from "../layout/mobileFooter";

import "swiper/css/swiper.css";

export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        initialSlide: 0,
        autoplay: {
          delay: 1500,
          disableOnInteraction: true,
        },
        speed: 800,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
        },
      },
    };
  },
  components: {
    Footer: footer,
    mobileNavbar,
    mobFooter
  },
  computed: {
    swiper() {
      return this.$refs.VueAwesomeSwiper.$swiper;
    },
    swiperMob() {
      return this.$refs.VueAwesomeSwiperMob.$swiper;
    },
  },
  mounted() {
    this.swiper.slideTo(0, 1000, false);
  },
};
</script>
<style scoped>
template {
  font-family: "Montserrat", sans-serif;
}

a {
  text-decoration: none;
  color: #000000;
}
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
</style>