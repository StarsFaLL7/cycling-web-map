<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap");

body {
  min-height: 100vh;
  font-family: "Ubuntu", sans-serif;
  color: #000;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

.container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 80px;
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
