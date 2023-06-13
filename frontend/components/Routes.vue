<template>
  <div class="routes">
    <h2 class="routes-title">Маршруты</h2>
    <div class="routes__items">
      <RouteCard
          :start="item.coords[0].streetName"
          :end="item.coords[item.coords.length - 1].streetName"
          :distance="item.distance"
          :duration="item.duration"
          v-for="item of [...data, ...data, ...data]"
          :key="item.id"
      />
    </div>
  </div>
</template>

<script setup>
const {data: initialData} = await getRoutes();
const data = initialData.map((el) => ({...el.attributes, id: el.id}));
</script>

<style lang="scss" scoped>
.routes {
  display: flex;
  flex-direction: column;
  height: 100%;

  &-title {
    font-size: 18px;
    color: #fff;
    margin: 0 0 15px;
    font-weight: normal;
  }

  &__items {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    & > div:not(:last-of-type) {
      margin-bottom: 20px;
    }
  }
}
</style>
