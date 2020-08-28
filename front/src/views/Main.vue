<template>
  <div class="mainComponent">
    <div class="loggedHeader">
      <component v-bind:is="header" />
    </div>
    <div class="template">
      <component v-bind:is="component" />
    </div>
  </div>
</template>

<script>
import dashboard from "./admin/dashboard.vue";
import appHeader from "../layout/AppHeader";
export default {
  components: {
    dashboard,
    appHeader
  },
  data() {
    return {
      component: "dashboard",
      header: appHeader
    };
  }
};
</script>