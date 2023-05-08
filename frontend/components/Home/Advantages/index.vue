<template>
  <div class="home-advantages">
    <div class="container">
      <h1 class="title home-advantages__title">
        <span>«</span> Наши преимущества <span>»</span>
      </h1>
      <div class="home-advantages__items">
        <HomeAdvantagesItem
          v-for="{ title, text } of items"
          :key="title"
          :title="title"
          :text="text"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const items = ref([
  {
    title: "Занимайтесь любимым делом с пользой!",
    text: "Выбирайте дистанию по душе и не забывайте о здоровье",
  },
  {
    title: "Выбирайте маршрут по душе",
    text: "Карта поможет подобрать тот маршрут, что будет удобен именно вам",
  },
  {
    title: "Ведите статистику",
    text: "Следите за своими достижениями и делитесь ими с друзьями",
  },
]);
</script>

<style lang="scss" scoped>
.home-advantages {
  padding: 50px 0 100px;
  background: $green-200;
  box-shadow: 0px 0px 7px 5px rgba(176, 212, 130, 0.38);
  border-radius: 20px 20px 0 0;

  &__title {
    color: $green-50;
    margin-bottom: 50px;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
  }
}
</style>
