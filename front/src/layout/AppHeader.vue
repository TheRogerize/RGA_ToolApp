<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type effect="light" expand>
      <a slot="brand" class="navbar-brand mr-lg-5" href="/">
        <img src="img/brand/white.png" />
      </a>

      <div class="row" slot="content-header">
        <div class="col-6 collapse-brand">
          <a href="/">
            <img src="img/brand/blue.png" />
          </a>
        </div>
      </div>
      <ul v-if="user" class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <router-link to="/" class="nav-link">{{ user.name }} {{ user.surname }}</router-link>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <a href="#" @click="logout($event)" class="nav-link">Logout</a>
        </li>
      </ul>
      <ul v-else class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item d-none d-lg-block ml-lg-3">
          <router-link to="/" class="nav-link">Inicio</router-link>
          <p v-if="isLoggedIn">{{isLoggedIn}}</p>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-3">
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-3">
          <router-link to="/profile" class="nav-link">Perfil</router-link>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-3">
          <router-link to="/login" class="nav-link">Iniciar Sesion</router-link>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-3">
          <router-link to="/register" class="nav-link">Registrar</router-link>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import { mapState } from "vuex";
import Vuex from "vuex";
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import Cookies from "../utils/Cookies";
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      user: false
    };
  },
  components: {
    BaseNav,
    BaseDropdown
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    },
    userdata(){
      console.log(this.user);
    }
  },
  created() {
    const token = Cookies.read("token");
    /*
    if (token) {
      const user = jwtDecode(token);
      this.$store.dispatch("user/LOGIN", user);
    }
    */
  },
  methods: {
    logout(e) {
      e.preventDefault();
      console.log("log out method")
      /* First we remove the token in order to stop logging the user on app start-up */
      console.log(Cookies.remove("token"));
      /* Then we clear the user object from our store */
      return this.$store.dispatch("user/LOGOUT");
    }
  }
};
</script>
<style></style>