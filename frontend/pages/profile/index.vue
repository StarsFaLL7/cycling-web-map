<template>
  <div class="profile">
    <img
      src="https://rare-gallery.com/mocahbig/473896-landscape-green-nature-Switzerland-trees-mountains.jpg"
      class="profile__image"
    />
    <div class="container">
      <div class="profile__header">
        <div class="profile__header-avatar">
          <img
            src="https://i.pinimg.com/280x280_RS/5d/6f/36/5d6f36c42533acb5831b7d56df5295ef.jpg"
            alt=""
          />
        </div>
        <div class="profile__header-content">
          <div class="profile__header-top">
            <h4 class="profile__name">Name Surname</h4>
            <p class="profile__status">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div class="profile__header-bottom">
            <div>
              <div class="profile__header-stats">
                <div
                  class="profile__header-stat"
                  v-for="stat of stats"
                  :key="stat.label"
                >
                  <div class="profile__header-stat-value">{{ stat.value }}</div>
                  <div class="profile__header-stat-label">{{ stat.label }}</div>
                </div>
              </div>
              <!-- <UIButton>Редактировать</UIButton> -->
            </div>
          </div>
        </div>
        <div class="profile__header-more">
          <!-- <EllipsisHorizontalCircleIcon /> -->
          <UIButton>Редактировать профиль</UIButton>
        </div>
      </div>
    </div>
    <div class="profile__content">
      <div class="container">
        <ProfileCard title="Обо мне">
          <ProfileAbout />
        </ProfileCard>
        <ProfileCard title="Достижения">
          <Slider :slidesPerView="4" :spaceBetween="20">
            <swiper-slide v-for="item of achievements" :key="item">
              <AchievementCard :title="item" />
            </swiper-slide>
          </Slider>
        </ProfileCard>
        <ProfileCard title="Последние маршруты" class="routes">
          <Slider :slidesPerView="2.2" :spaceBetween="20">
            <swiper-slide v-for="item of achievements" :key="item">
              <RouteCard />
            </swiper-slide>
          </Slider>
        </ProfileCard>
        <ProfileCard title="Сохранённые маршруты" class="routes">
          <Slider :slidesPerView="2.2" :spaceBetween="20">
            <swiper-slide v-for="item of achievements" :key="item">
              <RouteCard />
            </swiper-slide>
          </Slider>
        </ProfileCard>
        <ProfileCard title="Статистика" class="stats">
          <ProfileStats />
        </ProfileCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SwiperSlide } from "swiper/vue";
import { EllipsisHorizontalCircleIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "profile",
});

const stats = ref([
  {
    label: "Маршрутов",
    value: 20,
  },
  {
    label: "Расстояние",
    value: "18.7 км",
  },
  {
    label: "На сайте",
    value: "20 дней",
  },
  {
    label: "Отзывов",
    value: 12,
  },
]);

const achievements = ref([
  "Пройдено 10 маршрутов",
  "Неделя активности",
  "Первый километр",
  "Первый отзыв",
  "Первый маршрут",
]);
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;

  &__image {
    width: 100%;
    height: 250px;
    object-position: center;
    object-fit: cover;
  }

  &__header {
    display: flex;
    gap: 30px;
    margin-bottom: -125px;
    transform: translateY(-50%);

    &-more {
      align-self: center;
      margin-left: auto;
      margin-right: 20px;
      transform: translateY(calc(50% + 20px));

      .btn {
        color: #fff;
      }
    }

    &-avatar {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 2555, 0.2);

      img {
        width: 85%;
        height: 85%;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
        border: 1px solid #fff;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-top,
    &-bottom {
      display: flex;
      align-items: flex-start;
    }

    &-top {
      height: 50%;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 20px;

      .profile__name {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #fff;
        margin: 0 0 5px;
      }

      .profile__status {
        font-size: 18px;
        color: #fff;
        margin: 0;
        opacity: 0.7;
      }
    }

    &-bottom {
      height: 50%;
      padding-top: 20px;

      & > div {
        display: flex;
        align-items: center;
        gap: 30px;
      }
    }

    &-stats {
      display: flex;
      gap: 30px;
    }

    &-stat {
      text-align: center;

      &-value {
        font-size: 16px;
        margin-bottom: 5px;
      }

      &-label {
        font-size: 14px;
        text-transform: uppercase;
      }
    }
  }

  &__content {
    background: #f7f7f7;
    padding: 40px 0 100px;
    .container {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 30px;
    }
  }
}
</style>
