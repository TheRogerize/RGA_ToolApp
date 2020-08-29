<template>
  <section class="adminDashboard">
    <div class="cardCounts">
      <div class="card">
        <div class="color shadowRed">
          <div class="cardNumberPosition">
            <div class="cardNumber" v-if="coordinadores.length">{{coordinadores.length}}</div>
            <div class="cardNumber" v-else>0</div>
          </div>
        </div>
        <p>Registrados</p>
        <h1>Coordinadores</h1>
      </div>
      <div class="card">
        <div class="color shadowBlue">
          <div class="cardNumberPosition">
            <div class="cardNumber" v-if="facultades.length">{{facultades.length}}</div>
            <div class="cardNumber" v-else>0</div>
          </div>
        </div>
        <p>Creadas</p>
        <h1>Facultades</h1>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-12 mt-5 mt-lg-0">
        <!-- Menu -->

        <tabs fill class="flex-column flex-md-row">
          <card shadow>
            <tab-pane title="Coordinadores">
              <coordinadores></coordinadores>
            </tab-pane>

            <tab-pane title="Facultades">
              <facultades></facultades>
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
import coordinadores from "@/views/university/panelIncludes/Coordinadores.vue";
import facultades from "@/views/university/panelIncludes/facultades.vue";

export default {
  computed: {
    coordinadores() {
      let coordinadores = this.$store.getters["univ/getCoordinadores"];
      return coordinadores;
    },
    facultades() {
      let facultades = this.$store.getters["univ/getFacultades"];
      return facultades;
    },
  },

  components: {
    Modal,
    Tabs,
    TabPane,
    facultades,
    coordinadores
  },
};
</script>

<style scoped>
.field {
  max-height: 40px;
}
</style>
  
