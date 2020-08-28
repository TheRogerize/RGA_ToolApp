<template>
  <div class="outContainer">
    <div class="welcomeRegisterMsg">
      <h2>¡Empecemos!</h2>
    </div>
    <div class="leftSide">
      <a href="#">
        <img class="logo" src="../assets/images/RGA_logo_icon_gray.svg" alt="RGA Icon" />
      </a>
      <div class="left">
        <p>¡Te damos la bienvenida a RGA, a continuación regístrate para empezar a hacer uso de la mejor herramienta académica!</p>
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
      <div class="registerWrapp">
        <div class="wrapper">
          <form form @submit.prevent="submitForm">
            <div class="registerBox">
              <h3 class="loginHead">Ingresa tus datos</h3>
              <div class="wrapp">
                <div class="inputCedula">
                  <select
                    name="id"
                    id="id"
                    placeholder="Identificacion"
                    :class="{'is-invalid':$v.user.id.$error, 'is-valid':!$v.user.id.$invalid}"
                    v-model.trim="$v.user.id.$model"
                    @input="$v.user.id.$touch()"
                    @blur="$v.user.id.$touch()"
                  >
                    <option disabled value>C.I</option>
                    <option value="V">V</option>
                    <option value="P">P</option>
                    <option value="E">E</option>
                  </select>
                  <input
                    :class="{'is-invalid':$v.user.DNI.$error, 'is-valid':!$v.user.DNI.$invalid}"
                    type="text"
                    name="cedula"
                    id="cedula"
                    placeholder="Cédula"
                    v-model.trim="$v.user.DNI.$model"
                    @input="$v.user.DNI.$touch()"
                    @blur="$v.user.DNI.$touch()"
                    maxlength="11"
                  />
                  <div class="invalid-input is-absolute" v-if="$v.user.DNI.$dirty">
                    <div v-if="!$v.user.id.required">
                      <span
                        v-if="!$v.user.id.required"
                      >Primero debes elegir tu tipo de identificación</span>
                    </div>
                    <div v-else>
                      <span v-if="!$v.user.DNI.required ">Debes ingresar tu cedula de identidad</span>
                      <span v-if="!$v.user.DNI.numeric">Solo se permiten digitos</span>
                      <div v-else>
                        <span
                          v-if="!$v.user.DNI.minLength"
                        >Tu identificacion debe contener al menos 7 digitos</span>
                        <span
                          v-if="!$v.user.DNI.maxLength"
                        >Tu identificacion debe contener un maximo de 10 digitos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wrapper">
                <div class="inputRow">
                  <input
                    class="name"
                    :class="{'is-invalid':$v.user.name.$error, 'is-valid':!$v.user.name.$invalid}"
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                    v-model.trim="$v.user.name.$model"
                    @input="$v.user.name.$touch()"
                    @blur="$v.user.name.$touch()"
                    maxlength="31"
                  />
                  <input
                    class="lastn"
                    :class="{'is-invalid':$v.user.lastname.$error, 'is-valid':!$v.user.lastname.$invalid}"
                    type="text"
                    id="apellido"
                    placeholder="Apellido"
                    v-model.trim="$v.user.lastname.$model"
                    @input="$v.user.lastname.$touch()"
                    @blur="$v.user.lastname.$touch()"
                    maxlength="31"
                  />
                  <div
                    class="invalid-input is-absolute"
                    v-if="$v.user.name.$dirty|| $v.user.lastname.$dirty"
                  >
                    <span
                      v-if="!$v.user.name.required || !$v.user.lastname.required"
                    >Debes ingresar tu nombre y apellido</span>
                    <div v-else-if="!$v.user.name.minLength || !$v.user.lastname.minLength">
                      <span
                        v-if="!$v.user.name.minLength || !$v.user.lastname.minLength"
                      >Nombre y apellido deben contener al menos 2 caracteres</span>
                    </div>
                    <div v-else-if="!$v.user.name.maxLength || !$v.user.lastname.maxLength">
                      <span
                        v-if="!$v.user.name.maxLength || !$v.user.lastname.maxLength"
                      >Nombre y apellido deben contener máximo 30 caracteres</span>
                    </div>
                    <div v-else>
                      <span
                        v-if="!$v.user.name.alpha || !$v.user.lastname.alpha"
                      >Solo se permiten caracteres del alfabeto</span>
                    </div>
                  </div>
                </div>
              </div>
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
                  maxlength="150"
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
                  id="passwrod"
                  placeholder="Contraseña"
                  v-model="$v.user.password.$model"
                  @input="$v.user.password.$touch()"
                  @blur="$v.user.password.$touch()"
                  maxlength="61"
                  autocomplete="off"
                />
                <div class="invalid-input is-absolute" v-if="$v.user.password.$dirty">
                  <span
                    v-if="!$v.user.password.minLength"
                  >La contraseña debe poseer al menos 6 caracteres</span>
                  <span
                    v-if="!$v.user.password.maxLength"
                  >La contraseña debe poseer maximo 60 caracteres</span>
                  <div v-if="$v.user.password.minLength && $v.user.password.maxLength">
                    <span
                      v-if="!$v.user.password.strongPassword"
                    >La contraseña debe poseer números, simbolos, letras minusculas y mayusculas</span>
                  </div>
                </div>
              </div>
              <div class="wrapper">
                <input
                  class="loginInput"
                  :class="{'is-invalid':$v.user.confirmpassword.$error, 'is-valid':!$v.user.confirmpassword.$invalid}"
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="Confirmar contraseña"
                  v-model="$v.user.confirmpassword.$model"
                  @input="$v.user.confirmpassword.$touch()"
                  @blur="$v.user.confirmpassword.$touch()"
                  maxlength="61"
                  autocomplete="off"
                />
                <div class="invalid-input is-absolute" v-if="$v.user.password.$dirty">
                  <span v-if="!$v.user.password.required">Debes ingresar tu contraseña</span>
                  <div v-else>
                    <span v-if="!$v.user.confirmpassword.required">Debes confirmar tu contraseña</span>
                  </div>
                  <div v-if="$v.user.confirmpassword.required">
                    <span
                      v-if="!$v.user.confirmpassword.sameAsPassword"
                    >Las contraseñas deben coincidir</span>
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
              <a @click="submitForm" class="my-4">Registrarse</a>
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
  email,
  numeric,
  sameAs,
  alpha,
} from "vuelidate/lib/validators";
import passwordComplexity from "../plugins/passwordComplexity";
export default {
  data: () => ({
    user: {
      id: "",
      DNI: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    form: null,
    unauth: false,
    serverError: "",
    auth: false,
    authMsg: "",
  }),
  validations: {
    user: {
      id: {
        required,
      },
      DNI: {
        required,
        numeric,
        minLength: minLength(7),
        maxLength: maxLength(10),
      },
      name: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(30),
      },
      lastname: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(30),
      },
      email: {
        required,
        email,
        maxLength: maxLength(150),
      },
      password: {
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
      confirmpassword: {
        required,
        sameAsPassword: sameAs("password"),
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
      this.$v.user.$touch();

      if (this.$v.$invalid) {
        if (this.user.email == "" && this.user.password == "") {
          this.unauthorized("Debes completar todos los campos");
        } else {
          this.unauthorized("Los datos ingresados no son válidos");
        }
      } else {
        const newUser = {
          //DNI: this.user.id + this.user.DNI,
          nombre: this.user.name,
          telefono: "04126886014",
          apellido: this.user.lastname,
          correo: this.user.email,
          clave: this.user.password,
          permiso: 4,
        };
        const url = "http://localhost:3000/api/alumno/signup";
        axios
          .post(url, newUser)
          .then((response) => {
            const { token, payload } = response.data;
            if (token) {
              const level = [payload.user.permiso];
              this.authorized("Su usuario ha sido registrado exitosamente!");
              this.$store.dispatch("user/CREAR_PERMISO", [level]);
              setTimeout(() => {
                this.$store.dispatch("user/LOGIN", token);
              }, 3000);
            }
          })
          .catch((error) => {
            let code = error.response.status;
            let message = error.response.data.message;
            if (code == 400 || code == 401) {
              this.unauthorized(message);
            } else if (code == 500) {
              alert("Error en la base de datos");
              this.unauthorized(message);
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
