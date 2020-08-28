<template>
  <section class="main">
    <header class="header">
      <div class="welcome">
        <h3>Tareas</h3>
      </div>
      <div class="date">
        <h3>{{currentDate}}</h3>
      </div>
    </header>

    <div class="title-courses">
      <div class="search-filter">
        <div class="search">
          <i class="fas fa-search"></i>
          <input type="search" class="form-control" placeholder="Buscar" />
        </div>
        <div class="search">
          <i class="fas fa-filter"></i>
          <input type="search" class="form-control" placeholder="Filtrar" />
        </div>
        <div class="search">
          <button class="ordenar">
            <i class="fas fa-sort-alpha-down-alt"></i> Ordenar
          </button>
        </div>
      </div>
    </div>

    <div class="class-title">
      <h2>Tareas pendientes</h2>
    </div>

    <div class="tasks-card">
      <div class="tasks-background"></div>
      <div class="tasks-information">
        <div class="tasks-inner">
          <h2>Tarea l</h2>
          <i class="fas fa-ellipsis-v fa-2x dot-menu"></i>
          <small>
            Técnicas de supervivencia ll
            <span class="warning">&nbsp;&nbsp;&nbsp;&nbsp; Vence pronto. (10/06/20 10:00p.m.).</span>
          </small>
        </div>
        <div class="button-active">
          <button>Entregar Tarea</button>
        </div>
      </div>
    </div>

    <div class="tasks-card">
      <div class="tasks-background"></div>
      <div class="tasks-information">
        <div class="tasks-inner">
          <h2>Proyecto ll</h2>
          <i class="fas fa-ellipsis-v fa-2x dot-menu"></i>
          <small>
            Técnicas de supervivencia ll
            <span>&nbsp;&nbsp;&nbsp;&nbsp; Vence el 05/06/20 a las 4:00p.m.</span>
          </small>
        </div>
        <div class="button-active">
          <button>Entregar Tarea</button>
        </div>
      </div>
    </div>

    <div class="class-title">
      <h2>Tareas entregadas</h2>
    </div>

    <div class="tasks-card">
      <div class="tasks-background"></div>
      <div class="tasks-information">
        <div class="tasks-inner">
          <h2>Con Altura lV</h2>
          <i class="fas fa-ellipsis-v fa-2x dot-menu"></i>
          <small>
            La Rosalia
            <span
              class="completed"
            >&nbsp;&nbsp;&nbsp;&nbsp; Completada. Pendiente por evalución del docente.</span>
          </small>
        </div>
        <div class="button-deactive">
          <button>Entregada</button>
        </div>
      </div>
    </div>

    <div class="class-title">
      <h2>Tareas vencidas</h2>
    </div>

    <div class="tasks-card">
      <div class="tasks-background"></div>
      <div class="tasks-information">
        <div class="tasks-inner">
          <h2>Cuentos de bus l</h2>
          <i class="fas fa-ellipsis-v fa-2x dot-menu"></i>
          <small>Relatos jocosos pero asombrosamente reales l</small>
          <span class="rip">Vencida. (Vencio el 09/06/20 11:00p.m.).</span>
        </div>
        <div class="button-deactive">
          <button>Vencida</button>
        </div>
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
      isActive: true,
      activeClass: "active",
      deactivateClass: "deactivate",
      sideBar: false,
      currentDate: new Date().toLocaleString(),
    };
  },

  methods: {},
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
.header {
  margin-bottom: 10px;
}
.main .title-courses {
  justify-content: flex-end;
  padding-bottom: 0;
}
</style>