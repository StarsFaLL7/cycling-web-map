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
          :slidesPerView="getSlideCount()"
          :spaceBetween="20"
          :navigation="width > 1000 ? true : false"
      >
        <swiper-slide v-for="(item, i) of data" :key="i">
          <RouteCard
              :data="item"
          />
        </swiper-slide>
      </Slider>
    </div>
  </div>
</template>

<script setup>
import {useWindowSize} from '@vueuse/core'
import {SwiperSlide} from "swiper/vue";

const {width} = useWindowSize()

const {data: initialData} = await getRoutes();
const data = initialData.map((el) => ({...el.attributes, id: el.id}));

const getSlideCount = () => {
  if (width.value > 1300) return 4
  else if (width.value > 1000) return 3
  else if (width.value > 800) return 2
  else return 1.2
}
</script>

<style lang="scss" scoped>
.home-routes {
  margin-bottom: 100px;

  &__suptitle {
    text-align: center;
    margin-bottom: 30px;
    font-size: 18px;
    padding: 0 20px;

    @media (max-width: 1000px) {
      font-size: 16px;
    }

    @media (max-width: 800px) {
      margin-bottom: 15px;
      font-size: 14px;
    }

    a {
      color: $green-600;
      font-weight: bold;
      white-space: nowrap;
    }
  }

  &__slider {
    padding: 0 80px;

    @media (max-width: 1200px) {
      padding: 0 60px;
    }

    @media (max-width: 1000px) {
      padding: 0;
    }
  }
}
</style>
