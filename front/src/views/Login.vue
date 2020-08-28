<template>
  <div class="outContainer">
    <div class="welcomeMsg">
      <h2>¡Te extrañabamos!</h2>
    </div>
    <div class="leftSide">
      <a href="#">
        <img class="logo" src="../assets/images/RGA_logo_icon_gray.svg" alt="RGA Icon" />
      </a>
      <div class="left">
        <p>¡Ingresa con tu usuario y contraseña para hacer uso de la mejor herramienta académica!</p>
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
          <form form @submit.prevent="submitForm">
            <div class="loginBox">
              <h3 class="loginHead">Ingresa tus datos</h3>
              <div class="wrapper">
                <input
                  class="loginInput"
                  :class="{'is-invalid':$v.user.email.$error, 'is-valid':!$v.user.email.$invalid}"
                  type="email"
                  id="email"
                  placeholder="Correo Electrónico"
                  v-model.trim="$v.user.email.$model"
                  @input="$v.user.email.$touch()"
                  @blur="$v.user.email.$touch()"
                />
                <div class="invalid-input is-absolute" v-if="$v.user.email.$dirty">
                  <span v-if="!$v.user.email.required">Debes ingresar un correo</span>
                  <span v-if="!$v.user.email.email">Debes ingresar un correo valido</span>
                </div>
              </div>
              <div class="wrapper">
                <input
                  class="loginInput"
                  :class="{'is-invalid':$v.user.password.$error, 'is-valid':!$v.user.password.$invalid}"
                  type="password"
                  autocomplete="off"
                  id="passwrod"
                  placeholder="Contraseña"
                  v-model="$v.user.password.$model"
                  @input="$v.user.password.$touch()"
                  @blur="$v.user.password.$touch()"
                />
                <div class="invalid-input is-absolute" v-if="$v.user.password.$dirty">
                  <span v-if="!$v.user.password.required">Debes ingresar tu contraseña</span>
                </div>
              </div>
              <div class="invalid-input">
                <transition name="fade">
                  <span v-if="unauth">{{serverError}}</span>
                  <span class="validMsg" v-if="auth">{{authMsg}}</span>
                </transition>
              </div>
              <div class="forgotPassLink">
                <router-link to="/recuperar" class="nav-link">
                  <a>¿Olvidaste tu contraseña?</a>
                </router-link>
              </div>
            </div>
            <div class="loginButton">
              <a @click="submitForm" class="my-4">Iniciar Sesión</a>
            </div>
          </form>
        </div>
      </div>

      <div class="footer">
        <small>©2020 RGA Education, C.A. Todos los derechos reservados.</small>
        <img class="logo-text" src="../assets/images/RGA_logo_gray_text.svg" alt="RGA Logo" />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../layout/unloggedNavbar";
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
      email: "",
      password: "",
    },
    form: null,
    unauth: false,
    auth: false,
    authMsg: "",
    serverError: "",
  }),
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
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
      const that = this;
      setTimeout(function () {
        that.auth = false;
      }, 3000);
    },
    async submitForm() {
      const user = {
        correo: this.user.email,
        clave: this.user.password,
      };

      if (this.$v.$invalid) {
        if (this.user.email == "" && this.user.password == "") {
          this.unauthorized("Debes completar todos los campos");
        } else {
          this.unauthorized("Los datos ingresados no son válidos");
        }
      } else {
        const url = "user/login";

        this.$api
          .post(url, user)
          .then((data) => {
            const { errors, user } = data.data;
            if (errors) {
              for (let key in errors) {
                this[key].errors.push(errors[key]);
              }
              return;
            }
            const { token, payload } = data.data;
            if (token) {
              const level = payload.user.permiso;
              const userID = payload.user.id;
              this.authorized("Iniciando sesión");
              this.$store.dispatch("user/CREAR_PERMISO", level);
              this.$store.dispatch("user/CREAR_ID", userID);
              setTimeout(() => {
                this.$store.dispatch("user/LOGIN", token);
              }, 2000);
            }
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