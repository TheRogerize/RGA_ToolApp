<template></template>

<script>
import { mapState } from "vuex";
import { eventBus } from "../../main";
import Modal from "@/components/Modal.vue";
import axios from "axios";
import store from "../../store/index";

export default {
  created: () => {
    socket.emit('manual_disconnect')
        store.dispatch("user/LOGOUT")
    }
};
</script>