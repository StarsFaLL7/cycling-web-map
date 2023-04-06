<template>
  <div class="sidebar" :class="{ open: isSidebarOpen }">
    <div class="sidebar__menu">
      <span
        v-for="(n, i) of icons"
        :key="i"
        @click="toggleSidebar"
        class="sidebar__menu-item sidebar-icon material-symbols-outlined"
      >
        {{ n }}
      </span>
    </div>
    <div class="sidebar__content">
      <div class="sidebar__header">
        <span class="sidebar__header-title">Cycling Web Map</span>
        <span
          class="sidebar-icon material-symbols-outlined"
          @click="toggleSidebar"
        >
          arrow_back_ios_new
        </span>
      </div>
      <div class="sidebar__body"></div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGlobalStore } from "~/store/global";

const store = useGlobalStore();

const { toggleSidebar } = store;
const { isSidebarOpen } = storeToRefs(store);

const icons = ["menu", "search", "route"];
</script>

<style lang="scss" scoped>
$bg-color: #202124;
$elevation: 0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15);

.sidebar-icon {
  -webkit-tap-highlight-color: transparent;

  color: #fff;
  cursor: pointer;

  position: relative;

  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";

    width: 110%;
    height: 110%;

    border-radius: 50%;
    opacity: 0;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: rgba(255, 255, 255, 0.1);

    transition: all 0.2s;
  }

  &:hover {
    &::after {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
}
.sidebar {
  height: 100vh;
  background: $bg-color;
  box-shadow: $elevation;

  position: fixed;
  left: 0;
  top: 0;

  z-index: 10;

  transition: opacity 0.2s;

  &.open {
    .sidebar__content {
      left: 0;
    }

    .sidebar__menu {
      opacity: 0;
    }
  }

  &__menu {
    padding: 12px;

    &-item {
      margin-bottom: 24px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  &__content {
    width: 350px;
    min-height: 100vh;

    padding: 16px;

    background: $bg-color;
    box-shadow: $elevation;

    position: absolute;
    top: 0;
    left: -350px;

    transition: all 0.2s;
  }

  &__header {
    color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 16px;

    &-title {
      font-size: 24px;
      text-transform: uppercase;

      color: rgba(255, 255, 255, 1);
    }
  }

  &__body {
  }
}
</style>
