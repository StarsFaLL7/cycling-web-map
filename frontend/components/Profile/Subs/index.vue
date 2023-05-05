<template>
  <div class="profile__subs">
    <h3 class="profile__subs-title">Подписки</h3>
    <div class="profile__subs-items">
      <ProfileSubsItem v-for="i of 8" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.profile {
  &__subs {
    padding: 30px;
    background: #94cbea;
    box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.2);
    border-radius: 20px;
    // width: 35%;

    //     background: rgba(148, 203, 234, 0.61);
    // border-radius: 16px;
    // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    // backdrop-filter: blur(5px);
    // -webkit-backdrop-filter: blur(5px);
    // border: 1px solid rgba(148, 203, 234, 0.26);

    &-title {
      font-weight: 400;
      font-size: 24px;
      line-height: 33px;
      margin: 0 0 25px;
      color: #fff;
    }

    &-items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      max-width: 420px;
    }
  }
}
</style>
