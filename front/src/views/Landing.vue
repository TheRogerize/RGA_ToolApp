<template>
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
        <swiper :options="swiperOption" ref="VueAwesomeSwiper" @someSwiperEvent="callback">
          <swiper-slide>
            <img src="../assets/images/slid1.jpg" alt />
            <div class="text-slide"></div>
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/slid2.jpg" alt />
            <div class="text-slide"></div>
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/slid3.jpg" alt />
            <div class="text-slide"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>

      <div class="footer">
        <small>©2020 RGA Education, C.A. Todos los derechos reservados.</small>
        <img class="logo-text" src="../assets/images/RGA_logo_gray_text.svg" alt="RGA Logo" />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";

export default {
  data() {
    return {
      swiperOption: {},
    };
  },
  computed: {
    swiper() {
      return this.$refs.VueAwesomeSwiper.swiper;
    },
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
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

.container {
  min-width: 100%;
  width: 100%;
  min-height: 100vh;
  margin: 0px auto;
  padding: 0px;
  position: relative;
  display: grid;
  grid-template-columns: 55% 45%;
  grid-template-areas: "container-1 container-2";
}

/* ---- ---- ---- Iniciemos ---- ---- ---- */

@media only screen and (max-width: 1499px) {
  .welcomeMsg h2 {
    font-size: 70px;
    font-weight: 800;
  }
}
@media only screen and (min-width: 1500px) {
  .welcomeMsg h2 {
    font-size: 100px;
    font-weight: 800;
  }
}
.container-1 {
  grid-area: container-1;
  background: #ffffff;
  position: relative;
  width: 100%;
}

.container-1 a .logo {
  width: 75px;
  height: 75px;
  margin: 40px 40px 0 40px;
}

.container-1 .register {
  position: absolute;
  width: 500px;
  height: 400px;
  left: 50%;
  top: 55%;
  margin-top: -200px;
  margin-left: -250px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.container-1 .register h2 {
  font-size: 35px;
  font-weight: 800;
}

.container-1 .register button {
  border: 0;
  color: #ffffff;
  background-color: #51e49a;
  margin: 4% 0 10%;
  padding: 15px 19px;
  border-radius: 30px;
  font-size: 20px;
  box-shadow: 0 4px 2px rgba(81, 228, 154, 0.8);
  cursor: pointer;
  outline: none;
}

.container-1 .register a {
  font-size: 21px;
  margin-bottom: 2%;
}
.container-1 .register a:hover {
  font-size: 21px;
  margin-bottom: 2%;
  color: rgba(19, 194, 107, 0.8);
}
.container-1 .social-network {
  font-size: 18px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: #51e49a;
  padding: 4% 6%;
  display: flex;
  flex-direction: column;
}

.container-1 .social-network a {
  color: #ffffff;
}

.container-1 .social-network .pb {
  padding-bottom: 10px;
}

.container-2 {
  position: relative;
  grid-area: container-2;
  background: #e4e4e4;
  padding: 45px 110px;
}

.container-2 .navbar {
  position: relative;
}

.container-2 ul {
  display: flex;
  justify-content: flex-end;
}

.container-2 ul li {
  margin-left: 12%;
  list-style: none;
  width: 120px;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
}
.container-2 ul li:hover {
  color: #51e49a;
}
.welcomeMsg {
  position: absolute;
  top: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
}

@media only screen and (max-width: 1499px) {
  .container-2 .slide-swiper {
    position: absolute;
    top: 20%;
    right: 0;
    width: 500px;
    height: 320px;
  }
}
@media only screen and (min-width: 1500px) {
  .container-2 .slide-swiper {
    position: absolute;
    top: 20%;
    right: 0;
    width: 470px;
    height: 405px;
  }
}
.container-2 .swiper-container {
  width: 100%;
  height: 100%;
}

.container-2 .swiper-slide {
  position: relative;
  text-align: center;
  font-size: 18px;
  background: #fff;
}
@media only screen and (max-width: 1499px) {
  .container-2 .swiper-slide img {
    position: relative;
    object-fit: cover;
    width: 100%;
    height: 320px;
  }
}
@media only screen and (min-width: 1500px) {
  .container-2 .swiper-slide img {
    position: relative;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
.container-2 .swiper-slide .text-slide {
  position: relative;
  padding-right: 111px;
  padding-left: 85px;
  text-align: end;
  font-weight: 300;
  font-size: 17px;
}

.container-2 .footer {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px;
  width: 400px;
  left: 50%;
  margin-left: -200px;
  bottom: 0px;
  font-weight: 300;
  font-size: 10px;
  background-color: transparent;
}

.container-2 .footer .logo-text {
  width: 95px;
  height: 55px;
}
</style>