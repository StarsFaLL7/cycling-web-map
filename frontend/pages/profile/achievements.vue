<template>
  <div class="profile__routes">
    <div class="profile__routes-items">
      <div class="profile__route" v-for="i of 4" :key="i">
        <img src="https://picsum.photos/200/200" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});
</script>

<style lang="scss">
.profile {
  &__routes {
    height: max-content;
  }

  &__routes-title {
    margin: 0 0 30px;
    font-size: 18px;
  }

  &__routes-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  &__route {
    border-radius: 40px;
    overflow: hidden;
    padding: 10px;

    background: #fff;
    box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
    position: relative;

    cursor: pointer;

    &:hover {
      img {
        transform: scale(1.5);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 40px;
      transition: all 0.3s;
    }

    &-address {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 18px;
      padding: 10px;
      background: #fff;
      border-radius: 10px;

      transition: padding 0.3s;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);

      div {
        width: 15px;
        height: 3px;
        background: #000;
        border-radius: 1px;
      }
    }
  }
}
</style>
