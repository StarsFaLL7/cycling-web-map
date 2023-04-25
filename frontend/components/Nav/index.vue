<template>
  <nav class="nav">
    <LogoSite />
    <ul class="nav__menu">
      <NavLink title="Главная" href="/" />
      <NavLink title="Карта" href="/map" />
      <NavLink title="Личный кабинет" href="/profile" />
    </ul>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  padding: 20px;
  background: #fff;

  position: absolute;
  z-index: 999999;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__menu {
    display: flex;
    gap: 80px;

    padding: 0;
    margin: 0;

    list-style: none;
  }
}
</style>
