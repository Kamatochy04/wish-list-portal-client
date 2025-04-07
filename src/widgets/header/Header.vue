<template>
  <header class="header">
    <Container>
      <div class="header__container">
        <img src="@/assets/icons/LogoIcon.svg" alt="" />

        <nav class="header__nav">
          <router-link>Login</router-link>
          /
          <router-link>Register</router-link>
        </nav>
      </div>
    </Container>
  </header>
</template>

<script setup>
import Container from "@/components/container/Container.vue";
</script>

<style scoped lang="scss">
.header {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background: #fff;
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__nav {
    font-weight: 700;
    font-size: 18px;
    color: #000;
  }
}
</style>
