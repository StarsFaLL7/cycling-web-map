<template>
  <div class="profile-card">
    <h2 class="profile-card__title">{{ props.title }}</h2>
    <div class="profile-card__content">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.profile-card {
  border-radius: 10px;
  //   box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  // height: 250px;
  background: #fff;
  position: relative;

  &__title {
    padding: 20px;
    margin: 0;
    border-bottom: 2px solid #f7f7f7;
    font-weight: normal;
  }

  &__content {
    padding: 20px;
  }

  &.stats {
    grid-column: 1 / -1;
  }
}
</style>
