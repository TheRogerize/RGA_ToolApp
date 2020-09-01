<template>
  <nav class="mob_navbar">
    <ul>
      <li>
        <router-link to="/" tag="span">Inicio</router-link>
      </li>
      <li>
        <router-link to="sobre_RGA" tag="span">Sobre RGA</router-link>
      </li>
      <li>
        <router-link to="register" tag="span">Registrarse</router-link>
      </li>
      <li>
        <router-link to="login" tag="span">Iniciar Sesión</router-link>
      </li>
    </ul>
    <a href="#">
      <img class="logo" src="../assets/images/RGA_logo_icon_gray.svg" alt="RGA Icon" />
    </a>
  </nav>
</template>