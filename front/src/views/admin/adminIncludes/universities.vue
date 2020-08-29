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
              <h5>Ingresa los datos de la universidad</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="submitForm">
              <label for>Nombre de la universidad</label>
              <base-input
                name="name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre de la universidad"
                v-model="$v.newUniversity.name.$model"
                @input="$v.newUniversity.name.$touch()"
                @blur="$v.newUniversity.name.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.name.$dirty">
                <span v-if="!$v.newUniversity.name.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newUniversity.name.minLength"
                >El nombre debe poseer al menos {{$v.newUniversity.name.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newUniversity.name.maxLength"
                >El nombre no debe ser mayor a {{$v.newUniversity.name.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Siglas</label>
              <base-input
                name="siglas"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newUniversity.siglas.$error, 'is-valid':!$v.newUniversity.siglas.$invalid}"
                placeholder="Por ej: URBE"
                v-model.trim="$v.newUniversity.siglas.$model"
                @input="$v.newUniversity.siglas.$touch()"
                @blur="$v.newUniversity.siglas.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.siglas.$dirty">
                <span v-if="!$v.newUniversity.siglas.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newUniversity.siglas.minLength"
                >Las siglas deben poseer minimo {{$v.newUniversity.siglas.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newUniversity.siglas.maxLength"
                >Las siglas no deben exceder los {{$v.newUniversity.siglas.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Historia</label>
              <base-input
                name="historia"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newUniversity.historia.$error, 'is-valid':!$v.newUniversity.historia.$invalid}"
                placeholder="Historia de la universidad"
                v-model.trim="$v.newUniversity.historia.$model"
                @input="$v.newUniversity.historia.$touch()"
                @blur="$v.newUniversity.historia.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.historia.$dirty">
                <span v-if="!$v.newUniversity.historia.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newUniversity.historia.minLength"
                >La historia deben poseer minimo {{$v.newUniversity.historia.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newUniversity.historia.maxLength"
                >La historia no deben exceder los {{$v.newUniversity.historia.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Misión</label>
              <base-input
                name="mision"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newUniversity.mision.$error, 'is-valid':!$v.newUniversity.mision.$invalid}"
                placeholder="Misión de la universidad"
                v-model.trim="$v.newUniversity.mision.$model"
                @input="$v.newUniversity.mision.$touch()"
                @blur="$v.newUniversity.mision.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.mision.$dirty">
                <span v-if="!$v.newUniversity.mision.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newUniversity.mision.minLength"
                >La mision deben poseer minimo {{$v.newUniversity.mision.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newUniversity.mision.maxLength"
                >La mision no deben exceder los {{$v.newUniversity.mision.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Visión</label>
              <base-input
                name="vision"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newUniversity.vision.$error, 'is-valid':!$v.newUniversity.vision.$invalid}"
                placeholder="Visión de la universidad"
                v-model.trim="$v.newUniversity.vision.$model"
                @input="$v.newUniversity.vision.$touch()"
                @blur="$v.newUniversity.vision.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.vision.$dirty">
                <span v-if="!$v.newUniversity.vision.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newUniversity.vision.minLength"
                >La vision deben poseer minimo {{$v.newUniversity.vision.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newUniversity.vision.maxLength"
                >La vision no deben exceder los {{$v.newUniversity.vision.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Metas</label>
              <base-input
                name="metas"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newUniversity.metas.$error, 'is-valid':!$v.newUniversity.metas.$invalid}"
                placeholder="Metas de la universidad"
                v-model.trim="$v.newUniversity.metas.$model"
                @input="$v.newUniversity.metas.$touch()"
                @blur="$v.newUniversity.metas.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.metas.$dirty">
                <span v-if="!$v.newUniversity.metas.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newUniversity.metas.minLength"
                >La metas deben poseer minimo {{$v.newUniversity.metas.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newUniversity.metas.maxLength"
                >La metas no deben exceder los {{$v.newUniversity.metas.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Correo electrónico</label>
              <base-input
                name="email"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newUniversity.email.$error, 'is-valid':!$v.newUniversity.email.$invalid}"
                placeholder="Correo electrónico Universitario"
                addon-left-icon="ni ni-email-83"
                v-model.trim="$v.newUniversity.email.$model"
                @input="$v.newUniversity.email.$touch()"
                @blur="$v.newUniversity.email.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.email.$dirty">
                <span v-if="!$v.newUniversity.email.required">Debes ingresar un correo</span>
                <span v-if="!$v.newUniversity.email.email">Debes ingresar un correo valido</span>
                <span v-if="!$v.newUniversity.email.maxLength">El correo ingresado es muy extenso</span>
              </div>

              <label for="descripcion">Contraseña</label>
              <base-input
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newUniversity.password.$error, 'is-valid':!$v.newUniversity.password.$invalid}"
                placeholder="Contraseña"
                type="password"
                name="password"
                v-model.trim="$v.newUniversity.password.$model"
                @input="$v.newUniversity.password.$touch()"
                @blur="$v.newUniversity.password.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.password.$dirty">
                <span v-if="!$v.newUniversity.password.required">Debes ingresar una contraseña</span>
                <span v-if="!$v.newUniversity.password.minLength">Debe contener minimo 6 caracteres</span>
                <span v-if="!$v.newUniversity.password.maxLength">Debe contener maximo 60 caracteres</span>
              </div>
              <label for="phone">Numero Telefonico</label>
              <base-input
                name="phone"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newUniversity.phone.$error, 'is-valid':!$v.newUniversity.phone.$invalid}"
                placeholder="Ingresa el numero telefonico"
                addon-left-icon="fa fa-mobile fa-lg"
                v-model.trim="$v.newUniversity.phone.$model"
                @input="$v.newUniversity.phone.$touch()"
                @blur="$v.newUniversity.phone.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newUniversity.phone.$dirty">
                <span v-if="!$v.newUniversity.phone.required">Debes ingresar un numero telefonico</span>
                <span v-if="!$v.newUniversity.phone.numeric">Debes ingresar un numero valido</span>
                <span
                  v-if="!$v.newUniversity.phone.minLength"
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
          style="overflow:auto;height:600px;"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <h5>Datos de la universidad</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="editForm">
              <label for>Nombre de la universidad</label>
              <base-input
                name="name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre de la universidad"
                v-model="$v.editUni.nombre_univ.$model"
                @input="$v.editUni.nombre_univ.$touch()"
                @blur="$v.editUni.nombre_univ.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editUni.nombre_univ.$dirty">
                <span v-if="!$v.editUni.nombre_univ.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editUni.nombre_univ.minLength"
                >El nombre debe poseer al menos {{$v.editUni.nombre_univ.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editUni.nombre_univ.maxLength"
                >El nombre no debe ser mayor a {{$v.editUni.nombre_univ.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Historia</label>
              <base-input
                name="historia"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.editUni.historia.$error, 'is-valid':!$v.editUni.historia.$invalid}"
                placeholder="Historia de la universidad"
                v-model.trim="$v.editUni.historia.$model"
                @input="$v.editUni.historia.$touch()"
                @blur="$v.editUni.historia.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editUni.historia.$dirty">
                <span v-if="!$v.editUni.historia.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editUni.historia.minLength"
                >La historia deben poseer minimo {{$v.editUni.historia.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editUni.historia.maxLength"
                >La historia no deben exceder los {{$v.editUni.historia.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Misión</label>
              <base-input
                name="mision"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.editUni.mision.$error, 'is-valid':!$v.editUni.mision.$invalid}"
                placeholder="Misión de la universidad"
                v-model.trim="$v.editUni.mision.$model"
                @input="$v.editUni.mision.$touch()"
                @blur="$v.editUni.mision.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editUni.mision.$dirty">
                <span v-if="!$v.editUni.mision.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editUni.mision.minLength"
                >La mision deben poseer minimo {{$v.editUni.mision.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editUni.mision.maxLength"
                >La mision no deben exceder los {{$v.editUni.mision.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Visión</label>
              <base-input
                name="vision"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.editUni.vision.$error, 'is-valid':!$v.editUni.vision.$invalid}"
                placeholder="Visión de la universidad"
                v-model.trim="$v.editUni.vision.$model"
                @input="$v.editUni.vision.$touch()"
                @blur="$v.editUni.vision.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editUni.vision.$dirty">
                <span v-if="!$v.editUni.vision.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editUni.vision.minLength"
                >La vision deben poseer minimo {{$v.editUni.vision.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editUni.vision.maxLength"
                >La vision no deben exceder los {{$v.editUni.vision.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Metas</label>
              <base-input
                name="metas"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.editUni.metas.$error, 'is-valid':!$v.editUni.metas.$invalid}"
                placeholder="Metas de la universidad"
                v-model.trim="$v.editUni.metas.$model"
                @input="$v.editUni.metas.$touch()"
                @blur="$v.editUni.metas.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editUni.metas.$dirty">
                <span v-if="!$v.editUni.metas.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editUni.metas.minLength"
                >La metas deben poseer minimo {{$v.editUni.metas.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editUni.metas.maxLength"
                >La metas no deben exceder los {{$v.editUni.metas.$params.maxLength.max}} caracteres</span>
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
      <h5 class="h3 mb-0">Universidades Registradas</h5>
    </div>
    <!-- Card body -->
    <div class="card-body">
      <!-- List group -->
      <ul class="list-group list-group-flush list my--3">
        <li class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col ml--2">
              <h4 class="mb-3">
                <a @click="modals.uniModal = true">Nueva universidad</a>
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

        <li v-for="(university, index) in universities" :key="index" class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col-auto"></div>
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="#!">{{university.nombre_univ}}</a>
              </h4>
              <span>{{university.userID.correo}}- &nbsp;</span>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-sm btn-secondary"
                @click="editUniv(university._id)"
              >Modificar</button>
              <button
                type="button"
                class="btn btn-sm btn-danger"
                @click="deleteUni(university._id, index)"
              >Eliminar</button>
            </div>
          </div>
        </li>
        <div class v-if="!universities">No se ha encontrado universidades</div>
        <div class v-if="universities.length < 1">Cargando universidades ...</div>
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

export default {
  data() {
    return {
      newUniversity: {
        name: "",
        siglas: "",
        email: "",
        phone: "",
        password: "",
        submitStatus: "",
        historia: "",
        mision: "",
        vision: "",
        metas: "",
      },
      editUni: {
        nombre_univ: "",
        historia: "",
        mision: "",
        vision: "",
        metas: "",
        id: "",
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
    newUniversity: {
      name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40),
      },
      siglas: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(7),
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
      historia: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500),
      },
      mision: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500),
      },
      vision: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500),
      },
      metas: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500),
      },
    },
    editUni: {
      nombre_univ: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40),
      },
      historia: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500),
      },
      mision: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500),
      },
      vision: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500),
      },
      metas: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500),
      },
    },
  },

  async mounted() {
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("admin/getUniversities");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  computed: {
    universities() {
      let universities = this.$store.getters["admin/getUniversities"];
      return universities;
    },
    ...mapGetters({ editUniversity: "admin/getOneUniversity" }),
  },
  watch: {
    editUniversity: {
      handler(newVal) {
        if (newVal) {
          this.editUni = {
            nombre_univ: newVal.nombre_univ,
            historia: newVal.historia,
            mision: newVal.mision,
            vision: newVal.vision,
            metas: newVal.metas,
            id: newVal.id_univ,
          };
        }
      },
      immediate: true,
    },
  },

  methods: {
    getUniversities() {
      let universities = this.$store.getters["admin/getUniversities"];
      return universities;
    },
    editUniv(id) {
      this.modals.editModal = true;
      this.$store.dispatch("admin/getOneUniversity", id);
    },

    deleteUni(id, index) {
      if (confirm("Deseas eliminar esta universidad?")) {
        let deleteLoad = {
          id,
          index,
        };
        this.$store.dispatch("admin/deleteUniversity", deleteLoad);
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
        siglas: "",
        telefono: "",
        correo: "",
        clave: "",
        historia: "",
        mision: "",
        vision: "",
        metas: "",
      };
      this.newUniversity = {
        name: "",
        siglas: "",
        email: "",
        phone: "",
        password: "",
        historia: "",
        mision: "",
        vision: "",
        metas: "",
        submitStatus: "",
      };
      this.editUni = {
        nombre_univ: "",
        historia: "",
        mision: "",
        vision: "",
        metas: "",
        id: "",
      };
    },
    submitForm(e) {
      this.$v.$touch();
      if (this.$v.newUniversity.$invalid) {
        this.newUniversity.submitStatus = "FAILED VALIDATION";
      } else {
        e.preventDefault();
        this.form = {
          nombre_univ: this.newUniversity.name,
          siglas: this.newUniversity.siglas,
          correo: this.newUniversity.email,
          telefono: this.newUniversity.phone,
          clave: this.newUniversity.password,
          historia: this.newUniversity.historia,
          mision: this.newUniversity.mision,
          vision: this.newUniversity.vision,
          metas: this.newUniversity.metas,
        };
        this.newUniversity.submitStatus = "VALIDATION SUCCEED";
        let url = "universidad/singup_universidad";
        this.$api
          .post(url, this.form)
          .then((response) => {
            const { token } = response.data;
            let msg = response.data.msg;
            if (token) {
              this.$store.dispatch("admin/getUniversities");
              this.successMSG(msg);
              setTimeout(() => {
                this.cleanForm();
                this.modals.uniModal = false;
              }, 1000);
            }
          })
          .catch((error) => {
            let code = error.response.status;
            let msg = error.response.data.msg;
            if (code == 400 || code == 401 || code == 500) {
              this.unauthorized(msg);
            } else {
              alert(msg);
            }
          });
      }
    },
    editForm(e) {
      this.$v.$touch();
      if (this.$v.editUni.$invalid) {
        this.unauthorized("Alguno de los datos no son validos");
      } else {
        e.preventDefault();
        this.form = {
          nombre_univ: this.editUni.nombre_univ,
          historia: this.editUni.historia,
          mision: this.editUni.mision,
          vision: this.editUni.vision,
          metas: this.editUni.metas,
        };
        let url =
          "universidad/edit_universidad/" +
          this.editUni.id;
        this.$api
          .post(url, this.form)
          .then((response) => {
            let type = response.data.type;
            if (type == "success") {
              this.$store.dispatch("admin/getUniversities");
              this.successMSG("Universidad editada con exito!");
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
  
