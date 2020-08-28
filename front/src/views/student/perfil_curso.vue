<template>
  <section class="main" style="height: 100%;">
    <div class="col-md-7">
      <modal
        :show.sync="modals.uploadModal"
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
              <h5>Adjunta tu nuevo documento</h5>
            </div>
          </template>
          <template>
            <form
              @submit.prevent="uploadFile"
              enctype="multipart/form-data"
              ref="form"
              action
              method="post"
            >
              <label for="name">Ingresa el nombre de tu tarea</label>
              <base-input
                name="file_name"
                id="file_name"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre del archivo"
                v-model="$v.cloudName.$model"
              ></base-input>
              <div class="invalid-input" v-if="$v.cloudName.$dirty">
                <span v-if="!$v.cloudName.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.cloudName.minLength"
                >El nombre debe poseer al menos {{$v.cloudName.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.cloudName.maxLength"
                >El nombre no debe ser mayor a {{$v.cloudName.$params.maxLength.max}} caracteres</span>
              </div>
              <input type="hidden" name="upload_preset" value="contenidos" />

              <label for="file-input">Adjuntar tarea</label>
              <input
                class="uploadFile"
                id="file-input"
                name="file"
                type="file"
                @change="inputDidChange($event)"
              />
              <transition name="fade">
                <div class="invalid-input" v-if="errorFile">
                  <span>{{errorFileMSG}}</span>
                </div>
              </transition>
              <div class="col-12 mt-2">
                <p class="text-success font-weight-bold mb-0" v-if="showProgress">Progreso de subida</p>
                <base-progress
                  class="pt-0"
                  type="primary"
                  :value="progress"
                  v-if="showProgress"
                  :label="cloudName"
                ></base-progress>
                <img id="uploaded" />
                <div id="results"></div>
              </div>
              <transition name="fade">
                <div class="invalid-input" v-if="uploadSuccess">
                  <span class="validMsg mb-3">{{successMSG}}</span>
                </div>
              </transition>
              <input class="rgaButton rgaBlue" type="submit" value="Enviar" />
            </form>
          </template>
        </card>
      </modal>
    </div>
    <header class="header">
      <div class="date">
        <h3>{{currentDate}}</h3>
      </div>
    </header>
    <div class="cursoInfo">
      <div class="infoLeft">
        <div class="cursoTitle cardShadow">
          <div class="cursoHeader" v-if="perfil_curso && !loadingInfo">
            <h2>{{perfil_curso.nombre_aula}} - {{perfil_curso.seccion}}</h2>
            <p>
              Sección:
              <b>{{perfil_curso.seccion}}</b>
            </p>
            <span v-if="profInfo">
              <p>
                Profesor:
                <b>{{profInfo.userID.nombre}} {{profInfo.userID.apellido}}</b>
              </p>
            </span>
            <p>ID de Curso: {{perfil_curso._id}}</p>
          </div>
          <div class="cursoHeader spinners" v-if="loadingInfo">
            <div class="spinner-block">
              <div class="spinner spinner-3"></div>
            </div>
          </div>
        </div>

        <div class="cursoPosts" v-if="perfil_curso">
          <h2 id="actualizaciones">Información del curso</h2>
          <div
            class="post cardShadow"
            v-for="(unidad, unidadIndex) in perfil_curso.unidad"
            :key="unidadIndex"
          >
            <h2>{{unidad.titulo_unidad}}</h2>
            <p class="mb-3">{{unidad.descripcion}}</p>
            <div class="postInfo">
              <div v-for="(tema, temaIndex) in unidad.tema" :key="temaIndex">
                <b>- Tema: {{tema.titulo_tema}}</b>
                <br />
                <p class="mb-1" v-if="tema.contenido.length">Anexos:</p>
                <ul class="fileList">
                  <li
                    class="fileLink"
                    v-for="(contenido, contenidoIndex) in tema.contenido"
                    :key="contenidoIndex"
                  >
                    <a
                      class="link"
                      :href="' '+ contenido.documento_url"
                      target="_blank"
                    >{{contenido.documento_nombre}}</a>
                  </li>
                </ul>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div class="cursoPosts spinners" v-else style="margin-top:150px;">
          <div class="spinner-block" v-if="loadingInfo">
            <div class="spinner spinner-3"></div>
          </div>
          <h2 v-else>No se encontró el contenido del curso</h2>
        </div>
      </div>
      <div class="infoRight">
        <div class="listContainer">
          <div class="cursoTitle">
            <div class="cursoHeader">
              <h3>Tareas del Curso</h3>
            </div>
          </div>
          <div class="spinners" v-if="!tareas">
            <div class="spinner-block">
              <div class="spinner spinner-3"></div>
            </div>
          </div>
          <div class="cursoTitle" v-show="tareas && !tareas.length">
            <div class="cursoHeader">
              <p>El docente aún no ha agregado tareas a este curso</p>
            </div>
          </div>
          <div class="studentList" v-show="tareas && tareas.length">
            <div class="tasksList">
              <div v-for="(tarea, tareaIndex) in tareas" :key="tareaIndex" class="task">
                <div class="image"></div>
                <div class="taskBody">
                  <p>{{tarea.titulo_tarea}}</p>
                  <small>{{tarea.descripcion}}</small>
                  <span v-if="tarea.documento.documento_url">
                    Anexo: &nbsp;
                    <a
                      class="taskLink"
                      :href="' '+ tarea.documento.documento_url"
                      target="_blank"
                    >{{tarea.documento.documento_nombre}}</a>
                  </span>

                  <small>Fecha de creacion: {{tarea.createdAt | moment("DD-MM-YYYY")}}</small>
                  <small>Fecha de entrega: {{tarea.fecha_entrega | moment("DD-MM-YYYY")}}</small>
                </div>
                <div class="pendingButtons alignCenter">
                  <div class="wrapper alignCenter" style="margin: auto 0px;">
                    <button
                      class="acceptButton"
                      @click="abrirEntrega(tarea)"
                      v-if="checkTarea(tarea.entregados)"
                    >
                      <i class="ni ni-fat-add"></i>
                    </button>
                    <a class="entregada" style="color:#64d664" v-else>Entregada</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="listContainer">
          <div class="cursoTitle">
            <div class="cursoHeader">
              <h2>Estudiantes</h2>
            </div>
          </div>
          <div class="spinners" v-if="!students">
            <div class="spinner-block">
              <div class="spinner spinner-3"></div>
            </div>
          </div>
          <div class="cursoTitle" v-show="students && !students.length">
            <div class="cursoHeader">
              <p>No se encontraron estudiantes en este curso</p>
            </div>
          </div>
          <div class="studentList" v-show="students && students.length">
            <ul>
              <li v-for="(student, studentIndex) in students" :key="studentIndex">
                <div class="image"></div>
                <p>{{student.nombre}} {{student.apellido}} ({{student.correo}})</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  email,
  numeric,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import { eventBus } from "../../main";
import Modal from "@/components/Modal.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import { mapGetters } from "vuex";
import axios from "axios";
import Universities from "@/views/admin/adminIncludes/universities.vue";
import Teachers from "@/views/admin/adminIncludes/teachers.vue";
import router from "../../router";
import Cookies from "../../utils/Cookies";

export default {
  data() {
    const progressBarOptions = {
      text: {
        shadowColor: "black",
        fontSize: 14,
        fontFamily: "Helvetica",
        dynamicPosition: true,
      },
      progress: {
        color: "#E8C401",
        backgroundColor: "#000000",
      },
      layout: {
        height: 35,
        width: 140,
        type: "line",
        progressPadding: 0,
        verticalTextAlign: 63,
      },
    };
    return {
      usuarioID: "",
      tareas: [],
      currentDate: new Date().toLocaleString(),
      perfil_curso: null,
      profInfo: null,
      classroomID: "",
      unidadID: "",
      temaID: "",
      xhr: null,
      results: null,
      file: null,
      filesSelected: 0,
      cloudName: "",
      tarea_id: "",
      sideBar: false,
      showProgress: false,
      progress: 0,
      options: progressBarOptions,
      formData: null,
      errorFile: false,
      errorFileMSG: "",
      newFile: null,
      uploadSuccess: false,
      successMSG: "",
      loadingInfo: true,

      modals: {
        uploadModal: false,
      },
    };
  },
  validations: {
    cloudName: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(40),
    },
    files: {
      file_name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40),
      },
      file_preset: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(40),
      },
    },
  },
  created() {
    this.loadingInfo = true;
    this.$store.dispatch("classroom/getCursoInfo", this.$route.params.id);
    this.$store.dispatch("classroom/getStudents", this.$route.params.id);
    this.$store.dispatch("classroom/getTareas", this.$route.params.id);
  },

  computed: {
    ...mapGetters({
      permiso: "user/getPermiso",
      userID: "user/getID",
      isLoggedIn: "user/isLoggedIn",
      curso_info: "classroom/getCursoInfo",
      estudiantes: "classroom/getStudents",
      tareas_info: "classroom/getTareas",
      prof_info: "coord/getProfesorInfo",
    }),
  },
  watch: {
    userID: {
      handler(id) {
        if (id) {
          this.usuarioID = id;
        }
      },
      immediate: true,
    },
    curso_info: {
      handler(info) {
        if (info) {
          this.perfil_curso = info;
          if (this.perfil_curso.profesorID._id) {
            this.getProfesor(this.perfil_curso.profesorID._id);
            this.loadingInfo = false;
          }
        }
      },
      immediate: true,
    },
    prof_info: {
      handler(prof) {
        if (prof) {
          this.profInfo = prof;
        }
      },
      immediate: true,
    },
    estudiantes: {
      handler(estudInfo) {
        if (estudInfo) {
          this.students = estudInfo.students;
        }
      },
      immediate: true,
    },
    tareas_info: {
      handler(info) {
        if (info) {
          this.tareas = info;
        }
      },
      immediate: true,
    },
  },

  methods: {
    abrirEntrega(tarea) {
      this.modals.uploadModal = true;
      this.tarea_id = tarea._id;
    },
    checkTarea(entregados) {
      let count = 0;
      entregados.forEach((entrega) => {
        if (entrega.user._id) {
          if (this.usuarioID == entrega.user._id) {
            count++;
          }
        }
      });
      if (count == 0) {
        return true;
      } else {
        return false;
      }
    },
    getProfesor(id) {
      this.$store.dispatch("coord/getProfesorInfo", id);
    },

    cleanUploadForm() {
      this.cloudName = "";
      this.classroomID = "";
      this.tarea_id = "";
      this.unidadID = "";
      this.temaID = "";
      this.modals.uploadModal = false;
    },

    unauthorized: function (message) {
      this.errorFileMSG = message;
      this.errorFile = true;
      const that = this;
      setTimeout(function () {
        that.errorFile = false;
      }, 3000);
    },
    successUploadFile: function (message) {
      this.successMSG = message;
      this.uploadSuccess = true;
      const that = this;
      setTimeout(function () {
        that.uploadSuccess = false;
      }, 3000);
    },

    ajaxSuccess(e) {
      document.getElementById("results").innerText = this.xhr.response;
    },
    ajaxError(err) {
      console.log("error", err);
    },
    onProgress(percent) {
      if (!this.showProgress) {
        this.showProgress = true;
      }
      if (percent === 100) {
        setTimeout(() => {
          this.showProgress = false;
        }, 3500);
      }
      //update vue
      this.progress = percent;
    },

    inputDidChange(e) {
      let inputData = e.target.files[0];
      this.newFile = new FormData(this.$refs.form);
    },
    uploadFile() {
      if (!this.$v.cloudName.$invalid) {
        this.uploadImage(this.newFile, 1, this.onProgress);
      } else {
        this.unauthorized("Por favor, ingresa un nombre para el archivo");
      }
    },

    uploadImage(data, listingId, onProgress) {
      const url = process.env.VUE_APP_CLOUDINARY_KEY;
      let config = {
        onUploadProgress(progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (onProgress) onProgress(percentCompleted);
          return percentCompleted;
        },
      };
      return axios
        .post(url, data, config)
        .then((x) => {
          const uploadResponse = JSON.parse(x.request.response);
          const documento_url = uploadResponse.url;
          const documento_nombre = this.cloudName;
          const tareaid = this.tarea_id;
          const dataLoad = {
            documento_url,
            documento_nombre,
            tareaid,
          };
          const token = Cookies.read("token");
          const url = "http://localhost:3000/api/tareas/entregar_tarea";
          axios
            .post(url, dataLoad, {
              headers: {
                token: token,
              },
            })
            .then((data) => {
              this.cleanUploadForm();
              this.successUploadFile("Archivo subido exitosamente");
              this.$v.$reset();
              this.$store.dispatch(
                "classroom/getTareas",
                this.$route.params.id
              );
            })

            .catch((error) => {
              let code = error.response.status;
              let message = error.response.data.message;
              if (code == 401) {
                this.unauthorized(message);
              } else {
                this.unauthorized("Ocurrio un error");
              }
            });
        })
        .catch((error) => {
          this.unauthorized("Ocurrio un error al subir tu archivo");
        });
    },
  },
  components: {
    Modal,
    Tabs,
    TabPane,
    Universities,
    Teachers,
  },
};
</script>

<style scoped>
</style>
  
