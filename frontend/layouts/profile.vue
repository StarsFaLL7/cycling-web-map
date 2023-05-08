<template>
  <div class="profile">
    <Nav />
    <ProfileHeader />
    <div class="container">
      <div class="profile-wrapper">
        <div class="profile__content">
          <ProfileTabs />
          <slot />
        </div>
        <ProfileSubs />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.profile {
  padding-top: 76px;
  font-family: Nunito;

  &__header {
    margin-bottom: 30px;
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    width: 60%;
  }
}
</style>
