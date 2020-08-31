<template>
  <div class="wrapper">
    <div class="mob_container">
      <mobileNavbar></mobileNavbar>
      <div class="welcomeMsg">
        <h2>¿Olvidaste tu contraseña?</h2>
      </div>
              <div class="loginWrapp">
          <div class="wrapper">
            <form form @submit.prevent="enviarEnlace">
              <div class="loginBox" style="padding-bottom: 50px;">
                <h3
                  class="loginHead"
                  style="color: #3ab376;"
                >Ingresa tu correo para recibir tu enlace de recuperación</h3>
                <div class="wrapper">
                  <input
                    class="loginInput"
                    :class="{'is-invalid':$v.user.correo.$error, 'is-valid':!$v.user.correo.$invalid}"
                    type="email"
                    placeholder="Correo Electrónico"
                    v-model.trim="$v.user.correo.$model"
                    @input="$v.user.correo.$touch()"
                    @blur="$v.user.correo.$touch()"
                  />
                  <div class="invalid-input is-absolute" v-if="$v.user.correo.$dirty">
                    <span v-if="!$v.user.correo.required">Debes ingresar un correo</span>
                    <span v-if="!$v.user.correo.email">Debes ingresar un correo válido</span>
                  </div>
                </div>

                <div class="invalid-input">
                  <transition name="fade">
                    <span v-if="unauth">{{serverError}}</span>
                    <span class="validMsg" v-if="auth">{{authMsg}}</span>
                  </transition>
                </div>
              </div>
              <div class="loginButton">
                <a @click="enviarEnlace" class="my-4">Enviar enlace</a>
              </div>
            </form>
          </div>
        </div>
      <mobFooter></mobFooter>
    </div>

    <div class="outContainer">
      <div class="welcomeMsg">
        <h2 style="font-size: 40px;">¿Olvidaste tu contraseña?</h2>
      </div>
      <div class="leftSide">
        <a href="#">
          <img class="logo" src="../assets/images/RGA_logo_icon_gray.svg" alt="RGA Icon" />
        </a>
        <div class="left">
          <p>¡Ingresa tu correo electrónico y recibiras un enlace de recuperación de contraseña!</p>
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
        <div class="loginWrapp">
          <div class="wrapper">
            <form form @submit.prevent="enviarEnlace">
              <div class="loginBox" style="padding-bottom: 50px;">
                <h3
                  class="loginHead"
                  style="color: #3ab376;"
                >Ingresa tu correo para recibir tu enlace de recuperación</h3>
                <div class="wrapper">
                  <input
                    class="loginInput"
                    :class="{'is-invalid':$v.user.correo.$error, 'is-valid':!$v.user.correo.$invalid}"
                    type="email"
                    placeholder="Correo Electrónico"
                    v-model.trim="$v.user.correo.$model"
                    @input="$v.user.correo.$touch()"
                    @blur="$v.user.correo.$touch()"
                  />
                  <div class="invalid-input is-absolute" v-if="$v.user.correo.$dirty">
                    <span v-if="!$v.user.correo.required">Debes ingresar un correo</span>
                    <span v-if="!$v.user.correo.email">Debes ingresar un correo válido</span>
                  </div>
                </div>
                <div class="invalid-input">
                  <transition name="fade">
                    <span v-if="unauth">{{serverError}}</span>
                    <span class="validMsg" v-if="auth">{{authMsg}}</span>
                  </transition>
                </div>
              </div>
              <div class="loginButton">
                <a @click="enviarEnlace" class="my-4">Enviar enlace</a>
              </div>
            </form>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import footer from "../layout/AppFooter";
import navbar from "../layout/unloggedNavbar";
import mobileNavbar from "../layout/mobileNavbar";
import mobFooter from "../layout/mobileFooter";
import Cookies from "../utils/Cookies";
import router from "../router.js";
import { mapState } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email,
  numeric,
} from "vuelidate/lib/validators";

export default {
  data: () => ({
    user: {
      correo: "",
    },
    form: null,
    unauth: false,
    auth: false,
    authMsg: "",
    serverError: "",
    successMsg: "prueba",
    success: false,
  }),
  validations: {
    user: {
      correo: {
        required,
        email,
      },
    },
  },

  methods: {
    unauthorized: function (message) {
      this.serverError = message;
      this.unauth = true;
      const that = this;
      setTimeout(function () {
        that.unauth = false;
      }, 3000);
    },
    authorized: function (message) {
      this.authMsg = message;
      this.auth = true;
    },
    successMSG: function (msg) {
      this.successMsg = msg;
      this.success = true;
    },
    async enviarEnlace() {
      if (this.$v.$invalid) {
        this.unauthorized("Debes ingresar un correo electronico");
      } else {
        const url = "user/askfortoken";
        this.$api
          .post(url, this.user)
          .then((response) => {
            let msg = response.data.message;
            this.authorized(
              "Te hemos enviado un correo para reestablecer tu contraseña"
            );
          })

          .catch((error) => {
            let code = error.response.status;
            let message = error.response.data.message;
            if (code == 401) {
              this.unauthorized(message);
            } else if (code == 400) {
              this.unauthorized(
                "Alguno de los datos ingresados no son validos"
              );
            } else if (code == 403) {
              unauthorized("Error de autentificacion");
            } else if (code == 500) {
              alert("Token error auth");
              unauthorized("Database error");
            }
          });
      }
    },
  },
  components: {
    navbar,
    Footer: footer,
    mobileNavbar,
    mobFooter,
  },
};
</script>
<style scoped>
ul.form-errors {
  position: absolute;
  height: 40px;
  bottom: -20px;
  padding-left: 0px;
}
ul.form-errors .errorsWrapper {
  position: relative;
  height: 40px;
}
ul.form-errors li {
  width: 100%;
  color: red;
  font-size: 12px;
}
ul.form-errors li:hover {
  color: red;
  font-size: 12px;
}
div.input-error {
  border: 1px solid red;
}
</style>