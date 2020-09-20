<template>
    <div class="outContainer">
        <div class="welcomeMsg">
            <h2 style="font-size:40px;">Hora de crear tu nueva contraseña!</h2>
        </div>
        <div class="leftSide">
            <a href="#"><img class="logo" src="../assets/images/RGA_logo_icon_gray.svg" alt="RGA Icon"></a>
            <div class="left">
                <p>
                    ¡Ingresa nueva contraseña y podrás continuar haciendo uso de la mejor herramienta!
                </p>
            </div>
            <div class="social-network">
                <a href="#"><i class="fab fa-twitter pb"></i></a>
                <a href="#"><i class="fab fa-facebook-f pb"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
        <div class="rightSide">
            <navbar/>
            <div class="loginWrapp">
                <div class="wrapper">
              <form form @submit.prevent="resetPassForm">
                    <div class="loginBox">
                        <h3 class="loginHead">Ingresa tu nueva contraseña!</h3>
                       
                        <div class="wrapper mb-4" >
                        <input 
                        class="loginInput" 
                        :class="{'is-invalid':$v.user.password.$error, 'is-valid':!$v.user.password.$invalid}"
                        type="password"
                        placeholder="Contraseña"
                        v-model="$v.user.password.$model"
                        @input="$v.user.password.$touch()"
                        @blur="$v.user.password.$touch()"
                        maxlength="61"
                        autocomplete="off"
                        >
                            <div class="invalid-input is-absolute" style="bottom: -20px;" v-if="$v.user.password.$dirty" >
                              <span v-if="!$v.user.password.minLength">La contraseña debe poseer al menos 6 caracteres</span>
                              <span v-if="!$v.user.password.maxLength">La contraseña debe poseer maximo 60 caracteres</span>
                              <div v-if="$v.user.password.minLength && $v.user.password.maxLength">
                                <span v-if="!$v.user.password.strongPassword">La contraseña debe poseer números, simbolos, letras minusculas y mayusculas</span>
                              </div>
                              
                            </div>
                        </div>
                        <div class="wrapper">
                        <input 
                        class="loginInput" 
                        :class="{'is-invalid':$v.user.confirmpassword.$error, 'is-valid':!$v.user.confirmpassword.$invalid}"
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirmar contraseña"
                        v-model="$v.user.confirmpassword.$model"
                        @input="$v.user.confirmpassword.$touch()"
                        @blur="$v.user.confirmpassword.$touch()"
                        maxlength="61"
                        autocomplete="off" 
                        >
                            <div class="invalid-input is-absolute"  v-if="$v.user.password.$dirty" >
                              <span v-if="!$v.user.password.required">Debes ingresar tu contraseña</span>
                              <div v-else>
                                <span v-if="!$v.user.confirmpassword.required">Debes confirmar tu contraseña</span>
                              </div>
                              <div v-if="$v.user.confirmpassword.required">
                                <span v-if="!$v.user.confirmpassword.sameAsPassword">Las contraseñas deben coincidir</span>
                            </div>
                        </div>
                        </div>
                            <div class="invalid-input" >
                        <transition name="fade">
                                  <span v-if="unauth">{{serverError}}</span>
                                  <span class="validMsg" v-if="auth">{{authMsg}}</span>
                        </transition>
                            </div>
                    </div>
                    <div class="loginButton">
                    <a  @click="resetPassForm" class="my-4">Crear contraseña</a
                  >
                    </div>
              </form>

                </div>
            </div>

            <div class="footer">
                <small>©2020 RGA Education, C.A. Todos los derechos reservados.</small>
                <img class="logo-text" src="../assets/images/RGA_logo_gray_text.svg" alt="RGA Logo">
            </div>

        </div>
    </div>
</template>

<script>
import navbar from '../layout/unloggedNavbar';
import Cookies from "../utils/Cookies";
import router from "../router.js";
import { mapState } from "vuex";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  numeric
} from "vuelidate/lib/validators";

export default {
  data: () => ({
      user: {
        password: "",
        confirmpassword: ""
      },
      form: null,
      unauth: false,
      auth: false,
      authMsg: "",
      serverError: ""
  }),
  validations: {
    user: {
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
          }
        },
      confirmpassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    },
  },

   methods: {
    unauthorized: function(message) {
        this.serverError = message;    
        this.unauth = true;
        const that = this;
         setTimeout(function() {
            that.unauth = false;
        }, 3000);
    },
    authorized: function(message) {
      this.authMsg = message;
      this.auth = true;
      const that = this;
      setTimeout(function() {
        that.auth = false;
      }, 3000);
    },
    async resetPassForm() {
    if (this.$v.$invalid) {
          if(this.user.password == "" || this.user.confirmpassword == "") {
            this.unauthorized("Debes completar todos los campos");
          } else {
            this.unauthorized("Los datos ingresados no son válidos");
          }
      } else {
      let clave = this.user.password;
      alert(clave);
      const url = "user/login";

      this.$api
        .post(url, clave)
        .then(data => {
        })

        .catch((error) => {
            let code = error.response.status;
              let message = error.response.data.message;
        })
      }
    }
  },
  components: {
    navbar
  },
}
</script>
<style scoped>
ul.form-errors {
    position: absolute;
    height:40px;
    bottom: -20px;
    padding-left: 0px;
}
ul.form-errors .errorsWrapper{
    position: relative;
    height: 40px;
}
ul.form-errors li {
  width: 100%;
  color: red;
  font-size:12px;
}
ul.form-errors li:hover {
  color: red;
  font-size:12px;
}
div.input-error {
  border: 1px solid red;
}

</style>