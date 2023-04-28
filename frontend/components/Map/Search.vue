<template>
  <div class="map-search">
    <UIInput class="map-search-input" v-model="searchQuery" placeholder="Поиск">
      <template v-slot:icon>
        <MagnifyingGlassIcon />
      </template>
    </UIInput>

    <div class="map-search__steps">
      <h2>Новый маршрут</h2>
      <UIInput v-model="searchQuery" placeholder="Название маршрута" />
      <UITextarea v-model="searchQuery" placeholder="Описание маршрута" />
      <span class="map-search__points"><MapPinIcon />Точки маршрута </span>
      <div class="map-search__steps-btns">
        <button class="btn">Сохранить</button>
        <button class="btn">Назад</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { MapPinIcon } from "@heroicons/vue/24/solid";

const searchQuery = ref();
</script>

<style lang="scss" scoped>
.map-search {
  position: absolute;
  top: 136px;
  left: 80px;

  &__points {
    color: rgba(14, 89, 121, 0.87);

    display: flex;
    align-items: center;
    margin: 10px 0;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    svg {
      margin-right: 5px;
      width: 24px;
      height: 24px;
    }
  }

  &-input {
    margin-bottom: 60px;
    width: 400px;
  }

  &__steps {
    padding: 25px;
    width: 400px;

    background: #fff;
    border: 1px solid #0e5979;
    border-radius: 10px;

    &-btns {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-top: 20px;

      button {
        padding: 10px 20px;
        width: 45%;
      }
    }

    h2 {
      font-family: "Nunito";
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 33px;
      /* identical to box height */

      color: #0e5979;

      margin: 0 0 20px;
    }

    .input {
      margin-bottom: 10px;
    }
  }
}
</style>
