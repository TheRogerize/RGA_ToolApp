<template>
  <div class="menu" @click="open">
    <div class="menuButton" :class=" sideBar ? 'actived' : ''">
      <i class="fas fa-bars"></i>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main";
export default {
  data() {
    return {
      sideBar: false
    }
  },
  methods: {
    open() {
      this.sideBar = !this.sideBar;
      eventBus.toggleState(this.sideBar);
    }
  },
};
</script>