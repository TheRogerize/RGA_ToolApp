<template>
  <section class="adminDashboard">
    <div class="menu" @click="open">Menu</div>
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

    <div class="row justify-content-center">
      <div class="col-lg-12 mt-5 mt-lg-0">
        <div class="mb-3">
          <small class="text-uppercase font-weight-bold">With text</small>
        </div>
        <tabs fill class="flex-column flex-md-row">
          <card shadow>
            <tab-pane title="Universidades">
              <Universities></Universities>
            </tab-pane>

            <tab-pane title="Profesores">
              <Teachers></Teachers>
            </tab-pane>

            <tab-pane title="Estudiantes">
              <p class="description">
                Raw denim you probably haven't heard of them jean shorts Austin.
                Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                Mustache cliche tempor, williamsburg carles vegan helvetica.
                Reprehenderit butcher retro keffiyeh dreamcatcher synth.
              </p>
            </tab-pane>
          </card>
        </tabs>
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
import Universities from "@/views/admin/adminIncludes/universities.vue";
import Teachers from "@/views/admin/adminIncludes/teachers.vue";

export default {
  data() {
    return {
      sideBar: false,
    };
  },

  created() {},

  methods: {
    open() {
      this.sideBar = !this.sideBar;
      eventBus.toggleState(this.sideBar);
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
.field {
  max-height: 40px;
}
</style>
  
