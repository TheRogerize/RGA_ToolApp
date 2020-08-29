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
          style="overflow:auto;height:auto;width:600px;"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <h5>Ingresa los datos de la nueva Plantilla</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="submitForm">
              <label for="name">Nombre de la Plantilla</label>
              <base-input
                name="name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre de la plantilla"
                v-model="$v.contenido.nombre_plantilla.$model"
                @input="$v.contenido.nombre_plantilla.$touch()"
                @blur="$v.contenido.nombre_plantilla.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.contenido.nombre_plantilla.$dirty">
                <span v-if="!$v.contenido.nombre_plantilla.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.contenido.nombre_plantilla.minLength"
                >El nombre debe poseer al menos {{$v.contenido.nombre_plantilla.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.contenido.nombre_plantilla.maxLength"
                >El nombre no debe ser mayor a {{$v.contenido.nombre_plantilla.$params.maxLength.max}} caracteres</span>
              </div>

              <label for="name" style="margin: 0px;">Unidades</label>
              <span
                class="unidad"
                style="text-align:center;"
                v-for="(unid, unidadIndex) in contenido.unidad"
                :key="unidadIndex"
              >
                <div class="button">
                  <i class="ni ni-fat-remove" @click="removeUnidad(unidadIndex)"></i>
                </div>
                <h2 style="margin: 0px auto;">{{contenido.unidad[unidadIndex].titulo_unidad}}</h2>
                <base-input
                  name="name"
                  type="text"
                  alternative
                  class="mb-2 field"
                  placeholder="Nombre de unidad"
                  v-model="contenido.unidad[unidadIndex].titulo_unidad"
                ></base-input>
                <base-input
                  type="text"
                  alternative
                  class="mb-1 field"
                  placeholder="Descripcion de unidad"
                  v-model="contenido.unidad[unidadIndex].descripcion"
                ></base-input>
                <label class="mt-2 mb-2" style="width:100%;">Temas:</label>
                <div v-for="(tema, temaIndex) in unid.tema" :key="temaIndex" class="inputRecord">
                  <input
                    style="width:70%; margin: 3px auto 3px 30px;;font-size:12px;"
                    name="lastname"
                    type="text"
                    alternative
                    class="mb-2 mt-0 field directInput"
                    placeholder="Ingresa el nombre del tema"
                    v-model="tema.titulo_tema"
                  />
                  <div class="button">
                    <i class="ni ni-fat-remove" @click="removeTemas(temaIndex, unidadIndex)"></i>
                  </div>
                </div>

                <a
                  class="agregarSecond"
                  style="color: #15bd4d"
                  @click="addTemas(unidadIndex)"
                >Agregar Tema</a>
              </span>
              <a
                class="mt-2 agregarMas"
                style="color: #15bd4d"
                @click="addUnidad()"
              >Agregar otra unidad</a>

              <div class="text-center">
                <base-button
                  type="submit"
                  class="my-2 primary"
                  style="background-color:#3ab376;color:white;"
                  @click="submitForm"
                >Agregar</base-button>
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
          style="overflow:auto;height:auto;width:600px;"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <h5>Modificar nombre de la plantilla</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="submitForm">
              <label for="name">Nombre de la Plantilla</label>
              <base-input
                name="name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre de la plantilla"
                v-model="$v.editCont.nombre_plantilla.$model"
                @input="$v.editCont.nombre_plantilla.$touch()"
                @blur="$v.editCont.nombre_plantilla.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.editCont.nombre_plantilla.$dirty">
                <span v-if="!$v.editCont.nombre_plantilla.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.editCont.nombre_plantilla.minLength"
                >El nombre debe poseer al menos {{$v.editCont.nombre_plantilla.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.editCont.nombre_plantilla.maxLength"
                >El nombre no debe ser mayor a {{$v.editCont.nombre_plantilla.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="name" style="margin: 0px;">Unidades</label>

              <span
                class="unidad"
                style="text-align:center;"
                v-for="(unid, unidadIndex) in editCont.unidad"
                :key="unidadIndex"
              >
                <div class="button">
                  <i class="ni ni-fat-remove" @click="removeUnidadEdit(unidadIndex)"></i>
                </div>
                <h2 style="margin: 0px auto;">{{editCont.unidad[unidadIndex].titulo_unidad}}</h2>
                <base-input
                  name="name"
                  type="text"
                  alternative
                  class="mb-2 field"
                  placeholder="Nombre de unidad"
                  v-model="editCont.unidad[unidadIndex].titulo_unidad"
                ></base-input>
                <base-input
                  type="text"
                  alternative
                  class="mb-1 field"
                  placeholder="Descripcion de unidad"
                  v-model="editCont.unidad[unidadIndex].descripcion"
                ></base-input>
                <label class="mt-2 mb-2" style="width:100%;">Temas:</label>
                <div v-for="(tema, temaIndex) in unid.tema" :key="temaIndex" class="inputRecord">
                  <input
                    style="width:70%; margin: 3px auto 3px 30px;;font-size:12px;"
                    name="lastname"
                    type="text"
                    alternative
                    class="mb-2 mt-0 field directInput"
                    placeholder="Ingresa el nombre del tema"
                    v-model="tema.titulo_tema"
                  />
                  <div class="button">
                    <i class="ni ni-fat-remove" @click="removeTemasEdit(temaIndex, unidadIndex)"></i>
                  </div>
                </div>
                <a
                  class="agregarSecond"
                  style="color:#15bd4d"
                  @click="addTemasEdit(unidadIndex)"
                >Agregar Tema</a>
              </span>
              <a
                class="mt-2 agregarMas"
                style="color:#15bd4d"
                @click="addUnidadEdit()"
              >Agregar otra unidad</a>

              <div class="text-center">
                <base-button
                  type="submit"
                  class="my-2 primary"
                  style="background-color:#3ab376;color:white;"
                  @click="editForm"
                >Agregar</base-button>
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
      <h5 class="h3 mb-0">Plantillas de contenido</h5>
    </div>
    <!-- Card body -->
    <div class="card-body">
      <!-- List group -->
      <ul class="list-group list-group-flush list my--3">
        <li class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col ml--2">
              <h4 class="mb-3">
                <a @click="modals.uniModal = true">Nueva Plantilla</a>
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

        <li v-for="(contenido, index) in contenidos" :key="index" class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="#">{{contenido.nombre_plantilla }}</a>
              </h4>
              <ul v-for="(unidad, unidadIndex) in contenido.unidad" :key="unidadIndex">
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
                class="btn btn-sm btn-secondary"
                @click="editContent(contenido._id)"
              >Modificar</button>
              <button
                type="button"
                class="btn btn-sm btn-danger"
                @click="deleteCont(contenido._id, index)"
              >Eliminar</button>
            </div>
          </div>
        </li>
        <span v-if="contenidos">
          <div class v-if="contenidos.length < 1">Aún no se han agregado contenidos</div>
        </span>
        <span v-else>
          <div>Aún no se han agregado contenidos</div>
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
      //carrerasNames: [],
      errors: 0,
      contenido: {
        nombre_plantilla: "",
        unidad: [
          {
            titulo_unidad: "",
            descripcion: "",
            tema: [
              {
                titulo_tema: "",
              },
            ],
          },
        ],
      },
      editCont: {
        id_cont: "",
        nombre_plantilla: "",
        unidad: [
          {
            titulo_unidad: "",
            descripcion: "",
            tema: [
              {
                titulo_tema: "",
              },
            ],
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
    contenido: {
      nombre_plantilla: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(70),
      },
    },
    editCont: {
      nombre_plantilla: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(70),
      },
    },
  },
  async mounted() {
    // note this function
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("coord/getContenidos");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  computed: {
    contenidos() {
      let contenidos = this.$store.getters["coord/getContenidos"];
      return contenidos;
    },

    ...mapGetters({ editContenido: "coord/getOneContenido" }),

    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  watch: {
    editContenido: {
      handler(newVal) {
        if (newVal) {
          //
          this.editCont.nombre_plantilla = newVal.nombre_plantilla;
          this.editCont.id_cont = newVal.id_cont;
          this.editCont.unidad = newVal.unidad;
        }
      },
      immediate: true,
    },
  },

  methods: {
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

    removeUnidad(unidadIndex) {
      if (this.contenido.unidad.length > 1) {
        this.contenido.unidad.splice(unidadIndex, 1);
      } else {
        this.contenido.unidad[0].titulo_unidad = "";
        this.contenido.unidad[0].descripcion = "";
        if (this.contenido.unidad[unidadIndex].tema.length > 1) {
          this.contenido.unidad[unidadIndex].tema.splice(1);
        } else {
          this.contenido.unidad[unidadIndex].tema.titulo_tema = "";
        }
      }
    },

    removeTemas(temaIndex, unidadIndex) {
      if (this.contenido.unidad[unidadIndex].tema.length > 1) {
        this.contenido.unidad[unidadIndex].tema.splice(temaIndex, 1);
      } else {
        this.contenido.unidad[unidadIndex].tema[temaIndex].titulo_tema = "";
      }
    },

    addUnidadEdit() {
      this.editCont.unidad.push({
        titulo_unidad: "",
        descripcion: "",
        tema: [
          {
            titulo_tema: "",
          },
        ],
      });
    },
    addTemasEdit(unidadIndex) {
      this.editCont.unidad[unidadIndex].tema.push({
        titulo_tema: "",
      });
    },

    removeUnidadEdit(unidadIndex) {
      if (this.editCont.unidad.length > 1) {
        this.editCont.unidad.splice(unidadIndex, 1);
      } else {
        this.editCont.unidad[0].titulo_unidad = "";
        this.editCont.unidad[0].descripcion = "";
        if (this.editCont.unidad[unidadIndex].tema.length > 1) {
          this.editCont.unidad[unidadIndex].tema.splice(1);
        } else {
          this.editCont.unidad[unidadIndex].tema[0].titulo_tema = "";
        }
      }
    },

    removeTemasEdit(temaIndex, unidadIndex) {
      if (this.editCont.unidad[unidadIndex].tema.length > 1) {
        this.editCont.unidad[unidadIndex].tema.splice(temaIndex, 1);
      } else {
        this.editCont.unidad[unidadIndex].tema[temaIndex].titulo_tema = "";
      }
    },

    editContent(id) {
      this.modals.editModal = true;
      this.$store.dispatch("coord/getOneContenido", id);
    },

    deleteCont(id, index) {
      if (confirm("Deseas eliminar la plantilla seleccionada?")) {
        let deleteLoad = {
          id,
          index,
        };
        this.$store.dispatch("coord/deleteContenido", deleteLoad);
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
        nombre_plantilla: "",
        unidad: [
          {
            titulo_unidad: "",
            descripcion: "",
            tema: [
              {
                titulo_tema: "",
              },
            ],
          },
        ],
      };
      this.contenido = {
        nombre_plantilla: "",
        unidad: [
          {
            titulo_unidad: "",
            descripcion: "",
            tema: [
              {
                titulo_tema: "",
              },
            ],
          },
        ],
      };
      this.editCont = {
        nombre_plantilla: "",
        unidad: [
          {
            titulo_unidad: "",
            descripcion: "",
            tema: [
              {
                titulo_tema: "",
              },
            ],
          },
        ],
      };
    },
    submitForm(e) {
      this.$v.$touch();
      this.errors = 0;

      if (this.$v.contenido.$invalid) {
        this.unauthorized("El nombre del contenido contiene algun error");
      } else {
        let unidades = this.contenido.unidad;
        unidades.forEach((unidad) => {
          if (unidad.titulo_unidad == "" || unidad.descripcion == "") {
            this.unauthorized("Faltan datos por completar");
            this.errors++;
          }
          let temas = unidad.tema;
          temas.forEach((tema) => {
            if (tema.titulo_tema == "") {
              this.unauthorized("Faltan datos por completar");
              this.errors++;
            }
          });
        });
      }

      if (this.errors == 0) {
        e.preventDefault();

        const url = "contenido/create_contenido";
        this.$api
          .post(url, this.contenido, {
            headers: {
              token: Cookies.read("token"),
            },
          })
          .then((response) => {
            let msg = response.data.msg;
            this.successMSG(msg);
            setTimeout(() => {
              this.$store.dispatch("coord/getContenidos");
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
      this.errors = 0;
      this.$v.editCont.$touch();
      if (this.$v.editCont.$invalid) {
        this.unauthorized("Alguno de los datos no son validos");
      } else {
        let unidades = this.editCont.unidad;
        unidades.forEach((unidad) => {
          if (unidad.titulo_unidad == "" || unidad.descripcion == "") {
            this.unauthorized("Faltan datos por completar");
            this.errors++;
          }
          let temas = unidad.tema;
          temas.forEach((tema) => {
            if (tema.titulo_tema == "") {
              this.unauthorized("Faltan datos por completar");
              this.errors++;
            }
          });
        });
        if (this.errors == 0) {
          e.preventDefault();
          this.form = {
            nombre_plantilla: this.editCont.nombre_plantilla,
            unidad: this.editCont.unidad,
          };
          let url =
            "contenido/update_contenido/" +
            this.editCont.id_cont;
          this.$api
            .post(url, this.form)
            .then((response) => {
              let type = response.data.type;
              if (type == "success") {
                this.$store.dispatch("coord/getContenidos");
                this.successMSG("Plantilla modificada con exito!");
                setTimeout(() => {
                  this.cleanForm();
                  this.modals.editModal = false;
                  this.editCont.nombre_plantilla = "";
                  this.editCont.id_cont = "";
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
        } else {
          this.unauthorized("Se encontro algun error en el formulario");
        }
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
  