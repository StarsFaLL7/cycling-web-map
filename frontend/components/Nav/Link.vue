<template>
  <li>
    <nuxt-link :to="props.href">
      {{ props.title }}
    </nuxt-link>
  </li>
</template>

<script setup>
const props = defineProps({
  title: {
    required: true,
  },
  href: {
    required: true,
  },
});
</script>

<style lang="scss" scoped>
li {
  a {
    color: inherit;

    text-decoration: none;
    font-size: 20px;
    font-family: "Nunito";
  }
}
</style>
