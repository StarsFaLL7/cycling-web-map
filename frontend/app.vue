<template>
  <div class="app">
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
      <AuthForm :open="useAuthOpen" @close-modal="useToggleAuth" />
    </NuxtLayout>
  </div>
</template>

<script setup>
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&display=swap");

body {
  min-height: 100vh;
  font-family: "Exo 2", sans-serif;
  color: #000;
}

.app {
  width: 100vw;
  overflow: hidden;
  position: relative;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

*::selection {
  background-color: rgba(176, 212, 130, 0.6) !important;
}

.container {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 0 80px;

  @media (max-width: 1000px) {
    padding: 0 40px;
  }

  @media (max-width: 800px) {
    padding: 0 20px;
  }
}

.title {
  color: $green-600;
  text-align: center;
  margin: 0 0 20px;
  font-weight: 500;
  font-size: 32px;
  padding: 0 20px;

  @media (max-width: 800px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
}

.btn {
  padding: 14px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: #4fb8e7;

  font-size: 18px;
  font-family: Nunito;

  border-radius: 10px;
  border: none;

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #aee4f6;
    // color: #4fb8e7;
  }
}
</style>
