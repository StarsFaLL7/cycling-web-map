<template>
  <div class="profile__tabs">
    <ProfileTabsItem
      v-for="({ title, url }, i) of tabNames"
      :key="i"
      :title="title"
      :url="url"
    />
  </div>
</template>

<script setup>
const tabNames = ref([
  {
    title: "Статистика",
    url: "/profile/stats",
  },
  {
    title: "Маршруты",
    url: "/profile/routes",
  },
  {
    title: "Достижения",
    url: "/profile/achievements",
  },
]);
</script>

<style lang="scss" scoped>
.profile {
  &__tabs {
    display: flex;
    gap: 60px;
    margin-bottom: 50px;
  }
}
</style>
