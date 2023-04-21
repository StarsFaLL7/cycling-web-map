<template>
  <div>
    <ProfileBanner />
    <ProfileTabs>
      <ProfileTabsContent>
        <template v-slot:tabs>
          <ProfileTabsMenuTab title="Work" />
        </template>
        <!-- <template v-slot:content> Under Construction </template> -->
      </ProfileTabsContent>
    </ProfileTabs>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
