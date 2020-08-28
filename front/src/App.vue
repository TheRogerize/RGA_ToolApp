<template>
  <div id="app">
    <div class="primaryWrapper">
      <main>
        <side-bar v-if="isLoggedIn" :sideBar="toggleSide" :key="componentSide"></side-bar>
        <div class="toggleIt" :style="toggleSide ? toggleSidebar_open : toggleSidebar_close "></div>
        <div class="mainTemplate">
          <router-view name="header"></router-view>
          <sideButton></sideButton>
          <fade-transition origin="center" mode="out-in" :duration="250">
            <router-view />
          </fade-transition>
          <router-view name="footer"></router-view>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import { eventBus } from "./main";
import sidebar from "./layout/logged/sidebar.vue";
import sideButton from "./layout/logged/sidebarButton.vue";
import Cookies from "./utils/Cookies";
export default {
  components: {
    FadeTransition,
    "side-bar": sidebar,
    sideButton,
  },

  data() {
    return {
      sideBar: false,
      toggleSide: false,
      toggleSidebar_open: {
        marginLeft: "23%",
      },
      toggleSidebar_close: {
        marginLeft: "0%",
      },
    };
  },
  methods: {
    open() {
      this.sideBar = !this.sideBar;
      eventBus.toggleState(this.sideBar);
    },
  },
  computed: {
    isLoggedIn() {
      this.toggleSide = false;
      return this.$store.getters["user/isLoggedIn"];
    },
    componentSide() {
      this.toggleSide = false;
      return this.$store.getters["user/componentSide"];
    },
  },
  mounted() {},
  created() {
    console.log(process.env);
    console.log(process.env.PORT);
    eventBus.$on("toggleState", (toggle) => {
      this.toggleSide = toggle;
    });
  },
};
</script>

<style >
.toggleIt {
  position: relative;
  height: 100vh;
  transition: 0.7s;
}
</style>
