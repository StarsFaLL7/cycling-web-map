<template>
  <div class="home-motivation">
    <div class="container">
      <div class="home-motivation__content">
        <h1 class="title home-motivation__title">
          Найдите
          <span
            >свой <br />
            собственный</span
          >
          путь
        </h1>
        <nuxt-link to="/map">
          <UIButton>Перейти к карте</UIButton>
        </nuxt-link>
      </div>
      <!-- <img class="rider-img" src="~/assets/images/bike-rider.png" alt="" /> -->
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-motivation {
  padding: 200px 0 150px;
  background-image: url(~/assets/images/biker_cropped.jpg);
  background-size: cover;
  background-position: center bottom;
  height: 600px;
  position: relative;

  &__content {
    width: fit-content;
    padding: 30px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 0px 7px 5px rgba(176, 212, 130, 0.38);

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: $green-200;
      opacity: 0.9;
    }
  }

  .btn {
    position: relative;
    z-index: 2;
    color: #fff;
    box-shadow: none;
    background: $green-400;
    padding: 10px 30px;
    width: 100%;

    &:hover {
      border-color: $green-400;
      background: $green-300;
    }
  }

  &__title {
    text-align: left;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    letter-spacing: 3px;
    font-size: 40px;
    position: relative;
    z-index: 2;

    span {
      color: $green-600;
    }
  }
}
</style>
