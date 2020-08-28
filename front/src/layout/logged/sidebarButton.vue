<template>
  <div class="menu" @click="open">Menu</div>
</template>


<script>
import { eventBus } from "../../main";
export default {
  data() {
    return {
    };
  },
  methods: {
    open() {
      this.sideBar = !this.sideBar;
      eventBus.toggleState(this.sideBar);
    }

  },
};
</script>