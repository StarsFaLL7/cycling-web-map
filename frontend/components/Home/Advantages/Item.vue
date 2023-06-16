<template>
  <div class="home-advantages__item">
    <!-- <div class="home-advantages__item-image">
      <img src="~/assets/images/home-advantage-1.png" alt="" />
    </div> -->
    <img src="~/assets/images/home-advantage-1.png" alt="" />
    <div class="home-advantages__item-content">
      <h3>{{ props.title }}</h3>
      <p>{{ props.text }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  text: String,
});
</script>

<style lang="scss" scoped>
.home-advantages__item {
  padding: 10px 10px 30px;
  //   border-radius: 20px;
  position: relative;
  //   background: $green-300;
  overflow: hidden;
  //   aspect-ratio: 1;

  //   &-image {
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     width: 100%;
  //     height: 100%;

  //     display: flex;
  //     justify-content: center;
  //     align-items: center;

  //     img {
  //       width: 95%;
  //       height: 95%;
  //       object-fit: cover;
  //       object-position: center;
  //       border-radius: 10%;
  //     }
  //   }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    height: 250px;
    border-radius: 10px;
    margin-bottom: 10px;
    border: 2px solid #fff;
  }

  &-content {
    z-index: 2;
    color: #000;
    background: $green-50;
    position: absolute;
    bottom: 0;
    left: 0;

    padding: 20px;
    border-radius: 10px;
    height: 140px;

    @media (max-width: 1200px) {
      width: 100%;
    }

    h3 {
      margin: 0 0 10px;
      color: $green-400;

      @media (max-width: 1000px) {
        font-size: 16px;
      }
    }
    p {
      margin: 0;
      @media (max-width: 1000px) {
        font-size: 14px;
      }
    }
  }

  //   p {
  //     position: relative;
  //     z-index: 2;
  //     font-size: 28px;
  //     color: #fff;
  //     font-weight: bold;
  //   }
}
</style>
