<template>
  <div class="profile__banner">
    <div class="profile__user">
      <div class="profile__user-avatar">
        <!-- <img src="https://picsum.photos/230/230" alt="" /> -->
      </div>
      <div class="profile__user-name">Пользователь</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.profile__banner {
  height: 350px;
  background-image: url(https://picsum.photos/id/249/3000/2000);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  align-items: center;

  padding: 0 80px;

  .profile__user {
    display: flex;
    align-items: center;
    gap: 30px;

    transform: translateY(35%);

    &-avatar {
      width: 230px;
      height: 230px;

      border-radius: 50%;
      overflow: hidden;

      background: #095172;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    &-name {
      font-weight: 700;
      font-size: 36px;
      color: #fff;
    }
  }
}
</style>
