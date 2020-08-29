<template>
  <div class="card universitiesList">
    <!-- Card header -->
    <div class="col-md-7">
      <modal
        :show.sync="modals.uniModal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-4 py-lg-4"
          class="border-0"
          style="overflow:auto;height:auto;"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <h5>Ingresa los datos de la nueva Facultad</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="submitForm">
              <label for="name">Nombre de la Facultad</label>
              <base-input
                name="name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre de la facultad"
                v-model="$v.facultad.nombre.$model"
                @input="$v.facultad.nombre.$touch()"
                @blur="$v.facultad.nombre.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.facultad.nombre.$dirty">
                <span v-if="!$v.facultad.nombre.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.facultad.nombre.minLength"
                >El nombre debe poseer al menos {{$v.facultad.nombre.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.facultad.nombre.maxLength"
                >El nombre no debe ser mayor a {{$v.facultad.nombre.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="carreras">Carreras</label>
              <div class="inputRecord" v-for="(carrera, index) in facultad.carreras" :key="index">
                <input
                  name="lastname"
                  type="text"
                  alternative
                  class="mb-2 field directInput"
                  placeholder="Ingresa el nombre de la carrera"
                  v-model="carrera.carrera"
                  @input="$v.facultad.carreras.$touch()"
                  @blur="$v.facultad.carreras.$touch()"
                />

                <div
                  v-if="facultad.carreras.length > 1"
                  class="button"
                  style="right: -17px; top:7px;"
                >
                  <i class="ni ni-fat-remove" @click="removeCarrera(index)"></i>
                </div>
              </div>
              <div class="invalid-input" v-if="$v.facultad.carreras.$dirty">
                <span v-if="!$v.facultad.carreras.required">Debes llenar este campo</span>
              </div>
              <a
                class="agregarSecond"
                style="color: #15bd4d"
                @click="addCarrerasField"
              >Agregar otra carrera</a>

              <div class="text-center">
                <base-button type="submit" class="my-4 primary" @click="submitForm">Agregar</base-button>
                <div class="invalid-input" v-if="loading">
                  <span>{{loading}}</span>
                </div>
                <div class="invalid-input" v-if="error == '' && !loading  == 0">
                  <span>{{error}}</span>
                </div>
                <div class="invalid-input" v-if="success">
                  <span class="validMsg">{{successMsg}}</span>
                </div>
                <div class="invalid-input" v-if="unauth">
                  <span>{{serverError}}</span>
                </div>
              </div>
            </form>
          </template>
        </card>
      </modal>
    </div>
    <!-- Card header EDITAR Coordinadores -->
    <div class="col-md-7">
      <modal
        :show.sync="modals.editModal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-4 py-lg-4"
          class="border-0"
          style="overflow:auto;height:300px;"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <h5>Datos de facultad</h5>
            </div>
          </template>
        </card>
      </modal>
    </div>
    <div class="card-header">
      <h5 class="h3 mb-0">Facultades de la universidad</h5>
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush list my--3">
        <li class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col ml--2">
              <h4 class="mb-3">
                <a @click="modals.uniModal = true">Nueva facultad</a>
              </h4>
            </div>
            <div class="col-auto mb-3">
              <a
                class="avatar rounded-circle"
                style="margin-right:40px;cursor:pointer;"
                @click="modals.uniModal = true"
              >
                <i class="ni ni-fat-add" style="font-size:50px;"></i>
              </a>
            </div>
          </div>
        </li>
        <li v-for="(facultad, index) in facultades" :key="index" class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col-auto"></div>
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="#!">{{facultad.nombre}}</a>
                <ul href="#!">
                  <li
                    style="font-size:14px;"
                    v-for="(carrera, carreraIndex) in facultad.carreras"
                    :key="carreraIndex"
                  >{{carrera}}</li>
                </ul>
              </h4>
            </div>
            <div class="col-auto"></div>
          </div>
        </li>
        <span v-if="facultades">
          <div class v-if="facultades.length < 1">Aún no se han registrado facultades</div>
        </span>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  email,
  numeric,
  between,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import Modal from "@/components/Modal.vue";
import Cookies from "../../../utils/Cookies";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      carrerasNames: [],
      facultad: {
        nombre: "",
        carreras: [
          {
            carrera: "",
          },
        ],
      },

      modals: {
        modal1: false,
        modal2: false,
        uniModal: false,
        editModal: false,
      },
      form: null,
      loading: null,
      error: "",
      successMsg: "",
      success: false,
      unauth: false,
      serverError: "",
      deleteItem: "",
    };
  },
  validations: {
    facultad: {
      nombre: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(70),
      },
      carreras: {
        required,
      },
    },
  },

  async mounted() {
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("univ/getFacultades");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  computed: {
    facultades() {
      let facultades = this.$store.getters["univ/getFacultades"];
      return facultades;
    },
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },

  methods: {
    addCarrerasField() {
      this.facultad.carreras.push({
        carrera: "",
      });
    },
    removeCarrera(carreraIndex) {
      if (this.facultad.carreras.length > 1) {
        this.facultad.carreras.splice(carreraIndex, 1);
      } else {
        this.facultad.carreras[0].carrera = "";
      }
    },

    unauthorized: function (msg) {
      this.serverError = msg;
      this.unauth = true;
      const that = this;
      setTimeout(function () {
        that.unauth = false;
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
    cleanForm() {
      this.$v.$reset();
      this.form = {
        nombre: "",
        carreras: [{}],
      };
      this.facultad = {
        nombre: "",
        carreras: [{}],
      };
    },
    submitForm(e) {
      this.$v.$touch();
      if (this.facultad.carreras.length == 0) {
        this.unauthorized("Debes ingresar al menos una carrera");
      }
      if (this.$v.facultad.$invalid) {
      } else {
        e.preventDefault();
        let carreras = this.facultad.carreras;
        carreras.forEach((carrera) => {
          this.carrerasNames.push(carrera.carrera);
        });

        this.form = {
          nombre: this.facultad.nombre,
          carreras: this.carrerasNames,
        };

        const url = "universidad/add_facultad";
        this.$api
          .post(url, this.form, {
            headers: {
              token: Cookies.read("token"),
            },
          })
          .then((response) => {
            let msg = response.data.msg;
            this.successMSG(msg);
            setTimeout(() => {
              this.$store.dispatch("univ/getFacultades");
              this.cleanForm();
              this.modals.uniModal = false;
            }, 1000);
          })
          .catch((error) => {
            let code = error.response.status;
            let msg = error.response.data.msg;
            if (code == 400) {
              this.unauthorized(msg);
            } else if (code == 401) {
              this.unauthorized(msg);
            } else if (code == 500) {
              this.unauthorized(msg);
            } else {
              this.unauthorized(msg);
            }
          });
      }
    },
    editForm(e) {
      this.$v.editCoor.$touch();
      if (this.$v.editCoor.$invalid) {
        this.unauthorized("Alguno de los datos no son validos");
      } else {
        e.preventDefault();
        this.form = {
          cargo: this.editCoor.cargo,
        };
        let url =
          "coordinador/edit_coordinador/" +
          this.editCoor.id_coord;
        this.$api
          .post(url, this.form)
          .then((response) => {
            let type = response.data.type;
            if (type == "success") {
              this.$store.dispatch("univ/getCoordinadores");
              this.successMSG("Coordinador editado con exito!");
              setTimeout(() => {
                this.cleanForm();
                this.modals.editModal = false;
              }, 1000);
            }
          })
          .catch((error) => {
            let code = error.data.status;
            let errmsg = error.data.msg;
            if (code == 400 || code == 401 || code == 500) {
              this.unauthorized(errmsg);
            } else {
              alert("Ha ocurrido un error en el servidor");
            }
          });
      }
    },
  },

  components: {
    Modal,
  },
};
</script>

<style scoped>
.field {
  max-height: 40px;
}
</style>
  
