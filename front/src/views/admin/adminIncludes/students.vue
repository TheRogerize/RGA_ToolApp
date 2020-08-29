<template>
  <section class="adminDashboard" style>
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

              <label for>Numero Telefonico</label>
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
                <base-button
                  type="submit"
                  class="my-4 primary"
                  @click="submitForm"
                >Registrar {{newUniversity.submitStatus}}</base-button>
              </div>
            </form>
          </template>
        </card>
      </modal>
    </div>
    <div class="cardCounts">
      <div class="card">
        <div class="color shadowRed">
          <div class="cardNumberPosition">
            <div class="cardNumber">3</div>
          </div>
        </div>
        <p>Aliados</p>
        <h1>Universidades</h1>
      </div>
      <div class="card">
        <div class="color shadowBlue">
          <div class="cardNumberPosition">
            <div class="cardNumber">3</div>
          </div>
        </div>
        <p>Registrados</p>
        <h1>Docentes</h1>
      </div>
      <div class="card">
        <div class="color shadowPurple">
          <div class="cardNumberPosition">
            <div class="cardNumber">3</div>
          </div>
        </div>
        <p>Inscritos</p>
        <h1>Estudiantes</h1>
      </div>
    </div>
    <div class="card universitiesList">
      <!-- Card header -->
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

          <li v-for="university in universities" :key="university.id" class="list-group-item px-0">
            <div class="row align-items-center">
              <div class="col-auto"></div>
              <div class="col ml--2">
                <h4 class="mb-0">
                  <a href="#!">{{university.name}}</a>
                </h4>
                <span :class="`text-${university.email}`">- &nbsp;</span>
                <small>{{university.username}}</small>
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
import Modal from "@/components/Modal.vue";

export default {
  data() {
    return {
      newUniversity: {
        name: "",
        siglas: "",
        date: "",
        email: "",
        phone: "",
        submitStatus: "",
      },
      modals: {
        modal1: false,
        modal2: false,
        uniModal: false,
      },
      form: null,
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
      phone: {
        required,
        numeric,
        minLength: minLength(11),
      },
    },
  },

  created() {
    this.$store.dispatch("admin/getUniversities");
  },

  computed: {
    universities() {
      let universities = this.$store.getters["admin/getUniversities"];
      return universities;
    },
  },

  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.newUniversity.submitStatus = "FAILED VALIDATION";
      } else {
        this.form = {
          name: this.newUniversity.name,
          siglas: this.newUniversity.siglas,
          email: this.newUniversity.email,
          phone: this.newUniversity.phone,
        };
        this.newUniversity.submitStatus = "VALIDATION SUCCEED";
        this.$store.dispatch("admin/registerUniversity", this.form);
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
  
