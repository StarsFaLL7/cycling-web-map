<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.btn {
  padding: 8px 20px;
  background-color: $green-300;
  color: $green-600;
  border-radius: 10px;
  border: 2px solid $green-300;
  font-size: 16px;
}
</style>
