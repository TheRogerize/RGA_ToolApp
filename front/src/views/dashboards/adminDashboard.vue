<template>
  <section class="adminDashboard">
    <div class="menu" @click="open">Menú</div>
    <div class="cardCounts">
      <div class="card">
        <div class="color shadowRed">
          <div class="cardNumberPosition">
            <span v-if="universities">
              <div class="cardNumber" v-if="universities.length">{{universities.length}}</div>
              <div class="cardNumber" v-else>0</div>
            </span>
            <span v-else>
              <div class="cardNumber">0</div>
            </span>
          </div>
        </div>
        <p>Registradas</p>
        <h1>Universidades</h1>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-12 mt-5 mt-lg-0">
        <tabs fill class="flex-column flex-md-row">
          <card shadow>
            <tab-pane title="Universidades">
              <Universities></Universities>
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

  computed: {
    universities() {
      let universities = this.$store.getters["admin/getUniversities"];
      return universities;
    },
  },

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
  
