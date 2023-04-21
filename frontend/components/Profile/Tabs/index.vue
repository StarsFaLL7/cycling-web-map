<template>
  <div class="profile__tabs">
    <div class="tabs__controls">
      <nuxt-link
        to="/profile/stats"
        class="tabs__controls-tab"
        :class="{ active: route.name === 'profile-stats' }"
        >Статистики</nuxt-link
      >
      <nuxt-link
        to="/profile/routes"
        class="tabs__controls-tab"
        :class="{ active: route.name === 'profile-routes' }"
        >Маршруты</nuxt-link
      >
      <nuxt-link
        to="/profile/settings"
        class="tabs__controls-tab"
        :class="{ active: route.name === 'profile-settings' }"
        >Настройки</nuxt-link
      >
    </div>
    <slot />
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style lang="scss" scoped>
.profile__tabs {
  .tabs__controls {
    display: flex;
    justify-content: center;
    gap: 30px;

    margin-bottom: 120px;
    background: #dcf0f9;

    &-tab {
      width: 18%;
      padding: 15px;

      border-bottom: 3px solid transparent;

      text-align: center;
      text-decoration: none;
      color: inherit;

      cursor: pointer;
      transition: border-color 0.3s;

      &:hover {
        border-color: #4fb8e7;
      }

      &.active {
        border-bottom: 3px solid #095172;
      }
    }
  }
}
</style>
