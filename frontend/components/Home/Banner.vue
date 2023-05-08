<template>
  <div class="home__banner" ref="bannerEl">
    <!-- <div class="container">
      <div class="home__banner-inner">
        <h1 class="home__banner-title">
          Найди свой идеальный велосипедный маршрут
        </h1>
        <p class="home__banner-text"></p>
      </div>
      <img
        src="~/assets/images/home-banner.png"
        alt=""
        class="home__banner-image"
      />
    </div> -->
    <div class="home__banner-inner">
      <h1 class="home__banner-title">
        Найди свой <span>идеальный</span> велосипедный маршрут
      </h1>
      <ChevronDoubleDownIcon
        class="arrow-down animate__animated floating animate__infinite"
        @click="scrollToNextSection"
      />
      <!-- <button class="btn">
        <nuxt-link to="/map"> Начать поездку</nuxt-link>
      </button> -->
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,0.7"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.5)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.3)"
          />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <!-- <h1 class="home__banner-text">Найди свой идеальный велосипедный маршрут</h1>
    <nuxt-link to="/map"><button class="btn">Начать поездку</button></nuxt-link> -->
  </div>
</template>

<script setup>
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/outline";

const bannerEl = ref();

const scrollToNextSection = () => {
  window.scroll({
    top: bannerEl.value.offsetHeight - 100,
    behavior: "smooth",
  });
};
</script>

<style lang="scss" scoped>
.home__banner {
  margin-bottom: 50px;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 100px 0;
  }

  &-image {
    width: 500px;
    object-fit: contain;
  }

  &-inner {
    padding-top: 76px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // #94CBEA #6CB6E2 #095172

    // background: linear-gradient(60deg, #94cbea 0%, #095172 100%);
    background-image: url(https://switchrpg.com/images/articles/botw/botw01.jpg);
    background-size: cover;
    background-position: center;
    position: relative;
    height: 500px;

    .arrow-down {
      width: 40px;
      height: 40px;
      color: #fff;
      cursor: pointer;
    }
  }

  &-title {
    font-size: 42px;
    text-align: center;
    color: #fff;
    font-family: "Exo 2";
    font-weight: 300;
    margin: 0 0 50px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  &-text {
    color: #fff;
    margin-bottom: 30px;
  }
}

.waves {
  position: absolute;
  width: 100%;
  height: 8vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 50px;
  max-height: 100px;
  bottom: 0;
  left: 0;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  h1 {
    font-size: 24px;
  }
}

.floating {
  animation-name: floating;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes floating {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, -0px);
  }
}
</style>
