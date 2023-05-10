<template>
  <div class="routes">
    <h2 class="routes-title">Маршруты</h2>
    <div class="routes__items">
      <RouteCard v-for="i of 3" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.routes {
  &-title {
    font-size: 18px;
    color: #fff;
    margin: 0 0 15px;
    font-weight: normal;
  }
  &__items {
    display: flex;
    flex-direction: column;
    gap: 15px;

    & > div {
      height: 200px;
    }
  }
}
</style>
