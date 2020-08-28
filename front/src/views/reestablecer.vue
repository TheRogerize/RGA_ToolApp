<template>
  <div class="outContainer">
    <div class="welcomeMsg">
      <h2 style="font-size:40px;">Hora de crear tu nueva contraseña!</h2>
    </div>
    <div class="leftSide">
      <a href="#">
        <img class="logo" src="../assets/images/RGA_logo_icon_gray.svg" alt="RGA Icon" />
      </a>
      <div class="left">
        <p>¡Ingresa nueva contraseña y podrás continuar haciendo uso de la mejor herramienta!</p>
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
          <form form @submit.prevent="resetPassForm">
            <div class="loginBox">
              <h3 class="loginHead">Ingresa tu nueva contraseña!</h3>

              <div class="wrapper mb-4">
                <input type="hidden" name="correo" v-model="$v.reestablecer.correo.$model" />
                <input type="hidden" name="resettoken" v-model="$v.reestablecer.resettoken.$model" />
                <input
                  class="loginInput"
                  :class="{'is-invalid':$v.reestablecer.clave.$error, 'is-valid':!$v.reestablecer.clave.$invalid}"
                  type="password"
                  id="passwrod"
                  placeholder="Contraseña"
                  v-model="$v.reestablecer.clave.$model"
                  @input="$v.reestablecer.clave.$touch()"
                  @blur="$v.reestablecer.clave.$touch()"
                  maxlength="61"
                  autocomplete="off"
                />
                <div
                  class="invalid-input is-absolute"
                  style="bottom: -20px;"
                  v-if="$v.reestablecer.clave.$dirty"
                >
                  <span
                    v-if="!$v.reestablecer.clave.minLength"
                  >La contraseña debe poseer al menos 6 caracteres</span>
                  <span
                    v-if="!$v.reestablecer.clave.maxLength"
                  >La contraseña debe poseer maximo 60 caracteres</span>
                  <div v-if="$v.reestablecer.clave.minLength && $v.reestablecer.clave.maxLength">
                    <span
                      v-if="!$v.reestablecer.clave.strongPassword"
                    >La contraseña debe poseer números, simbolos, letras minusculas y mayusculas</span>
                  </div>
                </div>
              </div>
              <div class="wrapper">
                <input
                  class="loginInput"
                  :class="{'is-invalid':$v.reestablecer.confirmar_clave.$error, 'is-valid':!$v.reestablecer.confirmar_clave.$invalid}"
                  type="password"
                  name="confirmar_clave"
                  id="confirmar_clave"
                  placeholder="Confirmar contraseña"
                  v-model="$v.reestablecer.confirmar_clave.$model"
                  @input="$v.reestablecer.confirmar_clave.$touch()"
                  @blur="$v.reestablecer.confirmar_clave.$touch()"
                  maxlength="61"
                  autocomplete="off"
                />
                <div class="invalid-input is-absolute" v-if="$v.reestablecer.clave.$dirty">
                  <span v-if="!$v.reestablecer.clave.required">Debes ingresar tu contraseña</span>
                  <div v-else>
                    <span
                      v-if="!$v.reestablecer.confirmar_clave.required"
                    >Debes confirmar tu contraseña</span>
                  </div>
                  <div v-if="$v.reestablecer.confirmar_clave.required">
                    <span
                      v-if="!$v.reestablecer.confirmar_clave.sameAsPassword"
                    >Las contraseñas deben coincidir</span>
                  </div>
                  <div class="invalid-input" v-if="success">
                    <span class="validMsg">{{successMsg}}</span>
                  </div>
                  <div class="invalid-input" v-if="unauth">
                    <span>{{serverError}}</span>
                  </div>
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
              <a @click="resetPassForm" class="my-4">Crear contraseña</a>
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
import axios from "axios";
import { mapState } from "vuex";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";

export default {
  data: () => ({
    reestablecer: {
      correo: "",
      resettoken: "",
      clave: "",
      confirmar_clave: "",
    },
    form: null,
    unauth: false,
    auth: false,
    authMsg: "",
    serverError: "",
    successMsg: "",
    success: false,
  }),
  mounted() {
    // note this function
    this.reestablecer.correo = this.$route.params.correo;
    this.reestablecer.resettoken = this.$route.params.resettoken;
  },
  validations: {
    reestablecer: {
      correo: {
        required,
      },
      resettoken: {
        required,
      },
      clave: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(60),
        strongPassword(password) {
          return (
            /[a-z]/.test(password) && // checks for a-z
            /[A-Z]/.test(password) && // checks for a-z
            /[0-9]/.test(password) && // checks for 0-9
            /\W|_/.test(password) && // checks for special char
            password.length >= 6 &&
            password.length <= 60
          );
        },
      },
      confirmar_clave: {
        required,
        sameAsPassword: sameAs("clave"),
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
    successMSG: function (msg) {
      this.successMsg = msg;
      this.success = true;
      const that = this;
      setTimeout(function () {
        that.success = false;
      }, 3000);
    },
    async resetPassForm() {
      if (this.$v.$invalid) {
        if (
          this.reestablecer.clave == "" ||
          this.reestablecer.confirmar_clave == ""
        ) {
          this.unauthorized("Debes completar todos los campos");
        }
      } else {
        const url = "http://localhost:3000/api/user/newpassword";

        axios
          .post(url, this.reestablecer)
          .then((response) => {
            let msg = response.data.msg;
            this.successMSG(msg);
            setTimeout(() => {
              this.$router.push("/login");
            }, 2500);
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