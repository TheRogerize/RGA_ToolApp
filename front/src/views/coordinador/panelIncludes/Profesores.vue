<template>
  <div class="card universitiesList">
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
          style="overflow:auto;height:600px;"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <h5>Ingresa los datos del Profesor</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="submitForm">
              <label for="name">Nombre del Profesor</label>
              <base-input
                name="name"
                id="name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre del profesor"
                v-model="$v.newProf.nombre.$model"
                @input="$v.newProf.nombre.$touch()"
                @blur="$v.newProf.nombre.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newProf.nombre.$dirty">
                <span v-if="!$v.newProf.nombre.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newProf.nombre.minLength"
                >El nombre debe poseer al menos {{$v.newProf.nombre.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newProf.nombre.maxLength"
                >El nombre no debe ser mayor a {{$v.newProf.nombre.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="lastname">Apellido</label>
              <base-input
                name="lastname"
                id="lastname"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Apellido del profesor"
                v-model="$v.newProf.apellido.$model"
                @input="$v.newProf.apellido.$touch()"
                @blur="$v.newProf.apellido.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newProf.apellido.$dirty">
                <span v-if="!$v.newProf.apellido.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newProf.apellido.minLength"
                >El apellido debe poseer al menos {{$v.newProf.apellido.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newProf.apellido.maxLength"
                >El apellido no debe ser mayor a {{$v.newProf.apellido.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="cargo">Cargo</label>
              <base-input
                name="cargo"
                id="cargo"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Cargo del Profesor"
                v-model="$v.newProf.cargo.$model"
                @input="$v.newProf.cargo.$touch()"
                @blur="$v.newProf.cargo.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newProf.cargo.$dirty">
                <span v-if="!$v.newProf.cargo.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newProf.cargo.minLength"
                >El cargo debe poseer al menos {{$v.newProf.cargo.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newProf.cargo.maxLength"
                >El cargo no debe ser mayor a {{$v.newProf.cargo.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="cargo">Carnet</label>
              <base-input
                name="carnet"
                id="carnet"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Carnet del Profesor"
                v-model="$v.newProf.carnet.$model"
                @input="$v.newProf.carnet.$touch()"
                @blur="$v.newProf.carnet.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newProf.carnet.$dirty">
                <span v-if="!$v.newProf.carnet.required">Debes llenar este campo</span>
                <span v-if="!$v.newProf.carnet.numeric">El numero de carnet solo debe poseer digitos</span>
                <span
                  v-if="!$v.newProf.carnet.minLength"
                >El numero de carnet debe poseer al menos {{$v.newProf.carnet.$params.minLength.min}} digitos</span>
                <span
                  v-if="!$v.newProf.carnet.maxLength"
                >El numero de carnet no debe ser mayor a {{$v.newProf.carnet.$params.maxLength.max}} digitos</span>
              </div>
              <label for="email">Correo electrónico</label>
              <base-input
                name="email"
                id="email"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newProf.correo.$error, 'is-valid':!$v.newProf.correo.$invalid}"
                placeholder="Correo electrónico"
                addon-left-icon="ni ni-correo-83"
                v-model.trim="$v.newProf.correo.$model"
                @input="$v.newProf.correo.$touch()"
                @blur="$v.newProf.correo.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newProf.correo.$dirty">
                <span v-if="!$v.newProf.correo.required">Debes ingresar un correo</span>
                <span v-if="!$v.newProf.correo.email">Debes ingresar un correo valido</span>
                <span v-if="!$v.newProf.correo.maxLength">El correo ingresado es muy extenso</span>
              </div>

              <label for="descripcion">Contraseña</label>
              <base-input
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newProf.clave.$error, 'is-valid':!$v.newProf.clave.$invalid}"
                placeholder="Contraseña"
                type="password"
                name="password"
                id="password"
                v-model.trim="$v.newProf.clave.$model"
                @input="$v.newProf.clave.$touch()"
                @blur="$v.newProf.clave.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newProf.clave.$dirty">
                <span v-if="!$v.newProf.clave.required">Debes ingresar una contraseña</span>
                <span v-if="!$v.newProf.clave.minLength">Debe contener minimo 6 caracteres</span>
                <span v-if="!$v.newProf.clave.maxLength">Debe contener maximo 60 caracteres</span>
              </div>
              <label for="phone">Número Telefonico</label>
              <base-input
                name="phone"
                id="phone"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newProf.telefono.$error, 'is-valid':!$v.newProf.telefono.$invalid}"
                placeholder="Ingresa el numero telefonico"
                addon-left-icon="fa fa-mobile fa-lg"
                v-model.trim="$v.newProf.telefono.$model"
                @input="$v.newProf.telefono.$touch()"
                @blur="$v.newProf.telefono.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newProf.telefono.$dirty">
                <span v-if="!$v.newProf.telefono.required">Debes ingresar un numero telefonico</span>
                <span v-if="!$v.newProf.telefono.numeric">Debes ingresar un numero valido</span>
                <span
                  v-if="!$v.newProf.telefono.minLength"
                >El numero de telefono debe ser de 11 digitos</span>
              </div>
              <div class="text-center">
                <base-button type="submit" class="my-4 primary" @click="submitForm">Registrar</base-button>
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
              <h5>Datos de la universidad</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="editForm">
              <label for>Carnet</label>
              <base-input
                name="carnet"
                id="editcarnet"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.editProf.carnet.$error, 'is-valid':!$v.editProf.carnet.$invalid}"
                placeholder="Carnet del coordinador"
                v-model.trim="$v.editProf.carnet.$model"
                @input="$v.editProf.carnet.$touch()"
                @blur="$v.editProf.carnet.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editProf.carnet.$dirty">
                <span v-if="!$v.editProf.carnet.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editProf.carnet.minLength"
                >La carnet deben poseer minimo {{$v.editProf.carnet.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editProf.carnet.maxLength"
                >La carnet no deben exceder los {{$v.editProf.carnet.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Cargo</label>
              <base-input
                name="cargo"
                id="editcargo"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.editProf.cargo.$error, 'is-valid':!$v.editProf.cargo.$invalid}"
                placeholder="Cargo del coordinador"
                v-model.trim="$v.editProf.cargo.$model"
                @input="$v.editProf.cargo.$touch()"
                @blur="$v.editProf.cargo.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editProf.cargo.$dirty">
                <span v-if="!$v.editProf.cargo.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editProf.cargo.minLength"
                >La cargo deben poseer minimo {{$v.editProf.cargo.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editProf.cargo.maxLength"
                >La cargo no deben exceder los {{$v.editProf.cargo.$params.maxLength.max}} caracteres</span>
              </div>

              <div class="text-center">
                <base-button type="submit" class="my-4 primary" @click="editForm">Editar</base-button>
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
    <div class="card-header">
      <!-- Title -->
      <h5 class="h3 mb-0">Profesores Registrados</h5>
    </div>
    <!-- Card body -->
    <div class="card-body">
      <!-- List group -->
      <ul class="list-group list-group-flush list my--3">
        <li class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col ml--2">
              <h4 class="mb-3">
                <a @click="modals.uniModal = true">Nuevo Profesor</a>
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

        <li v-for="(profesor, index) in profesores" :key="index" class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col-auto">
              <!-- Avatar
                <a href="#" class="avatar rounded-circle">
                  <img alt="Image placeholder" />
                </a>
              -->
            </div>
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="#!">{{profesor.userID.nombre }} {{profesor.userID.apellido}}</a>
              </h4>
              <span>{{profesor.cargo}}- &nbsp;</span>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-sm btn-secondary"
                @click="editProff(profesor._id)"
              >Modificar</button>
              <button
                type="button"
                class="btn btn-sm btn-danger"
                @click="deleteProf(profesor._id, index)"
              >Eliminar</button>
            </div>
          </div>
        </li>
        <span v-if="profesores">
          <div class v-if="profesores.length < 1">Aún no se han registrado profesores</div>
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
import { mapGetters } from "vuex";
import Cookies from "../../../utils/Cookies";

export default {
  data() {
    return {
      newProf: {
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        clave: "",
        cargo: "",
        carnet: "",
      },
      editProf: {
        id_prof: "",
        cargo: "",
        carnet: "",
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
    newProf: {
      nombre: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(40),
      },
      apellido: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40),
      },
      correo: {
        required,
        email,
        maxLength: maxLength(100),
      },
      clave: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(60),
      },
      telefono: {
        required,
        numeric,
        minLength: minLength(11),
      },
      cargo: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      carnet: {
        required,
        numeric,
        minLength: minLength(3),
        maxLength: maxLength(150),
      },
    },
    editProf: {
      cargo: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
      carnet: {
        required,
        numeric,
        minLength: minLength(3),
        maxLength: maxLength(150),
      },
    },
  },

  async mounted() {
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("coord/getProfesores");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  computed: {
    profesores() {
      let profesores = this.$store.getters["coord/getProfesores"];
      return profesores;
    },
    ...mapGetters({ editProfesor: "coord/getOneProfesor" }),
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  watch: {
    editProfesor: {
      handler(newVal) {
        if (newVal) {
          this.editProf = {
            id_prof: newVal.id_prof,
            cargo: newVal.cargo,
            carnet: newVal.carnet,
          };
        }
      },
      immediate: true,
    },
  },

  methods: {
    editProff(id) {
      this.modals.editModal = true;
      this.$store.dispatch("coord/getOneProfesor", id);
    },

    deleteProf(id, index) {
      if (confirm("Deseas eliminar al profesor seleccionado?")) {
        let deleteLoad = {
          id,
          index,
        };
        this.$store.dispatch("coord/deleteProfesor", deleteLoad);
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
        apellido: "",
        cargo: "",
        correo: "",
        clave: "",
        telefono: "",
        carnet: "",
      };
      (this.newProf = {
        nombre: "",
        apellido: "",
        cargo: "",
        correo: "",
        clave: "",
        telefono: "",
        carnet: "",
      }),
        (this.editProf = {
          id: "",
          cargo: "",
          carnet: "",
        });
    },
    submitForm(e) {
      this.$v.$touch();
      if (this.$v.newProf.$invalid) {
        this.unauthorized("Se encontraron errores en el formulario");
      } else {
        e.preventDefault();

        this.form = {
          nombre: this.newProf.nombre,
          apellido: this.newProf.apellido,
          correo: this.newProf.correo,
          telefono: this.newProf.telefono,
          clave: this.newProf.clave,
          cargo: this.newProf.cargo,
          carnet: this.newProf.carnet,
        };
        const url = "profesor/singup_profesor";
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
              this.$store.dispatch("coord/getProfesores");
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
      this.$v.editProf.$touch();
      if (this.$v.editProf.$invalid) {
        this.unauthorized("Alguno de los datos no son validos");
      } else {
        e.preventDefault();
        this.form = {
          cargo: this.editProf.cargo,
          carnet: this.editProf.carnet,
        };
        let url =
          "profesor/edit_profesor/" +
          this.editProf.id_prof;
        this.$api
          .post(url, this.form)
          .then((response) => {
            let type = response.data.type;
            if (type == "success") {
              this.$store.dispatch("coord/getProfesores");
              this.successMSG("Profesor editado con exito!");
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
  
