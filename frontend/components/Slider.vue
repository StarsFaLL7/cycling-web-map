<template>
  <div class="slider">
    <div v-show="props.navigation" ref="arrowPrev" class="slider-arrow prev">
      <ChevronLeftIcon />
    </div>
    <div v-show="props.navigation" ref="arrowNext" class="slider-arrow next">
      <ChevronRightIcon />
    </div>
    <client-only>
      <swiper
        :free-mode="props.freeMode"
        :loop="props.loop"
        :slides-per-view="props.slidesPerView"
        :space-between="props.spaceBetween"
        :slides-per-group="props.slidesPerGroup"
        :watch-slides-progress="true"
        :modules="modules"
        :navigation="
          props.navigation && {
            nextEl: arrowNext,
            prevEl: arrowPrev,
          }
        "
        :pagination="props.pagination && { clickable: true }"
        class="slider__swiper"
      >
        <slot />
      </swiper>
    </client-only>
  </div>
</template>

<script setup>
import { Swiper } from "swiper/vue";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  slidesPerView: {
    type: [Number, String],
  },
  spaceBetween: {
    type: Number,
    default: 40,
  },
  navigation: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  freeMode: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  slidesPerGroup: {
    type: Boolean,
    default: 1,
  },
});

const modules = [Pagination, Navigation];

const arrowNext = ref();
const arrowPrev = ref();
</script>

<style lang="scss">
.slider {
  position: relative;

  .swiper {
    height: inherit;
  }

  .swiper-slide-visible {
    opacity: 1;
  }

  .swiper-slide:not(.swiper-slide-visible) {
    opacity: 0;
  }

  .swiper-slide {
    transition: opacity 0.4s;
  }

  &-arrow {
    position: absolute;

    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 50%;
    transform: translateY(-50%);
    z-index: 999;

    border-radius: 50%;
    background: $green-300;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: $green-600;
    }

    &.prev {
      left: 0;

      svg {
        transform: translateX(-5%);
      }
    }

    &.next {
      right: 0;

      svg {
        transform: translateX(5%);
      }
    }

    svg {
      width: 24px;
      height: 24px;
      color: #fff;
    }
  }
}
</style>
