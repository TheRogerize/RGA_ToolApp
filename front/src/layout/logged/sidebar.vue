<template>
  <div class="sidebar" style="z-index: 5;" :style="sideBar ? mySidebar : sideClose">
    <div class="sideBWrapper">
      <div class="sideLogo">
        <img class="sideBLogo" src="../../assets/logos/RGA.svg" alt />
      </div>

      <div class="userColumn">
        <div class="userImg">
          <img src="../../assets/images/img2.jpg" width="100px" height="100px" alt />
          <div class="notification"></div>
        </div>
        <div class="userInfo">
          <h2>{{username}}</h2>
          <h3 style="display:block-inline;white-space:wrap;word-break:break-all">
            RGA ID:
            <br />
            {{myInfo._id}}
          </h3>
        </div>
        <div class="sideMenu">
          <ul>
            <li
              v-for="menu in filteredMenus"
              :key="menu.title"
              :class="[currentPage.includes(menu.link) ? activeClass : '', menu.class]"
            >
              <router-link :to="menu.link" tag="span">
                <div class="wrapp" style="width: 100%;position: relative;height:100%;">
                  <img :src="require('../../assets/logos/'+menu.icon+'.svg')" />
                  {{menu.title}}
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { eventBus } from "../../main";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import Cookies from "../../utils/Cookies";

export default {
  props: ["sideBar"],
  data() {
    return {
      myInfo: {},
      username: "",

      activeClass: "active",
      menuItems: [
        {
          title: "Escritorio",
          icon: "escritorio",
          class: "",
          link: "/dashboard",
          permiso: 0,
        },
        {
          title: "Salir",
          icon: "cerrarsesion",
          class: "small",
          link: "/logout",
          permiso: 0,
        },

        //MENUS DE UNIVERSIDAD
        {
          title: "Escritorio",
          icon: "escritorio",
          class: "",
          link: "/dashboard",
          permiso: 1,
        },
        {
          title: "Panel de Universidad",
          icon: "tareas",
          class: "",
          link: "/university/panel",
          permiso: 1,
        },
        {
          title: "Salir",
          icon: "cerrarsesion",
          class: "small",
          link: "/logout",
          permiso: 1,
        },

        //MENUS DE COORDINADOR
        {
          title: "Escritorio",
          icon: "escritorio",
          class: "",
          link: "/dashboard",
          permiso: 2,
        },
        {
          title: "Panel de Coordinador",
          icon: "tareas",
          class: "",
          link: "/coordinador/panel",
          permiso: 2,
        },
        {
          title: "Salir",
          icon: "cerrarsesion",
          class: "small",
          link: "/logout",
          permiso: 2,
        },

        //MENUS DE PROFESOR
        {
          title: "Escritorio",
          icon: "escritorio",
          class: "",
          link: "/dashboard",
          permiso: 3,
        },
        {
          title: "Cursos",
          icon: "clases",
          class: "",
          link: "/cursos",
          permiso: 3,
        },
        {
          title: "Tareas",
          icon: "tareas",
          class: "",
          link: "/tareas",
          permiso: 3,
        },
        {
          title: "Mensajes",
          icon: "mensajes",
          class: "",
          link: "/chat/mensajes",
          permiso: 3,
        },
        {
          title: "Salir",
          icon: "cerrarsesion",
          class: "small",
          link: "/logout",
          permiso: 3,
        },

        //MENUS DE ESTUDIANTE
        {
          title: "Escritorio",
          icon: "escritorio",
          class: "",
          link: "/dashboard",
          permiso: 4,
        },
        {
          title: "Cursos",
          icon: "clases",
          class: "",
          link: "/cursos",
          permiso: 4,
        },
        //{title: 'Tareas', icon: 'tareas', class: '', link:'/student/tareas', permiso: 4},
        {
          title: "Mensajes",
          icon: "mensajes",
          class: "",
          link: "/chat/mensajes",
          permiso: 4,
        },
        {
          title: "Salir",
          icon: "cerrarsesion",
          class: "small",
          link: "/logout",
          permiso: 4,
        },
      ],
      mainStyle: {
        marginLeft: "23%",
        width: "23%",
      },
      mySideBar: {
        transform: "translateX(100%)",
      },
      sideClose: {
        transform: "translateX(-100%)",
      },
    };
  },
  created() {
    this.$store.dispatch("user/USER_INFO", Cookies.read("token"));
  },
  computed: {
    currentPage() {
      return this.$route.path;
    },

    ...mapGetters({
      permiso: "user/getPermiso",
      userID: "user/getID",
      isLoggedIn: "user/isLoggedIn",
      userInfo: "user/getUserInfo",
    }),

    filteredMenus() {
      return this.menuItems.filter((menu) => {
        return menu.permiso == this.permiso;
      });
    },
  },
  watch: {
    userInfo: {
      handler(userInfo) {
        if (userInfo) {
          this.myInfo = userInfo;
          if (this.permiso == 0) {
            this.username = userInfo.nombre;
          } else if (this.permiso == 1) {
            this.username = userInfo.nombre_univ;
          } else if (
            this.permiso == 2 ||
            this.permiso == 3 ||
            this.permiso == 4
          ) {
            if (userInfo.userID) {
              this.username = userInfo.userID.nombre;
            }
          }
        }
      },
      immediate: true,
    },
  }
};
</script>