<template>
  <div class="card universitiesList">
    <div class="col-md-7">
      <modal
        :show.sync="modals.teachModal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card
          type="secondary"
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-4 py-lg-4"
          class="border-0"
        >
          <template>
            <div class="text-muted text-center mb-3">
              <h5>Ingresa los datos del Docente</h5>
            </div>
          </template>
          <template>
            <form @submit.prevent="submitForm">
              <label for>Nombre del Docente</label>
              <base-input
                name="fullname"
                id="fullname"
                type="text"
                alternative
                class="mb-2 field"
                placeholder="Nombre de la universidad"
                v-model="$v.newTeacher.fullname.$model"
                @input="$v.newTeacher.fullname.$touch()"
                @blur="$v.newTeacher.fullname.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newTeacher.fullname.$dirty">
                <span v-if="!$v.newTeacher.fullname.required">Debes llenar este campo</span>
                <span
                  v-if="!$v.newTeacher.fullname.minLength"
                >El nombre debe poseer al menos {{$v.newTeacher.fullname.$params.minLength.min}} caracteres</span>
                <span
                  v-if="!$v.newTeacher.fullname.maxLength"
                >El nombre no debe ser mayor a {{$v.newTeacher.fullname.$params.maxLength.max}} caracteres</span>
              </div>
              <label for>Facultad</label>
              <base-input
                name="facultad"
                id="facultad"
                type="text"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newTeacher.facultad.$error, 'is-valid':!$v.newTeacher.facultad.$invalid}"
                placeholder="Por ej: URBE"
                v-model.trim="$v.newTeacher.facultad.$model"
                @input="$v.newTeacher.facultad.$touch()"
                @blur="$v.newTeacher.facultad.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newTeacher.facultad.$dirty">
                <span v-if="!$v.newTeacher.facultad.required">Debes seleccionar una facultad</span>
              </div>
              <label for>Correo electrónico</label>
              <base-input
                name="email"
                id="email"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newTeacher.email.$error, 'is-valid':!$v.newTeacher.email.$invalid}"
                placeholder="Correo electrónico Universitario"
                addon-left-icon="ni ni-email-83"
                v-model.trim="$v.newTeacher.email.$model"
                @input="$v.newTeacher.email.$touch()"
                @blur="$v.newTeacher.email.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newTeacher.email.$dirty">
                <span v-if="!$v.newTeacher.email.required">Debes ingresar un correo</span>
                <span v-if="!$v.newTeacher.email.email">Debes ingresar un correo valido</span>
                <span v-if="!$v.newTeacher.email.maxLength">El correo ingresado es muy extenso</span>
              </div>
              <label for>Correo Universitario (Opcional)</label>
              <base-input
                name="email"
                id="email"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newTeacher.teacherEmail.$error, 'is-valid':!$v.newTeacher.teacherEmail.$invalid}"
                placeholder="Correo electrónico Universitario"
                addon-left-icon="ni ni-email-83"
                v-model.trim="$v.newTeacher.teacherEmail.$model"
                @input="$v.newTeacher.teacherEmail.$touch()"
                @blur="$v.newTeacher.teacherEmail.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newTeacher.teacherEmail.$dirty">
                <span v-if="!$v.newTeacher.teacherEmail.email">Debes ingresar un correo valido</span>
              </div>
              <label for>Numero Telefonico</label>
              <base-input
                name="phone"
                id="phone"
                alternative
                class="mb-2 field"
                :class="{'is-invalid':$v.newTeacher.phone.$error, 'is-valid':!$v.newTeacher.phone.$invalid}"
                placeholder="Ingresa el numero telefonico"
                addon-left-icon="fa fa-mobile fa-lg"
                v-model.trim="$v.newTeacher.phone.$model"
                @input="$v.newTeacher.phone.$touch()"
                @blur="$v.newTeacher.phone.$touch()"
              ></base-input>
              <div class="invalid-input" v-if="$v.newTeacher.phone.$dirty">
                <span v-if="!$v.newTeacher.phone.required">Debes ingresar un numero telefonico</span>
                <span v-if="!$v.newTeacher.phone.numeric">Debes ingresar un numero valido</span>
                <span
                  v-if="!$v.newTeacher.phone.minLength"
                >El numero de telefono debe ser de 11 digitos</span>
              </div>
              <div class="text-center">
                <base-button
                  type="submit"
                  class="my-4 primary"
                  @click="submitForm"
                >Registrar {{newTeacher.submitStatus}}</base-button>
              </div>
            </form>
          </template>
        </card>
      </modal>
    </div>
    <div class="card-header">
      <h5 class="h3 mb-0">Docentes Registrados</h5>
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush list my--3">
        <li class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col ml--2">
              <h4 class="mb-3">
                <a @click="modals.teachModal = true">Nuevo Docente</a>
              </h4>
            </div>
            <div class="col-auto mb-3">
              <a
                class="avatar rounded-circle"
                style="margin-right:40px;cursor:pointer;"
                @click="modals.teachModal = true"
              >
                <i class="ni ni-fat-add" style="font-size:50px;"></i>
              </a>
            </div>
          </div>
        </li>

        <li v-for="teacher in teachers" :key="teacher.id" class="list-group-item px-0">
          <div class="row align-items-center">
            <div class="col-auto"></div>
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="#!">{{teacher.name}}</a>
              </h4>
              <span :class="`text-${teacher.email}`">- &nbsp;</span>
              <small>{{teacher.username}}</small>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-sm btn-secondary">Modificar</button>
              <button type="button" class="btn btn-sm btn-danger">Eliminar</button>
            </div>
          </div>
        </li>
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
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import Modal from "@/components/Modal.vue";
import axios from "axios";

export default {
  data() {
    return {
      newTeacher: {
        fullname: "",
        facultad: "",
        email: "",
        teacherEmail: "",
        phone: "",
        submitStatus: "",
      },
      modals: {
        modal1: false,
        modal2: false,
        teachModal: false,
      },
      teacherForm: null,
    };
  },
  validations: {
    newTeacher: {
      fullname: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(40),
      },
      facultad: {
        required,
      },
      email: {
        required,
        email,
        maxLength: maxLength(100),
      },
      teacherEmail: {
        email,
      },
      phone: {
        required,
        numeric,
        minLength: minLength(11),
      },
    },
  },

  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.newTeacher.submitStatus = "FAILED VALIDATION";
      } else {
        this.teacherForm = {
          fullname: this.newTeacher.fullname,
          facultad: this.newTeacher.facultad,
          email: this.newTeacher.email,
          teacherEmail: this.newTeacher.teacherEmail,
          phone: this.newTeacher.phone,
        };
        this.newTeacher.submitStatus = "VALIDATION SUCCEED";
        this.$store.dispatch("admin/registerTeacher", this.teacherForm);
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
  
