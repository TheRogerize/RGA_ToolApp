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
          style="overflow:auto;height:auto;width:600px;"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <h5>Ingresa los datos del nuevo Curso</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="submitForm">
              <label for="name">Nombre del Aula</label>
              <base-input
                name="name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre del Aula"
                v-model="$v.curso.nombre_aula.$model"
                @input="$v.curso.nombre_aula.$touch()"
                @blur="$v.curso.nombre_aula.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.curso.nombre_aula.$dirty">
                <span v-if="!$v.curso.nombre_aula.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.curso.nombre_aula.minLength"
                >El nombre del aula debe poseer al menos {{$v.curso.nombre_aula.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.curso.nombre_aula.maxLength"
                >El nombre del aula no debe ser mayor a {{$v.curso.nombre_aula.$params.maxLength.max}} caracteres</span>
              </div>
              <base-input
                type="text"
                alternative
                class="mb-1 pb-5 pt-3 field"
                placeholder="Sección del Curso"
                v-model="$v.curso.seccion.$model"
                @input="$v.curso.seccion.$touch()"
                @blur="$v.curso.seccion.$touch()"
              ></base-input>
              <div class="invalid-input mt-2" v-if="$v.curso.seccion.$dirty">
                <span v-if="!$v.curso.seccion.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.curso.seccion.minLength"
                >La sección debe poseer al menos {{$v.curso.seccion.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.curso.seccion.maxLength"
                >El nombre de la sección no debe ser mayor a {{$v.curso.seccion.$params.maxLength.max}} caracteres</span>
              </div>

              <label class="pt-5" for="Plantilla de contenido">Plantilla de contenido</label>
              <select
                class="selectInput"
                name="Plantilla de contenido"
                v-model.trim="$v.curso.contenidoID.$model"
                dense
              >
                <option
                  value
                  disabled
                  hidden
                  v-if="contenidos.length == 0"
                >No has registrado ninguna plantilla</option>
                <option
                  value
                  disabled
                  hidden
                  v-if="contenidos.length > 0"
                >Selecciona una Plantilla de contenido</option>
                <option
                  :value="contenido._id"
                  :key="contenido._id"
                  v-for="contenido in contenidos"
                >{{contenido.nombre_plantilla}}</option>
              </select>
              <div class="invalid-input" v-if="$v.curso.contenidoID.$dirty">
                <span
                  v-if="!$v.curso.contenidoID.required"
                >Debes seleccionar una plantilla de contenido para el curso</span>
              </div>
              <div class="text-center">
                <base-button type="submit" class="my-2 rgaGreen" @click="submitForm">Agregar</base-button>
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
    <!-- Card header asignar profesor a curso de formacion -->
    <div class="col-md-7">
      <modal
        :show.sync="modals.addProfModal"
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
              <h5>Selecciona un profesor</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="addProfesorForm">
              <label for="facultad">Asignar profesor a Curso</label>
              <select
                class="selectInput"
                name="facultad"
                v-model.trim="$v.addProfesor.profesorID.$model"
                dense
              >
                <option
                  value
                  disabled
                  hidden
                  v-if="profesores.length == 0"
                >No se encontraron profesores registrados</option>
                <option
                  value
                  disabled
                  hidden
                  v-if="profesores.length > 0"
                >Selecciona un profesor/docente</option>
                <option
                  :value="profesor._id"
                  :key="profesor._id"
                  v-for="profesor in profesores"
                >{{profesor.userID.nombre}} {{profesor.userID.apellido}} - {{profesor.cargo}}</option>
              </select>
              <div class="text-center">
                <base-button type="submit" class="my-4 rgaGreen" @click="addProfesorForm">Asignar</base-button>
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
      <h5 class="h3 mb-0">Cursos de formación</h5>
    </div>
    <!-- Card body -->
    <div class="card-body">
      <!-- List group -->
      <ul class="list-group list-group-flush list my--3">
        <li class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col ml--2">
              <h4 class="mb-3">
                <a @click="modals.uniModal = true">Nuevo curso</a>
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

        <span v-if="cursos.length" style="position:relative">
          <li v-for="(curso, index) in cursos" :key="index" class="list-group-item px-0">
            <div class="row align-items-center">
              <div class="col ml--2">
                <h4 class="mb-0">
                  <a href="#">{{curso.nombre_aula }}</a>
                </h4>
                <span>
                  Sección:
                  <b>{{curso.seccion}}</b>
                </span>
                <br />
                <span v-if="curso.profesorID">ID de Profesor: {{curso.profesorID._id}}</span>
                <br />
                <span v-if="curso.profesorID">Carnet de Profesor: {{curso.profesorID.carnet}}</span>
                <ul v-for="(unidad, unidadIndex) in curso.unidad" :key="unidadIndex">
                  <b>{{unidad.titulo_unidad}}</b>
                  <li
                    style="margin-left:30px;"
                    v-for="(tem, temaIndex) in unidad.tema"
                    :key="temaIndex"
                  >{{tem.titulo_tema}}</li>
                </ul>
              </div>
              <div class="col-auto">
                <button
                  type="button"
                  v-if="!curso.profesorID"
                  class="btn btn-sm btn-secondary"
                  @click="addProfesorModal(curso._id)"
                >Asignar Profesor</button>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click="deleteCurso(curso._id, index)"
                >Eliminar</button>
              </div>
            </div>
          </li>
        </span>
        <span v-if="cursos">
          <div v-if="cursos.length < 1">Aún no se han agregado cursos</div>
        </span>
        <span v-else>
          <div>Aún no se han agregado cursos</div>
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
      errors: 0,
      cursos: [],
      curso: {
        nombre_aula: "",
        seccion: "",
        contenidoID: "",
      },
      addProfesor: {
        classroomID: "",
        profesorID: "",
      },
      modals: {
        modal1: false,
        modal2: false,
        uniModal: false,
        addProfModal: false,
      },
      form: null,
      loading: null,
      error: "",
      successMsg: "",
      success: false,
      unauth: false,
      serverError: "",
    };
  },
  validations: {
    curso: {
      nombre_aula: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(70),
      },
      seccion: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(30),
      },
      contenidoID: {
        required,
      },
    },
    addProfesor: {
      classroomID: {
        required,
      },
      profesorID: {
        required,
      },
    },
  },
  async mounted() {
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("coord/getClassrooms");
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
    contenidos() {
      let contenidos = this.$store.getters["coord/getContenidos"];
      return contenidos;
    },
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
    ...mapGetters({
      classes: "coord/getClassrooms",
    }),
  },
  watch: {
    classes: {
      handler(info) {
        if (info) {
          this.cursos = info;
        }
      },
      immediate: true,
    },
  },

  methods: {
    addProfesorModal(id) {
      this.modals.addProfModal = true;
      this.addProfesor.classroomID = id;
    },
    addUnidad() {
      this.contenido.unidad.push({
        titulo_unidad: "",
        descripcion: "",
        tema: [
          {
            titulo_tema: "",
          },
        ],
      });
    },
    addTemas(unidadIndex) {
      this.contenido.unidad[unidadIndex].tema.push({
        titulo_tema: "",
      });
    },

    deleteCurso(id, index) {
      if (confirm("¿Deseas eliminar el curso seleccionado?")) {
        let deleteLoad = {
          id,
          index,
        };
        this.$store.dispatch("coord/deleteCurso", deleteLoad);
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
        nombre_aula: "",
        seccion: "",
        contenidoID: "",
      };
      this.curso = {
        nombre_aula: "",
        seccion: "",
        contenidoID: "",
      };
    },
    submitForm(e) {
      this.$v.$touch();
      if (this.$v.curso.$invalid) {
        this.unauthorized("Se encontraron errores en el formulario");
      } else {
        e.preventDefault();
        const url = "classroom/add_classroom";
        this.$api
          .post(url, this.curso, {
            headers: {
              token: Cookies.read("token"),
            },
          })
          .then((response) => {
            let msg = response.data.msg;
            this.successMSG(msg);
            setTimeout(() => {
              this.$store.dispatch("coord/getClassrooms");
              this.cleanForm();
              this.modals.uniModal = false;
            }, 1000);
          })
          .catch((error) => {
            let code = error.response.status;
            let msg = error.response.data.message;
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
    addProfesorForm(e) {
      this.$v.$touch();
      if (this.$v.addProfesor.$invalid) {
        this.unauthorized("Se encontraron errores en el formulario");
      } else {
        e.preventDefault();
        const url =
          "classroom/add_profesor_classroom";
        this.$api
          .post(url, this.addProfesor)
          .then((response) => {
            //let msg = response.data.msg;
            this.successMSG("Profesor asignado exitosamente!");
            setTimeout(() => {
              this.$store.dispatch("coord/getClassrooms");
              this.cleanForm();
              this.modals.addProfModal = false;
            }, 2500);
          })
          .catch((error) => {
            let code = error.response.status;
            let msg = error.response.data.message;
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
  