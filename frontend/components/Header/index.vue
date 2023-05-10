<template>
  <header>
    <nav class="nav">
      <div class="container">
        <LogoSite />
        <ul class="nav__menu">
          <HeaderLink title="Главная" href="/" />
          <HeaderLink title="Карта" href="/map" />
          <HeaderLink v-if="user" title="Профиль" href="/profile" />
          <HeaderLink
            v-else
            title="Вход/Регистрация"
            href="/profile"
            @click="useToggleAuth"
          />
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
const user = useStrapiUser();
</script>

<style lang="scss" scoped>
header.green {
  nav {
    // background: rgba(61, 137, 52, 0.4);
  }
}
.nav {
  width: 100%;
  padding: 20px 0;

  position: absolute;
  z-index: 1000;
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
