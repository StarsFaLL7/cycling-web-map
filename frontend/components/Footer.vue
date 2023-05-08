<template>
  <footer class="footer">
    <div class="container">
      <LogoSite class="footer__logo" />
      <ul class="footer__menu">
        <li class="footer__menu-item">
          <nuxt-link to="/">Главная</nuxt-link>
        </li>
        <li class="footer__menu-item">
          <nuxt-link to="/map">Карта</nuxt-link>
        </li>
        <li class="footer__menu-item">
          <nuxt-link to="/profile/stats">Профиль</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="footer__copyright">
      @{{ new Date().getFullYear() }} Lunar Kitties. All rights reserved.
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  padding-top: 50px;
  background: #000;

  &__copyright {
    color: #fff;
    text-align: center;
    opacity: 0.6;
    padding: 15px;
    background: #343434;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    height: 200px;
  }

  &__logo {
    display: flex;
    justify-content: center;

    color: $green-400 !important;
    text-decoration: none;
    font-weight: bold;
  }

  &__menu {
    display: flex;
    justify-content: center;
    gap: 40px;

    list-style: none;
    padding: 0;
    margin: 0;

    &-item {
      padding: 0;
      font-size: 20px;
      text-transform: uppercase;
      position: relative;
      padding-bottom: 5px;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: $green-400;
        transform: scaleX(0);
        transition: all 0.2s;
      }

      &:hover {
        &::after {
          transform: scaleX(1);
          transition: all 0.2s;
        }
      }

      a {
        display: block;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>
