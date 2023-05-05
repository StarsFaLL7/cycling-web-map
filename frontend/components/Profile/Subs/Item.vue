<template>
  <nuxt-link to="#" class="profile__subs-item">
    <img src="https://picsum.photos/100/100" alt="" />
  </nuxt-link>
</template>

<script setup></script>

<style lang="scss" scoped>
.profile {
  &__subs {
    &-item {
      aspect-ratio: 1;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid #fff;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}
</style>
