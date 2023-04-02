<template>
  <nav class="navbar">
    <NuxtLink to="/" class="navbar-logo">Lunar Kitties</NuxtLink>
  </nav>
</template>

<script setup></script>

<style lang="scss">
.navbar {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  &-logo {
    text-decoration: none;
    color: inherit;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
