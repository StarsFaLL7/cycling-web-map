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
    color: #fff;

    text-decoration: none;
    font-size: 18px;
    font-family: "Nunito";

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
