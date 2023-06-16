<template>
  <header>
    <nav class="nav">
      <div class="container">
        <LogoSite/>
        <div class="menu-icon" :style="{opacity: !menuOpen ? 1 : 0}" @click="toggleMenu">
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul class="nav__menu" :class="{open: menuOpen}">
          <div class="menu-icon active" v-show="menuOpen" @click="toggleMenu">
            <div>
              <span></span>
              <span></span>
            </div>
          </div>
          <HeaderLink title="Главная" href="/"/>
          <HeaderLink title="Карта" href="/map"/>
          <HeaderLink v-if="user" title="Профиль" href="/profile"/>
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
const menuOpen = ref(false)
const toggleMenu = () => menuOpen.value = !menuOpen.value
</script>

<style lang="scss" scoped>
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

    @media (max-width: 1000px) {
      position: fixed;
      top: 0;
      right: 0;
      transform: translateX(100%);
      transition: all .2s;
      background: rgba($color: $green-300, $alpha: 0.9);
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      padding: 20px;
      z-index: 1000;
      width: 100%;
      height: 100vh;
      max-width: 300px;
      opacity: 0;
      overflow: hidden;

      &.open {
        right: 0;
        transform: translateX(0);
        opacity: 1;
      }

      .menu-icon {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
}

.menu-icon {
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: none;

  @media (max-width: 1000px) {
    display: block;
  }

  div {
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 22px;
    height: 12px;
  }

  span {
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    background-color: #fff;
    border-radius: 1px;
    transition: all 0.2s cubic-bezier(0.1, 0.82, 0.76, 0.965);

    &:first-of-type {
      top: 0;
    }

    &:last-of-type {
      bottom: 0;
    }
  }

  &.active {
    span {
      &:first-of-type {
        transform: rotate(45deg);
        top: 5px;
      }

      &:last-of-type {
        transform: rotate(-45deg);
        bottom: 5px;
      }
    }
  }

  &.active:hover span:first-of-type,
  &.active:hover span:last-of-type,
  &:hover .menu-icon__cheeckbox:checked + div span:first-of-type,
  &:hover .menu-icon__cheeckbox:checked + div span:last-of-type {
    width: 22px;
  }

  &:hover {
    // no need hover effect on mobile.
    @media (min-width: 1024px) {
      span:first-of-type {
        width: 26px;
      }

      span:last-of-type {
        width: 12px;
      }
    }
  }
}

</style>
