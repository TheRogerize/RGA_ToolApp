import Vue from "vue";
import Router from "vue-router";
import SideBar from "./layout/logged/sidebar";
import Landing from "./views/Landing.vue";
import About from "./views/about.vue";
import Login from "./views/Login.vue";
import forgot from "./views/forgot.vue";
import Logout from "./layout/logged/logout";
import Register from "./views/Register.vue";
import dashboard from "./views/admin/dashboard.vue";
import main from "./views/Main.vue";
import studentDashboard from "./views/student/dashboard.vue";
import dash from "./views/dashboards/dashboard.vue";
import cursos from "./views/cursos.vue";
import curso from "./views/perfil_curso.vue";
import cursoStudent from "./views/student/perfil_curso.vue";
import tareas from "./views/student/tareas.vue";
import studentTareas from "./views/student/tareas.vue";
import panelUniversidad from "./views/university/panel.vue";
import panelCoordinador from "./views/coordinador/panel.vue";
import mensajes from "./views/chat/mensajes.vue";
import chatseccion from "./views/chat/chatgrupal.vue";
import chatTemplate from "./views/chatConfig/main.vue";
import reestablecer from "./views/reestablecer.vue";
import notfound from "./views/404.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "landing",
      components: {
        default: Landing,
      },
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: "/sobre_RGA",
      name: "about",
      components: {
        default: About,
      },
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: "/recuperar",
      name: "forgotPassword",
      component: forgot,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: "/reestablecer/:correo/reset/:resettoken",
      name: "reestablecer",
      component: reestablecer,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        default: Register
      },
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: "/logout",
      name: "Logout",
      components: {
        default: Logout,
        sidebar: SideBar
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin/dashboard",
      name: "adminDashboard",
      components: {
        sidebar: SideBar,
        default: dashboard
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/main",
      name: "main",
      components: {
        default: main,
        sidebar: SideBar,
      }
    },
    {
      path: "/student/dashboard",
      name: "studentDashboard",
      components: {
        default: studentDashboard,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      components: {
        default: dash,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/university/panel",
      name: "paneluniversidad",
      components: {
        default: panelUniversidad,
        sidebar: SideBar
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/coordinador/panel",
      name: "panelcoordinador",
      components: {
        default: panelCoordinador,
        sidebar: SideBar
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/cursos",
      name: "cursos",
      components: {
        default: cursos,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/curso/:id",
      name: "curso",
      components: {
        default: curso,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/student/curso/:id",
      name: "cursoStudent",
      components: {
        default: cursoStudent,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/student/tareas",
      name: "tareas",
      components: {
        default: tareas,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/chat/mensajes",
      name: "mensajes",
      components: {
        default: mensajes,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/chat/seccion:id",
      name: "seccionchat",
      components: {
        default: chatseccion,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/chat/salas",
      name: "chatTemplate",
      components: {
        default: chatTemplate,
        sidebar: SideBar,
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/notfound',
      components: {
        default: notfound
      },
    },
    { path: '*', redirect: '/notfound' }

  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

