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
              <label for="name">Nombre del archivo</label>
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

              <label for="file-input">Adjuntar archivo</label>
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
              <input class="rgaButton rgaBlue" type="submit" value="Cargar" />
            </form>
          </template>
        </card>
      </modal>
    </div>
    <div class="col-md-7">
      <modal
        :show.sync="modals.tareaModal"
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
              <h5>Crear una nueva tarea</h5>
            </div>
          </template>
          <template>
            <form
              @submit.prevent="uploadTareaFile"
              enctype="multipart/form-data"
              ref="form2"
              action
              method="post"
            >
              <label for="name">Título de tarea</label>
              <base-input
                name="titulo_tarea"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Ingresa un Título"
                v-model="$v.tarea.titulo_tarea.$model"
              ></base-input>
              <div class="invalid-input" v-if="$v.tarea.titulo_tarea.$dirty">
                <span v-if="!$v.tarea.titulo_tarea.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.tarea.titulo_tarea.minLength"
                >El título de la tarea debe poseer al menos {{$v.tarea.titulo_tarea.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.tarea.titulo_tarea.maxLength"
                >El título de la tarea no debe ser mayor a {{$v.tarea.titulo_tarea.$params.maxLength.max}} caracteres</span>
              </div>
              <label for="name">Descripción de tarea</label>
              <base-input
                name="descripcion"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Ingresa una Descripción"
                v-model="$v.tarea.descripcion.$model"
              ></base-input>
              <div class="invalid-input" v-if="$v.tarea.descripcion.$dirty">
                <span v-if="!$v.tarea.descripcion.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.tarea.descripcion.minLength"
                >La descripcion de la tarea debe poseer al menos {{$v.tarea.descripcion.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.tarea.descripcion.maxLength"
                >La descripcion de la tarea no debe ser mayor a {{$v.tarea.descripcion.$params.maxLength.max}} caracteres</span>
              </div>

              <label for="name">Fecha de entrega</label>
              <input
                type="date"
                class="datepick"
                v-model="$v.tarea.fecha_entrega.$model"
                :min="new Date().toISOString().slice(0,10)"
                max="2040-01-01"
              />
              <div class="invalid-input" v-if="$v.tarea.fecha_entrega.$dirty">
                <span v-if="!$v.tarea.fecha_entrega.required">Debes escoger una fecha de entrega</span>
              </div>

              <label for="name">Nombre del archivo</label>
              <base-input
                name="file_name"
                id="tarea_filename"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Ingresa un nombre para el archivo"
                v-model="$v.tarea.cloudName.$model"
              ></base-input>
              <div class="invalid-input" v-if="$v.tarea.cloudName.$dirty">
                <span v-if="!$v.tarea.cloudName.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.tarea.cloudName.minLength"
                >El nombre debe poseer al menos {{$v.tarea.cloudName.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.tarea.cloudName.maxLength"
                >El nombre no debe ser mayor a {{$v.tarea.cloudName.$params.maxLength.max}} caracteres</span>
              </div>
              <input type="hidden" name="upload_preset" value="contenidos" />
              <label for="file-input">Adjuntar archivo</label>
              <input
                class="uploadFile"
                name="file"
                type="file"
                @change="inputTareaDidChange($event)"
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
              <input class="rgaButton rgaBlue" type="submit" value="Cargar" />
            </form>
          </template>
        </card>
      </modal>
    </div>
    <div class="col-md-7">
      <modal
        :show.sync="modals.entregasModal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-4 py-lg-4"
          class="border-0"
          style="overflow:auto;height:auto; max-height: 570px;"
        >
          <template v-show="detalleEntregas">
            <div class="text-muted text-center mb-3">
              <h5>{{detalleEntregas.titulo_tarea}}</h5>
              <p class="smallDescription">{{detalleEntregas.descripcion}}</p>
            </div>
            <hr />
          </template>
          <template v-if="entregasExist">
            <div class="text-muted text-center mb-3">
              <h5>Recibidas:</h5>
            </div>
            <div class="entregasRow">
              <div class="entrega" v-for="(entrega, indexEntrega) in entregas" :key="indexEntrega">
                <div class="image"></div>
                <div class="entregaBody">
                  <p>Estudiante: {{entrega.user.nombre}} {{entrega.user.apellido}}</p>
                  <p>Correo: {{entrega.user.correo}}</p>Archivo adjunto: &nbsp;
                  <a
                    class="taskLink"
                    :href="' '+ entrega.documento_url"
                    target="_blank"
                  >{{entrega.documento_nombre}}</a>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="text-muted text-center mb-3">
              <h5>No hay ninguna entrega aún</h5>
            </div>
          </template>
        </card>
      </modal>
    </div>
    <header class="header">
      <div class="date">
        <h3>{{currentDate}}</h3>
      </div>
    </header>
    <!-- Titulo de curso -->
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
                    <button
                      @click="deleteFile(perfil_curso._id, unidad._id, tema._id,contenido._id, unidadIndex, temaIndex, contenidoIndex)"
                    >
                      <i class="ni ni-fat-remove"></i>
                    </button>
                  </li>
                </ul>
                <span class="addFileLink">
                  <a
                    @click="uploadFileModal(perfil_curso._id, unidad._id, tema._id)"
                  >Adjuntar nuevo archivo</a>
                </span>
                <br />
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
      <!--  Proximas entregas   -->
      <div class="infoRight">
        <div class="listContainer">
          <div class="cursoTitle">
            <div class="cursoHeader">
              <h2>Estudiantes</h2>
              <button class="exportar" @click="estudiantesPDF()">
                <i class="fas fa-print"></i>
              </button>
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
              <p>Aún no has agregado ninguna tarea al curso</p>
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
                  <a
                    class="taskLink"
                    @click="getEntregas(perfil_curso._id, tarea._id, tarea)"
                  >Ver entregas</a>
                </div>
                <div class="pendingButtons alignCenter">
                  <div class="wrapper alignCenter" style="margin: auto 0px;">
                    <!--
                        @click="decline(pending._id, pendingIndex)"
                    -->
                    <button
                      class="declineButton"
                      @click="deleteTarea(perfil_curso._id, tarea._id, tareaIndex)"
                    >
                      <i class="ni ni-fat-remove"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="agregarTarea">
            <a class="agregar" @click="modals.tareaModal = true">
              <i class="ni ni-fat-add"></i> Nueva tarea
            </a>
          </div>
        </div>
        <div class="listContainer">
          <div class="cursoTitle">
            <div class="cursoHeader">
              <h3>Peticiones pendientes</h3>
            </div>
          </div>
          <div class="spinners" v-if="!pendings">
            <div class="spinner-block">
              <div class="spinner spinner-3"></div>
            </div>
          </div>
          <div class="cursoTitle" v-show="pendings && !pendings.length">
            <div class="cursoHeader">
              <p>No hay peticiones de acceso pendientes</p>
            </div>
          </div>
          <div class="studentList" v-show="pendings && pendings.length">
            <ul>
              <li v-for="(pending, pendingIndex) in pendings" :key="pendingIndex">
                <div class="image"></div>
                <p>{{pending.nombre}} {{pending.apellido}}</p>
                <div class="pendingButtons">
                  <div class="wrapper">
                    <button
                      class="acceptButton"
                      @click="acceptPending(perfil_curso._id, pending._id, pendingIndex)"
                    >
                      <i class="ni ni-check-bold"></i>
                    </button>
                    <!--
                      @click="decline(pending._id, pendingIndex)"
                    -->
                    <button
                      class="declineButton"
                      @click="declinePending(perfil_curso._id, pending._id, pendingIndex)"
                    >
                      <i class="ni ni-fat-remove"></i>
                    </button>
                  </div>
                </div>
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
import { eventBus } from "../main";
import Modal from "@/components/Modal.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import { mapGetters } from "vuex";
//import CircularJSON from 'circular-json';
import Universities from "@/views/admin/adminIncludes/universities.vue";
import Teachers from "@/views/admin/adminIncludes/teachers.vue";
import router from "../router";
import Cookies from "../utils/Cookies";

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

      pendings: [],
      students: [],
      tareas: [],
      currentDate: new Date().toLocaleString(),
      tarea: {
        titulo_tarea: "",
        descripcion: "",
        cloudName: "",
        fecha_entrega: new Date().toISOString().slice(0, 10),
        documento: {
          documento_nombre: "",
          documento_url: "",
        },
        classroomID: this.$route.params.id,
      },
      detalleEntregas: [],
      entregas: [],
      entregasExist: false,
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
      sideBar: false,
      showProgress: false,
      progress: 0,
      options: progressBarOptions,
      formData: null,
      errorFile: false,
      errorFileMSG: "",
      newFile: null,
      newTareaFile: null,
      uploadSuccess: false,
      successMSG: "",
      loadingInfo: true,

      modals: {
        uploadModal: false,
        tareaModal: false,
        entregasModal: false,
      },
    };
  },
  validations: {
    tarea: {
      titulo_tarea: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40),
      },
      descripcion: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(150),
      },
      fecha_entrega: {
        required,
      },
      cloudName: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40),
      },
    },
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
    //Llamar action que consume la API
    this.$store.dispatch("classroom/getCursoInfo", this.$route.params.id);
    this.$store.dispatch("classroom/getStudents", this.$route.params.id);
    this.$store.dispatch("classroom/getTareas", this.$route.params.id);
  },
  async mounted() {
    // note this function
    try {
      await this.$store.dispatch(
        "classroom/getPendingUsers",
        this.$route.params.id
      );
    } catch (e) {
    }
  },
  computed: {
    ...mapGetters({
      permiso: "user/getPermiso",
      userID: "user/getID",
      isLoggedIn: "user/isLoggedIn",
      curso_info: "classroom/getCursoInfo",
      pendientes: "classroom/getPendingUsers",
      estudiantes: "classroom/getStudents",
      tareas_info: "classroom/getTareas",
      prof_info: "coord/getProfesorInfo",
    }),
  },
  watch: {
    curso_info: {
      handler(info) {
        if (info) {
          //
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
    pendientes: {
      handler(pendingsInfo) {
        if (pendingsInfo) {
          this.pendings = pendingsInfo.pending_invitation;
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
    estudiantesPDF() {
      const classroomID = this.perfil_curso._id;
      if (confirm("¿Deseas obtener un reporte de todos los estudiantes?")) {
        this.$store.dispatch("classroom/estudiantesPDF", classroomID);
      }
    },
    acceptPending(roomid, userid, index) {
      let payload = {
        roomid,
        userid,
        index,
      };
      this.$store.dispatch("classroom/acceptPending", payload);
    },
    declinePending(roomid, userid, index) {
      if (confirm("¿Estas seguro de que deseas rechazar a este estudiante?")) {
        let payload = {
          roomid,
          userid,
          index,
        };
        this.$store.dispatch("classroom/declinePending", payload);
      }
    },
    deleteTarea(roomid, tareaid, index) {
      if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        let payload = {
          roomid,
          tareaid,
          index,
        };
        this.$store.dispatch("classroom/deleteTarea", payload);
      }
    },
    getEntregas(roomid, tareaid, tarea) {
      this.detalleEntregas = tarea;
      let probar = tarea.entregados;
      if (tarea.entregados.length > 0) {
        this.entregas = tarea.entregados;
        this.entregasExist = true;
      } else {
        this.entregasExist = false;
      }
      const payload = {
        roomid,
        tareaid,
      };
      this.modals.entregasModal = true;
    },
    getProfesor(id) {
      this.$store.dispatch("coord/getProfesorInfo", id);
    },
    deleteFile(
      classroomID,
      unidadID,
      temaID,
      contenidoID,
      unidadIndex,
      temaIndex,
      contenidoIndex
    ) {
      if (confirm("¿Deseas eliminar este archivo del tema?")) {
        const deleteLoad = {
          classroomID,
          unidadID,
          temaID,
          contenidoID,
          unidadIndex,
          temaIndex,
          contenidoIndex,
        };
        this.$store.dispatch("classroom/deleteFile", deleteLoad);
      }
    },
    uploadFileModal(classroomID, unidadID, temaID) {
      this.classroomID = classroomID;
      this.unidadID = unidadID;
      this.temaID = temaID;
      this.modals.uploadModal = true;
    },
    cleanUploadForm() {
      this.cloudName = "";
      this.classroomID = "";
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

          // execute the callback
          if (onProgress) onProgress(percentCompleted);
          return percentCompleted;
        },
      };
      return this.$api
        .post(url, data, config)
        .then((x) => {
          const uploadResponse = JSON.parse(x.request.response);
          const documento_url = uploadResponse.url;
          const documento_nombre = this.cloudName;
          const dataLoad = {
            documento_url,
            documento_nombre,
            unidadID: this.unidadID,
            temaID: this.temaID,
            classroomID: this.classroomID,
          };
          const url = "classroom/add_archivo";

          this.$api
            .post(url, dataLoad)
            .then((data) => {
              this.cleanUploadForm();
              this.successUploadFile("Archivo subido exitosamente");
              this.$store.dispatch(
                "classroom/getCursoInfo",
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

    inputTareaDidChange(e) {
      let inputData = e.target.files[0];
      this.newTareaFile = new FormData(this.$refs.form2);
    },
    uploadTareaFile() {
      if (!this.$v.tarea.$invalid) {
        this.crearTarea(this.newFile, 1, this.onProgress);
      } else {
        this.unauthorized("Por favor, ingresa todos los datos correctamente");
      }
    },

    crearTarea(data, listingId, onProgress) {
      const url = process.env.VUE_APP_CLOUDINARY_KEY;
      let config = {
        onUploadProgress(progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          // execute the callback
          if (onProgress) onProgress(percentCompleted);
          return percentCompleted;
        },
      };
      return this.$api
        .post(url, data, config)
        .then((x) => {
          const uploadResponse = JSON.parse(x.request.response);
          const documento_url = uploadResponse.url;
          const documento_nombre = this.tarea.cloudName;
          this.tarea.documento.documento_nombre = documento_nombre;
          this.tarea.documento.documento_url = documento_url;
          const url = "tareas/create_tarea";
          const token = Cookies.read("token");

          this.$api
            .post(url, this.tarea, {
              headers: {
                token: token,
              },
            })
            .then((data) => {
              this.cleanUploadForm();
              this.successUploadFile("Archivo subido exitosamente");
              this.$store.dispatch(
                "classroom/getTareas",
                this.$route.params.id
              );
              this.tarea.titulo_tarea = "";
              this.tarea.descripcion = "";
              this.tarea.documento.documento_nombre = "";
              this.tarea.cloudName = "";
              this.tarea.fecha_entrega = new Date().toISOString().slice(0, 10);
              this.tarea.documento.documento_url = "";
              this.$v.tarea.$reset();
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
