<template>
  <div class="achievement-card">{{ props.title }}</div>
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
.achievement-card {
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #f7f7f7;
  border-radius: 10px;
  background: $green-300;
  padding: 10px;

  color: $green-50;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
</style>
