<template>
  <nav class="nav">
    <div class="container">
      <LogoSite />
      <ul class="nav__menu">
        <NavLink title="Главная" href="/" />
        <NavLink title="Карта" href="/map" />
        <NavLink title="Профиль" href="/profile" />
      </ul>
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  padding: 20px 0;

  position: absolute;
  z-index: 999999;
  top: 0;
  left: 0;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__menu {
    display: flex;
    gap: 80px;

    padding: 0;
    margin: 0;

    list-style: none;
  }
}
</style>
