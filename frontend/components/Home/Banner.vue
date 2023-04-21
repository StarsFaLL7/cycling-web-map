<template>
  <div class="home__banner">
    <h1 class="home__banner-text">Найди свой идеальный велосипедный маршрут</h1>
    <nuxt-link to="/map"><button class="btn">Начать поездку</button></nuxt-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home__banner {
  height: 100vh;
  background-image: url(~/assets/images/banner.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-text {
    color: #fff;
    font-size: 36px;

    margin-bottom: 30px;
  }
}
</style>
