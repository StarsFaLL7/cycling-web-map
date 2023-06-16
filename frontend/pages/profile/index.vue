<template>
  <div class="profile" v-if="user">
    <img
        src="https://rare-gallery.com/mocahbig/473896-landscape-green-nature-Switzerland-trees-mountains.jpg"
        class="profile__image"
    />
    <div class="container">
      <div class="profile__header">
        <div class="profile__header-avatar">
          <img
              src="https://previews.123rf.com/images/sombrecanari/sombrecanari2004/sombrecanari200400076/145778943-silhouette-cartoon-illustration-of-boy-riding-on-bike-in-vector-design-cheerful-vintage-style.jpg"
              alt=""
          />
        </div>
        <div class="profile__header-content">
          <div class="profile__header-top">
            <h4 class="profile__name">{{ user.username }}</h4>
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
          <UIButton @click="onLogout">Выйти</UIButton>
          <UIButton>Редактировать профиль</UIButton>
        </div>
      </div>
    </div>
    <div class="profile__content">
      <div class="container">
<!--        <ProfileCard title="Обо мне">-->
<!--          <ProfileAbout/>-->
<!--        </ProfileCard>-->
<!--        <ProfileCard title="Достижения">-->
<!--          <Slider :slidesPerView="4" :spaceBetween="20">-->
<!--            <swiper-slide v-for="item of achievements" :key="item">-->
<!--              <AchievementCard :title="item"/>-->
<!--            </swiper-slide>-->
<!--          </Slider>-->
<!--        </ProfileCard>-->
        <!--        <ProfileCard title="Последние маршруты" class="routes">-->
        <!--          <Slider :slidesPerView="2.2" :spaceBetween="20">-->
        <!--            <swiper-slide v-for="item of achievements" :key="item">-->
        <!--              <RouteCard />-->
        <!--            </swiper-slide>-->
        <!--          </Slider>-->
        <!--        </ProfileCard>-->
        <ProfileCard title="Сохранённые маршруты" class="routes">
          <Slider :slidesPerView="getSlideCount()" :spaceBetween="20">
            <swiper-slide v-for="item of routes" :key="item">
              <RouteCard :data="item"/>
            </swiper-slide>
          </Slider>
        </ProfileCard>
        <ProfileCard title="Статистика" class="stats">
          <ProfileStats/>
        </ProfileCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import {SwiperSlide} from "swiper/vue";
import {useWindowSize} from "@vueuse/core";

const {width} = useWindowSize()

const {logout} = useStrapiAuth();
const router = useRouter();
const user = useStrapiUser();

const routes = ref(await getUserRoutes().then(res => res.data.map(el => ({id: el.id, ...el.attributes}))))
console.log(routes.value)

const onLogout = async () => {
  router.push({path: "/"});
  await logout();
};

definePageMeta({
  middleware: ["auth"],
});

const date1 = new Date(user.value.createdAt);
const date2 = new Date();
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

const stats = ref([
  {
    label: "Маршрутов",
    value: routes.value.length,
  },
  {
    label: "Расстояние",
    value: routes.value.reduce((acc, val) => acc += +(val.distance / 1000).toFixed(1), 0) + ' ' + 'км',
  },
  {
    label: "Дней на сайте",
    value: diffDays
  },
  // {
  //   label: "Отзывов",
  //   value: 12,
  // },
]);

const achievements = ref([
  "Пройдено 10 маршрутов",
  "Неделя активности",
  "Первый километр",
  "Первый отзыв",
  "Первый маршрут",
]);

const getSlideCount = () => {
  if (width.value > 1300) return 4
  else if (width.value > 1000) return 3
  else if (width.value > 800) return 2
  else return 1.2
}
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

    @media (max-width: 1300px) {
      height: 150px;
    }
  }

  .routes {
    grid-column: 1 / -1;
  }

  &__header {
    display: flex;
    gap: 30px;
    margin-bottom: -125px;
    transform: translateY(-50%);

    @media (max-width: 1300px) {
      transform: none;
      margin-bottom: 50px;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;
      transform: translateY(-10%);
      margin-bottom: -20px;
    }

    &-more {
      align-self: center;
      margin-left: auto;
      margin-right: 20px;
      transform: translateY(calc(50% + 20px));
      display: flex;
      gap: 10px;
      
      @media (max-width: 1300px) {
        flex-direction: column;
        transform: none;
        margin: 0;
      }

      @media (max-width: 600px) {
        width: 100%;
      }

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
        background: $green-300;
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
        color: #fff;
        margin: 0 0 5px;
        
        @media (max-width: 1300px) {
          color: #000;
        }
      }

      .profile__status {
        font-size: 18px;
        color: #fff;
        margin: 0;
        opacity: 0.7;

        @media (max-width: 1300px) {
          color: gray;
        }
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
