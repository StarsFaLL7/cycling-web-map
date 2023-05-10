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
    font-family: "Exo 2";
    text-transform: uppercase;
    position: relative;
    padding-bottom: 5px;

    // padding: 5px 10px;
    // border-radius: 10px;
    // background: rgba(176, 212, 130, 0.4);

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: $green-300;
      transform: scaleX(0);
      transition: all 0.2s;
    }

    &:hover {
      &::after {
        transform: scaleX(1);
        transition: all 0.2s;
      }
    }
  }
}
</style>
