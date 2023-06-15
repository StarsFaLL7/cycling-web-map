<template>
  <div class="route-card card">
    <div class="route-card__closer">
      <UIButton class="route-card__closer-btn">На карте</UIButton>
    </div>
    <nuxt-link :to="`/map?route=${props.data.id}`" class="card__link"></nuxt-link>
    <div class="card__image">
      <img
        src="@/assets/images/route-image.png"
        alt=""
      />
    </div>
    <div class="card__location">
      <div class="card__location-routes">
        <div>Начало: {{ props.data.coords[0].streetName }}</div>
        <div>Конец: {{ props.data.coords[props.data.coords.length - 1].streetName }}</div>
      </div>
      <div class="card__location-info">
        <div>
          <ClockIcon />
          {{ duration }}
        </div>
        <div>
          <MapIcon />
          {{distance }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClockIcon, MapIcon } from "@heroicons/vue/24/outline";

const props = defineProps(["data"]);

const duration = (props.data.duration / 60).toFixed(1) + ' ' + 'мин'
const distance = (props.data.distance / 1000).toFixed(1) + ' ' + 'км'
</script>

<style lang="scss" scoped>
.route-card {
  position: relative;
  height: 200px;
  border: 3px solid $green-200;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;

  &:hover &__closer {
    transform: scale(1);
    opacity: 1;
  }

  &__closer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0,0,0,.5);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(.95);
    transition: all .2s;
    opacity: 0;

    &-btn {
      background: transparent;
      color: #fff !important;
      background: $green-400 !important;
    }
  }

  //&:hover {
  //  .card__image img {
  //    transform: scale(1.2);
  //  }
  //
  //  border-color: $green-400;
  //}

  .card__image {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: all 0.2s;
    }
  }

  .card__link {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }

  .card__location {
    padding: 10px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all 0.2s;
    cursor: pointer;

    &-routes {
      margin-bottom: 10px;

      & > div::first-letter {
        text-transform: uppercase;
      }
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 10px;

      & > div {
        display: flex;
        align-items: center;
        gap: 5px;

        font-size: 12px;

        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>
