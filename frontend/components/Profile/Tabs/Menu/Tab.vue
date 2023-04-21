<template>
  <div class="tab">
    {{ props.title }}
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
.tab {
  border-radius: 20px;
  background: #dcf0f9;

  font-size: 20px;
  font-family: Nunito;

  padding: 20px 40px;
  margin-bottom: 20px;

  transition: all 0.3s;
  cursor: pointer;

  &.active {
    background: #84cdee;
  }

  &:hover {
    background: #84cdee;
  }
}
</style>
