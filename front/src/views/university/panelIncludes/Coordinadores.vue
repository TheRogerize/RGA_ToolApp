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
              <h5>Ingresa los datos del Coordinador</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="submitForm">
              <label for="name">Nombre del Coordinador</label>
              <base-input
                name="name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre del coordinador"
                v-model="$v.newCoor.name.$model"
                @input="$v.newCoor.name.$touch()"
                @blur="$v.newCoor.name.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newCoor.name.$dirty">
                <span v-if="!$v.newCoor.name.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newCoor.name.minLength"
                >El nombre debe poseer al menos {{$v.newCoor.name.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newCoor.name.maxLength"
                >El nombre no debe ser mayor a {{$v.newCoor.name.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="lastname">Apellido</label>
              <base-input
                name="lastname"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Apellido del coordinador"
                v-model="$v.newCoor.lastname.$model"
                @input="$v.newCoor.lastname.$touch()"
                @blur="$v.newCoor.lastname.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newCoor.lastname.$dirty">
                <span v-if="!$v.newCoor.lastname.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newCoor.lastname.minLength"
                >El apellido debe poseer al menos {{$v.newCoor.lastname.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newCoor.lastname.maxLength"
                >El apellido no debe ser mayor a {{$v.newCoor.lastname.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="cargo">Cargo</label>
              <base-input
                name="cargo"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Cargo del coordinador"
                v-model="$v.newCoor.cargo.$model"
                @input="$v.newCoor.cargo.$touch()"
                @blur="$v.newCoor.cargo.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newCoor.cargo.$dirty">
                <span v-if="!$v.newCoor.cargo.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newCoor.cargo.minLength"
                >El cargo debe poseer al menos {{$v.newCoor.cargo.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newCoor.cargo.maxLength"
                >El cargo no debe ser mayor a {{$v.newCoor.cargo.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="cargo">Carnet</label>
              <base-input
                name="carnet"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Carnet del Coordinador"
                v-model="$v.newCoor.carnet.$model"
                @input="$v.newCoor.carnet.$touch()"
                @blur="$v.newCoor.carnet.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newCoor.carnet.$dirty">
                <span v-if="!$v.newCoor.carnet.required">Debes llenar este campo</span>
                <span v-if="!$v.newCoor.carnet.numeric">El numero de carnet solo debe poseer digitos</span>
                <span
                  v-if="!$v.newCoor.carnet.minLength"
                >El numero de carnet debe poseer al menos {{$v.newCoor.carnet.$params.minLength.min}} digitos</span>
                <span
                  v-if="!$v.newCoor.carnet.maxLength"
                >El numero de carnet no debe ser mayor a {{$v.newCoor.carnet.$params.maxLength.max}} digitos</span>
              </div>
              <label for="email">Correo electrónico</label>
              <base-input
                name="email"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newCoor.email.$error, 'is-valid':!$v.newCoor.email.$invalid}"
                placeholder="Correo electrónico Universitario"
                addon-left-icon="ni ni-email-83"
                v-model.trim="$v.newCoor.email.$model"
                @input="$v.newCoor.email.$touch()"
                @blur="$v.newCoor.email.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newCoor.email.$dirty">
                <span v-if="!$v.newCoor.email.required">Debes ingresar un correo</span>
                <span v-if="!$v.newCoor.email.email">Debes ingresar un correo valido</span>
                <span v-if="!$v.newCoor.email.maxLength">El correo ingresado es muy extenso</span>
              </div>

              <label for="descripcion">Contraseña</label>
              <base-input
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newCoor.password.$error, 'is-valid':!$v.newCoor.password.$invalid}"
                placeholder="Contraseña"
                type="password"
                name="password"
                v-model.trim="$v.newCoor.password.$model"
                @input="$v.newCoor.password.$touch()"
                @blur="$v.newCoor.password.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newCoor.password.$dirty">
                <span v-if="!$v.newCoor.password.required">Debes ingresar una contraseña</span>
                <span v-if="!$v.newCoor.password.minLength">Debe contener minimo 6 caracteres</span>
                <span v-if="!$v.newCoor.password.maxLength">Debe contener maximo 60 caracteres</span>
              </div>
              <label for="phone">Numero Telefonico</label>
              <base-input
                name="phone"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newCoor.phone.$error, 'is-valid':!$v.newCoor.phone.$invalid}"
                placeholder="Ingresa el numero telefonico"
                addon-left-icon="fa fa-mobile fa-lg"
                v-model.trim="$v.newCoor.phone.$model"
                @input="$v.newCoor.phone.$touch()"
                @blur="$v.newCoor.phone.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newCoor.phone.$dirty">
                <span v-if="!$v.newCoor.phone.required">Debes ingresar un numero telefonico</span>
                <span v-if="!$v.newCoor.phone.numeric">Debes ingresar un numero valido</span>
                <span
                  v-if="!$v.newCoor.phone.minLength"
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
              <label for>Cargo</label>
              <base-input
                name="cargo"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.editCoor.cargo.$error, 'is-valid':!$v.editCoor.cargo.$invalid}"
                placeholder="Cargo del coordinador"
                v-model.trim="$v.editCoor.cargo.$model"
                @input="$v.editCoor.cargo.$touch()"
                @blur="$v.editCoor.cargo.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editCoor.cargo.$dirty">
                <span v-if="!$v.editCoor.cargo.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editCoor.cargo.minLength"
                >La cargo deben poseer minimo {{$v.editCoor.cargo.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editCoor.cargo.maxLength"
                >La cargo no deben exceder los {{$v.editCoor.cargo.$params.maxLength.max}} caracteres</span>
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
    <!-- Card header EDITAR Facultades -->
    <div class="col-md-7">
      <modal
        :show.sync="modals.facultadModal"
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
              <h5>Selecciona una facultad</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="facultadForm">
              <label for="facultad">Facultad</label>
              <select
                class="selectInput"
                name="facultad"
                v-model.trim="$v.facultad.facultadID.$model"
                dense
              >
                <option
                  :value="coordinador_facultad"
                  v-if="coordinador_facultad && coordinador_facultad !== ''"
                >No realizar cambios</option>
                <option
                  value
                  disabled
                  hidden
                  v-if="facultades.length == 0"
                >No se encontraron facultades registradas</option>
                <option value disabled hidden v-if="facultades.length > 0">Selecciona una facultad</option>
                <option
                  :value="facultad._id"
                  :key="facultad._id"
                  v-for="facultad in facultades"
                >{{facultad.nombre}}</option>
              </select>
              <div class="text-center">
                <base-button type="submit" class="my-4 primary" @click="facultadForm">Editar</base-button>
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
      <h5 class="h3 mb-0">Coordinadores Registrados</h5>
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush list my--3">
        <li class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col ml--2">
              <h4 class="mb-3">
                <a @click="modals.uniModal = true">Nuevo Coordinador</a>
              </h4>
            </div>
            <div class="col-auto mb-3">
              <a class="avatar rounded-circle" style="cursor:pointer;" @click="coordinadoresPDF()">
                <i class="fas fa-print" style="font-size:30px;"></i>
              </a>
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

        <li v-for="(coordinador, index) in coordinadores" :key="index" class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col-auto"></div>
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="#!">{{coordinador.userID.nombre }} {{coordinador.userID.apellido}}</a>
              </h4>
              <span>{{coordinador.cargo}}- &nbsp;</span>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-sm btn-secondary"
                @click="addFacultad(coordinador._id)"
              >Facultad</button>
              <button
                type="button"
                class="btn btn-sm btn-secondary"
                @click="editCoord(coordinador._id)"
              >Modificar</button>
              <button
                type="button"
                class="btn btn-sm btn-danger"
                @click="deleteCoor(coordinador._id, index)"
              >Eliminar</button>
            </div>
          </div>
        </li>
        <span v-if="coordinadores">
          <div class v-if="coordinadores.length < 1">Aún no se han registrado coordinadores</div>
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
      newCoor: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        cargo: "",
        carnet: "",
        submitStatus: "",
      },
      editCoor: {
        id_coord: "",
        name: "",
        lastname: "",
        phone: "",
        cargo: "",
      },
      facultad: {
        facultadID: "",
        coordinadorID: "",
      },
      modals: {
        modal1: false,
        modal2: false,
        uniModal: false,
        editModal: false,
        facultadModal: false,
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
    newCoor: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(40),
      },
      lastname: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40),
      },
      email: {
        required,
        email,
        maxLength: maxLength(100),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(60),
      },
      phone: {
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
    editCoor: {
      cargo: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(100),
      },
    },
    facultad: {
      facultadID: {
        required,
      },
    },
  },

  async mounted() {
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("univ/getCoordinadores");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  created() {
    this.$store.dispatch("univ/getFacultades");
  },
  computed: {
    coordinadores() {
      let coordinadores = this.$store.getters["univ/getCoordinadores"];
      return coordinadores;
    },
    facultades() {
      let facultades = this.$store.getters["univ/getFacultades"];
      return facultades;
    },
    ...mapGetters({ editCoordinador: "univ/getOneCoordinador" }),
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  watch: {
    editCoordinador: {
      handler(newVal) {
        if (newVal) {
          (this.editCoor = {
            id_coord: newVal.id_coord,
            cargo: newVal.cargo,
          }),
            (this.coordinador_facultad = newVal.facultadID);
        }
      },
      immediate: true,
    },
  },

  methods: {
    coordinadoresPDF() {
      if (
        confirm(
          "¿Deseas obtener un reporte de todos los coordinadores registrados?"
        )
      ) {
        this.$store.dispatch("coord/coordinadoresPDF");
      }
    },
    editCoord(id) {
      this.modals.editModal = true;
      this.$store.dispatch("univ/getOneCoordinador", id);
    },
    addFacultad(id) {
      this.modals.facultadModal = true;
      this.$store.dispatch("univ/getOneCoordinador", id);
      this.facultad.coordinadorID = id;
    },
    deleteCoor(id, index) {
      if (confirm("Deseas eliminar al coordinador seleccionado?")) {
        let deleteLoad = {
          id,
          index,
        };
        this.$store.dispatch("univ/deleteCoordinador", deleteLoad);
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
      (this.newCoor = {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        cargo: "",
        carnet: "",
        submitStatus: "",
      }),
        (this.editCoor = {
          id: "",
          nombre: "",
          apellido: "",
          cargo: "",
        });
      this.facultad = {
        coordinadorID: "",
        facultadID: "",
      };
    },
    submitForm(e) {
      this.$v.$touch();
      if (this.$v.newCoor.$invalid) {
      } else {
        e.preventDefault();

        this.form = {
          nombre: this.newCoor.name,
          apellido: this.newCoor.lastname,
          correo: this.newCoor.email,
          telefono: this.newCoor.phone,
          clave: this.newCoor.password,
          cargo: this.newCoor.cargo,
          carnet: this.newCoor.carnet,
        };
        //alert(this.isLoggedIn);
        const url = "coordinador/singup_";
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
              this.$store.dispatch("univ/getCoordinadores");
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
    facultadForm(e) {
      this.$v.facultad.$touch();
      if (this.$v.facultad.$invalid) {
        this.unauthorized("Alguno de los datos no son validos");
      } else {
        e.preventDefault();
        this.form = {
          coordinadorID: this.facultad.coordinadorID,
          facultadID: this.facultad.facultadID,
        };
        let url = "coordinador/add_to_facultad";
        this.$api
          .post(url, this.form)
          .then((response) => {
            if (response.data) {
              this.$store.dispatch("univ/getCoordinadores");
              this.successMSG("Coordinador editado con exito!");
              setTimeout(() => {
                this.cleanForm();
                this.modals.facultadModal = false;
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
  
