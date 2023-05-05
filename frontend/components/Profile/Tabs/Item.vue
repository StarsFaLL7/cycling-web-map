<template>
  <nuxt-link
    :to="props.url"
    class="profile__tabs-item"
    :class="{ active: route.path === url }"
  >
    {{ props.title }}
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const route = useRoute();
</script>

<style lang="scss" scoped>
.profile {
  &__tabs {
    &-item {
      font-weight: 700;
      font-size: 24px;
      line-height: 44px;
      text-decoration: none;
      font-family: "Nunito";
      color: #0e5979;
      padding-bottom: 5px;
      position: relative;

      &::after {
        content: "";
        width: 100%;
        height: 3px;
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #0e5979;
        transform: scaleX(0);
        transition: all 0.2s;
      }

      &:hover,
      &.active {
        &::after {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>
