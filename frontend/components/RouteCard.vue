<template>
  <div class="route-card card">
    <div class="route-card__closer">
      <UIButton class="route-card__closer-btn">На карте</UIButton>
    </div>
    <nuxt-link to="#" class="card__link"></nuxt-link>
    <div class="card__image">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-xRlCgVwf9teWtKa_pTHXujUXnJ0Mqmcagg&usqp=CAU"
        alt=""
      />
    </div>
    <div class="card__location">
      <div class="card__location-routes">
        <div>Начало: {{ props.start }}</div>
        <div>Конец: {{ props.end }}</div>
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

const props = defineProps(["start", "end", 'duration', 'distance']);

const duration = (props.duration / 60).toFixed(1) + ' ' + 'мин'
const distance = (props.distance / 1000).toFixed(1) + ' ' + 'км'
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
      color: #fff;
      background: $green-400;
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
