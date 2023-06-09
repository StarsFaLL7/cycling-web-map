import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
  id: "global-store",
  state: () => {
    return {
      sidebarOpen: false,
    };
  },
  actions: {
    toggleSidebar() {
      if (this.sidebarOpen) {
        clearRoute();
      }

      this.$patch({
        sidebarOpen: !this.sidebarOpen,
      });
    },
  },
  getters: {
    isSidebarOpen: (state) => state.sidebarOpen,
  },
});
