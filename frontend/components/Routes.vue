<template>
  <div class="routes">
    <h2 class="routes-title">Маршруты</h2>
    <div class="routes__items">
      <RouteCard
        :start="item.title"
        :end="item.description"
        v-for="item of data"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script setup>
const { data: initialData } = await getRoutes();
const data = initialData.map((el) => ({ ...el.attributes, id: el.id }));
</script>

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
