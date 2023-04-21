<template>
  <div class="tabs__content">
    <div class="tabs__content-sidebar">
      <slot name="tabs" />
    </div>
    <div class="tabs__main">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.tabs__content {
  padding: 0 80px;

  display: flex;
  gap: 60px;

  &-sidebar {
    width: 340px;
    font-size: 20px;
  }
}
</style>
