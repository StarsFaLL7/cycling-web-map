<template>
  <div>
    <ProfileBanner />
    <ProfileTabs>
      <ProfileTabsContent>
        <template v-slot:tabs>
          <ProfileTabsMenuTab title="Созданные" />
          <ProfileTabsMenuTab title="Сохраненные" />
          <ProfileTabsMenuTab title="История" />
        </template>
        <template v-slot:content>
          <div class="profile__routes">
            <ProfileRoute />
            <ProfileRoute />
            <ProfileRoute />
          </div>
        </template>
      </ProfileTabsContent>
    </ProfileTabs>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.profile__routes {
  display: flex;
  gap: 30px;
}
</style>
