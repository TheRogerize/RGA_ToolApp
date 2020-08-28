<template>
  <section class="main" style="height:100%;">
    <div class="col-md-7">
      <modal
        :show.sync="modals.searchModal"
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
              <h5>Envía una petición al curso de formación al cual deseas acceder</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="sendPetition" ref="form" method="post">
              <label for="name">Código del Curso</label>
              <base-input
                name="roomid"
                id="roomid"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Código/ID del Curso"
                v-model="$v.roomID.$model"
              ></base-input>
              <div class="invalid-input" v-if="$v.roomID.$dirty">
                <span v-if="!$v.roomID.required">Debes ingresar un ID o código de curso</span>
                <span
                  v-if="!$v.roomID.minLength"
                >El ID del curso debe poseer al menos {{$v.roomID.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.roomID.maxLength"
                >El ID del curso no debe ser mayor a {{$v.roomID.$params.maxLength.max}} caracteres</span>
              </div>

              <transition name="fade">
                <div class="invalid-input" v-if="error">
                  <span>{{searchError}}</span>
                </div>
              </transition>

              <transition name="fade">
                <div class="invalid-input" v-if="success">
                  <span class="validMsg mb-3">{{searchSuccess}}</span>
                </div>
              </transition>
              <input class="rgaButton mt-2 rgaBlue" type="submit" value="Enviar petición" />
            </form>
          </template>
        </card>
      </modal>
    </div>
    <header class="header">
      <div class="welcome">
        <h3>Cursos</h3>
      </div>
    </header>
    <div class="title-courses">
      <h2>Todos los cursos</h2>
      <div class="search-filter">
        <button v-if="permiso == 4" class="buscarCurso" @click="modals.searchModal = true">
          <i class="ni ni-fat-add"></i> Buscar Curso
        </button>
      </div>
    </div>
    <div v-if="!loading">
      <div class="grid-courses" v-if="classrooms.length">
        <div to="curso/" v-for="(curso, indexCurso) in classrooms" :key="indexCurso">
          <router-link :to="permisoState+'curso/'+curso._id">
            <div class="card">
              <img src="../assets/images/img1.jpg" />
              <div class="card-contenido">
                <h4>{{curso.nombre_aula}}</h4>
                <small>{{curso.seccion}}</small>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div style="min-width:100%;" v-else>
        <h2>Aún no formas parte de ningún curso de formación.</h2>
      </div>
    </div>
  </section>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import { eventBus } from "../main";
import Modal from "@/components/Modal.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import Universities from "@/views/admin/adminIncludes/universities.vue";
import Teachers from "@/views/admin/adminIncludes/teachers.vue";
import { mapGetters } from "vuex";
import Cookies from "../utils/Cookies";

export default {
  data() {
    return {
      isActive: true,
      loading: true,
      permisoState: "",
      activeClass: "active",
      deactivateClass: "deactivate",
      modals: {
        searchModal: false,
      },
      roomID: "",
      error: false,
      success: false,
      searchError: "",
      searchSuccess: "",
    };
  },

  async mounted() {
    // note this function
    this.error = "";
    this.loading = true;
    try {
      await this.$store.dispatch("prof/getClassrooms");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  validations: {
    roomID: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(200),
    },
  },
  computed: {
    ...mapGetters({
      permiso: "user/getPermiso",
      userID: "user/getID",
      isLoggedIn: "user/isLoggedIn",
      userInfo: "user/getUserInfo",
    }),

    ...mapGetters({
      permiso: "user/getPermiso",
      classes: "prof/getClassrooms",
    }),
  },
  watch: {
    classes: {
      handler(info) {
        if (info) {
          this.classrooms = info;
        }
      },
      immediate: true,
    },
    permiso: {
      handler(perm) {
        if (perm) {
          if (perm == 4) {
            this.permisoState = "student/";
          }
        }
      },
      immediate: true, 
    },
  },

  methods: {
    errorMSG: function (message) {
      this.searchError = message;
      this.error = true;
      const that = this;
      setTimeout(function () {
        that.error = false;
      }, 6000);
    },
    successMSG: function (message) {
      this.searchSuccess = message;
      this.success = true;
      const that = this;
      setTimeout(function () {
        that.success = false;
      }, 10000);
    },
    sendPetition(e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.errorMSG("Se encontraron errores en el formulario");
      } else {
        e.preventDefault();

        const url = "classroom/invitation_room";
        const form = {
          roomID: this.roomID,
        };
        this.$api
          .post(url, form, {
            headers: {
              token: Cookies.read("token"),
            },
          })
          .then((response) => {
            let msg = response.data.message;
            this.successMSG(msg);
            setTimeout(() => {
              this.roomID = "";
              this.$v.$reset();
            }, 500);
          })
          .catch((error) => {
            let code = error.response.status;
            let msg = error.response.data.message;
            if (code == 400) {
              this.errorMSG(msg);
            } else if (code == 401) {
              this.errorMSG(msg);
            } else if (code == 500) {
              this.errorMSG(msg);
            } else {
              this.errorMSG(msg);
            }
          });
      }
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
.header {
  margin-bottom: 10px;
}
</style>