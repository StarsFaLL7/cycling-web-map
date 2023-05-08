<template>
  <div class="home-routes">
    <h1 class="title home-routes__title">Популярные маршруты</h1>
    <p class="home-routes__suptitle">
      Выберите маршрут, что оценили наши пользователи или
      <nuxt-link to="/map">создайте свой</nuxt-link>
    </p>
    <div class="container">
      <Slider
        class="home-routes__slider"
        loop
        :slidesPerView="4"
        :spaceBetween="20"
        navigation
      >
        <swiper-slide v-for="i of 10" :key="i">
          <RouteCard />
        </swiper-slide>
      </Slider>
    </div>
  </div>
</template>

<script setup>
import { SwiperSlide } from "swiper/vue";
</script>

<style lang="scss" scoped>
.home-routes {
  margin-bottom: 100px;

  &__suptitle {
    text-align: center;
    margin-bottom: 30px;
    font-size: 18px;

    a {
      color: $green-600;
      font-weight: bold;
    }
  }

  &__slider {
    padding: 0 80px;
  }
}
</style>
