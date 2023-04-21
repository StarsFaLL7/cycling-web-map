<template>
  <div>
    <ProfileBanner />
    <ProfileTabs>
      <ProfileTabsContent>
        <template v-slot:tabs>
          <ProfileTabsMenuTab title="Активность" />
        </template>
        <template v-slot:content>
          <ul class="profile__stats">
            <h2>Данные о пользователе</h2>
            <li>Сервис используется: 12 дней</li>
            <li>Маршрутов сохранено: 0</li>
            <li>Маршрутов создано: 0</li>
            <li>Всего пройдено: 13.6км</li>
          </ul>
        </template>
      </ProfileTabsContent>
    </ProfileTabs>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.profile__stats {
  font-family: "Nunito";
  font-size: 20px;

  list-style: none;
  margin: 0;
  padding: 0;

  h2 {
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
  }

  li:not(:last-of-type) {
    margin-bottom: 25px;
  }
}
</style>
