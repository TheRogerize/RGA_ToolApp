<template>
  <div class="wrapperEll">
      <adminDash v-if="permiso==0"/>
      <uniDash v-else-if="permiso==1"/>
      <coordDash v-if="permiso==2"/>
      <teacherDash v-else-if="permiso==3"/>
      <studentDash v-else-if="permiso==4"/>
  </div>
</template>

<script>
import adminDash from "./adminDashboard";
import uniDash from "./uniDashboard";
import coordDash from "./coorDashboard";
import teacherDash from "./teacherDashboard";
import studentDash from "./studentDashboard";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
        user: 1
    };
  },
  computed: {
    ...mapGetters( {permiso: 'user/getPermiso'} )
  },
  components: {
    adminDash,
    uniDash,
    coordDash,
    teacherDash,
    studentDash
  }
};
</script>