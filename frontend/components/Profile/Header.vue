<template>
  <div class="profile__header">
    <img
      src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80"
      alt=""
      class="profile__banner"
    />
    <div class="profile__header-inner container">
      <div class="profile__avatar">
        <div class="profile__avatar-wrapper">
          <img
            src="https://www.runtastic.com/blog/wp-content/uploads/2017/08/cycling-benefits-1200x800-1024x683.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="profile__user-info">
        <h1 class="profile__full-name">Данил Казаков</h1>
        <p class="profile__status">
          Ничто не сравнится с простым удовольствием от велопрогулки
        </p>
        <ul class="profile__links">
          <li class="profile__link">
            <a href="#">
              <MapPinIcon />
              <span>Екатеринбург</span></a
            >
          </li>
          <li class="profile__link">
            <a href="#">
              <PaperAirplaneIcon style="transform: rotate(-45deg)" />
              <span>telegram</span></a
            >
          </li>
          <!-- <li class="profile__link">
            <a href="#">
              <EnvelopeIcon />
              <span>mail@example.ru</span></a
            >
          </li> -->
        </ul>
      </div>
      <ul class="profile__stats">
        <li class="profile__stat">
          <GlobeAltIcon />
          <span>20 маршрутов</span>
        </li>
        <li class="profile__stat">
          <FlagIcon />
          <span>200 км</span>
        </li>
        <li class="profile__stat">
          <ClockIcon />
          <span>19 дней</span>
        </li>
        <li class="profile__stat">
          <ChatBubbleBottomCenterIcon />
          <span>13 отзывов</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {
  MapPinIcon,
  PaperAirplaneIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/solid";
import {
  FlagIcon,
  ClockIcon,
  GlobeAltIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/vue/24/outline";
</script>

<style lang="scss" scoped>
.profile {
  &__banner {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  &__header-inner {
    display: flex;
    gap: 40px;
  }

  &__avatar {
    position: relative;
    width: 250px;

    &-wrapper {
      width: 250px;
      height: 250px;

      position: absolute;
      bottom: 0;

      border-radius: 50%;
      box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
      overflow: hidden;

      background: #fff;

      padding: 15px;
      // transform: translateY(-50%);
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__user-info {
    font-size: 18px;
    margin-top: 30px;

    width: 40%;
  }

  &__full-name {
    margin: 0 0 15px;
  }

  &__status {
    margin: 0 0 15px;
  }

  &__links {
    padding: 0;
    margin: 0;

    list-style: none;

    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__link {
    color: grey;
    transition: color 0.3s;

    &:hover {
      color: rgba(0, 0, 0, 0.2);
    }

    a {
      color: inherit;
      text-decoration: none;

      display: flex;
      align-items: center;
      gap: 5px;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__stats {
    padding: 0;
    margin: 30px 0 0 auto;
    list-style: none;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #94cbea;

    padding: 0 30px;
    border-radius: 20px;
    width: 35%;
    box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    color: #fff;
    font-weight: bold;

    svg {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
