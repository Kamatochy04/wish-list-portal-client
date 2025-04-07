<template>
  <div class="container-main">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from "@/widgets/header/Header.vue";
</script>

<style scoped>
.container-main {
  background-image: url("@/assets/img/HomeBackground.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
}
</style>
