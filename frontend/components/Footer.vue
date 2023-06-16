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
          <nuxt-link to="/profile">Профиль</nuxt-link>
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

  @media (max-width: 800px) {
    padding-top: 25px;
  }

  &__copyright {
    color: #fff;
    text-align: center;
    opacity: 0.6;
    padding: 15px;
    background: #343434;

    @media (max-width: 800px) {
      font-size: 12px;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
    height: 200px;
    gap: 30px;

    @media (max-width: 800px) {
      flex-direction: column;
      gap: 0;
      height: auto;
    }
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

    @media (max-width: 1000px) {
      flex-direction: column;
      gap: 0;
    }

    &-item {
      padding: 0 0 5px;
      font-size: 20px;
      text-transform: uppercase;
      position: relative;

      @media (max-width: 1000px) {
        font-size: 14px;
      }

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
